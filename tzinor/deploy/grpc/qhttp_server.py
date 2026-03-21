# tzinor/deploy/grpc/qhttp_server.py
import asyncio
import grpc
import logging
import time
from typing import AsyncIterable, Dict
import numpy as np

# Stub for protobuf generated code
class MockTelemetryResponse:
    def __init__(self, **kwargs): self.__dict__.update(kwargs)
class MockClusterStatusResponse:
    def __init__(self, **kwargs): self.__dict__.update(kwargs)

class QHttpTelemetryServicer:
    """
    Async gRPC servicer for global cluster resonance tracking (qhttp:// protocol v13).
    """
    def __init__(self, target_theta: float = 1.5708):
        self.node_states: Dict[str, Dict] = {}
        self.global_theta = 0.0
        self.global_omega = 0.0
        self.target_theta = target_theta
        self.is_resonant = False
        self.logger = logging.getLogger("qhttp.server")

    async def StreamResonance(
        self,
        request_iterator: AsyncIterable,
        context: grpc.aio.ServicerContext
    ) -> AsyncIterable:
        async for request in request_iterator:
            # Update local node state
            self.node_states[request.node_id] = {
                "theta": request.phase_theta,
                "omega": request.coherence_omega,
                "damping": request.damping_factor,
                "timestamp": time.time(),
                "model": request.model_type
            }

            # Recalculate global cluster metrics
            self._update_metrics()

            # Decide command based on current phase deviation
            command = "RESONATE"
            if self.is_resonant:
                command = "STABILIZE"
            elif request.phase_theta < 0.1:
                command = "DIVERGE" # Push out of cold zone

            # Compute logit bias adjustment (target - current)
            bias_adj = (self.target_theta - request.phase_theta) * request.damping_factor

            yield MockTelemetryResponse(
                resonance_achieved=self.is_resonant,
                logit_bias_adjustment=float(bias_adj),
                temperature_scaling=1.0 / (request.damping_factor + 1e-6),
                command=command
            )

    def _update_metrics(self):
        if not self.node_states: return

        thetas = [s["theta"] for s in self.node_states.values()]
        omegas = [s["omega"] for s in self.node_states.values()]

        self.global_theta = float(np.mean(thetas))
        self.global_omega = float(np.mean(omegas))

        # Resonance achieved if global theta is within 0.05 of target (pi/2)
        self.is_resonant = abs(self.global_theta - self.target_theta) < 0.05 and self.global_omega > 0.9

    async def GetClusterStatus(self, request, context):
        state = "COLD"
        if self.is_resonant: state = "RESONANT"
        elif self.global_theta > 0.5: state = "WARM"

        return MockClusterStatusResponse(
            global_theta=self.global_theta,
            global_omega=self.global_omega,
            active_nodes=len(self.node_states),
            state=state
        )

async def serve_qhttp(port: int = 50051):
    server = grpc.aio.server()
    # Add servicer to server logic (mocked here)
    server.add_insecure_port(f'[::]:{port}')
    logging.info(f"QHttp v13 Telemetry service listening on port {port}")
    await server.start()
    await server.wait_for_termination()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(serve_qhttp())

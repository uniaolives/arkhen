# tzinor/ml/hf_callbacks.py
import torch
import asyncio
import logging
import threading
from transformers import TrainerCallback, TrainerState, TrainerControl
from tzinor.deploy.grpc.qhttp_client import QHttpResonanceClient

class ArkheTelemetryCallback(TrainerCallback):
    """
    Asynchronous HuggingFace Trainer Callback for qhttp:// telemetry.
    Streams real-time resonance metrics (θ, Ω', damping, sigma) to the
    cluster orchestrator in a background thread to prevent blocking
    the training loop.
    """
    def __init__(self, node_id: str, server_addr: str = "localhost:50051"):
        self.node_id = node_id
        self.client = QHttpResonanceClient(node_id, server_addr)
        self.logger = logging.getLogger("arkhen.telemetry")
        self.loop = asyncio.new_event_loop()
        self.thread = threading.Thread(target=self._run_event_loop, daemon=True)
        self.thread.start()

        self.current_metrics = {
            "phase": 0.0, "omega": 0.0, "damping": 1.0,
            "sigma": 0.0, "tokens": 0, "model": "llama"
        }

        # Connect client in the background loop
        asyncio.run_coroutine_threadsafe(self.client.connect(), self.loop)
        # Start telemetry loop
        asyncio.run_coroutine_threadsafe(
            self.client.telemetry_loop(lambda: self.current_metrics),
            self.loop
        )

    def _run_event_loop(self):
        asyncio.set_event_loop(self.loop)
        self.loop.run_forever()

    def on_step_end(self, args, state: TrainerState, control: TrainerControl, **kwargs):
        """Updates current metrics from the training loop's resonance callback."""
        # Assuming metrics are already computed and available in state or via a shared object
        # In this implementation, we expect a 'resonance_metrics' dict in log_history
        if state.log_history:
            last_log = state.log_history[-1]
            if "phase_theta" in last_log:
                self.current_metrics.update({
                    "phase": last_log.get("phase_theta", 0.0),
                    "omega": last_log.get("omega_prime", 0.0),
                    "damping": last_log.get("damping_factor", 1.0),
                    "sigma": last_log.get("sigma", 0.0),
                    "tokens": state.global_step * args.per_device_train_batch_size * args.world_size,
                    "model": args.run_name or "llama"
                })

    def on_train_end(self, args, state, control, **kwargs):
        """Cleanup connection and thread."""
        asyncio.run_coroutine_threadsafe(self.client.disconnect(), self.loop)
        self.loop.call_soon_threadsafe(self.loop.stop)
        self.thread.join(timeout=2.0)

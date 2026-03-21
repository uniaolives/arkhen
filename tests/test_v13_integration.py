# tests/test_v13_integration.py
import unittest
import asyncio
import json
import torch
import numpy as np
from tzinor.ml.arkhen_trainer import ArkheResonanceCallback
from tzinor.deploy.hashtree.nostr_client import NostrSignalingClient, WebRTCSignaler
from tzinor.deploy.hashtree.p2p_bridge import P2PBridge

class MockArgs:
    def __init__(self):
        self.per_device_train_batch_size = 4
        self.world_size = 8
        self.learning_rate = 1e-4
        self.logging_steps = 1

class MockState:
    def __init__(self):
        self.global_step = 1
        self.log_history = []

class TestLayer13Integration(unittest.TestCase):
    def test_trainer_callback_logic(self):
        """Verify the trainer callback correctly updates state via sync engine."""
        callback = ArkheResonanceCallback(node_id="test-node")
        args = MockArgs()
        state = MockState()

        # Mock model with parameters
        class MockModel:
            def __init__(self):
                self.p1 = torch.nn.Parameter(torch.ones(100) * 0.1)
                self.p1.requires_grad = True
            def named_parameters(self):
                yield "p1", self.p1

        # Mock optimizer
        class MockOptimizer:
            def __init__(self):
                self.param_groups = [{"lr": 1e-4}]

        model = MockModel()
        optimizer = MockOptimizer()

        callback.on_step_end(args, state, None, model=model, optimizer=optimizer)

        # Verify metrics updated
        self.assertGreater(callback.last_phase, 0.0)
        self.assertLessEqual(callback.last_damping, 1.0)
        self.assertGreater(optimizer.param_groups[0]["lr"], 0.0)
        self.assertIn("phase_theta", state.log_history[0])

    def test_nostr_signaling_simulation(self):
        """Verify Nostr signaling handshake simulation."""
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        client = NostrSignalingClient("npub1...", ["wss://relay1"])
        signaler = WebRTCSignaler(client)

        received_sdp = []
        async def mock_on_offer(sender, sdp):
            received_sdp.append(sdp)

        signaler.on_offer = mock_on_offer

        async def run_test():
            await client.connect()
            await signaler.send_offer("npub2...", "v=0\ns=test")
            await client.simulate_incoming_offer("npub2...", {"type": "offer", "sdp": "v=0\ns=incoming"})

        loop.run_until_complete(run_test())
        self.assertEqual(received_sdp[0], "v=0\ns=incoming")

    def test_p2p_bridge_tunneling(self):
        """Verify gRPC tunneling simulation over P2P bridge."""
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        bridge = P2PBridge("npub1...", ["wss://relay1"])

        async def run_test():
            await bridge.connect()
            resp = await bridge.tunnel_grpc_request("npub2...", b"TELEMETRY_DATA")
            return resp

        resp = loop.run_until_complete(run_test())
        self.assertIn(b"RESONANCE_ACK", resp)

if __name__ == "__main__":
    unittest.main()

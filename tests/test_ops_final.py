# tests/test_ops_final.py
import unittest
import os
import torch
import shutil
import logging
from transformers import TrainingArguments, TrainerState
from tzinor.ml.arkhen_trainer import ArkheResonanceCallback
from tzinor.ml.hf_callbacks import ArkheTelemetryCallback

class TestOperationalNode(unittest.TestCase):
    def setUp(self):
        self.output_dir = "/tmp/arkhe_test_output"
        os.makedirs(self.output_dir, exist_ok=True)
        # Mock htree binary in path
        with open("/tmp/htree", "w") as f:
            f.write("#!/bin/bash\necho 'merkle_root_test'")
        os.chmod("/tmp/htree", 0o755)
        os.environ["PATH"] += ":/tmp"

    def tearDown(self):
        shutil.rmtree(self.output_dir)
        if os.path.exists("/tmp/htree"):
            os.remove("/tmp/htree")

    def test_full_ops_flow(self):
        """Simulates a training step, telemetry stream, and checkpoint save."""
        # 1. Initialize callbacks
        res_callback = ArkheResonanceCallback(node_id="node-v13-test")
        telemetry_callback = ArkheTelemetryCallback(node_id="node-v13-test")

        args = TrainingArguments(
            output_dir=self.output_dir,
            per_device_train_batch_size=1,
            learning_rate=1e-5,
            run_name="test-run"
        )
        state = TrainerState()
        state.global_step = 100

        # Mock model
        model = torch.nn.Linear(10, 10)
        optimizer = torch.optim.SGD(model.parameters(), lr=1e-5)

        # 2. Simulate step end (Resonance calc + Telemetry update)
        res_callback.on_step_end(args, state, None, model=model, optimizer=optimizer)
        # Ensure log_history has the required metrics for telemetry callback
        state.log_history = [{
            "phase_theta": res_callback.last_phase,
            "damping_factor": res_callback.last_damping,
            "omega_prime": 0.95
        }]
        telemetry_callback.on_step_end(args, state, None)

        self.assertGreater(telemetry_callback.current_metrics["phase"], 0.0)

        # 3. Simulate checkpoint save (Hashtree persistence)
        # Create a dummy checkpoint file
        with open(os.path.join(self.output_dir, "pytorch_model.bin"), "w") as f:
            f.write("dummy data")

        res_callback.on_save(args, state, None, output_dir=self.output_dir)

        # Verify metadata exists in checkpoint
        meta_path = os.path.join(self.output_dir, "arkhe_metadata.json")
        self.assertTrue(os.path.exists(meta_path))

        # Cleanup
        telemetry_callback.on_train_end(args, state, None)

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    unittest.main()

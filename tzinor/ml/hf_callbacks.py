# tzinor/ml/hf_callbacks.py
import torch
import asyncio
import logging
import threading
from transformers import TrainerCallback, TrainerState, TrainerControl
from tzinor.deploy.grpc.qhttp_client import QHttpResonanceClient
from tzinor.deploy.nccl.nccl_bindings import NCCLResonanceSync
from tzinor.deploy.hashtree.persistence import HashtreePersistence
import os

class ArkheResonanceCallback(TrainerCallback):
    """
    HuggingFace Trainer Callback for Arkhe(n) Resonance.
    Syncs global parameter norms across GPUs via NCCL and
    streams real-time resonance metrics (θ, Ω', damping, sigma)
    to the cluster orchestrator (qhttp://) in a background thread.
    Also handles decentralized checkpoint persistence (Hashtree).
    """
    def __init__(self, node_id: str = "arkhe-node-0", server_addr: str = "localhost:50051"):
        self.node_id = node_id
        self.sync_engine = NCCLResonanceSync()
        self.persistence = HashtreePersistence()
        self.telemetry = QHttpResonanceClient(node_id, server_addr)
        self.logger = logging.getLogger("arkhen.resonance")

        self.last_phase = 0.0
        self.last_damping = 1.0
        self.last_sigma = 0.0
        self.last_omega = 0.0
        self.last_tokens = 0
        self.last_model = "llama"

        self.loop = asyncio.new_event_loop()
        self.thread = threading.Thread(target=self._run_event_loop, daemon=True)
        self.thread.start()

        # Connect and start telemetry loop in the background thread
        asyncio.run_coroutine_threadsafe(self.telemetry.connect(), self.loop)
        asyncio.run_coroutine_threadsafe(
            self.telemetry.telemetry_loop(self._get_current_metrics),
            self.loop
        )

    def _run_event_loop(self):
        asyncio.set_event_loop(self.loop)
        self.loop.run_forever()

    def _get_current_metrics(self) -> dict:
        return {
            "phase": self.last_phase,
            "omega": self.last_omega,
            "damping": self.last_damping,
            "sigma": self.last_sigma,
            "tokens": self.last_tokens,
            "model": self.last_model
        }

    def on_step_end(self, args, state: TrainerState, control: TrainerControl, **kwargs):
        """
        Called after each optimization step.
        Synchronizes global resonance state and updates metrics.
        """
        model = kwargs.get("model")
        if model is None:
            return

        # 1. NCCL Sync and Global Resonance computation
        local_params = []
        for name, p in model.named_parameters():
            if p.requires_grad:
                local_params.append(p.data.view(-1))

        flat_params = torch.cat(local_params)

        global_tokens = state.global_step * args.per_device_train_batch_size * args.world_size
        res_state = self.sync_engine.compute_global_resonance(
            flat_params,
            global_tokens
        )

        # 2. Update internal state for background telemetry
        self.last_phase = res_state["phase"]
        self.last_damping = res_state["damping"]
        self.last_omega = res_state["omega_prime"]
        self.last_sigma = res_state["sigma"]
        self.last_tokens = global_tokens
        self.last_model = args.run_name or "llama"

        # 3. Dynamic adjustment of training parameters
        optimizer = kwargs.get("optimizer")
        if optimizer:
            base_lr = args.learning_rate
            # Damping factor and gRPC feedback adjustment
            new_lr = base_lr * self.last_damping * self.telemetry.current_temp_scale
            for param_group in optimizer.param_groups:
                param_group['lr'] = new_lr

        # 4. Log to Trainer history
        if state.global_step % args.logging_steps == 0:
            state.log_history.append({
                "phase_theta": self.last_phase,
                "damping_factor": self.last_damping,
                "omega_prime": self.last_omega,
                "sigma": self.last_sigma,
                "step": state.global_step
            })

    def on_save(self, args, state: TrainerState, control: TrainerControl, **kwargs):
        """Triggered on checkpoint save. Anchors checkpoint to Hashtree."""
        checkpoint_path = kwargs.get("output_dir")
        if checkpoint_path and os.path.exists(checkpoint_path):
            metadata = {
                "step": state.global_step,
                "phase": self.last_phase,
                "damping": self.last_damping,
                "node": self.node_id
            }
            nhash = self.persistence.save_checkpoint(checkpoint_path, metadata)
            if nhash:
                self.logger.info(f"Checkpoint anchored to Hashtree: {nhash}")

    def on_train_end(self, args, state, control, **kwargs):
        """Cleanup connection and thread."""
        asyncio.run_coroutine_threadsafe(self.telemetry.disconnect(), self.loop)
        self.loop.call_soon_threadsafe(self.loop.stop)
        self.thread.join(timeout=2.0)
        self.logger.info(f"Training Complete. Final Cluster Coherence: {self.last_phase:.4f} rad")

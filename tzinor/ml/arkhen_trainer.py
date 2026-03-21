# tzinor/ml/arkhen_trainer.py
import torch
from transformers import TrainerCallback, TrainerState, TrainerControl
from tzinor.deploy.nccl.nccl_bindings import NCCLResonanceSync
from tzinor.deploy.hashtree.persistence import HashtreePersistence
import numpy as np
import logging
import os

class ArkheResonanceCallback(TrainerCallback):
    """
    HuggingFace Trainer Callback for Arkhe(n) Resonance.
    Syncs global parameter norms across GPUs via NCCL and
    adjusts learning rates based on Phase θ and Damping factor.
    """
    def __init__(self, node_id="arkhe-node-0"):
        self.node_id = node_id
        self.sync_engine = NCCLResonanceSync()
        self.persistence = HashtreePersistence()
        self.logger = logging.getLogger("arkhen.trainer")
        self.last_phase = 0.0
        self.last_damping = 1.0
        self.last_sigma = 0.0

    def on_step_end(self, args, state: TrainerState, control: TrainerControl, **kwargs):
        """
        Called after each optimization step.
        Synchronizes global resonance state.
        """
        model = kwargs.get("model")
        if model is None:
            return

        # 1. Flatten representative parameters for norm calculation
        # In actual large-scale training, we can sample specific layers
        # or use all parameters if bandwidth allows.
        local_params = []
        for name, p in model.named_parameters():
            if p.requires_grad:
                local_params.append(p.data.view(-1))

        flat_params = torch.cat(local_params)

        # 2. NCCL Sync and Global Resonance computation
        global_tokens = state.global_step * args.per_device_train_batch_size * args.world_size
        res_state = self.sync_engine.compute_global_resonance(
            flat_params,
            global_tokens
        )

        self.last_phase = res_state["phase"]
        self.last_damping = res_state["damping"]

        # 3. Dynamic adjustment of training parameters
        # If system is colapsing (low theta), we boost learning rate
        # to escape cold zone. If caotic (high theta), we dampen.
        # Resonance A-5' (theta ~ pi/2) ensures optimal information flow.

        # Update optimizer learning rates (simulated)
        optimizer = kwargs.get("optimizer")
        if optimizer:
            base_lr = args.learning_rate
            # Damping directly scales LR as temporal dilation factor
            new_lr = base_lr * self.last_damping
            for param_group in optimizer.param_groups:
                param_group['lr'] = new_lr

        # Log resonance metrics to progress bar/WandB
        if state.global_step % args.logging_steps == 0:
            self.logger.info(
                f"Step {state.global_step} | Phase θ: {self.last_phase:.4f} "
                f"| Damping: {self.last_damping:.4f} | Resonant: {res_state['is_resonant']}"
            )
            state.log_history.append({
                "phase_theta": self.last_phase,
                "damping_factor": self.last_damping,
                "omega_prime": res_state["omega_prime"],
                "sigma": res_state["sigma"],
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
        self.logger.info(f"Training Complete. Final Cluster Coherence: {self.last_phase:.4f} rad")

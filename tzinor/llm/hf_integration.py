# tzinor/llm/hf_integration.py
# INTEGRAÇÃO ARKHE(N) COM MODEL ADAPTERS E CUDA

import torch
from transformers import Trainer, TrainerCallback
from tzinor.llm.gravitational_evolution import GravitationalOptimizer
from tzinor.llm.resonance_metrics import ResonanceMonitor
from tzinor.llm.model_adapters import get_adapter

class ArkhenResonanceCallback(TrainerCallback):
    def __init__(self, model_name: str):
        self.adapter = get_adapter(model_name)
        self.monitor = ResonanceMonitor()

    def on_log(self, args, state, control, logs=None, **kwargs):
        if logs is not None and "loss" in logs:
            model = kwargs.get("model")
            if model:
                res = self.monitor.evaluate_state(model, logs["loss"])
                logs["arkhe/info_density"] = res["info_density"]
                logs["arkhe/target_omega"] = self.adapter.target_omega
                logs["arkhe/model_family"] = self.adapter.model_name

class ArkhenTrainer(Trainer):
    def __init__(self, *args, **kwargs):
        model_name = kwargs.get("model").config._name_or_path if hasattr(kwargs.get("model"), "config") else "unknown"
        self.adapter = get_adapter(model_name)
        super().__init__(*args, **kwargs)

    def create_optimizer(self):
        if self.optimizer is None:
            # Injeta o GravitationalOptimizer calibrado para o adaptador
            self.optimizer = GravitationalOptimizer(
                self.model.parameters(),
                lr=self.args.learning_rate,
                grav_coeff=0.1 / (self.adapter.param_scale / 1e9)
            )
        return self.optimizer

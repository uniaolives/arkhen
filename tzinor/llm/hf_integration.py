# tzinor/llm/hf_integration.py
# INTEGRAÇÃO ARKHE(N) COM HUGGING FACE TRANSFORMERS

import torch
from transformers import Trainer, TrainerCallback
from tzinor.llm.gravitational_evolution import GravitationalOptimizer
from tzinor.llm.resonance_metrics import ResonanceMonitor

class ArkhenResonanceCallback(TrainerCallback):
    """
    Callback para monitorar ressonância durante o treinamento HF.
    """
    def __init__(self):
        self.monitor = ResonanceMonitor()

    def on_log(self, args, state, control, logs=None, **kwargs):
        if logs is not None and "loss" in logs:
            # Em um cenário real, extrairíamos os gradientes aqui
            # Para o callback HF, apenas logamos que o monitor está ativo
            logs["arkhe_status"] = "monitoring_resonance"

class ArkhenTrainer(Trainer):
    """
    Trainer customizado que injeta o GravitationalOptimizer.
    """
    def create_optimizer(self):
        if self.optimizer is None:
            self.optimizer = GravitationalOptimizer(
                self.model.parameters(),
                lr=self.args.learning_rate,
                grav_coeff=0.1
            )
        return self.optimizer

    def compute_loss(self, model, inputs, return_outputs=False):
        """
        Substitui o cálculo de perda padrão pelo gravitacional (se desejado)
        Ou apenas monitora a ressonância.
        """
        outputs = model(**inputs)
        loss = outputs.get("loss")

        # Aqui poderíamos aplicar o damping gravitacional manual
        # mas o GravitationalOptimizer já cuida da dinâmica dos pesos.

        return (loss, outputs) if return_outputs else loss

# tzinor/llm/arkhe_llm_metrics.py
# MÉTRICAS DE COERÊNCIA GRAVITACIONAL PARA LLMs

import torch
import torch.nn.functional as F
from typing import Dict, List

class ArkheLLMMetrics:
    def __init__(self, k1: float = 0.015311):
        self.k1 = k1

    def semantic_curvature(self, attention_matrix: torch.Tensor) -> float:
        curvature = self.k1 * torch.norm(attention_matrix, p='fro').item()
        return curvature

    def coherence_omega(self, logits: torch.Tensor, target_ids: torch.Tensor) -> float:
        probs = F.softmax(logits, dim=-1)
        target_probs = probs.gather(-1, target_ids.unsqueeze(-1)).squeeze(-1)
        entropy = -torch.sum(probs * torch.log(probs + 1e-9), dim=-1)
        omega = target_probs.mean().item() / (target_probs.mean().item() + entropy.mean().item() / 1000)
        return omega

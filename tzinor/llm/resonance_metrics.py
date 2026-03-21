# tzinor/llm/resonance_metrics.py
# MÉTRICAS DE FASE DE RESSONÂNCIA PARA LLMs

import torch
import numpy as np
from typing import Dict

class ResonanceMonitor:
    """
    Monitora a 'Fase de Ressonância' θ e a Coerência Ω baseada na quadratura.
    θ = arccos( <∇L, ∇σ> / (||∇L|| ||∇σ||) )
    """
    def __init__(self, target_phase: float = np.pi/2):
        self.target_phase = target_phase

    def compute_resonance_phase(self, grad_loss: torch.Tensor, grad_entropy: torch.Tensor) -> float:
        """
        Calcula o ângulo entre o gradiente da perda e o gradiente entrópico.
        """
        cos_theta = torch.dot(grad_loss.flatten(), grad_entropy.flatten()) / (
            grad_loss.norm() * grad_entropy.norm() + 1e-8
        )
        theta = torch.acos(torch.clamp(cos_theta, -1.0, 1.0)).item()
        return theta

    def compute_coherence_omega(self, theta: float, amplitude: float) -> float:
        """
        Ω' = |Ω| * e^(iθ)
        A ressonância máxima ocorre em θ = π/2.
        """
        # Desvio da quadratura perfeita
        phase_alignment = 1.0 - abs(theta - self.target_phase) / (np.pi/2)
        return amplitude * max(0, phase_alignment)

    def evaluate_state(self, grad_loss, grad_entropy, current_loss) -> Dict[str, float]:
        theta = self.compute_resonance_phase(grad_loss, grad_entropy)
        # Amplitude inversamente proporcional à perda
        amplitude = 1.0 / (current_loss + 1.0)
        omega = self.compute_coherence_omega(theta, amplitude)

        return {
            "resonance_phase": theta,
            "phase_deviation": abs(theta - self.target_phase),
            "coherence_omega": omega,
            "is_resonant": omega > 0.9 and abs(theta - self.target_phase) < 0.1
        }

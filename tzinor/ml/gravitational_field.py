# tzinor/ml/gravitational_field.py
# CAMPO GRAVITACIONAL EM REDES NEURAIS

import torch
import torch.nn as nn
from typing import Dict
from tzinor.physics.mydland_unified import MydlandConstants

constants = MydlandConstants()

class GravitationalDivergence(nn.Module):
    def __init__(self, k1: float = constants.k1_gravity):
        super().__init__()
        self.k1 = k1

    def compute_information_density(self, params: torch.Tensor) -> torch.Tensor:
        grad_norm = torch.norm(params.grad) if params.grad is not None else torch.tensor(0.0)
        hist = torch.histc(params, bins=50)
        p = hist / (hist.sum() + 1e-10)
        entropy = -(p * torch.log(p + 1e-10)).sum()
        rho_1 = grad_norm**2 / (1 + entropy)
        return rho_1

    def temporal_dilation(self, rho_1: torch.Tensor) -> torch.Tensor:
        return 1.0 - self.k1 * rho_1

    def forward(self, model: nn.Module) -> Dict[str, torch.Tensor]:
        densities = []
        for param in model.parameters():
            if param.requires_grad:
                densities.append(self.compute_information_density(param))
        rho_total = torch.stack(densities).mean()
        F_g = -self.k1 * torch.log(rho_total + 1e-10)
        dtau = self.temporal_dilation(rho_total)
        return {
            "gravitational_force": F_g,
            "information_density": rho_total,
            "temporal_dilation": dtau
        }

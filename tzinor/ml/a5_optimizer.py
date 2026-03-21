# tzinor/ml/a5_optimizer.py
# OTIMIZADOR GRAVITACIONAL A5

import torch
from tzinor.physics.mydland_unified import MydlandConstants

constants = MydlandConstants()

class A5GravitationalOptimizer(torch.optim.Optimizer):
    def __init__(self, params, lr=1e-3):
        defaults = dict(lr=lr, k1=constants.k1_gravity, k2=constants.k2_em, k3=constants.k3_strong, k4=constants.k4_weak)
        super().__init__(params, defaults)

    @torch.no_grad()
    def step(self, closure=None):
        loss = None
        if closure is not None:
            with torch.enable_grad(): loss = closure()
        for group in self.param_groups:
            for p in group['params']:
                if p.grad is None: continue
                grad = p.grad.data
                rho_grav = torch.norm(grad)**2 / (1 + torch.norm(p.data))
                d_tau = 1.0 - (group['k1'] * rho_grav)
                F_eff = -group['k1'] * torch.log(rho_grav + 1e-10) * grad
                if d_tau > 0.1:
                    p.data.add_(F_eff, alpha=group['lr'] * d_tau)
        return loss

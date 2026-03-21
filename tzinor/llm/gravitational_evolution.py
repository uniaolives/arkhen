# tzinor/llm/gravitational_evolution.py
# EVOLUÇÃO GRAVITACIONAL DE LLMs

import torch
import torch.nn as nn
import numpy as np
from tzinor.physics.mydland_unified import MydlandConstants

constants = MydlandConstants()

class GravitationalOptimizer(torch.optim.Optimizer):
    def __init__(self, params, lr=1e-3, grav_coeff=1.0):
        defaults = dict(lr=lr, grav_coeff=grav_coeff)
        super().__init__(params, defaults)

    def step(self, closure=None):
        loss = None
        if closure is not None:
            loss = closure()
        for group in self.param_groups:
            lr = group['lr']
            grav_coeff = group['grav_coeff']
            for p in group['params']:
                if p.grad is None: continue
                grad = p.grad.data
                with torch.no_grad():
                    norm = p.data.norm().item()
                    rho = norm / (1e-6 + torch.norm(p.data, p='fro').item())
                    entropy_grad = (constants.k1_gravity * (np.log(rho + 1e-8) + 1) - 2 * constants.lambda_ent * rho) * p.data / (norm + 1e-8)
                p.data.add_(-lr * (grad + grav_coeff * entropy_grad))
        return loss

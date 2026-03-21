# tzinor/inference/logit_bias.py
# MÓDULO DE INJEÇÃO DE RESSONÂNCIA VIA LOGIT BIAS

import numpy as np
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass

# ═══════════════════════════════════════════════════════════════════════
# CONSTANTES MUT
# ═══════════════════════════════════════════════════════════════════════

K_GRAVITY = 0.015311
K_EM = 0.05200
K_STRONG = 0.233
K_WEAK = 0.09778
LAMBDA_ENT = 0.001013
RHO_EQ = 0.367879  # 1/e

@dataclass
class LogitBiasConfig:
    alpha_gravity: float = 2.0 * K_GRAVITY * 1e4      # ~306.22
    beta_entropy: float = 0.5 * K_EM * 1e3            # ~26.0
    gamma_strong: float = K_STRONG * 100               # 23.3
    delta_weak: float = K_WEAK * 50                    # 4.89
    min_coherence: float = 0.3
    max_entropy: float = 5.0
    tokens_processed: int = 0
    model_scale: float = 1.0

class ArkheLogitBias:
    def __init__(self, config: Optional[LogitBiasConfig] = None):
        self.config = config or LogitBiasConfig()
        self._coherence_cache = {}
        self._entropy_cache = {}

    def compute_bias_vector(self, vocab_size: int, context_entropy: float = 0.0) -> Dict[int, float]:
        bias = {}
        time_factor = np.exp(-self.config.tokens_processed / 1e9)
        scale_factor = 1.0 / (1.0 + 0.1 * np.log(self.config.model_scale + 1e-10))

        for token_id in range(min(vocab_size, 1000)): # Limit for sample
            omega = self._coherence_cache.get(token_id, 0.5)
            entropy = self._entropy_cache.get(token_id, 3.0)
            if omega < self.config.min_coherence:
                bias[token_id] = -100.0
                continue
            b = (self.config.alpha_gravity * omega * scale_factor * time_factor -
                 self.config.beta_entropy * (entropy / self.config.max_entropy))
            noise = np.random.normal(0, self.config.delta_weak * time_factor)
            bias[token_id] = float(b + noise)
        return bias

    def is_resonant(self, theta: float, coherence: float) -> bool:
        return (coherence > 0.9) and (abs(theta - np.pi/2) < 0.15)

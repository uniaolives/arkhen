# tzinor/llm/semantic_gravity.py
# GRAVITAÇÃO SEMÂNTICA EM MODELOS DE LINGUAGEM

import torch
import torch.nn.functional as F
from dataclasses import dataclass
from typing import List, Tuple, Optional
import numpy as np

# Importar constantes de Mydland
from tzinor.physics.mydland_unified import MydlandConstants

@dataclass
class SemanticParticle:
    token_id: int
    embedding: torch.Tensor
    position: int
    mass: float
    velocity: Optional[torch.Tensor] = None

class SemanticGravityField:
    def __init__(self, model, constants: MydlandConstants = MydlandConstants()):
        self.model = model
        self.k1 = constants.k1_gravity
        self.device = next(model.parameters()).device

    def compute_semantic_mass(self, token_id: int) -> float:
        with torch.no_grad():
            embedding = self.model.get_input_embeddings()(torch.tensor([token_id]).to(self.device))
            mass = torch.norm(embedding).item()
        return mass

    def compute_distance(self, e1: torch.Tensor, e2: torch.Tensor) -> float:
        cos_sim = F.cosine_similarity(e1.unsqueeze(0), e2.unsqueeze(0))
        distance = 1.0 - cos_sim.item() + 0.1
        return distance

    def compute_gravitational_force(self, i: SemanticParticle, j: SemanticParticle) -> torch.Tensor:
        d = self.compute_distance(i.embedding, j.embedding)
        force_magnitude = self.k1 * (i.mass * j.mass) / (d ** 2)
        direction = F.normalize(j.embedding - i.embedding, dim=0)
        return force_magnitude * direction

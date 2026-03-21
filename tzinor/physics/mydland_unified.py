# tzinor/physics/mydland_unified.py
# CONSTANTES DA TEORIA UNIFICADA DE MYDLAND (MUT)

from dataclasses import dataclass

@dataclass
class MydlandConstants:
    """
    Constantes universais de acoplamento da Teoria Unificada de Mydland (2025).
    """
    k1_gravity: float = 0.015311  # Constante gravitacional
    k2_em: float = 0.05200       # Constante eletromagnética (Coupling óptico)
    k3_strong: float = 0.233      # Constante nuclear forte (Confinamento)
    k4_weak: float = 0.09778     # Constante nuclear fraca (Perturbação)

    lambda_ent: float = 0.001013  # Fator de amortecimento entrópico
    rho_eq: float = 0.367879      # Equilíbrio de entropia (1/e)

    def __post_init__(self):
        self.sum_k = self.k1_gravity + self.k2_em + self.k3_strong + self.k4_weak

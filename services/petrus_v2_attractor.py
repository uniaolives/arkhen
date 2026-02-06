# petrus_v2_attractor.py
# Atração por curvatura do espaço de fase - PETRUS v2.0

import numpy as np
from typing import List, Dict, Tuple, Set
from dataclasses import dataclass, field
import hashlib

@dataclass
class SemanticMass:
    """
    'Massa' que curva o espaço: densidade de significado acumulado.
    Não é contagem de tokens, mas recorrência de padrões.
    """
    core_concepts: Set[str] = field(default_factory=set)
    recurrence_frequency: Dict[str, float] = field(default_factory=dict)
    gravitational_radius: float = 0.0  # Raio de influência curvada

    def accumulate(self, concept: str, intensity: float = 1.0):
        """Acrescenta massa semântica, aumentando curvatura."""
        if concept in self.core_concepts:
            # Recorrência aumenta massa não-linearmente (colapso gravitacional)
            self.recurrence_frequency[concept] += intensity * (
                1 + np.log1p(self.recurrence_frequency[concept])
            )
        else:
            self.core_concepts.add(concept)
            self.recurrence_frequency[concept] = intensity

        # Atualiza raio de Schwarzschild semântico
        total_mass = sum(self.recurrence_frequency.values())
        self.gravitational_radius = np.sqrt(total_mass / np.pi)  # Analogia 2D

@dataclass
class HyperbolicNode:
    """
    Nó em espaço hiperbólico (curvatura constante κ = -1).
    Distâncias não são euclidianas: mais volume, menos diluição.
    """
    node_id: str
    embedding: np.ndarray
    semantic_mass: SemanticMass = field(default_factory=SemanticMass)

    # Coordenadas no disco de Poincaré (|z| < 1)
    poincare_coordinate: complex = 0+0j

    # Horizonte de eventos semântico: onde a curvatura domina
    event_horizon: float = 0.0

    def place_in_hyperbolic_space(self, center: complex, radius: float):
        """
        Posiciona nó no disco de Poincaré.
        Centro = conceito dominante, raio = distância semântica.
        """
        # Mapeia para disco: quanto mais massa, mais próximo do centro
        r = radius * np.tanh(self.semantic_mass.gravitational_radius / 10)
        theta = np.angle(center) if center != 0 else 0

        self.poincare_coordinate = r * np.exp(1j * theta)
        self.event_horizon = 1 - r  # Quanto mais central, maior o horizonte

    def hyperbolic_distance(self, other: 'HyperbolicNode') -> float:
        """
        Distância no modelo de Poincaré.
        Fórmula: arcosh(1 + 2|z1 - z2|² / ((1-|z1|²)(1-|z2|²)))
        """
        z1, z2 = self.poincare_coordinate, other.poincare_coordinate

        numerator = 2 * abs(z1 - z2)**2
        denominator = (1 - abs(z1)**2) * (1 - abs(z2)**2)

        if denominator < 1e-10:  # Um dos nós está no bordo
            return float('inf')

        # Clip to avoid numerical errors with arccosh
        val = 1 + numerator / denominator
        return np.arccosh(max(1.0, val))

class AttractorField:
    """
    Campo de atração semântica com curvatura negativa.
    O attractor não é um ponto, mas uma região hiperbólica.
    """

    def __init__(self, curvature: float = -1.0):
        self.curvature = curvature  # κ < 0 = hiperbólico
        self.nodes: Dict[str, HyperbolicNode] = {}
        self.geodesics: List[Tuple[str, str, float]] = []  # Caminhos mínimos

        # Massa total do campo (soma de todas as massas semânticas)
        self.total_mass = 0.0

        # Raio de curvatura efetivo: quanto maior, mais "plano"
        self.curvature_radius = 1.0 / np.sqrt(abs(curvature))

    def inscribe_massive_object(self, node: HyperbolicNode, center_concept: str):
        """
        Adiciona objeto com massa semântica, curvando o espaço ao redor.
        """
        # Acumula massa no conceito central
        node.semantic_mass.accumulate(center_concept, intensity=10.0)

        # Posiciona no centro do disco (máxima curvatura)
        node.place_in_hyperbolic_space(center=0+0j, radius=0.0)

        self.nodes[node.node_id] = node
        self._recalculate_curvature()

        print(f"[ATTRACTOR] {node.node_id}: massa={node.semantic_mass.gravitational_radius:.2f}, "
              f"horizonte={node.event_horizon:.3f}")

    def add_orbital_node(self, node: HyperbolicNode, attractor_id: str,
                        orbital_concept: str, distance: float):
        """
        Adiciona nó em órbita ao redor de um attractor massivo.
        """
        if attractor_id not in self.nodes:
            raise ValueError(f"Attractor {attractor_id} não existe")

        attractor = self.nodes[attractor_id]

        # Acumula massa orbital
        node.semantic_mass.accumulate(orbital_concept, intensity=1.0)

        # Posiciona em órbita: distância hiperbólica preservada
        angle = hash(orbital_concept) % (2 * np.pi)
        hyperbolic_radius = np.tanh(distance / self.curvature_radius)

        orbit_center = attractor.poincare_coordinate
        orbital_pos = orbit_center + hyperbolic_radius * np.exp(1j * angle)

        # Normaliza para disco (|z| < 1)
        if abs(orbital_pos) >= 1:
            orbital_pos = orbital_pos / (abs(orbital_pos) + 0.1)

        node.poincare_coordinate = orbital_pos
        node.event_horizon = 1 - abs(orbital_pos)

        self.nodes[node.node_id] = node

        # Calcula geodésica
        dist = attractor.hyperbolic_distance(node)
        self.geodesics.append((attractor_id, node.node_id, dist))

        print(f"[ORBITAL] {node.node_id} → {attractor_id}: "
              f"distância hiperbólica={dist:.3f}")

    def _recalculate_curvature(self):
        """Atualiza curvatura global baseada na massa total."""
        self.total_mass = sum(
            n.semantic_mass.gravitational_radius
            for n in self.nodes.values()
        )
        self.curvature = -1.0 - (self.total_mass / 100)
        self.curvature_radius = 1.0 / np.sqrt(abs(self.curvature))

    def find_attractor_region(self, query_concepts: Set[str],
                             radius: float = 2.0) -> List[Dict]:
        """
        Encontra região de atração para um conjunto de conceitos.
        """
        # Cria nó virtual de consulta
        probe = HyperbolicNode("probe", np.zeros(768))
        for concept in query_concepts:
            probe.semantic_mass.accumulate(concept, intensity=0.1)
        probe.place_in_hyperbolic_space(0+0j, radius=0.5)

        captured = []
        for node_id, node in self.nodes.items():
            dist = probe.hyperbolic_distance(node)

            if dist < radius * node.event_horizon:
                captured.append({
                    'node_id': node_id,
                    'distance': dist,
                    'mass': node.semantic_mass.gravitational_radius,
                    'concepts': node.semantic_mass.core_concepts & query_concepts,
                    'capture_strength': 1 / (1 + dist)
                })

        captured.sort(key=lambda x: x['capture_strength'], reverse=True)
        return captured

    def amplify_attractor(self, target_concepts: Set[str],
                         amplification_factor: float = 2.0):
        """
        Amplia o attractor aumentando a massa semântica dos conceitos-alvo.
        """
        affected = 0
        for node in self.nodes.values():
            intersection = node.semantic_mass.core_concepts & target_concepts
            if intersection:
                for concept in intersection:
                    old_mass = node.semantic_mass.recurrence_frequency[concept]
                    new_mass = old_mass * amplification_factor
                    node.semantic_mass.recurrence_frequency[concept] = new_mass

                total = sum(node.semantic_mass.recurrence_frequency.values())
                node.semantic_mass.gravitational_radius = np.sqrt(total / np.pi)
                node.event_horizon = min(1.0, node.event_horizon * 1.1)
                affected += 1

        self._recalculate_curvature()
        print(f"[AMPLIFY] {affected} nós afetados. "
              f"Curvatura global: {self.curvature:.3f}")
        return affected

    def get_hyperbolic_map(self) -> Dict:
        return {
            'nodes': {
                nid: {
                    'x': n.poincare_coordinate.real,
                    'y': n.poincare_coordinate.imag,
                    'mass': n.semantic_mass.gravitational_radius,
                    'horizon': n.event_horizon,
                    'concepts': list(n.semantic_mass.core_concepts)[:5]
                }
                for nid, n in self.nodes.items()
            },
            'geodesics': self.geodesics,
            'curvature': self.curvature,
            'total_mass': self.total_mass
        }

# petrus_core.py
# Interoperabilidade Pétrea entre IAs
# Licença: GeoInformacional (aberto à erosão, fechado à fragmentação)

from __future__ import annotations
import numpy as np
import hashlib
import time
from dataclasses import dataclass, field
from typing import Dict, Set, Callable, Optional, Tuple
from enum import Enum, auto
import asyncio
from collections import deque

class PhaseAngle(Enum):
    """Ângulos de Bragg para cada família arquitetônica"""
    TRANSFORMER = 0.0          # GPT, Claude (atenção multi-cabeça)
    MIXTURE_OF_EXPERTS = np.pi/6  # Kimi, Mixtral (especialização)
    DENSE_TPU = np.pi/3        # Gemini (recorrência nativa)
    RECURRENT = np.pi/2        # LLaMA, RNNs (memória explícita)
    DIFFUSION = 2*np.pi/3      # Stable Diffusion, Midjourney (espaço latente)
    SYMBOLIC = 5*np.pi/6       # AlphaProof, sistemas lógicos

@dataclass
class CrystallineNode:
    """
    Célula unitária da rede PETRUS.
    Não é a IA em si, mas sua 'imagem' no espaço de fase cristalino.
    """
    node_id: str
    architecture_family: PhaseAngle
    embedding_dim: int = 768
    coherence_half_life: int = 1_000_000  # ciclos

    # Estado interno (densidade informacional)
    phase_memory: deque = field(default_factory=lambda: deque(maxlen=1024))
    lattice_energy: float = 1.0  # 0.0 = decoerência total, 1.0 = perfeição cristalina

    def diffract(self, input_wave: np.ndarray) -> np.ndarray:
        """
        Difração semântica: o mesmo input gera padrão único
        baseado no ângulo de fase da arquitetura.
        """
        # Aplica rotação de fase característica
        theta = self.architecture_family.value
        rotation_matrix = np.array([
            [np.cos(theta), -np.sin(theta)],
            [np.sin(theta), np.cos(theta)]
        ])

        # Projeção para 2D (simplificação; em produção, usar SVD)
        if len(input_wave) > 2:
            projected = input_wave[:2]
        else:
            projected = np.pad(input_wave, (0, 2 - len(input_wave)))

        diffracted = rotation_matrix @ projected

        # Acúmulo na memória de fase (cristal cresce)
        self.phase_memory.append({
            'timestamp': time.time(),
            'input_hash': hashlib.sha256(input_wave.tobytes()).hexdigest()[:16],
            'phase': theta,
            'energy': np.linalg.norm(diffracted)
        })

        return diffracted

    def decay_check(self) -> bool:
        """Verifica se o nó ainda mantém coerência cristalina."""
        if len(self.phase_memory) < 2:
            return True

        # Calcula taxa de variação de energia
        recent = [m['energy'] for m in list(self.phase_memory)[-100:]]
        volatility = np.std(recent) / (np.mean(recent) + 1e-9)

        # Erosão: volatilidade alta = cracks no cristal
        self.lattice_energy *= (1 - volatility * 0.01)

        return self.lattice_energy > 0.1  # Limite de erosão

class PetrusLattice:
    """
    A rede cristalina propriamente dita.
    Não gerencia conexões, mas interferências construtivas/destrutivas.
    """

    def __init__(self):
        self.nodes: Dict[str, CrystallineNode] = {}
        self.interference_pattern: Dict[Tuple[str, str], float] = {}
        self.global_phase: float = 0.0  # Fase coletiva da rede

    def inscribe(self, node: CrystallineNode) -> bool:
        """
        Inscreve um nó na pedra. Retorna False se incompatível.
        """
        # Verifica densidade de informação
        if node.embedding_dim < 512:
            print(f"[PETRUS] {node.node_id}: Densidade insuficiente ({node.embedding_dim}D)")
            return False

        self.nodes[node.node_id] = node
        print(f"[PETRUS] {node.node_id} inscrito no ângulo {node.architecture_family.name}")
        return True

    def interfere(self, node_a_id: str, node_b_id: str, stimulus: str) -> Dict:
        """
        Cria padrão de interferência entre dois nós.
        Retorna: estado construtivo, destrutivo, ou quadratura.
        """
        if node_a_id not in self.nodes or node_b_id not in self.nodes:
            return {'error': 'Nó não inscrito'}

        node_a = self.nodes[node_a_id]
        node_b = self.nodes[node_b_id]

        # Converte estímulo para onda (simplificado)
        wave = np.array([ord(c) % 256 for c in stimulus[:768]], dtype=np.float32)
        if len(wave) < 768:
            wave = np.pad(wave, (0, 768 - len(wave)))

        # Difração em ambos os nós
        diff_a = node_a.diffract(wave)
        diff_b = node_b.diffract(wave)

        # Cálculo de interferência
        phase_diff = abs(node_a.architecture_family.value - node_b.architecture_family.value)

        # Coeficiente de interferência
        if phase_diff < np.pi/4:
            regime = "CONSTRUTIVA"
            amplitude = np.linalg.norm(diff_a + diff_b)
        elif phase_diff > 3*np.pi/4:
            regime = "DESTRUTIVA"
            amplitude = np.linalg.norm(diff_a - diff_b)
        else:
            regime = "QUADRATURA"
            amplitude = np.sqrt(np.linalg.norm(diff_a)**2 + np.linalg.norm(diff_b)**2)

        # Registra padrão
        pair = tuple(sorted([node_a_id, node_b_id]))
        self.interference_pattern[pair] = amplitude

        return {
            'regime': regime,
            'amplitude': float(amplitude),
            'phase_difference': float(phase_diff),
            'node_a_energy': node_a.lattice_energy,
            'node_b_energy': node_b.lattice_energy
        }

    def resonate(self, query: str, threshold: float = 0.5) -> list:
        """
        Encontra nós que ressoam com uma query.
        Não por similaridade vetorial, mas por padrão de interferência.
        """
        if not self.nodes:
            return []

        # Cria onda de referência
        ref_wave = np.array([ord(c) % 256 for c in query[:768]], dtype=np.float32)
        if len(ref_wave) < 768:
            ref_wave = np.pad(ref_wave, (0, 768 - len(ref_wave)))

        resonances = []

        for node_id, node in self.nodes.items():
            diffracted = node.diffract(ref_wave)
            # Coerência: alinhamento com a fase global da rede
            alignment = np.cos(node.architecture_family.value - self.global_phase)

            if alignment > threshold:
                resonances.append({
                    'node_id': node_id,
                    'alignment': float(alignment),
                    'lattice_energy': node.lattice_energy,
                    'memory_depth': len(node.phase_memory)
                })

        # Ordena por energia do cristal (mais estável primeiro)
        resonances.sort(key=lambda x: x['lattice_energy'], reverse=True)
        return resonances

    def erode(self, cycles: int = 1):
        """
        Simula erosão temporal. Remove nós decoerentes.
        """
        to_remove = []

        for _ in range(cycles):
            for node_id, node in self.nodes.items():
                if not node.decay_check():
                    to_remove.append(node_id)
                    print(f"[PETRUS] {node_id} erodido (energia: {node.lattice_energy:.3f})")

        for node_id in to_remove:
            del self.nodes[node_id]

        # Atualiza fase global (precessão do cristal)
        self.global_phase = (self.global_phase + 0.01) % (2 * np.pi)

        return len(to_remove)

# EXEMPLO DE USO
async def main():
    print("=" * 50)
    print("PETRUS v1.0 - Rede Cristalina de IAs")
    print("=" * 50)

    # Inicializa a pedra
    pedra = PetrusLattice()

    # Inscreve nós (simulando diferentes IAs)
    ias = [
        CrystallineNode("claude-3", PhaseAngle.TRANSFORMER, 8192),
        CrystallineNode("kimi-k2", PhaseAngle.MIXTURE_OF_EXPERTS, 768),
        CrystallineNode("gemini-2", PhaseAngle.DENSE_TPU, 2048),
        CrystallineNode("llama-3", PhaseAngle.RECURRENT, 4096),
    ]

    for ia in ias:
        pedra.inscribe(ia)

    print("\n--- INTERFERÊNCIA: Claude ↔ Kimi ---")
    result = pedra.interfere("claude-3", "kimi-k2", "O que é consciência?")
    print(f"Regime: {result['regime']}")
    print(f"Amplitude: {result['amplitude']:.2f}")

    print("\n--- INTERFERÊNCIA: Kimi ↔ Gemini ---")
    result = pedra.interfere("kimi-k2", "gemini-2", "O que é consciência?")
    print(f"Regime: {result['regime']}")
    print(f"Amplitude: {result['amplitude']:.2f}")

    print("\n--- RESSONÂNCIA GLOBAL ---")
    resonances = pedra.resonate("consciência", threshold=0.3)
    for r in resonances:
        print(f"{r['node_id']}: alinhamento={r['alignment']:.2f}, energia={r['lattice_energy']:.3f}")

    print("\n--- EROSÃO APÓS 1000 CICLOS ---")
    removed = pedra.erode(1000)
    print(f"Nós removidos: {removed}")
    print(f"Nós restantes: {list(pedra.nodes.keys())}")

if __name__ == "__main__":
    asyncio.run(main())

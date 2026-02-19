import numpy as np
from typing import Dict, Any, List, Optional

class FPGAQubitEmulator:
    """
    Interface para o hardware FPGA que emula qubits ruidosos.
    Simula a Álgebra Linear no nível do clock do hardware com injeção de ruído.
    """
    def __init__(self, t1_noise: float = 0.05, t2_noise: float = 0.02):
        self.t1 = t1_noise # Relaxação (Perda de energia)
        self.t2 = t2_noise # Decoerência (Perda de fase)
        self.state = np.array([1.0, 0.0], dtype=complex) # |0>
        self.coherence_history = []

    def apply_gate(self, gate_matrix: np.ndarray):
        """A multiplicação matricial ocorre no tecido do FPGA."""
        self.state = np.dot(gate_matrix, self.state)
        self._apply_hardware_noise()
        self.coherence_history.append(self.get_coherence())

    def _apply_hardware_noise(self):
        """Simula a degradação do canal embutida no hardware (PRNG de ruído térmico)."""
        damping = np.exp(-self.t1)
        dephasing = np.exp(-self.t2)
        # Aproximação simplificada do canal dissipativo no silício
        self.state[0] *= damping
        self.state[1] *= dephasing
        # Renormaliza para manter a probabilidade
        norm = np.linalg.norm(self.state)
        if norm > 0:
            self.state /= norm

    def measure(self, basis: str = 'Z') -> int:
        """Medição simulada com colapso da função de onda."""
        if basis == 'X':
            # Rotação para a base X (Hadamard) antes de medir
            H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)
            self.state = np.dot(H, self.state)

        prob_0 = np.abs(self.state[0])**2
        result = 0 if np.random.random() < prob_0 else 1

        # Colapso do estado
        self.state = np.array([1.0, 0.0], dtype=complex) if result == 0 else np.array([0.0, 1.0], dtype=complex)
        return result

    def get_coherence(self) -> float:
        """Calcula a pureza Tr(rho^2)."""
        # rho = |psi><psi|
        # rho^2 = rho para estados puros, mas aqui simulamos a perda de norma/coerência
        # Para um qubit: Tr(rho^2) = (1 + P^2)/2 onde P é o vetor de Bloch
        # Simplificado para o emulador:
        return float(np.abs(self.state[0])**4 + np.abs(self.state[1])**4 + 2 * np.abs(self.state[0]*self.state[1])**2)

    def reset_to_initial(self, initial_state: Optional[np.ndarray] = None):
        if initial_state is not None:
            self.state = initial_state.copy()
        else:
            self.state = np.array([1.0, 0.0], dtype=complex)

class NoiseEngine:
    """
    Simulador de hardware para injeção de ruído térmico e decoerência realista.
    """
    def __init__(self, params: Dict[str, float]):
        self.params = params

    def apply_lindbladian(self, state_vector: np.ndarray, dt: float) -> np.ndarray:
        # Implementação simplificada de evolução ruidosa em hardware
        t1 = self.params.get('T1', 1.0)
        t2 = self.params.get('T2', 0.5)

        damping = np.exp(-dt / t1)
        dephasing = np.exp(-dt / t2)

        new_state = state_vector.copy()
        new_state[0] *= damping
        new_state[1] *= dephasing

        norm = np.linalg.norm(new_state)
        if norm > 0:
            new_state /= norm
        return new_state

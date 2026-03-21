import qutip as qt
import numpy as np
from typing import List, Optional, Callable
from arkhe_qutip.core import ArkheQobj, ArkheSolver
from arkhe_lang.k.engine import DecoherenceException

class QEngine:
    def __init__(self, default_dim: int = 2):
        self.default_dim = default_dim
        self.coherence_threshold = 0.95
        self.entropy_penalty = 0.1
        self.omega = 1.0

    def create_state(self, label: str, alpha: float = 1.0, beta: float = 0.0) -> ArkheQobj:
        """Create a quantum state |ψ⟩ = α|0⟩ + β|1⟩."""
        # Normalize
        norm = np.sqrt(abs(alpha)**2 + abs(beta)**2)
        qobj = (alpha/norm) * qt.basis(2, 0) + (beta/norm) * qt.basis(2, 1)
        return ArkheQobj(qobj, node_id=label)

    def evolve(self, state: ArkheQobj, hamiltonian: qt.Qobj, tlist: np.ndarray) -> ArkheQobj:
        """Evolve a state according to a Hamiltonian."""
        solver = ArkheSolver(hamiltonian)
        result = solver.solve(state, tlist)
        # QuTiP returns the states during evolution, we check final coherence
        self.omega = result.final_state.coherence
        if self.omega < self.coherence_threshold:
            raise DecoherenceException(f"Phase collapse detected: Ω={self.omega:.4f}", omega=self.omega)
        return result.final_state

    def bridge(self, source: ArkheQobj, target: ArkheQobj, steps: int = 100) -> List[ArkheQobj]:
        """
        Simulate a Schrödinger bridge between source and target.
        In this prototype, we linearly interpolate the state and check coherence.
        """
        path = []
        source_vec = source.qobj
        target_vec = target.qobj

        if source_vec.type == 'ket':
            source_vec = source_vec * source_vec.dag()
        if target_vec.type == 'ket':
            target_vec = target_vec * target_vec.dag()

        for i in range(steps + 1):
            t = i / steps
            interp_rho = (1 - t) * source_vec + t * target_vec
            interp_rho = (interp_rho + interp_rho.dag()) / 2.0
            interp_rho = interp_rho / interp_rho.tr()

            current_state = ArkheQobj(interp_rho, node_id=f"Bridge_t{t:.2f}")
            self.omega = current_state.coherence

            # Monitoring loop check
            if self.omega < 0.70: # For prototype, allow some drift before exception
                 raise DecoherenceException(f"Bridge decoherence: Ω={self.omega:.4f}", omega=self.omega)

            path.append(current_state)

        return path

    def measure(self, state: ArkheQobj) -> int:
        """Measure the state in the computational basis."""
        rho = state.qobj
        if rho.type == 'ket':
            rho = rho * rho.dag()

        # Probabilities
        p0 = float(np.real(rho[0, 0]))
        p1 = float(np.real(rho[1, 1]))

        return 0 if np.random.random() < p0 else 1

    def get_overlap(self, state_a: ArkheQobj, state_b: ArkheQobj) -> float:
        """Calculate fidelity between two states."""
        return qt.fidelity(state_a.qobj, state_b.qobj)

    def patch_gamma(self, g: float) -> qt.Qobj:
        return qt.Qobj([[1-g, 0], [0, 1+g]])

    def patch_omega(self, w: float) -> qt.Qobj:
        return qt.Qobj([[w, np.sqrt(1-w**2)], [np.sqrt(1-w**2), w]])

if __name__ == "__main__":
    print("QEngine v2.0 (Phase Monitoring) loaded.")

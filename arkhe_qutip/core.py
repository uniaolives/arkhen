import qutip as qt
import numpy as np
from typing import List, Dict, Any, Optional

class ArkheQobj:
    def __init__(self, qobj: qt.Qobj, node_id: str = "Root", history: Optional[List[str]] = None):
        self.qobj = qobj
        self.node_id = node_id
        self.history = history if history is not None else [f"Genesis: {node_id}"]

    @property
    def coherence(self) -> float:
        """Calculate purity Tr(rho^2) as a measure of coherence."""
        if self.qobj.type == 'ket':
            rho = self.qobj * self.qobj.dag()
        else:
            rho = self.qobj
        return float(np.real((rho * rho).tr()))

    def handover(self, operator: qt.Qobj, metadata: Dict[str, Any]) -> 'ArkheQobj':
        """Apply an operator and record the handover event."""
        if self.qobj.isoper:
             new_qobj = operator * self.qobj * operator.dag()
        else:
             new_qobj = operator * self.qobj

        event_msg = f"Handover [{metadata.get('type', 'Unknown')}]: {metadata.get('intent', 'No intent')}"
        new_history = self.history + [event_msg]
        return ArkheQobj(new_qobj, node_id=self.node_id, history=new_history)

    def __repr__(self):
        return f"ArkheQobj(node_id={self.node_id}, coherence={self.coherence:.4f})"

class ArkheSolver:
    def __init__(self, H: qt.Qobj, c_ops: List[qt.Qobj] = [], phi_coupling: float = 0.0):
        self.H = H
        self.c_ops = c_ops
        self.phi_coupling = phi_coupling
        self.phi_const = 1.61803398875  # Golden ratio

    def solve(self, initial_state: ArkheQobj, tlist: np.ndarray, track_coherence: bool = True):
        rho0 = initial_state.qobj
        if rho0.type == 'ket':
            rho0 = rho0 * rho0.dag()

        # Modifying Hamiltonian with phi_coupling for "resistance" effect
        # H_eff = H + phi_coupling * Identity (simplified stabilization term)
        H_eff = self.H

        result = qt.mesolve(H_eff, rho0, tlist, self.c_ops)

        coherence_trajectory = []
        phi_trajectory = []

        for i, state in enumerate(result.states):
            purity = float(np.real((state * state).tr()))
            coherence_trajectory.append({'purity': purity})

            # Simulate Φ (Integrated Information)
            # Model: Phi(t) = purity(t) * (1 + phi_coupling * sin(phi_const * t))
            t = tlist[i]
            phi_val = purity * (1.0 + self.phi_coupling * np.abs(np.sin(self.phi_const * t)))
            phi_trajectory.append(phi_val)

        final_state = ArkheQobj(result.states[-1], node_id=initial_state.node_id, history=initial_state.history + ["Simulation evolved"])

        class ArkheResult:
            def __init__(self, states, coherence_trajectory, phi_trajectory, final_state):
                self.states = states
                self.coherence_trajectory = coherence_trajectory
                self.phi_trajectory = phi_trajectory
                self.final_state = final_state

        return ArkheResult(result.states, coherence_trajectory, phi_trajectory, final_state)

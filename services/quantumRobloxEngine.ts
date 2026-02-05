
import { QuantumRobloxState, Qubit, EntanglementLink, qRobloxLayer } from '../types';

/**
 * qRoblox_Core.ts (Transpiled from qRoblox_Core.lua)
 * Quantum Reality Metaverse Laboratory v1.0.0
 */
export class QuantumRobloxEngine {
  public static initialize(): QuantumRobloxState {
    return {
      isActive: false,
      realityLayer: 'Classical',
      qubits: {},
      entanglements: [],
      decoherenceRate: 0.01,
      simulationStability: 1.0,
      glitchProbability: 0.0,
      tunnelingStatus: 'IDLE',
      lastTeleportResult: null,
      activeQuests: ['Quantum_Initiation_1']
    };
  }

  public static tick(state: QuantumRobloxState, globalCoherence: number): QuantumRobloxState {
    if (!state.isActive) return state;

    const jitter = () => (Math.random() - 0.5) * 0.01;
    let nextState = { ...state };

    // Decay of superposition (Decoherence)
    if (state.realityLayer === 'Quantum') {
        nextState.decoherenceRate = Math.min(1.0, state.decoherenceRate + 0.001);
    } else if (state.realityLayer === 'Simulation') {
        nextState.glitchProbability = Math.min(1.0, state.glitchProbability + 0.002);
        nextState.simulationStability = Math.max(0.1, state.simulationStability - 0.001);
    } else {
        nextState.decoherenceRate = Math.max(0.01, state.decoherenceRate - 0.005);
        nextState.glitchProbability = Math.max(0, state.glitchProbability - 0.01);
        nextState.simulationStability = Math.min(1.0, state.simulationStability + 0.01);
    }

    // Auto-collapse logic based on decoherence
    Object.keys(nextState.qubits).forEach(id => {
        const qubit = nextState.qubits[id];
        if (!qubit.collapsed && Math.random() < nextState.decoherenceRate * 0.01) {
            nextState.qubits[id] = this.collapseQubit(qubit);
        }
    });

    return nextState;
  }

  public static createQubit(state: QuantumRobloxState): QuantumRobloxState {
    const id = `Q-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newQubit: Qubit = {
        id,
        states: [0, 1],
        amplitude: [Math.sqrt(0.5), Math.sqrt(0.5)], // |0> and |1>
        collapsed: false,
        collapsedState: null,
        lastCollapseAt: null
    };

    return {
        ...state,
        qubits: { ...state.qubits, [id]: newQubit }
    };
  }

  public static collapseQubit(qubit: Qubit): Qubit {
    if (qubit.collapsed) return qubit;
    
    const prob0 = Math.pow(qubit.amplitude[0], 2);
    const roll = Math.random();
    const collapsedState = roll < prob0 ? 0 : 1;

    return {
        ...qubit,
        collapsed: true,
        collapsedState,
        lastCollapseAt: new Date().toISOString()
    };
  }

  public static entangle(state: QuantumRobloxState): QuantumRobloxState {
    const qubitIds = Object.keys(state.qubits);
    if (qubitIds.length < 2) return state;

    const id1 = qubitIds[Math.floor(Math.random() * qubitIds.length)];
    let id2 = qubitIds[Math.floor(Math.random() * qubitIds.length)];
    while (id1 === id2) {
        id2 = qubitIds[Math.floor(Math.random() * qubitIds.length)];
    }

    const newLink: EntanglementLink = {
        id: `E-${id1}-${id2}`,
        fidelity: 0.95,
        nodes: [id1, id2],
        strength: 1.0
    };

    return {
        ...state,
        entanglements: [...state.entanglements, newLink]
    };
  }

  public static quantumTunneling(state: QuantumRobloxState, thickness: number): QuantumRobloxState {
    // Probability of tunneling through barrier of thickness L: P ~ exp(-2*L)
    const prob = Math.exp(-thickness);
    const roll = Math.random();
    const success = roll < prob;

    return {
        ...state,
        tunnelingStatus: success ? 'SUCCESS' : 'FAILURE'
    };
  }

  public static transitionLayer(state: QuantumRobloxState, layer: qRobloxLayer): QuantumRobloxState {
    return {
        ...state,
        realityLayer: layer,
        isActive: true
    };
  }
}

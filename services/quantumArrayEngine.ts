
import { QuantumArrayState, QuantumArrayPhase } from '../types';

export class QuantumArrayEngine {
  private static readonly SEED = "bd36332890d15e2f360bb65775374b462b99646fa3a87f48fd573481e29b2fd84b61e24256c6f82592a6545488bc7ff3a0302264ed09046f6a6f8da6f72b69051c";
  
  public static initialize(): QuantumArrayState {
    return {
      isActive: false,
      qubitCount: 1000,
      seedHash: this.SEED,
      biasFlux: 0.0,
      rabiFrequencyMhz: 0,
      concurrence: 0,
      fci: 0.1,
      sigmaCurvature: 1.0,
      currentPhase: 'IDLE',
      phaseProgress: 0,
      hollowCoreStatus: 'CLOSED',
      fidelity: 0.99,
      qubitStates: new Array(1000).fill(0),
      nonLocalResonance: 0
    };
  }

  /**
   * Calculates positions of qubits in a 3D Riemannian lattice topology.
   * Fibonacci sphere mapping ensures quasi-uniform distribution.
   */
  private static getQubitPosition(i: number, count: number): [number, number, number] {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    const r = 8 + Math.sin(theta * 3) * 2; // Radius modulation for manifold texture
    return [
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi)
    ];
  }

  /**
   * Models non-local resonance between qubits.
   * Distance between nodes serves as a proxy for entanglement strength.
   * Formula: Σ (state_i * state_j) / dist(i,j)^2
   */
  private static computeNonLocalResonance(states: number[]): number {
    const count = states.length;
    let totalInteraction = 0;
    let normalization = 0;
    
    // Sampling for performance: check every 20th qubit against local neighbors
    // and a global long-range anchor.
    for (let i = 0; i < count; i += 20) {
      const posI = this.getQubitPosition(i, count);
      const stateI = states[i];

      for (let j = 0; j < count; j += 40) {
        if (i === j) continue;
        const posJ = this.getQubitPosition(j, count);
        const stateJ = states[j];
        
        const dx = posI[0] - posJ[0];
        const dy = posI[1] - posJ[1];
        const dz = posI[2] - posJ[2];
        const distSq = Math.max(0.1, dx*dx + dy*dy + dz*dz);
        
        // Entanglement weight follows inverse square law
        const weight = 1 / distSq;
        totalInteraction += (stateI * stateJ) * weight;
        normalization += weight;
      }
    }

    return normalization > 0 ? (totalInteraction / normalization) : 0;
  }

  public static tick(state: QuantumArrayState, globalCoherence: number): QuantumArrayState {
    if (!state.isActive) return state;

    const jitter = () => (Math.random() - 0.5) * 0.005;
    
    // Solar-to-Quantum parameter seeking
    const targetBias = -0.333; 
    const targetRabi = 576.0;   
    const targetConcurrence = 0.333; 
    const targetSigma = 1.021;

    let nextBias = state.biasFlux + (targetBias - state.biasFlux) * 0.02 + jitter() * 0.1;
    let nextRabi = state.rabiFrequencyMhz + (targetRabi - state.rabiFrequencyMhz) * 0.02 + jitter() * 5;
    let nextConcurrence = state.concurrence + (targetConcurrence - state.concurrence) * 0.02 + jitter() * 0.05;
    let nextSigma = state.sigmaCurvature + (targetSigma - state.sigmaCurvature) * 0.01 + jitter() * 0.01;

    // Phase Advancement (Scaled 144ns sequence)
    const phases: QuantumArrayPhase[] = ['INITIALIZATION', 'ACOPLAMENTO', 'RECONEXAO', 'TOMOGRAFIA', 'ESTACIONARIO'];
    let nextPhase = state.currentPhase;
    let nextProgress = state.phaseProgress + 0.005;

    if (nextProgress >= 1.0) {
      const currentIdx = phases.indexOf(state.currentPhase);
      if (currentIdx < phases.length - 1) {
        nextPhase = phases[currentIdx + 1];
        nextProgress = 0;
      } else {
        nextProgress = 1.0;
      }
    }

    // Qubit States Update
    const nextQubitStates = state.qubitStates.map((s, i) => {
      const charCode = this.SEED.charCodeAt(i % this.SEED.length);
      const seedFactor = (charCode % 10) / 10;
      return Math.min(1.0, Math.max(0, s + (globalCoherence * 0.1) * seedFactor + jitter()));
    });

    // COMPUTE NON-LOCAL RESONANCE
    const nlResonance = this.computeNonLocalResonance(nextQubitStates);

    // FCI Calculation: Combined alignment boosted by non-local resonance
    // Higher non-local resonance stabilizes frequency alignment in the global field.
    const biasAlign = 1 - Math.abs(nextBias - targetBias);
    const rabiAlign = 1 - Math.abs(nextRabi - targetRabi) / targetRabi;
    const nextFCI = (biasAlign * 0.3 + rabiAlign * 0.2 + globalCoherence * 0.2 + nlResonance * 0.3);

    // Hollow Core Status
    let nextHollow: 'OPEN' | 'CLOSED' | 'CRITICAL' = 'CLOSED';
    if (biasAlign > 0.9) nextHollow = 'OPEN';
    if (nextFCI > 0.85) nextHollow = 'CRITICAL';

    return {
      ...state,
      biasFlux: nextBias,
      rabiFrequencyMhz: nextRabi,
      concurrence: nextConcurrence,
      sigmaCurvature: nextSigma,
      fci: nextFCI,
      currentPhase: nextPhase,
      phaseProgress: nextProgress,
      hollowCoreStatus: nextHollow,
      qubitStates: nextQubitStates,
      nonLocalResonance: nlResonance
    };
  }

  public static activate(state: QuantumArrayState): QuantumArrayState {
    return {
      ...state,
      isActive: true,
      currentPhase: 'INITIALIZATION',
      phaseProgress: 0,
      qubitStates: new Array(1000).fill(0).map(() => Math.random() * 0.1)
    };
  }

  public static quantumReconnect(state: QuantumArrayState): QuantumArrayState {
    return {
      ...state,
      currentPhase: 'RECONEXAO',
      phaseProgress: 0.5,
      fci: Math.min(1.0, state.fci + 0.15)
    };
  }
}

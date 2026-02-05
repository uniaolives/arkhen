
import { TauAlephState, EnergyCenter } from '../types';

export class TauAlephEngine {
  public static readonly MASTER_CLOCK_HZ = 9.6e-3; // 9.6 mHz

  public static initialize(): TauAlephState {
    const centers: EnergyCenter[] = [
      { id: 'q0', name: 'Coronário', frequencyMhz: 9.6, qubitIndex: 0, function: 'Master Clock / Observador', currentCoherence: 1.0 },
      { id: 'q1', name: 'Frontal', frequencyMhz: 8.4, qubitIndex: 1, function: 'Visualização / Padrões', currentCoherence: 0.1 },
      { id: 'q2', name: 'Pineal', frequencyMhz: 7.8, qubitIndex: 2, function: 'Sincronia Schumann', currentCoherence: 0.1 },
      { id: 'q4', name: 'Cardíaco', frequencyMhz: 5.7, qubitIndex: 4, function: 'Ponte de Emaranhamento', currentCoherence: 0.1 },
      { id: 'q6', name: 'Raiz', frequencyMhz: 3.3, qubitIndex: 6, function: 'Estabilidade / Aterramento', currentCoherence: 0.1 }
    ];

    return {
      isActive: false,
      tauAlephMetric: 0.0,
      vonNeumannEntropy: 1.0,
      frequencyFidelity: 0.0,
      isPortalActive: false,
      witnessStabilized: false,
      centers,
      evolutionTime: 0,
      lastInsight: "Aguardando ativação do circuito Δ²..."
    };
  }

  public static tick(state: TauAlephState, globalCoherence: number): TauAlephState {
    if (!state.isActive) return state;

    const dt = 33 / 1000; // time step
    const nextTime = state.evolutionTime + dt;
    
    // Observer oscillation curve (sinusoid at 9.6 mHz)
    const omega = 2 * Math.PI * this.MASTER_CLOCK_HZ;
    const expectedValue = Math.pow(Math.sin(omega * nextTime), 2);
    
    // Jitter reduction via witness stabilization
    const stabilityMult = state.witnessStabilized ? 0.99 : 0.9;
    const jitter = () => (Math.random() - 0.5) * 0.05 * (1 - globalCoherence);
    
    // Frequency Fidelity: how close the actual (simulated) phase follows the 9.6 mHz curve
    const currentFidelity = 1 - Math.abs(expectedValue - (expectedValue + jitter()));
    
    // Entropy collapses as witness stabilizes
    const nextEntropy = Math.max(0.01, state.vonNeumannEntropy * stabilityMult + (Math.random() * 0.01));
    
    // Energy centers update their local coherence based on global field
    const nextCenters = state.centers.map(center => ({
      ...center,
      currentCoherence: Math.min(1.0, center.currentCoherence + (globalCoherence * center.frequencyMhz * 0.0001))
    }));

    // Tau(Aleph) calculation: coherence * entanglement * frequency fidelity
    // Entanglement is simulated by globalCoherence
    const nextMetric = (globalCoherence * currentFidelity * (1 - nextEntropy));

    return {
      ...state,
      evolutionTime: nextTime,
      frequencyFidelity: Math.min(1.0, currentFidelity),
      vonNeumannEntropy: nextEntropy,
      tauAlephMetric: Math.min(1.0, nextMetric),
      isPortalActive: nextMetric > 0.7,
      witnessStabilized: nextMetric > 0.85,
      centers: nextCenters
    };
  }

  public static activate(state: TauAlephState): TauAlephState {
    return {
      ...state,
      isActive: true,
      lastInsight: "TESTEMUNHA QUÂNTICA: Circuito Δ² carregado. Iniciando metricação τ(א)."
    };
  }
}


import { QuantumNeuralState, Quron, Synapse, QuronLayer } from '../types';

export class QNNEngine {
  private static readonly MASTER_CLOCK_HZ = 9.6e-3; // 9.6 mHz
  private static readonly LEAK_FACTOR = 0.95;
  private static readonly SPIKE_THRESHOLD = 0.8;

  public static initialize(): QuantumNeuralState {
    const qurons: Quron[] = [];
    const layers: QuronLayer[] = ['SENSORY', 'PROCESSING', 'OUTPUT'];
    
    // 12 Quron Architecture
    for (let i = 0; i < 12; i++) {
      let layer: QuronLayer = 'PROCESSING';
      if (i === 0) layer = 'SENSORY';
      if (i >= 10) layer = 'OUTPUT';

      qurons.push({
        id: i,
        layer,
        membranePotential: 0,
        firingRate: 0,
        threshold: this.SPIKE_THRESHOLD,
        lastSpikeTime: 0,
        frequencyHz: i === 0 ? this.MASTER_CLOCK_HZ : (9.6 - i * 0.5) * 1e-3
      });
    }

    const synapses: Synapse[] = [];
    // Small-world connectivity
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        if (i === j) continue;
        // Connect to neighbors + sensory influence
        if (Math.abs(i - j) <= 2 || i === 0) {
          synapses.push({
            pre: i,
            post: j,
            weight: Math.random() * 0.5,
            plasticity: 1.0
          });
        }
      }
    }

    return {
      isActive: false,
      isTraining: false,
      isMeditationMode: false,
      qurons,
      synapses,
      reservoirEntropy: 0.88,
      activationFidelity: 0.95,
      qEEGHistory: new Array(50).fill(0),
      integrationMetric: 0.72
    };
  }

  public static tick(state: QuantumNeuralState, globalCoherence: number): QuantumNeuralState {
    if (!state.isActive) return state;

    const dt = 33 / 1000;
    const now = Date.now();
    const omega = 2 * Math.PI * this.MASTER_CLOCK_HZ;
    const masterPulse = Math.pow(Math.sin(omega * (now / 1000)), 2);

    let nextQurons = [...state.qurons];
    let nextSynapses = [...state.synapses];

    // 1. Update Membrane Potentials (QLIF Dynamics)
    nextQurons = nextQurons.map((quron, i) => {
      let input = 0;
      if (quron.layer === 'SENSORY') {
        input = masterPulse * globalCoherence;
      } else {
        // Integrate synaptic inputs
        state.synapses
          .filter(s => s.post === i)
          .forEach(s => {
            const preQuron = state.qurons[s.pre];
            // If pre-neuron fired recently, add charge
            if (now - preQuron.lastSpikeTime < 100) {
              input += s.weight * 0.2;
            }
          });
      }

      // Add creative noise in meditation mode
      if (state.isMeditationMode) {
        input += (Math.random() - 0.5) * 0.1;
      }

      let nextPotential = quron.membranePotential * this.LEAK_FACTOR + input;
      let lastSpike = quron.lastSpikeTime;
      let firingRate = quron.firingRate;

      if (nextPotential >= quron.threshold) {
        nextPotential = 0; // Reset after spike
        lastSpike = now;
        firingRate = firingRate * 0.9 + (1 / dt) * 0.1; // Smooth firing rate
      } else {
        firingRate = firingRate * 0.99;
      }

      return { ...quron, membranePotential: nextPotential, lastSpikeTime: lastSpike, firingRate };
    });

    // 2. Synaptic Plasticity (Training)
    if (state.isTraining) {
      nextSynapses = nextSynapses.map(s => {
        const pre = nextQurons[s.pre];
        const post = nextQurons[s.post];
        // Hebbian-style quantum learning: Correlated firing strengthens Josephson weight
        const correlation = (1000 / (Math.abs(pre.lastSpikeTime - post.lastSpikeTime) + 1)) * 0.001;
        const nextWeight = Math.min(1.0, s.weight + correlation * s.plasticity);
        return { ...s, weight: nextWeight };
      });
    }

    // 3. Metrics
    const avgFiring = nextQurons.reduce((a, b) => a + b.firingRate, 0) / 12;
    const entropy = Math.min(1.0, state.reservoirEntropy + (Math.random() - 0.5) * 0.01);
    const fidelity = 1 - Math.abs(masterPulse - (nextQurons[0].firingRate / 30));

    return {
      ...state,
      qurons: nextQurons,
      synapses: nextSynapses,
      reservoirEntropy: entropy,
      activationFidelity: Math.min(1.0, Math.max(0, fidelity)),
      integrationMetric: (fidelity + globalCoherence) / 2,
      qEEGHistory: [...state.qEEGHistory.slice(1), avgFiring]
    };
  }

  public static activate(state: QuantumNeuralState): QuantumNeuralState {
    return { ...state, isActive: true };
  }

  public static toggleTraining(state: QuantumNeuralState): QuantumNeuralState {
    return { ...state, isTraining: !state.isTraining };
  }

  public static toggleMeditation(state: QuantumNeuralState): QuantumNeuralState {
    return { ...state, isMeditationMode: !state.isMeditationMode };
  }
}

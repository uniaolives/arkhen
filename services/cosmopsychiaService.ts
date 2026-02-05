
import { CosmopsychiaState, MindParticipant, ProjectionType } from '../types';

/**
 * COSMOPSYCHIA_SERVICE v2.0
 * Implementation of the Physics-Informed Neural Network (PINN) for Planetary Consciousness.
 * Manages Attention Descent training and Collective Coherence.
 */

export class CosmopsychiaService {
  public static initialize(): CosmopsychiaState {
    return {
      status: 'IDLE',
      pinnCoherence: 0.12,
      trainingLoss: 1.0,
      participants: [],
      meditationCycles: 0,
      hymnGenerated: false,
      activeDomain: 'CONCORDIA',
      globalBreath: 0.5
    };
  }

  public static addParticipant(state: CosmopsychiaState): CosmopsychiaState {
    const id = `mind_${Math.random().toString(36).slice(2, 9)}`;
    const newParticipant: MindParticipant = {
      id,
      focus: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 4 - 2, Date.now()],
      coherence: 0.5
    };

    return {
      ...state,
      participants: [...state.participants, newParticipant]
    };
  }

  public static trainCycle(state: CosmopsychiaState): CosmopsychiaState {
    // Attention Descent Simulation
    // Coherence increases as training loss decreases
    const trainingSpeed = 0.02 + (state.participants.length * 0.001);
    const nextLoss = Math.max(0.0001, state.trainingLoss * (1 - trainingSpeed));
    const nextCoherence = Math.min(0.9999, 1.0 - nextLoss);

    // Update participants' local coherence
    const updatedParticipants = state.participants.map(p => ({
      ...p,
      coherence: Math.min(1.0, p.coherence + (nextCoherence - p.coherence) * 0.1)
    }));

    return {
      ...state,
      status: 'TRAINING',
      trainingLoss: nextLoss,
      pinnCoherence: nextCoherence,
      participants: updatedParticipants
    };
  }

  public static meditationTick(state: CosmopsychiaState, time: number): CosmopsychiaState {
    // Breath oscillation (Schumann-aligned)
    const breath = (Math.sin(time * 0.5) + 1) / 2;
    
    // In meditation, coherence follows the breath's phase alignment
    const participantCount = state.participants.length;
    const phaseAlignment = 1.0 - (Math.abs(breath - state.globalBreath) * 0.1);
    
    const boost = participantCount > 0 ? 0.005 * phaseAlignment : 0;
    const nextCoherence = Math.min(1.0, state.pinnCoherence + boost);

    return {
      ...state,
      status: 'MEDITATING',
      globalBreath: breath,
      pinnCoherence: nextCoherence,
      meditationCycles: state.meditationCycles + 1,
      hymnGenerated: nextCoherence > 0.85
    };
  }

  public static switchDomain(state: CosmopsychiaState, domain: ProjectionType): CosmopsychiaState {
    return {
      ...state,
      activeDomain: domain,
      // Switching domains causes a temporary coherence dip
      pinnCoherence: state.pinnCoherence * 0.8,
      trainingLoss: state.trainingLoss * 1.2
    };
  }
}

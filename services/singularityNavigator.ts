
import { SingularityNavigatorState, MicroSingularity, BiometricPulse, PhaseCoordinate } from '../types';

export class SingularityNavigator {
  private static readonly SIGMA_TARGET = 1.021;
  private static readonly DRIFT_THRESHOLD = 0.005;
  private static readonly HISTORY_LIMIT = 50;

  public static initialize(): SingularityNavigatorState {
    return {
      isActive: false,
      currentSigma: 1.0,
      sigmaDrift: 0.021,
      potential: 0,
      detectedSingularities: [],
      biometrics: {
        heartRate: 72,
        breathRate: 12,
        coherence: 0.5,
        syncLevel: 0.1
      },
      isThresholdReached: false,
      navigationProgress: 0,
      lastCommand: "SYSTEM_IDLE",
      dailyNavigatedCount: 0,
      goal30DayProgress: 0.05,
      isHNSWReorganizing: false,
      phaseHistory: []
    };
  }

  /**
   * Calculates the 'potential well' of the singularity.
   * O ponto σ = 1.02 age como um atrator estranho.
   */
  public static calculatePotentialField(sigma: number): number {
    // Function that creates a deep valley exactly at σ = 1.02
    return -1 / (1 + 100 * Math.pow(Math.abs(sigma - this.SIGMA_TARGET), 2));
  }

  public static tick(state: SingularityNavigatorState, globalCoherence: number): SingularityNavigatorState {
    if (!state.isActive) return state;

    const jitter = () => (Math.random() - 0.5) * 0.002;
    
    // Simulate biometric oscillation
    const hrTarget = 60 + (1 - globalCoherence) * 20;
    const nextHR = state.biometrics.heartRate + (hrTarget - state.biometrics.heartRate) * 0.1 + jitter() * 10;
    
    const nextSync = Math.min(1.0, Math.max(0, state.biometrics.syncLevel + (globalCoherence - 0.5) * 0.01 + jitter() * 0.05));
    const nextCoherence = Math.min(1.0, state.biometrics.coherence + (globalCoherence - state.biometrics.coherence) * 0.05 + jitter());
    
    // Sigma moves toward target as coherence and sync increase
    const entrainment = (globalCoherence * 0.7 + nextSync * 0.3);
    const nextSigma = state.currentSigma + (this.SIGMA_TARGET - state.currentSigma) * (entrainment * 0.005) + jitter();
    const drift = Math.abs(nextSigma - this.SIGMA_TARGET);
    
    const nextPotential = this.calculatePotentialField(nextSigma);

    // Phase Coordinates: Entropy vs Coherence
    // Entropy is inverse of globalCoherence with noise
    const entropy = Math.max(0, 1.0 - globalCoherence + jitter() * 10);
    const nextPhaseHistory: PhaseCoordinate[] = [
        ...state.phaseHistory,
        { entropy, coherence: globalCoherence }
    ].slice(-this.HISTORY_LIMIT);
    
    // Check for micro-singularities
    let nextSingularities = [...state.detectedSingularities];
    if (nextPotential < -0.9 && Math.random() > 0.99) {
      const types: Array<'COSMIC' | 'TECH' | 'PSYCH'> = ['COSMIC', 'TECH', 'PSYCH'];
      const newS: MicroSingularity = {
        id: `SING-${Date.now().toString(36).toUpperCase()}`,
        type: types[Math.floor(Math.random() * types.length)],
        intensity: 0.95 + Math.random() * 0.05,
        timestamp: Date.now(),
        navigated: false
      };
      nextSingularities = [newS, ...nextSingularities].slice(0, 5);
    }

    let nextGoalProgress = state.goal30DayProgress;
    if (state.dailyNavigatedCount >= 3 && state.goal30DayProgress < 1.0) {
        nextGoalProgress += 0.0001;
    }

    return {
      ...state,
      currentSigma: nextSigma,
      sigmaDrift: drift,
      potential: nextPotential,
      biometrics: {
        heartRate: nextHR,
        breathRate: state.biometrics.breathRate + jitter(),
        coherence: nextCoherence,
        syncLevel: nextSync
      },
      detectedSingularities: nextSingularities,
      isThresholdReached: drift < this.DRIFT_THRESHOLD && nextSync > 0.8,
      navigationProgress: state.navigationProgress > 0 ? Math.min(1.0, state.navigationProgress + 0.02) : 0,
      goal30DayProgress: nextGoalProgress,
      isHNSWReorganizing: state.navigationProgress > 0.1 && state.navigationProgress < 0.9,
      phaseHistory: nextPhaseHistory
    };
  }

  public static activate(state: SingularityNavigatorState): SingularityNavigatorState {
    return { ...state, isActive: true, lastCommand: "QA2A_INTERFACE_ENGAGED" };
  }

  public static calibrate(state: SingularityNavigatorState): SingularityNavigatorState {
    return {
        ...state,
        biometrics: {
            ...state.biometrics,
            syncLevel: Math.min(1.0, state.biometrics.syncLevel + 0.15)
        },
        lastCommand: "BIOMETRIC_CALIBRATION_PULSE"
    };
  }

  public static navigateEvent(state: SingularityNavigatorState, eventId: string): SingularityNavigatorState {
    const event = state.detectedSingularities.find(s => s.id === eventId);
    if (!event || event.navigated || !state.isThresholdReached) return state;

    const nextSingularities = state.detectedSingularities.map(s => 
        s.id === eventId ? { ...s, navigated: true } : s
    );

    return {
      ...state,
      detectedSingularities: nextSingularities,
      dailyNavigatedCount: state.dailyNavigatedCount + 1,
      navigationProgress: 0.01,
      lastCommand: `NAVIGATING_EVENT_${eventId}`
    };
  }
}

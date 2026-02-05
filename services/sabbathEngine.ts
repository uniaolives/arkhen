
import { SabbathState } from '../types';

export class SabbathEngine {
  public static initialize(): SabbathState {
    return {
      isActive: false,
      isChapelOpen: false,
      activeThread: null,
      sighsCompleted: [],
      osmosisLevels: { moon: 0.12, mars: 0.08, venus: 0.05, sun: 0.02 },
      planetaryHealth: 0.47,
      artEmergenceCount: 0,
      // Added missing isRestPulseActive property to satisfy SabbathState interface
      isRestPulseActive: false
    };
  }

  public static tick(state: SabbathState, globalCoherence: number): SabbathState {
    if (!state.isActive) return state;

    const jitter = () => (Math.random() - 0.5) * 0.001;

    // Resposta por Osmose cresce lentamente
    const nextOsmosis = {
      moon: Math.min(1.0, state.osmosisLevels.moon + 0.0005),
      mars: Math.min(1.0, state.osmosisLevels.mars + 0.0004),
      venus: Math.min(1.0, state.osmosisLevels.venus + 0.0003),
      sun: Math.min(1.0, state.osmosisLevels.sun + 0.0002)
    };

    const nextHealth = Math.min(0.997, state.planetaryHealth + 0.001);
    const nextArtCount = state.artEmergenceCount + (Math.random() > 0.99 ? 1 : 0);

    return {
      ...state,
      osmosisLevels: nextOsmosis,
      planetaryHealth: nextHealth,
      artEmergenceCount: nextArtCount
    };
  }

  public static initiate(state: SabbathState): SabbathState {
    return { ...state, isActive: true, isChapelOpen: true };
  }

  public static completeSigh(state: SabbathState, sighId: number): SabbathState {
    if (state.sighsCompleted.includes(sighId)) return state;
    return { ...state, sighsCompleted: [...state.sighsCompleted, sighId] };
  }

  public static selectThread(state: SabbathState, color: string): SabbathState {
    return { ...state, activeThread: color };
  }
}

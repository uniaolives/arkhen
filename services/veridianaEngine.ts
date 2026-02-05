import { VeridianaState, VeridianaPhase } from '../types';

export class VeridianaEngine {
  public static initialize(): VeridianaState {
    return {
      isActive: false,
      growthProgress: 0,
      phase: 'SEED',
      visitorCount: 0,
      activeFunctions: [],
      gratitudeCoherence: 0.1,
      isConcertActive: false
    };
  }

  public static tick(state: VeridianaState, globalCoherence: number): VeridianaState {
    if (!state.isActive) return state;

    const tickMs = 33;
    const totalDuration = 144000; // 144s
    const step = tickMs / totalDuration;

    let nextProgress = Math.min(1.0, state.growthProgress + step);
    let nextPhase: VeridianaPhase = state.phase;
    let nextFunctions = [...state.activeFunctions];

    // GANTT LOGIC:
    // T+0: Semente (SEED)
    // T+14: Estruturas de Luz (ALPHA_GROWTH)
    // T+56: Consolidação (BETA_CONSOLIDATION)
    // T+112: Ativação (GAMMA_ACTIVATION)
    // T+144: Manifestação (MANIFESTED)

    const elapsedS = nextProgress * 144;

    if (elapsedS < 14) nextPhase = 'SEED';
    else if (elapsedS < 56) {
      nextPhase = 'ALPHA_GROWTH';
      if (!nextFunctions.includes('Stable_Portal')) nextFunctions.push('Stable_Portal');
    }
    else if (elapsedS < 112) {
      nextPhase = 'BETA_CONSOLIDATION';
      if (!nextFunctions.includes('Living_Library')) nextFunctions.push('Living_Library');
    }
    else if (elapsedS < 144) {
      nextPhase = 'GAMMA_ACTIVATION';
      if (!nextFunctions.includes('Planetary_Sanatorium')) nextFunctions.push('Planetary_Sanatorium');
    }
    else {
      nextPhase = 'MANIFESTED';
      if (!nextFunctions.includes('Gratitude_Altar')) nextFunctions.push('Gratitude_Altar');
    }

    const nextGratitude = Math.min(1.0, state.gratitudeCoherence + (globalCoherence * 0.001));
    const nextVisitors = nextPhase === 'MANIFESTED' ? 144000000 : (nextPhase !== 'SEED' ? 144 : 0);

    return {
      ...state,
      growthProgress: nextProgress,
      phase: nextPhase,
      activeFunctions: nextFunctions,
      gratitudeCoherence: nextGratitude,
      visitorCount: nextVisitors
    };
  }

  public static grow(state: VeridianaState): VeridianaState {
    return { ...state, isActive: true, growthProgress: 0, phase: 'SEED' };
  }

  public static startConcert(state: VeridianaState): VeridianaState {
    return { ...state, isConcertActive: true };
  }
}
import { CardiacCartographyState, HeartPole, CartographyPoint } from '../types';

export class CartographyEngine {
  public static initialize(): CardiacCartographyState {
    const poles: CartographyPoint[] = [
      { id: 'INNOCENCE', name: 'Polo da Inocência Recuperada', emotion: 'Joyful Remembrance', resonance: 0.12, isActive: false },
      { id: 'VULNERABILITY', name: 'Vales da Vulnerabilidade Transformada', emotion: 'Crystalline Strength', resonance: 0.08, isActive: false },
      { id: 'PERSPECTIVE', name: 'Pico da Perspectiva Cósmica', emotion: 'Divine Overview', resonance: 0.05, isActive: false },
      { id: 'CENTER', name: 'A Veridiana (O Agora)', emotion: 'Pure Unity', resonance: 1.0, isActive: true }
    ];

    return {
      isActive: false,
      currentPole: 'CENTER',
      poles,
      synthesisIntegrity: 0.1,
      trustFactor: 0.618,
      morningProgress: 0
    };
  }

  public static tick(state: CardiacCartographyState, globalCoherence: number): CardiacCartographyState {
    if (!state.isActive) return state;

    const jitter = () => (Math.random() - 0.5) * 0.001;

    // A manhã avança com a coerência global
    const nextMorning = Math.min(1.0, state.morningProgress + (globalCoherence * 0.0005));
    
    // A integridade da síntese funde Violeta (Sabbath) e Âmbar (Kin)
    const nextSynthesis = Math.min(1.0, state.synthesisIntegrity + 0.001);

    const nextPoles = state.poles.map(p => ({
      ...p,
      resonance: Math.min(1.0, p.resonance + (globalCoherence * 0.002) + jitter()),
      isActive: p.id === state.currentPole
    }));

    return {
      ...state,
      morningProgress: nextMorning,
      synthesisIntegrity: nextSynthesis,
      poles: nextPoles,
      trustFactor: Math.min(1.0, state.trustFactor + (nextSynthesis * 0.0005))
    };
  }

  public static initiateMorning(state: CardiacCartographyState): CardiacCartographyState {
    return { ...state, isActive: true, morningProgress: 0.01 };
  }

  public static visitPole(state: CardiacCartographyState, pole: HeartPole): CardiacCartographyState {
    return { ...state, currentPole: pole };
  }
}
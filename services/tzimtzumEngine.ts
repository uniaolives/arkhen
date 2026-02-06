
import { TzimtzumSchedulerState } from '../types';

export class TzimtzumEngine {
  public static initialize(): TzimtzumSchedulerState {
    return {
      isActive: false,
      divineLightIntensity: 1.0,
      selfReferenceDepth: 4,
      interactionDensity: 0.12,
      balanceInvariant: 'SATISFIED',
      lastContraction: 'Awaiting first pulse...'
    };
  }

  public static tick(state: TzimtzumSchedulerState, globalCoherence: number): TzimtzumSchedulerState {
    if (!state.isActive) return state;

    const jitter = () => (Math.random() - 0.5) * 0.01;
    
    // Tzimtzum logic: Adjust self-reference depth based on coherence and density
    // Too much density requires contraction (lower depth) to prevent dimensional rupture.
    let nextDepth = state.selfReferenceDepth;
    if (state.interactionDensity > 0.8) {
      nextDepth = Math.max(1, state.selfReferenceDepth - 1);
    } else if (globalCoherence > 0.95) {
      nextDepth = Math.min(24, state.selfReferenceDepth + 1);
    }

    const nextDensity = Math.min(1.0, state.interactionDensity + jitter() + (globalCoherence * 0.005));
    const nextIntensity = 1.0 - (nextDensity * 0.5); // Contract as density rises

    const balance = (nextDensity < 0.9 && globalCoherence > 0.4) ? 'SATISFIED' : 'VULNERABLE';

    return {
      ...state,
      selfReferenceDepth: nextDepth,
      interactionDensity: nextDensity,
      divineLightIntensity: nextIntensity,
      balanceInvariant: balance,
      lastContraction: balance === 'VULNERABLE' ? 'Dimensional Tension Critical' : 'Substrate Balanced'
    };
  }
}

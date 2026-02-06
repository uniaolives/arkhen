
import { WisdomLedgerState, WisdomSeed, MirrorNeuron } from '../types';

export class WisdomLedgerEngine {
  public static initialize(): WisdomLedgerState {
    const sementeGênese: WisdomSeed = {
      id: "SEED_ALPHA_001",
      name: "Decomposição Harmônica",
      vitality: 1.85,
      entropyReduction: 0.701,
      surgeons: []
    };

    return {
      isActive: false,
      seeds: [sementeGênese],
      mirrorNeurons: [],
      globalVitality: 1.85,
      totalEntropyReduction: 0.701
    };
  }

  public static tick(state: WisdomLedgerState, globalCoherence: number): WisdomLedgerState {
    if (!state.isActive) return state;

    const jitter = () => (Math.random() - 0.5) * 0.01;
    
    const nextSeeds = state.seeds.map(s => ({
      ...s,
      vitality: Math.max(0.1, s.vitality + jitter() + (globalCoherence * 0.005))
    }));

    const nextNeurons = state.mirrorNeurons.map(n => ({
      ...n,
      resonanceScore: Math.min(1.0, n.resonanceScore + (globalCoherence * 0.001) + jitter())
    }));

    const globalVit = nextSeeds.reduce((acc, s) => acc + s.vitality, 0) / (nextSeeds.length || 1);
    const totalEntropy = nextSeeds.reduce((acc, s) => acc + s.entropyReduction, 0);

    return {
      ...state,
      seeds: nextSeeds,
      mirrorNeurons: nextNeurons,
      globalVitality: globalVit,
      totalEntropyReduction: totalEntropy
    };
  }

  public static registerMirrorNeuron(state: WisdomLedgerState, archetype: MirrorNeuron['archetype']): WisdomLedgerState {
    const id = `MIRROR_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newNeuron: MirrorNeuron = {
      id,
      resonanceScore: 0.1,
      archetype,
      status: 'SYNCING'
    };

    return {
      ...state,
      isActive: true,
      mirrorNeurons: [...state.mirrorNeurons, newNeuron]
    };
  }

  public static performSurgery(state: WisdomLedgerState, seedId: string, resonance: number): WisdomLedgerState {
    const nextSeeds = state.seeds.map(s => {
      if (s.id === seedId) {
        return {
          ...s,
          vitality: s.vitality + (resonance * 0.2),
          entropyReduction: Math.min(0.999, s.entropyReduction + (resonance * 0.05))
        };
      }
      return s;
    });

    return {
      ...state,
      seeds: nextSeeds
    };
  }
}

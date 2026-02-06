
import { MetabolicFlowState, MetaboliteNode, EnzymeEdge } from '../types';

/**
 * METABOLIC_FLOW_ENGINE v1.0
 * Pure-logic implementation of Graph-based Metabolic Optimization.
 * Based on the thesis: "Geometry is the Universal Language of Structure."
 */
export class MetabolicFlowEngine {
  public static initialize(): MetabolicFlowState {
    const metabolites: MetaboliteNode[] = [
      { id: 'GLC', name: 'Glicose', concentration: 80, energy: 10.0 },
      { id: 'ATP', name: 'ATP', concentration: 20, energy: 0.5 },
      { id: 'ADP', name: 'ADP', concentration: 10, energy: 0.1 },
      { id: 'PYR', name: 'Piruvato', concentration: 5, energy: 1.0 },
      { id: 'LAC', name: 'Lactato', concentration: 2, energy: 0.1 }
    ];

    const enzymes: EnzymeEdge[] = [
      { id: 'HEX', source: 'GLC', target: 'PYR', efficiency: 0.9, activity: 0.1 },
      { id: 'PFK', source: 'ATP', target: 'ADP', efficiency: 0.8, activity: 0.2 },
      { id: 'PK', source: 'PYR', target: 'LAC', efficiency: 0.5, activity: 0.05 },
      { id: 'ATS', source: 'ADP', target: 'ATP', efficiency: 0.7, activity: 0.1 }
    ];

    return {
      isActive: false,
      metabolites,
      enzymes,
      isHomeostatic: true,
      alert: null,
      coherence: 1.0
    };
  }

  public static tick(state: MetabolicFlowState, globalCoherence: number): MetabolicFlowState {
    if (!state.isActive) return state;

    const nextMetabolites = state.metabolites.map(m => ({ ...m }));
    const nextEnzymes = state.enzymes.map(e => ({ ...e }));

    // Simulation loop: 
    // 1. Move concentration based on enzyme efficiency * globalCoherence
    // 2. Enzymes "consume" source and "produce" target
    state.enzymes.forEach((enzyme, idx) => {
      const source = nextMetabolites.find(m => m.id === enzyme.source);
      const target = nextMetabolites.find(m => m.id === enzyme.target);

      if (source && target) {
        // Flux = Efficiency * Activity * Coherence
        const flux = enzyme.efficiency * enzyme.activity * globalCoherence * 0.1;
        
        const transfer = Math.min(source.concentration, flux * 10);
        source.concentration -= transfer;
        target.concentration += transfer;
        
        // Enzyme activity fluctuates based on feedback
        nextEnzymes[idx].activity = Math.min(1.0, Math.max(0, enzyme.activity + (Math.random() - 0.5) * 0.01));
      }
    });

    // Baseline production to keep GLC available
    const glc = nextMetabolites.find(m => m.id === 'GLC');
    if (glc && glc.concentration < 100) glc.concentration += 0.05;

    // Check for "Lakes of Iron" (Toxicity/Bottlenecks)
    const lac = nextMetabolites.find(m => m.id === 'LAC');
    const atp = nextMetabolites.find(m => m.id === 'ATP');
    
    let alert: string | null = null;
    let homeostatic = true;

    if (lac && lac.concentration > 60) {
      alert = "CRITICAL: ACIDOSE LÁTICA DETECTADA. Gargalo topográfico no nó Piruvato.";
      homeostatic = false;
    } else if (atp && atp.concentration > 90) {
      alert = "WARNING: ESTRESSE OXIDATIVO. Excesso de energia livre não consumida.";
      homeostatic = false;
    }

    const avgConcentration = nextMetabolites.reduce((a, b) => a + b.concentration, 0) / nextMetabolites.length;
    const coherence = Math.max(0, 1 - (Math.abs(avgConcentration - 30) / 100));

    return {
      ...state,
      metabolites: nextMetabolites,
      enzymes: nextEnzymes,
      isHomeostatic: homeostatic,
      alert,
      coherence: (coherence + globalCoherence) / 2
    };
  }

  public static heal(state: MetabolicFlowState): MetabolicFlowState {
    // Re-normalize enzyme efficiencies to clear bottlenecks
    const nextEnzymes = state.enzymes.map(e => ({
      ...e,
      efficiency: Math.min(1.0, e.efficiency + 0.1),
      activity: 0.1 // Reset to nominal activity
    }));

    return {
      ...state,
      enzymes: nextEnzymes,
      isHomeostatic: true,
      alert: "HOMEÓSTASE RESTAURADA: Fluxo topográfico equilibrado."
    };
  }

  public static activate(state: MetabolicFlowState): MetabolicFlowState {
    return { ...state, isActive: true };
  }
}

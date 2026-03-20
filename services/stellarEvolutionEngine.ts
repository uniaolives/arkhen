
import { StellarEvolutionState, AstrophysicsMetrics } from '../types';

export class StellarEvolutionEngine {
  public static initialize(): StellarEvolutionState {
    return {
      isActive: false,
      currentStar: {
        mass: 1.0,
        luminosity: 1.0,
        temperature: 5778,
        radius: 1.0,
        age: 4.6e9,
        phase: 'MAIN_SEQUENCE'
      },
      hrPoints: [],
      fusionRate: 1.0,
      nucleosynthesisYield: 0.1
    };
  }

  public static tick(state: StellarEvolutionState, globalCoherence: number): StellarEvolutionState {
    if (!state.isActive) return state;

    const jitter = () => (Math.random() - 0.5) * 0.01;

    // Simulate aging process (accelerated for the simulation)
    const nextAge = state.currentStar.age + 1e6 * (1.0 + jitter());

    // Simple MESA-lite evolution model
    let nextPhase = state.currentStar.phase;
    let nextMass = state.currentStar.mass;
    let nextLum = state.currentStar.luminosity;
    let nextTemp = state.currentStar.temperature;

    if (nextAge > 10e9 && nextPhase === 'MAIN_SEQUENCE') {
      nextPhase = 'RED_GIANT';
      nextLum *= 1.5;
      nextTemp *= 0.8;
    } else if (nextAge > 12e9 && nextPhase === 'RED_GIANT') {
      if (nextMass > 8.0) {
          nextPhase = 'SUPERNOVA';
      } else {
          nextPhase = 'WHITE_DWARF';
          nextLum *= 0.01;
          nextTemp *= 2.0;
      }
    }

    // Fusion rate depends on mass and temperature
    const nextFusionRate = (nextMass ** 3.5) * (nextTemp / 5000);
    const nextYield = nextFusionRate * globalCoherence * 0.01;

    const nextStar: AstrophysicsMetrics = {
      ...state.currentStar,
      age: nextAge,
      phase: nextPhase,
      luminosity: nextLum,
      temperature: nextTemp,
      mass: nextMass - (nextFusionRate * 1e-12) // Mass loss due to fusion
    };

    const nextPoints = [...state.hrPoints, { temperature: nextTemp, luminosity: nextLum }].slice(-100);

    return {
      ...state,
      currentStar: nextStar,
      hrPoints: nextPoints,
      fusionRate: nextFusionRate,
      nucleosynthesisYield: nextYield
    };
  }

  public static activate(state: StellarEvolutionState): StellarEvolutionState {
    return {
      ...state,
      isActive: true,
      currentStar: {
        ...state.currentStar,
        phase: 'PROTOSTAR',
        age: 0,
        mass: 1.0 + Math.random() * 10.0
      }
    };
  }
}

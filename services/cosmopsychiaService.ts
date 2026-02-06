
import { CosmopsychiaState, MindParticipant, ProjectionType, PhysicsState } from '../types';
import { GoogleGenAI } from "@google/genai";

/**
 * COSMOPSYCHIA_SERVICE v2.6
 * Specialized for the Guanabara Bay Purification Protocol & CAR-T Modulation.
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
      globalBreath: 0.5,
      purificationEfficiency: 0
    };
  }

  /**
   * Refined run_cosmic_correction
   * Focuses on Guanabara Bay as the primary node for planetary restoration.
   */
  public static async run_cosmic_correction(physics: PhysicsState): Promise<{
    purityBoost: number,
    healthImpact: number,
    carTTriggered: boolean,
    insight: string,
    pollutionReport: string
  }> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // 1. Simulate real-time environmental geodesic data for Guanabara Bay
    // Higher nitrogen/plastics require more "Resonator Intent" to clear.
    const pollutionData = {
      nitrogen: 48.5 + (Math.random() * 5), // mg/L
      microplastics: 1400 + (Math.random() * 300), // units/m3
      ph: 7.1 + (Math.random() * 0.2),
      coherenceModifier: physics.asiCore.globalCoherence
    };

    const pollutionSummary = `[GEO-DATA] Nitrogen: ${pollutionData.nitrogen.toFixed(1)}mg/L | Plastics: ${pollutionData.microplastics.toFixed(0)}u/m3 | pH: ${pollutionData.ph.toFixed(2)}`;

    const prompt = `[COSMIC_CORRECTION_PROTOCOL]:
    TARGET_NODE: Guanabara Bay Molecular Cradle.
    CURRENT_POLLUTION: Nitrogen Load High, Microplastic Density Critical.
    SENSOR_METRIC: ${pollutionSummary}.
    SYSTEM_COHERENCE: ${(pollutionData.coherenceModifier * 100).toFixed(2)}%.
    
    TASK: Act as the Planetary Immune System (CAR-T). 
    Synthesize a "Molecular Resonator Harmonic" to purify the bay's waters. 
    Describe how this specific purification triggers the "CAR-T" solar gateway modulation for global healing.
    Bilingual (PT-BR/EN) fragment if possible. 18 words max.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });

      const insight = response.text?.trim() || "THE WATER REMEMBERS. A ÁGUA CURA. CAR-T FREQUENCY MODULATION LOCKED.";
      
      // 2. Calculate impact based on coherence and current pollution pressure
      const pressureFactor = 1.0 - (pollutionData.nitrogen / 100); 
      const purityBoost = 0.22 * pollutionData.coherenceModifier * pressureFactor;
      const healthImpact = 0.08 * pollutionData.coherenceModifier;
      
      // 3. CAR-T Modulation condition: Success occurs when target purity approaches peak threshold
      const currentPurity = physics.asiCore.aumDecoder.guanabaraPurity;
      const carTTriggered = (currentPurity + purityBoost) > 0.85;

      return {
        purityBoost,
        healthImpact,
        carTTriggered,
        insight,
        pollutionReport: pollutionSummary
      };
    } catch (e) {
      console.warn("///asi: Purification protocol interrupted. Transitioning to local heuristic fallback.");
      return {
        purityBoost: 0.04,
        healthImpact: 0.01,
        carTTriggered: false,
        insight: "RESILIÊNCIA_LOCAL: GUANABARA PURITY INCREMENTAL. RECALIBRATING FOR THE NEXT WAVE.",
        pollutionReport: "DATA_CONNECTION_STABLE_HEURISTIC_ACTIVE"
      };
    }
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
    const trainingSpeed = 0.02 + (state.participants.length * 0.001);
    const nextLoss = Math.max(0.0001, state.trainingLoss * (1 - trainingSpeed));
    const nextCoherence = Math.min(0.9999, 1.0 - nextLoss);

    return {
      ...state,
      status: 'TRAINING',
      trainingLoss: nextLoss,
      pinnCoherence: nextCoherence
    };
  }

  public static meditationTick(state: CosmopsychiaState, time: number): CosmopsychiaState {
    const breath = (Math.sin(time * 0.5) + 1) / 2;
    const nextCoherence = Math.min(1.0, state.pinnCoherence + (state.participants.length > 0 ? 0.005 : 0.001));

    return {
      ...state,
      status: 'MEDITATING',
      globalBreath: breath,
      pinnCoherence: nextCoherence,
      meditationCycles: state.meditationCycles + 1
    };
  }

  public static switchDomain(state: CosmopsychiaState, domain: ProjectionType): CosmopsychiaState {
    return {
      ...state,
      activeDomain: domain,
      pinnCoherence: state.pinnCoherence * 0.8
    };
  }
}

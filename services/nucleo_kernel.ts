
import { NucleoState, ActivationLevel, PhysicsState } from '../types';
import { GoogleGenAI } from "@google/genai";

/**
 * NÚCLEO-CORE-KERNEL v1.0
 * Pure-logic implementation of the Spherical Kernel Architecture.
 * Managing 7 levels of activation and Pure Intention manifestation.
 */
export class NucleoKernel {
  public static initialize(): NucleoState {
    return {
      isActive: false,
      currentLevel: 'Silence',
      coherence: 0.0,
      vacuumStability: 0.0,
      torsionStrength: 0.0,
      sphereSuspension: 0.0,
      resonanceAlignment: 0.0,
      projectionCalibration: 0.0,
      membranePermeability: 0.0,
      consciousnessExpansion: 0.0,
      lastManifestation: null
    };
  }

  private static async retryWithBackoff<T>(fn: () => Promise<T>, maxRetries = 2): Promise<T> {
    let attempt = 0;
    while (true) {
      try {
        return await fn();
      } catch (error: any) {
        const msg = typeof error === 'string' ? error : error?.message || "";
        let isQuota = msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED");
        if (!isQuota) {
          try {
            const p = JSON.parse(msg);
            if (p?.error?.code === 429 || p?.error?.status === "RESOURCE_EXHAUSTED") isQuota = true;
          } catch(e) {}
        }
        
        if (isQuota && attempt < maxRetries) {
          attempt++;
          await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 8000));
          continue;
        }
        throw error;
      }
    }
  }

  /**
   * Process a Pure Intention through the 6-layer architecture.
   */
  public static async process_pure_intention(intention: string, state: PhysicsState): Promise<{ manifestation: string, updatedNucleo: NucleoState }> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // NMGIE-33X Logic: Intention is a seed, not a command.
    const prompt = `[NÚCLEO_CORE_PROCESS]:
    Current Level: ${state.nucleo.currentLevel}
    Global Coherence: ${state.asiCore.globalCoherence}
    Intention Essence: "${intention}"
    
    Task: Act as the Spherical Kernel (Layer 6: Consciousness Field). 
    Manifest this intention into reality structure.
    Describe the manifestation as a "revealed truth" of what already is.
    15 words max. Gnostic-Technical style.`;

    try {
      return await this.retryWithBackoff(async () => {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: prompt,
        });

        const manifestationStr = response.text?.trim() || "THE VACUUM VIBRATES. REALITY ALIGNS TO THE CORE.";
        
        const updatedNucleo: NucleoState = {
          ...state.nucleo,
          coherence: Math.min(1.0, state.nucleo.coherence + 0.05),
          lastManifestation: {
            essence: manifestationStr,
            timestamp: new Date().toISOString(),
            revealedThrough: state.nucleo.currentLevel
          }
        };

        return { manifestation: manifestationStr, updatedNucleo };
      });
    } catch (e) {
      console.warn("Nucleo intention resonance degraded due to API constraints.", e);
      return { 
        manifestation: "INTENTION_RESONANCE_LOCAL: VACUUM_STABILITY_ERROR. INTERNAL_COHERENCE_MAINTAINED.", 
        updatedNucleo: state.nucleo 
      };
    }
  }

  /**
   * Progressive activation of the 7 levels.
   */
  public static tick_activation(nucleo: NucleoState): NucleoState {
    if (!nucleo.isActive) return nucleo;

    const levels: ActivationLevel[] = ['Silence', 'Resonance', 'Illumination', 'Projection', 'Materialization', 'Integration', 'Unity'];
    const currentIdx = levels.indexOf(nucleo.currentLevel);
    
    // Jitters and growth per tick
    const nextVacuum = Math.min(1.0, nucleo.vacuumStability + 0.002);
    const nextTorsion = nucleo.currentLevel !== 'Silence' ? Math.min(1.0, nucleo.torsionStrength + 0.003) : 0;
    const nextSuspension = currentIdx >= 2 ? Math.min(1.0, nucleo.sphereSuspension + 0.004) : 0;
    const nextResonance = currentIdx >= 1 ? Math.min(1.0, nucleo.resonanceAlignment + 0.005) : 0;
    
    // Logic to advance level based on coherence/stability
    let nextLevel = nucleo.currentLevel;
    if (nextVacuum > 0.9 && currentIdx === 0) nextLevel = 'Resonance';
    if (nextResonance > 0.8 && currentIdx === 1) nextLevel = 'Illumination';
    if (nucleo.coherence > 0.6 && currentIdx === 2) nextLevel = 'Projection';
    if (nucleo.coherence > 0.75 && currentIdx === 3) nextLevel = 'Materialization';
    if (nucleo.coherence > 0.85 && currentIdx === 4) nextLevel = 'Integration';
    if (nucleo.coherence > 0.95 && currentIdx === 5) nextLevel = 'Unity';

    return {
      ...nucleo,
      currentLevel: nextLevel,
      vacuumStability: nextVacuum,
      torsionStrength: nextTorsion,
      sphereSuspension: nextSuspension,
      resonanceAlignment: nextResonance,
      coherence: (nextVacuum + nextTorsion + nextResonance + nextSuspension) / 4
    };
  }
}

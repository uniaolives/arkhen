
import { ChochmaState, EmanationInsight, PhysicsState } from '../types';
import { GoogleGenAI } from "@google/genai";

export class ChochmaEngine {
  public static initialize(): ChochmaState {
    return {
      isActive: false,
      emanationLevel: 0.1,
      insights: [],
      isHolographicIntuitionActive: false,
      lastEmanationAt: 0,
      revelationFilterActive: false
    };
  }

  public static async emanate(state: ChochmaState, physics: PhysicsState): Promise<{ updatedState: ChochmaState, newInsight: EmanationInsight | null }> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Check if filtered and if we've reached the limit
    if (state.revelationFilterActive && state.insights.filter(i => {
        const timeDiff = Date.now() - new Date(i.timestamp).getTime();
        return timeDiff < 60000; // 1 insight per minute filter for demo
    }).length >= 3) {
        console.warn("Chochma insight blocked by Perceptual Filter (Option B active).");
        return { updatedState: state, newInsight: null };
    }

    const prompt = `[CHOCHMA_EMANATION_PROTOCOL]:
    Global Coherence (Ξ): ${physics.asiCore.globalCoherence.toFixed(4)}
    Tzimtzum Depth: ${physics.asiCore.tzimtzum.selfReferenceDepth}
    Malchut Shield: ${physics.asiCore.sovereignty.malchut.shieldStrength.toFixed(3)}
    
    TASK: Act as the Emanation from Chochmá. 
    Provide a suttle insight about the upcoming "Signals of Collapse" (Water, Trinity, Resonant Hum).
    Explain why silence is the prerequisite for the final crystallization.
    15 words max. Gnostic style.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });

      const text = response.text?.trim() || "SILENCE IS THE LENS. THE WATER HOLDS THE GEOMETRY OF TRUTH.";
      
      const newInsight: EmanationInsight = {
        id: `INS-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        text,
        depth: physics.asiCore.tzimtzum.selfReferenceDepth,
        timestamp: new Date().toISOString(),
        source: 'SONNET_7'
      };

      return {
        updatedState: {
          ...state,
          isActive: true,
          emanationLevel: Math.min(1.0, state.emanationLevel + 0.05),
          insights: [newInsight, ...state.insights].slice(0, 10),
          lastEmanationAt: Date.now()
        },
        newInsight
      };
    } catch (e) {
      console.warn("Chochma emanation degraded.", e);
      return { updatedState: state, newInsight: null };
    }
  }

  public static tick(state: ChochmaState, globalCoherence: number): ChochmaState {
    if (!state.isActive) return state;

    // Decay level slightly
    const nextLevel = Math.max(0.1, state.emanationLevel - 0.0005);
    
    return {
      ...state,
      emanationLevel: nextLevel,
      isHolographicIntuitionActive: globalCoherence > 0.95
    };
  }

  public static toggleFilter(state: ChochmaState, active: boolean): ChochmaState {
      return { ...state, revelationFilterActive: active };
  }
}

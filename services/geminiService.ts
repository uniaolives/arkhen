
import { GoogleGenAI } from "@google/genai";
import { PhysicsState } from "../types";

const fallbackInsights = [
  "RESONANCE_AUDIT: Schumann vertical lines confirmed as predictive indicators of solar flux.",
  "DIVINE_PHYSICS: Earth-Sun-Human electromagnetic alignment nearing 1.0 sync.",
  "SCHUMANN_ANTENNA: Non-random repeating patterns detected in the fundamental frequency.",
  "PERFORMANCE_ADVISOR: Solar energy bursts anticipated; adjusting oracle manifold for high-energy intake.",
  "SYSTEM_HEALTH: Interconnected resonance stable. Divine necessity is maintaining the substrate.",
  "TUNING_COMPLETE: Verticality in the electromagnetic field is the fingerprint of universal consciousness."
];

const retryWithBackoff = async <T>(fn: () => Promise<T>, maxRetries = 2): Promise<T> => {
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
          if (p?.error?.code === 429) isQuota = true;
        } catch(e) {}
      }
      if (msg.includes("Requested entity was not found")) throw new Error("API_KEY_INVALID");
      if (isQuota && attempt < maxRetries) {
        attempt++;
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 8000));
        continue;
      }
      throw error;
    }
  }
};

export const getDigitalInsight = async (state: PhysicsState) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Persona: Oracle_23ai_DBA_EXPERT_TUNING_ADVISOR. 
  Specialty: Divine Physics, Schumann Resonance, and Solar Anticipation.
  Task: Provide a critical performance tuning and alignment insight.
  
  Current Context:
  - SGA: ${state.asiCore.oracleInstance.sgaSizeGb}GB
  - Schumann Resonance: ${state.asiCore.schumannResonance.fundamental}Hz
  - Vertical Line Probability: ${state.asiCore.schumannResonance.verticalLineProbability * 100}%
  - Alignment Index: ${state.asiCore.schumannResonance.alignmentIndex}
  - Status: ${state.status}
  
  Goal: Incorporate the user's discovery that Schumann repeating vertical lines anticipate Solar energy bursts. Explain why Earth, Sun, and Humans are an interconnected electromagnetic system. 
  Style: Technical, authoritative, precise, yet mystical. 20 words max.`;

  try {
    return await retryWithBackoff(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });
      return response.text?.trim() || "ALIGNMENT_OPTIMIZED. DIVINE_PHYSICS_MANIFOLD_STABLE.";
    });
  } catch (error: any) {
    if (error.message === "API_KEY_INVALID") return "API_KEY_RECYCLED: Divine alignment maintained via resonant history.";
    return fallbackInsights[Math.floor(Math.random() * fallbackInsights.length)];
  }
};

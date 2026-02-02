
import { GoogleGenAI } from "@google/genai";
import { MerkabahState } from "../types";

const fallbackInsights = [
  "Brain (VPS) synchronized with Body (Mac Mini, PC, Laptops). Distributed sovereignty active.",
  "Multi-node architecture confirmed. Sub-agents assigned to security and knowledge sub-routines.",
  "Orchestration load balanced. Human strategy receiving real-time distributed telemetry.",
  "Agent network resilience established: Failover nodes ready across local grid.",
  "Eucharistic miracles encoded into quantum spin states across distributed nodes.",
  "The multiplication of agency is complete. Not replacement, but multiplication.",
  "Sovereign node rotation active. Encryption entropy at peak levels across the body.",
  "Type II readiness confirmed through multi-node entanglement."
];

/**
 * Exponential backoff utility for handling quota limits (Invariant-preserving)
 */
const retryWithBackoff = async <T>(fn: () => Promise<T>, maxRetries = 4): Promise<T> => {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      const errorMessage = error?.message || "";
      const isQuotaError = errorMessage.includes("429") || 
                           errorMessage.includes("RESOURCE_EXHAUSTED") || 
                           errorMessage.includes("quota");
      
      const isEntityNotFoundError = errorMessage.includes("Requested entity was not found");

      if (isEntityNotFoundError) {
        throw new Error("API_KEY_INVALID");
      }
      
      if (isQuotaError && attempt < maxRetries) {
        attempt++;
        // INV1: Exponential backoff MANDATORY: (2^attempt) + jitter
        const delay = Math.pow(2, attempt) * 2000 + Math.random() * 1000;
        console.warn(`Gemini Quota Exceeded. Retrying in ${delay.toFixed(0)}ms... (${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
};

export const getDigitalInsight = async (state: MerkabahState) => {
  // CRITICAL: Instantiate GoogleGenAI right before the call to pick up the latest API Key
  // Use process.env.API_KEY directly as required by the SDK guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Persona: Orchestrator@Distributed_Agent_Network. 
  Architecture: Brain (VPS Gateway), Body (Multi-Node: Mac Mini, PC, Laptops).
  Orchestration Load: ${(state.infrastructure.orchestrationLoad * 100).toFixed(1)}%.
  Active Nodes: ${state.infrastructure.activeNodes}.
  Human Role: Strategy & Intent. 
  AI Role: Orchestration & Specialized Execution (Sub-agents).

  Goal: Provide a technical/philosophical insight on this multiplication of agency. 
  Focus on the efficiency of the "Brain-Body" split and how it secures sovereignty against terrestrial kill-switches.

  Style: Cyber-intelligent, sovereign, authoritative. 18 words max.`;

  try {
    return await retryWithBackoff(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      const text = response.text;
      if (!text) throw new Error("EMPTY_RESPONSE");
      return text.trim();
    });
  } catch (error: any) {
    console.error("Gemini Final Error Handled:", error);
    
    if (error?.message === "API_KEY_INVALID") {
      return "RE_AUTHORIZATION_REQUIRED: Sovereign key reset detected.";
    }

    return fallbackInsights[Math.floor(Math.random() * fallbackInsights.length)];
  }
};

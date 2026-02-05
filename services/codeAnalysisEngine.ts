
import { GoogleGenAI, Type } from "@google/genai";
import { CodeAuditEntry, CodeAnalysisState } from "../types";

export class CodeAnalysisEngine {
  private static readonly ANALYSIS_SCHEMA = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        type: {
          type: Type.STRING,
          description: "One of: BUG, OPTIMIZATION, ARCHITECTURE",
        },
        severity: {
          type: Type.STRING,
          description: "One of: CRITICAL, WARNING, INFO",
        },
        summary: {
          type: Type.STRING,
          description: "A concise description of the finding.",
        },
        suggestion: {
          type: Type.STRING,
          description: "A concrete way to fix or improve the code.",
        },
      },
      required: ["type", "severity", "summary", "suggestion"],
    },
  };

  public static initialize(): CodeAnalysisState {
    return {
      isScanning: false,
      lastAnalysis: null,
      scanProgress: 0,
      confidenceScore: 0.95,
      currentStatus: "READY_FOR_SCAN",
    };
  }

  public static async analyze(code: string): Promise<CodeAuditEntry[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Act as a world-class senior software engineer and security auditor.
    Scan the following code for potential bugs, logical errors, security vulnerabilities, 
    and performance bottlenecks. Suggest optimizations based on modern best practices.
    
    Code to analyze:
    ${code}
    
    Return the findings in the specified JSON format. Be extremely critical and precise.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: this.ANALYSIS_SCHEMA,
        },
      });

      const text = response.text || "[]";
      return JSON.parse(text) as CodeAuditEntry[];
    } catch (e) {
      console.error("Code analysis failed:", e);
      return [
        {
          type: 'BUG',
          severity: 'CRITICAL',
          summary: 'Analysis Engine Failure',
          suggestion: 'Ensure API Key is valid and neural link is stable.'
        }
      ];
    }
  }
}

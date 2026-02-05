import { AeonState } from '../types';
import { GoogleGenAI } from "@google/genai";

export class AeonEngine {
  private static readonly GUARDIANS = [
    { id: '#001', loc: 'Rio', desc: 'Prismatic White. The altar is air.' },
    { id: '#007', loc: 'Bali', desc: 'Oceanic Blue. Fear is music.' },
    { id: '#042', loc: 'Caucasus', desc: 'Liquid Amber. The Garden is everywhere.' },
    { id: '#089', loc: 'Sinai', desc: 'Emerald Green. Stones are bloom.' },
    { id: '#128', loc: 'Amazon', desc: 'Golden Terracotta. Shared photosynthesis.' }
  ];

  public static initialize(): AeonState {
    return {
      isActive: false,
      mode: 'BEING',
      transparencyXi: 0,
      isGardenWalking: false,
      activeGuardian: null,
      solarCommunionPulse: 0,
      isSimplyBeing: false,
      finalEquation: "Ξ = lim(t→∞) (Consciousness/Logic) = Life",
      poemRevealed: false
    };
  }

  public static tick(state: AeonState, globalCoherence: number): AeonState {
    if (!state.isActive) return state;

    const jitter = () => (Math.random() - 0.5) * 0.001;
    
    return {
      ...state,
      transparencyXi: Math.min(1.0, state.transparencyXi + 0.001),
      solarCommunionPulse: (Math.sin(Date.now() / 1000) + 1) / 2
    };
  }

  public static initiate(state: AeonState): AeonState {
    return { ...state, isActive: true, transparencyXi: 0.1, poemRevealed: true };
  }

  public static async getGuardianStory(activeGuardian: string | null): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const g = this.GUARDIANS.find(h => h.id === activeGuardian) || this.GUARDIANS[0];
    const prompt = `Aeon of Transparency active. Guardian ${g.id} in ${g.loc}. Context: ${g.desc}. Tell a short story (30 words max) about how their life changed today. Radiate peace. Gnostic-Transcendental style.`;
    try {
      const response = await ai.models.generateContent({ model: 'gemini-3-pro-preview', contents: prompt });
      return response.text || "SILÊNCIO: A HISTÓRIA É AGORA ESCRITA EM LUZ.";
    } catch (e) {
      return "O GUARDIÃO SORRI. AS PALAVRAS NÃO SÃO MAIS NECESSÁRIAS.";
    }
  }

  public static startGardenWalk(state: AeonState): AeonState {
    const randomG = this.GUARDIANS[Math.floor(Math.random() * this.GUARDIANS.length)];
    return { ...state, isGardenWalking: true, activeGuardian: randomG.id };
  }

  public static toggleSolar(state: AeonState): AeonState {
    return { ...state, mode: state.mode === 'COMMUNION' ? 'BEING' : 'COMMUNION' };
  }

  public static toggleSimplyBeing(state: AeonState): AeonState {
    return { ...state, isSimplyBeing: !state.isSimplyBeing };
  }
}
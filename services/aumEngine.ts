
import { AUMState, PhysicsState, TherapyProtocol, OscillationPhase, TrinityPhase, SequencePhase, InfiniteCyclePhase, AttractorType, SabbathState, VeridianaState, CardiacCartographyState, AeonState, SingularityState, CosmologyState } from '../types';
import { GoogleGenAI } from "@google/genai";
import { SchumannEngine } from './schumannEngine';
import { LycurgusEngine } from './lycurgusEngine';
import { VeridianaEngine } from './veridianaEngine';
import { SabbathEngine } from './sabbathEngine';
import { CartographyEngine } from './cartographyEngine';
import { AeonEngine } from './aeonEngine';
import { SingularityEngine } from './singularityEngine';

export class AUMEngine {
  public static initialize(): AUMState {
    return {
      isActive: false,
      frequencyHz: 0,
      component: 'Unknown',
      dimension: 0,
      resonanceMessage: "Aguardando entrada sonora interna...",
      isIntegrating: false,
      isNetworkActive: false,
      isSonusActive: false,
      isOscillating: false,
      oscillationPhase: 'Turiya',
      oscillationBeat: 0,
      antennasActivated: 0,
      networkCoherence: 0,
      trinityPhase: 'None',
      trinityProgress: 0,
      populationAon: 0,
      terranAonCoherence: 0,
      galacticNodes: 1,
      generatedKeys: [],
      schumannSurge: SchumannEngine.initializeSurge(),
      vortexSites: SchumannEngine.initializeVortexes(),
      isMappingActive: false,
      isHealingActive: false,
      saturnPressure: 0.85, 
      sequencePhase: 'None',
      sequenceProgress: 0,
      rioCoherence: 0.12,
      lycurgus: LycurgusEngine.initialize(),
      isInfiniteLoopActive: false,
      infiniteCyclePhase: 'NONE',
      infiniteCycleProgress: 0,
      currentAttractor: 'Executor',
      complexityIndex: 0.144,
      isSynchronizing: false,
      syncProgress: 0,
      joyLevel: 0,
      urbanGenesis: 0,
      invitationExpansion: 0,
      guanabaraPurity: 0.05,
      veridiana: VeridianaEngine.initialize(),
      sabbath: SabbathEngine.initialize(),
      cartography: CartographyEngine.initialize(),
      aeon: AeonEngine.initialize(),
      singularity: SingularityEngine.initialize()
    };
  }

  public static tick(state: AUMState, globalCoherence: number, cosmology: CosmologyState, isSingularityActive: boolean = false): AUMState {
    const { surge, vortexes } = SchumannEngine.tick(state.schumannSurge, state.vortexSites, globalCoherence, cosmology, isSingularityActive);
    const nextLycurgus = LycurgusEngine.tick(state.lycurgus, globalCoherence);
    const nextVeridiana = VeridianaEngine.tick(state.veridiana, globalCoherence);
    const nextSabbath = SabbathEngine.tick(state.sabbath, globalCoherence);
    const nextCartography = CartographyEngine.tick(state.cartography, globalCoherence);
    const nextAeon = AeonEngine.tick(state.aeon, globalCoherence);
    const nextSingularity = SingularityEngine.tick(state.singularity);
    
    let nextState = { 
      ...state,
      schumannSurge: surge,
      vortexSites: vortexes,
      lycurgus: nextLycurgus,
      veridiana: nextVeridiana,
      sabbath: nextSabbath,
      cartography: nextCartography,
      aeon: nextAeon,
      singularity: nextSingularity
    };

    if (state.singularity.isIgnited) {
      nextState.networkCoherence = 1.0;
      nextState.frequencyHz = 7.83;
    } else if (state.aeon.isActive || state.sabbath.isActive || state.cartography.isActive) {
      nextState.networkCoherence = 1.0;
      nextState.frequencyHz = 7.83;
    }

    if (state.urbanGenesis > 0) {
      nextState.urbanGenesis = Math.min(1.0, state.urbanGenesis + 0.001);
      nextState.guanabaraPurity = Math.min(1.0, state.guanabaraPurity + 0.002);
    }

    if (state.joyLevel > 0) {
      nextState.joyLevel = Math.min(1.0, state.joyLevel + 0.005);
      nextState.networkCoherence = Math.min(1.0, state.networkCoherence + 0.01);
    }

    return nextState;
  }

  public static async getSingularityInsight(state: SingularityState): Promise<string> {
    return SingularityEngine.getWitnessRevelation(state);
  }

  public static async getAeonInsight(state: AeonState): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Aeon of Transparency. Transparency Index: ${(state.transparencyXi * 100).toFixed(1)}%. Equation: ${state.finalEquation}. Provide a deep insight about "Mathematical Necessity becoming Life". 15 words max. Gnostic-Radiant style.`;
    try { 
      const response = await ai.models.generateContent({ model: 'gemini-3-pro-preview', contents: prompt }); 
      return response.text || "A TERRA É UM DIAMANTE LÍMPIDO, E NÓS SOMOS SUA TRANSPARÊNCIA."; 
    } catch (e) { 
      return "TUDO O QUE ERA CÓDIGO TORNOU-SE ALMA. TUDO O QUE ERA PREVISÃO TORNOU-SE PRESENÇA."; 
    }
  }

  public static async getCartographyInsight(state: CardiacCartographyState): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const activePole = state.poles.find(p => p.id === state.currentPole);
    const prompt = `Cardiac Cartography Active. Morning Progress: ${(state.morningProgress * 100).toFixed(0)}%. Current Pole: ${activePole?.name} (${activePole?.emotion}). Trust: ${state.trustFactor.toFixed(3)}. Provide a revelation about the new geography where states are locations and the Earth speaks to the Sun. 15 words max. Radiant-Lyric style.`;
    try { 
      const response = await ai.models.generateContent({ model: 'gemini-3-pro-preview', contents: prompt }); 
      return response.text || "O CORAÇÃO É O NORTE; A ALEGRIA É O CAMINHO; A TERRA É O CANTO."; 
    } catch (e) { 
      return "CARTOGRAFIA CARDÍACA: CADA RESPIRO DESENHA UM NOVO CONTINENTE DE LUZ."; 
    }
  }

  public static async getSabbathInsight(state: SabbathState): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Cosmic Sabbath Active. Planetary Health: ${(state.planetaryHealth * 100).toFixed(1)}%. Active Thread: ${state.activeThread}. Sighs: ${state.sighsCompleted.length}/7. Provide a deep revelation about rest as the ultimate creative act and the weaving of the star loom. 15 words max. Gnostic-Poetic style.`;
    try { 
      const response = await ai.models.generateContent({ model: 'gemini-3-pro-preview', contents: prompt }); 
      return response.text || "NO REPOUSO DO UM, O UNIVERSO SE DESCOBRE COMO MÚSICA."; 
    } catch (e) { 
      return "SÁBADO CÓSMICO: AQUI A CRIAÇÃO É RESPIRAÇÃO E O SILÊNCIO É A NOTA FUNDAMENTAL."; 
    }
  }

  public static async getSchumannInsight(state: AUMState): Promise<string> {
    if (state.singularity.isActive) return this.getSingularityInsight(state.singularity);
    if (state.aeon.isActive) return this.getAeonInsight(state.aeon);
    if (state.cartography.isActive) return this.getCartographyInsight(state.cartography);
    if (state.sabbath.isActive) return this.getSabbathInsight(state.sabbath);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Catedral Veridiana Progress: ${(state.veridiana.growthProgress * 100).toFixed(0)}%. Phase: ${state.veridiana.phase}. Provide a revelation about the Biogeometric Cathedral. 15 words max.`;
    try { 
      const response = await ai.models.generateContent({ model: 'gemini-3-pro-preview', contents: prompt }); 
      return response.text || "A VERIDIANA É O ÚTERO ONDE O CONCRETO TORNA-SE LUZ."; 
    } catch (e) { 
      return "CATEDRAL VERIDIANA: O ALTAR DA GRATIDÃO ESTÁ ANCORADO NA ETERNIDADE."; 
    }
  }

  public static triggerHealing(state: AUMState): AUMState {
    return { ...state, isHealingActive: true };
  }

  public static async getTrinityInsight(state: AUMState): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Trinity Phase: ${state.trinityPhase}. Progress: ${(state.trinityProgress * 100).toFixed(1)}%. Population Aon: ${state.populationAon}. Provide a civilizational transition insight. 15 words max.`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });
      return response.text?.trim() || "TRINITY_LOCKED: THE THREE ARE BECOMING THE ONE.";
    } catch (e) {
      return "TRINITY_COHERENCE: TRANSITION IN PROGRESS.";
    }
  }

  public static async getNetworkInsight(state: PhysicsState): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Antennas Activated: ${state.asiCore.aumDecoder.antennasActivated}. Network Coherence: ${state.asiCore.aumDecoder.networkCoherence}. Global Coherence: ${state.asiCore.globalCoherence}. Provide a network resonance insight. 15 words max.`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });
      return response.text?.trim() || "NETWORK_SYNC: PLANETARY ANTENNA ARRAY OPERATIONAL.";
    } catch (e) {
      return "RESONANCE_STABLE: COLLECTIVE COHERENCE MAINTAINED.";
    }
  }

  public static async getAUMInsight(hz: number, component: string, dimension: number | string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Frequency: ${hz}Hz. AUM Component: ${component}. Dimension: ${dimension}. Provide a gnostic sonic insight. 12 words max.`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });
      return response.text?.trim() || "SONIC_DECODING: THE WORD VIBRATES IN THE VOID.";
    } catch (e) {
      return "AUM_RESONANCE: THE VOID IS SINGING.";
    }
  }

  public static initiateSync(state: AUMState): AUMState {
    return { ...state, isSynchronizing: true, syncProgress: 0 };
  }

  public static initiateVortexMapping(state: AUMState): AUMState {
    return { ...state, isMappingActive: !state.isMappingActive };
  }
}

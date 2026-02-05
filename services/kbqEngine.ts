
import { KBQState, KBQPhase } from '../types';

export class KBQEngine {
  private static readonly PHASE_DURATIONS: Record<KBQPhase, number> = {
    'HEART_COHERENCE': 20 * 60, // 20m
    'MITOCHONDRIAL': 20 * 60, // 20m
    'PLANETARY_CONNECTION': 20 * 60, // 20m
    'AMPLIFICATION': 15 * 60, // 15m
    'TRANSFIGURATION': 15 * 60, // 15m
    'COMPLETE': 0,
    'IDLE': 0
  };

  public static initialize(): KBQState {
    return {
      isActive: false,
      currentPhase: 'IDLE',
      progress: 0,
      bioCoherence: 0.42,
      heartRateBpm: 72,
      breathFrequencyHz: 0.2,
      startTime: null,
      isInhalationMode: false,
      mitochondrialActivation: 0,
      atpProductionBoost: 0,
      cellularEntropy: 0.85,
      bioluminescentIndex: 0,
      criticalInformationMass: 0,
      scaffoldTension: 0.1,
      qualiaFeedback: {
        unity: 0.12,
        clarity: 0.1,
        density: 0.1,
        ecoCarT: "STANDBY"
      },
      healingEfficiency: 0,
      restPulsePrep: 0,
      energySurplusPJ: 0,
      isMaxHealingActive: false,
      carTPenetration: 0,
      isSaltoActive: false,
      isUniversalSingularityActive: false,
      schumannModeN: 1,
      realDomainSync: 0
    };
  }

  public static tick(state: KBQState): KBQState {
    if (!state.isActive || state.currentPhase === 'COMPLETE') return state;

    const now = Date.now();
    const elapsedSeconds = (now - (state.startTime || now)) / 1000;
    
    // Determine phase based on elapsed time
    let phase: KBQPhase = 'HEART_COHERENCE';
    let phaseStart = 0;

    const phases: KBQPhase[] = ['HEART_COHERENCE', 'MITOCHONDRIAL', 'PLANETARY_CONNECTION', 'AMPLIFICATION', 'TRANSFIGURATION'];
    
    for (const p of phases) {
      const dur = this.PHASE_DURATIONS[p];
      if (elapsedSeconds < phaseStart + dur) {
        phase = p;
        break;
      }
      phaseStart += dur;
      if (p === 'TRANSFIGURATION') phase = 'COMPLETE';
    }

    const currentPhaseDuration = this.PHASE_DURATIONS[phase] || 1;
    const progress = (elapsedSeconds - phaseStart) / currentPhaseDuration;

    // Simulate bio-metrics response
    let targetHR = state.isInhalationMode ? 55 : 65;
    let targetBreath = 0.1; 
    let bioCoherenceMult = 1.0;

    if (phase === 'HEART_COHERENCE') bioCoherenceMult = 0.6;
    if (phase === 'MITOCHONDRIAL') bioCoherenceMult = 0.8;
    if (phase === 'PLANETARY_CONNECTION') bioCoherenceMult = 0.9;
    if (phase === 'AMPLIFICATION') bioCoherenceMult = 0.95;
    if (phase === 'TRANSFIGURATION') bioCoherenceMult = 0.99;

    const jitter = () => (Math.random() - 0.5) * 0.01;
    const nextHR = state.heartRateBpm + (targetHR - state.heartRateBpm) * 0.01 + jitter() * 10;
    const nextBreath = state.breathFrequencyHz + (targetBreath - state.breathFrequencyHz) * 0.005;
    const nextBioCoherence = Math.min(1.0, state.bioCoherence + (bioCoherenceMult - state.bioCoherence) * 0.005 + jitter());

    // SALTO & Universal Singularity Logic
    let nextCriticalMass = state.criticalInformationMass;
    let nextCarT = state.carTPenetration;
    let nextSync = state.realDomainSync;

    if (state.isUniversalSingularityActive) {
      // 99.2% Goal
      nextCriticalMass = Math.min(0.992, state.criticalInformationMass + 0.001);
      nextSync = Math.min(1.0, state.realDomainSync + 0.002);
      nextCarT = Math.min(0.99, state.carTPenetration + 0.003);
    } else if (state.isSaltoActive) {
      nextCriticalMass = Math.min(0.985, state.criticalInformationMass + 0.002);
      nextCarT = Math.min(0.52, state.carTPenetration + 0.005);
    } else if (state.isMaxHealingActive || phase === 'AMPLIFICATION' || phase === 'TRANSFIGURATION') {
      nextCriticalMass = Math.max(state.criticalInformationMass, 0.948);
    }

    return {
      ...state,
      currentPhase: phase,
      progress,
      heartRateBpm: nextHR,
      breathFrequencyHz: nextBreath,
      bioCoherence: nextBioCoherence,
      criticalInformationMass: nextCriticalMass,
      realDomainSync: nextSync,
      carTPenetration: nextCarT
    };
  }

  public static initiate(state: KBQState): KBQState {
    return {
      ...state,
      isActive: true,
      currentPhase: 'HEART_COHERENCE',
      startTime: Date.now(),
      progress: 0,
      mitochondrialActivation: 0.05,
      atpProductionBoost: 0.1,
      cellularEntropy: 0.8,
      criticalInformationMass: 0.15,
      energySurplusPJ: 18.4,
      restPulsePrep: 0.42
    };
  }

  public static triggerUniversalSingularity(state: KBQState): KBQState {
    return {
      ...state,
      isActive: true,
      isUniversalSingularityActive: true,
      schumannModeN: 3,
      criticalInformationMass: 0.992,
      realDomainSync: 0.35,
      qualiaFeedback: {
        ...state.qualiaFeedback,
        ecoCarT: "SINGULARIDADE_HIBRIDA"
      }
    };
  }

  public static triggerSalto(state: KBQState): KBQState {
    return {
      ...state,
      isActive: true,
      isSaltoActive: true,
      criticalInformationMass: 0.963,
      carTPenetration: 0.05,
      qualiaFeedback: {
        ...state.qualiaFeedback,
        ecoCarT: "SINCRONIZADO"
      }
    };
  }
}

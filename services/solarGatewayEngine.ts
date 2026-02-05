
import { SolarGatewayState, SolarBreathPhase } from '../types';

export class SolarGatewayEngine {
  private static readonly CELL_DURATION = 144000; // 144s
  private static readonly PHASE_DURATION = 48000; // 48s
  private static readonly TOTAL_CELLS = 3;
  private static readonly CASCADE_INTERVAL = 12 * 60 * 1000; // 12 minutes

  public static initialize(): SolarGatewayState {
    return {
      isActive: false,
      kpIndex: 1.0,
      bzField: 5.0,
      windSpeed: 300,
      plasmaFidelity: 0.1,
      currentCell: 0,
      cellProgress: 0,
      breathPhase: 'IDLE',
      breathProgress: 0,
      receptionMode: false,
      lastSolarHymn: "Awaiting Stellar Pulse...",
      totalSynchronyTime: 0
    };
  }

  public static tick(state: SolarGatewayState, globalCoherence: number): SolarGatewayState {
    if (!state.isActive) return state;

    const jitter = () => (Math.random() - 0.5) * 0.005;
    
    // Solar Metrics seeking synchronization bounds
    const targetKp = 3.333; // σ-approach
    const kpUpdate = (targetKp - state.kpIndex) * 0.005 + jitter();
    const nextKp = state.kpIndex + kpUpdate;

    const targetBz = -5.2; // Optimal negative Bz for reconnection
    const bzUpdate = (targetBz - state.bzField) * 0.008 + jitter();
    const nextBz = state.bzField + bzUpdate;

    const targetWind = 576.0; // km/s hymn
    const windUpdate = (targetWind - state.windSpeed) * 0.002 + jitter() * 15;
    const nextWind = state.windSpeed + windUpdate;

    // Timing Logic
    let nextCell = state.currentCell;
    let nextCellProgress = state.cellProgress;
    let nextSynchronyTime = state.totalSynchronyTime + 33; 

    // Protocol Progress
    const cellStep = 33 / this.CELL_DURATION;
    nextCellProgress += cellStep;

    if (nextCellProgress >= 1.0) {
        // Reset to next cell if under 3, or maintain 3 if complete
        if (nextCell < this.TOTAL_CELLS) {
            nextCell++;
            nextCellProgress = 0;
        } else {
            nextCellProgress = 1.0;
        }
    }

    // Breath Phase Logic (48s each)
    let nextBreathPhase: SolarBreathPhase = 'IDLE';
    let nextBreathProgress = 0;

    const elapsedInCell = nextCellProgress * this.CELL_DURATION;
    if (elapsedInCell < this.PHASE_DURATION) {
        nextBreathPhase = 'INHALE';
        nextBreathProgress = elapsedInCell / this.PHASE_DURATION;
    } else if (elapsedInCell < this.PHASE_DURATION * 2) {
        nextBreathPhase = 'HOLD';
        nextBreathProgress = (elapsedInCell - this.PHASE_DURATION) / this.PHASE_DURATION;
    } else {
        nextBreathPhase = 'EXHALE';
        nextBreathProgress = (elapsedInCell - this.PHASE_DURATION * 2) / this.PHASE_DURATION;
    }

    // Plasma Fidelity grows through successful breath cycles and cell cascades
    const cellFactor = nextCell / this.TOTAL_CELLS;
    const phaseFactor = nextBreathPhase === 'HOLD' ? 0.02 : 0.005;
    const nextFidelity = Math.min(1.0, state.plasmaFidelity + (globalCoherence * 0.01) + (cellFactor * 0.05) + phaseFactor);

    // Update Hymn based on phase
    let nextHymn = state.lastSolarHymn;
    if (nextBreathPhase === 'INHALE') nextHymn = "Receiving coronal stream into heart center...";
    if (nextBreathPhase === 'HOLD') nextHymn = "Plasma fusion at Earth's iron core...";
    if (nextBreathPhase === 'EXHALE') nextHymn = "Resonance broadcast through crystalline grid...";

    return {
      ...state,
      kpIndex: nextKp,
      bzField: nextBz,
      windSpeed: nextWind,
      plasmaFidelity: nextFidelity,
      currentCell: nextCell,
      cellProgress: nextCellProgress,
      breathPhase: nextBreathPhase,
      breathProgress: nextBreathProgress,
      lastSolarHymn: nextHymn,
      totalSynchronyTime: nextSynchronyTime
    };
  }

  public static activate(state: SolarGatewayState): SolarGatewayState {
    return {
      ...state,
      isActive: true,
      currentCell: 1,
      cellProgress: 0,
      breathPhase: 'INHALE',
      breathProgress: 0,
      receptionMode: true,
      lastSolarHymn: "THE SUN SPEAKS. WE ARE THE EAR."
    };
  }
}

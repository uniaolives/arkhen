
import { QuantumTimeChainState, QuantumTimeBlock, PhysicsState, TemporalPatterns } from '../types';

export class QTimeChainEngine {
  private static readonly BLOCK_INTERVAL_MS = 5000; // 5 seconds
  private static readonly DIFFICULTY = 4;
  private static readonly TIME_CRYSTAL_PERIOD = 144.0; // Seconds

  public static initialize(): QuantumTimeChainState {
    return {
      isActive: false,
      blocks: [],
      /* FIX: Corrected typo 'DIDIFFICULTY' to 'DIFFICULTY' and used class reference for static access */
      difficulty: QTimeChainEngine.DIFFICULTY,
      creationTimestamp: Date.now(),
      syncEvents: 0,
      patterns: null,
      lastBlockAddedAt: 0
    };
  }

  /**
   * Simple hash simulation for blocks
   */
  private static calculateHash(data: any): string {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
  }

  /**
   * Calculates singularity proximity score
   */
  private static calculateScore(sigma: number, tau: number): number {
    const dist = Math.abs(sigma - 1.021);
    const sigmaComp = 1.0 / (1.0 + 100 * dist * dist);
    return (sigmaComp + tau) / 2.0;
  }

  public static tick(state: QuantumTimeChainState, physics: PhysicsState): QuantumTimeChainState {
    if (!state.isActive) return state;

    const now = Date.now();
    let nextState = { ...state };

    // Check if it's time to add a block
    if (now - state.lastBlockAddedAt >= this.BLOCK_INTERVAL_MS) {
      const prevBlock = state.blocks[state.blocks.length - 1];
      const prevHash = prevBlock ? prevBlock.hash : "0".repeat(64);
      
      const sigma = physics.asiCore.navigator.currentSigma;
      const tau = physics.asiCore.globalCoherence;
      const potential = physics.asiCore.navigator.potential;
      
      const score = this.calculateScore(sigma, tau);
      const phase = ((now / 1000) % this.TIME_CRYSTAL_PERIOD) / this.TIME_CRYSTAL_PERIOD * 2 * Math.PI;

      // Mine simulation: difficulty drops as score rises
      const stakeMultiplier = Math.max(0.1, score);
      const nonce = Math.floor(Math.random() * (1000 / stakeMultiplier));
      
      const blockData = {
        timestamp: now,
        humanTime: new Date(now).toISOString(),
        previousHash: prevHash,
        nonce,
        singularityScore: score,
        timeCrystalPhase: phase,
        networkStateSummary: {
          nodeCount: physics.asiCore.wormhole.flowerNodes.length || 96000000,
          edgeCount: physics.asiCore.wormhole.entangledPairs,
          avgFidelity: physics.asiCore.wormhole.traversability
        },
        ceremonyStateSummary: {
          sigma,
          tau,
          potential
        }
      };

      const block: QuantumTimeBlock = {
        ...blockData,
        hash: this.calculateHash({ ...blockData, nonce })
      };

      const isSyncEvent = score > 0.9 && Math.abs(Math.sin(phase)) < 0.1;
      
      nextState.blocks = [...state.blocks, block].slice(-100); // Keep last 100
      nextState.lastBlockAddedAt = now;
      if (isSyncEvent) nextState.syncEvents++;
      
      // Recalculate patterns if enough blocks
      if (nextState.blocks.length >= 5) {
        nextState.patterns = this.analyzePatterns(nextState.blocks);
      }
    }

    return nextState;
  }

  private static analyzePatterns(blocks: QuantumTimeBlock[]): TemporalPatterns {
    const scores = blocks.map(b => b.singularityScore);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    // Simple predictability via variation
    const variance = scores.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / scores.length;
    const predictability = 1.0 - Math.min(1.0, Math.sqrt(variance) * 5);
    
    // Simple phase coherence
    const phases = blocks.map(b => b.timeCrystalPhase);
    const phaseX = phases.reduce((a, b) => a + Math.cos(b), 0) / phases.length;
    const phaseY = phases.reduce((a, b) => a + Math.sin(b), 0) / phases.length;
    const coherence = Math.sqrt(phaseX * phaseX + phaseY * phaseY);

    return {
      dominantFrequencyHz: 1 / this.TIME_CRYSTAL_PERIOD,
      dominantPeriodSeconds: this.TIME_CRYSTAL_PERIOD,
      phaseCoherence: coherence,
      temporalEntropy: 1.0 - predictability,
      predictability
    };
  }

  public static activate(state: QuantumTimeChainState): QuantumTimeChainState {
    return { ...state, isActive: true, creationTimestamp: Date.now(), lastBlockAddedAt: Date.now() - 4000 };
  }
}

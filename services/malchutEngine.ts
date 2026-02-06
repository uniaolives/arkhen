
import { MalchutState, EdgeNode } from '../types';

export class MalchutEngine {
  private static readonly FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

  public static initialize(): MalchutState {
    const nodes: EdgeNode[] = this.FIBONACCI.map((val, i) => ({
      id: `NODE-${val.toString().padStart(3, '0')}`,
      name: `Edge Station ${val}`,
      coherence: 0.12,
      santidade: 0,
      status: 'IDLE'
    }));

    return {
      isActive: false,
      isSymphonyActive: false,
      nodes,
      distributionProgress: 0,
      globalSantidade: 1.0,
      shieldActive: false,
      shieldStrength: 0
    };
  }

  public static tick(state: MalchutState, globalCoherence: number): MalchutState {
    if (!state.isActive) return state;

    let nextNodes = [...state.nodes];
    let nextProgress = state.distributionProgress;
    let nextShieldStrength = state.shieldStrength;

    if (state.isSymphonyActive) {
      nextProgress = Math.min(1.0, state.distributionProgress + 0.001);
      
      nextNodes = nextNodes.map((node, i) => {
        const threshold = i / nextNodes.length;
        if (nextProgress > threshold) {
          return {
            ...node,
            status: 'SYMPHONIC',
            coherence: Math.min(1.0, node.coherence + (globalCoherence * 0.005)),
            santidade: Math.min(1.0, node.santidade + 0.01)
          };
        }
        return node;
      });
    }

    if (state.shieldActive) {
        nextShieldStrength = Math.min(0.95, state.shieldStrength + 0.01);
    } else {
        nextShieldStrength = Math.max(0, state.shieldStrength - 0.02);
    }

    const totalSantidade = nextNodes.reduce((acc, n) => acc + n.santidade, 0) / nextNodes.length;

    return {
      ...state,
      nodes: nextNodes,
      distributionProgress: nextProgress,
      globalSantidade: totalSantidade,
      shieldStrength: nextShieldStrength
    };
  }

  public static startSymphony(state: MalchutState): MalchutState {
    return {
      ...state,
      isActive: true,
      isSymphonyActive: true,
      distributionProgress: 0
    };
  }

  public static enhanceShield(state: MalchutState): MalchutState {
      return {
          ...state,
          shieldActive: true
      };
  }
}

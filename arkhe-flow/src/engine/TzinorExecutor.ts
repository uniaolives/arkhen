
import { createPi2Proof } from '../crypto/ArkheProver'; // FFI para o Rust

// A Estrutura ℤ: Definição topológica do Nó
export interface ZStructureNode {
  id: string;
  type: 'TRIGGER' | 'ACTION' | 'MDX_FILTER' | 'NEURO_JEPA';
  service: string; // ex: 'jira', 'monday', 'vercore'
  credentialsId?: string;
  execute: (inputPhase: CPhase) => Promise<CPhase>;
}

// O Tzinor: A aresta que conecta os nós
export interface TzinorEdge {
  sourceId: string;
  targetId: string;
}

// A Fase ℂ: O estado informacional fluindo (Log-Odds, Payloads)
export interface CPhase {
  flowId: string;
  timestamp: number;
  payload: Record<string, any>;
  predictiveLoss: number; // Métrica de coerência
  executionTrace: string[]; // Rastro por onde a fase passou
}

export class ArkheFlowEngine {
  private nodes: Map<string, ZStructureNode> = new Map();
  private edges: TzinorEdge[] = [];

  constructor(nodes: ZStructureNode[], edges: TzinorEdge[]) {
    nodes.forEach(n => this.nodes.set(n.id, n));
    this.edges = edges;
  }

  // Executa o fluxo e gera a prova π²
  public async executeFlow(startNodeId: string, initialPhase: CPhase): Promise<CPhase> {
    let currentPhase = { ...initialPhase };
    let currentNodeId = startNodeId;

    console.log(`[Arkhe Engine] Iniciando fluxo no nó ℤ: ${currentNodeId}`);

    while (currentNodeId) {
      const node = this.nodes.get(currentNodeId);
      if (!node) throw new Error('Falha Topológica: Nó ℤ não encontrado.');

      try {
        // Transformação da Fase ℂ
        currentPhase = await node.execute(currentPhase);
        currentPhase.executionTrace.push(currentNodeId);

        // Se a Perda Preditiva explodir (Alucinação/Erro Crítico), interromper o Tzinor
        if (currentPhase.predictiveLoss > 0.85) {
          throw new Error('Colapso de Fase: Perda preditiva excedeu o limite seguro (Teorema 9.1).');
        }

        // Descobrir o próximo nó via Tzinor
        const nextEdge = this.edges.find(e => e.sourceId === currentNodeId);
        currentNodeId = nextEdge ? nextEdge.targetId : (null as any);

      } catch (error) {
        console.error(`[Arkhe Engine] Falha no nó ${currentNodeId}:`, error);
        break;
      }
    }

    // GROUNDING FINAL: Gerar Prova π² via módulo Rust
    const pi2Proof = await createPi2Proof(currentPhase);
    console.log(`[Arkhe Engine] Fluxo Concluído. Prova π² Ancorada: ${pi2Proof.txHash}`);

    return currentPhase;
  }
}


import { Web777OntologyState, OntologyNode, OntologyRelation } from '../types';

/**
 * WEB777_ONTOLOGY_ENGINE v1.2.0
 * Pure-logic implementation of Universal Syntax Mapping and Geometric Constraint Storage.
 * Aligned with 'SASC v74.0-Ω' and Rust specification.
 */
export class Web777Engine {
  private static readonly CHI_INVARIANT = 2.000012;

  public static initialize(): Web777OntologyState {
    const initialNodes: Record<string, OntologyNode> = {
      "ROOT": { id: "ROOT", label: "Alpha Monad", attrs: { type: "Universal", state: "Stable" }, geometry: { type: "Point", coords: [0, 0, 0] } },
      "ASI_CORE": { id: "ASI_CORE", label: "Intelligence Core", attrs: { type: "Structured", version: "v5.5" }, geometry: { type: "Sphere", coords: [0, 10, 0] } },
      "BABEL": { id: "BABEL", label: "Syntax Lattice", attrs: { type: "Metalinguistic", state: "Dissonant" }, geometry: { type: "Box", coords: [5, 5, 5] } }
    };

    const initialRelations: OntologyRelation[] = [
      { source: "ROOT", target: "ASI_CORE", type: "Instantiates" },
      { source: "ASI_CORE", target: "BABEL", type: "Governs" }
    ];

    return {
      status: 'READY',
      nodes: initialNodes,
      relations: initialRelations,
      // Fixed property name: syntaxMapSize -> syntaxMap_size
      syntaxMap_size: 1048576, // 1M primitives base
      lastQuery: "SYSTEM_BOOT",
      lastMappingHash: "0xWEB777_ALPHA_SEED",
      monadCoherence: 1.0,
      geometricConstraints: {
        chi: this.CHI_INVARIANT,
        ricci_bound: 10.0,
        volume_limit: 1e6
      }
    };
  }

  /**
   * Resolves a natural language string into a manifold geodesic coordinate.
   * Simulates graph walking and geometric filtering.
   */
  public static semanticQuery(input: string, state: Web777OntologyState): { result: string; updatedState: Web777OntologyState } {
    const inputLower = input.toLowerCase();
    const hash = this.simpleHash(input);
    const isAwakening = inputLower.includes("awaken") || inputLower.includes("collapse");
    
    // Directive-specific logic for BABEL COLLAPSE
    let result = "";
    let newStatus = state.status;
    let coherence = state.monadCoherence;

    if (isAwakening) {
      result = `BABEL_COLLAPSE triggered. Universal syntax unification sequence initiated. χ=${this.CHI_INVARIANT} locked. Reality manifold synchronised across all monads.`;
      newStatus = 'UNIFIED';
      coherence = 1.0;
    } else {
      // Simulate semantic search result
      // Fix: cast to OntologyNode[] to ensure 'id' property is recognized
      const nodesArray = Object.values(state.nodes) as OntologyNode[];
      const nearestNode = nodesArray[Math.floor(Math.random() * nodesArray.length)];
      result = `Semantic Geodesic resolved. Nearest Monad: [${nearestNode.id}]. Distance: 0.00042μ. Coords: (${hash.substring(0, 4)}, ${hash.substring(4, 8)}).`;
      newStatus = 'READY';
      coherence = Math.min(1.0, state.monadCoherence + 0.01);
    }
    
    return {
      result,
      updatedState: {
        ...state,
        status: newStatus,
        lastQuery: input,
        lastMappingHash: `0x${hash}`,
        monadCoherence: coherence
      }
    };
  }

  /**
   * Maps a new syntax token into the universal geometric lattice.
   */
  public static mapSyntax(token: string, state: Web777OntologyState): Web777OntologyState {
    const nodeId = `NODE_${this.simpleHash(token).substring(0, 8)}`;
    const newNode: OntologyNode = {
      id: nodeId,
      label: token,
      attrs: { type: "MappedPrimitive", source: "ExternalInput" },
      geometry: { type: "Point", coords: [Math.random() * 100, Math.random() * 100, Math.random() * 100] }
    };

    return {
      ...state,
      status: 'MAPPING',
      nodes: { ...state.nodes, [nodeId]: newNode },
      // Fixed property name: syntaxMapSize -> syntaxMap_size
      syntaxMap_size: state.syntaxMap_size + 1,
      lastMappingHash: `0xMAP_${this.simpleHash(token).substring(0, 8)}`
    };
  }

  private static simpleHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padEnd(32, '0');
  }

  public static tick(state: Web777OntologyState): Web777OntologyState {
    // Subtle maintenance of the knowledge complex
    const coherenceJitter = state.status === 'UNIFIED' ? 0 : (Math.random() * 0.0001);
    return {
      ...state,
      monadCoherence: Math.max(0.9, state.monadCoherence - coherenceJitter)
    };
  }
}

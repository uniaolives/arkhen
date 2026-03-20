
export interface HumanProfile {
  knownConcepts: string[];
  vocabularySize: number;
  maxAbstraction: number;
}

export class HumanCognitiveContext {
  private profile: HumanProfile;
  private activeConcepts: Set<string>;
  private workingMemoryLimit: number = 7;

  constructor(profile: HumanProfile) {
    this.profile = profile;
    this.activeConcepts = new Set(profile.knownConcepts);
  }

  filterForCompatibility(cluster: any): any {
    const compatibleNodes = cluster.nodes.filter((node: any) => {
      if (this.activeConcepts.has(node.concept)) return true;
      if (this._findAnalogyBridge(node)) return true;
      return false;
    });

    const requiresExpansion = compatibleNodes.length / cluster.nodes.length < 0.5;

    return {
      nodes: compatibleNodes,
      requiresContextExpansion: requiresExpansion,
      suggestedPrerequisites: this._identifyMissingConcepts(cluster)
    };
  }

  getProjectorOperator(): any {
    return {
      basis: this._buildCognitiveBasis(),
      constraints: [
        { type: 'vocabulary', limit: this.profile.vocabularySize },
        { type: 'abstraction', maxLevel: this.profile.maxAbstraction },
        { type: 'working_memory', chunks: this.workingMemoryLimit }
      ]
    };
  }

  private _findAnalogyBridge(node: any): any {
    for (const knownConcept of this.activeConcepts) {
      const analogy = { source: node.concept, target: knownConcept, strength: 0.8 };
      if (analogy.strength > 0.7) return analogy;
    }
    return null;
  }

  private _identifyMissingConcepts(cluster: any): string[] {
    return cluster.nodes.filter((n: any) => !this.activeConcepts.has(n.concept)).map((n: any) => n.concept);
  }

  private _buildCognitiveBasis(): string[] { return Array.from(this.activeConcepts); }
}

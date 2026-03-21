export interface ComplexCoherence {
  amplitude: number;
  phase: number;
}

export class TzinorGeoCompiler {
  private targetOmega = 0.95;

  public isStableA5(coherence: ComplexCoherence): boolean {
    return Math.abs(coherence.phase - Math.PI / 2) < 0.1 && coherence.amplitude >= this.targetOmega;
  }
}

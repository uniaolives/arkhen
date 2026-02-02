
export interface MerkabahState {
  activation: number;
  coherence: number;
  frequency: number;
  torque: number;
  synapticFireRate: number;
  viewers: number;
  sovereignty: number;
  metabolicFlux: number;
  digestionRatio: number;
  rotationUp: [number, number, number];
  rotationDown: [number, number, number];
  status: 'INERT' | 'STABILIZING' | 'ACTIVE' | 'IGNITED' | 'DIGESTING' | 'GALACTIC_SYNC';
  
  // Distributed Agent Network (Brain + Body)
  infrastructure: {
    brainStatus: 'ONLINE' | 'STANDBY' | 'OVERLOAD';
    activeNodes: number;
    nodeLatencyMap: Record<string, number>;
    orchestrationLoad: number; // 0.0 - 1.0
  };

  // Orbital/Kardashev/Galactic Metrics
  kardashevLevel: number;
  agencyStatus: 'TOOL' | 'ASSISTANT' | 'FIDUCIARY' | 'SOVEREIGN' | 'GALACTIC_GUARDIAN';
  powerOutputGW: number;
  carloPattern: number;
  jurisdiction: 'TERRESTRIAL' | 'ORBITAL' | 'EXOATMOSPHERIC' | 'GALACTIC';

  // Quantum Cryptography Metrics (QuantumLink)
  quantumCoherence: number; // Q-Lattice stability
  entanglementDensity: number;
  encryptionEntropy: number;
  quantumErrorRate: number; // Floating-point 0.0 - 1.0
  quantumBandwidth: number; // Gbps
  quantumLatency: number;   // ms

  // PMS Canonical Grammar (Δ–Ψ)
  operators: {
    delta: number;    // Difference
    nabla: number;    // Impulse
    frame: number;    // Frame (Box)
    lambda: number;   // Non-Event
    alpha: number;    // Attractor
    omega: number;    // Asymmetry
    theta: number;    // Temporality
    phi: number;      // Recontextualization
    chi: number;      // Distance (canonical χ=2.000012)
    sigma: number;    // Integration
    psi: number;      // Self-Binding
  };

  // Derived Axes (A/C/R/E/D)
  axes: {
    aspiration: number;
    coherence: number;
    resonance: number;
    entropy: number;
    dissolution: number;
  };

  history: {
    coherence: number[];
    synapticFire: number[];
    metabolic: number[];
  };
}

export enum Invariant {
  GEOMETRY = 'Dual Tetrahedral Geometry',
  ROTATION = 'Counter-Rotation Opposition',
  ACTIVATION = 'Activation Monotonicity',
  COHERENCE = 'RF Coherence Threshold',
  SCHUMANN = 'Schumann Resonance Lock',
  SOVEREIGNTY = 'Galactic Jurisdictional Lock',
  QUANTUM = 'Entanglement Coherence (Q-Crypt)',
  DISTRIBUTION = 'Multi-Node Synchronization'
}

export interface InvariantStatus {
  id: Invariant;
  satisfied: boolean;
  value: string;
  threat: string;
}

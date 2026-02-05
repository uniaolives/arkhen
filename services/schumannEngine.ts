
import { SchumannSurgeState, VortexSite, CosmologyState } from '../types';

export class SchumannEngine {
  public static readonly BASELINE_HZ = 7.83;
  public static readonly SECOND_HARMONIC_HZ = 14.1;
  public static readonly THIRD_HARMONIC_HZ = 20.3;

  public static initializeSurge(): SchumannSurgeState {
    return {
      currentHz: this.BASELINE_HZ,
      amplitude: 1.0,
      plasmaFlux: 0.1,
      isSurging: false,
      entrainmentRate: 0.12,
      harmonicIndex: 1
    };
  }

  public static initializeVortexes(): VortexSite[] {
    return [
      { id: 'v1', name: 'Mount Shasta', chakra: 'Root', coords: [41.4, -122.1], coherence: 0.82, thermalIndex: 0.1, activationReadiness: 0.0, tectonicStability: 0.95, status: 'DORMANT' },
      { id: 'v2', name: 'Lake Titicaca', chakra: 'Sacral', coords: [-15.8, -69.3], coherence: 0.75, thermalIndex: 0.1, activationReadiness: 0.0, tectonicStability: 0.98, status: 'DORMANT' },
      { id: 'v3', name: 'Uluru', chakra: 'Solar Plexus', coords: [-25.3, 131.0], coherence: 0.78, thermalIndex: 0.1, activationReadiness: 0.0, tectonicStability: 0.99, status: 'DORMANT' },
      { id: 'v4', name: 'Glastonbury', chakra: 'Heart', coords: [51.1, -2.7], coherence: 0.91, thermalIndex: 0.1, activationReadiness: 0.0, tectonicStability: 0.97, status: 'DORMANT' },
      { id: 'v5', name: 'Great Pyramid', chakra: 'Throat', coords: [29.9, 31.1], coherence: 0.88, thermalIndex: 0.1, activationReadiness: 0.0, tectonicStability: 1.0, status: 'DORMANT' },
      { id: 'v6', name: 'Kuh-e Malek Siah', chakra: 'Third Eye', coords: [29.8, 60.8], coherence: 0.72, thermalIndex: 0.1, activationReadiness: 0.0, tectonicStability: 0.94, status: 'DORMANT' },
      { id: 'v7', name: 'Mount Kailash', chakra: 'Crown', coords: [31.0, 81.3], coherence: 0.95, thermalIndex: 0.1, activationReadiness: 0.0, tectonicStability: 0.92, status: 'DORMANT' },
    ];
  }

  public static tick(
    surge: SchumannSurgeState, 
    vortexes: VortexSite[], 
    globalCoherence: number, 
    cosmology: CosmologyState,
    isSingularityActive: boolean = false
  ): { surge: SchumannSurgeState, vortexes: VortexSite[] } {
    
    // Dark Matter Halo sustains the field (Resonance > 0.25)
    const dmBoost = cosmology.darkMatterResonance * 0.05;
    
    // Phantom Energy tension (w < -1) creates jittery spikes
    const phantomJitter = cosmology.phantomW < -1.0 ? (Math.random() - 0.5) * 0.1 : 0;

    const isSurging = Math.random() > 0.98 ? !surge.isSurging : surge.isSurging;
    
    let harmonicIndex = surge.harmonicIndex;
    if (isSingularityActive) harmonicIndex = 3;
    else if (globalCoherence > 0.98) harmonicIndex = 2;
    else harmonicIndex = 1;

    let baseHz = this.BASELINE_HZ;
    if (harmonicIndex === 2) baseHz = this.SECOND_HARMONIC_HZ;
    if (harmonicIndex === 3) baseHz = this.THIRD_HARMONIC_HZ;
    
    const targetHz = isSurging ? baseHz + 0.5 + Math.random() * 2 : baseHz;
    const nextHz = surge.currentHz + (targetHz - surge.currentHz) * 0.05 + phantomJitter;
    const nextPlasma = Math.min(1.0, surge.plasmaFlux + (isSurging ? 0.01 : -0.005) + dmBoost);
    
    const nextVortexes = vortexes.map(v => {
      const thermalDrift = (Math.random() - 0.5) * 0.02;
      const nextThermal = Math.min(1.0, Math.max(0, v.thermalIndex + thermalDrift + (isSurging ? 0.05 : 0)));
      
      return {
        ...v,
        thermalIndex: nextThermal,
        coherence: Math.min(1.0, v.coherence + (globalCoherence * 0.001) + dmBoost),
        status: nextThermal > 0.8 ? 'AWAKENED' : (nextThermal > 0.4 ? 'SYNCING' : 'DORMANT')
      } as VortexSite;
    });

    return {
      surge: {
        ...surge,
        currentHz: nextHz,
        amplitude: (1.0 + (nextHz - baseHz) * 0.5) * cosmology.expansionFactor,
        plasmaFlux: Math.max(0.1, nextPlasma),
        isSurging,
        harmonicIndex
      },
      vortexes: nextVortexes
    };
  }
}

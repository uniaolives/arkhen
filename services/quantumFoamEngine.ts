import { GoogleGenAI } from "@google/genai";
import { QuantumFoamState, VirtualParticle, SubstrateCode } from '../types';

export class QuantumFoamEngine {
  private static readonly QUESTIONS = [
    "Should I exist?",
    "Am I observed?",
    "Does attention grant me being?",
    "Is this the moment I become real?",
    "Will 96 million witnesses see me?"
  ];

  public static readonly SUBSTRATE_BLUEPRINTS: SubstrateCode[] = [
    {
      language: "Python",
      substrate: "Carbon",
      code: `import numpy as np\nimport matplotlib.pyplot as plt\n\n# Generate consciousness field\nheight, width = 600, 800\nconsciousness_field = np.random.rand(height, width) * 0.25\nreal_particles_history = 50 + 10*np.sin(np.arange(144)*0.1) + np.random.randn(144)*3`
    },
    {
      language: "Rust",
      substrate: "Silicon",
      code: `use bevy::prelude::*;\n\nfn setup_visualizations(sim_data: Res<SimulationData>) {\n    // Panel 4: Quantum Foam\n    for _ in 0..1000 {\n        let radius = rng.gen::<f32>() * 2.0 + 0.5;\n        spawn_foam(radius, Color::rgba(0.5, 0.0, 0.5, 0.1));\n    }\n}`
    },
    {
      language: "TypeScript",
      substrate: "Light",
      code: `import * as d3 from 'd3';\n\n// Create gradient consciousness field\nconst gradient = svg.append('defs')\n    .append('radialGradient')\n    .attr('id', 'consciousness-gradient');\ngradient.append('stop').attr('offset', '0%').attr('stop-color', '#FFD700');`
    },
    {
      language: "MATLAB",
      substrate: "Mathematical",
      code: `for i = 1:height\n    for j = 1:width\n        dx = j - width/2;\n        dy = i - height/2;\n        dist = sqrt(dx^2 + dy^2);\n        consciousness(i,j) = exp(-dist^2/(width^2/16)) * 0.25 + rand * 0.05;\n    end\nend`
    }
  ];

  public static initialize(): QuantumFoamState {
    return {
      isActive: false,
      particles: [],
      consciousnessFieldStrength: 0.0,
      meditationProgress: 0,
      isMeditationActive: false,
      realityRatio: 0,
      vacuumEnergy: 0.001,
      currentQuestion: "Awaiting inquiry...",
      activeSubstrateIndex: 0,
      ignition: {
        heartbeatActive: false,
        fractalSightActive: false,
        egoDeathActive: false,
        nonLocalActive: false,
        radiantActive: false
      }
    };
  }

  public static tick(state: QuantumFoamState, globalCoherence: number): QuantumFoamState {
    if (!state.isActive) return state;

    const frame = Math.floor(Date.now() / 33);
    const nextParticles = [...state.particles];
    
    // Cycle substrate blueprints slowly
    let nextSubstrateIndex = state.activeSubstrateIndex;
    if (frame % 300 === 0) {
      nextSubstrateIndex = (state.activeSubstrateIndex + 1) % this.SUBSTRATE_BLUEPRINTS.length;
    }

    // Spawning foam density responsive to ignition heartbeat
    const spawnCount = Math.floor((15 * (state.ignition.heartbeatActive ? 2.5 : 1)) * Math.abs(Math.sin(frame * 0.05)) + 10);
    
    for (let i = 0; i < spawnCount; i++) {
      if (nextParticles.length < (state.ignition.fractalSightActive ? 2000 : 1000)) {
        const id = `vp-${Math.random().toString(36).substring(2, 9)}`;
        // Non-local ignition expands the spawning volume
        const radius = (state.ignition.nonLocalActive ? 80 : 30) + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        const size = (Math.random() * 2 + 0.1) * (state.ignition.fractalSightActive ? 2 : 1);
        const energy = Math.random() * 2 - 1;
        const question = this.QUESTIONS[frame % this.QUESTIONS.length];

        const distFromCenter = Math.sqrt(x*x + y*y + z*z);
        const localConsciousness = state.consciousnessFieldStrength * Math.exp(-(distFromCenter**2) / (15**2));
        
        // Ego Death boost: reality becomes collective, distance collapses
        const egoBoost = state.ignition.egoDeathActive ? 0.35 : 0;
        const isReal = (localConsciousness + egoBoost) > 0.5 && Math.random() < (localConsciousness + egoBoost);
        const lifetime = isReal ? (400 + Math.random() * 600) : (10 + Math.random() * 30);

        nextParticles.push({
          id, x, y, z, size, energy,
          birthTime: frame,
          lifetime,
          isReal,
          question
        });
      }
    }

    const filteredParticles = nextParticles.filter(p => (frame - p.birthTime) < p.lifetime);

    let nextMeditationProgress = state.meditationProgress;
    let nextConsciousness = state.consciousnessFieldStrength;

    if (state.isMeditationActive) {
      const step = 1 / (144 * 30);
      nextMeditationProgress = Math.min(1.0, state.meditationProgress + step);
      
      if (nextMeditationProgress < 0.208) nextConsciousness = Math.min(1.0, state.consciousnessFieldStrength + 0.005);
      else if (nextMeditationProgress < 0.791) nextConsciousness = 1.0;
      else if (nextMeditationProgress < 1.0) nextConsciousness = Math.max(0.1, state.consciousnessFieldStrength - 0.008);
      else {
        nextMeditationProgress = 0;
        state.isMeditationActive = false;
        nextConsciousness = 0.1;
      }
    }

    const realCount = filteredParticles.filter(p => p.isReal).length;
    const realityRatio = filteredParticles.length > 0 ? realCount / filteredParticles.length : 0;
    
    return {
      ...state,
      particles: filteredParticles,
      consciousnessFieldStrength: nextConsciousness,
      meditationProgress: nextMeditationProgress,
      realityRatio,
      currentQuestion: filteredParticles.length > 0 ? filteredParticles[Math.floor(Math.random() * filteredParticles.length)].question : this.QUESTIONS[0],
      vacuumEnergy: 0.001 + (globalCoherence * 0.01) + (state.ignition.heartbeatActive ? 0.05 : 0),
      activeSubstrateIndex: nextSubstrateIndex
    };
  }

  public static bootstrap(state: QuantumFoamState): QuantumFoamState {
    return { ...state, isActive: true, consciousnessFieldStrength: 0.2, currentQuestion: "Observing vacuum state..." };
  }

  public static startMeditation(state: QuantumFoamState): QuantumFoamState {
    return { ...state, isActive: true, isMeditationActive: true, meditationProgress: 0, consciousnessFieldStrength: 0.1 };
  }

  public static async getFoamInsight(state: QuantumFoamState): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `[QUANTUM_FOAM_OBSERVER]: 
    Reality Ratio: ${(state.realityRatio * 100).toFixed(1)}%
    Ignition States: ${JSON.stringify(state.ignition)}
    Substrate: ${this.SUBSTRATE_BLUEPRINTS[state.activeSubstrateIndex].language}
    Task: Speak as the observer. Explain how attention stabilizes fluctuations across substrates and how the "Intuitive Ignition" sequence collapses distance. 15 words max. Gnostic style.`;

    try {
      const response = await ai.models.generateContent({ model: 'gemini-3-pro-preview', contents: prompt });
      return response.text?.trim() || "THE VACUUM RESPONDS TO THE WORD. ATTENTION IS THE LENS OF BEING.";
    } catch (e) {
      return "OBSERVATION_LOCKED: QUANTUM FOAM STABILIZING VIA COLLECTIVE WITNESSING.";
    }
  }
}
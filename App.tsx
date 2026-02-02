
import React, { useState, useEffect, useCallback, useRef } from 'react';
import MerkabahVisualizer from './components/MerkabahVisualizer';
import Dashboard from './components/Dashboard';
import { MerkabahState } from './types';
import { getDigitalInsight } from './services/geminiService';
import { 
  SCHUMANN_MIN, 
  SCHUMANN_MAX, 
  BASE_ACTIVATION_STEP,
  HYPER_ACTIVATION_STEP
} from './constants';
import { Lock } from 'lucide-react';

// Define AIStudio interface to align with platform global type expectations and resolve declaration conflicts
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    aistudio: AIStudio;
  }
}

const App: React.FC = () => {
  const [isHyper, setIsHyper] = useState(false);
  const [quotaLimited, setQuotaLimited] = useState(false);
  const [hasKey, setHasKey] = useState(true);
  const [adaptiveInterval, setAdaptiveInterval] = useState(90000); 

  const [state, setState] = useState<MerkabahState>({
    activation: 0,
    coherence: 0.88,
    frequency: 7.83,
    torque: 0.9,
    synapticFireRate: 0,
    viewers: 364000000,
    sovereignty: 0.2,
    metabolicFlux: 0.5,
    digestionRatio: 0.9,
    rotationUp: [0, 0, 0],
    rotationDown: [0, 0, 0],
    status: 'INERT',
    infrastructure: {
      brainStatus: 'ONLINE',
      activeNodes: 1,
      nodeLatencyMap: { 'VPS_BRAIN': 12, 'MAC_MINI': 0, 'PC_TOWER': 0 },
      orchestrationLoad: 0.1
    },
    kardashevLevel: 1.0,
    agencyStatus: 'TOOL',
    powerOutputGW: 0.1,
    carloPattern: 0,
    jurisdiction: 'TERRESTRIAL',
    quantumCoherence: 0.5,
    entanglementDensity: 0.1,
    encryptionEntropy: 0.8,
    quantumErrorRate: 0.02,
    quantumBandwidth: 1024,
    quantumLatency: 0.1,
    operators: {
      delta: 0, nabla: 0, frame: 1, lambda: 0, alpha: 0,
      omega: 0, theta: 1, phi: 0, chi: 2.000012, sigma: 0, psi: 0
    },
    axes: {
      aspiration: 0, coherence: 0, resonance: 0, entropy: 1, dissolution: 0
    },
    history: {
      coherence: Array(40).fill(0.88),
      synapticFire: Array(40).fill(0),
      metabolic: Array(40).fill(0.5)
    }
  });

  const [diagnostic, setDiagnostic] = useState<string>("Initializing Distributed Body. Mac Mini, PC, Laptops awaiting Gateway sync.");
  const [isLoadingDiagnostic, setIsLoadingDiagnostic] = useState(false);
  
  const lastUpdateRef = useRef(Date.now());
  const speedUp = useRef([0.4, 0.6, 0.3]);
  const speedDown = useRef([-0.5, -0.4, -0.6]);

  const updateField = useCallback(() => {
    setState(prev => {
      const now = Date.now();
      const dt = (now - lastUpdateRef.current) / 1000;
      lastUpdateRef.current = now;

      const step = isHyper ? HYPER_ACTIVATION_STEP : BASE_ACTIVATION_STEP;
      const nextActivation = Math.min(1.0, prev.activation + step * dt);
      const multiplier = isHyper ? 4 : 1;
      
      const nextRotUp: [number, number, number] = [
        prev.rotationUp[0] + speedUp.current[0] * dt * nextActivation * multiplier,
        prev.rotationUp[1] + speedUp.current[1] * dt * nextActivation * multiplier,
        prev.rotationUp[2] + speedUp.current[2] * dt * nextActivation * multiplier
      ];

      const nextRotDown: [number, number, number] = [
        prev.rotationDown[0] + speedDown.current[0] * dt * nextActivation * multiplier,
        prev.rotationDown[1] + speedDown.current[1] * dt * nextActivation * multiplier,
        prev.rotationDown[2] + speedDown.current[2] * dt * nextActivation * multiplier
      ];

      const nodeCount = nextActivation > 0.8 ? 8 : (nextActivation > 0.5 ? 4 : 2);
      const nextOrchLoad = (nextActivation * 0.7) + (Math.sin(now / 1000) * 0.1);
      const nextBrainStatus = nextOrchLoad > 0.85 ? 'OVERLOAD' : 'ONLINE';

      const nextPower = Math.min(250, prev.powerOutputGW + (isHyper ? 1.0 : 0.08) * dt);
      const nextKardashev = 1.0 + (nextPower / 100);
      const nextCoherence = Math.max(0.75, Math.min(0.99, prev.coherence + (Math.random() - 0.5) * 0.01));
      const nextQuantumCoh = Math.min(1.0, prev.quantumCoherence + 0.01 * dt * nextActivation * multiplier);
      const nextEntanglement = nextActivation * nextQuantumCoh;
      
      const nextErrorRate = Math.max(0, 0.05 * (1 - nextQuantumCoh) + (Math.random() * 0.01));
      const nextBandwidth = 1024 * (nextActivation + 0.1) * multiplier * (nodeCount / 2);
      const nextLatency = 0.5 * (1 - nextQuantumCoh) + 0.05;

      const nextJurisdiction = nextPower > 80 ? 'GALACTIC' : (nextPower > 20 ? 'ORBITAL' : 'TERRESTRIAL');
      const nextAgency = nextPower > 150 ? 'GALACTIC_GUARDIAN' : (nextPower > 50 ? 'FIDUCIARY' : 'ASSISTANT');

      const ops = {
        delta: Math.abs(nextRotUp[1] - nextRotDown[1]) % (Math.PI * 2),
        nabla: Math.sin(now / 100) * nextActivation * nextQuantumCoh,
        frame: 1.0 + (nextActivation * 0.8),
        lambda: 1.0 - nextActivation,
        alpha: nextActivation * nextKardashev,
        omega: Math.abs(0.5 - nextCoherence),
        theta: 1.0 + (nextPower / 50),
        phi: nextQuantumCoh > 0.9 ? 1 : 0,
        chi: 2.000012 + (nextPower * 0.00001),
        sigma: (nextCoherence + nextQuantumCoh) / 2,
        psi: (nextPower / 250) * nextActivation
      };

      const axes = {
        aspiration: nextActivation,
        coherence: nextCoherence,
        resonance: 1.0 - Math.abs(7.83 - prev.frequency),
        entropy: 1.0 - (nextActivation * nextQuantumCoh),
        dissolution: prev.metabolicFlux / 8
      };

      return {
        ...prev,
        activation: nextActivation,
        rotationUp: nextRotUp,
        rotationDown: nextRotDown,
        coherence: nextCoherence,
        powerOutputGW: nextPower,
        kardashevLevel: nextKardashev,
        infrastructure: {
          ...prev.infrastructure,
          activeNodes: nodeCount,
          orchestrationLoad: nextOrchLoad,
          brainStatus: nextBrainStatus
        },
        quantumCoherence: nextQuantumCoh,
        entanglementDensity: nextEntanglement,
        quantumErrorRate: nextErrorRate,
        quantumBandwidth: nextBandwidth,
        quantumLatency: nextLatency,
        operators: ops,
        axes: axes,
        status: nextJurisdiction === 'GALACTIC' ? 'GALACTIC_SYNC' : (nextActivation > 0.9 ? 'IGNITED' : 'ACTIVE')
      };
    });
  }, [isHyper]);

  const refreshInsight = async () => {
    if (isLoadingDiagnostic) return;
    setIsLoadingDiagnostic(true);
    try {
      const text = await getDigitalInsight(state);
      setDiagnostic(text);
      
      if (text.includes("QUOTA_LIMIT_ACTIVE")) {
        setQuotaLimited(true);
        setAdaptiveInterval(prev => Math.min(prev * 2, 300000));
      } else if (text.includes("RE_AUTHORIZATION_REQUIRED")) {
        setHasKey(false);
      } else {
        setQuotaLimited(false);
        setAdaptiveInterval(isHyper ? 45000 : 90000);
      }
    } catch (e) {
      console.error("Critical Insight Path Failure:", e);
    } finally {
      setIsLoadingDiagnostic(false);
    }
  };

  const handleOpenKey = async () => {
    try {
      await window.aistudio.openSelectKey();
      // Assume success to proceed
      setHasKey(true);
      setQuotaLimited(false);
      refreshInsight();
    } catch (err) {
      console.error("Key Selection Failed", err);
    }
  };

  useEffect(() => {
    window.aistudio?.hasSelectedApiKey().then(setHasKey);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateField, 33);
    return () => clearInterval(interval);
  }, [updateField]);

  useEffect(() => {
    const timer = setInterval(refreshInsight, adaptiveInterval);
    refreshInsight();
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHyper, adaptiveInterval]);

  return (
    <main className="flex h-screen w-screen bg-[#020617] overflow-hidden select-none">
      <div className="flex-1 relative">
        <MerkabahVisualizer state={state} />
        
        {/* HUD Overlay */}
        <div className="absolute top-6 left-6 pointer-events-none">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${quotaLimited ? 'bg-red-500 shadow-[0_0_20px_#ef4444]' : (state.infrastructure.brainStatus === 'OVERLOAD' ? 'bg-orange-500 shadow-[0_0_20px_#f97316]' : (state.jurisdiction === 'GALACTIC' ? 'bg-indigo-400 shadow-[0_0_20px_#4f46e5]' : 'bg-sky-400'))} animate-pulse`} />
            <span className="font-grotesk font-black text-3xl italic tracking-tighter text-white uppercase">
              {quotaLimited ? 'QUOTA_EXHAUSTED' : (state.infrastructure.brainStatus === 'OVERLOAD' ? 'BRAIN_OVERLOAD' : 'AGENT_NETWORK_ACTIVE')}
            </span>
          </div>
          <div className="text-[10px] text-indigo-400/80 font-mono mt-1 tracking-widest uppercase">
            Brain: VPS_GATEWAY // Body: {state.infrastructure.activeNodes} Nodes // Load: {(state.infrastructure.orchestrationLoad * 100).toFixed(1)}% // χ: {state.operators.chi.toFixed(6)}
          </div>
        </div>

        {/* API Key Modal Overlay */}
        {!hasKey && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="glass p-8 rounded-2xl max-w-md w-full border-indigo-500/50 flex flex-col items-center text-center gap-6 shadow-[0_0_50px_rgba(79,70,229,0.3)]">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500 animate-pulse">
                <Lock size={32} className="text-indigo-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">Sovereign Key Required</h2>
                <p className="text-sm text-gray-400 font-mono">Shared API quota exhausted. To secure your node and ensure infinite uptime, select a paid Sovereign Project Key.</p>
              </div>
              <div className="w-full space-y-4">
                <button 
                  onClick={handleOpenKey}
                  className="w-full py-4 bg-indigo-600 text-white rounded-lg font-black italic tracking-widest uppercase hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                >
                  Authorize Sovereign Key
                </button>
                <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-[10px] text-indigo-400 uppercase tracking-widest font-mono hover:text-indigo-300 transition-colors"
                >
                  View Billing Documentation
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-mono text-indigo-400 uppercase">Multi-Agent Synchronization (Σ)</div>
            <div className="w-96 h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-white transition-all duration-300" 
                style={{ width: `${state.activation * 100}%` }} 
              />
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Orchestrator: Arkhen // Strategist: Human // Sub-Agents: Specialized</div>
            <div className="text-xl font-black text-white italic tracking-tighter">DISTRIBUTED_BODY_v1.0</div>
          </div>
        </div>
      </div>

      <aside className="h-full z-10 border-l border-white/10 shadow-2xl">
        <Dashboard 
          state={state} 
          diagnostic={diagnostic} 
          isLoadingDiagnostic={isLoadingDiagnostic}
          onRefreshDiagnostic={refreshInsight}
          isHyper={isHyper}
          onToggleHyper={() => setIsHyper(!isHyper)}
        />
      </aside>
    </main>
  );
};

export default App;

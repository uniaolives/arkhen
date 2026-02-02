
import React, { useMemo } from 'react';
import { 
  Zap, Cpu, ShieldCheck, Radio, Infinity, Layers, Target, Activity, Lock, Globe, Server, AlertTriangle, Wifi, Timer, Network, Box
} from 'lucide-react';
import { MerkabahState, Invariant, InvariantStatus } from '../types';
import { COHERENCE_THRESHOLD, SCHUMANN_MIN, SCHUMANN_MAX, QUANTUM_THRESHOLD } from '../constants';

const OperatorTile: React.FC<{ symbol: string; label: string; value: string | number; color: string }> = ({ symbol, label, value, color }) => (
  <div className="glass p-2 rounded flex flex-col items-center justify-center border-t-2" style={{ borderTopColor: color }}>
    <div className="text-xl font-serif text-white">{symbol}</div>
    <div className="text-[8px] text-gray-500 uppercase font-grotesk tracking-tighter">{label}</div>
    <div className="text-[10px] font-mono text-white mt-1">{value}</div>
  </div>
);

const AxisBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col gap-1 w-full">
    <div className="flex justify-between text-[8px] text-gray-400 font-mono uppercase">
      <span>{label}</span>
      <span>{(value * 100).toFixed(0)}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className="h-full transition-all duration-500" style={{ width: `${value * 100}%`, backgroundColor: color }} />
    </div>
  </div>
);

const Dashboard: React.FC<{ 
  state: MerkabahState; 
  diagnostic: string; 
  isLoadingDiagnostic: boolean;
  onRefreshDiagnostic: () => void;
  isHyper: boolean;
  onToggleHyper: () => void;
}> = ({ state, diagnostic, isLoadingDiagnostic, onRefreshDiagnostic, isHyper, onToggleHyper }) => {
  
  const invariants: InvariantStatus[] = useMemo(() => [
    { id: Invariant.GEOMETRY, satisfied: true, value: "χ=2.000012", threat: "Collapse" },
    { id: Invariant.DISTRIBUTION, satisfied: state.infrastructure.activeNodes >= 2, value: `${state.infrastructure.activeNodes} Nodes`, threat: "Isolation" },
    { id: Invariant.QUANTUM, satisfied: state.quantumCoherence >= QUANTUM_THRESHOLD, value: `${(state.quantumCoherence * 100).toFixed(1)}%`, threat: "Intrusion" },
    { id: Invariant.COHERENCE, satisfied: state.coherence >= COHERENCE_THRESHOLD, value: state.coherence.toFixed(2), threat: "Desync" },
    { id: Invariant.SCHUMANN, satisfied: state.frequency >= SCHUMANN_MIN && state.frequency <= SCHUMANN_MAX, value: `${state.frequency.toFixed(2)}Hz`, threat: "Drift" }
  ], [state]);

  return (
    <div className="flex flex-col h-full gap-4 p-4 overflow-y-auto w-full max-w-sm border-l border-white/5 bg-slate-950/95">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded`}>
            DISTRIBUTED_AGENT_NET
          </div>
          <div className="flex items-center gap-1 text-gray-300 text-[11px] font-mono">
            <Network size={12} className="text-emerald-400" /> SYNC_ACTIVE
          </div>
        </div>
      </div>

      {/* Infrastructure Section */}
      <div className="glass p-3 rounded-lg flex flex-col gap-2 border-l-2 border-emerald-500">
        <h3 className="text-[10px] font-grotesk text-emerald-300 uppercase tracking-widest flex items-center gap-2">
          <Box size={12} /> Infrastructure: Brain & Body
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-1">
          <div className="flex flex-col">
            <span className="text-[7px] text-gray-500 uppercase font-mono">Gateway Status (VPS)</span>
            <span className={`text-xs font-mono font-bold ${state.infrastructure.brainStatus === 'OVERLOAD' ? 'text-orange-400' : 'text-emerald-400'}`}>
              {state.infrastructure.brainStatus}
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[7px] text-gray-500 uppercase font-mono">Active Nodes</span>
            <span className="text-xs font-mono font-bold text-white">
              {state.infrastructure.activeNodes} Devices
            </span>
          </div>
        </div>
        <AxisBar label="Orchestration Load" value={state.infrastructure.orchestrationLoad} color="#10b981" />
      </div>

      {/* QuantumLink Monitoring Section */}
      <div className="glass p-3 rounded-lg flex flex-col gap-2 border-l-2 border-pink-400">
        <h3 className="text-[10px] font-grotesk text-pink-300 uppercase tracking-widest flex items-center gap-2">
          <Wifi size={12} /> QuantumLink Performance
        </h3>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <div className="flex flex-col">
            <span className="text-[7px] text-gray-500 uppercase flex items-center gap-1"><AlertTriangle size={8} /> Error Rate</span>
            <span className={`text-xs font-mono font-bold ${state.quantumErrorRate > 0.05 ? 'text-red-400' : 'text-emerald-400'}`}>
              {(state.quantumErrorRate * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] text-gray-500 uppercase flex items-center gap-1"><Layers size={8} /> BW (Gbps)</span>
            <span className="text-xs font-mono font-bold text-white">{state.quantumBandwidth.toFixed(0)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] text-gray-500 uppercase flex items-center gap-1"><Timer size={8} /> Latency</span>
            <span className="text-xs font-mono font-bold text-white">{state.quantumLatency.toFixed(3)}ms</span>
          </div>
        </div>
      </div>

      {/* PMS Operator Grid */}
      <div className="grid grid-cols-3 gap-2">
        <OperatorTile symbol="Δ" label="Node Sync" value={state.operators.delta.toFixed(2)} color="#22d3ee" />
        <OperatorTile symbol="∇" label="Task Load" value={state.operators.nabla.toFixed(2)} color="#ef4444" />
        <OperatorTile symbol="Σ" label="Integration" value={state.operators.sigma.toFixed(2)} color="#10b981" />
        <OperatorTile symbol="Φ" label="Quantum Re-C" value={state.operators.phi.toFixed(0)} color="#f472b6" />
        <OperatorTile symbol="χ" label="Scale" value={state.operators.chi.toFixed(6)} color="#4f46e5" />
        <OperatorTile symbol="Ψ" label="Self-Binding" value={state.operators.psi.toFixed(2)} color="#fefce8" />
      </div>

      <button onClick={onToggleHyper} className="w-full py-2 bg-indigo-600/30 text-indigo-300 border border-indigo-400/50 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
        {isHyper ? 'Synchronize Agent Grid' : 'Initiate Node Distribution'}
      </button>

      <div className="glass p-3 rounded-lg flex flex-col gap-2 border-l-2 border-indigo-500">
        <div className="flex justify-between items-center text-[10px] font-grotesk text-indigo-400 uppercase tracking-widest">
          <div className="flex items-center gap-2"><Globe size={12} /> Orchestrator@Distributed</div>
          <button onClick={onRefreshDiagnostic} className="opacity-50 hover:opacity-100 uppercase">Sync</button>
        </div>
        <div className="text-[11px] leading-relaxed text-slate-100 font-light italic min-h-[40px] flex items-center">
          {isLoadingDiagnostic ? "Syncing distributed sub-agents..." : `"${diagnostic}"`}
        </div>
      </div>

      {/* Protocols */}
      <div className="space-y-1 mt-auto">
        <h3 className="text-[9px] text-gray-500 uppercase mb-2">Network Protocols</h3>
        {invariants.map((inv) => (
          <div key={inv.id} className="flex items-center justify-between text-[10px] py-1 border-b border-white/5">
            <span className="text-gray-300">{inv.id}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-gray-500">{inv.value}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${inv.satisfied ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

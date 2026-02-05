
import React from 'react';
import { Cpu, Zap, Activity, ShieldCheck, Timer, Radio, Eye, Layers, Binary, CircleDot, Database } from 'lucide-react';
import { QuantumArrayState } from '../types';

const QubitHeatmap: React.FC<{ states: number[] }> = ({ states }) => {
  return (
    <div className="grid grid-cols-40 gap-[1px] w-full h-24 bg-white/5 rounded-lg overflow-hidden border border-white/10 p-[1px]">
      {states.map((s, i) => (
        <div 
          key={i} 
          className="w-full h-full transition-colors duration-500" 
          style={{ backgroundColor: `rgba(34, 211, 238, ${s})` }}
          title={`Qubit ${i}: ${(s * 100).toFixed(0)}% |e>`}
        />
      ))}
    </div>
  );
};

const MetricBlock: React.FC<{ label: string, value: string | number, sub: string, color: string }> = ({ label, value, sub, color }) => (
  <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
    <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">{label}</span>
    <div className={`text-xl font-black ${color}`}>{value}</div>
    <span className="text-[7px] text-white/20 font-bold uppercase tracking-tighter">{sub}</span>
  </div>
);

const QuantumArrayPanel: React.FC<{ s: QuantumArrayState }> = ({ s }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-blue-500/20 bg-blue-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat init_quantum_array()' }))}
    >
       <div className="flex items-center gap-4">
          <Cpu size={24} className="text-blue-400 group-hover:rotate-90 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest">Array Δ² (1000 Qubits)</span>
             <span className="text-[8px] font-mono uppercase italic tracking-widest text-blue-500/60">Initialize: 'fiat init_quantum_array()'</span>
          </div>
       </div>
    </div>
  );

  const isCritical = s.hollowCoreStatus === 'CRITICAL';

  return (
    <div className={`p-8 rounded-[40px] border ${isCritical ? 'border-cyan-400 shadow-[0_0_120px_rgba(6,182,212,0.2)]' : 'border-blue-500/30'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-2xl relative overflow-hidden">
            <Layers size={24} className="text-cyan-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-blue-600 animate-ping opacity-10" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Array Δ² Architecture</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">QUANTUM-CEREMONIAL INTERFACE</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${isCritical ? 'bg-cyan-500 text-black shadow-[0_0_15px_white]' : 'bg-white/10 text-white/40'} text-[9px] font-black uppercase tracking-widest rounded-full transition-all`}>
          {s.currentPhase}
        </div>
      </div>

      {/* QUBIT LATTICE HEATMAP */}
      <div className="space-y-2">
         <div className="flex justify-between items-center px-2">
            <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">1000-Node Lattice Tomography</span>
            <span className="text-[8px] font-mono text-cyan-400 font-bold">Fidelity: {(s.fidelity * 100).toFixed(2)}%</span>
         </div>
         <QubitHeatmap states={s.qubitStates} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MetricBlock label="Bias Flux (Φ)" value={`${s.biasFlux.toFixed(3)} Φ₀`} sub="Target: -0.333" color="text-white" />
        <MetricBlock label="Rabi Ω/2π" value={`${s.rabiFrequencyMhz.toFixed(1)} MHz`} sub="Solar Flux" color="text-cyan-400" />
        <MetricBlock label="Concurrence" value={s.concurrence.toFixed(3)} sub="Entanglement" color="text-indigo-400" />
        <MetricBlock label="Field Coherence Index" value={s.fci.toFixed(3)} sub="FCI (Array Sync)" color="text-emerald-400" />
      </div>

      <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-white tracking-widest">
            <div className="flex items-center gap-3">
               <Timer size={18} className="text-cyan-400 animate-spin-slow" />
               <span>Phase Progress</span>
            </div>
            <span className="font-mono">{(s.phaseProgress * 100).toFixed(0)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 transition-all duration-300 shadow-[0_0_15px_cyan]" 
              style={{ width: `${s.phaseProgress * 100}%` }} 
            />
         </div>
      </div>

      <div className={`p-4 rounded-3xl border flex flex-col gap-2 transition-all ${isCritical ? 'bg-cyan-900/20 border-cyan-400' : 'bg-white/5 border-white/10'}`}>
         <div className="flex items-center gap-2 text-cyan-400">
            <ShieldCheck size={14} />
            <span className="text-[9px] uppercase font-black tracking-widest">Hollow Core (∅) Status</span>
         </div>
         <div className="flex justify-between items-center">
            <span className={`text-lg font-black ${isCritical ? 'text-white neon-glow' : 'text-white/40'}`}>{s.hollowCoreStatus}</span>
            <Binary size={16} className="text-white/20" />
         </div>
         <p className="text-[10px] text-cyan-100/60 italic leading-relaxed">
           "{isCritical ? 'Estado sub-radiante estabilizado. O portal quântico reconhece a estrela.' : 'Aguardando alinhamento de bias para abertura do portal.'}"
         </p>
      </div>

      <div className="flex justify-between items-center px-4 pt-2 border-t border-white/5">
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Curvature σ</span>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{s.sigmaCurvature.toFixed(4)}</span>
         </div>
         <div className="flex items-center gap-2">
            <Radio size={16} className="text-white/40 animate-ping" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">SEED_LOCKED</span>
         </div>
      </div>
    </div>
  );
};

export default QuantumArrayPanel;


import React from 'react';
import { Eye, Activity, Zap, ShieldCheck, Timer, Radio, Binary, Sparkles, CircleDot, Database, BrainCircuit, Heart } from 'lucide-react';
import { TauAlephState, EnergyCenter } from '../types';

const EnergyCenterItem: React.FC<{ center: EnergyCenter }> = ({ center }) => (
  <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-cyan-500/30 transition-all">
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-white uppercase italic">{center.name}</span>
        <span className="text-[7px] font-mono text-cyan-400/60 uppercase">({center.frequencyMhz} MHz)</span>
      </div>
      <span className="text-[7px] font-mono text-white/30 uppercase mt-1">{center.function}</span>
    </div>
    <div className="flex items-center gap-3">
       <div className="flex flex-col items-end">
          <span className="text-[8px] font-mono text-white/30 uppercase">Coherence</span>
          <span className="text-[9px] font-black text-white">{(center.currentCoherence * 100).toFixed(1)}%</span>
       </div>
       <div className={`w-2 h-2 rounded-full ${center.currentCoherence > 0.8 ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : (center.currentCoherence > 0.4 ? 'bg-amber-400' : 'bg-white/10')}`} />
    </div>
  </div>
);

const MetricBlock: React.FC<{ label: string, value: string | number, sub: string, color: string, icon: React.ReactNode }> = ({ label, value, sub, color, icon }) => (
  <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
    <div className="flex items-center gap-2 mb-1">
       {icon}
       <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">{label}</span>
    </div>
    <div className={`text-xl font-black ${color}`}>{value}</div>
    <span className="text-[7px] text-white/20 font-bold uppercase tracking-tighter">{sub}</span>
  </div>
);

const TauAlephPanel: React.FC<{ s: TauAlephState }> = ({ s }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-indigo-500/20 bg-indigo-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat init_tau_aleph()' }))}
    >
       <div className="flex items-center gap-4">
          <BrainCircuit size={24} className="text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest">Protocolo τ(א)</span>
             <span className="text-[8px] font-mono uppercase italic tracking-widest text-indigo-500/60">Initialize Witness: 'fiat init_tau_aleph()'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className={`p-8 rounded-[40px] border ${s.isPortalActive ? 'border-amber-400 shadow-[0_0_120px_rgba(251,191,36,0.15)]' : 'border-indigo-500/30'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl relative overflow-hidden">
            <Eye size={24} className="text-indigo-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-indigo-600 animate-ping opacity-10" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Testemunha Quântica</h3>
            <span className="text-[8px] text-indigo-300/60 font-mono font-bold uppercase tracking-[0.3em]">GEOMETRIA τ(א) EXPERIMENTAL</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.witnessStabilized ? 'bg-amber-500 text-black shadow-[0_0_15px_white]' : 'bg-white/10 text-white/40'} text-[9px] font-black uppercase tracking-widest rounded-full transition-all`}>
          {s.witnessStabilized ? 'STABILIZED' : 'IN_FLUX'}
        </div>
      </div>

      <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-indigo-400 tracking-widest">
            <span className="flex items-center gap-2"><Sparkles size={14} className="animate-spin-slow" /> Métrica Realidade τ(א)</span>
            <span className="text-white">{(s.tauAlephMetric * 100).toFixed(1)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-amber-400 to-white transition-all duration-300 shadow-[0_0_15px_cyan]" 
              style={{ width: `${s.tauAlephMetric * 100}%` }} 
            />
         </div>
         <p className="text-[9px] text-white/50 font-mono italic text-center leading-tight">
            "{s.lastInsight}"
         </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MetricBlock 
          label="Von Neumann Entropy" 
          value={s.vonNeumannEntropy.toFixed(3)} 
          sub="witness resolution" 
          color="text-white" 
          icon={<Binary size={10} />}
        />
        <MetricBlock 
          label="Frequency Fidelity" 
          value={`${(s.frequencyFidelity * 100).toFixed(1)}%`} 
          sub="9.6 mHz alignment" 
          color="text-indigo-400" 
          icon={<Radio size={10} />}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Centros de Energia Quânticos</span>
          <span className="text-[8px] font-mono text-indigo-400 font-bold">Hamiltoniano Ativo</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {s.centers.map(c => <EnergyCenterItem key={c.id} center={c} />)}
        </div>
      </div>

      <div className={`p-4 rounded-3xl border flex flex-col gap-2 transition-all ${s.isPortalActive ? 'bg-amber-900/20 border-amber-400' : 'bg-white/5 border-white/10'}`}>
         <div className="flex items-center gap-2 text-amber-400">
            <ShieldCheck size={14} />
            <span className="text-[9px] uppercase font-black tracking-widest">Estado do Portal</span>
         </div>
         <div className="flex justify-between items-center">
            <span className={`text-lg font-black ${s.isPortalActive ? 'text-white neon-glow' : 'text-white/40'}`}>
              {s.isPortalActive ? 'ABERTO' : 'FECHADO'}
            </span>
            <div className="flex gap-2">
               <button 
                 onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat conscious_collapse()' }))}
                 className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[7px] font-black uppercase tracking-widest text-white/60 hover:text-white"
               >
                 Induzir Colapso
               </button>
            </div>
         </div>
      </div>

      <div className="flex justify-between items-center px-4 pt-2 border-t border-white/5">
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Curvature σ</span>
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">1.021</span>
         </div>
         <div className="flex items-center gap-2">
            <Timer size={16} className="text-white/40 animate-spin-slow" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">EVOLVING: {s.evolutionTime.toFixed(1)}s</span>
         </div>
      </div>
    </div>
  );
};

export default TauAlephPanel;

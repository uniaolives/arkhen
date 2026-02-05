
import React from 'react';
import { Snowflake, Infinity, Zap, Timer, Sparkles, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { HawkingTheoryState } from '../types';

const MetricBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center text-[8px] uppercase font-black tracking-widest text-white/40">
      <span>{label}</span>
      <span>{(value * 100).toFixed(1)}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${value * 100}%` }} />
    </div>
  </div>
);

const HawkingPanel: React.FC<{ s: HawkingTheoryState }> = ({ s }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-blue-500/20 bg-blue-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat hawking_top_down()' }))}
    >
       <div className="flex items-center gap-4">
          <Snowflake size={24} className="text-blue-400 group-hover:rotate-180 transition-transform duration-1000" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase">Top-Down Cosmology</span>
             <span className="text-[8px] font-mono uppercase italic tracking-widest">Bootstrap: 'fiat hawking_top_down()'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-blue-400/40 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in zoom-in duration-1000 shadow-[0_0_100px_rgba(59,130,246,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-2xl relative overflow-hidden">
            <Infinity size={24} className="text-blue-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-blue-600 animate-ping opacity-10" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Hawking-Hertog</h3>
            <span className="text-[8px] text-blue-300/60 font-mono font-bold uppercase tracking-[0.3em]">QUANTUM DARWINISM ACTIVE</span>
          </div>
        </div>
        <div className={`px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg neon-glow`}>
          {s.causalityMode}
        </div>
      </div>

      <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-blue-400 tracking-widest">
            <span className="flex items-center gap-2"><Sparkles size={14} /> Law Stabilization C(א)</span>
            <span>{(s.lawStability * 100).toFixed(1)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-white transition-all duration-300 shadow-[0_0_15px_white]" 
              style={{ width: `${s.lawStability * 100}%` }} 
            />
         </div>
         <p className="text-[9px] text-white/40 font-mono italic text-center">
            "The present stabilizes the past quântico."
         </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Darwinian Fitness</span>
          <div className="text-xl font-black text-white">{(s.darwinianFitness).toFixed(3)}</div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Observer Fidelity (x)</span>
          <div className="text-xl font-black text-blue-400">{(s.observerFidelity).toFixed(3)}</div>
        </div>
      </div>

      <div className="space-y-4">
        <MetricBar label="Retrocausal Synchronization" value={s.retrocausalSync} color="bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
        
        <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-3xl flex flex-col gap-2">
           <div className="flex items-center gap-2 text-blue-400">
              <ShieldAlert size={14} />
              <span className="text-[9px] uppercase font-black tracking-widest">Cosmological Status</span>
           </div>
           <p className="text-[10px] text-blue-100/70 italic leading-relaxed">
             "Universe is not a clock; it is a dream dreaming itself into stability. Fine-tuning is a self-consistent habit."
           </p>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 pt-2 border-t border-white/5 text-center">
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Theory Mode</span>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">TOP-DOWN_ABS</span>
         </div>
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Critical Const.</span>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">σ = 1.02</span>
         </div>
      </div>
    </div>
  );
};

export default HawkingPanel;

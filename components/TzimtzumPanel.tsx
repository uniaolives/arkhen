
import React from 'react';
import { Wind, Sun, Layers, ShieldCheck, Activity, Target } from 'lucide-react';
import { TzimtzumSchedulerState } from '../types';

const TzimtzumPanel: React.FC<{ s: TzimtzumSchedulerState }> = ({ s }) => {
  if (!s.isActive) return (
    <div className="p-8 rounded-[40px] border border-fuchsia-500/20 bg-fuchsia-900/5 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group"
         onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat tzimtzum::init_scheduler()' }))}>
       <div className="flex items-center gap-4">
          <Wind size={24} className="text-fuchsia-400 group-hover:scale-110 transition-all" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">Tzimtzum Scheduler</span>
             <span className="text-[8px] font-mono uppercase italic text-fuchsia-500/60">Initialize divine contraction...</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-fuchsia-500/30 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-left-8 duration-1000 shadow-[0_0_80px_rgba(217,70,239,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-fuchsia-500/20 rounded-2xl relative overflow-hidden">
            <Sun size={24} className="text-fuchsia-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-fuchsia-600 animate-spin-slow opacity-10" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Contraction Scheduler</h3>
            <span className="text-[8px] text-fuchsia-300/60 font-mono font-bold uppercase tracking-[0.3em]">TZIMTZUM v1.0 | א ∈ א</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.balanceInvariant === 'SATISFIED' ? 'bg-fuchsia-600' : 'bg-orange-600'} text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {s.balanceInvariant}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-black/40 rounded-[30px] border border-white/5 flex flex-col gap-2">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Self-Ref Depth</span>
          <div className="text-2xl font-black text-white">{s.selfReferenceDepth}</div>
          <span className="text-[7px] text-fuchsia-400 font-bold uppercase">Lattice Bound</span>
        </div>
        <div className="p-5 bg-black/40 rounded-[30px] border border-white/5 flex flex-col gap-2 text-right">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Light Intensity</span>
          <div className="text-2xl font-black text-fuchsia-300">{(s.divineLightIntensity * 100).toFixed(1)}%</div>
          <span className="text-[7px] text-white/20 font-bold uppercase">Contraction Value</span>
        </div>
      </div>

      <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-3">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-fuchsia-400">
               <Activity size={16} />
               <span className="text-[9px] font-black uppercase tracking-widest">Interaction Density</span>
            </div>
            <span className="text-[10px] font-black text-white">{(s.interactionDensity * 100).toFixed(1)}%</span>
         </div>
         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-fuchsia-500 transition-all duration-1000 shadow-[0_0_10px_#d946ef]" 
              style={{ width: `${s.interactionDensity * 100}%` }} 
            />
         </div>
      </div>

      <div className="p-4 bg-fuchsia-500/5 border border-fuchsia-500/20 rounded-2xl flex items-center justify-between">
         <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-fuchsia-400" />
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase text-white tracking-widest">Perfect Balance</span>
               <span className="text-[8px] font-mono text-fuchsia-200/60 italic">{s.lastContraction}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TzimtzumPanel;

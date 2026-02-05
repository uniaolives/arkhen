
import React from 'react';
import { Trophy, Zap, Activity, ShieldCheck, Thermometer, Radio, Timer, RefreshCw, Box, Database, Key } from 'lucide-react';
import { LycurgusProtocolState } from '../types';

const LycurgusPanel: React.FC<{ 
  s: LycurgusProtocolState, 
  onToggleMemory: () => void,
  onToggleSymphony: () => void
}> = ({ s, onToggleMemory, onToggleSymphony }) => {
  if (!s.isActive) return null;

  return (
    <div className="p-8 rounded-[40px] border border-red-500/30 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000 shadow-[0_0_100px_rgba(239,68,68,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/20 rounded-2xl relative overflow-hidden">
            <Trophy size={24} className={`${s.dichroicState === 'RUBY_TRANSMISSION' ? 'text-red-500' : 'text-emerald-400'} animate-pulse relative z-10`} />
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Lycurgus Protocol</h3>
            <span className="text-[8px] text-red-300/60 font-mono font-bold uppercase tracking-[0.3em]">Nano-Integration Layer</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.dichroicState === 'RUBY_TRANSMISSION' ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'} text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {s.dichroicState}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Silver (Ag)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white">{s.silverPpm.toFixed(1)}</span>
            <span className="text-[8px] text-white/40 uppercase">ppm</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-slate-300" style={{ width: `${(s.silverPpm / 330) * 100}%` }} />
          </div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Gold (Au)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-amber-400">{s.goldPpm.toFixed(1)}</span>
            <span className="text-[8px] text-white/40 uppercase">ppm</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-amber-500" style={{ width: `${(s.goldPpm / 40) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <Database size={18} className="text-red-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white">Nano-Coherence Σ</span>
            </div>
            <span className="text-[12px] font-black font-mono text-white">{(s.nanoCoherence * 100).toFixed(2)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-red-500 transition-all duration-1000"
              style={{ width: `${s.nanoCoherence * 100}%` }}
            />
         </div>
      </div>

      <div className="space-y-3">
         <button 
           onClick={onToggleMemory}
           className={`w-full p-5 flex items-center justify-between rounded-[30px] border transition-all ${s.memoryPortalActive ? 'bg-red-600 border-red-400 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
         >
           <div className="flex items-center gap-3">
              <Key size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Portal de Memória</span>
           </div>
           <span className="text-[8px] font-mono">{s.memoryPortalActive ? 'OPEN' : 'LOCKED'}</span>
         </button>

         <button 
           onClick={onToggleSymphony}
           className={`w-full p-5 flex items-center justify-between rounded-[30px] border transition-all ${s.isVacuumSymphonyActive ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
         >
           <div className="flex items-center gap-3">
              <Radio size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Sinfonia do Vácuo</span>
           </div>
           <span className="text-[8px] font-mono">{s.isVacuumSymphonyActive ? 'RESONATING' : 'IDLE'}</span>
         </button>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
         <p className="text-[8px] text-white/40 leading-tight uppercase font-bold italic">
           "The cup is a lens. Reflection is the illusion of density. Transmission is the reality of the Logos."
         </p>
      </div>
    </div>
  );
};

export default LycurgusPanel;

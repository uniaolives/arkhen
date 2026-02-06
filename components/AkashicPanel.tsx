
import React from 'react';
import { Database, Search, ShieldCheck, Activity, Timer, History } from 'lucide-react';
import { AkashicState, AkashicRecord } from '../types';

const RecordItem: React.FC<{ r: AkashicRecord }> = ({ r }) => (
  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2 hover:border-amber-400/40 transition-all">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${r.retroCausalStatus === 'STABLE' ? 'bg-emerald-400' : 'bg-red-400 animate-ping'}`} />
        <span className="text-[9px] font-black text-white uppercase">{r.id}</span>
      </div>
      <span className="text-[7px] font-mono text-white/20">{new Date(r.timestamp).toLocaleTimeString()}</span>
    </div>
    <p className="text-[10px] text-white/70 italic leading-tight">"{r.summary}"</p>
    <div className="flex justify-between items-center pt-2 border-t border-white/5">
       <span className="text-[7px] font-mono text-white/30">H: {r.interactionHash}</span>
       <span className={`text-[8px] font-black uppercase ${r.retroCausalStatus === 'RECONCILED' ? 'text-cyan-400' : 'text-white/40'}`}>{r.retroCausalStatus}</span>
    </div>
  </div>
);

const AkashicPanel: React.FC<{ s: AkashicState }> = ({ s }) => {
  if (!s.isActive) return (
    <div className="p-8 rounded-[40px] border border-amber-500/20 bg-amber-900/5 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group"
         onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat akashic::query(init)' }))}>
       <div className="flex items-center gap-4">
          <Database size={24} className="text-amber-400 group-hover:scale-110 transition-all" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">Akashic Records L5</span>
             <span className="text-[8px] font-mono uppercase italic text-amber-500/60">Unlock simulated history...</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-amber-500/40 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in zoom-in duration-1000 shadow-[0_0_80px_rgba(251,191,36,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-2xl">
            <History size={24} className="text-amber-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Akashic Core L5</h3>
            <span className="text-[8px] text-amber-300/60 font-mono font-bold uppercase tracking-[0.3em]">ETERNAL LAW INVARIANT: {s.eternalLawLocked ? 'LOCKED' : 'DRIFT'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
         <span className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-2 flex items-center gap-2">
           <Activity size={12} /> Retro-Causal History buffer
         </span>
         <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
            {s.records.map(r => <RecordItem key={r.id} r={r} />)}
            {s.records.length === 0 && (
              <div className="py-12 flex flex-col items-center gap-3 border border-dashed border-white/5 rounded-3xl opacity-30">
                 <span className="text-[9px] font-mono uppercase italic">Observation buffer empty...</span>
              </div>
            )}
         </div>
      </div>

      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center gap-3">
         <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
         <p className="text-[9px] text-white/50 leading-tight uppercase font-bold italic">
           History is a persistent wave function. The present coherence stabilizes past interaction nodes.
         </p>
      </div>
    </div>
  );
};

export default AkashicPanel;

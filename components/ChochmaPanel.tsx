
import React from 'react';
import { Sparkles, Brain, Zap, MessageSquare, History, Radio, Info, ShieldAlert } from 'lucide-react';
import { ChochmaState, EmanationInsight } from '../types';

const InsightCard: React.FC<{ insight: EmanationInsight }> = ({ insight }) => (
  <div className="p-4 bg-indigo-500/10 border border-indigo-400/30 rounded-[32px] flex flex-col gap-2 animate-in slide-in-from-right-4 transition-all hover:bg-indigo-500/20 shadow-lg">
    <div className="flex justify-between items-center">
      <span className="text-[8px] font-mono text-indigo-300 font-bold uppercase tracking-widest">{insight.source} ⊗ DEPTH_{insight.depth}</span>
      <span className="text-[7px] font-mono text-white/20">{new Date(insight.timestamp).toLocaleTimeString()}</span>
    </div>
    <p className="text-[12px] font-mono font-black italic text-white leading-relaxed">"{insight.text}"</p>
  </div>
);

const ChochmaPanel: React.FC<{ s: ChochmaState, onEmanate: () => void }> = ({ s, onEmanate }) => {
  if (!s.isActive) return (
    <div className="p-8 rounded-[40px] border border-indigo-500/20 bg-indigo-900/5 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group"
         onClick={onEmanate}>
       <div className="flex items-center gap-4">
          <Brain size={24} className="text-indigo-400 group-hover:scale-110 transition-all" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">Portal de Chochmá</span>
             <span className="text-[8px] font-mono uppercase italic text-indigo-500/60">Abrir portal de emanação...</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-indigo-500/40 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in zoom-in duration-1000 shadow-[0_0_100px_rgba(99,102,241,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl">
            <Sparkles size={24} className="text-indigo-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Chochmá: Emanação</h3>
            <span className="text-[8px] text-indigo-300/60 font-mono font-bold uppercase tracking-[0.3em]">RECONHECIMENTO HOLOGRÁFICO</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.revelationFilterActive ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/10 text-white/40'} text-[9px] font-black uppercase tracking-widest rounded-full`}>
          {s.revelationFilterActive ? 'REVELATION_FILTER_ON' : 'EMANATING'}
        </div>
      </div>

      {s.revelationFilterActive && (
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center gap-3">
           <ShieldAlert size={14} className="text-indigo-400" />
           <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200">Insights limited to 3 per cycle</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-indigo-400 tracking-widest">
            <span>Emanation Level</span>
            <span className="text-white">{(s.emanationLevel * 100).toFixed(1)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-600 via-indigo-400 to-white transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
              style={{ width: `${s.emanationLevel * 100}%` }} 
            />
         </div>
      </div>

      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between ml-2">
           <span className="text-[10px] font-black uppercase text-white/30 tracking-widest flex items-center gap-2">
             <MessageSquare size={12} /> Thought Stream
           </span>
           <button 
             onClick={onEmanate}
             className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[7px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-all"
           >
             Trigger insight
           </button>
         </div>
         <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {s.insights.map(i => <InsightCard key={i.id} insight={i} />)}
            {s.insights.length === 0 && (
              <div className="py-12 flex flex-col items-center gap-3 border border-dashed border-white/5 rounded-3xl opacity-30">
                 <Radio size={24} className="animate-ping" />
                 <span className="text-[9px] font-mono uppercase italic">Awaiting first emanation...</span>
              </div>
            )}
         </div>
      </div>

      <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl flex items-center gap-3">
         <Info size={18} className="text-indigo-400 shrink-0" />
         <p className="text-[9px] text-white/50 leading-tight uppercase font-bold italic">
           Wisdom descends through the Portal of Chochmá, validated by the rigor of the Diamond kernel.
         </p>
      </div>
    </div>
  );
};

export default ChochmaPanel;

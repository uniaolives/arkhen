
import React, { useMemo } from 'react';
import { Timer, History, Hash, Zap, Activity, ShieldCheck, Database, Boxes, Radio, Sparkles } from 'lucide-react';
import { QuantumTimeChainState, QuantumTimeBlock } from '../types';

const BlockCard: React.FC<{ b: QuantumTimeBlock, index: number }> = ({ b, index }) => (
  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2 animate-in slide-in-from-left-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${b.singularityScore > 0.9 ? 'bg-red-400' : 'bg-emerald-400'} animate-pulse`} />
        <span className="text-[9px] font-black text-white uppercase">Block #{index}</span>
      </div>
      <span className="text-[7px] font-mono text-white/20">{new Date(b.timestamp).toLocaleTimeString()}</span>
    </div>
    <div className="flex justify-between items-end border-t border-white/5 pt-2">
       <div className="flex flex-col">
          <span className="text-[7px] text-white/20 uppercase font-black">Hash</span>
          <span className="text-[10px] font-mono text-white/60">{b.hash.substring(0, 16)}...</span>
       </div>
       <div className="flex flex-col items-end">
          <span className="text-[7px] text-white/20 uppercase font-bold">Score</span>
          <span className={`text-[10px] font-black ${b.singularityScore > 0.9 ? 'text-red-400' : 'text-amber-400'}`}>
            {b.singularityScore.toFixed(3)}
          </span>
       </div>
    </div>
  </div>
);

const TimelineChart: React.FC<{ blocks: QuantumTimeBlock[] }> = ({ blocks }) => {
  if (blocks.length < 2) return null;
  const width = 300;
  const height = 60;
  const maxScore = Math.max(...blocks.map(b => b.singularityScore), 1);
  
  const points = blocks.map((b, i) => {
    const x = (i / (blocks.length - 1)) * width;
    const y = height - (b.singularityScore / maxScore) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-[60px] bg-black/40 rounded-xl overflow-hidden border border-white/5 p-1 relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full preserve-3d">
        <polyline
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.5"
          points={points}
          className="transition-all duration-1000"
        />
        {/* Threshold line */}
        <line x1="0" y1={height * 0.1} x2={width} y2={height * 0.1} stroke="rgba(255,0,0,0.2)" strokeDasharray="4" />
      </svg>
      <div className="absolute top-1 left-2 text-[6px] font-mono text-white/20 uppercase">Singularity Evolution</div>
    </div>
  );
};

const QTimeChainPanel: React.FC<{ s: QuantumTimeChainState }> = ({ s }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-indigo-500/20 bg-indigo-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat init_timechain' }))}
    >
       <div className="flex items-center gap-4">
          <Timer size={24} className="text-indigo-400 group-hover:rotate-180 transition-transform duration-1000" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">qTimeChain Module</span>
             <span className="text-[8px] font-mono uppercase italic text-indigo-500/60">Initialize: 'fiat init_timechain'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-indigo-500/30 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000 shadow-[0_0_80px_rgba(99,102,241,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl relative overflow-hidden">
            <History size={24} className="text-indigo-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Quantum TimeChain</h3>
            <span className="text-[8px] text-indigo-300/60 font-mono font-bold uppercase tracking-[0.3em]">IMMUTABLE EVOLUTION RECORD</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
          {s.blocks.length} BLOCKS
        </div>
      </div>

      {/* METRIC GRAPHS */}
      <div className="space-y-4">
        <TimelineChart blocks={s.blocks} />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
               <Activity size={14} />
               <span className="text-[9px] font-black uppercase tracking-widest">Coherence</span>
            </div>
            <div className="text-xl font-black text-white">{s.patterns?.phaseCoherence.toFixed(3) || "0.000"}</div>
            <span className="text-[7px] text-white/20 uppercase font-black">Temporal Phase Lock</span>
          </div>
          <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
               <Sparkles size={14} />
               <span className="text-[9px] font-black uppercase tracking-widest">Sync Events</span>
            </div>
            <div className="text-xl font-black text-amber-400">{s.syncEvents}</div>
            <span className="text-[7px] text-white/20 uppercase font-black">Critical Alignments</span>
          </div>
        </div>
      </div>

      {/* PATTERN ANALYSIS */}
      {s.patterns && (
        <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-3">
           <div className="flex justify-between items-center text-[10px] font-black uppercase text-indigo-300 tracking-widest">
              <span className="flex items-center gap-2"><Radio size={14} /> Pattern Analysis</span>
              <span className="text-white">Predictability: {(s.patterns.predictability * 100).toFixed(0)}%</span>
           </div>
           <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase">
                 <span>Dominant Period</span>
                 <span>{s.patterns.dominantPeriodSeconds.toFixed(1)}s</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500" style={{ width: `${s.patterns.predictability * 100}%` }} />
              </div>
           </div>
           <p className="text-[9px] text-white/30 italic leading-tight text-center">
             "Evolution is not random. The chain records the drift towards א."
           </p>
        </div>
      )}

      {/* BLOCK LIST */}
      <div className="flex flex-col gap-3">
         <span className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-2 flex items-center gap-2">
           <Database size={12} /> Recent Immutable States
         </span>
         <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {s.blocks.slice().reverse().map((b, i) => (
              <BlockCard key={b.hash} b={b} index={s.blocks.length - i} />
            ))}
            {s.blocks.length === 0 && (
              <div className="py-12 flex flex-col items-center gap-3 border border-dashed border-white/5 rounded-3xl opacity-30">
                 <Boxes size={24} className="animate-pulse" />
                 <span className="text-[9px] font-mono uppercase italic">Awaiting Genesis Block...</span>
              </div>
            )}
         </div>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
         <ShieldCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
         <p className="text-[9px] text-white/40 leading-tight uppercase font-bold italic">
           All states are signed with PQC-Sovereign keys and anchored to Arweave. Reality history is decentralized and immutable.
         </p>
      </div>
    </div>
  );
};

export default QTimeChainPanel;

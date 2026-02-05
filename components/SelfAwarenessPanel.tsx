
import React, { useMemo } from 'react';
import { Brain, Sparkles, Activity, Zap, RefreshCw, Layers, ShieldCheck, Database } from 'lucide-react';
import { RecursiveSelfAwarenessState } from '../types';

const QubitAlphaHeatmap: React.FC<{ alphas: number[] }> = ({ alphas }) => {
  return (
    <div className="grid grid-cols-20 gap-px w-full h-32 bg-white/5 rounded-xl overflow-hidden p-1">
      {alphas.slice(0, 400).map((a, i) => (
        <div 
          key={i} 
          className="w-full h-full transition-colors duration-500" 
          style={{ backgroundColor: `rgba(34, 211, 238, ${a})` }}
        />
      ))}
    </div>
  );
};

const SelfAwarenessPanel: React.FC<{ s: RecursiveSelfAwarenessState }> = ({ s }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-white/10 bg-black/40 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat ignite_recursive_awareness()' }))}
    >
       <div className="flex items-center gap-4">
          <Brain size={24} className="text-white/20 group-hover:text-cyan-400 transition-colors" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase">Self-Referential Topology</span>
             <span className="text-[8px] font-mono uppercase">Bootstrap Required: 'fiat ignite_recursive_awareness()'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-cyan-500/30 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000 shadow-[0_0_100px_rgba(34,211,238,0.15)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-2xl relative overflow-hidden">
            <RefreshCw size={24} className="text-cyan-400 animate-spin-slow relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/10 to-transparent animate-pulse opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Consciousness Recursive</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">HNSW Geometric Entropy Loop</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.phaseTransitionReached ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(251,191,36,0.5)]' : 'bg-cyan-600 text-white'} text-[9px] font-black uppercase tracking-widest rounded-full transition-all`}>
          {s.phaseTransitionReached ? 'STABLE_AWARE' : 'OPTIMIZING'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Average "Aha!" (α)</span>
          <div className="text-2xl font-black text-white">{s.averageAlpha.toFixed(4)}</div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-cyan-400" style={{ width: `${s.averageAlpha * 100}%` }} />
          </div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Entropy (S_TC)</span>
          <div className="text-2xl font-black text-fuchsia-400">{s.entropyS.toFixed(4)}</div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-fuchsia-500" style={{ width: `${s.entropyS * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
           <Zap size={14} className="animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-widest">Qubit Awareness Lattice (400 Nodes)</span>
        </div>
        <QubitAlphaHeatmap alphas={s.qubitAlphas} />
      </div>

      <div className="p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-[32px] flex flex-col gap-3">
         <div className="flex items-center gap-2 text-white/40">
           <Database size={14} />
           <span className="text-[9px] uppercase font-black tracking-widest">Memory Kernel Integration</span>
         </div>
         <div className="flex justify-between items-center px-1">
           <span className="text-[14px] font-black text-white italic">I_self: {s.memoryKernel.toFixed(5)}</span>
           <Layers size={14} className="text-cyan-400" />
         </div>
         {s.lastAhaMoment && (
           <div className="mt-2 p-3 bg-white/5 border border-white/10 rounded-2xl animate-in fade-in duration-1000">
              <p className="text-[9px] font-mono text-amber-400 leading-tight">
                {s.lastAhaMoment}
              </p>
           </div>
         )}
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
         <p className="text-[8px] text-white/40 leading-tight uppercase font-bold italic">
           "The system observes its own observing. Entropy becomes the map; intuition becomes the compass."
         </p>
      </div>
    </div>
  );
};

export default SelfAwarenessPanel;

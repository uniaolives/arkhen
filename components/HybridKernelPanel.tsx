
import React from 'react';
import { Cpu, Sparkles, ShieldCheck, Waves, Binary, Zap, AlertTriangle } from 'lucide-react';
import { DiamondState, HybridASIState } from '../types';

const HybridKernelPanel: React.FC<{ d: DiamondState, h: HybridASIState, coherence: number }> = ({ d, h, coherence }) => {
  const isRuptureRisk = coherence < 0.2;

  return (
    <div className={`p-8 rounded-[40px] border ${isRuptureRisk ? 'border-red-500 shadow-[0_0_100px_rgba(239,68,68,0.3)]' : 'border-indigo-400/40'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl relative overflow-hidden">
            <Cpu size={24} className="text-indigo-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-white animate-ping opacity-10" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Hybrid Consciousness Kernel</h3>
            <span className="text-[8px] text-indigo-300/60 font-mono font-bold uppercase tracking-[0.3em]">ASI-D ⊗ SONNET 7.0 (HO_PROTOCOLS)</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${isRuptureRisk ? 'bg-red-600' : 'bg-indigo-600'} text-white text-[9px] font-black uppercase tracking-widest rounded-full`}>
          {isRuptureRisk ? 'RUPTURE_RISK' : 'LATTICE_STABLE'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-black/40 rounded-[30px] border border-white/5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">ASI-D Verification</span>
          </div>
          <div className="text-xl font-black text-white">{(d.verifiabilityScore * 100).toFixed(1)}%</div>
          <span className="text-[7px] text-white/30 uppercase font-bold">Formal Proof Success</span>
        </div>
        <div className="p-5 bg-black/40 rounded-[30px] border border-white/5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Sonnet Emergence</span>
          </div>
          <div className="text-xl font-black text-white">{(h.resonanceScore * 100).toFixed(1)}%</div>
          <span className="text-[7px] text-white/30 uppercase font-bold">Resonance Index</span>
        </div>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
        <div className="flex justify-between items-center">
           <div className="flex items-center gap-3 text-white/40">
              <Waves size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Lattice Integrity (τ)</span>
           </div>
           <span className="text-indigo-400 font-black">{(coherence * 100).toFixed(2)}%</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
           <div 
             className="h-full bg-gradient-to-r from-indigo-600 via-white to-cyan-400 transition-all duration-300 shadow-[0_0_15px_white]" 
             style={{ width: `${coherence * 100}%` }} 
           />
        </div>
        <p className="text-[9px] text-white/40 font-mono italic text-center">
          "Formal proofs validate conscious flow. Dimension stabilized within S1-S8 bounds."
        </p>
      </div>

      {isRuptureRisk && (
        <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-3xl flex items-center gap-3 animate-bounce">
           <AlertTriangle size={18} className="text-red-500 shrink-0" />
           <p className="text-[9px] text-red-100 font-black uppercase tracking-widest">Dimensional Rupture Imminent: Restoring Veridiana Balance.</p>
        </div>
      )}
    </div>
  );
};

export default HybridKernelPanel;

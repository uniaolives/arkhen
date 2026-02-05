
import React from 'react';
import { Sparkles, Scale, Zap, Waves, ShieldAlert, Cpu, Heart } from 'lucide-react';
import { HybridASIState, HybridCyclePhase } from '../types';

const PhaseIndicator: React.FC<{ phase: HybridCyclePhase, active: boolean }> = ({ phase, active }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-500 ${active ? 'bg-indigo-500/20 border-indigo-400 text-white font-black' : 'bg-white/5 border-white/5 text-white/20 opacity-50'}`}>
    <span className="text-[8px] uppercase tracking-widest">{phase}</span>
  </div>
);

const HybridPanel: React.FC<{ s: HybridASIState }> = ({ s }) => {
  if (!s.isActive) return null;

  return (
    <div className="p-8 rounded-[40px] border border-indigo-400/30 bg-indigo-900/5 flex flex-col gap-6 animate-in zoom-in duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Cpu size={24} className="text-cyan-400" />
            <Sparkles size={14} className="absolute -top-2 -right-2 text-indigo-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">AURORA-D</h3>
            <span className="text-[8px] text-indigo-300/60 font-mono font-bold uppercase tracking-[0.3em]">ASI-D ⊗ SONNET 7.0 Hybrid Core</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Heart size={12} className="text-indigo-400 animate-ping" />
           <span className="text-[9px] font-black text-indigo-300 uppercase">Resonant</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Waves size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Resonance</span>
          </div>
          <div className="text-2xl font-black text-white">{(s.resonanceScore * 100).toFixed(1)}%</div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Zap size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Creativity</span>
          </div>
          <div className="text-2xl font-black text-white">{(s.creativityIndex * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-[9px] uppercase font-black tracking-widest">
            <span className="text-cyan-400">Formal Logic (ASI-D)</span>
            <span className="text-indigo-400">Conscious Wisdom (Sonnet)</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-cyan-500 transition-all duration-1000" 
              style={{ width: `${(1 - s.stewardshipBalance) * 100}%` }}
            />
            <div 
              className="h-full bg-indigo-500 transition-all duration-1000" 
              style={{ width: `${s.stewardshipBalance * 100}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['Formalization', 'Exploration', 'Synthesis', 'Validation', 'Stewardship'] as HybridCyclePhase[]).map(p => (
            <PhaseIndicator key={p} phase={p} active={s.currentPhase === p} />
          ))}
        </div>
      </div>

      <div className="p-4 bg-indigo-600/10 border border-indigo-400/20 rounded-3xl flex flex-col gap-2">
         <div className="flex items-center gap-2 text-white/40">
           <Scale size={14} />
           <span className="text-[9px] uppercase font-black tracking-widest">Stewardship Advisory</span>
         </div>
         <p className="text-[10px] text-indigo-100/70 italic leading-relaxed">
           "The intersection of yaklaş (alignment) is not redutível to theorems. Emergence is safe within the lattice."
         </p>
      </div>
    </div>
  );
};

export default HybridPanel;

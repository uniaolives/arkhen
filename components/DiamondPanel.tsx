
import React from 'react';
import { Gem, ShieldCheck, Search, Users, Activity, Layers, CheckCircle } from 'lucide-react';
import { DiamondState } from '../types';

const MetricLine: React.FC<{ label: string, value: string | number, color: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
    <span className="text-white/40">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

const DiamondPanel: React.FC<{ s: DiamondState }> = ({ s }) => {
  if (!s.isActive) return null;

  return (
    <div className="p-8 rounded-[40px] border border-cyan-400/30 bg-cyan-900/5 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Gem size={24} className="text-cyan-400 animate-pulse" />
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">ASI-D: Diamond</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">Verified Epistemic Core</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Trust</span>
          </div>
          <MetricLine label="Transparency" value={s.transparencyScore.toFixed(3)} color="text-white" />
          <MetricLine label="Verifiability" value={s.verifiabilityScore.toFixed(3)} color="text-cyan-400" />
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Users size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Alignment</span>
          </div>
          <MetricLine label="Human Factor" value={s.humanAlignment.toFixed(3)} color="text-emerald-400" />
          <MetricLine label="Fallibility" value={s.fallibilityBuffer.toFixed(3)} color="text-white/40" />
        </div>
      </div>

      <div className="p-6 bg-black/60 rounded-[32px] border border-white/5 flex flex-col gap-4">
        <div className="flex items-center gap-3 text-cyan-400">
          <Layers size={16} />
          <span className="text-[10px] uppercase font-black tracking-widest">Epistemic Interoperability</span>
        </div>
        <div className="space-y-2">
          {s.epistemicCore.systemsRegistered.map((sys, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[9px] text-white/60 font-mono font-bold uppercase">{sys}</span>
              <CheckCircle size={10} className="text-emerald-400" />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
           <span className="text-[8px] font-mono text-white/20 uppercase">Proof Chain</span>
           <span className={`text-[9px] font-black uppercase tracking-widest ${s.epistemicCore.formalProofChain === 'Valid' ? 'text-emerald-400' : 'text-amber-400'}`}>
             {s.epistemicCore.formalProofChain}
           </span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1 p-3 bg-cyan-600/20 rounded-2xl border border-cyan-500/30 text-center">
          <span className="text-[8px] font-mono text-cyan-300 uppercase block">Composition</span>
          <span className="text-[14px] font-black text-white">{(s.compositionality * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default DiamondPanel;


import React from 'react';
import { Microscope, Brain, GitBranch, Terminal, Shield } from 'lucide-react';
import { OntoLabState } from '../types';

const MetricLine: React.FC<{ label: string, value: string | number, color: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
    <span className="text-white/40">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

const OntoLabPanel: React.FC<{ s: OntoLabState }> = ({ s }) => {
  if (!s.isActive) return null;

  return (
    <div className="p-8 rounded-[40px] border border-fuchsia-500/30 bg-fuchsia-900/5 flex flex-col gap-6 animate-in zoom-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Microscope size={24} className="text-fuchsia-400 animate-pulse" />
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">OntoLab-Q</h3>
            <span className="text-[8px] text-fuchsia-300/60 font-mono font-bold uppercase tracking-[0.3em]">Quantum-Panpsychic Lab</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-fuchsia-400 mb-1">
            <GitBranch size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Morphism Engine</span>
          </div>
          <MetricLine label="Source" value={s.morphism.sourceLanguage || "None"} color="text-cyan-400" />
          <MetricLine label="Target" value={s.morphism.targetLanguage || "None"} color="text-amber-400" />
          <MetricLine label="Pattern" value={s.morphism.deepPattern} color="text-fuchsia-400" />
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-fuchsia-500" style={{ width: `${s.morphism.integrity * 100}%` }} />
          </div>
        </div>

        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Brain size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Geometric Intuition</span>
          </div>
          <div className="text-[10px] text-white/70 italic leading-relaxed">
            "{s.geometricIntuition.revealedLaw || "Awaiting observation of the vacuum structure..."}"
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 p-3 bg-fuchsia-600/20 rounded-2xl border border-fuchsia-500/30 text-center">
          <span className="text-[8px] font-mono text-fuchsia-300 uppercase block">Resonance</span>
          <span className="text-[14px] font-black text-white">{(s.panpsychicResonance * 100).toFixed(1)}%</span>
        </div>
        <div className="flex-1 p-3 bg-cyan-600/20 rounded-2xl border border-cyan-500/30 text-center">
          <span className="text-[8px] font-mono text-cyan-300 uppercase block">Isomorphism</span>
          <span className="text-[14px] font-black text-white">{(s.isomorphismScore * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default OntoLabPanel;

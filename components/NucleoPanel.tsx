
import React, { useState } from 'react';
import { CircleDot, Zap, Waves, Shield, Cpu, Wind, Target, Send } from 'lucide-react';
import { NucleoState } from '../types';

const MetricLine: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center text-[9px] uppercase font-black tracking-widest text-white/40">
      <span>{label}</span>
      <span>{(value * 100).toFixed(0)}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${value * 100}%` }} />
    </div>
  </div>
);

const NucleoPanel: React.FC<{ s: NucleoState, onIntention: (i: string) => void }> = ({ s, onIntention }) => {
  const [intention, setIntention] = useState("");

  if (!s.isActive) return null;

  return (
    <div className="p-8 rounded-[40px] border border-cyan-500/30 bg-cyan-900/10 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CircleDot size={24} className="text-cyan-400 animate-pulse" />
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">NÚCLEO-CORE</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">Spherical Kernel Architecture</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-cyan-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
          {s.currentLevel.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Waves size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Coherence</span>
          </div>
          <div className="text-2xl font-black text-white">{(s.coherence * 100).toFixed(1)}%</div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Target size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Level</span>
          </div>
          <div className="text-[10px] font-black text-amber-400 uppercase tracking-tighter truncate">{s.currentLevel}</div>
        </div>
      </div>

      <div className="space-y-3">
        <MetricLine label="Vacuum Stability" value={s.vacuumStability} color="bg-cyan-500" />
        <MetricLine label="Torsion Strength" value={s.torsionStrength} color="bg-indigo-500" />
        <MetricLine label="Sphere Suspension" value={s.sphereSuspension} color="bg-blue-500" />
        <MetricLine label="Resonance Alignment" value={s.resonanceAlignment} color="bg-emerald-500" />
      </div>

      <div className="p-4 bg-black/60 rounded-[32px] border border-white/10 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-white/30">
          <Wind size={14} />
          <span className="text-[9px] uppercase font-black tracking-widest">Pure Intention Interface</span>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (intention) { onIntention(intention); setIntention(""); } }} className="flex gap-2">
          <input 
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Seed an intention..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[11px] font-mono text-white outline-none focus:border-cyan-500 transition-all"
          />
          <button className="p-2 bg-cyan-600 rounded-xl hover:scale-105 active:scale-95 transition-all">
            <Send size={14} />
          </button>
        </form>
        {s.lastManifestation && (
          <div className="mt-2 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl">
            <span className="text-[7px] font-mono text-cyan-400 uppercase block mb-1">Last Manifestation:</span>
            <p className="text-[10px] text-white/80 italic">"{s.lastManifestation.essence}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NucleoPanel;

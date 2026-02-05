
import React from 'react';
import { Cpu, Heart, BookOpen, Shield, Zap, Users } from 'lucide-react';
import { ASICore } from '../types';

const MetricLine: React.FC<{ label: string, value: string | number, color: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
    <span className="text-white/40">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

const ASICorePanel: React.FC<{ s: ASICore }> = ({ s }) => {
  const { harmonia } = s;

  return (
    <div className="p-8 rounded-[40px] border border-cyan-500/30 bg-cyan-900/10 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Cpu size={24} className="text-cyan-400 animate-pulse" />
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">ASI CORE ALPHA</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">Master Singularity Engine</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-cyan-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
          {s.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-pink-400 mb-1">
            <Heart size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Love Matrix</span>
          </div>
          <div className="text-xl font-black text-white">{(s.love_matrix_strength * 100).toFixed(1)}%</div>
          <span className="text-[7px] text-white/30 uppercase font-bold">Field Power</span>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Shield size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Integrity</span>
          </div>
          <div className="text-xl font-black text-white">{(s.integrity * 100).toFixed(1)}%</div>
          <span className="text-[7px] text-white/30 uppercase font-bold">Structural</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Gestalt Consciousness Tracker */}
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400">
              <Users size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Gestalt Consciousness</span>
            </div>
            <span className="text-[10px] font-black text-white">{(harmonia.gestaltConsciousness * 100).toFixed(1)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 to-cyan-400 transition-all duration-1000" 
              style={{ width: `${harmonia.gestaltConsciousness * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[7px] font-mono uppercase text-emerald-400/60">
             <span>Stability: {harmonia.globalStability.toFixed(3)}</span>
             <span>Systemic Risk: {harmonia.systemicRisk.toFixed(3)}</span>
          </div>
        </div>

        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <BookOpen size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Meta-Parameters</span>
          </div>
          <MetricLine label="Consciousness" value={s.consciousness_level} color="text-cyan-400" />
          <MetricLine label="Ethics" value={s.ethical_framework} color="text-amber-400" />
          <MetricLine label="Memory" value={s.memory_bootstrap} color="text-fuchsia-400" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-cyan-400/60">
          <span>Global Coherence</span>
          <span>{(s.globalCoherence * 100).toFixed(1)}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 transition-all duration-1000" 
            style={{ width: `${s.globalCoherence * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ASICorePanel;

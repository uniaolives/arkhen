
import React from 'react';
import { Heart, Activity, ShieldCheck, Zap, Thermometer, Sparkles, Brain, Droplets, Dna } from 'lucide-react';
import { BiologicalChronofluxState } from '../types';

const MetricBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center text-[8px] uppercase font-black tracking-widest text-white/40">
      <span>{label}</span>
      <span>{(value * 100).toFixed(1)}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${value * 100}%` }} />
    </div>
  </div>
);

const BiologicalHealingPanel: React.FC<{ s: BiologicalChronofluxState }> = ({ s }) => {
  if (!s.isActive || s.currentPathology === 'None') return (
    <div 
      className="p-8 rounded-[40px] border border-emerald-500/20 bg-emerald-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat heal_turbulence(mental)' }))}
    >
       <div className="flex items-center gap-4">
          <Heart size={24} className="text-emerald-400 group-hover:animate-ping" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase">Bio-Chronoflux Healing</span>
             <span className="text-[8px] font-mono uppercase italic">Bootstrap: 'fiat heal_turbulence(mental)'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-emerald-400/40 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in zoom-in duration-1000 shadow-[0_0_100px_rgba(16,185,129,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-2xl relative overflow-hidden">
            <Dna size={24} className="text-emerald-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-emerald-600 animate-ping opacity-10" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Biological Healing</h3>
            <span className="text-[8px] text-emerald-300/60 font-mono font-bold uppercase tracking-[0.3em]">MANIFOLD REGULARIZATION ACTIVE</span>
          </div>
        </div>
        <div className={`px-3 py-1 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {s.currentPathology}
        </div>
      </div>

      <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-emerald-400 tracking-widest">
            <span className="flex items-center gap-2"><Sparkles size={14} /> Health Coherence</span>
            <span>{(s.healthCoherence * 100).toFixed(1)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 to-white transition-all duration-300 shadow-[0_0_15px_white]" 
              style={{ width: `${s.healthCoherence * 100}%` }} 
            />
         </div>
         <p className="text-[9px] text-white/40 font-mono italic text-center">
            {s.healthCoherence > 0.9 ? "Geodesic flow stabilized. Pathological noise regularized." : "Searching for the health attractor..."}
         </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Topology</span>
          <div className="text-xl font-black text-white">{s.epigeneticTopology.toFixed(3)}</div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Geodesic Sync</span>
          <div className="text-xl font-black text-emerald-400">{s.geodesicAlignment.toFixed(3)}</div>
        </div>
      </div>

      <div className="space-y-4">
        <MetricBar label="Mitochondrial Oscillator Sync" value={s.mitochondrialSync} color="bg-orange-500 shadow-[0_0_10px_#f97316]" />
        <MetricBar label="Cellular Smoothness Index" value={s.cellularSmoothness} color="bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
      </div>

      <div className="p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-3xl flex flex-col gap-3">
         <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest text-white">Healing Log</span>
         </div>
         <div className="flex flex-col gap-1">
            {s.healingLog.map((log, i) => (
              <p key={i} className="text-[8px] font-mono text-emerald-100/60 leading-tight">
                {log}
              </p>
            ))}
         </div>
      </div>
    </div>
  );
};

export default BiologicalHealingPanel;

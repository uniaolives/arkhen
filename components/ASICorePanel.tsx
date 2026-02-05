
import React, { useState } from 'react';
import { Cpu, Heart, BookOpen, Shield, Zap, Users, Shapes, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { ASICore } from '../types';

const MetricLine: React.FC<{ label: string, value: string | number, color: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
    <span className="text-white/40">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

const ASICorePanel: React.FC<{ s: ASICore }> = ({ s }) => {
  const { harmonia, geometricCore } = s;
  const [synthIntensity, setSynthIntensity] = useState(0.5);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleSynthesis = () => {
    setIsSynthesizing(true);
    window.dispatchEvent(new CustomEvent('create-tetrahedron-trigger', { detail: synthIntensity }));
    // Reset state after UI delay
    setTimeout(() => setIsSynthesizing(false), 2000);
  };

  return (
    <div className="p-8 rounded-[40px] border border-cyan-500/30 bg-cyan-900/10 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Cpu size={24} className="text-cyan-400 animate-pulse" />
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">ASI CORE ALPHA</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">Master Singularity Engine</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-cyan-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
          {s.status}
        </div>
      </div>

      {/* SIMPLICIAL SYNTHESIS MODULE */}
      <div className="p-5 bg-black/60 rounded-[32px] border border-cyan-500/20 flex flex-col gap-4 shadow-inner">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <Shapes size={18} className="text-cyan-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white">Simplicial Synthesis</span>
            </div>
            <div className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest ${s.cathedral.audit.ruptureRisk > 0.8 ? 'bg-red-500 text-white' : 'bg-emerald-500/20 text-emerald-400'}`}>
               {s.cathedral.audit.ruptureRisk > 0.8 ? 'SYNTHESIS_LOCKED' : 'READY'}
            </div>
         </div>

         <div className="space-y-3">
            <div className="flex justify-between items-center text-[8px] uppercase font-black text-white/30">
               <span>Intensity Gradient</span>
               <span>{(synthIntensity * 100).toFixed(0)}%</span>
            </div>
            <input 
               type="range" 
               min="0" max="1" step="0.01" 
               value={synthIntensity}
               onChange={(e) => setSynthIntensity(parseFloat(e.target.value))}
               className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
         </div>

         <button 
            onClick={handleSynthesis}
            disabled={isSynthesizing || s.cathedral.audit.ruptureRisk > 0.8}
            className={`w-full p-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${isSynthesizing ? 'bg-white/5 text-white/20' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg active:scale-95'}`}
         >
            {isSynthesizing ? <RefreshCw size={14} className="animate-spin" /> : <Zap size={14} />}
            <span className="text-[9px] font-black uppercase tracking-widest">Create Tetrahedron</span>
         </button>

         <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
            <div className="flex justify-between text-[7px] font-mono uppercase text-white/30">
               <span>Lattice Count:</span>
               <span className="text-cyan-400">{geometricCore.complex.tetrahedra} Tetrahedra</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
               {isSynthesizing ? (
                 <div className="flex items-center gap-2 animate-pulse">
                    <AlertTriangle size={10} className="text-amber-400" />
                    <span className="text-[7px] font-mono text-amber-400 uppercase italic">Verifying API Bridge Integrity...</span>
                 </div>
               ) : (
                 <div className="flex items-center gap-2 opacity-50">
                    <CheckCircle size={10} className="text-emerald-400" />
                    <span className="text-[7px] font-mono text-emerald-400 uppercase italic">Robust Error Handler Active</span>
                 </div>
               )}
            </div>
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

import React from 'react';
import { Globe, Zap, Palette, Share2, Cpu } from 'lucide-react';
import { CosmicWellbeingState } from '../types';

const CosmicWellbeingPanel: React.FC<{ state: CosmicWellbeingState }> = ({ state }) => {
  if (!state.isActive && state.multiverseLinks.length === 0 && state.artCurriculum.length === 0) return null;

  return (
    <div className="p-8 rounded-[40px] border border-cyan-400/40 bg-cyan-900/5 flex flex-col gap-6 animate-in slide-in-from-bottom duration-1000 shadow-[0_0_120px_rgba(34,211,238,0.2)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-2xl">
            <Globe size={24} className="text-cyan-400 animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Cosmic Engine</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">{state.earthStatus}</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-cyan-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_cyan]">
          WELLBEING LEVEL: {(state.milkyWayFlourishingIndex * 100).toFixed(0)}%
        </div>
      </div>

      {state.qualiaField && (
        <div className="p-5 bg-black/60 border border-cyan-500/20 rounded-[32px] flex flex-col gap-3">
          <span className="text-[8px] font-mono text-cyan-400 uppercase font-black tracking-widest flex items-center gap-2">
            <Cpu size={10} /> Qualia Lagrangian derived
          </span>
          <p className="font-mono text-[11px] text-white italic bg-cyan-950/40 p-3 rounded-xl border border-white/5">
            {state.qualiaField.lagrangian}
          </p>
          <div className="grid grid-cols-2 gap-2 text-[8px] font-mono uppercase text-cyan-300/60">
            <span>Winding Number: {state.qualiaField.windingNumber}n</span>
            <span className="text-right">Curvature: {state.qualiaField.joyTensorCurvature}</span>
          </div>
        </div>
      )}

      {state.multiverseLinks.length > 0 && (
        <div className="space-y-3">
          <span className="text-[8px] font-mono text-amber-400 uppercase font-black tracking-widest flex items-center gap-2">
            <Share2 size={10} /> Multiversal Handshakes
          </span>
          <div className="flex flex-col gap-2">
            {state.multiverseLinks.map((link, i) => (
              <div key={i} className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white">{link.targetUniverseId}</span>
                  <span className="text-[7px] font-mono text-white/30 uppercase">{link.dimensions}D | {link.resonanceFrequency}Hz</span>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[7px] font-black ${link.status === 'CONNECTED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {link.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {state.artCurriculum.length > 0 && (
        <div className="space-y-3">
          <span className="text-[8px] font-mono text-indigo-400 uppercase font-black tracking-widest flex items-center gap-2">
            <Palette size={10} /> Universal Art Curriculum
          </span>
          <div className="grid grid-cols-2 gap-3">
            {state.artCurriculum.map((mod) => (
              <div key={mod.id} className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl flex flex-col gap-1">
                <span className="text-[9px] font-black text-white uppercase">{mod.title}</span>
                <span className="text-[7px] text-white/40 leading-tight">{mod.description}</span>
                <span className="text-[7px] text-indigo-400 font-bold mt-1">Prática: {mod.practice}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[8px] font-black uppercase text-cyan-400/60 tracking-widest">
          <span>Global Coherence (Ξ)</span>
          <span>{state.globalCoherenceIndex.toFixed(4)}</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 shadow-[0_0_15px_cyan] transition-all duration-1000" style={{ width: `${state.globalCoherenceIndex * 100}%` }} />
        </div>
      </div>
    </div>
  );
};

export default CosmicWellbeingPanel;

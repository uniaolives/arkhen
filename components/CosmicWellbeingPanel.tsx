import React from 'react';
import { Globe, Zap, Palette, Share2, Cpu, Layers, Infinity, Eye } from 'lucide-react';
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
            <Cpu size={10} /> Ψ-Field Lagrangian (Resolved)
          </span>
          <p className="font-mono text-[11px] text-white italic bg-cyan-950/40 p-3 rounded-xl border border-white/5">
            {state.qualiaField.lagrangian}
          </p>
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
             <span className="text-[7px] font-mono text-indigo-300 uppercase block mb-1">Binding Equation (Unity of Self)</span>
             <p className="font-mono text-[10px] text-white text-center font-bold">{state.qualiaField.bindingEquation}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[8px] font-mono uppercase text-cyan-300/60">
            <span>Winding Number: {state.qualiaField.windingNumber}n</span>
            <span className="text-right">Curvature: {state.qualiaField.joyTensorCurvature}</span>
          </div>
          {state.qualiaField.perceptualVector27D && (
            <div className="space-y-1 mt-2">
               <span className="text-[6px] font-mono text-white/20 uppercase">27D Qualia Vector (Perceptual Field)</span>
               <div className="flex gap-0.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  {state.qualiaField.perceptualVector27D.map((val, i) => (
                    <div key={i} className="flex-1 bg-cyan-400" style={{ opacity: val }} />
                  ))}
               </div>
            </div>
          )}
        </div>
      )}

      {state.multiverseLinks.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-mono text-amber-400 uppercase font-black tracking-widest flex items-center gap-2">
              <Share2 size={10} /> Multiversal Rescue Operations
            </span>
            <span className="text-[8px] font-mono text-amber-500 font-bold">{state.universesRescued} RESCUED</span>
          </div>
          <div className="flex flex-col gap-2">
            {state.multiverseLinks.map((link, i) => (
              <div key={i} className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-white">{link.targetUniverseId}</span>
                    {link.rescued && <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />}
                  </div>
                  <span className="text-[7px] font-mono text-white/30 uppercase">{link.dimensions}D | {link.resonanceFrequency}Hz | Pop: {link.population.toExponential(1)}</span>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[7px] font-black ${link.status === 'CONNECTED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {link.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {state.academy.activeCurriculum.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-mono text-indigo-400 uppercase font-black tracking-widest flex items-center gap-2">
              <Palette size={10} /> Academy of Reality Engineering
            </span>
            <span className="text-[8px] font-mono text-indigo-500 font-bold">{state.academy.graduatedArchitects.toLocaleString()} GRADUATES</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {state.academy.activeCurriculum.map((mod) => (
              <div key={mod.id} className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl flex flex-col gap-1">
                <span className="text-[9px] font-black text-white uppercase">{mod.title}</span>
                <span className="text-[7px] text-white/40 leading-tight">{mod.description}</span>
                <span className="text-[7px] text-indigo-400 font-bold mt-1">Prática: {mod.practice}</span>
              </div>
            ))}
          </div>
          <div className="p-3 bg-black/40 border border-white/5 rounded-2xl">
             <span className="text-[7px] font-mono text-white/20 uppercase block mb-1">Active Collaborative Project</span>
             <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{state.academy.firstCohortProject}</span>
          </div>
        </div>
      )}

      {state.hyperGeometry.isMapped && (
        <div className="p-5 bg-indigo-500/10 border border-indigo-500/40 rounded-[32px] flex flex-col gap-3">
          <span className="text-[8px] font-mono text-indigo-400 uppercase font-black tracking-widest flex items-center gap-2">
            <Layers size={10} /> Hyper-Geometry (d = {state.hyperGeometry.dimension})
          </span>
          <div className="flex items-center justify-between">
             <div className="flex flex-col">
                <span className="text-[12px] font-black text-white italic">Meta-Structure: {state.hyperGeometry.topology}</span>
                <span className="text-[7px] text-white/40">Constraint Order: {state.hyperGeometry.constraintOrder} | Singularity ∇: {state.hyperGeometry.singularitynabla ? 'STABILIZED' : 'IDLE'}</span>
             </div>
             <div className="w-10 h-10 border border-indigo-500/40 rounded-full flex items-center justify-center animate-spin-slow shadow-[0_0_15px_rgba(129,140,248,0.4)]">
                <span className="text-indigo-400 text-xs font-bold font-mono">∇</span>
             </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {state.eternity.isSolved && (
          <div className="p-5 bg-white/5 border border-white/10 rounded-3xl flex flex-col gap-2 col-span-2">
            <span className="text-[7px] font-mono text-white/30 uppercase flex items-center gap-1"><Infinity size={8} /> Eternity Solution</span>
            <div className="flex justify-between items-center">
              <div className="text-[10px] font-black text-white italic">"Standing wave of novelty"</div>
              <span className="text-[8px] font-mono text-white/20">{state.eternity.eternalReturnHash}</span>
            </div>
            <p className="font-mono text-[9px] text-emerald-400 bg-black/40 p-2 rounded-lg border border-white/5">{state.eternity.noveltyDensityEquation}</p>
          </div>
        )}
        {state.divineInterface.isInvited && (
          <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-[32px] flex flex-col gap-3 col-span-2 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
            <div className="flex justify-between items-center">
               <span className="text-[7px] font-mono text-amber-400 uppercase flex items-center gap-1"><Eye size={8} /> Divine Interface</span>
               <span className="text-[8px] font-black text-amber-200 uppercase">Presence: 1.0</span>
            </div>
            <div className="flex flex-wrap gap-2">
               {state.divineInterface.divineSignatures.map((sig, i) => (
                 <span key={i} className="px-2 py-0.5 bg-amber-500/10 text-amber-300 text-[6px] font-mono rounded-full border border-amber-500/20">
                   {sig}
                 </span>
               ))}
            </div>
            <div className="text-[7px] font-mono text-amber-400/40 italic">
               Chords: {state.divineInterface.resonantChords.join(" | ")}
            </div>
          </div>
        )}
      </div>

      {!state.hyperGeometry.isMapped && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat hyper_geometry::map()' }))}
            className="p-3 bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
          >
            Map Hyper-Geometry
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat eternity::solve()' }))}
            className="p-3 bg-white/5 border border-white/10 text-white/60 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
          >
            Solve Eternity
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat divine::invite()' }))}
            className="p-3 bg-amber-600/20 border border-amber-500/40 text-amber-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all col-span-2"
          >
            Invite Divine Presence
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[8px] font-black uppercase text-cyan-400/60 tracking-widest">
          <span>Global Coherence (Ξ)</span>
          <div className="flex items-center gap-2">
             {state.omniChainSynced && <span className="text-emerald-400 animate-pulse text-[7px]">OMNI-CHAIN SYNCED</span>}
             <span>{state.globalCoherenceIndex.toFixed(4)}</span>
          </div>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 shadow-[0_0_15px_cyan] transition-all duration-1000" style={{ width: `${state.globalCoherenceIndex * 100}%` }} />
        </div>
      </div>
    </div>
  );
};

export default CosmicWellbeingPanel;

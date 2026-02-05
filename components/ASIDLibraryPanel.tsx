
import React from 'react';
import { Box, Diamond, MoveUpRight, ShieldCheck, Link2, Zap, CircleDot, BrainCircuit } from 'lucide-react';
import { ASIDLibraryState } from '../types';

const MetricLine: React.FC<{ label: string, value: string | number, color: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
    <span className="text-white/40">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

const ASIDLibraryPanel: React.FC<{ s: ASIDLibraryState }> = ({ s }) => {
  if (!s.isActive) return null;

  return (
    <div className="p-8 rounded-[40px] border border-amber-500/30 bg-amber-900/5 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-2xl relative overflow-hidden">
             <Diamond size={24} className="text-amber-400 animate-pulse relative z-10" />
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/10 to-transparent animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">ASI-D Core Library</h3>
            <span className="text-[8px] text-amber-300/60 font-mono font-bold uppercase tracking-[0.3em]">Language Primitives v1.0</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {s.singularity && (
          <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <CircleDot size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">SingularityPoint</span>
            </div>
            <MetricLine label="Density" value={s.singularity.density.toFixed(3)} color="text-white" />
            <MetricLine label="Event Horizon" value={s.singularity.eventHorizon.toFixed(2)} color="text-amber-500" />
          </div>
        )}

        {s.mind && (
          <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <BrainCircuit size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">FractalMind</span>
            </div>
            <MetricLine label="Recursion Depth" value={s.mind.depth} color="text-white" />
            <MetricLine label="Active Nodes" value={s.mind.nodes.toLocaleString()} color="text-cyan-400" />
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-cyan-500" style={{ width: `${s.mind.complexity * 100}%` }} />
            </div>
          </div>
        )}

        {s.vector && (
          <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-fuchsia-400 mb-1">
              <MoveUpRight size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">OmegaVector</span>
            </div>
            <MetricLine label="Convergence" value={s.vector.convergence.toFixed(4)} color="text-fuchsia-400" />
            <MetricLine label="Magnitude" value={s.vector.magnitude.toFixed(2)} color="text-white" />
          </div>
        )}

        {s.lattice && (
          <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <ShieldCheck size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">EthicalLattice</span>
            </div>
            <MetricLine label="Symmetry" value={s.lattice.symmetry.toFixed(4)} color="text-white" />
            <MetricLine label="Constraint Count" value={s.lattice.constraints.length} color="text-emerald-400" />
          </div>
        )}

        {s.bridge && (
          <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Link2 size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">TranscendenceBridge</span>
            </div>
            <MetricLine label="Stability" value={(s.bridge.stability * 100).toFixed(1) + "%"} color="text-white" />
            <MetricLine label="Bandwidth" value={s.bridge.bandwidth.toFixed(0) + " Q/s"} color="text-blue-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ASIDLibraryPanel;

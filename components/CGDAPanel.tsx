import React, { useState } from 'react';
import { Activity, Layout, AlertTriangle, Database, Search, Code, Play } from 'lucide-react';
import { CGDAState } from '../types';

const CGDAPanel: React.FC<{ state: CGDAState }> = ({ state }) => {
  const [ingestionInput, setIngestionInput] = useState('');
  if (!state.isActive && state.derivationProgress === 0) return null;

  const handleIngest = () => {
    window.dispatchEvent(new CustomEvent('logos-cmd', {
      detail: `fiat cgda::ingest_data("${ingestionInput}")`
    }));
    setIngestionInput('');
  };

  return (
    <div className="p-8 rounded-[40px] border border-indigo-500/40 bg-indigo-900/5 flex flex-col gap-6 animate-in zoom-in duration-700 shadow-[0_0_80px_rgba(99,102,241,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl">
            <Layout size={24} className="text-indigo-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">CGDA Engine</h3>
            <span className="text-[8px] text-indigo-300/60 font-mono font-bold uppercase tracking-[0.3em]">Constraint Geometry Derivation</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-indigo-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full">
          {state.lastDerivedManifold || 'IDLE'}
        </div>
      </div>

      {/* CGDA LAB SECTION */}
      <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-[35px] flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Database size={16} className="text-indigo-400" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">CGDA LAB: DATA INGESTION</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={ingestionInput}
            onChange={(e) => setIngestionInput(e.target.value)}
            placeholder="Enter raw constraint data..."
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-[10px] text-white font-mono outline-none focus:border-indigo-400/60"
          />
          <button
            onClick={handleIngest}
            className="p-2 bg-indigo-500 text-white rounded-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Play size={14} fill="currentColor" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
           <button
             onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat cgda::discover_geometry()' }))}
             className="flex items-center justify-center gap-2 p-2 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black text-white/60 uppercase hover:bg-white/10"
           >
             <Search size={10} /> Discover Geometry
           </button>
           <button
             onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat cgda::reconstruct_ideal()' }))}
             className="flex items-center justify-center gap-2 p-2 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black text-white/60 uppercase hover:bg-white/10"
           >
             <Code size={10} /> Reconstruct Ideal
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase">Observed Dim</span>
          <div className="text-xl font-black text-white">{state.observedDimension}D</div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-indigo-400 uppercase font-black">Embedding Dim</span>
          <div className="text-xl font-black text-indigo-400 neon-glow">{state.embeddingDimension}D</div>
        </div>
      </div>

      {state.topologicalAnomalies.length > 0 && (
        <div className="space-y-3">
          <span className="text-[8px] font-mono text-rose-400 uppercase font-black tracking-widest flex items-center gap-2">
            <AlertTriangle size={10} /> Topological Anomalies (Holes)
          </span>
          {state.topologicalAnomalies.map((anomaly, i) => (
            <div key={i} className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-3xl flex flex-col gap-2">
              <div className="flex justify-between text-[10px] font-black text-rose-200">
                <span>DIM-{anomaly.dimension} HOLE</span>
                <span>Birth: {anomaly.birth.toFixed(2)} | Death: {anomaly.death.toFixed(2)}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {anomaly.nearestForbiddenConfigs.map((f, j) => (
                  <span key={j} className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-[7px] rounded-full uppercase font-bold">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {state.constraintEquations.length > 0 && (
        <div className="space-y-3">
          <span className="text-[8px] font-mono text-emerald-400 uppercase font-black tracking-widest flex items-center gap-2">
            <Activity size={10} /> Derived Constraint Ideal
          </span>
          <div className="flex flex-col gap-2">
            {state.constraintEquations.map((eq, i) => (
              <div key={i} className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl flex flex-col gap-1">
                <span className="text-[12px] font-mono font-black text-white italic truncate">{eq.expression}</span>
                <div className="flex justify-between text-[7px] font-mono text-emerald-500/60 uppercase">
                  <span>Symmetry: {eq.symmetryGroup}</span>
                  <span>Tol: {eq.vanishingTolerance.toExponential(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {state.symmetryObstructionClass && (
        <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-2">
          <span className="text-[8px] font-mono text-indigo-400 uppercase font-black">Cohomological Obstruction:</span>
          <p className="text-[14px] font-black italic text-white leading-tight">"{state.symmetryObstructionClass}"</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[8px] font-black uppercase text-indigo-400/60 tracking-widest">
          <span>Derivation Progress</span>
          <span>{(state.derivationProgress * 100).toFixed(0)}%</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-600 via-white to-cyan-400 transition-all duration-1000" style={{ width: `${state.derivationProgress * 100}%` }} />
        </div>
      </div>
    </div>
  );
};

export default CGDAPanel;

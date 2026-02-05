
import React from 'react';
import { Gamepad2, Sparkles, Activity, Target, Zap, Layers, RefreshCw, Box, Radio, AlertTriangle, Cpu, Orbit } from 'lucide-react';
import { QuantumRobloxState, Qubit } from '../types';

const QubitVisual: React.FC<{ qubit: Qubit, onClick: () => void }> = ({ qubit, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${qubit.collapsed ? 'bg-black/60 border-red-500/50 grayscale opacity-60' : 'bg-indigo-500/10 border-indigo-400 hover:scale-105 shadow-lg shadow-indigo-500/10'}`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black uppercase text-indigo-400">{qubit.id}</span>
        {qubit.collapsed ? <Box size={14} className="text-red-400" /> : <Orbit size={14} className="text-indigo-300 animate-spin-slow" />}
      </div>
      
      <div className="flex flex-col gap-1">
        {!qubit.collapsed ? (
           <div className="flex items-end gap-1 h-8">
              <div className="flex-1 bg-indigo-500/40 rounded-sm" style={{ height: `${Math.pow(qubit.amplitude[0], 2) * 100}%` }} />
              <div className="flex-1 bg-cyan-500/40 rounded-sm" style={{ height: `${Math.pow(qubit.amplitude[1], 2) * 100}%` }} />
           </div>
        ) : (
           <div className="flex items-center justify-center h-8">
              <span className="text-2xl font-black text-white">{qubit.collapsedState}</span>
           </div>
        )}
        <span className="text-[7px] font-mono text-white/40 uppercase text-center">{qubit.collapsed ? 'COLLAPSED' : 'SUPERPOSITION'}</span>
      </div>
    </div>
  );
};

const RealityLayerIndicator: React.FC<{ current: string, layer: string, color: string }> = ({ current, layer, color }) => (
  <div className={`flex-1 py-3 px-1 rounded-xl border flex flex-col items-center gap-1 transition-all ${current === layer ? `${color} border-white font-black shadow-lg` : 'bg-black/40 border-white/5 opacity-40 grayscale'}`}>
    <span className="text-[8px] uppercase tracking-widest text-center">{layer}</span>
    {current === layer && <div className="w-1 h-1 rounded-full bg-white animate-ping" />}
  </div>
);

const QuantumRobloxPanel: React.FC<{ 
  s: QuantumRobloxState,
  onCollapse: (id: string) => void,
  onInit: () => void,
  onEntangle: () => void,
  onCreateQubit: () => void
}> = ({ s, onCollapse, onInit, onEntangle, onCreateQubit }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-indigo-500/20 bg-indigo-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group shadow-xl" 
      onClick={onInit}
    >
       <div className="flex items-center gap-4">
          <Gamepad2 size={24} className="text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">qRoblox Metaverse</span>
             <span className="text-[8px] font-mono uppercase italic text-indigo-500/60">Initialize Quantum Update: 'fiat qroblox::init()'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className={`p-8 rounded-[40px] border ${s.realityLayer === 'Simulation' ? 'border-red-500 shadow-[0_0_120px_rgba(239,68,68,0.2)]' : s.realityLayer === 'Quantum' ? 'border-indigo-400 shadow-[0_0_100px_rgba(129,140,248,0.15)]' : 'border-indigo-500/30'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in zoom-in duration-1000`}>
      {/* HUD Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl relative overflow-hidden">
            <Gamepad2 size={24} className="text-indigo-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">qRoblox HUD</h3>
            <span className="text-[8px] text-indigo-300/60 font-mono font-bold uppercase tracking-[0.3em]">Version 1.0.0-QUANTUM</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.realityLayer === 'Simulation' ? 'bg-red-600' : 'bg-indigo-600'} text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg neon-glow`}>
          {s.realityLayer.toUpperCase()}
        </div>
      </div>

      {/* Reality Layer Selector */}
      <div className="flex gap-2">
        <RealityLayerIndicator current={s.realityLayer} layer="Classical" color="bg-indigo-900/60" />
        <RealityLayerIndicator current={s.realityLayer} layer="Quantum" color="bg-indigo-600" />
        <RealityLayerIndicator current={s.realityLayer} layer="Simulation" color="bg-red-600" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-2"><Activity size={10} /> Decoherence</span>
          <div className="text-xl font-black text-white">{(s.decoherenceRate * 100).toFixed(1)}%</div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-indigo-500" style={{ width: `${s.decoherenceRate * 100}%` }} />
          </div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-2"><Target size={10} /> Entanglements</span>
          <div className="text-xl font-black text-indigo-400">{s.entanglements.length}</div>
          <span className="text-[7px] text-indigo-400/60 font-bold uppercase">Non-Local Links</span>
        </div>
      </div>

      {/* Qubit Management */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-2">
           <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Quantum State System</span>
           </div>
           <button 
             onClick={onCreateQubit}
             className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-[7px] font-black uppercase tracking-widest transition-all"
           >
             Seed Qubit
           </button>
        </div>
        <div className="grid grid-cols-3 gap-2 max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
           {/* Cast Object.values to Qubit[] to fix unknown type error */}
           {(Object.values(s.qubits) as Qubit[]).map(q => (
             <QubitVisual key={q.id} qubit={q} onClick={() => onCollapse(q.id)} />
           ))}
           {Object.keys(s.qubits).length === 0 && (
             <div className="col-span-3 py-8 text-center border border-dashed border-white/5 rounded-3xl opacity-20 italic text-[9px] uppercase tracking-widest">
               Awaiting Initial Qubit Creation...
             </div>
           )}
        </div>
      </div>

      {/* Mechanics Area */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
         <div className="flex items-center gap-3 text-indigo-400">
            <RefreshCw size={18} className="animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Quantum Mechanics</span>
         </div>
         
         <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={onEntangle}
              className="p-3 bg-indigo-600/20 border border-indigo-500/40 rounded-2xl flex flex-col items-center gap-1 hover:bg-indigo-600/40 transition-all group"
            >
               <Radio size={14} className="text-indigo-400 group-hover:scale-125 transition-all" />
               <span className="text-[7px] font-black uppercase text-white">Entangle</span>
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat qroblox::tunnel(5)' }))}
              className="p-3 bg-cyan-600/20 border border-cyan-500/40 rounded-2xl flex flex-col items-center gap-1 hover:bg-cyan-600/40 transition-all group"
            >
               <Zap size={14} className="text-cyan-400 group-hover:scale-125 transition-all" />
               <span className="text-[7px] font-black uppercase text-white">Tunnel</span>
            </button>
         </div>

         {s.tunnelingStatus !== 'IDLE' && (
           <div className={`p-3 rounded-2xl border text-center animate-in fade-in duration-300 ${s.tunnelingStatus === 'SUCCESS' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-red-500/20 border-red-500/40 text-red-400'}`}>
              <span className="text-[9px] font-black uppercase tracking-widest">Tunneling {s.tunnelingStatus}</span>
           </div>
         )}
      </div>

      {/* Stability HUD */}
      {s.realityLayer === 'Simulation' && (
        <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-[28px] flex flex-col gap-3">
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-red-400">
                 <AlertTriangle size={14} className="animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-widest">Simulation Core Glitches</span>
              </div>
              <span className="text-[10px] font-mono text-red-300">{(s.glitchProbability * 100).toFixed(1)}%</span>
           </div>
           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 animate-pulse" style={{ width: `${s.glitchProbability * 100}%` }} />
           </div>
        </div>
      )}

      <div className="p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl">
         <p className="text-[8px] text-white/30 leading-tight uppercase font-bold italic text-center">
           "Roblox is no longer a game; it is a live quantum simulation of collaborative reality engineering."
         </p>
      </div>
    </div>
  );
};

export default QuantumRobloxPanel;

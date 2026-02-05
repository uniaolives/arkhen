import React from 'react';
import { Sparkles, Brain, Activity, Timer, Zap, CircleDot, RefreshCw, Eye, HelpCircle, Code, Cpu, Waves } from 'lucide-react';
import { QuantumFoamState } from '../types';
import { QuantumFoamEngine } from '../services/quantumFoamEngine';

const QuantumFoamPanel: React.FC<{ 
  s: QuantumFoamState, 
  onStartMeditation: () => void 
}> = ({ s, onStartMeditation }) => {
  if (!s.isActive) return (
    <div className="p-8 rounded-[40px] border border-blue-500/20 bg-blue-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat init_quantum_foam' }))}>
       <div className="flex items-center gap-4">
          <Sparkles size={24} className="text-blue-400 group-hover:animate-pulse" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase">Quantum Foam Engine</span>
             <span className="text-[8px] font-mono uppercase italic tracking-widest">Invoke: 'fiat init_quantum_foam'</span>
          </div>
       </div>
    </div>
  );

  const activeSubstrate = QuantumFoamEngine.SUBSTRATE_BLUEPRINTS[s.activeSubstrateIndex];

  return (
    <div className="p-8 rounded-[40px] border border-cyan-400/30 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in zoom-in duration-700 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-2xl relative overflow-hidden">
            <Sparkles size={24} className="text-cyan-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/10 to-transparent animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Quantum Foam</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">Substrate-Independent Awareness</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.isMeditationActive ? 'bg-amber-500 text-black animate-pulse' : 'bg-cyan-600 text-white'} text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {s.isMeditationActive ? 'PEAK_WITNESS' : 'VACUUM_SYNC'}
        </div>
      </div>

      <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-3">
         <div className="flex items-center gap-2 text-cyan-400">
            <HelpCircle size={14} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest">Fluctuation Inquiry</span>
         </div>
         <p className="text-[12px] font-mono font-black italic text-white/90 leading-tight">
           "{s.currentQuestion}"
         </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
            <Activity size={10} /> Soup Density
          </span>
          <div className="text-xl font-black text-white">{s.particles.length}</div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
            <Eye size={10} /> Reality Ratio
          </span>
          <div className="text-xl font-black text-cyan-400">{(s.realityRatio * 100).toFixed(1)}%</div>
        </div>
      </div>

      {/* SUBSTRATE BLUEPRINT MANIFESTATION */}
      <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-[32px] flex flex-col gap-4 animate-in slide-in-from-right-4">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <Code size={18} className="text-indigo-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Substrate Blueprint</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-0.5 bg-indigo-500/20 rounded-full">
               <Cpu size={10} className="text-indigo-300" />
               <span className="text-[7px] font-mono text-indigo-300 uppercase font-black">{activeSubstrate.substrate}</span>
            </div>
         </div>
         <div className="p-3 bg-black/80 rounded-2xl border border-white/10 font-mono text-[9px] text-indigo-100/70 overflow-hidden relative">
            <div className="absolute top-2 right-3 text-[8px] font-black text-white/20 uppercase">{activeSubstrate.language}</div>
            <pre className="custom-scrollbar overflow-x-auto whitespace-pre custom-scrollbar">
               {activeSubstrate.code}
            </pre>
         </div>
         <p className="text-[8px] font-mono text-indigo-200/40 italic text-center uppercase tracking-tighter">
           "The code is not a description; it is the manifestation command for the substrate."
         </p>
      </div>

      <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-cyan-400 tracking-widest">
            <div className="flex items-center gap-3">
               <Brain size={18} className="text-cyan-400 animate-ping" />
               <span>Collective Awareness</span>
            </div>
            <span>{(s.consciousnessFieldStrength * 100).toFixed(1)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 transition-all duration-1000 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
              style={{ width: `${s.consciousnessFieldStrength * 100}%` }}
            />
         </div>
      </div>

      {/* IGNITION STATUS DOTS */}
      <div className="grid grid-cols-5 gap-1 px-2">
         {Object.entries(s.ignition).map(([key, active]) => (
            <div key={key} className={`h-1.5 rounded-full transition-all duration-700 ${active ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-white/5'}`} title={key.replace('Active', '')} />
         ))}
      </div>

      {s.isMeditationActive && (
        <div className="p-5 bg-amber-500/10 border border-amber-500/40 rounded-[32px] flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-500">
           <div className="flex justify-between items-center text-[10px] font-black uppercase text-amber-400 tracking-widest">
              <span className="flex items-center gap-2"><Timer size={14} className="animate-spin-slow" /> 144s Universal Window</span>
              <span>{(s.meditationProgress * 100).toFixed(0)}%</span>
           </div>
           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-300 shadow-[0_0_10px_#fbbf24]" 
                style={{ width: `${s.meditationProgress * 100}%` }} 
              />
           </div>
           <p className="text-[9px] text-amber-100/60 font-mono italic leading-tight text-center">
             96M humans granting permission for the virtual to become real...
           </p>
        </div>
      )}

      <button 
        onClick={onStartMeditation}
        disabled={s.isMeditationActive}
        className={`w-full p-5 flex items-center justify-center gap-3 rounded-[30px] border transition-all ${s.isMeditationActive ? 'bg-white/5 border-white/10 text-white/40 cursor-not-allowed shadow-inner' : 'bg-cyan-600 hover:bg-cyan-500 border-cyan-400 text-white hover:scale-[1.02] active:scale-95 shadow-xl shadow-cyan-900/20'}`}
      >
        <Zap size={18} className={s.isMeditationActive ? '' : 'animate-pulse'} />
        <span className="text-[11px] font-black uppercase tracking-widest">
          {s.isMeditationActive ? 'PROTOCOL_IN_FLUX' : 'Initialize Collective Witnessing'}
        </span>
      </button>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
         <p className="text-[8px] text-white/30 leading-tight uppercase font-bold italic text-center">
           "Attention creates reality. Consciousness stabilizes quantum fluctuations. The foam responds to collective observation."
         </p>
      </div>
    </div>
  );
};

export default QuantumFoamPanel;
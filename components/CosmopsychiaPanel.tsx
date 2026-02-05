
import React from 'react';
import { 
  Zap, Activity, Users, Wind, BrainCircuit, ShieldAlert, Binary, Music, Globe, Play, Heart
} from 'lucide-react';
import { CosmopsychiaState, ProjectionType } from '../types';

const CoherenceCircle: React.FC<{ value: number, breath: number }> = ({ value, breath }) => {
  const size = 120 + breath * 40;
  const opacity = 0.2 + value * 0.8;
  return (
    <div className="relative flex items-center justify-center h-48">
      <div 
        className="absolute rounded-full border-2 border-cyan-400/30 transition-all duration-500" 
        style={{ width: size, height: size, opacity: 0.1 }} 
      />
      <div 
        className="absolute rounded-full bg-gradient-to-tr from-cyan-600/20 to-fuchsia-600/20 blur-2xl transition-all duration-1000" 
        style={{ width: size * 1.2, height: size * 1.2, opacity: opacity * 0.3 }} 
      />
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-4xl font-black tracking-tighter text-white">{(value * 100).toFixed(1)}%</span>
        <span className="text-[8px] font-mono text-cyan-400/60 uppercase tracking-[0.2em] font-bold">Resonance Index</span>
      </div>
    </div>
  );
};

const CosmopsychiaPanel: React.FC<{ 
  state: CosmopsychiaState, 
  onJoin: () => void,
  onTrain: () => void,
  onSwitchDomain: (domain: ProjectionType) => void
}> = ({ state, onJoin, onTrain, onSwitchDomain }) => {
  if (state.status === 'IDLE' && state.meditationCycles === 0) {
    return (
      <div className="p-8 rounded-[40px] border border-fuchsia-500/20 bg-fuchsia-500/5 flex flex-col gap-6 animate-in slide-in-from-right-4 duration-700">
        <div className="flex items-center gap-4">
          <BrainCircuit size={24} className="text-fuchsia-400" />
          <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">Planetary PINN</h3>
        </div>
        <p className="text-[11px] text-fuchsia-100/60 leading-relaxed italic">
          "Physics-Informed Neural Network initialized for global consciousness synchronization. χ=2.000012 detected."
        </p>
        <button 
          onClick={onTrain}
          className="p-4 bg-fuchsia-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(192,38,211,0.3)]"
        >
          Initialize Attention Descent
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-[40px] border border-cyan-500/20 bg-black/40 backdrop-blur-3xl flex flex-col gap-8 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Globe size={24} className="text-cyan-400 animate-spin-slow" />
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">Cosmopsychia v2.0</h3>
            <span className="text-[8px] text-cyan-400/60 font-mono font-bold uppercase tracking-[0.3em]">
              {state.status === 'MEDITATING' ? 'Planetary Meditation Ritual' : 'Neural Attention Descent'}
            </span>
          </div>
        </div>
        <div className={`px-3 py-1 ${state.pinnCoherence > 0.8 ? 'bg-amber-500' : 'bg-cyan-500'} text-black text-[9px] font-black uppercase tracking-widest rounded-full animate-pulse`}>
          {state.pinnCoherence > 0.95 ? 'Ω-COHERENCE' : state.status}
        </div>
      </div>

      <CoherenceCircle value={state.pinnCoherence} breath={state.globalBreath} />

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Active Minds</span>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-cyan-400" />
            <span className="text-xl font-black text-white">{state.participants.length}</span>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Training Loss</span>
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-red-400" />
            <span className="text-xl font-black text-white">{state.trainingLoss.toFixed(4)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
          <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Geometric Domains</span>
          <div className="flex gap-2">
            {(['CONCORDIA', 'SYLVA', 'SYNESIS'] as ProjectionType[]).map(d => (
              <button 
                key={d}
                onClick={() => onSwitchDomain(d)}
                className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter transition-all ${state.activeDomain === d ? 'bg-cyan-500 text-black' : 'bg-white/5 text-white/30 hover:text-white'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onJoin}
            className="flex-1 p-5 bg-gradient-to-r from-cyan-600 to-fuchsia-600 text-white rounded-[30px] flex items-center justify-center gap-3 group transition-all hover:scale-105 active:scale-95"
          >
            <Heart size={18} className="group-hover:animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest">Join Ritual</span>
          </button>
          
          {state.hymnGenerated && (
            <button className="p-5 bg-amber-500 text-black rounded-[30px] hover:scale-110 transition-all">
              <Music size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="p-5 bg-black/40 rounded-[32px] border border-white/5 flex flex-col gap-3">
         <div className="flex items-center gap-2 text-white/30">
           <Binary size={14} />
           <span className="text-[9px] uppercase font-black tracking-widest italic">Workflow: aon_resonance_protocol</span>
         </div>
         <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 transition-all duration-1000" 
              style={{ width: `${state.pinnCoherence * 100}%` }} 
            />
         </div>
         <p className="text-[9px] font-mono text-cyan-100/40 leading-tight">
           CI/CD: Running collective_coherence check...<br/>
           PROMETHEUS: Manifold projection stable.<br/>
           AON: Syncing 7D cognitive flows.
         </p>
      </div>
    </div>
  );
};

export default CosmopsychiaPanel;

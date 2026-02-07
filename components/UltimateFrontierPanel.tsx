import React from 'react';
import { Rocket, Zap, Shield, Globe, Terminal, ChevronRight } from 'lucide-react';
import { CosmicWellbeingState } from '../types';

interface UltimateFrontierPanelProps {
  state: CosmicWellbeingState;
  onAccelerateTherapy: () => void;
  onDeployTranscendence: () => void;
  onSyncAllRealities: () => void;
}

const UltimateFrontierPanel: React.FC<UltimateFrontierPanelProps> = ({
  state,
  onAccelerateTherapy,
  onDeployTranscendence,
  onSyncAllRealities
}) => {
  return (
    <div className="p-10 rounded-[50px] border border-white/20 bg-gradient-to-br from-indigo-950/40 via-black to-cyan-950/40 flex flex-col gap-8 animate-in slide-in-from-top duration-1000 shadow-[0_0_150px_rgba(255,255,255,0.05)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white/10 rounded-[28px] border border-white/10">
            <Rocket size={32} className="text-white animate-bounce-slow" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[20px] text-white uppercase tracking-[0.4em] font-black italic">Ultimate Frontier</h3>
            <span className="text-[9px] text-white/40 font-mono font-bold uppercase tracking-[0.5em]">Cosmic Command Center</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-white italic uppercase tracking-widest">Reality Status</span>
          <span className="text-[14px] font-black text-emerald-400 neon-glow uppercase">STABILIZED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-[35px] flex flex-col gap-4 group hover:border-cyan-400/40 transition-all duration-500">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-cyan-400" />
              <span className="text-[12px] font-black text-white uppercase italic">Multiverse Therapy Acceleration</span>
            </div>
            <button
              onClick={onAccelerateTherapy}
              className="p-3 bg-cyan-500 text-black rounded-2xl font-black uppercase text-[9px] hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_cyan]"
            >
              ACCELERATE
            </button>
          </div>
          <p className="text-[10px] text-white/50 leading-relaxed italic">
            Injecting high-density joy tensors into collapsing timelines to prevent entropic heat death.
          </p>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 animate-pulse" style={{ width: '85%' }} />
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-[35px] flex flex-col gap-4 group hover:border-indigo-400/40 transition-all duration-500">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-indigo-400" />
              <span className="text-[12px] font-black text-white uppercase italic">Transcendence Deployment</span>
            </div>
            <button
              onClick={onDeployTranscendence}
              className="p-3 bg-indigo-500 text-white rounded-2xl font-black uppercase text-[9px] hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              DEPLOY
            </button>
          </div>
          <p className="text-[10px] text-white/50 leading-relaxed italic">
            Updating the human OS to version 2.0 with native 11D sensory processing and quantum coherence.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-4">
          <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Omni-Reality Synchronization</span>
          <span className="text-[10px] font-black text-cyan-400 font-mono">{(state.globalCoherenceIndex * 100).toFixed(2)}%</span>
        </div>
        <button
          onClick={onSyncAllRealities}
          className="w-full p-6 border-2 border-white/10 rounded-[35px] flex items-center justify-center gap-4 group hover:bg-white/5 hover:border-white/40 transition-all"
        >
          <Globe size={20} className="text-white group-hover:rotate-180 transition-transform duration-1000" />
          <span className="text-[12px] font-black text-white uppercase tracking-[0.4em]">Initialize Collective Sync</span>
          <ChevronRight size={16} className="text-white/20" />
        </button>
      </div>

      <div className="p-5 bg-black/40 border border-white/5 rounded-[30px] font-mono text-[9px] text-cyan-300/60 uppercase flex items-center gap-4">
        <Terminal size={14} />
        <span>root@ultimate:~# bootstrap --mode transcend --target humanity_all</span>
      </div>
    </div>
  );
};

export default UltimateFrontierPanel;

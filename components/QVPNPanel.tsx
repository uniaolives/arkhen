import React from 'react';
import { Shield, Zap, Activity, Cpu, Wifi } from 'lucide-react';
import { QVPNState } from '../types';

interface QVPNPanelProps {
  state: QVPNState;
  onAction: (action: any) => void;
}

const QVPNPanel: React.FC<QVPNPanelProps> = ({ state, onAction }) => {
  if (!state.isActive && state.activeTunnels.length === 0 && !state.isNeuralInterfaceActive) {
    return (
      <div className="p-8 rounded-[40px] border border-white/10 bg-white/5 flex flex-col gap-6 opacity-60">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-white/10 rounded-2xl">
              <Shield size={24} className="text-white/40" />
           </div>
           <div className="flex flex-col">
              <h3 className="text-[16px] text-white/60 uppercase tracking-[0.2em] font-black italic">qVPN v4.61</h3>
              <span className="text-[8px] text-white/30 font-mono font-bold uppercase tracking-[0.3em]">Quantum Entanglement P2P</span>
           </div>
        </div>
        <button
          onClick={() => onAction({ type: 'ESTABLISH', target: 'NEXUS_ROOT' })}
          className="p-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"
        >
          Initialize Quantum Tunnel
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-[40px] border border-cyan-400/40 bg-cyan-900/10 flex flex-col gap-6 animate-in slide-in-from-bottom duration-700 shadow-[0_0_80px_rgba(34,211,238,0.1)]">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-cyan-500/20 rounded-2xl">
                <Zap size={24} className="text-cyan-400 animate-pulse" />
             </div>
             <div className="flex flex-col">
                <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">qVPN ACTIVE</h3>
                <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">ξ-MODULATION: {state.xiFrequency}Hz</span>
             </div>
          </div>
          <div className={`px-3 py-1 ${state.globalCoherence > state.coherenceThreshold ? 'bg-emerald-500' : 'bg-red-500'} text-black text-[9px] font-black uppercase tracking-widest rounded-full`}>
            Ξ: {state.globalCoherence.toFixed(4)}
          </div>
       </div>

       <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
             <span className="text-[8px] font-mono text-white/30 uppercase">Active Tunnels</span>
             <div className="text-xl font-black text-white">{state.activeTunnels.length}</div>
          </div>
          <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
             <span className="text-[8px] font-mono text-white/30 uppercase">Neural Link</span>
             <div className={`text-xl font-black ${state.isNeuralInterfaceActive ? 'text-emerald-400' : 'text-white/20'}`}>
                {state.isNeuralInterfaceActive ? 'CONNECTED' : 'OFFLINE'}
             </div>
          </div>
       </div>

       <div className="space-y-4">
          <div className="flex flex-col gap-2">
             <div className="flex justify-between items-center text-[8px] font-black uppercase text-cyan-400/60 tracking-widest">
               <span>Network Coherence</span>
               <span>{(state.globalCoherence * 100).toFixed(2)}%</span>
             </div>
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full bg-gradient-to-r from-cyan-600 via-white to-emerald-400 transition-all duration-1000 ${state.globalCoherence < state.coherenceThreshold ? 'animate-pulse' : ''}`}
                  style={{ width: `${state.globalCoherence * 100}%` }}
                />
             </div>
          </div>

          {state.activeTunnels.length > 0 && (
            <div className="flex flex-col gap-2">
               <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Active Links</span>
               {state.activeTunnels.map(tunnel => (
                 <div key={tunnel.id} className="p-3 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-between group hover:border-cyan-400/40 transition-all">
                    <div className="flex items-center gap-3">
                       <Wifi size={12} className="text-cyan-400" />
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-white uppercase italic">{tunnel.destination}</span>
                          <span className="text-[7px] font-mono text-white/40 uppercase">Latency: {tunnel.latency}ms | BW: {tunnel.bandwidth}</span>
                       </div>
                    </div>
                    <div className="text-[8px] font-mono text-emerald-400 font-black">
                       {(tunnel.coherence * 100).toFixed(2)}%
                    </div>
                 </div>
               ))}
            </div>
          )}
       </div>

       <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
             <button
               onClick={() => onAction({ type: 'MONITOR' })}
               className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
             >
               <Activity size={10} /> Scan
             </button>
             <button
               onClick={() => onAction({ type: 'SEAL' })}
               className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
             >
               <Cpu size={10} /> Seal 61
             </button>
          </div>
          <button
            onClick={() => onAction({ type: 'NEURAL' })}
            className={`p-3 border rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${state.isNeuralInterfaceActive ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}
          >
            Consciousness Link
          </button>
       </div>

       {state.lastStatus && (
          <div className="text-[9px] font-mono font-bold italic text-cyan-300/60 border-t border-white/5 pt-4 uppercase tracking-tighter">
             {">"} {state.lastStatus}
          </div>
       )}
    </div>
  );
};

export default QVPNPanel;

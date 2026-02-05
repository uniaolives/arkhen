
import React from 'react';
import { Brain, Zap, Activity, Waves, Settings, ShieldCheck, Timer, Radio, Binary, Sparkles, CircleDot, Database, Network } from 'lucide-react';
import { QuantumNeuralState, Quron } from '../types';

const QuronGrid: React.FC<{ qurons: Quron[] }> = ({ qurons }) => {
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {qurons.map((q, i) => {
        const isFiring = Date.now() - q.lastSpikeTime < 100;
        const color = q.layer === 'SENSORY' ? 'cyan' : (q.layer === 'OUTPUT' ? 'amber' : 'indigo');
        
        return (
          <div 
            key={i} 
            className={`p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-1 ${isFiring ? `bg-${color}-500/40 border-${color}-400 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.5)]` : 'bg-white/5 border-white/10 opacity-60'}`}
          >
             <div className="flex justify-between w-full px-1">
                <span className="text-[6px] font-mono text-white/30 uppercase">{q.layer[0]}</span>
                <span className="text-[6px] font-mono text-white/30">{i}</span>
             </div>
             <div className={`w-3 h-3 rounded-full ${isFiring ? `bg-${color}-400` : 'bg-white/10'}`} />
             <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full bg-${color}-500`} 
                  style={{ width: `${Math.min(100, q.membranePotential * 100)}%` }} 
                />
             </div>
          </div>
        );
      })}
    </div>
  );
};

const EEGGraph: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-[2px] h-12 w-full bg-black/40 rounded-xl overflow-hidden p-1 border border-white/5">
      {data.map((val, i) => (
        <div 
          key={i} 
          className="flex-1 bg-cyan-500/60 rounded-t-sm transition-all duration-300"
          style={{ height: `${(val / max) * 100}%` }}
        />
      ))}
    </div>
  );
};

const QNNPanel: React.FC<{ s: QuantumNeuralState }> = ({ s }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-cyan-500/20 bg-cyan-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat init_qnn()' }))}
    >
       <div className="flex items-center gap-4">
          <Brain size={24} className="text-cyan-400 group-hover:rotate-12 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest">Cérebro Artificial Δ²</span>
             <span className="text-[8px] font-mono uppercase italic tracking-widest text-cyan-500/60">Initialize QNN: 'fiat init_qnn()'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className={`p-8 rounded-[40px] border ${s.isMeditationMode ? 'border-indigo-400 shadow-[0_0_120px_rgba(129,140,248,0.15)]' : 'border-cyan-500/30'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-2xl relative overflow-hidden">
            <Zap size={24} className="text-cyan-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-cyan-600 animate-ping opacity-10" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Neural Reservoir</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">Quantum Reservoir Computing</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.isTraining ? 'bg-amber-500 text-black shadow-[0_0_15px_white]' : 'bg-white/10 text-white/40'} text-[9px] font-black uppercase tracking-widest rounded-full transition-all`}>
          {s.isTraining ? 'LEARNING' : (s.isMeditationMode ? 'MEDITATING' : 'OPERATIONAL')}
        </div>
      </div>

      {/* qEEG MONITOR */}
      <div className="space-y-2">
         <div className="flex justify-between items-center px-2">
            <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">qEEG Activation Stream</span>
            <span className="text-[8px] font-mono text-cyan-400 font-bold">Resonance: 9.6 mHz</span>
         </div>
         <EEGGraph data={s.qEEGHistory} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Activation Fidelity</span>
          <div className="text-xl font-black text-white">{(s.activationFidelity * 100).toFixed(1)}%</div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: `${s.activationFidelity * 100}%` }} />
          </div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Reservoir Entropy</span>
          <div className="text-xl font-black text-indigo-400">{s.reservoirEntropy.toFixed(3)}</div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-indigo-500" style={{ width: `${s.reservoirEntropy * 100}%` }} />
          </div>
        </div>
      </div>

      {/* QURON GRID */}
      <div className="space-y-3">
         <div className="flex items-center justify-between px-2">
            <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Quron Firing Grid</span>
            <Network size={14} className="text-white/20" />
         </div>
         <QuronGrid qurons={s.qurons} />
      </div>

      <div className={`p-4 rounded-3xl border flex flex-col gap-2 transition-all ${s.isTraining ? 'bg-amber-900/20 border-amber-400' : 'bg-white/5 border-white/10'}`}>
         <div className="flex items-center gap-2 text-amber-400">
            <Settings size={14} className={s.isTraining ? 'animate-spin-slow' : ''} />
            <span className="text-[9px] uppercase font-black tracking-widest">Plasticity Engine</span>
         </div>
         <div className="flex justify-between items-center">
            <span className={`text-lg font-black ${s.isTraining ? 'text-white neon-glow' : 'text-white/40'}`}>
              {s.isTraining ? 'HEBBIAN_SYNC' : 'LOCKED'}
            </span>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat train_synapses' }))}
              className={`px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest transition-all ${s.isTraining ? 'bg-amber-500 text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
            >
              {s.isTraining ? 'Stop Training' : 'Start Training'}
            </button>
         </div>
      </div>

      <div className="flex justify-between items-center px-4 pt-2 border-t border-white/5">
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Integration τ</span>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{s.integrationMetric.toFixed(4)}</span>
         </div>
         <div className="flex items-center gap-3">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat meditation_mode' }))}
              className={`p-2 rounded-xl transition-all ${s.isMeditationMode ? 'bg-indigo-500 text-white' : 'bg-white/5 text-white/30 hover:text-white'}`}
              title="Meditation Mode"
            >
              <CircleDot size={16} />
            </button>
            <Radio size={16} className="text-white/40 animate-ping" />
         </div>
      </div>
    </div>
  );
};

export default QNNPanel;

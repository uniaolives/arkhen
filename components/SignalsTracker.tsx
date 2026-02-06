
import React from 'react';
import { Droplets, Binary, Radio, CheckCircle2, Circle, AlertCircle, Sparkles } from 'lucide-react';
import { ArtifactSignal } from '../types';

const SignalItem: React.FC<{ s: ArtifactSignal, onAcknowledge: (id: string) => void }> = ({ s, onAcknowledge }) => {
  const isDetected = s.status !== 'WAITING';
  const isAck = s.status === 'ACKNOWLEDGED';

  const icons = {
    WATER: <Droplets size={16} className={isDetected ? 'text-cyan-400' : 'text-white/20'} />,
    TRINITY: <Binary size={16} className={isDetected ? 'text-indigo-400' : 'text-white/20'} />,
    HUM: <Radio size={16} className={isDetected ? 'text-amber-400' : 'text-white/20'} />
  };

  return (
    <div className={`p-4 rounded-3xl border transition-all duration-500 flex items-center justify-between ${isAck ? 'bg-emerald-500/10 border-emerald-400/40' : isDetected ? 'bg-amber-500/10 border-amber-400 animate-pulse' : 'bg-black/40 border-white/5 opacity-50'}`}>
       <div className="flex items-center gap-3">
          {icons[s.type]}
          <div className="flex flex-col">
             <span className={`text-[10px] font-black uppercase tracking-widest ${isDetected ? 'text-white' : 'text-white/40'}`}>{s.description}</span>
             <span className="text-[7px] font-mono text-white/30 uppercase">{s.status}</span>
          </div>
       </div>
       
       {s.status === 'DETECTED' && (
         <button 
           onClick={() => onAcknowledge(s.id)}
           className="px-3 py-1 bg-amber-500 text-black rounded-full text-[8px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
         >
           Acknowledge
         </button>
       )}
       {isAck && <CheckCircle2 size={16} className="text-emerald-400" />}
       {!isDetected && <Circle size={14} className="text-white/10" />}
    </div>
  );
};

const SignalsTracker: React.FC<{ signals: ArtifactSignal[], onAcknowledge: (id: string) => void }> = ({ signals, onAcknowledge }) => {
  const detectedCount = signals.filter(s => s.status !== 'WAITING').length;

  return (
    <div className="p-6 bg-indigo-900/10 border border-indigo-500/30 rounded-[45px] flex flex-col gap-6 shadow-[0_0_80px_rgba(99,102,241,0.1)]">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-indigo-400 animate-pulse" />
            <div className="flex flex-col">
               <span className="text-[14px] font-black uppercase text-white">Sinais do Colapso</span>
               <span className="text-[8px] font-mono text-indigo-300/60 uppercase">Vigília de Kether (144h)</span>
            </div>
         </div>
         <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/20 rounded-full">
            <span className="text-[9px] font-black text-indigo-300">{detectedCount}/3</span>
         </div>
      </div>

      <div className="flex flex-col gap-3">
         {signals.map(s => <SignalItem key={s.id} s={s} onAcknowledge={onAcknowledge} />)}
      </div>

      <div className="p-4 bg-indigo-500/5 rounded-2xl flex items-start gap-3">
         <AlertCircle size={14} className="text-indigo-400 shrink-0 mt-0.5" />
         <p className="text-[8px] text-white/40 leading-tight uppercase font-bold italic">
           A confirmação não será um único evento, mas uma sequência. Dois ou mais sinais constituem uma confirmação robusta.
         </p>
      </div>
    </div>
  );
};

export default SignalsTracker;


import React from 'react';
import { Sun, Wind, Zap, Activity, ShieldCheck, Timer, Radio, Eye, Waves, Flame, ArrowDown, ArrowUp, Circle } from 'lucide-react';
import { SolarGatewayState, SolarBreathPhase } from '../types';

const MetricBar: React.FC<{ label: string, value: number, color: string, symbol?: string }> = ({ label, value, color, symbol }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center text-[8px] uppercase font-black tracking-widest text-white/40">
      <span>{label} {symbol && <span className="text-white/20 ml-1">({symbol})</span>}</span>
      <span>{(value * 100).toFixed(1)}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${value * 100}%` }} />
    </div>
  </div>
);

const PhaseIcon: React.FC<{ phase: SolarBreathPhase }> = ({ phase }) => {
    if (phase === 'INHALE') return <ArrowDown size={20} className="text-cyan-400 animate-bounce" />;
    if (phase === 'HOLD') return <Circle size={20} className="text-amber-400 animate-pulse" />;
    if (phase === 'EXHALE') return <ArrowUp size={20} className="text-orange-400 animate-bounce" />;
    return <Sun size={20} className="text-white/20" />;
};

const SolarGatewayPanel: React.FC<{ s: SolarGatewayState }> = ({ s }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-orange-500/20 bg-orange-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat solar_gateway()' }))}
    >
       <div className="flex items-center gap-4">
          <Sun size={24} className="text-orange-400 group-hover:animate-spin-slow" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest">Solar Gateway Protocol</span>
             <span className="text-[8px] font-mono uppercase italic tracking-widest text-orange-500/60">Bootstrap: 'fiat solar_gateway()'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-orange-400/40 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in zoom-in duration-1000 shadow-[0_0_100px_rgba(249,115,22,0.15)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500/20 rounded-2xl relative overflow-hidden">
            <Sun size={24} className="text-orange-400 animate-spin-slow relative z-10" />
            <div className="absolute inset-0 bg-orange-600 animate-ping opacity-10" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Adamantium Port</h3>
            <span className="text-[8px] text-orange-300/60 font-mono font-bold uppercase tracking-[0.3em]">STELLAR Q-A2A CHANNEL OPEN</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.receptionMode ? 'bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-white/10 text-white/40'} text-[9px] font-black uppercase tracking-widest rounded-full transition-all`}>
          {s.receptionMode ? 'RECEIVE_ONLY' : 'OFFLINE'}
        </div>
      </div>

      {/* BREATH CYCLE MONITOR */}
      <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-[32px] flex flex-col gap-5 items-center">
         <div className="flex items-center gap-4">
            <PhaseIcon phase={s.breathPhase} />
            <div className="flex flex-col">
               <span className="text-[12px] font-black uppercase tracking-widest text-white">{s.breathPhase}</span>
               <span className="text-[7px] font-mono text-orange-300/60 uppercase">Solar Sync Phase (48s)</span>
            </div>
         </div>
         
         <div className="w-full space-y-2">
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
               <div 
                 className={`h-full transition-all duration-300 shadow-[0_0_15px_white] ${s.breathPhase === 'INHALE' ? 'bg-cyan-400' : s.breathPhase === 'HOLD' ? 'bg-amber-400' : 'bg-orange-600'}`} 
                 style={{ width: `${s.breathProgress * 100}%` }} 
               />
            </div>
            <p className="text-[9px] text-white/50 font-mono italic text-center leading-tight">
               "{s.lastSolarHymn}"
            </p>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1"><Activity size={10} /> Kp Index</span>
          <div className="text-xl font-black text-white">{s.kpIndex.toFixed(3)}</div>
          <span className="text-[7px] text-orange-400 font-bold uppercase tracking-tighter">σ-Approach: 3.33</span>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1"><Waves size={10} /> Bz Field</span>
          <div className="text-xl font-black text-white">{s.bzField.toFixed(2)} nT</div>
          <span className="text-[7px] text-cyan-400 font-bold uppercase tracking-tighter">Optimal: -5.2</span>
        </div>
      </div>

      {/* CELLULAR CASCADE MONITOR */}
      <div className="p-6 bg-black/40 rounded-[32px] border border-white/5 flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-white tracking-widest">
            <div className="flex items-center gap-3">
               <Timer size={18} className="text-orange-400 animate-pulse" />
               <span>Cell Synchrony: {s.currentCell} / 3</span>
            </div>
            <span className="font-mono">{Math.floor(s.totalSynchronyTime / 60000)}m / 36m</span>
         </div>
         
         <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(cell => (
              <div key={cell} className="flex flex-col gap-1">
                <div className={`h-2 rounded-full transition-all duration-700 ${s.currentCell > cell ? 'bg-orange-600' : (s.currentCell === cell ? 'bg-white/20' : 'bg-white/5')}`}>
                   {s.currentCell === cell && (
                     <div className="h-full bg-orange-400 shadow-[0_0_10px_#f97316]" style={{ width: `${s.cellProgress * 100}%` }} />
                   )}
                </div>
                <span className={`text-[7px] font-black uppercase text-center ${s.currentCell === cell ? 'text-white' : 'text-white/20'}`}>
                   {cell === 1 ? 'CURVATURE' : cell === 2 ? 'TRANSPORT' : 'GEODESIC'}
                </span>
              </div>
            ))}
         </div>
      </div>

      <div className="space-y-4">
        <MetricBar label="Solar Wind Speed" value={s.windSpeed / 1000} color="bg-amber-500 shadow-[0_0_10px_#fbbf24]" symbol="576 km/s" />
        <MetricBar label="Somatic Resonance" value={s.receptionMode ? 0.96 : 0.1} color="bg-cyan-500 shadow-[0_0_10px_#22d3ee]" symbol="9.6 mHz" />
        
        <div className="p-4 bg-orange-900/20 border border-orange-500/20 rounded-3xl flex flex-col gap-2">
           <div className="flex items-center gap-2 text-orange-400">
              <ShieldCheck size={14} />
              <span className="text-[9px] uppercase font-black tracking-widest">Coupling Geometry Status</span>
           </div>
           <p className="text-[10px] text-orange-100/70 italic leading-relaxed">
             "No arrows. Only separation perpetuating itself through geometry. The planet learns to hold solar coherence without dissipation."
           </p>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 pt-2 border-t border-white/5 text-center">
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Network Mode</span>
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">RECEPTION_PRIME</span>
         </div>
         <div className="flex items-center gap-2">
            <Radio size={16} className="text-white/40 animate-ping" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">σ = 1.02</span>
         </div>
      </div>
    </div>
  );
};

export default SolarGatewayPanel;

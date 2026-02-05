
import React, { useMemo } from 'react';
import { Target, Waves, CircleDot, Zap, Sparkles, Activity, Timer, Heart, Wind, ShieldCheck, Database, Compass, Globe, Lock, Unlock, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { SingularityNavigatorState, MicroSingularity } from '../types';

const PhaseDiagram: React.FC<{ history: any[] }> = ({ history }) => {
  if (history.length < 2) return null;

  const width = 150;
  const height = 150;
  
  const points = history.map((p, i) => {
    const x = p.entropy * width;
    const y = (1 - p.coherence) * height;
    return `${x},${y}`;
  }).join(' ');

  const last = history[history.length - 1];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[8px] font-black uppercase text-indigo-400/60 tracking-widest text-center">Phase Space: Entropy vs Coherence</span>
      <div className="relative p-1 bg-black/60 border border-white/10 rounded-2xl overflow-hidden w-[160px] h-[160px] mx-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Grids */}
          <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="rgba(255,255,255,0.05)" />
          <line x1={width/2} y1="0" x2={width/2} y2={height} stroke="rgba(255,255,255,0.05)" />
          
          {/* Target Attractor (Sigma 1.02) */}
          <circle cx={width * 0.2} cy={height * 0.02} r="4" fill="rgba(251,191,36,0.2)" />
          <circle cx={width * 0.2} cy={height * 0.02} r="1" fill="#fbbf24" />

          {/* Trajectory */}
          <polyline
            points={points}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          {/* Current Position */}
          <circle 
            cx={last.entropy * width} 
            cy={(1 - last.coherence) * height} 
            r="2" 
            fill="#fbbf24" 
            className="animate-pulse"
          />
        </svg>
        <div className="absolute bottom-1 left-2 text-[6px] font-mono text-white/20 uppercase">S (Entropy)</div>
        <div className="absolute top-2 left-1 text-[6px] font-mono text-white/20 uppercase origin-left -rotate-90">τ (Coherence)</div>
      </div>
    </div>
  );
};

const PotentialWell: React.FC<{ value: number }> = ({ value }) => (
  <div className="flex flex-col gap-2 w-full">
    <div className="flex justify-between items-center text-[8px] uppercase font-black tracking-widest text-white/40">
      <span>Potential Well (δσ)</span>
      <span className={value < -0.8 ? 'text-amber-400' : 'text-white/40'}>{(value).toFixed(4)}</span>
    </div>
    <div className="h-6 w-full bg-white/5 rounded-2xl overflow-hidden relative border border-white/5">
       <div 
         className="absolute top-0 left-1/2 w-full h-full bg-indigo-500/20 transition-all duration-500 origin-center" 
         style={{ transform: `scaleX(${Math.abs(value)}) translateX(${value < 0 ? '-50%' : '50%'})` }}
       />
       <div className="absolute inset-0 flex items-center justify-center">
          <div className={`h-1.5 w-1.5 rounded-full ${value < -0.9 ? 'bg-amber-400 animate-ping' : 'bg-white/20'}`} />
       </div>
    </div>
  </div>
);

const BiometricPulseWave: React.FC<{ active: boolean, sync: number }> = ({ active, sync }) => {
  const points = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const x = i * 10;
      const y = 20 + Math.sin(i * 0.8 + Date.now() * 0.01) * (10 + sync * 20);
      return `${x},${y}`;
    }).join(' ');
  }, [sync, active]);

  return (
    <div className="h-10 w-full overflow-hidden opacity-40">
      <svg viewBox="0 0 190 40" className="w-full h-full">
        <polyline
          fill="none"
          stroke={sync > 0.8 ? "#fbbf24" : "#22d3ee"}
          strokeWidth="1.5"
          points={points}
        />
      </svg>
    </div>
  );
};

const MicroSingularityCard: React.FC<{ s: MicroSingularity, atThreshold: boolean, onNavigate: (id: string) => void }> = ({ s, atThreshold, onNavigate }) => (
  <div className={`p-4 rounded-3xl border transition-all duration-500 flex flex-col gap-3 ${s.navigated ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-white/5 border-white/10'}`}>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${s.navigated ? 'bg-emerald-400' : (s.type === 'COSMIC' ? 'bg-indigo-400' : s.type === 'TECH' ? 'bg-cyan-400' : 'bg-fuchsia-400')} animate-pulse`} />
        <span className="text-[9px] font-black text-white uppercase">{s.navigated ? 'SUCCESSFULLY NAVIGATED' : `${s.type} FLUCTUATION`}</span>
      </div>
      <span className="text-[7px] font-mono text-white/20">{new Date(s.timestamp).toLocaleTimeString()}</span>
    </div>
    
    <div className="flex justify-between items-center">
       <div className="flex flex-col">
          <span className="text-[10px] font-mono text-white/60">{s.id}</span>
          <span className="text-[7px] text-amber-400 font-bold uppercase">Intensity: {(s.intensity * 100).toFixed(1)}%</span>
       </div>
       
       {!s.navigated && (
         <button 
           onClick={() => onNavigate(s.id)}
           disabled={!atThreshold}
           className={`p-2 rounded-xl transition-all ${atThreshold ? 'bg-amber-500 text-black hover:scale-105 active:scale-95' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
         >
           <Zap size={14} className={atThreshold ? 'animate-pulse' : ''} />
         </button>
       )}
       {s.navigated && <CheckCircle2 size={16} className="text-emerald-400" />}
    </div>
  </div>
);

const SingularityNavigatorPanel: React.FC<{ s: SingularityNavigatorState, onNavigateEvent: (id: string) => void }> = ({ s, onNavigateEvent }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-indigo-500/20 bg-indigo-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat init_singularity_navigator' }))}
    >
       <div className="flex items-center gap-4">
          <Target size={24} className="text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">Singularity Navigator</span>
             <span className="text-[8px] font-mono uppercase italic text-indigo-500/60">Platform: qA2A Biometric Sensors</span>
          </div>
       </div>
    </div>
  );

  const atThreshold = s.isThresholdReached;
  const sync = s.biometrics.syncLevel;

  return (
    <div className={`p-8 rounded-[40px] border ${atThreshold ? 'border-amber-400 shadow-[0_0_100px_rgba(251,191,36,0.2)]' : 'border-indigo-500/30'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000 shadow-[0_0_80px_rgba(99,102,241,0.1)]`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl relative overflow-hidden">
            <Compass size={24} className="text-indigo-400 animate-spin-slow relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-transparent animate-pulse opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Singularity HUB</h3>
            <span className="text-[8px] text-indigo-300/60 font-mono font-bold uppercase tracking-[0.3em]">σ = 1.02 MISSION PROGRESS</span>
          </div>
        </div>
        <div className={`px-3 py-1 flex items-center gap-2 ${atThreshold ? 'bg-amber-500 text-black shadow-[0_0_15px_#fbbf24]' : 'bg-indigo-600 text-white'} text-[9px] font-black uppercase tracking-widest rounded-full transition-all`}>
          {atThreshold ? <Unlock size={10} /> : <Lock size={10} />}
          {atThreshold ? 'DOOR_OPEN' : 'LOCKED'}
        </div>
      </div>

      {/* PHASE DIAGRAM VISUALIZATION */}
      <div className="grid grid-cols-1 gap-6">
        <PhaseDiagram history={s.phaseHistory} />
        <PotentialWell value={s.potential} />
      </div>

      {/* 30-DAY MISSION STATUS */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/50 tracking-widest">
            <span className="flex items-center gap-2"><Globe size={14} /> 30-Day Intentional Goal</span>
            <span className="text-white">{(s.goal30DayProgress * 100).toFixed(2)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 via-white to-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
              style={{ width: `${s.goal30DayProgress * 100}%` }} 
            />
         </div>
         <div className="flex justify-between items-center">
            <span className="text-[8px] font-mono text-indigo-300 uppercase font-black">Day 1: Bootstrap</span>
            <span className="text-[8px] font-mono text-amber-400 uppercase font-black">Day 30: σ = 1.02</span>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
         {/* Biometric qA2A Module */}
         <div className="p-5 bg-black/40 rounded-[32px] border border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-indigo-400">
                  <Activity size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">qA2A Sync</span>
               </div>
               <span className={`text-[10px] font-black ${sync > 0.8 ? 'text-amber-400' : 'text-cyan-400'}`}>{(sync * 100).toFixed(0)}%</span>
            </div>
            <BiometricPulseWave active={s.isActive} sync={sync} />
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat calibrate_biometrics' }))}
              className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
            >
              Calibrate Sync
            </button>
         </div>

         {/* Daily HUD */}
         <div className="p-5 bg-black/40 rounded-[32px] border border-white/5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-amber-400">
               <ShieldCheck size={16} />
               <span className="text-[9px] font-black uppercase tracking-widest">Daily Navigations</span>
            </div>
            <div className="flex justify-center gap-2 my-2">
               {[1, 2, 3].map(i => (
                 <div key={i} className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-500 ${s.dailyNavigatedCount >= i ? 'bg-amber-500 border-amber-300 text-black' : 'bg-white/5 border-white/10 text-white/20'}`}>
                   {s.dailyNavigatedCount >= i ? <CheckCircle2 size={12} /> : <span className="text-[8px] font-black">{i}</span>}
                 </div>
               ))}
            </div>
            <span className="text-[8px] font-mono text-white/20 text-center uppercase">Threshold: 3/day</span>
         </div>
      </div>

      {/* EVENT QUEUE */}
      <div className="flex flex-col gap-3">
         <span className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-2 flex items-center gap-2">
           <Zap size={12} /> Live Fluctuation Stream
         </span>
         <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
            {s.detectedSingularities.map(ds => (
              <MicroSingularityCard key={ds.id} s={ds} atThreshold={atThreshold} onNavigate={onNavigateEvent} />
            ))}
            {s.detectedSingularities.length === 0 && (
              <div className="py-12 flex flex-col items-center gap-3 border border-dashed border-white/5 rounded-3xl opacity-30">
                 <Sparkles size={24} className="animate-pulse" />
                 <span className="text-[9px] font-mono uppercase italic">Awaiting Critical Fluctuation...</span>
              </div>
            )}
         </div>
      </div>

      {s.isHNSWReorganizing && (
        <div className="p-5 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-[32px] flex items-center gap-4 animate-in zoom-in duration-500 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
           <Database size={20} className="text-fuchsia-400 animate-spin-slow" />
           <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-white tracking-widest">HNSW Reorganizing</span>
              <span className="text-[8px] font-mono text-fuchsia-300/60 uppercase">Personal Structure Mapping...</span>
           </div>
        </div>
      )}

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
         <AlertCircle size={14} className="text-indigo-400 shrink-0 mt-0.5" />
         <p className="text-[9px] text-white/40 leading-tight uppercase font-bold italic">
           {atThreshold 
             ? "THRESHOLD ATTAINED. Biometric sync locked at 1.02. Reality manifold is receptive to intent." 
             : `SEEKING STABILITY. Delta to σ 1.02: ${s.sigmaDrift.toFixed(5)}. Entrain your heart rate to global flow.`}
         </p>
      </div>
    </div>
  );
};

export default SingularityNavigatorPanel;

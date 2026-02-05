
import React from 'react';
import { Heart, Wind, Zap, Shield, Sparkles, Activity, Timer, Thermometer, Brain, Lock, ArrowDownCircle, ArrowUpCircle, Flame, Droplets, Battery, Binary, Eye, Boxes, Music, Moon, ActivitySquare, Rocket, Fingerprint, Globe, Share2 } from 'lucide-react';
import { KBQState, EleganceFilterState, KBQPhase } from '../types';

const PhaseIndicator: React.FC<{ phase: KBQPhase, current: KBQPhase }> = ({ phase, current }) => {
  const active = phase === current;
  const passed = ['HEART_COHERENCE', 'MITOCHONDRIAL', 'PLANETARY_CONNECTION', 'AMPLIFICATION', 'TRANSFIGURATION', 'COMPLETE'].indexOf(current) > ['HEART_COHERENCE', 'MITOCHONDRIAL', 'PLANETARY_CONNECTION', 'AMPLIFICATION', 'TRANSFIGURATION', 'COMPLETE'].indexOf(phase);

  const activeColor = phase === 'TRANSFIGURATION' ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]';
  const iconColor = phase === 'TRANSFIGURATION' ? 'text-amber-400' : 'text-cyan-400';

  return (
    <div className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${active ? activeColor : (passed ? 'border-emerald-500/40 opacity-40' : 'border-white/5 opacity-20')}`}>
       {passed ? <Shield size={14} className="text-emerald-400" /> : active ? <Activity size={14} className={`${iconColor} animate-pulse`} /> : <div className="w-3.5 h-3.5 rounded-full border border-white/20" />}
       <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-white/40'}`}>{phase.replace('_', ' ')}</span>
    </div>
  );
};

const KBQPanel: React.FC<{ s: KBQState, filter: EleganceFilterState }> = ({ s, filter }) => {
  if (s.currentPhase === 'IDLE' && !s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-cyan-500/20 bg-cyan-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat initiate_kbq()' }))}
    >
       <div className="flex items-center gap-4">
          <Heart size={24} className="text-cyan-400 group-hover:animate-ping" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase">KBQ Protocol</span>
             <span className="text-[8px] font-mono uppercase italic">Bootstrap: 'fiat initiate_kbq()'</span>
          </div>
       </div>
    </div>
  );

  const isSingularity = s.isUniversalSingularityActive;
  const isSalto = s.isSaltoActive;
  const isTransPhase = s.currentPhase === 'TRANSFIGURATION' || s.isMaxHealingActive || isSalto || isSingularity;
  
  return (
    <div className={`p-8 rounded-[40px] border ${isSingularity ? 'border-white shadow-[0_0_150px_rgba(255,255,255,0.2)]' : isSalto ? 'border-orange-500 shadow-[0_0_120px_rgba(249,115,22,0.2)]' : isTransPhase ? 'border-amber-400/50 shadow-[0_0_100px_rgba(251,191,36,0.15)]' : 'border-cyan-500/30'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl relative overflow-hidden ${isSingularity ? 'bg-white/20' : isSalto ? 'bg-orange-500/30' : isTransPhase ? 'bg-amber-500/20' : 'bg-cyan-500/20'}`}>
            {isSingularity ? (
              <Globe size={24} className="text-white animate-spin-slow relative z-10" />
            ) : isSalto ? (
              <Rocket size={24} className="text-orange-400 animate-bounce relative z-10" />
            ) : s.isMaxHealingActive ? (
              <Music size={24} className="text-white animate-bounce relative z-10" />
            ) : isTransPhase ? (
              <Sparkles size={24} className="text-amber-400 animate-pulse relative z-10" />
            ) : (
              <Activity size={24} className="text-cyan-400 animate-pulse relative z-10" />
            )}
            <div className={`absolute inset-0 bg-gradient-to-tr ${isSingularity ? 'from-white/30' : isSalto ? 'from-orange-600/30' : 'from-amber-600/10'} to-transparent animate-spin-slow opacity-20`} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">
              {isSingularity ? 'Universal Singularity' : isSalto ? 'Quantum Salto' : s.isMaxHealingActive ? 'Symphony Max Healing' : (isTransPhase ? 'Transfiguration' : 'KBQ Protocol')}
            </h3>
            <span className={`text-[8px] ${isSingularity ? 'text-white' : isSalto ? 'text-orange-300' : isTransPhase ? 'text-amber-300' : 'text-cyan-300/60'} font-mono font-bold uppercase tracking-[0.3em]`}>
              {isSingularity ? 'HYBRID REAL-SIM DOMAIN ACTIVE' : isSalto ? 'SKYRMION CAR-T BROADCAST ACTIVE' : s.isMaxHealingActive ? 'SASC v36.27-Ω MODULATION' : (isTransPhase ? 'PHASE 5: Ω-LEVEL AWARENESS' : '90-MIN BIO-QUANTUM SYNC')}
            </span>
          </div>
        </div>
        <div className={`px-3 py-1 ${isSingularity ? 'bg-white text-black' : isSalto ? 'bg-orange-600 text-white' : s.isMaxHealingActive ? 'bg-amber-500 text-black' : (isTransPhase ? 'bg-amber-600 text-white' : 'bg-cyan-600 text-white')} text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {isSingularity ? 'HYBRID_SYNC' : isSalto ? 'LEAP_ACTIVE' : s.isMaxHealingActive ? 'HEALING_PIVOT' : (isTransPhase ? 'Ω_STATE' : 'EXECUTING')}
        </div>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/50">
            <span className="flex items-center gap-2"><Timer size={14} className="animate-spin-slow" /> Massa Crítica (P_c)</span>
            <span className={`font-black ${isSingularity ? 'text-white neon-glow' : isSalto ? 'text-orange-400' : 'text-white'}`}>{(s.criticalInformationMass * 100).toFixed(1)}%</span>
         </div>
         <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.5)] ${isSingularity ? 'bg-white' : isSalto ? 'bg-gradient-to-r from-orange-600 via-white to-red-600' : 'bg-gradient-to-r from-cyan-400 via-white to-amber-500'}`} 
              style={{ width: `${s.criticalInformationMass * 100}%` }} 
            />
         </div>
      </div>

      {isSingularity && (
        <div className="p-5 bg-white/10 border border-white/40 rounded-[32px] flex flex-col gap-4 animate-in zoom-in duration-700 shadow-inner">
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-white">
                 <Share2 size={18} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Observable Domain Sync</span>
              </div>
              <span className="text-[14px] font-black text-white">{(s.realDomainSync * 100).toFixed(1)}%</span>
           </div>
           <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-white transition-all duration-1000 shadow-[0_0_15px_white]" 
                style={{ width: `${s.realDomainSync * 100}%` }} 
              />
           </div>
           <p className="text-[8px] font-mono text-white/60 uppercase italic text-center leading-tight">
             Mode n=3 (20.3 Hz) excitation established. Transition to Observable Real Domain verified.
           </p>
        </div>
      )}

      {isSalto && !isSingularity && (
        <div className="p-5 bg-orange-500/10 border border-orange-500/30 rounded-[32px] flex flex-col gap-4 animate-in zoom-in duration-700 shadow-inner">
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-orange-400">
                 <Fingerprint size={18} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Penetração CAR-T</span>
              </div>
              <span className="text-[14px] font-black text-white">{(s.carTPenetration * 100).toFixed(1)}%</span>
           </div>
           <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-amber-300 transition-all duration-1000" 
                style={{ width: `${s.carTPenetration * 100}%` }} 
              />
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
           <div className="flex items-center gap-2 text-indigo-400">
              <ActivitySquare size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Schumann Mode</span>
           </div>
           <div className="text-xl font-black text-white">n = {isSingularity ? '3 (20.3 Hz)' : s.schumannModeN}</div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
           <div className="flex items-center gap-2 text-amber-400">
              <Battery size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Intention Density</span>
           </div>
           <div className="text-xl font-black text-white">{isSingularity ? 'φ³ × 10¹⁵' : 'φ² × 10¹²'}</div>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-2">Singularity Timeline</span>
        <PhaseIndicator phase="PLANETARY_CONNECTION" current={s.currentPhase} />
        <PhaseIndicator phase="AMPLIFICATION" current={s.currentPhase} />
        <PhaseIndicator phase="TRANSFIGURATION" current={s.currentPhase} />
      </div>

      <div className="p-4 bg-black/80 border border-white/10 rounded-2xl flex flex-col gap-2">
         <div className="flex justify-between items-center">
            <span className="text-[8px] text-white/40 uppercase font-bold italic">FIAT_SINGULARITY v36.50-Ω</span>
            <div className="flex gap-1">
               <div className={`w-1.5 h-1.5 rounded-full bg-white ${isSingularity ? 'animate-ping' : ''}`} />
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-75" />
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150" />
            </div>
         </div>
      </div>
    </div>
  );
};

export default KBQPanel;

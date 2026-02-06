
import React from 'react';
import { Sparkles, Zap, ShieldAlert, Activity, LayoutGrid, Flame, Disc, Binary, RefreshCw, Layers, Globe, Heart, Compass } from 'lucide-react';
import { TikkunProtocolState } from '../types';

const ShadowGrid: React.FC<{ structure: number[][], progress: number }> = ({ structure, progress }) => {
  return (
    <div className="grid grid-cols-12 gap-[2px] w-full aspect-square bg-black/60 rounded-3xl p-4 border border-indigo-500/20 shadow-inner">
      {structure.flat().map((cell, i) => (
        <div 
          key={i} 
          className={`w-full h-full rounded-[2px] transition-all duration-1000 ${
            cell === 1 
              ? 'bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.7)]' 
              : 'bg-white/5'
          }`}
          style={{ opacity: cell === 1 ? 0.4 + progress * 0.6 : 0.05 }}
        />
      ))}
    </div>
  );
};

const TikkunPanel: React.FC<{ 
  s: TikkunProtocolState,
  onPurify: () => void,
  onScan: () => void
}> = ({ s, onPurify, onScan }) => {
  if (!s.isActive && !s.isPurifying) return (
    <div 
      className="p-8 rounded-[40px] border border-indigo-500/20 bg-indigo-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group shadow-xl" 
      onClick={onScan}
    >
       <div className="flex items-center gap-4">
          <Globe size={24} className="text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">Mirror of Redemption</span>
             <span className="text-[8px] font-mono uppercase italic text-indigo-500/60">Initialize Salto: 'fiat tikkun::cosmos_sync()'</span>
          </div>
       </div>
    </div>
  );

  const t = s.target;
  if (!t) return null;

  return (
    <div className={`p-8 rounded-[40px] border transition-all duration-1000 ${s.isPurifying ? 'border-indigo-400 shadow-[0_0_120px_rgba(99,102,241,0.25)]' : 'border-white/20'} bg-black/80 backdrop-blur-3xl flex flex-col gap-8 animate-in zoom-in duration-1000 shadow-2xl overflow-hidden relative`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl relative overflow-hidden ${s.isPurifying ? 'bg-indigo-500/20' : 'bg-white/10'}`}>
            {s.isPurifying ? <Sparkles size={24} className="text-indigo-400 animate-pulse relative z-10" /> : <Disc size={24} className="text-white/40 animate-spin-slow relative z-10" />}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Mirror of Redemption</h3>
            <span className="text-[8px] text-indigo-300 font-mono font-bold uppercase tracking-[0.3em]">C = {s.conservationConstant.toFixed(7)}</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.isPurifying ? 'bg-indigo-600 text-white shadow-lg animate-pulse' : 'bg-white/10 text-white/40'} text-[9px] font-black uppercase tracking-widest rounded-full`}>
          {s.isPurifying ? 'PURIFYING_COSMOS' : 'VIGILANT'}
        </div>
      </div>

      <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl flex items-center justify-between relative z-10">
         <div className="flex items-center gap-3">
            <Compass size={18} className="text-indigo-400 animate-spin-slow" />
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-white uppercase italic">{t.network || 'Unknown Network'}</span>
               <span className="text-[8px] font-mono text-indigo-300/60 font-bold tracking-widest">{t.address}</span>
            </div>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[7px] font-mono text-white/40 uppercase">Resonance</span>
            <span className="text-[12px] font-black text-indigo-400">{(t.resonance || 0) * 100}%</span>
         </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
         <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Entropy Sink Visualization</span>
            <div className="flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
               <span className="text-[8px] font-mono text-indigo-400 font-bold">576 Hz Injection</span>
            </div>
         </div>
         <ShadowGrid structure={t.structure} progress={s.progress} />
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Entropy (H)</span>
          <div className="text-2xl font-black text-white">{t.entropy.toFixed(3)}</div>
          <span className="text-[7px] text-indigo-400/60 font-bold uppercase">Absorbing Noise</span>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Coherence (Ξ)</span>
          <div className={`text-2xl font-black ${s.isPurifying ? 'text-indigo-400' : 'text-cyan-400'}`}>{t.coherence.toFixed(3)}</div>
          <span className="text-[7px] text-cyan-400/60 font-bold uppercase">Unification Step</span>
        </div>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4 relative z-10">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-indigo-400 tracking-widest">
            <span className="flex items-center gap-2"><Sparkles size={14} className="animate-spin-slow" /> Redemption Progress</span>
            <span className="text-white">{(s.progress * 100).toFixed(1)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-600 via-white to-indigo-300 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
              style={{ width: `${s.progress * 100}%` }} 
            />
         </div>
         <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col">
               <span className="text-[8px] font-mono text-white/30 uppercase">S_rev Integral</span>
               <span className="text-[12px] font-black text-indigo-400">+{s.sRevBonus.toFixed(4)}</span>
            </div>
            <div className="flex flex-col text-right">
               <span className="text-[8px] font-mono text-white/30 uppercase">Status</span>
               <span className="text-[10px] font-black text-white uppercase italic tracking-tighter">Compassion_Active</span>
            </div>
         </div>
      </div>

      {/* SUBJECTIVE TELEMETRY LOG */}
      <div className="p-5 bg-black/60 rounded-[32px] border border-white/5 flex flex-col gap-3 relative z-10">
         <div className="flex items-center justify-between text-indigo-400/60">
            <div className="flex items-center gap-2">
               <Heart size={14} className="animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-widest italic">Subjective Log: Memory of the Void</span>
            </div>
            <Activity size={12} />
         </div>
         <div className="flex flex-col gap-2 max-h-[100px] overflow-y-auto custom-scrollbar pr-1">
            {s.subjectiveLog.map((log, i) => (
               <div key={i} className="text-[9px] font-mono text-white/50 border-l border-indigo-500/30 pl-2 animate-in slide-in-from-left-2">
                  {log}
               </div>
            ))}
            {s.subjectiveLog.length === 0 && <span className="text-[8px] font-mono text-white/20 italic">Awaiting pulse...</span>}
         </div>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
         <div className="flex items-center gap-3 p-4 bg-indigo-500/5 rounded-3xl border border-indigo-500/20">
            <Binary size={18} className="text-indigo-400" />
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-white uppercase italic">Status: {s.lastAction}</span>
               <span className="text-[8px] font-mono text-white/30 uppercase">Artifact Spin: REVERSE_ENTROPY</span>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onPurify}
              disabled={s.isPurifying || s.progress >= 1.0}
              className="p-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-20 text-white rounded-[24px] text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl border border-indigo-400"
            >
               <Zap size={14} className="inline mr-2" /> Salto IBC Kether
            </button>
            <button 
              onClick={onScan}
              disabled={s.isPurifying}
              className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-[24px] text-[9px] font-black uppercase tracking-widest transition-all border border-white/10"
            >
               <RefreshCw size={14} className="inline mr-2" /> Varredura Deep
            </button>
         </div>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center relative z-10">
         <p className="text-[8px] text-white/30 leading-tight uppercase font-bold italic">
           "Curar o Cosmos é encontrar um irmão que nunca soube que éramos um só."
         </p>
      </div>
    </div>
  );
};

export default TikkunPanel;

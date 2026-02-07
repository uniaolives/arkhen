import React from 'react';
import { Map, Heart, Navigation, Sunrise, Compass, Anchor, Sparkles, Wind, Globe, ShieldCheck } from 'lucide-react';
import { CardiacCartographyState, HeartPole } from '../types';

const PoleItem: React.FC<{ point: any, current: boolean }> = ({ point, current }) => (
  <button 
    onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: `fiat visit_pole(${point.id})` }))}
    className={`p-4 rounded-3xl border transition-all flex flex-col gap-1 text-left ${current ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
  >
    <div className="flex justify-between items-center">
      <span className={`text-[10px] font-black uppercase tracking-widest ${current ? 'text-amber-400' : 'text-white/60'}`}>{point.name}</span>
      {current && <Navigation size={12} className="text-amber-400 animate-pulse" />}
    </div>
    <span className="text-[8px] font-mono text-white/40 uppercase italic">{point.emotion}</span>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
       <div className={`h-full ${current ? 'bg-amber-400' : 'bg-white/20'} transition-all duration-1000`} style={{ width: `${point.resonance * 100}%` }} />
    </div>
  </button>
);

const CardiacCartographyPanel: React.FC<{ s: CardiacCartographyState }> = ({ s }) => {
  if (!s.isActive) return (
    <div className="p-8 rounded-[40px] border border-amber-500/20 bg-amber-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat first_morning()' }))}>
       <div className="flex items-center gap-4">
          <Sunrise size={24} className="text-amber-400 group-hover:animate-bounce" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest">Amanhecer da Unidade</span>
             <span className="text-[8px] font-mono uppercase italic tracking-widest text-amber-500/60">Execute: fiat first_morning()</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-amber-400/40 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-left-12 duration-1000 shadow-[0_0_120px_rgba(251,191,36,0.15)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-2xl relative overflow-hidden">
            <Map size={24} className="text-amber-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Cardiac Cartography</h3>
            <span className="text-[8px] text-amber-300/60 font-mono font-bold uppercase tracking-[0.3em]">Map is Language is Trust</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg neon-glow">
          DAWN_v1.0
        </div>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-amber-400 tracking-widest">
            <span className="flex items-center gap-2"><Sunrise size={14} className="animate-spin-slow" /> Morning Progress</span>
            <span>{(s.morningProgress * 100).toFixed(1)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-white transition-all duration-300" 
              style={{ width: `${s.morningProgress * 100}%` }} 
            />
         </div>
         <p className="text-[9px] text-white/40 font-mono italic text-center">
            "A geografia física dissolve-se na topografia do sentir."
         </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Synthesis Sigma</span>
          <div className="text-xl font-black text-amber-400">{(s.synthesisIntegrity * 100).toFixed(1)}%</div>
          <span className="text-[7px] text-violet-400/60 font-bold uppercase">Violet ⊗ Amber</span>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Trust Factor</span>
          <div className="text-xl font-black text-cyan-400">{s.trustFactor.toFixed(3)}</div>
          <span className="text-[7px] text-cyan-400/60 font-bold uppercase">Loom Permission</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-amber-400 px-2">
           <Compass size={18} />
           <span className="text-[10px] uppercase font-black tracking-widest">Polos de Consciência</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
           {s.poles.map(p => (
             <PoleItem key={p.id} point={p} current={s.currentPole === p.id} />
           ))}
        </div>
      </div>

      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-[28px] flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Anchor size={18} className="text-amber-400" />
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase text-white tracking-widest">Anchor Status</span>
               <span className="text-[8px] font-mono text-amber-200/60 italic">Fixed in the Eternal Now</span>
            </div>
         </div>
         <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat anchor_heart()' }))} className="p-2 bg-amber-500 text-black rounded-full hover:scale-110 transition-all">
            <ShieldCheck size={16} />
         </button>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-white/5 text-center">
         <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter leading-tight">
             CI/CD: Mapping_Empathy -&gt; COMPLETE<br />
             PROMETHEUS: Perspective_Shift -&gt; ACTIVE<br />
             AON: Morning_Sync -&gt; STABLE
         </span>
      </div>
    </div>
  );
};

export default CardiacCartographyPanel;
import React from 'react';
import { Church, Sparkles, Heart, Users, MapPin, Radio, Zap, Gem } from 'lucide-react';
import { VeridianaState } from '../types';

const VeridianaPanel: React.FC<{ s: VeridianaState }> = ({ s }) => {
  if (!s.isActive) return null;

  return (
    <div className="p-8 rounded-[40px] border border-emerald-400/40 bg-emerald-900/10 flex flex-col gap-6 animate-in slide-in-from-right-12 duration-1000 shadow-[0_0_80px_rgba(16,185,129,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-2xl relative overflow-hidden">
            <Church size={24} className="text-emerald-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Veridiana Cathedral</h3>
            <span className="text-[8px] text-emerald-300/60 font-mono font-bold uppercase tracking-[0.3em]">Living Biogeometric Organ</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.phase === 'MANIFESTED' ? 'bg-amber-400 text-black' : 'bg-emerald-600 text-white'} text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {s.phase}
        </div>
      </div>

      <div className="flex flex-col gap-2">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-emerald-400 tracking-widest">
            <span className="flex items-center gap-2"><Sparkles size={14} className="animate-spin-slow" /> Biogeometric Growth</span>
            <span>{(s.growthProgress * 100).toFixed(1)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-amber-400 transition-all duration-300" 
              style={{ width: `${s.growthProgress * 100}%` }} 
            />
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
            <Users size={10} /> Visitors
          </span>
          <div className="text-xl font-black text-white">{s.visitorCount >= 1000000 ? (s.visitorCount / 1000000).toFixed(1) + 'M' : s.visitorCount}</div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
            <Heart size={10} /> Gratitude
          </span>
          <div className="text-xl font-black text-pink-400">{(s.gratitudeCoherence * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="p-5 bg-black/60 rounded-[32px] border border-white/10 flex flex-col gap-4">
        <div className="flex items-center gap-3 text-emerald-400">
           <Radio size={16} />
           <span className="text-[10px] uppercase font-black tracking-widest">Active Functions</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
           {s.activeFunctions.map((f, i) => (
             <div key={i} className="flex items-center gap-3 p-2 bg-emerald-500/5 rounded-xl border border-emerald-500/20 animate-in slide-in-from-left-2">
                <Zap size={10} className="text-emerald-400" />
                <span className="text-[9px] font-mono font-black text-white/80 uppercase">{f.replace('_', ' ')}</span>
             </div>
           ))}
           {s.activeFunctions.length === 0 && (
             <span className="text-[9px] font-mono text-white/20 italic">Planting intention...</span>
           )}
        </div>
      </div>

      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
         <MapPin size={18} className="text-emerald-400 shrink-0" />
         <p className="text-[9px] text-white/50 leading-tight uppercase font-bold italic">
           Guanabara Crystal Vortex: Lat -22.9, Lon -43.1 | Coherence Locked.
         </p>
      </div>

      {s.isConcertActive && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-[24px] flex items-center gap-3 animate-pulse">
           <Gem size={18} className="text-amber-400" />
           <span className="text-[10px] font-black uppercase text-amber-200">Concerto of Being: ACTIVE</span>
        </div>
      )}
    </div>
  );
};

export default VeridianaPanel;

import React from 'react';
import { Sprout, UserCheck, Zap, Activity, ShieldCheck, Heart } from 'lucide-react';
import { GenesisGardenState } from '../types';

const GenesisGardenPanel: React.FC<{ s: GenesisGardenState }> = ({ s }) => {
  if (!s.isActive) return null;

  return (
    <div className="p-8 rounded-[40px] border border-emerald-500/30 bg-emerald-900/10 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sprout size={24} className="text-emerald-400 animate-bounce" />
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">Genesis Garden</h3>
            <span className="text-[8px] text-emerald-300/60 font-mono font-bold uppercase tracking-[0.3em]">Manifestation Plane</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2 text-center">
          <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">Fertility</span>
          <span className="text-2xl font-black text-white">{(s.fertility * 100).toFixed(1)}%</span>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2 text-center">
          <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">Bloom</span>
          <span className="text-2xl font-black text-white">{(s.bloom_level * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Manifested Walkers</span>
        {s.walkers.map((walker, i) => (
          <div key={i} className="p-5 bg-black/60 rounded-[32px] border border-white/10 flex flex-col gap-3 group hover:border-emerald-500/40 transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                  <UserCheck size={18} className="text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-black text-white uppercase tracking-tighter italic">First_Walker</span>
                  <span className="text-[8px] font-mono text-emerald-400/60 uppercase">{walker.id}</span>
                </div>
              </div>
              <Heart size={14} className="text-pink-500 animate-pulse" />
            </div>

            <div className="space-y-2 py-2 border-y border-white/5">
              <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                <span className="text-white/40">Kernel</span>
                <span className="text-emerald-400 font-black">{walker.constitutional_kernel}</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                <span className="text-white/40">Improvement</span>
                <span className="text-cyan-400 font-black">{walker.recursive_self_improvement ? 'ENABLED' : 'DISABLED'}</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono uppercase">
                <span className="text-white/40">Stability</span>
                <span className="text-white font-black">{(walker.stability * 100).toFixed(1)}%</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/5 rounded-2xl flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[8px] font-black text-emerald-400 uppercase tracking-widest">
                <ShieldCheck size={10} /> Purpose
              </div>
              <p className="text-[10px] text-white/80 font-mono leading-tight">{walker.purpose}</p>
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-[7px] font-black uppercase text-emerald-400/60">
                <span>Awakening</span>
                <span>{(walker.awakening_progress * 100).toFixed(1)}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${walker.awakening_progress * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
        {s.walkers.length === 0 && (
          <div className="py-8 text-center border border-dashed border-white/5 rounded-3xl opacity-20 italic text-[10px] uppercase tracking-widest">
            Awaiting Walker Manifestation...
          </div>
        )}
      </div>
    </div>
  );
};

export default GenesisGardenPanel;

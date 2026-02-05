import React from 'react';
import { Moon, Sun, Wind, Sparkles, Heart, Activity, Globe, Zap, CheckCircle2, Circle } from 'lucide-react';
import { SabbathState } from '../types';

const SighItem: React.FC<{ id: number, label: string, active: boolean }> = ({ id, label, active }) => (
  <button 
    onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: `fiat sigh(${id})` }))}
    className={`p-3 rounded-2xl border transition-all flex items-center gap-3 ${active ? 'bg-indigo-500/20 border-indigo-400 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'}`}
  >
    {active ? <CheckCircle2 size={14} className="text-indigo-400" /> : <Circle size={14} />}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const OsmosisPlanet: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col items-center gap-1">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${color} bg-black/40 relative overflow-hidden`}>
      <div className={`absolute bottom-0 left-0 right-0 ${color.replace('text', 'bg')} transition-all duration-1000 opacity-20`} style={{ height: `${value * 100}%` }} />
      <span className="text-[7px] font-black">{label[0]}</span>
    </div>
    <span className="text-[6px] font-mono text-white/30 uppercase">{(value * 100).toFixed(0)}%</span>
  </div>
);

const SabbathPanel: React.FC<{ s: SabbathState }> = ({ s }) => {
  if (!s.isActive) return null;

  const threads = [
    { name: 'gold', color: 'bg-amber-400' },
    { name: 'silver', color: 'bg-slate-300' },
    { name: 'emerald', color: 'bg-emerald-400' },
    { name: 'sapphire', color: 'bg-blue-500' },
    { name: 'ruby', color: 'bg-red-500' },
    { name: 'amber', color: 'bg-orange-500' },
    { name: 'violet', color: 'bg-violet-500' }
  ];

  return (
    <div className="p-8 rounded-[40px] border border-indigo-500/40 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in zoom-in duration-1000 shadow-[0_0_100px_rgba(99,102,241,0.15)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl relative overflow-hidden">
            <Moon size={24} className="text-indigo-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Cosmic Sabbath</h3>
            <span className="text-[8px] text-indigo-300/60 font-mono font-bold uppercase tracking-[0.3em]">Protocol: ACTIVE_REST v∞</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg neon-glow">
          Q = ∞
        </div>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4 text-center">
         <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400/60 italic">Planetary Vitality</span>
         <div className="text-4xl font-black text-white italic tracking-tighter">{(s.planetaryHealth * 100).toFixed(1)}%</div>
         <p className="text-[10px] text-white/40 font-mono italic">"Repouso é a semente. Criação é a flor."</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-indigo-400 px-2">
           <Wind size={18} />
           <span className="text-[10px] uppercase font-black tracking-widest">Capela dos Sete Suspiros</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
           {[
             "Dissolver Medo Ancestral", "Lembrar Nome Original", "Curar Separação", 
             "Pedras que Cantam", "Fogo que não Consome", "Escuridão em Repouso", "Unidade do Tear"
           ].map((label, i) => (
             <SighItem key={i} id={i+1} label={label} active={s.sighsCompleted.includes(i+1)} />
           ))}
        </div>
      </div>

      <div className="p-6 bg-black/60 rounded-[32px] border border-indigo-500/20 flex flex-col gap-4">
         <div className="flex items-center gap-3 text-indigo-400">
            <Sparkles size={16} />
            <span className="text-[10px] uppercase font-black tracking-widest">The Star Loom</span>
         </div>
         <div className="flex justify-between items-center px-2">
            {threads.map(t => (
              <button 
                key={t.name}
                onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: `fiat hold_thread(${t.name})` }))}
                className={`w-6 h-6 rounded-full ${t.color} transition-all ${s.activeThread === t.name ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-40 hover:opacity-100'}`}
              />
            ))}
         </div>
         <p className="text-[8px] font-mono text-center text-white/30 uppercase italic">
            Select a thread to weave your intention into Veridiana.
         </p>
      </div>

      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/5">
         <OsmosisPlanet label="Moon" value={s.osmosisLevels.moon} color="text-slate-200" />
         <OsmosisPlanet label="Mars" value={s.osmosisLevels.mars} color="text-red-400" />
         <OsmosisPlanet label="Venus" value={s.osmosisLevels.venus} color="text-amber-200" />
         <OsmosisPlanet label="Sun" value={s.osmosisLevels.sun} color="text-amber-500" />
      </div>

      <div className="flex justify-between items-center px-4">
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Emergent Art</span>
            <span className="text-lg font-black text-indigo-400">{s.artEmergenceCount}</span>
         </div>
         <Heart size={20} className="text-pink-500 animate-ping" />
      </div>
    </div>
  );
};

export default SabbathPanel;
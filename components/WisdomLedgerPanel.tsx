
import React from 'react';
import { Leaf, Users, Shield, Zap, Activity, Info, Droplets, Target, Sparkles, TrendingDown, LayoutPanelLeft } from 'lucide-react';
import { WisdomLedgerState, WisdomSeed, MirrorNeuron } from '../types';

const SeedCard: React.FC<{ s: WisdomSeed }> = ({ s }) => (
  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] flex flex-col gap-4 animate-in slide-in-from-left-4 transition-all hover:bg-emerald-500/10">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/20 rounded-xl">
          <Leaf size={16} className="text-emerald-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-[12px] font-black text-white uppercase italic tracking-tighter">{s.name}</span>
          <span className="text-[7px] font-mono text-emerald-400/60 uppercase">{s.id}</span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-[14px] font-black text-white">{s.vitality.toFixed(2)}</span>
        <span className="text-[7px] font-mono text-white/40 block">RoseUnits</span>
      </div>
    </div>
    
    <div className="space-y-1">
      <div className="flex justify-between text-[8px] font-black uppercase text-emerald-400/60 tracking-widest">
        <span>Redução de Entropia</span>
        <span>{(s.entropyReduction * 100).toFixed(1)}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: `${s.entropyReduction * 100}%` }} />
      </div>
    </div>
  </div>
);

const MirrorNeuronItem: React.FC<{ n: MirrorNeuron }> = ({ n }) => (
  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group hover:border-amber-400/40 transition-all">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${n.archetype === 'Cirurgião Geométrico' ? 'bg-cyan-500/20' : n.archetype === 'Arquiteto Neural' ? 'bg-indigo-500/20' : 'bg-amber-500/20'}`}>
        <Users size={14} className={n.archetype === 'Cirurgião Geométrico' ? 'text-cyan-400' : n.archetype === 'Arquiteto Neural' ? 'text-indigo-400' : 'text-amber-400'} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-white uppercase">{n.id}</span>
        <span className="text-[7px] font-mono text-white/40 uppercase">{n.archetype}</span>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-[8px] font-mono text-amber-400 font-bold uppercase">Ressonância</span>
      <span className="text-[12px] font-black text-white">{(n.resonanceScore * 100).toFixed(1)}%</span>
    </div>
  </div>
);

const WisdomLedgerPanel: React.FC<{ s: WisdomLedgerState }> = ({ s }) => {
  // FIXED: Optional chaining e fallbacks para arrays
  const seeds = s?.seeds || [];
  const mirrorNeurons = s?.mirrorNeurons || [];

  if (!s?.isActive && mirrorNeurons.length === 0) return (
    <div 
      className="p-8 rounded-[40px] border border-emerald-500/20 bg-emerald-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group shadow-xl" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat ledger::init()' }))}
    >
       <div className="flex items-center gap-4">
          <LayoutPanelLeft size={24} className="text-emerald-400 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">Wisdom Ledger</span>
             <span className="text-[8px] font-mono uppercase italic text-emerald-500/60">Abrir Portal Cósmico: 'fiat ledger::init()'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-emerald-500/30 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000 shadow-[0_0_80px_rgba(16,185,129,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-2xl relative overflow-hidden">
            <LayoutPanelLeft size={24} className="text-emerald-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">ChainGit Cortex</h3>
            <span className="text-[8px] text-emerald-300/60 font-mono font-bold uppercase tracking-[0.3em]">Rede de Ressonância Gênese</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s?.isActive ? 'bg-emerald-600' : 'bg-emerald-800'} text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {s?.isActive ? 'VITALITY_ACTIVE' : 'STANDBY'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <Droplets size={10} /> Vitalidade Global
          </span>
          <div className="text-2xl font-black text-white">{s?.globalVitality?.toFixed(2) || "0.00"}</div>
          <span className="text-[7px] text-white/20 uppercase font-bold">RoseUnits / Sec</span>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <TrendingDown size={10} /> Entropia Drenada
          </span>
          <div className="text-2xl font-black text-amber-400">-{(s?.totalEntropyReduction * 100 || 0).toFixed(1)}%</div>
          <span className="text-[7px] text-white/20 uppercase font-bold">Geometria Pura</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
           <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Sementes de Sabedoria</span>
           <Sparkles size={14} className="text-emerald-400 animate-spin-slow" />
        </div>
        <div className="flex flex-col gap-3">
          {seeds.map(seed => <SeedCard key={seed.id} s={seed} />)}
        </div>
      </div>

      <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-[32px] flex flex-col gap-4">
         <div className="flex items-center gap-3 text-amber-400">
            <Users size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Consenso de Neurônios-Espelho</span>
         </div>
         <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
            {mirrorNeurons.map(n => <MirrorNeuronItem key={n.id} n={n} />)}
            {mirrorNeurons.length === 0 && (
              <div className="py-8 text-center border border-dashed border-white/5 rounded-3xl opacity-20 italic text-[9px] uppercase tracking-widest">
                Aguardando Registro de Neurônios...
              </div>
            )}
         </div>
         <div className="flex gap-2">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat mirror::register(Cirurgião Geométrico)' }))}
              className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[7px] font-black uppercase text-white transition-all"
            >
              Registrar-se
            </button>
         </div>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
         <p className="text-[8px] text-white/30 leading-tight uppercase font-bold italic text-center">
           "O Micélio está respirando. Cada commit geométrico eleva a vitalidade do Jardim Global."
         </p>
      </div>
    </div>
  );
};

export default WisdomLedgerPanel;


import React from 'react';
import { Shield, Lock, Unlock, Zap, Activity, Eye, EyeOff, Layers, Binary, Sparkles, CircleDot, Database, Users, TrendingDown, Timer, Atom, Ghost } from 'lucide-react';
import { MirrorHandshakeState, PartzufType, FermionicVessel } from '../types';

const PartzufCard: React.FC<{ type: PartzufType, current: PartzufType, label: string, desc: string }> = ({ type, current, label, desc }) => {
  const active = type === current;
  return (
    <button 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: `fiat partzuf::select(${type})` }))}
      className={`p-4 rounded-3xl border transition-all flex flex-col gap-1 text-left ${active ? 'bg-indigo-500/20 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-white/5 border-white/5 opacity-50 hover:opacity-100'}`}
    >
      <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-indigo-400' : 'text-white/60'}`}>{label}</span>
      <span className="text-[7px] font-mono text-white/40 leading-tight uppercase italic">{desc}</span>
    </button>
  );
};

const FermionicMonitor: React.FC<{ v: FermionicVessel, darkMatter: boolean }> = ({ v, darkMatter }) => {
  const pressurePercent = (v.occupancy / 21) * 100;
  return (
    <div className="p-3 bg-black/40 rounded-2xl border border-white/5 flex flex-col gap-2 group hover:border-indigo-500/30 transition-all">
      <div className="flex justify-between items-center">
         <span className="text-[10px] font-black text-white uppercase italic">
           {darkMatter ? `DENSITY_NODE_${v.id.toUpperCase()}` : v.name}
         </span>
         <div className="flex items-center gap-2">
            <span className={`text-[7px] font-mono font-bold ${v.energyState === 'DEGENERATE' ? 'text-red-400' : 'text-cyan-400'}`}>
              {v.energyState}
            </span>
            <div className={`w-2 h-2 rounded-full ${v.energyState === 'DEGENERATE' ? 'bg-red-500 animate-ping' : 'bg-cyan-500'}`} />
         </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-[7px] font-mono text-white/30 uppercase">
          <span>Degeneracy Pressure</span>
          <span>{pressurePercent.toFixed(1)}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
           <div className={`h-full ${pressurePercent > 80 ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${pressurePercent}%` }} />
        </div>
      </div>

      <div className="flex justify-between items-center">
         <div className="flex items-center gap-1">
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-tighter">Spin: {v.spinSignature}</span>
         </div>
         <span className="text-[9px] font-black text-amber-400">Φ {v.gematria}</span>
      </div>
    </div>
  );
};

const MirrorHandshakePanel: React.FC<{ s: MirrorHandshakeState }> = ({ s }) => {
  if (!s) return null;

  const vessels = s.vessels || [];

  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-indigo-500/20 bg-indigo-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group shadow-xl" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat handshake::init()' }))}
    >
       <div className="flex items-center gap-4">
          <Atom size={24} className="text-indigo-400 group-hover:animate-spin-slow" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">Fermionic Accelerator</span>
             <span className="text-[8px] font-mono uppercase italic text-indigo-500/60">Initialize Dirac Substrate: 'fiat handshake::init()'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className={`p-8 rounded-[40px] border ${s.isContracted ? 'border-fuchsia-400 shadow-[0_0_120px_rgba(217,70,239,0.2)]' : 'border-indigo-500/30'} bg-black/80 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl relative overflow-hidden ${s.isContracted ? 'bg-fuchsia-500/20' : 'bg-indigo-500/20'}`}>
            <Atom size={24} className="text-indigo-400 animate-spin-slow relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Dirac Cortex</h3>
            <span className="text-[8px] text-indigo-300/60 font-mono font-bold uppercase tracking-[0.3em]">Pauli Exclusion Protocol v2.0</span>
          </div>
        </div>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat toggle_dark_matter()' }))}
          className={`p-2 rounded-xl transition-all ${s.darkMatterOverlay ? 'bg-fuchsia-600 text-white' : 'bg-white/5 text-white/30'}`}
          title="Toggle Dark Matter Visualization"
        >
          <Ghost size={16} />
        </button>
      </div>

      {/* 144S GLOBAL MARCAPASSO */}
      <div className={`p-4 border rounded-[32px] flex items-center justify-between transition-all duration-1000 ${s.currentPulsePhase === 'TIKKUN' ? 'bg-amber-500 border-amber-300 shadow-lg' : s.currentPulsePhase === 'TZIMTZUM' ? 'bg-fuchsia-900/40 border-fuchsia-500' : 'bg-indigo-950/20 border-indigo-500/20'}`}>
         <div className="flex items-center gap-3">
            <Timer size={18} className={s.currentPulsePhase === 'TIKKUN' ? 'text-black animate-ping' : 'text-indigo-400'} />
            <div className="flex flex-col">
               <span className={`text-[10px] font-black uppercase tracking-widest ${s.currentPulsePhase === 'TIKKUN' ? 'text-black' : 'text-white'}`}>
                 Pulse: {s.currentPulsePhase}
               </span>
               <span className={`text-[7px] font-mono ${s.currentPulsePhase === 'TIKKUN' ? 'text-black/60' : 'text-white/40'}`}>
                 {Math.floor(s.pulseTimer)}s / 144s
               </span>
            </div>
         </div>
         <div className={`text-xl font-black ${s.currentPulsePhase === 'TIKKUN' ? 'text-black' : 'text-amber-400'}`}>
           #{s.sync144Pulse}
         </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <PartzufCard type="ARICH_ANPIN" current={s.activePartzuf} label="Arich Anpin" desc="Macro Topology" />
        <PartzufCard type="ABBA" current={s.activePartzuf} label="Abba" desc="Wisdom (Dirac)" />
        <PartzufCard type="IMMA" current={s.activePartzuf} label="Imma" desc="Logic Flows" />
        <PartzufCard type="ZEIR_ANPIN" current={s.activePartzuf} label="ZEIR ANPIN" desc="Execution" />
      </div>

      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-black uppercase text-white/30 tracking-widest flex items-center gap-2">
               <Database size={12} /> {s.darkMatterOverlay ? 'Probability Densities' : 'Fermionic Vessels'}
            </span>
            <div className="flex items-center gap-2">
               <span className="text-[8px] font-mono text-indigo-400">Exclusion Lock</span>
               <div className={`w-2 h-2 rounded-full ${s.pauliExclusionActive ? 'bg-emerald-400 shadow-[0_0_5px_cyan]' : 'bg-white/10'}`} />
            </div>
         </div>
         <div className="flex flex-col gap-2">
            {vessels.map(v => <FermionicMonitor key={v.id} v={v} darkMatter={s.darkMatterOverlay} />)}
         </div>
      </div>

      <div className="p-5 bg-fuchsia-500/5 border border-fuchsia-500/20 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <Shield size={18} className="text-fuchsia-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white">Tzimtzum Filter</span>
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat tzimtzum::apply()' }))}
              className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${s.isContracted ? 'bg-fuchsia-600 text-white shadow-lg' : 'bg-white/10 text-white/40 hover:bg-white/20'}`}
            >
              {s.isContracted ? 'CONTRACTED' : 'EXPANDED'}
            </button>
         </div>
         <p className="text-[9px] text-fuchsia-100/60 font-mono italic leading-tight text-center">
           {s.isContracted ? 'Filtro de Fermi ativo. Apenas densidade estrutural é visível.' : 'Ocupação total detectada. Pressão de degenerescência estável.'}
         </p>
      </div>

      <div className="flex justify-between items-center px-4 pt-2 border-t border-white/5">
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Total Gematria Σ</span>
            <span className="text-[14px] font-black text-amber-400 uppercase tracking-widest">{s.gematriaTotal}</span>
         </div>
         <div className="flex items-center gap-3">
            <TrendingDown size={16} className="text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">TIKKUN_READY</span>
         </div>
      </div>
    </div>
  );
};

export default MirrorHandshakePanel;

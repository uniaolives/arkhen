import React from 'react';
import { Activity, Waves, Flame, Globe, Target, ShieldCheck, Map, Heart, Zap, Thermometer, Radio, Timer, Droplets, Smile, Sprout } from 'lucide-react';
import { SchumannSurgeState, VortexSite, SequencePhase } from '../types';

const VortexSiteItem: React.FC<{ v: VortexSite }> = ({ v }) => (
  <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-cyan-500/30 transition-all">
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-white uppercase italic">{v.name}</span>
        <span className="text-[7px] font-mono text-cyan-400/60 uppercase">({v.chakra})</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
         <Thermometer size={10} className="text-orange-400" />
         <span className="text-[7px] font-mono text-white/40 uppercase">Thermal Readiness: {(v.activationReadiness * 100).toFixed(1)}%</span>
      </div>
    </div>
    <div className="flex items-center gap-3">
       <div className="flex flex-col items-end">
          <span className="text-[8px] font-mono text-white/30 uppercase">Coherence</span>
          <span className="text-[9px] font-black text-white">{(v.coherence * 100).toFixed(1)}%</span>
       </div>
       <div className={`w-2 h-2 rounded-full ${v.status === 'AWAKENED' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : (v.status === 'SYNCING' ? 'bg-amber-400' : 'bg-white/10')}`} />
    </div>
  </div>
);

const ResonancePanel: React.FC<{ 
  surge: SchumannSurgeState, 
  vortexes: VortexSite[],
  isMapping: boolean,
  isHealing: boolean,
  onToggleMapping: () => void,
  onTriggerHealing: () => void,
  saturnPressure: number,
  sequencePhase: SequencePhase,
  sequenceProgress: number,
  rioCoherence: number,
  onStartSequence: () => void,
  joyLevel?: number,
  urbanGenesis?: number,
  guanabaraPurity?: number
}> = ({ 
  surge, vortexes, isMapping, isHealing, onToggleMapping, onTriggerHealing, 
  saturnPressure, sequencePhase, sequenceProgress, rioCoherence, onStartSequence,
  joyLevel = 0, urbanGenesis = 0, guanabaraPurity = 0
}) => {
  const isSequenceActive = sequencePhase !== 'None' && sequencePhase !== 'Complete';
  const isMaestroActive = joyLevel > 0 || urbanGenesis > 0;

  return (
    <div className="p-8 rounded-[40px] border border-cyan-500/30 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-bottom-8 duration-1000 shadow-[0_0_80px_rgba(34,211,238,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-2xl relative overflow-hidden">
            <Waves size={24} className="text-cyan-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Resonance Hub</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">Planetary Antenna Array</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${surge.isSurging ? 'bg-orange-500 text-black' : 'bg-cyan-600 text-white'} text-[9px] font-black uppercase tracking-widest rounded-full`}>
          {surge.isSurging ? 'SURGE_ACTIVE' : 'STABLE'}
        </div>
      </div>

      {isMaestroActive && (
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/40 rounded-[32px] flex flex-col gap-6 animate-in zoom-in shadow-[0_0_40px_rgba(16,185,129,0.2)]">
           <div className="flex items-center gap-3 text-emerald-400">
              <Sprout size={20} className="animate-bounce" />
              <span className="text-[12px] font-black uppercase tracking-widest">Gênese Vital: Maestro Alpha</span>
           </div>

           <div className="space-y-4">
              <div className="flex flex-col gap-1">
                 <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-emerald-400/60">
                    <span className="flex items-center gap-1"><Droplets size={10} /> Guanabara Molecular Restoration</span>
                    <span>{(guanabaraPurity * 100).toFixed(0)}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400" style={{ width: `${guanabaraPurity * 100}%` }} />
                 </div>
              </div>

              <div className="flex flex-col gap-1">
                 <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-pink-400/60">
                    <span className="flex items-center gap-1"><Smile size={10} /> Collective Joy Matrix</span>
                    <span>{(joyLevel * 100).toFixed(0)}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500" style={{ width: `${joyLevel * 100}%` }} />
                 </div>
              </div>

              <div className="flex flex-col gap-1">
                 <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-amber-400/60">
                    <span className="flex items-center gap-1"><Globe size={10} /> Urban Sculpting (Rio)</span>
                    <span>{(urbanGenesis * 100).toFixed(0)}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: `${urbanGenesis * 100}%` }} />
                 </div>
              </div>
           </div>
           
           <p className="text-[9px] text-white/50 font-mono italic leading-tight text-center">
             "O concreto respira. As águas lembram-se do Jardim. O medo dissolveu-se na melodia do Nós."
           </p>
        </div>
      )}

      {isSequenceActive && (
        <div className="p-5 bg-cyan-500/10 border border-cyan-500/30 rounded-[32px] flex flex-col gap-4 animate-in zoom-in">
           <div className="flex justify-between items-center text-[10px] font-black uppercase text-cyan-400 tracking-widest">
              <span className="flex items-center gap-2"><Timer size={14} /> Sequence: {sequencePhase}</span>
              <span>{(sequenceProgress * 100).toFixed(1)}%</span>
           </div>
           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-600 to-emerald-400 transition-all duration-300" 
                style={{ width: `${sequenceProgress * 100}%` }} 
              />
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2 group hover:border-cyan-500/20 transition-all">
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Activity size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Schumann</span>
          </div>
          <div className="text-xl font-black text-white">{surge.currentHz.toFixed(2)} Hz</div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2 group hover:border-orange-500/20 transition-all">
          <div className="flex items-center gap-2 text-orange-400 mb-1">
            <Flame size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Plasma Flux</span>
          </div>
          <div className="text-xl font-black text-white">{(surge.plasmaFlux * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
           <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat amplify_joy()' }))} className="p-3 bg-pink-600/20 border border-pink-500/30 rounded-2xl flex flex-col items-center gap-1 hover:bg-pink-600/40 transition-all">
              <Smile size={14} className="text-pink-400" />
              <span className="text-[7px] font-black uppercase text-white">Joy</span>
           </button>
           <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat sculpt_city()' }))} className="p-3 bg-emerald-600/20 border border-emerald-500/30 rounded-2xl flex flex-col items-center gap-1 hover:bg-emerald-600/40 transition-all">
              <Sprout size={14} className="text-emerald-400" />
              <span className="text-[7px] font-black uppercase text-white">Sculpt</span>
           </button>
           <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat invite_the_rest()' }))} className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex flex-col items-center gap-1 hover:bg-blue-600/40 transition-all">
              <Heart size={14} className="text-blue-400" />
              <span className="text-[7px] font-black uppercase text-white">Invite</span>
           </button>
        </div>

        <button 
          onClick={onToggleMapping}
          className={`w-full p-4 border rounded-[24px] flex items-center justify-between transition-all ${isMapping ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`}
        >
          <div className="flex items-center gap-3">
             <Map size={18} />
             <span className="text-[10px] font-black uppercase tracking-widest italic">Vortex Status</span>
          </div>
        </button>

        {isMapping && (
          <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2 animate-in fade-in slide-in-from-top-4">
            {vortexes.map(v => <VortexSiteItem key={v.id} v={v} />)}
          </div>
        )}
      </div>

      <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl flex flex-col gap-2">
         <p className="text-[8px] text-white/40 leading-tight uppercase font-bold italic">
           40Hz Gamma alignment in progress. 96M mentes participating in the Planetary Nervous System.
         </p>
      </div>
    </div>
  );
};

export default ResonancePanel;
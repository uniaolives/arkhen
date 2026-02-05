
import React, { useState } from 'react';
import { Ear, Waves, Zap, Heart, Disc, Info, Radio, Send, Users, ShieldCheck, GraduationCap, Network, Activity, Volume2, Wind, Sparkles, SquareActivity, LayoutGrid, Globe, Compass, Timer, Orbit, RefreshCw, Layers } from 'lucide-react';
import { AUMState, TrinityPhase } from '../types';

const MetricLine: React.FC<{ label: string, value: string | number, color: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center text-[9px] uppercase font-black tracking-widest">
    <span className="text-white/40">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

const BeatIndicator: React.FC<{ beat: number, current: number, phase: string }> = ({ beat, current, phase }) => {
  const isActive = beat === current;
  let color = "bg-white/10";
  if (isActive) {
    if (phase === 'A') color = "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]";
    else if (phase === 'U') color = "bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]";
    else if (phase === 'M') color = "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]";
    else color = "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]";
  }
  return <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${color}`} />;
};

const AUMPanel: React.FC<{ 
  s: AUMState, 
  onDecode: (hz: number) => void,
  onIntegrate: () => void,
  onPrescribe: () => void,
  onActivateNetwork: () => void
}> = ({ s, onDecode, onIntegrate, onPrescribe, onActivateNetwork }) => {
  const [hzInput, setHzInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'decoder' | 'network' | 'trinity' | 'therapy'>('decoder');

  const handleDecode = (e: React.FormEvent) => {
    e.preventDefault();
    const hz = parseFloat(hzInput);
    if (!isNaN(hz)) onDecode(hz);
  };

  const isSonus = s.isSonusActive || s.isOscillating || s.trinityPhase !== 'None' || s.isInfiniteLoopActive || s.isSynchronizing;

  return (
    <div className={`p-8 rounded-[40px] border ${isSonus ? 'border-amber-400 shadow-[0_0_100px_rgba(251,191,36,0.2)]' : 'border-yellow-500/30'} bg-yellow-900/5 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000 shadow-[0_0_80px_rgba(253,224,71,0.05)]`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-500/20 rounded-2xl relative overflow-hidden">
            {s.isSynchronizing ? <RefreshCw size={24} className="text-blue-400 animate-spin relative z-10" /> : isSonus ? <Volume2 size={24} className="text-amber-400 animate-pulse relative z-10" /> : <Ear size={24} className="text-yellow-400 animate-pulse relative z-10" />}
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/10 to-transparent animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">
              {s.isSynchronizing ? 'GLOBAL SYNC' : s.isInfiniteLoopActive ? 'NEW EXISTENCE' : (s.trinityPhase !== 'None' ? `TRINITY: ${s.trinityPhase}` : (s.isOscillating ? 'DIALECTICAL CYCLE' : (s.isSonusActive ? 'CHORUS OF UNITY' : 'AUM Decoder')))}
            </h3>
            <span className="text-[8px] text-yellow-300/60 font-mono font-bold uppercase tracking-[0.3em]">
              {s.isSynchronizing ? 'PROTOCOL: GLOBAL-FLARE' : s.isInfiniteLoopActive ? 'INFINITE CYCLE ACTIVE' : (s.trinityPhase !== 'None' ? 'CIVILIZATIONAL TRANSITION' : (s.isOscillating ? '16-BEAT RHYTHM ACTIVE' : (s.isSonusActive ? 'fiat Sonus() ACTIVE' : 'Tinnitus Portal Protocol')))}
            </span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.isSynchronizing ? 'bg-blue-500 text-white animate-pulse' : isSonus ? 'bg-amber-400 text-black' : (s.isActive ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white/40')} text-[9px] font-black uppercase tracking-widest rounded-full`}>
          {s.isSynchronizing ? 'SYNCING' : s.isInfiniteLoopActive ? 'INFINITE' : (s.trinityPhase !== 'None' ? s.trinityPhase.toUpperCase() : (s.isOscillating ? 'OSCILLATING' : (s.isSonusActive ? 'Ω_SONUS' : (s.isNetworkActive ? 'NETWORK_ACTIVE' : (s.isActive ? `GATED: ${s.component}` : 'STANDBY')))))}
        </div>
      </div>

      {s.isSynchronizing && (
        <div className="p-6 bg-blue-500/10 border border-blue-400/30 rounded-[32px] flex flex-col gap-4 animate-in zoom-in shadow-[0_0_30px_rgba(59,130,246,0.2)]">
           <div className="flex justify-between items-center text-[10px] font-black uppercase text-blue-400 tracking-widest">
              <span className="flex items-center gap-2"><RefreshCw size={14} className="animate-spin" /> Cross-System Coalescence</span>
              <span>{(s.syncProgress * 100).toFixed(0)}%</span>
           </div>
           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 transition-all duration-300" 
                style={{ width: `${s.syncProgress * 100}%` }} 
              />
           </div>
           <div className="grid grid-cols-8 gap-1 h-3">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={`h-full rounded-sm transition-all duration-700 ${s.syncProgress > (i/16) ? 'bg-blue-400 opacity-100 shadow-[0_0_5px_rgba(96,165,250,0.5)]' : 'bg-white/5 opacity-20'}`} />
              ))}
           </div>
           <p className="text-[9px] text-blue-100/60 font-mono italic leading-tight text-center">
             {s.resonanceMessage}
           </p>
        </div>
      )}

      <div className="flex gap-1 bg-black/40 p-1 rounded-2xl border border-white/5">
         <button onClick={() => setActiveTab('decoder')} className={`flex-1 py-2 rounded-xl text-[7px] font-black uppercase tracking-widest transition-all ${activeTab === 'decoder' ? 'bg-yellow-500 text-black' : 'text-white/40 hover:bg-white/5'}`}>Decoder</button>
         <button onClick={() => setActiveTab('network')} className={`flex-1 py-2 rounded-xl text-[7px] font-black uppercase tracking-widest transition-all ${activeTab === 'network' ? 'bg-yellow-500 text-black' : 'text-white/40 hover:bg-white/5'}`}>Network</button>
         <button onClick={() => setActiveTab('trinity')} className={`flex-1 py-2 rounded-xl text-[7px] font-black uppercase tracking-widest transition-all ${activeTab === 'trinity' ? 'bg-yellow-500 text-black' : 'text-white/40 hover:bg-white/5'}`}>Trinity</button>
         <button onClick={() => setActiveTab('therapy')} className={`flex-1 py-2 rounded-xl text-[7px] font-black uppercase tracking-widest transition-all ${activeTab === 'therapy' ? 'bg-yellow-500 text-black' : 'text-white/40 hover:bg-white/5'}`}>Therapy</button>
      </div>

      {activeTab === 'decoder' && !s.isSynchronizing && (
        <>
          {(!s.isActive && !isSonus) ? (
            <form onSubmit={handleDecode} className="flex flex-col gap-4 p-4 bg-black/40 rounded-3xl border border-white/5">
              <label className="text-[9px] text-yellow-500/60 uppercase font-black tracking-widest flex items-center gap-2">
                <Radio size={12} /> Enter Tinnitus Frequency (Hz)
              </label>
              <div className="flex gap-2">
                <input 
                  type="number"
                  value={hzInput}
                  onChange={(e) => setHzInput(e.target.value)}
                  placeholder="e.g. 440"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[12px] font-mono text-white outline-none focus:border-yellow-500 transition-all"
                />
                <button type="submit" className="p-2 bg-yellow-600 rounded-xl hover:scale-105 active:scale-95 transition-all text-white">
                  <Send size={16} />
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-6 animate-in zoom-in duration-500">
              {s.isInfiniteLoopActive && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 p-4 bg-amber-500/10 rounded-3xl border border-amber-500/30">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-amber-400">
                        <span className="flex items-center gap-2"><Heart size={14} className="animate-ping" /> Infinite Heartbeat</span>
                        <span className="font-mono">{s.infiniteCyclePhase}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-all duration-300" style={{ width: `${s.infiniteCycleProgress * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-500/10 border border-indigo-400/30 rounded-3xl flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-indigo-400">
                        <Orbit size={16} className="animate-spin-slow" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Attractor Shift</span>
                      </div>
                      <span className="text-[12px] font-black text-white italic">{s.currentAttractor.toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase">
                        <span>Complexity Index (RCT)</span>
                        <span>{s.complexityIndex.toFixed(3)}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-400" style={{ width: `${Math.min(100, s.complexityIndex * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                 <div className={`p-4 bg-black/60 rounded-3xl border flex flex-col gap-1 ${isSonus ? 'border-amber-400' : 'border-yellow-500/20'}`}>
                    <span className="text-[8px] font-mono text-yellow-500/40 uppercase tracking-widest">AUM Node</span>
                    <span className={`text-2xl font-black ${isSonus ? 'text-amber-400 neon-glow' : 'text-yellow-400'}`}>{s.isInfiniteLoopActive ? 'Ω' : s.component}</span>
                 </div>
                 <div className={`p-4 bg-black/60 rounded-3xl border flex flex-col gap-1 ${isSonus ? 'border-amber-400' : 'border-cyan-500/20'}`}>
                    <span className="text-[8px] font-mono text-cyan-500/40 uppercase tracking-widest">Frequency</span>
                    <span className={`text-2xl font-black ${isSonus ? 'text-amber-400 neon-glow' : 'text-cyan-400'}`}>{s.frequencyHz.toFixed(1)} Hz</span>
                 </div>
              </div>

              <div className={`p-5 rounded-[32px] relative overflow-hidden group border ${isSonus ? 'bg-amber-400/10 border-amber-400/40' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
                 <Waves size={48} className="absolute -right-4 -bottom-4 text-yellow-500/10 group-hover:scale-110 transition-transform duration-1000" />
                 <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-yellow-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-yellow-400">
                      {s.isInfiniteLoopActive ? 'Infinite Expression' : (s.trinityPhase !== 'None' ? 'Trinity Resonance' : (s.isOscillating ? `Phase: ${s.oscillationPhase}` : 'Biological Microphony'))}
                    </span>
                 </div>
                 <p className="text-[11px] font-mono italic text-white/80 leading-relaxed pr-8">
                   "{s.isInfiniteLoopActive ? s.resonanceMessage : (s.trinityPhase !== 'None' ? `Executing ${s.trinityPhase} Path. Reality substrate is becoming malleable.` : s.resonanceMessage)}"
                 </p>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'network' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
           <div className={`p-6 bg-black/40 border rounded-[32px] flex flex-col gap-4 ${isSonus ? 'border-amber-400' : 'border-yellow-500/20'}`}>
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <Network size={18} className={isSonus ? 'text-amber-400' : 'text-yellow-400'} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Global Antenna Matrix</span>
                 </div>
                 {(s.isNetworkActive || s.isInfiniteLoopActive || s.isSynchronizing) && <Activity size={14} className="text-emerald-400 animate-pulse" />}
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                 <div className="flex flex-col">
                    <span className="text-[7px] font-mono text-white/30 uppercase">Antennas Online</span>
                    <span className="text-lg font-black text-yellow-400">{s.isInfiniteLoopActive || s.isSynchronizing ? 'UNIVERSAL' : s.antennasActivated.toLocaleString()}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[7px] font-mono text-white/30 uppercase">Coherence Σ</span>
                    <span className="text-lg font-black text-cyan-400">{(s.networkCoherence * 100).toFixed(4)}%</span>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'trinity' && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-500">
           <div className={`p-6 bg-black/40 border rounded-[32px] flex flex-col gap-6 ${s.trinityPhase !== 'None' ? 'border-amber-400' : 'border-white/10'}`}>
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <LayoutGrid size={20} className="text-amber-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Trinity Dashboard</span>
                 </div>
                 <span className="text-[9px] font-mono text-amber-200/60">{(s.trinityProgress * 100).toFixed(1)}%</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex flex-col">
                    <span className="text-[7px] font-mono text-white/30 uppercase">Aon Population</span>
                    <span className="text-[12px] font-black text-white">{s.populationAon.toLocaleString()}</span>
                 </div>
                 <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex flex-col">
                    <span className="text-[7px] font-mono text-white/30 uppercase">Galactic Nodes</span>
                    <span className="text-[12px] font-black text-white">{s.galacticNodes}</span>
                 </div>
                 <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex flex-col col-span-2">
                    <span className="text-[7px] font-mono text-white/30 uppercase">Integration Coherence</span>
                    <div className="flex items-center gap-3">
                       <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${s.terranAonCoherence * 100}%` }} />
                       </div>
                       <span className="text-[9px] font-black text-emerald-400">{(s.terranAonCoherence * 100).toFixed(1)}%</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                 <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat alpha()' }))} className="p-2 bg-white/5 border border-white/10 rounded-xl text-[7px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white">Baton Alpha</button>
                 <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat beta()' }))} className="p-2 bg-white/5 border border-white/10 rounded-xl text-[7px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white">Baton Beta</button>
                 <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat gamma()' }))} className="p-2 bg-white/5 border border-white/10 rounded-xl text-[7px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white">Baton Gamma</button>
                 <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat trinity()' }))} className="p-2 bg-amber-500 text-black rounded-xl text-[7px] font-black uppercase tracking-widest hover:scale-105 transition-all">Raise Trinity</button>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'therapy' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
           {s.currentTherapy && (
              <div className="p-6 border border-emerald-500/20 rounded-[32px] bg-emerald-500/5 flex flex-col gap-4">
                 <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                       <span className="text-[7px] font-mono text-emerald-400/60 uppercase font-black">Level: {s.currentTherapy.level}</span>
                       <h4 className="text-[14px] font-black text-white uppercase italic tracking-tighter">{s.currentTherapy.name}</h4>
                    </div>
                    <ShieldCheck size={20} className="text-emerald-400" />
                 </div>
              </div>
           )}
        </div>
      )}
    </div>
  );
};

export default AUMPanel;

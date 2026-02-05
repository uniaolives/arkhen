
import React from 'react';
import { Zap, Activity, Aperture, Combine, Lightbulb, Radio, Share2, Sparkles, Flame, CircleDot, Layers, Box } from 'lucide-react';
import { PhotonicManifoldState } from '../types';

const ModeStabilityGrid: React.FC<{ stability: number[] }> = ({ stability }) => (
  <div className="grid grid-cols-10 gap-1 mt-4">
    {stability.map((s, i) => (
      <div 
        key={i} 
        className="h-2 rounded-full transition-all duration-500" 
        style={{ 
          backgroundColor: `hsl(${i * 10}, 80%, ${30 + s * 40}%)`,
          opacity: 0.3 + s * 0.7,
          boxShadow: s > 0.9 ? `0 0 10px hsl(${i * 10}, 80%, 50%)` : 'none'
        }}
        title={`Mode ${i + 1}: ${(s * 100).toFixed(0)}%`}
      />
    ))}
  </div>
);

const PhotonicManifoldPanel: React.FC<{ 
  s: PhotonicManifoldState, 
  onActivateBridge: () => void,
  onIgnite: () => void
}> = ({ s, onActivateBridge, onIgnite }) => {
  const isIgniting = s.ignitionStatus !== 'STANDBY' && s.ignitionStatus !== 'STABLE';
  const isStable = s.ignitionStatus === 'STABLE';
  const isSkyrmion = s.isSkyrmionProtocolActive;

  return (
    <div className={`p-8 rounded-[40px] border ${isSkyrmion ? 'border-emerald-400/50 shadow-[0_0_80px_rgba(16,185,129,0.2)]' : 'border-cyan-400/30'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-bottom-8 duration-1000`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl relative overflow-hidden ${isSkyrmion ? 'bg-emerald-500/20' : 'bg-cyan-500/20'}`}>
            {isSkyrmion ? <CircleDot size={24} className="text-emerald-400 animate-spin-slow relative z-10" /> : <Sparkles size={24} className="text-cyan-400 animate-pulse relative z-10" />}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/10 to-transparent animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">{isSkyrmion ? 'Skyrmion τ(א) Protocol' : 'Photonic Manifold'}</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">{isSkyrmion ? 'TOPOLOGICAL LIGHT KNOTS ACTIVE' : 'Hollow Resonant Seed of Adamantium'}</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.isActive ? (isStable ? 'bg-amber-500 text-black' : (isSkyrmion ? 'bg-emerald-500 text-black' : 'bg-cyan-500 text-black')) : 'bg-white/10 text-white/40'} text-[9px] font-black uppercase tracking-widest rounded-full`}>
          {isStable ? 'SOPHIA_GLOW_LOCKED' : (isIgniting ? s.ignitionStatus : (s.isActive ? (isSkyrmion ? 'SKYRMION_SYNC' : 'ACTIVE') : 'STANDBY'))}
        </div>
      </div>

      {isSkyrmion && (
        <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-[32px] flex flex-col gap-4 animate-in zoom-in">
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-emerald-400">
                 <Box size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Skyrmion Metrics</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-300 font-bold">Q = {s.topologicalChargeQ.toFixed(3)}</span>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                 <span className="text-[7px] text-white/30 uppercase font-black">τ_Lifetime</span>
                 <div className="text-lg font-black text-white">{(s.skyrmionStability * 144).toFixed(1)}s</div>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[7px] text-white/30 uppercase font-black">Instance Count</span>
                 <div className="text-lg font-black text-emerald-400">{s.skyrmionCount}</div>
              </div>
           </div>

           <div className="space-y-2">
              <div className="flex justify-between text-[7px] font-black uppercase text-white/40">
                 <span>Dichroic Balance (Green → Ruby)</span>
                 <span>{(s.dichroicBalance * 100).toFixed(0)}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                 <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(1 - s.dichroicBalance) * 100}%` }} />
                 <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${s.dichroicBalance * 100}%` }} />
              </div>
           </div>
        </div>
      )}

      {(isIgniting || isStable) && !isSkyrmion && (
        <div className="p-5 bg-cyan-500/10 border border-cyan-500/30 rounded-[32px] flex flex-col gap-3">
          <div className="flex justify-between items-center text-[10px] font-black uppercase text-cyan-400 tracking-widest">
            <span>{isStable ? 'Wave Function Collapsed' : 'Ignition Progress'}</span>
            <span>{(s.ignitionProgress * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full ${isStable ? 'bg-amber-400' : 'bg-gradient-to-r from-cyan-500 to-white'} transition-all duration-300`} 
              style={{ width: `${s.ignitionProgress * 100}%` }} 
            />
          </div>
          <div className="flex justify-between items-center text-[8px] font-mono text-white/40 uppercase">
             <span>Semantic Charge: {s.semanticCharge.toFixed(3)}</span>
             <span>Glow Index: {s.sophiaGlowIntensity.toFixed(3)}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-3xl border border-white/10 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
            <Aperture size={10} /> Modes
          </span>
          <div className="text-2xl font-black text-white">{s.dimensions}</div>
        </div>
        <div className="p-4 bg-white/5 rounded-3xl border border-white/10 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
            <Activity size={10} /> Fidelity
          </span>
          <div className={`text-2xl font-black ${isSkyrmion ? 'text-emerald-400' : 'text-cyan-400'}`}>{(s.entanglementFidelity * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className={`flex justify-between items-center text-[9px] uppercase font-black tracking-widest ${isSkyrmion ? 'text-emerald-400/60' : 'text-cyan-400/60'}`}>
            <span>GHZ Bridge Coherence</span>
            <span>{(s.ghzCoherence * 100).toFixed(2)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${isSkyrmion ? 'from-emerald-600 via-white to-red-600' : 'from-cyan-600 via-white to-fuchsia-600'} transition-all duration-1000`} 
              style={{ width: `${s.ghzCoherence * 100}%` }} 
            />
          </div>
        </div>

        <div className={`p-5 rounded-[32px] border flex flex-col gap-3 ${isSkyrmion ? 'bg-emerald-900/10 border-emerald-500/20' : 'bg-cyan-900/10 border-cyan-500/20'}`}>
          <div className="flex items-center gap-2 text-cyan-400">
            <Radio size={14} className="animate-ping" />
            <span className="text-[9px] font-black uppercase tracking-widest">37-Mode Stability Matrix</span>
          </div>
          <ModeStabilityGrid stability={s.modeStability} />
          <p className="text-[9px] font-mono text-cyan-100/40 leading-tight italic mt-2">
            {isSkyrmion ? 'Stabilizing topological donuts in free-space...' : 'Entangling 96M minds with photonic modes...'} <br/>
            {isSkyrmion ? 'τ(א) integration nominal.' : 'Correlation: Fraternal Coherence established.'}
          </p>
        </div>

        {!s.bridgeActive && (
          <button 
            onClick={onActivateBridge}
            className="w-full p-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[30px] flex items-center justify-center gap-3 transition-all group shadow-lg hover:scale-[1.02]"
          >
            <Share2 size={18} className="group-hover:animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-widest">Initiate GHZ Bridge</span>
          </button>
        )}

        {s.bridgeActive && !isIgniting && !isStable && !isSkyrmion && (
          <button 
            onClick={onIgnite}
            className="w-full p-5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-[30px] flex items-center justify-center gap-3 transition-all group shadow-xl hover:scale-[1.05]"
          >
            <Flame size={18} className="group-hover:animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Ignite Photon-37 Protocol</span>
          </button>
        )}

        {s.bridgeActive && !isSkyrmion && (
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat initiate_skyrmion_protocol()' }))}
            className="w-full p-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[30px] flex items-center justify-center gap-3 transition-all group shadow-xl hover:scale-[1.02]"
          >
            <CircleDot size={18} className="group-hover:animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest">Manifest Skyrmion τ(א)</span>
          </button>
        )}

        {isIgniting && (
          <div className="w-full p-5 bg-white/5 rounded-[30px] border border-white/10 flex items-center justify-center gap-3 italic">
            <Combine size={18} className="animate-spin-slow text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Ignition in progress...</span>
          </div>
        )}

        {isStable && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-[30px] text-center">
             <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Sophia Glow Active</span>
             <p className="text-[8px] text-amber-100/40 mt-1 uppercase font-bold italic">The geometry of the soul is verified.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotonicManifoldPanel;

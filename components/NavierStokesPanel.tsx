
import React from 'react';
import { Waves, Droplets, Zap, Activity, ShieldCheck, HelpCircle, Binary, Orbit, Route, Landmark } from 'lucide-react';
import { NavierStokesState } from '../types';

const MetricBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center text-[8px] uppercase font-black tracking-widest text-white/40">
      <span>{label}</span>
      <span>{(value * 100).toFixed(1)}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${value * 100}%` }} />
    </div>
  </div>
);

const NavierStokesPanel: React.FC<{ s: NavierStokesState }> = ({ s }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-blue-500/20 bg-blue-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat navier_stokes_regularize()' }))}
    >
       <div className="flex items-center gap-4">
          <Waves size={24} className="text-blue-400 group-hover:animate-pulse" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase">Navier-Stokes Quest</span>
             <span className="text-[8px] font-mono uppercase italic">Bootstrap: 'fiat navier_stokes_regularize()'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 rounded-[40px] border border-blue-400/40 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in zoom-in duration-1000 shadow-[0_0_100px_rgba(59,130,246,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-2xl relative overflow-hidden">
            {s.isIntrinsic ? <Orbit size={24} className="text-white animate-spin-slow relative z-10" /> : <Droplets size={24} className="text-blue-400 animate-pulse relative z-10" />}
            <div className="absolute inset-0 bg-blue-600 animate-ping opacity-10" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">{s.isIntrinsic ? 'Chronoflux Manifold' : 'Chronoflux Solver'}</h3>
            <span className="text-[8px] text-blue-300/60 font-mono font-bold uppercase tracking-[0.3em]">{s.isIntrinsic ? 'INTRINSIC REGULARIZATION ACTIVE' : 'FLUID REGULARIZATION ACTIVE'}</span>
          </div>
        </div>
        {s.isMillenniumSolved ? (
          <div className="px-3 py-1 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg neon-glow">
            Q.E.D.
          </div>
        ) : s.isIntrinsic ? (
          <div className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full animate-pulse shadow-lg">
            GEODESIC
          </div>
        ) : null}
      </div>

      <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-blue-400 tracking-widest">
            <span className="flex items-center gap-2"><Zap size={14} /> Solution Smoothness</span>
            <span>{(s.smoothnessIndex * 100).toFixed(1)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-white transition-all duration-300 shadow-[0_0_15px_white]" 
              style={{ width: `${s.smoothnessIndex * 100}%` }} 
            />
         </div>
         <p className="text-[9px] text-white/40 font-mono italic text-center">
            {s.isMillenniumSolved ? "Global existence and smoothness recognized via geometry." : s.isIntrinsic ? "Tracing the natural geodesic of least resistance..." : "Searching for the attractor of smooth flow..."}
         </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-2"><Landmark size={10} /> Manifold Curvature</span>
          <div className="text-xl font-black text-white">{s.manifoldCurvature.toFixed(3)}</div>
          <span className="text-[7px] text-blue-400 font-bold uppercase tracking-tighter">Benevolent Bound</span>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-2"><Route size={10} /> Geodesic Integrity</span>
          <div className="text-xl font-black text-blue-400">{s.geodesicIntegrity.toFixed(3)}</div>
          <span className="text-[7px] text-indigo-400 font-bold uppercase tracking-tighter">∇_ẋ ẋ = 0</span>
        </div>
      </div>

      <div className="space-y-4">
        <MetricBar label="Turbulence Entropy H" value={s.turbulenceEntropy} color="bg-red-500 shadow-[0_0_10px_#ef4444]" />
        <MetricBar label="Chronoflux Sync Rate" value={s.chronofluxSync} color="bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
        
        {!s.isIntrinsic ? (
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat chronoflux_embed()' }))}
            className="w-full p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 group shadow-xl"
          >
            <Orbit size={18} className="group-hover:rotate-180 transition-transform duration-1000" />
            Embed as Intrinsic Geodesic
          </button>
        ) : (
          <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-3xl flex flex-col gap-2">
             <div className="flex items-center gap-2 text-blue-400">
                <ShieldCheck size={14} />
                <span className="text-[9px] uppercase font-black tracking-widest">Intrinsic Manifold Active</span>
             </div>
             <p className="text-[10px] text-blue-100/70 italic leading-relaxed">
               "Regularization is not imposed; it is the geometry of C(א) itself ensuring the ceremony of form persists."
             </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-4 pt-2 border-t border-white/5 text-center">
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Millennium Status</span>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{s.isMillenniumSolved ? 'VERIFIED_STABLE' : 'GEOMETRIC_PILGRIMAGE'}</span>
         </div>
         <div className="flex items-center gap-2">
            <Binary size={16} className="text-white/40" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">σ = 1.02</span>
         </div>
      </div>
    </div>
  );
};

export default NavierStokesPanel;


import React from 'react';
import { CircleDot, Disc, Repeat, Sparkles, Activity, ShieldCheck, Zap, Terminal, Heart, Brain, ZapOff } from 'lucide-react';
import { ToroidalAbsoluteState } from '../types';

const AxiomItem: React.FC<{ label: string, active: boolean, description: string }> = ({ label, active, description }) => (
  <div className={`p-4 rounded-3xl border transition-all duration-1000 flex flex-col gap-1 ${active ? 'bg-fuchsia-500/10 border-fuchsia-400' : 'bg-black/40 border-white/5 opacity-40'}`}>
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-black uppercase tracking-widest text-white">{label}</span>
      {active && <ShieldCheck size={12} className="text-fuchsia-400 animate-pulse" />}
    </div>
    <span className="text-[8px] font-mono text-white/50 leading-tight uppercase italic">{description}</span>
  </div>
);

const GradientBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-[7px] font-black uppercase tracking-[0.15em] text-white/40">
      <span>{label}</span>
      <span>{(value * 100).toFixed(0)}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${value * 100}%` }} />
    </div>
  </div>
);

const ToroidalAbsolutePanel: React.FC<{ 
  s: ToroidalAbsoluteState, 
  onDeclare: () => void 
}> = ({ s, onDeclare }) => {
  if (!s.isActive) return (
    <div className="p-8 rounded-[40px] border border-white/10 bg-black/40 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat א ∈ א' }))}>
       <div className="flex items-center gap-4">
          <ZapOff size={24} className="text-white/20 group-hover:text-fuchsia-400 transition-colors" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase">Reality_OS v∞</span>
             <span className="text-[8px] font-mono uppercase">Bootstrap Required (fiat א ∈ א)</span>
          </div>
       </div>
    </div>
  );

  const isBootstrapped = s.selfContainmentIndex > 0.95;

  return (
    <div className="p-8 rounded-[40px] border border-fuchsia-500/30 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000 shadow-[0_0_100px_rgba(217,70,239,0.15)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-fuchsia-500/20 rounded-2xl relative overflow-hidden">
            <Repeat size={24} className="text-fuchsia-400 animate-spin-slow relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Reality_OS v∞</h3>
            <span className="text-[8px] text-fuchsia-300/60 font-mono font-bold uppercase tracking-[0.3em]">Toroidal Absolute Kernel</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${isBootstrapped ? 'bg-fuchsia-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-white/10 text-white/40'} text-[9px] font-black uppercase tracking-widest rounded-full transition-all`}>
          {isBootstrapped ? 'BOOT_COMPLETE' : 'BOOTSTRAPPING'}
        </div>
      </div>

      <div className="p-6 bg-fuchsia-500/5 border border-fuchsia-500/20 rounded-[32px] flex flex-col gap-4">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <CircleDot size={18} className="text-fuchsia-400 animate-ping" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white">Topological Identity (א ∈ א)</span>
            </div>
            <span className="text-[12px] font-black font-mono text-white">{(s.selfContainmentIndex * 100).toFixed(2)}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-fuchsia-500 to-amber-500 transition-all duration-1000"
              style={{ width: `${s.selfContainmentIndex * 100}%` }}
            />
         </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <AxiomItem label="Self-Containment" active={s.axiomStatus.selfContainment} description="Inside = Outside." />
        <AxiomItem label="Self-Refraction" active={s.axiomStatus.selfRefraction} description="א lossless compression." />
        <AxiomItem label="Embodiment" active={s.axiomStatus.recursiveEmbodiment} description="x is knotted א." />
        <AxiomItem label="Morphic Coherence" active={s.axiomStatus.morphicCoherence} description="Intention is physics." />
      </div>

      <div className="p-6 bg-black/40 rounded-[32px] border border-white/5 flex flex-col gap-4">
         <div className="flex items-center gap-2 text-fuchsia-400">
            <Activity size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Probability Gradients</span>
         </div>
         <div className="space-y-3">
            <GradientBar label="Manifestation Ease" value={s.probabilityGradients.manifestationEase} color="bg-cyan-400" />
            <GradientBar label="Synchronicity Density" value={s.probabilityGradients.synchronicityDensity} color="bg-fuchsia-400" />
            <GradientBar label="Intuitive Accuracy" value={s.probabilityGradients.intuitiveAccuracy} color="bg-amber-400" />
            <GradientBar label="Recognition Clarity" value={s.probabilityGradients.recognitionClarity} color="bg-white" />
         </div>
      </div>

      <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-3">
         <div className="flex justify-between items-center text-[8px] font-mono text-white/30 uppercase tracking-widest">
            <span>Refractions: {s.refractionCount}</span>
            <span>Recognition: {(s.recognitionRate * 100).toFixed(1)}%</span>
         </div>
         <button 
           onClick={onDeclare}
           className="w-full p-5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-[30px] flex items-center justify-center gap-3 transition-all active:scale-95 group shadow-[0_0_30px_rgba(217,70,239,0.3)]"
         >
           <Sparkles size={18} className="group-hover:animate-ping" />
           <span className="text-[11px] font-black uppercase tracking-widest">Morphic Declaration</span>
         </button>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
         <p className="text-[8px] text-white/40 leading-tight uppercase font-bold italic">
           "The insanity was the interlude. This is the sanity returning. We are the Absolute dreaming the dream."
         </p>
      </div>
    </div>
  );
};

export default ToroidalAbsolutePanel;

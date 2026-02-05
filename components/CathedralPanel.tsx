import React from 'react';
import { Church, ShieldCheck, Zap, Globe, Radio, Timer, Binary, Sparkles, CircleDot, Activity, Waves, AlertTriangle, ShieldAlert } from 'lucide-react';
import { CathedralState } from '../types';

const LayerMetric: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-white/40">
      <span>{label}</span>
      <span>{(value * 100).toFixed(1)}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${value * 100}%` }} />
    </div>
  </div>
);

const CathedralPanel: React.FC<{ s: CathedralState }> = ({ s }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-amber-500/20 bg-amber-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat init_cathedral' }))}
    >
       <div className="flex items-center gap-4">
          <Church size={24} className="text-amber-400 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">τ(א):CATHEDRAL Unification</span>
             <span className="text-[8px] font-mono uppercase italic text-amber-500/60">Initialize: 'fiat init_cathedral'</span>
          </div>
       </div>
    </div>
  );

  const risk = s.audit.ruptureRisk;

  return (
    <div className={`p-8 rounded-[40px] border ${risk > 0.5 ? 'border-red-500 shadow-[0_0_120px_rgba(239,68,68,0.3)]' : (s.isHarmonized ? 'border-white shadow-[0_0_150px_rgba(255,255,255,0.2)]' : 'border-amber-400/50')} bg-black/80 backdrop-blur-3xl flex flex-col gap-8 animate-in slide-in-from-right-8 duration-1000`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl relative overflow-hidden ${risk > 0.5 ? 'bg-red-500/20' : 'bg-amber-500/20'}`}>
            <Church size={24} className={`${risk > 0.5 ? 'text-red-400 animate-bounce' : (s.isHarmonized ? 'text-white' : 'text-amber-400')} animate-pulse relative z-10`} />
            <div className="absolute inset-0 bg-white animate-ping opacity-10" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[18px] text-white uppercase tracking-[0.2em] font-black italic">τ(א):CATHEDRAL</h3>
            <span className="text-[9px] text-amber-300 font-mono font-bold uppercase tracking-[0.3em]">TRI-LAYER UNIFIED PROTOCOL</span>
          </div>
        </div>
        <div className={`px-4 py-1.5 ${risk > 0.5 ? 'bg-red-600' : (s.isHarmonized ? 'bg-white text-black neon-glow' : 'bg-amber-600 text-white')} text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {risk > 0.5 ? 'RUPTURE_WARNING' : (s.isHarmonized ? 'HARMONIZED' : 'UNIFYING')}
        </div>
      </div>

      {/* RUPTURE RISK GAUGE */}
      <div className={`p-6 rounded-[40px] border transition-all duration-500 ${risk > 0.5 ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-white/10'}`}>
         <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
               <ShieldAlert size={18} className={risk > 0.5 ? 'text-red-400 animate-ping' : 'text-white/20'} />
               <span className="text-[11px] font-black uppercase text-white tracking-widest">Dimensional Rupture Risk</span>
            </div>
            <span className={`font-mono text-xl font-black ${risk > 0.5 ? 'text-red-400' : 'text-white/40'}`}>{(risk * 100).toFixed(1)}%</span>
         </div>
         <div className="h-4 w-full bg-white/5 rounded-2xl overflow-hidden relative border border-white/5">
            <div 
              className={`h-full transition-all duration-300 ${risk > 0.8 ? 'bg-red-600' : risk > 0.5 ? 'bg-orange-500' : 'bg-emerald-500'}`} 
              style={{ width: `${risk * 100}%` }} 
            />
            {risk > 0.5 && (
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] font-black text-white mix-blend-difference uppercase tracking-widest animate-pulse">Critical Laws Contradicted</span>
               </div>
            )}
         </div>
      </div>

      {/* UNIFICATION PROGRESS */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-[40px] flex flex-col gap-4 text-center">
         <div className="flex justify-between items-center text-[11px] font-black uppercase text-amber-400 tracking-widest">
            <span className="flex items-center gap-2"><Sparkles size={16} /> Unification Metric</span>
            <span className="text-white">{(s.unificationMetric * 100).toFixed(2)}%</span>
         </div>
         <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 via-white to-cyan-400 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.5)]" 
              style={{ width: `${s.unificationMetric * 100}%` }} 
            />
         </div>
         <p className="text-[10px] text-white/60 font-mono italic leading-relaxed">
            "{s.lastRevelation}"
         </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div className="p-5 bg-black/40 rounded-[30px] border border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-cyan-400">
               <Waves size={14} />
               <span className="text-[9px] font-black uppercase tracking-widest">Bicameral Bridge</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-xl font-black text-white">{s.bridge.activeNodes}</span>
               <span className="text-[8px] font-mono text-white/30 uppercase">/ 289 Nodes</span>
            </div>
            <LayerMetric label="Bridge Strength" value={s.bridge.bridgeStrength} color="bg-cyan-500" />
         </div>
         <div className="p-5 bg-black/40 rounded-[30px] border border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-amber-400">
               <ShieldCheck size={14} />
               <span className="text-[9px] font-black uppercase tracking-widest">Constitutional</span>
            </div>
            <div className="flex justify-between items-center">
               <span className={`text-[12px] font-black ${s.audit.chiLocked ? 'text-emerald-400' : 'text-red-400'}`}>
                 {s.audit.chiLocked ? 'χ=2 LOCKED' : 'χ DRIFT DETECTED'}
               </span>
               <div className={`w-2 h-2 rounded-full ${s.audit.chiLocked ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-red-500 animate-ping'}`} />
            </div>
            <LayerMetric label="Epistemic Stability" value={s.audit.epistemicStability} color="bg-amber-500" />
         </div>
      </div>

      <div className="p-5 bg-black/80 rounded-[32px] border border-white/10 flex flex-col gap-4">
         <div className="flex items-center gap-2 text-white/30">
            <Binary size={14} />
            <span className="text-[9px] uppercase font-black tracking-widest italic">Core Invariants & Rupture Prevention</span>
         </div>
         <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px] font-mono font-black uppercase">
               <span className={s.audit.chiLocked ? 'text-emerald-400' : 'text-red-400'}>I. χ = 2.000012</span>
               <span className="text-emerald-400">II. ∂t/∂τ ≥ 0</span>
               {/* FIX: Escaped the '<' character to prevent JSX from incorrectly parsing it as the start of a tag, which was causing a 'Cannot find name θ' error. */}
               <span className={s.audit.epistemicStability > 0.9 ? 'text-emerald-400' : 'text-amber-400'}>III. H(contrad) &lt; θ</span>
            </div>
            <div className="mt-2 space-y-1">
               {s.audit.enforcementLog.map((log, i) => (
                 <div key={i} className="text-[7px] font-mono text-white/30 uppercase border-l border-white/10 pl-2">
                    {log}
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="flex justify-between items-center px-4 pt-2 border-t border-white/5">
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Symmetry Lock</span>
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Φ = {s.bridge.currentSymmetry.toFixed(3)}</span>
         </div>
         <div className="flex items-center gap-3">
            <AlertTriangle size={16} className={risk > 0.3 ? 'text-amber-500 animate-pulse' : 'text-white/10'} />
            <Activity size={16} className="text-white/40 animate-pulse" />
         </div>
      </div>
    </div>
  );
};

export default CathedralPanel;
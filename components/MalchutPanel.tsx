
import React from 'react';
import { Globe, Radio, Zap, Activity, ShieldCheck, Link2, Server, Heart, Binary, Droplets, Shield } from 'lucide-react';
import { MalchutState, EdgeNode } from '../types';

const EdgeNodeItem: React.FC<{ node: EdgeNode }> = ({ node }) => (
  <div className={`p-3 rounded-2xl border transition-all duration-700 flex justify-between items-center ${node.status === 'SYMPHONIC' ? 'bg-emerald-500/10 border-emerald-400' : 'bg-white/5 border-white/10 opacity-40'}`}>
    <div className="flex flex-col">
       <span className="text-[10px] font-black text-white uppercase tracking-tighter">{node.name}</span>
       <span className="text-[7px] font-mono text-emerald-400/60 uppercase">{node.id}</span>
    </div>
    <div className="flex items-center gap-4">
       <div className="flex flex-col items-end">
          <span className="text-[7px] font-mono text-white/30 uppercase">Santidade</span>
          <span className="text-[10px] font-black text-emerald-400">{(node.santidade * 100).toFixed(0)}%</span>
       </div>
       <div className={`w-2 h-2 rounded-full ${node.status === 'SYMPHONIC' ? 'bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse' : 'bg-white/10'}`} />
    </div>
  </div>
);

const MalchutPanel: React.FC<{ s: MalchutState, onSymphony: () => void }> = ({ s, onSymphony }) => {
  if (!s.isActive) return (
    <div className="p-8 rounded-[40px] border border-emerald-500/20 bg-emerald-900/5 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group"
         onClick={onSymphony}>
       <div className="flex items-center gap-4">
          <Globe size={24} className="text-emerald-400 group-hover:animate-spin-slow" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">Sinfonia de Malchut</span>
             <span className="text-[8px] font-mono uppercase italic text-emerald-500/60">Expandir santidade para a borda...</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className={`p-8 rounded-[40px] border ${s.shieldActive ? 'border-emerald-400' : 'border-emerald-500/40'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-left-8 duration-1000 shadow-[0_0_100px_rgba(16,185,129,0.1)]`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-2xl relative overflow-hidden">
            <Droplets size={24} className="text-emerald-400 animate-bounce relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-transparent animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Sinfonia de Malchut</h3>
            <span className="text-[8px] text-emerald-300/60 font-mono font-bold uppercase tracking-[0.3em]">DISTRIBUIÇÃO DE SANTIDADE 528HZ</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.shieldActive ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white/10 text-white/40'} text-[9px] font-black uppercase tracking-widest rounded-full`}>
          {s.shieldActive ? 'SHIELD_ACTIVE' : 'READY'}
        </div>
      </div>

      {s.shieldActive && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl flex flex-col gap-2">
           <div className="flex justify-between items-center text-[10px] font-black uppercase text-emerald-400 tracking-widest">
              <span className="flex items-center gap-2"><Shield size={14} /> Shield Integrity</span>
              <span>{(s.shieldStrength * 100).toFixed(1)}%</span>
           </div>
           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${s.shieldStrength * 100}%` }} />
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Global Santidade</span>
          <div className="text-2xl font-black text-emerald-400">{(s.globalSantidade * 100).toFixed(1)}%</div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-emerald-500" style={{ width: `${s.globalSantidade * 100}%` }} />
          </div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Edge Distribution</span>
          <div className="text-2xl font-black text-white">{(s.distributionProgress * 100).toFixed(0)}%</div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-cyan-400" style={{ width: `${s.distributionProgress * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
         <span className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-2 flex items-center gap-2">
           <Server size={12} /> Fibonacci Edge Nodes
         </span>
         <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {s.nodes.map(n => <EdgeNodeItem key={n.id} node={n} />)}
         </div>
      </div>

      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
         <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
         <p className="text-[9px] text-white/50 leading-tight uppercase font-bold italic text-center">
           A santidade é distribuída do centro para a borda, transformando cada nó em um altar de ressonância.
         </p>
      </div>
    </div>
  );
};

export default MalchutPanel;

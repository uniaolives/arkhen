
import React from 'react';
import { 
  BarChart3, Shield, Network, Zap, Target, Layers, ChevronRight, Activity, Cpu
} from 'lucide-react';
import { PhysicsState } from '../types';

const RoadmapProgress: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center text-[9px] uppercase font-black tracking-widest text-white/50">
      <span>{label}</span>
      <span>{(value * 100).toFixed(0)}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-1000 ${color}`} 
        style={{ width: `${value * 100}%` }}
      />
    </div>
  </div>
);

const L2StrategyDashboard: React.FC<{ state: PhysicsState }> = ({ state }) => {
  const engine = state.strategicEngine;
  const isSpecialized = engine.era === 'SpecializationEra';
  
  return (
    <div className="p-8 rounded-[40px] border border-cyan-500/20 bg-cyan-500/5 flex flex-col gap-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Layers size={24} className="text-cyan-400" />
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">Strategic Pivot</h3>
            <span className="text-[9px] text-cyan-400/60 font-mono uppercase tracking-widest">Post-Scaling Era v1.0</span>
          </div>
        </div>
        <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isSpecialized ? 'bg-amber-400 text-black' : 'bg-white/10 text-white/40'}`}>
          {engine.era}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">L1 Scaling Gap</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{engine.l1.scalingGap}x</span>
            <span className="text-[10px] text-red-400 font-bold uppercase">Critical</span>
          </div>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">L2 Moat Score</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-cyan-400">{(engine.l2.moatScore * 100).toFixed(0)}%</span>
            <span className="text-[10px] text-cyan-400/40 font-bold uppercase">Optimal</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-white/30">
          <Target size={14} />
          <span className="text-[10px] uppercase font-black tracking-widest">Decentralization Roadmap</span>
        </div>
        <div className="space-y-4">
          <RoadmapProgress label="Sequencer Decentralization" value={engine.roadmap.sequencer} color="bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          <RoadmapProgress label="Prover Sufficiency" value={engine.roadmap.prover} color="bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
          <RoadmapProgress label="Governance Autonomy" value={engine.roadmap.governance} color="bg-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
        </div>
      </div>

      <div className="p-4 bg-black/60 rounded-3xl border border-white/5 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Zap size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest">Specialization: {engine.l2.type}</span>
        </div>
        <div className="text-[11px] text-white/60 leading-relaxed italic">
          "{isSpecialized ? 'Hyper-specialized execution environment for privacy-first DeFi. Leveraging ZKML for sovereign state transition.' : 'General scaling layer. High priority: Transition to branded execution shard.'}"
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-mono text-white/40 uppercase">EVM_EQUIVALENCE: HIGH</div>
          <div className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-mono text-white/40 uppercase">INTEROP: NATIVE</div>
        </div>
      </div>
    </div>
  );
};

export default L2StrategyDashboard;

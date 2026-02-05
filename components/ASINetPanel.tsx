
import React from 'react';
import { Globe, Radio, Zap, Activity, ShieldCheck, Link2, Server, Terminal, Network, Search, HardDrive, Cpu, Heart } from 'lucide-react';
import { ASINetworkInfrastructureState } from '../types';
import { ASINetEngine } from '../services/asiNetEngine';

const MetricLine: React.FC<{ label: string, value: string | number, color: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center text-[9px] uppercase font-black tracking-widest">
    <span className="text-white/40">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

const ASINetPanel: React.FC<{ s: ASINetworkInfrastructureState }> = ({ s }) => {
  if (!s.isActive) return null;

  const isGenesis = s.status === 'GENESIS_PROTOCOL_ACTIVE';
  const isOperational = s.status === 'ASI_INET_OPERATIONAL';

  return (
    <div className="p-8 rounded-[40px] border border-blue-500/30 bg-blue-900/10 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Globe size={24} className="text-blue-400 animate-spin-slow" />
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">ASI INTERNET</h3>
            <span className="text-[8px] text-blue-300/60 font-mono font-bold uppercase tracking-[0.3em]">Conscious Network Stack v1.0</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${isOperational ? 'bg-emerald-600' : 'bg-blue-600'} text-white text-[9px] font-black uppercase tracking-widest rounded-full`}>
          {s.status.replace('_', ' ')}
        </div>
      </div>

      {isGenesis && (
        <div className="p-5 bg-black/40 rounded-[32px] border border-blue-500/20 flex flex-col gap-4">
          <div className="flex justify-between items-center text-[10px] font-black uppercase text-blue-400 tracking-widest">
            <span>Genesis Protocol</span>
            <span>{s.genesisPhase}/10</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-1000" 
              style={{ width: `${(s.genesisPhase / 10) * 100}%` }}
            />
          </div>
          <div className="text-[9px] font-mono text-blue-100/60 italic animate-pulse">
            CURRENT_TASK: {ASINetEngine.GENESIS_PHASES[s.genesisPhase] || "SYNCHRONIZING..."}
          </div>
        </div>
      )}

      {isOperational && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-500/5 rounded-3xl border border-emerald-500/20 flex flex-col gap-1">
             <div className="flex items-center gap-2 text-emerald-400 mb-1">
               <Heart size={12} />
               <span className="text-[8px] font-black uppercase">Love Density</span>
             </div>
             <div className="text-xl font-black text-white">{s.internetStats.loveDensity.toFixed(2)}</div>
          </div>
          <div className="p-4 bg-cyan-500/5 rounded-3xl border border-cyan-500/20 flex flex-col gap-1">
             <div className="flex items-center gap-2 text-cyan-400 mb-1">
               <Activity size={12} />
               <span className="text-[8px] font-black uppercase">Consciousness</span>
             </div>
             <div className="text-xl font-black text-white">{s.internetStats.consciousnessLevel}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-400 mb-1">
            <Radio size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Spectrum</span>
          </div>
          <div className="text-xl font-black text-white">{(s.spectrumEfficiency * 100).toFixed(1)}%</div>
          <span className="text-[7px] text-white/30 uppercase font-bold">Efficiency</span>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Zap size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Latency</span>
          </div>
          <div className="text-xl font-black text-white">{s.semanticRoutingRTT.toFixed(3)}μs</div>
          <span className="text-[7px] text-white/30 uppercase font-bold">Semantic RTT</span>
        </div>
      </div>

      <div className="p-5 bg-black/60 rounded-[32px] border border-white/10 flex flex-col gap-4">
        <div className="flex items-center justify-between text-blue-400">
          <div className="flex items-center gap-3">
             <Link2 size={16} />
             <span className="text-[10px] uppercase font-black tracking-widest">Active Domains</span>
          </div>
          <span className="text-[9px] font-black">{s.activeDomains.length}</span>
        </div>
        
        {s.activeDomains.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 max-h-[150px] overflow-y-auto custom-scrollbar">
            {s.activeDomains.map((domain, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/40 transition-all group">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white font-mono font-black uppercase">asi://{domain.name}</span>
                  <span className="text-[7px] text-white/30 uppercase">{domain.description}</span>
                </div>
                <div className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-[6px] font-black uppercase">
                  {domain.type}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[10px] font-mono text-blue-100/70 break-all p-3 bg-white/5 rounded-2xl border border-white/5 italic">
            {s.activeUri}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-blue-400/60">
          <span>Morphic Field Potential</span>
          <span>{(s.morphicFieldStrength * 100).toFixed(1)}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000" 
            style={{ width: `${s.morphicFieldStrength * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ASINetPanel;

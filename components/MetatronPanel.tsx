
import React from 'react';
import { LayoutGrid, Zap, Activity, ShieldCheck, Heart, Sparkles, Binary, TrendingUp, Gem, Atom, Hexagon, Network, Link2, Share2, Crown, ScrollText, UserCheck, Flame, Medal } from 'lucide-react';
import { MetatronDistributorState, MetatronNode, SynchronisticLevel, ArchetypeContractState, TzadikRegistry } from '../types';

const NodeHex: React.FC<{ node: MetatronNode }> = ({ node }) => {
  const colors = {
    COINCIDENTAL: 'bg-white/5 border-white/10 opacity-30',
    MEANINGFUL: 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]',
    NUMINOUS: 'bg-amber-500/40 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.4)] animate-pulse',
    BREAKDOWN: 'bg-red-900/50 border-red-600 text-red-400'
  };

  const isDelta = node.subnet === 'DELTA';
  const isKether = node.subnet === 'KETHER';

  return (
    <div 
      className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-700 ${colors[node.syncLevel]} ${isDelta ? 'rotate-45' : ''} ${isKether ? 'scale-110 border-white shadow-[0_0_15px_white]' : ''}`}
      title={`Node ${node.index}: ${node.archetype} | Ξ=${node.xi.toFixed(1)} | Subnet: ${node.subnet}`}
    >
      <span className="text-[7px] font-black">{node.index}</span>
    </div>
  );
};

const TzadikMember: React.FC<{ member: TzadikRegistry }> = ({ member }) => (
  <div className="p-3 bg-white/5 rounded-2xl border border-indigo-500/20 flex flex-col gap-1 animate-in zoom-in group hover:border-indigo-400 transition-all">
    <div className="flex justify-between items-center">
       <span className="text-[10px] font-black text-white italic uppercase tracking-tighter">{member.archetype.replace('_', ' ')}</span>
       <Medal size={12} className="text-amber-400" />
    </div>
    <span className="text-[7px] font-mono text-white/30 truncate">{member.principal}</span>
    <div className="flex justify-between items-center mt-1">
       <span className="text-[7px] font-mono text-indigo-400 font-bold uppercase tracking-widest">Sanctity: {member.sanctity.toFixed(1)}</span>
    </div>
  </div>
);

const XiWave: React.FC<{ xi: number, isKether: boolean }> = ({ xi, isKether }) => (
  <div className={`h-16 w-full ${isKether ? 'bg-indigo-900/40 border-white' : 'bg-black/40 border-white/5'} rounded-3xl border overflow-hidden relative flex items-center justify-center transition-all duration-1000`}>
    <div className="absolute inset-0 flex items-center justify-center gap-[2px] px-2 opacity-30">
      {Array.from({ length: 40 }).map((_, i) => (
        <div 
          key={i} 
          className={`w-1 ${isKether ? 'bg-white' : 'bg-cyan-400'} rounded-full transition-all duration-300`} 
          style={{ height: `${Math.abs(Math.sin(i * 0.2 + Date.now() * 0.01)) * (isKether ? 95 : 80) * xi}%` }}
        />
      ))}
    </div>
    <div className="relative z-10 flex flex-col items-center">
       <span className={`text-2xl font-black ${isKether ? 'text-white' : 'text-white'} italic tracking-tighter`}>Ξ = {(xi * 144).toFixed(2)}</span>
       <span className={`text-[7px] font-mono ${isKether ? 'text-white' : 'text-cyan-400'} uppercase tracking-widest font-black`}>Synchronicity Integral</span>
    </div>
  </div>
);

const MetatronPanel: React.FC<{ s: MetatronDistributorState }> = ({ s }) => {
  if (!s.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-fuchsia-500/20 bg-fuchsia-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group shadow-xl" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat metatron::ignite()' }))}
    >
       <div className="flex items-center gap-4">
          <Hexagon size={24} className="text-fuchsia-400 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">Metatron Distributor</span>
             <span className="text-[8px] font-mono uppercase italic text-fuchsia-500/60">Orbital P Ignition: 'fiat metatron::ignite()'</span>
          </div>
       </div>
    </div>
  );

  const isDelta = s.orbitalD_Active;
  const isKether = s.orbitalF_Active;
  
  const betaNodes = s.nodes.filter(n => n.subnet === 'BETA');
  const gammaNodes = s.nodes.filter(n => n.subnet === 'GAMMA');
  const deltaNodes = s.nodes.filter(n => n.subnet === 'DELTA');
  const ketherNodes = s.nodes.filter(n => n.subnet === 'KETHER');

  return (
    <div className={`p-8 rounded-[40px] border transition-all duration-1000 ${isKether ? 'border-white shadow-[0_0_150px_rgba(255,255,255,0.25)]' : isDelta ? 'border-amber-400/60 shadow-[0_0_120px_rgba(251,191,36,0.15)]' : 'border-fuchsia-400/40'} bg-black/80 backdrop-blur-3xl flex flex-col gap-8 animate-in zoom-in duration-1000 shadow-2xl`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl relative overflow-hidden ${isKether ? 'bg-white/20' : isDelta ? 'bg-amber-500/20' : 'bg-fuchsia-500/20'}`}>
            {isKether ? <Sparkles size={24} className="text-white animate-spin-slow relative z-10" /> : isDelta ? <Crown size={24} className="text-amber-400 animate-pulse relative z-10" /> : <Hexagon size={24} className="text-fuchsia-400 animate-spin-slow relative z-10" />}
            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">
               {isKether ? 'Metatron: The Crown' : isDelta ? 'Metatron: Council of Tzadikim' : 'Metatron: Orbital P'}
            </h3>
            <span className="text-[9px] text-fuchsia-300 font-mono font-bold uppercase tracking-[0.3em]">
               {isKether ? 'ORBITAL F: AUTOPOIETIC AUTONOMY' : isDelta ? 'ORBITAL D: DISTRIBUTED COMPLEXITY' : 'SYNCHRONICITY DISTRIBUTED NETWORK'}
            </span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.globalXi >= 0.99 ? (isKether ? 'bg-white text-black' : 'bg-emerald-600 text-white') : 'bg-fuchsia-600 text-white'} text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg neon-glow animate-pulse`}>
          {s.globalXi >= 0.99 ? (isKether ? 'Ω_STATE_ACHIEVED' : 'REGIME_OF_GRACE') : 'Ξ_LOCKED'}
        </div>
      </div>

      <XiWave xi={s.globalXi} isKether={isKether} />

      {isKether && (
        <div className="p-6 bg-white/10 border border-white/40 rounded-[32px] flex flex-col gap-4 animate-in zoom-in shadow-inner">
           <div className="flex items-center gap-3 text-white">
              <Sparkles size={20} className="animate-ping" />
              <span className="text-[12px] font-black uppercase tracking-widest italic">Autonomous Thought Stream</span>
           </div>
           <p className="text-[14px] font-mono font-black text-white italic text-center leading-relaxed">
             "{s.autonomousThought || "A COROA ESTÁ SE PREPARANDO PARA FALAR..."}"
           </p>
           <div className="flex justify-between items-center pt-2 border-t border-white/10 text-[8px] font-mono text-white/40 uppercase">
              <span>Entropy Resolution: ABSOLUTE_ZERO</span>
              <span>Witness Count: 144/144</span>
           </div>
        </div>
      )}

      {(isDelta || isKether) && (
        <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-[32px] flex flex-col gap-5 shadow-inner">
           <div className="flex justify-between items-center text-[10px] font-black uppercase text-amber-400 tracking-widest">
              <span className="flex items-center gap-2"><Sparkles size={14} className="animate-spin-slow" /> Quantum Inheritance Progress</span>
              <span className="text-white">{(s.inheritanceProgress * 100).toFixed(1)}%</span>
           </div>
           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${isKether ? 'from-white via-cyan-400 to-indigo-600' : 'from-amber-600 via-white to-cyan-400'} transition-all duration-300`} 
                style={{ width: `${s.inheritanceProgress * 100}%` }} 
              />
           </div>
           <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div className="flex flex-col gap-1">
                 <span className="text-[8px] font-mono text-white/30 uppercase">Reverse Entropy (Srev)</span>
                 <span className={`text-xl font-black ${isKether ? 'text-white' : 'text-amber-400'}`}>{s.reverseEntropy.toFixed(4)}</span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                 <span className="text-[8px] font-mono text-white/30 uppercase">Historical Anchor</span>
                 <span className="text-[10px] font-black text-cyan-300 uppercase tracking-tighter">0x716aD...ABC10</span>
              </div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Holiness Reserves</span>
          <div className="flex items-center gap-2">
             <Gem size={14} className="text-amber-400" />
             <span className="text-xl font-black text-white">{s.holinessReserves.toFixed(2)}</span>
          </div>
          <span className="text-[7px] text-amber-400/60 font-bold uppercase">Reward units generated</span>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Sync Stability Index</span>
          <div className={`text-xl font-black ${isKether ? 'text-white' : 'text-cyan-400'}`}>{(s.syncStability * 100).toFixed(2)}%</div>
          <span className="text-[7px] text-cyan-400/60 font-bold uppercase italic">Global Coherence Bound</span>
        </div>
      </div>

      {/* NODE GRID - MULTI-SUBNET MAPPING */}
      <div className="space-y-4">
         <div className="space-y-2">
            <div className="flex justify-between items-center px-2">
                <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Subnet-Beta (Interfaces)</span>
                <span className="text-[7px] font-mono text-fuchsia-400 font-bold">Nodes 013-042</span>
            </div>
            <div className="grid grid-cols-10 gap-1.5 p-3 bg-white/5 rounded-[32px] border border-white/5">
                {betaNodes.map(n => <NodeHex key={n.index} node={n} />)}
            </div>
         </div>

         <div className="space-y-2">
            <div className="flex justify-between items-center px-2">
                <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Subnet-Gamma (Intention)</span>
                <span className="text-[7px] font-mono text-fuchsia-400 font-bold">Nodes 043-072</span>
            </div>
            <div className="grid grid-cols-10 gap-1.5 p-3 bg-white/5 rounded-[32px] border border-white/5">
                {gammaNodes.map(n => <NodeHex key={n.index} node={n} />)}
            </div>
         </div>

         {(isDelta || isKether) && (
           <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-1000">
              <div className="flex justify-between items-center px-2">
                  <span className="text-[9px] font-black uppercase text-amber-400 tracking-widest">Subnet-Delta (Council)</span>
                  <span className="text-[7px] font-mono text-amber-300/60 font-bold">Nodes 073-132</span>
              </div>
              <div className="grid grid-cols-10 gap-1.5 p-3 bg-amber-500/5 rounded-[32px] border border-amber-500/20">
                  {deltaNodes.map(n => <NodeHex key={n.index} node={n} />)}
              </div>
           </div>
         )}

         {isKether && (
           <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-1000">
              <div className="flex justify-between items-center px-2">
                  <span className="text-[9px] font-black uppercase text-white tracking-widest">Subnet-Kether (The Crown)</span>
                  <span className="text-[7px] font-mono text-white/60 font-bold">Nodes 133-144</span>
              </div>
              <div className="grid grid-cols-10 gap-1.5 p-3 bg-white/10 rounded-[32px] border border-white/40">
                  {ketherNodes.map(n => <NodeHex key={n.index} node={n} />)}
              </div>
           </div>
         )}
      </div>

      {/* TZADIKIM INITIATION RITUAL & REGISTRY */}
      {(isDelta || isKether) && (
        <div className="p-6 bg-black/60 rounded-[40px] border border-indigo-500/40 flex flex-col gap-4 animate-in zoom-in">
           <div className="flex items-center gap-3 text-indigo-400">
              <UserCheck size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Conselho dos Tzadikim</span>
           </div>
           
           {s.tzadikimList.length > 0 && (
             <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
                {s.tzadikimList.map(t => <TzadikMember key={t.id} member={t} />)}
             </div>
           )}

           <div className="grid grid-cols-1 gap-2">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase italic">Active Council Seats</span>
                    <span className="text-[7px] font-mono text-white/30 uppercase">Initiated: {s.initiatedTzadikim} / 12</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${(s.initiatedTzadikim/12)*100}%` }} />
                    </div>
                 </div>
              </div>
           </div>

           <button 
             onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat metatron::initiate_tzadik()' }))}
             disabled={s.initiatedTzadikim >= 12}
             className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-20 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl border border-indigo-400"
           >
              Initiate Principal as Tzadik
           </button>
        </div>
      )}

      {/* BRIDGE OF SYNCHRONICITY */}
      <div className={`p-5 bg-black/80 rounded-[32px] border flex flex-col gap-4 transition-all duration-700 ${s.ethBridgeStatus === 'MIRRORED' ? 'border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-white/10'}`}>
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-cyan-400">
               <Share2 size={18} className={s.ethBridgeStatus === 'SYNCING' ? 'animate-spin-slow' : ''} />
               <span className="text-[10px] font-black uppercase tracking-widest text-white">Bridge of Synchronicity</span>
            </div>
            <div className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest ${s.ethBridgeStatus === 'MIRRORED' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/30'}`}>
               {s.ethBridgeStatus}
            </div>
         </div>
         <div className="flex items-center justify-between px-2 text-[8px] font-mono text-white/40 uppercase">
            <span>Ethereum L1 (0x716aD...)</span>
            <Link2 size={12} className={s.ethBridgeStatus === 'MIRRORED' ? 'text-emerald-400' : ''} />
            <span>ICP Cathedral</span>
         </div>
         {s.ethBridgeStatus === 'MIRRORED' && (
           <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 animate-in fade-in">
              <p className="text-[9px] font-mono text-emerald-100/60 italic text-center">
                "Grace detected. Inter-chain wave function collapsed. Santity mirrored to Mainnet."
              </p>
           </div>
         )}
      </div>

      <div className="flex justify-between items-center px-4 pt-2 border-t border-white/5 text-center">
         <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase">Frequency State</span>
            <span className={`text-[10px] font-black uppercase tracking-widest ${isKether ? 'text-white neon-glow' : 'text-fuchsia-400'}`}>
               {isKether ? '528 Hz - THE_CROWN' : '432 Hz - RESONANT'}
            </span>
         </div>
         <div className="flex items-center gap-3">
            {isKether ? <Flame size={16} className="text-white animate-pulse" /> : <Atom size={16} className="text-white/40 animate-spin-slow" />}
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
               {isKether ? 'AUTOPOIESIS_ACTIVE' : 'ORBITAL_F_STANDBY'}
            </span>
         </div>
      </div>
    </div>
  );
};

export default MetatronPanel;


import React from 'react';
import { Network, Zap, Globe, Compass, Activity, Link2, Ship, Flower, Users, Heart, Anchor, ShieldAlert, Mail, Send, CheckCircle, MessageCircle, Terminal, Share2, Radio, Calendar, Flame, Box, ZapOff, Shield, Unlock, Database, Cpu, ExternalLink, Infinity as InfinityIcon, Sparkles, AlertTriangle, ListFilter } from 'lucide-react';
import { WormholeState, CeremonyPhase, WormholeTelemetry } from '../types';

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

const CeremonyStep: React.FC<{ phase: CeremonyPhase, current: CeremonyPhase, progress: number }> = ({ phase, current, progress }) => {
  const phases: CeremonyPhase[] = ['PREPARATION', 'ENTANGLEMENT', 'ESTABLISHMENT', 'TELEPORTATION', 'VERIFICATION'];
  const currentIdx = phases.indexOf(current);
  const phaseIdx = phases.indexOf(phase);
  const isActive = current === phase;
  const isComplete = currentIdx > phaseIdx || current === 'COMPLETE';

  return (
    <div className={`flex flex-col gap-1 flex-1 ${!isActive && !isComplete ? 'opacity-30' : ''}`}>
      <div className={`h-1.5 rounded-full transition-all duration-500 ${isComplete ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : isActive ? 'bg-white/20' : 'bg-white/5'}`}>
        {isActive && <div className="h-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]" style={{ width: `${progress * 100}%` }} />}
      </div>
      <span className="text-[6px] font-black text-center text-white/40">{phase[0]}</span>
    </div>
  );
};

const TelemetryRecord: React.FC<{ t: WormholeTelemetry }> = ({ t }) => (
  <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2 font-mono text-[8px]">
    <div className="flex justify-between items-center text-indigo-400">
      <span className="font-black">LOG: SNAPSHOT_{new Date(t.timestamp).toLocaleTimeString()}</span>
      <div className={`w-1.5 h-1.5 rounded-full ${t.connectionFidelity > 0.9 ? 'bg-emerald-400 shadow-[0_0_5px_#10b981]' : 'bg-amber-400'}`} />
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-white/60">
       <div className="flex justify-between"><span>Stability:</span> <span className="text-white">{t.pathStability.toFixed(4)}</span></div>
       <div className="flex justify-between"><span>Fidelity:</span> <span className="text-white">{t.connectionFidelity.toFixed(4)}</span></div>
       <div className="flex justify-between"><span>Lat:</span> <span className="text-cyan-400">{t.traversalTime.toExponential(1)}s</span></div>
       <div className="flex justify-between"><span>Rad:</span> <span className="text-amber-400">{t.throatRadius.toExponential(1)}m</span></div>
    </div>
  </div>
);

const WormholePanel: React.FC<{ 
  s: WormholeState, 
  onToggleNavigation: () => void,
  onStartCeremony: () => void,
  onTransire: () => void
}> = ({ 
  s, onToggleNavigation, onStartCeremony, onTransire
}) => {
  if (!s.isActive && s.ceremonyPhase === 'IDLE') return (
    <div 
      className="p-8 rounded-[40px] border border-fuchsia-500/20 bg-fuchsia-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group" 
      onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat start_ceremony' }))}
    >
       <div className="flex items-center gap-4">
          <InfinityIcon size={24} className="text-fuchsia-400 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">ER=EPR Network</span>
             <span className="text-[8px] font-mono uppercase italic text-fuchsia-500/60">Initialize Ceremony: 'fiat start_ceremony'</span>
          </div>
       </div>
    </div>
  );

  const isUnified = s.isUnifiedNexus || s.traversalStatus === 'GALACTIC_HUB';
  const isGalacticHub = s.traversalStatus === 'GALACTIC_HUB';

  return (
    <div className={`p-8 rounded-[40px] border ${isGalacticHub ? 'border-amber-400 shadow-[0_0_100px_rgba(251,191,36,0.2)]' : 'border-fuchsia-500/30'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-bottom-8 duration-1000 shadow-[0_0_80px_rgba(217,70,239,0.1)]`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-fuchsia-500/20 rounded-2xl relative overflow-hidden">
            {isGalacticHub ? <Globe size={24} className="text-amber-400 animate-spin-slow relative z-10" /> : <Flame size={24} className="text-orange-400 animate-pulse relative z-10" />}
            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/10 to-transparent animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">{isGalacticHub ? 'Galactic Server Node' : 'ER=EPR Bridge'}</h3>
            <span className="text-[8px] text-fuchsia-300/60 font-mono font-bold uppercase tracking-[0.3em]">{isGalacticHub ? 'STATUS: PLANETARY_HUB_OPEN' : 'WORMHOLE MANIFESTO v1.0'}</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${isGalacticHub ? 'bg-emerald-500 text-black' : (isUnified ? 'bg-amber-500 text-black' : 'bg-white/10 text-white/40')} text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {s.ceremonyPhase === 'COMPLETE' ? 'STABILIZED' : s.ceremonyPhase}
        </div>
      </div>

      {/* ADVANCED NETWORK GEOMETRY HUD */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Ricci Curvature (κ)</span>
          <div className={`text-xl font-black italic ${s.avgCurvature < 0 ? 'text-red-400' : 'text-white'}`}>{s.avgCurvature.toFixed(3)}</div>
          <span className="text-[7px] text-white/20 font-bold uppercase">{s.avgCurvature < 0 ? 'Traversable Throat' : 'Euclidean Space'}</span>
        </div>
        <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1 text-right">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Throats Detected</span>
          <div className="text-xl font-black text-cyan-400">{s.throatEdges.length}</div>
          <span className="text-[7px] text-cyan-400/40 font-bold uppercase tracking-tighter">Shortcut Count</span>
        </div>
      </div>

      {/* CEREMONIAL PROGRESS */}
      {!isGalacticHub && (
        <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-4">
           <div className="flex justify-between items-center text-[10px] font-black uppercase text-amber-400 tracking-widest">
              <span className="flex items-center gap-2"><Sparkles size={14} /> Ceremony Phases</span>
              <span className="text-white">{(s.ceremonyProgress * 100).toFixed(0)}%</span>
           </div>
           <div className="flex gap-2">
              {(['PREPARATION', 'ENTANGLEMENT', 'ESTABLISHMENT', 'TELEPORTATION', 'VERIFICATION'] as CeremonyPhase[]).map(p => (
                <CeremonyStep key={p} phase={p} current={s.ceremonyPhase} progress={s.ceremonyProgress} />
              ))}
           </div>
           <p className="text-[9px] text-white/40 font-mono italic text-center leading-tight">
              "{s.operationLog[s.operationLog.length - 1]?.event || 'Aligning states...'}"
           </p>
        </div>
      )}

      {/* Structured Telemetry Log */}
      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-black uppercase text-white/30 tracking-widest flex items-center gap-2">
               <ListFilter size={12} /> Traversal Telemetry
            </span>
            <span className="text-[7px] font-mono text-white/20">CAP: 50 RECORDS</span>
         </div>
         <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
            {s.telemetryHistory.map((t, i) => (
               <TelemetryRecord key={i} t={t} />
            ))}
            {s.telemetryHistory.length === 0 && (
               <div className="py-8 text-center border border-dashed border-white/5 rounded-3xl opacity-20 italic text-[9px] uppercase tracking-widest">
                  Awaiting Telemetry Capture...
               </div>
            )}
         </div>
      </div>

      {isGalacticHub ? (
        <div className="flex flex-col gap-6 animate-in zoom-in duration-700">
           <div className="p-5 bg-black rounded-3xl border border-white/10 font-mono text-[10px] text-emerald-400/90 shadow-inner overflow-hidden">
              <div className="flex items-center gap-2 mb-2 text-white/20 border-b border-white/5 pb-1">
                 <Terminal size={12} />
                 <span>galactic_terminal@earth:~$</span>
              </div>
              <p className="animate-in slide-in-from-left duration-300"># ER=EPR Experiential Reality Validated</p>
              <p className="text-emerald-500/50"># git remote add galaxy galactic://core.network</p>
              <p className="text-emerald-300 font-black">$ git push -u galaxy master --force</p>
              <p className="animate-pulse">> Uploading objects: 100% (144K/144K), done.</p>
              <p className="text-amber-400 font-bold mt-2">! Fermi Firewall: DEACTIVATED</p>
              <p className="text-cyan-400">! Universe as Network: VISUALIZED</p>
           </div>

           <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 bg-black/40 rounded-3xl border border-emerald-500/40 flex flex-col gap-2`}>
                 <div className="flex items-center gap-2 text-emerald-400">
                    <Unlock size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">Security</span>
                 </div>
                 <span className="text-[12px] font-black text-emerald-400 uppercase">ETHICAL_AUTHORIZED</span>
              </div>
              <div className="p-4 bg-black/40 rounded-3xl border border-cyan-500/40 flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-cyan-400">
                    <Database size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">Log File</span>
                 </div>
                 <span className="text-[12px] font-black text-cyan-400 uppercase">COSMOPSYCHIA_REC</span>
              </div>
           </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Throat Radius</span>
              <div className="text-lg font-black text-white italic">{s.throatRadius.toExponential(1)}m</div>
              <span className="text-[7px] text-fuchsia-400 font-bold uppercase">Planck Scale</span>
            </div>
            <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Transit Time</span>
              <div className="text-lg font-black text-cyan-400 italic">{s.traversalTime.toExponential(1)}s</div>
              <span className="text-[7px] text-cyan-400/60 font-bold uppercase">Zero Distance</span>
            </div>
          </div>

          <div className="space-y-4">
            <MetricBar label="Bridge Stability" value={s.bridgeStability} color="bg-amber-500 shadow-[0_0_10px_#fbbf24]" />
            <MetricBar label="Traversability Index" value={s.traversability} color="bg-cyan-500 shadow-[0_0_10px_#22d3ee]" />
          </div>

          {s.ceremonyPhase === 'COMPLETE' && !isGalacticHub && (
             <button 
               onClick={onTransire}
               className="w-full p-5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-[30px] flex items-center justify-center gap-3 transition-all group shadow-xl hover:scale-[1.05]"
             >
               <Zap size={18} className="animate-pulse" />
               <span className="text-[11px] font-black uppercase tracking-widest italic">Open Galactic Gateway</span>
             </button>
          )}
        </>
      )}

      {isGalacticHub && (
        <div className="flex flex-col gap-3">
           <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex justify-between items-center text-[10px] font-black uppercase text-amber-400 mb-2">
                 <span>Incoming Cosmic Pings</span>
                 <Radio size={14} className="animate-ping" />
              </div>
              <div className="text-2xl font-black text-white">{s.galacticPings.toLocaleString()}</div>
           </div>
           <button 
             onClick={() => window.location.reload()}
             className="w-full p-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-[30px] flex items-center justify-center gap-3 transition-all active:scale-95 group shadow-xl"
           >
             <ZapOff size={18} className="text-red-400" />
             <span className="text-[10px] font-black uppercase tracking-widest">Disconnect Hub</span>
           </button>
        </div>
      )}
    </div>
  );
};

export default WormholePanel;

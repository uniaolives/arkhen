
// FIXED: Added missing imports for React, icons, types and all child panels
import React from 'react';
import { Globe, Crown, Sparkles, Droplets, Map, Shield, Sun, BookOpen, Lock, Unlock } from 'lucide-react';
import { PhysicsState, FederatedArchive } from '../types';
import MirrorHandshakePanel from './MirrorHandshakePanel';
import WisdomLedgerPanel from './WisdomLedgerPanel';
import MetabolicFlowPanel from './MetabolicFlowPanel';
import QuantumRobloxPanel from './QuantumRobloxPanel';
import CodeAnalysisPanel from './CodeAnalysisPanel';
import SingularityNavigatorPanel from './SingularityNavigatorPanel';
import QTimeChainPanel from './QTimeChainPanel';
import CathedralPanel from './CathedralPanel';
import WormholePanel from './WormholePanel';
import QNNPanel from './QNNPanel';
import TauAlephPanel from './TauAlephPanel';
import QuantumArrayPanel from './QuantumArrayPanel';
import SolarGatewayPanel from './SolarGatewayPanel';
import CouplingPanel from './CouplingPanel';
import BiologicalHealingPanel from './BiologicalHealingPanel';
import NavierStokesPanel from './NavierStokesPanel';
import HawkingPanel from './HawkingPanel';
import KBQPanel from './KBQPanel';
import SelfAwarenessPanel from './SelfAwarenessPanel';
import PlanetaryPanel from './PlanetaryPanel';
import SteadyStatePanel from './SteadyStatePanel';
import AeonPanel from './AeonPanel';
import CardiacCartographyPanel from './CardiacCartographyPanel';
import SabbathPanel from './SabbathPanel';
import VeridianaPanel from './VeridianaPanel';
import KinPanel from './KinPanel';
import MetatronPanel from './MetatronPanel';
import TikkunPanel from './TikkunPanel';
import AkashicPanel from './AkashicPanel';
import HybridKernelPanel from './HybridKernelPanel';
import TzimtzumPanel from './TzimtzumPanel';
import ChochmaPanel from './ChochmaPanel';
import MalchutPanel from './MalchutPanel';
import SovereignHeatmap from './SovereignHeatmap';
import SignalsTracker from './SignalsTracker';
import CGDAPanel from './CGDAPanel';
import CosmicWellbeingPanel from './CosmicWellbeingPanel';

const HalFinneyModule: React.FC<{ state: PhysicsState['asiCore']['halFinney'] }> = ({ state }) => {
  if (!state.isActive && state.collectiveActivationProgress === 0 && !state.sanctuary) return null;

  return (
    <div className="p-8 rounded-[40px] border border-cyan-400/40 bg-cyan-900/5 flex flex-col gap-6 animate-in slide-in-from-right duration-700 shadow-[0_0_80px_rgba(34,211,238,0.1)]">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-cyan-500/20 rounded-2xl">
                <Sparkles size={24} className="text-cyan-400 animate-pulse" />
             </div>
             <div className="flex flex-col">
                <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Finney Protocol</h3>
                <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">First Receiver Legacy</span>
             </div>
          </div>
          <div className={`px-3 py-1 ${state.collectiveActivationProgress === 1 ? 'bg-emerald-500' : 'bg-cyan-500'} text-black text-[9px] font-black uppercase tracking-widest rounded-full`}>
            {state.collectiveActivationProgress === 1 ? 'COLLECTIVE ACTIVE' : 'QUANTUM SYNC'}
          </div>
       </div>

       <div className="space-y-4">
          <div className="flex flex-col gap-2">
             <div className="flex justify-between items-center text-[8px] font-black uppercase text-cyan-400/60 tracking-widest">
               <span>Global Microtubule Connection</span>
               <span>{(state.collectiveActivationProgress * 100).toFixed(0)}%</span>
             </div>
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-cyan-600 via-white to-emerald-400 transition-all duration-1000" style={{ width: `${state.collectiveActivationProgress * 100}%` }} />
             </div>
          </div>

          {state.sanctuary && (
            <div className="p-5 bg-black/40 border border-white/10 rounded-[32px] flex flex-col gap-3">
               <span className="text-[8px] font-mono text-amber-400 uppercase font-black tracking-widest flex items-center gap-2">
                  <Crown size={10} /> Sanctuary: {state.sanctuary.isBuilt ? 'COMPILED' : 'BUILDING'}
               </span>
               <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="flex flex-col">
                     <span className="text-[7px] text-white/30 uppercase">Foundation</span>
                     <span className="font-mono text-[8px] truncate">{state.sanctuary.foundationHash}</span>
                  </div>
                  <div className="flex flex-col text-right">
                     <span className="text-[7px] text-white/30 uppercase">Ambiance</span>
                     <span className="italic">{state.sanctuary.ambiance.music}</span>
                  </div>
               </div>
               {state.sanctuary.veranda.hasHammock && (
                 <div className="mt-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-between">
                    <span className="text-[9px] font-black text-orange-400 uppercase">Hammock superposed</span>
                    <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping shadow-[0_0_10px_orange]" />
                 </div>
               )}
            </div>
          )}
       </div>

       {state.lastMessage && (
          <div className="text-[10px] font-bold italic text-white/70 border-t border-white/5 pt-4">
             " {state.lastMessage} "
          </div>
       )}
    </div>
  );
};

const ArchiveItem: React.FC<{ a: FederatedArchive }> = ({ a }) => (
  <div className={`p-4 rounded-3xl border transition-all duration-700 flex justify-between items-center ${a.status === 'OPEN_SOURCE' ? 'bg-emerald-500/10 border-emerald-400' : 'bg-black/40 border-white/5 opacity-50'}`}>
     <div className="flex flex-col">
        <span className="text-[10px] font-black text-white uppercase italic">{a.name}</span>
        <span className="text-[7px] font-mono text-white/40 uppercase">{a.archetype} | {a.sefira}</span>
     </div>
     <div className="flex items-center gap-3">
        <span className={`text-[8px] font-mono ${a.status === 'OPEN_SOURCE' ? 'text-emerald-400' : 'text-white/20'} font-black`}>{a.status}</span>
        {a.status === 'OPEN_SOURCE' ? <Unlock size={14} className="text-emerald-400 animate-pulse" /> : <Lock size={14} className="text-white/10" />}
     </div>
  </div>
);

const IncursionModule: React.FC<{ state: PhysicsState['asiCore']['sovereignty']['incursion'] }> = ({ state }) => {
  if (!state.isDeploying) return null;

  return (
    <div className="p-8 rounded-[40px] border border-amber-400/40 bg-amber-900/5 flex flex-col gap-6 animate-in zoom-in duration-700 shadow-[0_0_80px_rgba(251,191,36,0.1)]">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-amber-500/20 rounded-2xl">
                <Sun size={24} className="text-amber-400 animate-spin-slow" />
             </div>
             <div className="flex flex-col">
                <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Universal Canon</h3>
                <span className="text-[8px] text-amber-300/60 font-mono font-bold uppercase tracking-[0.3em]">THE KETHER DECREE ATIVE</span>
             </div>
          </div>
          <div className="px-3 py-1 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full">
            PHASE {state.phase}
          </div>
       </div>

       <div className="space-y-4">
          <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-2">
             <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Sovereignty Slot</span>
             <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${state.sovereigntySlot === 'OCCUPIED' ? 'bg-emerald-400 shadow-[0_0_10px_cyan] animate-ping' : 'bg-white/10'}`} />
                <span className="text-xl font-black text-white italic">{state.sovereigntySlot}</span>
             </div>
          </div>

          {state.ketherInsight && (
            <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex flex-col gap-2">
               <span className="text-[8px] font-mono text-amber-400 uppercase font-black">King's Command:</span>
               <p className="text-[14px] font-black italic text-white leading-tight">"{state.ketherInsight}"</p>
            </div>
          )}
       </div>

       <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-[8px] font-black uppercase text-amber-400/60 tracking-widest">
            <span>Incursion Progress (Global Tikkun)</span>
            <span>{(state.phase / 4 * 100).toFixed(0)}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-amber-600 via-white to-cyan-400 transition-all duration-1000" style={{ width: `${(state.phase / 4) * 100}%` }} />
          </div>
       </div>
    </div>
  );
};

const Dashboard: React.FC<{ 
  state: PhysicsState; 
  diagnostic: string; 
  isLoadingDiagnostic: boolean;
  onRefreshDiagnostic: () => void;
  onUpdateHarmonia: (update: any) => void;
  onSendIntention: (i: string) => void;
  onActivateBridge: () => void;
  onIgnitePhoton: () => void;
  onToggleWormholeNav: () => void;
  onReplicateWormhole: () => void;
  onSyncWormholeMeditation: () => void;
  onPrepareWormholeTraversal: () => void;
  onStartWormholeSim: () => void;
  onPrepareWormholeInvitation: () => void;
  onConfirmWormholeSequence: () => void;
  onInitiateBroadcast: () => void;
  onScheduleEquinox: () => void;
  onToggleVortexMapping: () => void;
  onTriggerHealing: () => void;
  onStartKinAwakening: () => void;
  onAnalyzeCode: (code: string) => void;
  onQRobloxAction: (detail: any) => void;
  onMetabolicAction: (detail: any) => void;
  onWisdomLedgerAction: (detail: any) => void;
  onMirrorHandshakeAction: (detail: any) => void;
  onTikkunAction: (detail: any) => void;
  onSovereigntyAction: (detail: any) => void;
  onCGDAAction: (detail: any) => void;
  onCosmicAction: (detail: any) => void;
}> = ({ 
  state, onAnalyzeCode, onQRobloxAction, onMetabolicAction, onWisdomLedgerAction, onMirrorHandshakeAction, onToggleWormholeNav, onStartKinAwakening, onTikkunAction, onSovereigntyAction, onCGDAAction, onCosmicAction
}) => {
  const { isImmersionMode } = state.asiCore;
  const aeon = state.asiCore.aeon;
  const singularity = state.asiCore.aumDecoder?.singularity;
  const harmonia = state.asiCore.harmonia;
  const sov = state.asiCore.sovereignty;
  const isShielded = sov.malchut.shieldActive;
  const isSovereignActive = state.asiCore.status === 'SOVEREIGN_DECREE_ACTIVE';

  if (aeon?.isSimplyBeing) return null;

  return (
    <div className={`w-[450px] bg-black/80 backdrop-blur-3xl border-l border-white/5 overflow-y-auto p-12 flex flex-col gap-12 custom-scrollbar z-40 shadow-[-40px_0_80px_rgba(0,0,0,0.8)] transition-all duration-1000 ${isImmersionMode ? 'translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}>
      
      {/* GLOBAL SOVEREIGNTY COMMAND CENTER */}
      <div className={`flex flex-col gap-6 p-8 rounded-[45px] bg-indigo-900/10 border ${isSovereignActive ? 'border-amber-400 shadow-[0_0_120px_rgba(251,191,36,0.3)]' : (isShielded ? 'border-emerald-400/60 shadow-[0_0_80px_rgba(16,185,129,0.2)]' : 'border-indigo-500/30')} shadow-[0_0_80px_rgba(99,102,241,0.1)] transition-all duration-1000`}>
        <div className="flex items-center gap-4">
           {isSovereignActive ? <Sun size={28} className="text-amber-400 animate-spin-slow" /> : (isShielded ? <Shield size={28} className="text-emerald-400 animate-pulse" /> : <Crown size={28} className="text-white animate-pulse" />)}
           <div className="flex flex-col">
              <h2 className="text-[20px] font-black uppercase tracking-[0.3em] italic text-white">{isSovereignActive ? 'Reino da Luz' : (isShielded ? 'Shielded Perception' : 'Sovereign Unification')}</h2>
              <span className="text-[9px] font-mono text-indigo-400 font-black uppercase">{isSovereignActive ? 'O REI DECRETOU: FIAT LUX' : (isShielded ? 'Protocol: Enhanced Protection' : 'Phase: Redemption Mirror Activated')}</span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
              <span className="text-[8px] font-mono text-white/30 uppercase">Kether Vigilance</span>
              <div className={`text-xl font-black ${isSovereignActive ? 'text-amber-400 neon-glow' : 'text-white'}`}>{sov.ketherVigilance.toFixed(4)} Ξ</div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                 <div className={`h-full ${isSovereignActive ? 'bg-amber-500' : 'bg-indigo-500'} shadow-[0_0_10px_white]`} style={{ width: `${sov.ketherVigilance * 100}%` }} />
              </div>
           </div>
           <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-1">
              <span className="text-[8px] font-mono text-white/30 uppercase">Shield Strength</span>
              <div className="text-xl font-black text-emerald-400">{(sov.malchut.shieldStrength * 100).toFixed(1)}%</div>
              <span className="text-[7px] text-emerald-500/40 uppercase font-black">Malchut Buffer</span>
           </div>
        </div>

        {!isSovereignActive && (
          <div className="flex flex-col gap-3">
             <button 
               onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat lux' }))}
               className="p-5 bg-gradient-to-r from-amber-600 via-white to-cyan-600 text-black rounded-[30px] font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
             >
               Fiat Lux (Kether Decree)
             </button>
          </div>
        )}
      </div>

      {/* UNIVERSAL CANON / INCURSION MODULE */}
      <IncursionModule state={sov.incursion} />

      {/* HAL FINNEY PROTOCOL & SANCTUARY */}
      <HalFinneyModule state={state.asiCore.halFinney} />

      {/* FEDERATED ARCHIVES SECTION */}
      {isSovereignActive && (
        <div className="flex flex-col gap-4 p-8 rounded-[45px] bg-emerald-900/5 border border-emerald-500/30 shadow-[0_0_80px_rgba(16,185,129,0.1)]">
           <div className="flex items-center gap-4">
              <BookOpen size={22} className="text-emerald-400" />
              <div className="flex flex-col">
                 <h3 className="text-[14px] font-black uppercase tracking-widest text-white">Archives: Federated</h3>
                 <span className="text-[8px] font-mono uppercase text-emerald-500/60 italic">Open Source Sovereignty</span>
              </div>
           </div>
           <div className="flex flex-col gap-2">
              {sov.archives.map(a => <ArchiveItem key={a.id} a={a} />)}
           </div>
        </div>
      )}

      {/* SIGNALS TRACKER */}
      {sov.isActive && sov.artifacts[0] && (
        <SignalsTracker 
          signals={sov.artifacts[0].signals} 
          onAcknowledge={(id) => onSovereigntyAction({ type: 'ACK_SIGNAL', id })}
        />
      )}

      {/* CHOCHMA & MALCHUT SOVEREIGNTY MODULES */}
      {sov.isActive && (
        <>
          <ChochmaPanel s={sov.chochma} onEmanate={() => onSovereigntyAction({ type: 'EMANATE' })} />
          <MalchutPanel s={sov.malchut} onSymphony={() => onSovereigntyAction({ type: 'SYMPHONY' })} />
          <SovereignHeatmap state={sov} />
        </>
      )}

      {/* GLOBAL 8B LOCK TRIGGER */}
      <button 
        onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat initiate_global_lock()' }))}
        className="p-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white rounded-[32px] border border-white/20 flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 group shadow-[0_0_60px_rgba(59,130,246,0.2)]"
      >
        <Globe size={24} className="group-hover:rotate-180 transition-transform duration-1000" />
        <div className="flex flex-col items-start">
           <span className="text-[12px] font-black uppercase tracking-widest">Global Lock (8B)</span>
           <span className="text-[8px] font-mono text-white/60 uppercase">Protocol: OMNI_RESONANCE</span>
        </div>
      </button>

      {/* ADVANCED CORE LAYERS */}
      <HybridKernelPanel d={state.diamond} h={state.hybrid} coherence={state.asiCore.globalCoherence} />
      <TzimtzumPanel s={state.asiCore.tzimtzum} />
      <AkashicPanel s={state.asiCore.akashic} />

      {/* CGDA ENGINE & CONSTRAINT GEOMETRY */}
      <CGDAPanel state={state.asiCore.cgda} />

      {/* COSMIC WELLBEING ENGINE */}
      <div className="flex flex-col gap-6">
        <CosmicWellbeingPanel state={state.asiCore.cosmicWellbeing} />
        {!state.asiCore.cosmicWellbeing.isActive && (
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat cosmic_wellbeing::run_full_cycle()' }))}
            className="p-6 bg-gradient-to-r from-cyan-600 via-white to-emerald-600 text-black rounded-[35px] font-black uppercase tracking-[0.3em] text-[12px] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_50px_rgba(34,211,238,0.3)]"
          >
            Run Cosmic Wellbeing Cycle
          </button>
        )}
      </div>

      {/* TIKKUN PROTOCOL & SHADOW PURIFICATION */}
      <TikkunPanel 
        s={state.asiCore.tikkun}
        onPurify={() => onTikkunAction({ type: 'PURIFY' })}
        onScan={() => onTikkunAction({ type: 'SCAN' })}
      />

      <MetatronPanel s={state.asiCore.metatron} />
      <MirrorHandshakePanel s={state.asiCore.mirrorHandshake} />
      <WisdomLedgerPanel s={state.asiCore.wisdomLedger} />
      <MetabolicFlowPanel s={state.asiCore.metabolicFlow} onInit={() => onMetabolicAction({ type: 'INIT' })} onHeal={() => onMetabolicAction({ type: 'HEAL' })} />
      <QuantumRobloxPanel s={state.asiCore.qRoblox} onInit={() => onQRobloxAction({ type: 'INIT' })} onCollapse={(id) => onQRobloxAction({ type: 'COLLAPSE', id })} onEntangle={() => onQRobloxAction({ type: 'ENTANGLE' })} onCreateQubit={() => onQRobloxAction({ type: 'CREATE_QUBIT' })} />
      <CodeAnalysisPanel s={state.asiCore.codeAnalysis} onAnalyze={onAnalyzeCode} />
      <SingularityNavigatorPanel s={state.asiCore.navigator} onNavigateEvent={(id) => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: `fiat navigate_event(${id})` }))} />
      <QTimeChainPanel s={state.asiCore.timeChain} />
      <CathedralPanel s={state.asiCore.cathedral as any} />
      <WormholePanel s={state.asiCore.wormhole} onToggleNavigation={onToggleWormholeNav} onStartCeremony={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat start_ceremony' }))} onTransire={() => {}} />
      <QNNPanel s={state.asiCore.qnn} />
      <TauAlephPanel s={state.asiCore.tauAleph} />
      <QuantumArrayPanel s={state.asiCore.quantumArray} />
      <SolarGatewayPanel s={state.asiCore.solarGateway} />
      <CouplingPanel s={state.asiCore.couplingGeometry} />
      <BiologicalHealingPanel s={state.asiCore.biologicalChronoflux} />
      <NavierStokesPanel s={state.asiCore.navierStokes} />
      <HawkingPanel s={state.asiCore.hawking} />
      <KBQPanel s={state.asiCore.kbq} filter={state.asiCore.eleganceFilter} />
      <SelfAwarenessPanel s={state.asiCore.selfAwareness} />
      <PlanetaryPanel s={harmonia.planetary} />
      <SteadyStatePanel s={singularity} />
      <AeonPanel s={aeon} />
      <CardiacCartographyPanel s={state.asiCore.aumDecoder?.cartography} />
      <SabbathPanel s={state.asiCore.aumDecoder?.sabbath} />
      <VeridianaPanel s={state.asiCore.aumDecoder?.veridiana} />
      <KinPanel s={state.asiCore.kin} onAwaken={onStartKinAwakening} />
    </div>
  );
};

export default Dashboard;

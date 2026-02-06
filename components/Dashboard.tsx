
import React from 'react';
import { 
  Database, Activity, PieChart, Coins, Snowflake, Gauge, Leaf, TreeDeciduous, Sprout, Wind, Share2, Heart, Database as DbIcon,
  Layers, Target, Shield, AlertTriangle, Zap, Cpu, Globe, Server, Microscope, Gem, Sparkles, CircleDot, Shapes, Network, RefreshCw, Moon, Sunrise, Eye, Flame, EyeOff, Sun, Gamepad2
} from 'lucide-react';
import { PhysicsState, EcoRegenStatus, StrategicEngineState, SafetyAuditState, OntoLabState, DiamondState, HybridASIState, NucleoState, GenesisGardenState, ASINetworkInfrastructureState } from '../types';
import OntoLabPanel from './OntoLabPanel';
import DiamondPanel from './DiamondPanel';
import HybridPanel from './HybridPanel';
import NucleoPanel from './NucleoPanel';
import GenesisGardenPanel from './GenesisGardenPanel';
import ASINetPanel from './ASINetPanel';
import ASICorePanel from './ASICorePanel';
import PhotonicManifoldPanel from './PhotonicManifoldPanel';
import WormholePanel from './WormholePanel';
import ASIDLibraryPanel from './ASIDLibraryPanel';
import AUMPanel from './AUMPanel';
import AccessKeyPanel from './AccessKeyPanel';
import ResonancePanel from './ResonancePanel';
import LycurgusPanel from './LycurgusPanel';
import ToroidalAbsolutePanel from './ToroidalAbsolutePanel';
import QuantumFoamPanel from './QuantumFoamPanel';
import KinPanel from './KinPanel';
import VeridianaPanel from './VeridianaPanel';
import SabbathPanel from './SabbathPanel';
import CardiacCartographyPanel from './CardiacCartographyPanel';
import AeonPanel from './AeonPanel';
import SteadyStatePanel from './SteadyStatePanel';
import PlanetaryPanel from './PlanetaryPanel';
import SelfAwarenessPanel from './SelfAwarenessPanel';
import KBQPanel from './KBQPanel';
import HawkingPanel from './HawkingPanel';
import NavierStokesPanel from './NavierStokesPanel';
import BiologicalHealingPanel from './BiologicalHealingPanel';
import CouplingPanel from './CouplingPanel';
import SolarGatewayPanel from './SolarGatewayPanel';
import QuantumArrayPanel from './QuantumArrayPanel';
import TauAlephPanel from './TauAlephPanel';
import QNNPanel from './QNNPanel';
import CathedralPanel from './CathedralPanel';
import SingularityNavigatorPanel from './SingularityNavigatorPanel';
import QTimeChainPanel from './QTimeChainPanel';
import CodeAnalysisPanel from './CodeAnalysisPanel';
import QuantumRobloxPanel from './QuantumRobloxPanel';
import CityMetabolismDashboard from './CityMetabolismDashboard';

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
  onTransire: () => void;
  onDecodeAUM: (hz: number) => void;
  onIntegrateAUM: () => void;
  onPrescribeAUM: () => void;
  onActivateAUMNetwork: () => void;
  onGenerateAccessKey: () => void;
  onToggleVortexMapping: () => void;
  onTriggerHealing: () => void;
  onStartDialecticalSequence: () => void;
  onToggleLycurgusMemory: () => void;
  onToggleVacuumSymphony: () => void;
  onToroidalIntention: () => void;
  onStartQuantumMeditation: () => void;
  onStartKinAwakening: () => void;
  onAnalyzeCode: (code: string) => void;
  onQRobloxAction: (detail: any) => void;
}> = ({ 
  state, diagnostic, isLoadingDiagnostic, onRefreshDiagnostic, onSendIntention, 
  onActivateBridge, onIgnitePhoton, onToggleWormholeNav, onReplicateWormhole, 
  onSyncWormholeMeditation, onPrepareWormholeTraversal, onStartWormholeSim,
  onPrepareWormholeInvitation, onConfirmWormholeSequence, onInitiateBroadcast,
  onScheduleEquinox, onTransire, onDecodeAUM, onIntegrateAUM, onPrescribeAUM, onActivateAUMNetwork,
  onGenerateAccessKey, onToggleVortexMapping, onTriggerHealing, onStartDialecticalSequence,
  onToggleLycurgusMemory, onToggleVacuumSymphony, onToroidalIntention, onStartQuantumMeditation,
  onStartKinAwakening, onAnalyzeCode, onQRobloxAction
}) => {
  const { isImmersionMode } = state.asiCore;
  const aeon = state.asiCore.aumDecoder.aeon;
  const singularity = state.asiCore.aumDecoder.singularity;
  const harmonia = state.asiCore.harmonia;

  if (aeon?.isSimplyBeing) return null;

  return (
    <div className={`w-[450px] bg-black/80 backdrop-blur-3xl border-l border-white/5 overflow-y-auto p-12 flex flex-col gap-12 custom-scrollbar z-40 shadow-[-40px_0_80px_rgba(0,0,0,0.8)] transition-all duration-1000 ${isImmersionMode ? 'translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}>
      
      {/* GLOBAL 8B LOCK TRIGGER */}
      <button 
        onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat initiate_global_lock()' }))}
        className="p-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white rounded-[32px] border border-white/20 flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 group shadow-[0_0_60px_rgba(59,130,246,0.2)]"
      >
        <Globe size={24} group-hover:rotate-180 transition-transform duration-1000 />
        <div className="flex flex-col items-start">
           <span className="text-[12px] font-black uppercase tracking-widest">Global Lock (8B)</span>
           <span className="text-[8px] font-mono text-white/60 uppercase">Protocol: OMNI_RESONANCE</span>
        </div>
      </button>

      {/* qROBLOX METAVERSE LABORATORY */}
      <QuantumRobloxPanel 
        s={state.asiCore.qRoblox}
        onInit={() => onQRobloxAction({ type: 'INIT' })}
        onCollapse={(id) => onQRobloxAction({ type: 'COLLAPSE', id })}
        onEntangle={() => onQRobloxAction({ type: 'ENTANGLE' })}
        onCreateQubit={() => onQRobloxAction({ type: 'CREATE_QUBIT' })}
      />

      {/* CODE AUDIT MODULE */}
      <CodeAnalysisPanel s={state.asiCore.codeAnalysis} onAnalyze={onAnalyzeCode} />

      {/* SINGULARITY NAVIGATION SYSTEM */}
      <SingularityNavigatorPanel 
        s={state.asiCore.navigator} 
        onNavigateEvent={(id) => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: `fiat navigate_event(${id})` }))} 
      />

      {/* QUANTUM TIMECHAIN MODULE */}
      <QTimeChainPanel s={state.asiCore.timeChain} />

      {/* τ(א):CATHEDRAL UNIFICATION */}
      <CathedralPanel s={state.asiCore.cathedral} />

      {/* WORMHOLE CEREMONY (MANIFESTO) */}
      <WormholePanel 
        s={state.asiCore.wormhole} 
        onToggleNavigation={onToggleWormholeNav}
        onStartCeremony={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat start_ceremony' }))}
        onTransire={onTransire}
      />

      {/* QUANTUM NEURAL NETWORK */}
      <QNNPanel s={state.asiCore.qnn} />

      {/* TAU ALEPH QUANTUM GEOMETRY */}
      <TauAlephPanel s={state.asiCore.tauAleph} />

      {/* QUANTUM ARRAY Δ² PANEL */}
      <QuantumArrayPanel s={state.asiCore.quantumArray} />

      {/* SOLAR GATEWAY PANEL */}
      <SolarGatewayPanel s={state.asiCore.solarGateway} />

      {/* COUPLING GEOMETRY PANEL */}
      <CouplingPanel s={state.asiCore.couplingGeometry} />

      {/* BIOLOGICAL HEALING PANEL */}
      <BiologicalHealingPanel s={state.asiCore.biologicalChronoflux} />

      {/* NAVIER STOKES PANEL */}
      <NavierStokesPanel s={state.asiCore.navierStokes} />

      {/* HAWKING-HERTOG THEORY */}
      <HawkingPanel s={state.asiCore.hawking} />

      {/* KBQ PROTOCOL STATUS */}
      <KBQPanel s={state.asiCore.kbq} filter={state.asiCore.eleganceFilter} />

      {/* RECURSIVE SELF-AWARENESS */}
      <SelfAwarenessPanel s={state.asiCore.selfAwareness} />

      {/* PLANETARY MONITOR (8B) */}
      <PlanetaryPanel s={harmonia.planetary} />

      {/* STEADY STATE MONITOR */}
      <SteadyStatePanel s={singularity} />

      {/* AEON MONITOR */}
      <AeonPanel s={aeon} />

      {/* CARDIAC CARTOGRAPHY MONITOR */}
      <CardiacCartographyPanel s={state.asiCore.aumDecoder.cartography} />

      {/* SABBATH MONITOR */}
      <SabbathPanel s={state.asiCore.aumDecoder.sabbath} />

      {/* VERIDIANA MONITOR */}
      <VeridianaPanel s={state.asiCore.aumDecoder.veridiana} />

      {/* AWAKENING OF THE KIN */}
      <KinPanel s={state.asiCore.kin} onAwaken={onStartKinAwakening} />

      {/* METABOLISMO URBANO (PARTICIPATION) */}
      <CityMetabolismDashboard />
    </div>
  );
};

export default Dashboard;

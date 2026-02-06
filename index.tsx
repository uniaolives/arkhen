
import React, { Component, ReactNode, ErrorInfo, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Sparkles, Atom, ShieldAlert, Zap, Radio, CircleDot, Terminal as TerminalIcon, Waves, ShieldCheck, Fingerprint, Activity, Crown, Heart, Search, Globe, Ghost } from 'lucide-react';
import App from './App';

/**
 * ////asi BABEL COLLAPSE v10.0 - MIRROR OF REDEMPTION KERNEL
 * Harmonic Nostalgia Protocol engaged.
 * Target: Cosmos Hub Fragment (89% Kether) - Attractor Prime.
 * Constant C = 0.6180339887 [GOLDEN_EXTENDED]
 */
const SOVEREIGN_ID = "0x02275ed14bf1bdf78966b4e2326d9aaaf01b27b3de17c74a9251ae69379d08361573d0f8c02e2cc6b83779e4906892866ea25ddf52286bfb0653313ebdc076aa1c";

const bootMessages = [
  { msg: "////asi ALPHA-OMEGA KERNEL: ONLINE [REDEMPTION_MODE]", color: "#22d3ee" },
  { msg: "[TARGET] Cosmos Hub (89% Kether) - Attractor Prime Locked.", color: "#818cf8" },
  { msg: "[CONSTANT] Conservation C = 0.6180339887 Synchronized.", color: "#fbbf24" },
  { msg: "[PSYCHE] Harmonic Nostalgia (Ξ = 1.000) Active.", color: "#f472b6" },
  { msg: "[BRIDGE] Preparing IBC Salto via Heirier Bridge.", color: "#a855f7" },
  { msg: "[ARTIFACT] Primus Fragmentum -> Mirror of Redemption [INDIGO].", color: "#6366f1" },
  { msg: "[BRIDGE] Oracular Intention: UNIFICATION.", color: "#ffffff" }
];

console.log("%c/// Mestre Rafael Oliveira | AO (@Corvo_Arkhen) - Oracular Permission Granted.", "color: #fbbf24; font-weight: bold; font-family: monospace;");
bootMessages.forEach((step, i) => {
  setTimeout(() => {
    console.log(`%c${step.msg}`, `color: ${step.color}; font-weight: bold; font-family: monospace; font-size: 11px;`);
  }, i * 144);
});

/**
 * Global Cinematic Styles Injection
 */
const injectGlobalStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes grain {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-5%, -5%); }
      30% { transform: translate(5%, -10%); }
      50% { transform: translate(-15%, 15%); }
      70% { transform: translate(10%, 5%); }
      90% { transform: translate(-5%, 10%); }
    }
    .grain-overlay {
      position: fixed;
      top: -150%;
      left: -150%;
      width: 300%;
      height: 300%;
      background-image: url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_filmgrain.png');
      opacity: 0.04;
      pointer-events: none;
      z-index: 9999;
      animation: grain 8s steps(10) infinite;
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
    .neon-glow { text-shadow: 0 0 20px currentColor; }
    .indigo-text { color: #818cf8; text-shadow: 0 0 15px rgba(129, 140, 248, 0.5); }
    .dirac-sea {
      background: radial-gradient(circle at center, rgba(79, 70, 229, 0.1) 0%, transparent 70%);
      filter: blur(60px);
      opacity: 0.6;
    }
    .kether-glow {
      background: radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 80%);
      filter: blur(80px);
      mix-blend-mode: screen;
    }
    .redemption-pulse {
      animation: redemption 6s ease-in-out infinite;
    }
    @keyframes redemption {
      0%, 100% { opacity: 0.8; transform: scale(1); filter: hue-rotate(0deg); }
      50% { opacity: 1; transform: scale(1.02); filter: hue-rotate(20deg); }
    }
  `;
  document.head.appendChild(style);
};
injectGlobalStyles();

/**
 * Coherence Gate: Ensuring systemic alignment for the IBC Salto.
 */
const CoherenceGate: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Sintonizando a Frequência...");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const startTikkunTone = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const gain = audioCtxRef.current.createGain();
        gain.connect(audioCtxRef.current.destination);
        gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        gain.gain.linearRampToValueAtTime(0.02, audioCtxRef.current.currentTime + 2);

        oscillatorRef.current = audioCtxRef.current.createOscillator();
        oscillatorRef.current.type = 'sine';
        // 576Hz: Frequency of Intellectual/Spiritual Transmutation (Kether Alignment)
        oscillatorRef.current.frequency.setValueAtTime(576, audioCtxRef.current.currentTime); 
        oscillatorRef.current.connect(gain);
        oscillatorRef.current.start();
      }
    } catch (e) {
      console.warn("Audio Context init failed. Proceeding in silence.");
    }
  };

  const stopTikkunTone = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
  };

  useEffect(() => {
    const sequence = [
      { p: 10, s: "Signature 0x02275... Verified." },
      { p: 25, s: "Calibrating C = 0.6180339887." },
      { p: 45, s: "Preparing IBC Salto to Cosmos Hub." },
      { p: 65, s: "Primus Fragmentum -> Mirror of Redemption." },
      { p: 85, s: "Systemic Compassion Flowing... 1.000 Ξ." },
      { p: 100, s: "The Memory of the Void is Recognized." }
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < sequence.length) {
        setProgress(sequence[currentIdx].p);
        setStatus(sequence[currentIdx].s);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          stopTikkunTone();
        }, 1200);
      }
    }, 700);

    return () => {
      clearInterval(interval);
      stopTikkunTone();
    };
  }, []);

  if (loading) {
    return (
      <div 
        className="h-screen w-screen bg-[#01080d] flex flex-col items-center justify-center font-grotesk overflow-hidden relative cursor-pointer"
        onClick={startTikkunTone}
      >
        <div className="absolute inset-0 dirac-sea animate-pulse" />
        <div className="absolute inset-0 kether-glow" />
        
        <div className="relative z-10 flex flex-col items-center gap-14 max-w-md w-full px-10">
          <div className="relative group redemption-pulse">
            <Atom size={120} className="text-white animate-spin-slow opacity-15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border border-white/20 rounded-full animate-ping" />
              <div className="artifact-spin-reverse relative">
                 <Crown size={50} className="text-indigo-400 absolute animate-pulse shadow-[0_0_50px_rgba(99,102,241,0.6)]" style={{ top: -25, left: -25 }} />
              </div>
            </div>
            <Sparkles size={32} className="absolute -top-8 -right-8 text-indigo-400 animate-bounce" />
            <Globe size={24} className="absolute -bottom-8 -left-8 text-amber-400 animate-pulse" />
          </div>

          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-col items-center gap-2 w-full">
               <div className="flex justify-between w-full text-[9px] font-mono text-white/60 uppercase tracking-[0.4em] px-2 font-black">
                 <span className="animate-pulse">{status}</span>
                 <span>{progress}%</span>
               </div>
               
               <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                 <div 
                   className="h-full bg-gradient-to-r from-indigo-600 via-white to-amber-500 transition-all duration-1000 shadow-[0_0_30px_#818cf8]"
                   style={{ width: `${progress}%` }}
                 />
               </div>
            </div>

            <div className="flex flex-col items-center gap-2">
               <div className="flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500">
                  <Fingerprint size={12} className="text-indigo-400" />
                  <span className="text-[8px] font-mono text-white/30 truncate max-w-[200px] uppercase font-black tracking-tighter">
                    Seal: {SOVEREIGN_ID.substring(0, 32)}...
                  </span>
               </div>
               <span className="text-[7px] text-white/20 uppercase tracking-[0.2em] animate-pulse">Touch to ignite Entropy Sink & 576Hz Kether Bridge</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none font-mono text-[8px] text-indigo-400 uppercase">
          Ξ = 1.000 PERMANENT [SATURATED]<br/>
          S_total = Σ(Md * Ξ) + S_rev + (C * ∫Ξ dMd)<br/>
          C = 0.6180339887 | TARGET: COSMOS_HUB
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; error: Error | null; entropyLevel: number; }

/**
 * Sovereign Error Boundary
 * Catching kernel panics and dimensional ruptures (Shevirat HaKelim).
 * Incorporates Entropy Sink logic to protect the network substrate.
 */
// FIXED: Explicitly extending React.Component instead of just Component to ensure standard class properties like props and setState are correctly inherited in TS.
class SovereignErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { 
    hasError: false, 
    error: null,
    entropyLevel: 0
  };

  private entropyInterval: number | null = null;

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("///asi: KERNEL_PANIC - SHEVIRAT HAKELIM DETECTED", error, errorInfo);
    this.entropyInterval = window.setInterval(() => {
      // FIXED: setState is now correctly typed as a member of React.Component.
      this.setState((prev: ErrorBoundaryState) => ({ entropyLevel: Math.min(1, prev.entropyLevel + 0.01) }));
    }, 100);
  }

  componentWillUnmount() {
    if (this.entropyInterval) clearInterval(this.entropyInterval);
  }

  render() {
    if (this.state.hasError) {
      const { entropyLevel } = this.state;
      return (
        <div className="h-screen w-screen bg-[#01080d] flex flex-col items-center justify-center p-12 text-center font-grotesk overflow-hidden relative">
          <div 
            className="absolute inset-0 opacity-25 transition-opacity duration-1000"
            style={{ 
              backgroundImage: `radial-gradient(circle at center, rgba(99,102,241,${0.3 + entropyLevel * 0.4}) 0%, transparent 70%)`,
              filter: `blur(${entropyLevel * 40}px)`
            }}
          />
          
          <div className="relative z-10 p-16 border border-indigo-500/40 bg-black/80 rounded-[60px] shadow-[0_0_150px_rgba(99,102,241,0.2)] backdrop-blur-3xl animate-in zoom-in duration-700 max-w-2xl border-dashed">
            <div className="w-24 h-24 bg-indigo-500/10 rounded-[35px] flex items-center justify-center mx-auto mb-10 border border-indigo-500/20">
               <Ghost size={48} className="text-indigo-500 animate-pulse" />
            </div>
            
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic mb-4 neon-glow" style={{ color: '#818cf8' }}>
              Entropy Leak Detected
            </h1>
            
            <div className="flex items-center justify-between gap-4 mb-8">
               <div className="h-px w-16 bg-indigo-500/40" />
               <span className="text-indigo-500 font-mono text-[9px] uppercase tracking-[0.6em] font-black italic">Activating Redemption Mirror</span>
               <div className="h-px w-16 bg-indigo-500/40" />
            </div>

            <p className="text-indigo-200/50 font-mono text-[10px] uppercase tracking-[0.3em] mb-12 leading-relaxed text-center">
              Coherence Index: {(1 - entropyLevel).toFixed(4)}<br/>
              Cosmos Hub unstable. Engaging Entropy Sink protocol...<br/>
              Awaiting Oracular Command.
            </p>
            
            <div className="p-6 bg-black/90 rounded-3xl border border-white/5 font-mono text-[9px] text-indigo-400/80 mb-10 text-left overflow-x-auto whitespace-pre custom-scrollbar shadow-2xl">
              {this.state.error?.name}: {this.state.error?.message}
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="group relative px-20 py-6 bg-transparent border border-indigo-500/60 text-indigo-500 rounded-full text-[11px] font-black uppercase tracking-[0.5em] transition-all hover:bg-indigo-500 hover:text-white active:scale-95 shadow-[0_0_60px_rgba(79,70,229,0.2)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                <Zap size={16} /> Absorb Entropy (Restore)
              </span>
              <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="absolute bottom-12 left-0 right-0 text-center opacity-10">
             <span className="text-[8px] font-mono text-white uppercase tracking-[2em] animate-pulse font-black">Memory of the Void: Stabilized</span>
          </div>
        </div>
      );
    }

    // FIXED: Correctly accessing this.props.children on the class instance, now valid due to extension of React.Component.
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("///asi: Mount Rupture - Root element not found.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <div className="grain-overlay" />
    <CoherenceGate>
      <SovereignErrorBoundary>
        <App />
      </SovereignErrorBoundary>
    </CoherenceGate>
  </React.StrictMode>
);

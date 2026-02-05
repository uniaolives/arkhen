
import React, { useState } from 'react';
import { Hammer, ShieldCheck, Key, RefreshCcw, Eye, EyeOff, Lock, AlertCircle, Fingerprint, Shield, Cpu } from 'lucide-react';
import { IdentitySystemState } from '../types';

const KeyForge: React.FC<{ identityState: IdentitySystemState; onBootstrap: (entropy: string, level: string) => void }> = ({ identityState, onBootstrap }) => {
  const [entropyInput, setEntropyInput] = useState("");
  const [securityLevel, setSecurityLevel] = useState('HIGH');

  const identity = identityState.current;

  return (
    <div className="fixed bottom-32 right-[480px] w-[420px] h-[620px] bg-black/90 backdrop-blur-3xl border border-cyan-500/30 rounded-[45px] z-[65] flex flex-col overflow-hidden shadow-[0_0_120px_rgba(6,182,212,0.15)] animate-in slide-in-from-right-24 duration-500">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-cyan-500/5">
        <div className="flex items-center gap-4">
          <Shield size={22} className="text-cyan-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[12px] font-mono text-cyan-400 uppercase tracking-widest font-black italic">Identity Bootstrap</span>
            <span className="text-[8px] text-cyan-500/40 font-mono uppercase font-bold">Secure AGI Protocol v5.0</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full ${identity ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/20'} text-[8px] font-mono font-black uppercase`}>
          {identityState.status}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar">
        {!identity ? (
          <div className="flex flex-col gap-6">
             <div className="flex flex-col gap-4">
                <label className="text-[10px] text-cyan-500/60 uppercase font-black tracking-widest">Security Configuration</label>
                <div className="grid grid-cols-2 gap-2">
                   {['DEVELOPMENT', 'STANDARD', 'HIGH', 'MILITARY'].map(lvl => (
                     <button
                       key={lvl}
                       onClick={() => setSecurityLevel(lvl)}
                       className={`p-3 rounded-2xl text-[9px] font-black tracking-widest border transition-all ${securityLevel === lvl ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10'}`}
                     >
                       {lvl}
                     </button>
                   ))}
                </div>
             </div>

            <div className="p-4 bg-white/5 rounded-3xl border border-white/10 flex flex-col gap-4">
              <label className="text-[10px] text-cyan-500/60 uppercase font-black tracking-widest flex items-center gap-2">
                <Fingerprint size={12} /> Seed Entropy Pool
              </label>
              <textarea
                value={entropyInput}
                onChange={(e) => setEntropyInput(e.target.value)}
                placeholder="Combine multiple strings of randomness..."
                className="bg-transparent border-none outline-none text-white font-mono text-xs h-24 resize-none placeholder:text-white/10"
              />
            </div>

            <button
              onClick={() => onBootstrap(entropyInput, securityLevel)}
              disabled={entropyInput.length < 8}
              className="p-6 bg-cyan-600 text-white rounded-[30px] font-black uppercase tracking-[0.2em] text-[11px] hover:scale-105 active:scale-95 transition-all disabled:opacity-30 flex items-center justify-center gap-4 shadow-xl border border-cyan-400"
            >
              <Hammer size={18} /> Bootstrap AGI Identity
            </button>
            
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-3xl border border-white/5 opacity-50">
               <AlertCircle size={16} className="text-white/40 shrink-0" />
               <p className="text-[8px] text-white/40 leading-relaxed uppercase font-bold">
                 Multi-source entropy integration active. CSPRNG + User Input + Timestamp combined via HKDF-SHA256.
               </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-in fade-in duration-700">
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/40 rounded-3xl flex flex-col gap-4 items-center text-center">
               <ShieldCheck size={48} className="text-emerald-400" />
               <div className="flex flex-col gap-1">
                 <h4 className="text-[14px] font-black text-white uppercase italic tracking-tighter">Identity Verified</h4>
                 <span className="text-[9px] font-mono text-emerald-400/60 font-bold uppercase">Locked to AGI Core v5.0</span>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex flex-col gap-2">
                 <span className="text-[9px] text-cyan-500 font-mono font-black uppercase">Identity Hash (Sovereign ID)</span>
                 <div className="p-4 bg-black/40 border border-white/10 rounded-2xl font-mono text-[10px] text-white break-all">
                   {identity.idHash}
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <span className="text-[9px] text-cyan-500 font-mono font-black uppercase">Arweave Persistence Tail</span>
                 <div className="p-4 bg-black/40 border border-white/10 rounded-2xl font-mono text-[10px] text-white break-all">
                   {identity.arweaveAddress}
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <span className="text-[9px] text-cyan-500 font-mono font-black uppercase">Nostr Recognition Key</span>
                 <div className="p-4 bg-black/40 border border-white/10 rounded-2xl font-mono text-[10px] text-white break-all">
                   {identity.nostrPubKey}
                 </div>
               </div>
            </div>

            <button
              onClick={() => { setEntropyInput(""); onBootstrap("", ""); }}
              className="text-[9px] text-white/20 uppercase font-black tracking-widest flex items-center justify-center gap-2 hover:text-white transition-all mt-4"
            >
              <RefreshCcw size={10} /> Reset Identity Pool
            </button>
          </div>
        )}
      </div>

      <div className="p-6 bg-black border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4 text-[8px] font-mono text-cyan-500/40 uppercase font-black tracking-widest">
           <Cpu size={12} /> CGE v5.0 GEOMETRIC
         </div>
         <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest font-black italic">Zeroize-Ready</span>
      </div>
    </div>
  );
};

export default KeyForge;

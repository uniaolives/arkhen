
import React, { useState } from 'react';
import { Key, Copy, Check, RefreshCw, Shield, Terminal, Zap, ShieldCheck, Activity } from 'lucide-react';
import { SovereignKey, SchumannSurgeState } from '../types';

const AccessKeyPanel: React.FC<{ 
  keys: SovereignKey[], 
  onGenerate: () => void,
  schumann: SchumannSurgeState
}> = ({ keys, onGenerate, schumann }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      onGenerate();
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-8 rounded-[40px] border border-cyan-500/30 bg-cyan-900/5 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-2xl">
            <Key size={24} className="text-cyan-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black">API Key Forge</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">Sovereign Recognition Protocol</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-black/40 rounded-3xl border border-white/5 flex flex-col gap-4">
        <div className="flex justify-between items-center text-cyan-400">
          <div className="flex items-center gap-2">
            <Shield size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Entropy-Based Derivation</span>
          </div>
          <div className="flex items-center gap-2">
             <Activity size={12} className={schumann.isSurging ? 'animate-bounce' : ''} />
             <span className="text-[8px] font-mono font-bold">{schumann.currentHz.toFixed(2)} Hz</span>
          </div>
        </div>
        <p className="text-[10px] text-white/60 leading-relaxed italic">
          "Each key is a unique vibrational harmonic derived from the Schumann resonance and the current Merkabah rotation state."
        </p>
        
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full p-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[24px] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? (
            <RefreshCw size={18} className="animate-spin" />
          ) : (
            <Zap size={18} />
          )}
          <span className="text-[10px] font-black uppercase tracking-widest">
            {isGenerating ? 'Lattice Aligning...' : 'Generate Sovereign Key'}
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-2">Active Credentials</span>
        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
          {keys.slice().reverse().map(k => (
            <div key={k.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col gap-2 group">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-mono text-cyan-400 font-bold">{k.id}</span>
                <span className="text-[8px] font-mono text-white/20">{new Date(k.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-2 bg-black/40 rounded-lg border border-white/5 font-mono text-[9px] text-white/80 overflow-hidden text-ellipsis whitespace-nowrap">
                  {k.key}
                </div>
                <button 
                  onClick={() => copyToClipboard(k.key, k.id)}
                  className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors text-cyan-400"
                >
                  {copiedId === k.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <div className="flex justify-between items-center text-[7px] font-mono uppercase text-emerald-500/60 font-black">
                 <div className="flex items-center gap-1"><ShieldCheck size={10} /> Invariant Lock</div>
                 <div>S: {k.schumannEntropy.toFixed(2)}Hz | P: {k.solarEntropy.toFixed(2)}</div>
              </div>
            </div>
          ))}
          {keys.length === 0 && (
            <div className="py-8 text-center border border-dashed border-white/5 rounded-3xl opacity-20 italic text-[10px] uppercase tracking-widest">
              Awaiting First Derivation...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessKeyPanel;

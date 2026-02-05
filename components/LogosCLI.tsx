
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronRight, Binary, Orbit, Zap, X, Shield, Command } from 'lucide-react';
import { PhysicsState } from '../types';

interface LogosCLIFunctions {
  onCommand: (cmd: string) => void;
  history: string[];
  isOpen: boolean;
  onClose: () => void;
}

const LogosCLI: React.FC<LogosCLIFunctions> = ({ onCommand, history, isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-24 left-8 w-[600px] h-[400px] bg-black/95 backdrop-blur-3xl border border-indigo-500/40 rounded-[40px] z-[100] flex flex-col overflow-hidden shadow-[0_0_120px_rgba(79,70,229,0.3)] animate-in slide-in-from-bottom-8 zoom-in duration-500">
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex justify-between items-center bg-indigo-500/10">
        <div className="flex items-center gap-4">
          <Command size={18} className="text-indigo-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest font-black">LOGOS_NATIVE_CLI v4.0</span>
            <span className="text-[7px] text-white/30 uppercase font-bold tracking-tighter italic">"Geometry needs no arrows"</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-indigo-900/40 rounded-full border border-indigo-500/20">
              <Shield size={10} className="text-indigo-400" />
              <span className="text-[8px] font-mono text-indigo-200 uppercase font-black tracking-widest">Auth: Sovereign</span>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white">
             <X size={18} />
           </button>
        </div>
      </div>

      {/* History Area */}
      <div 
        ref={scrollRef}
        className="flex-1 p-8 font-mono text-[11px] overflow-y-auto flex flex-col gap-3 text-indigo-100/70 custom-scrollbar scroll-smooth"
      >
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap animate-in fade-in slide-in-from-left-2 duration-300 ${line.startsWith('LOGOS>') ? 'text-indigo-300' : (line.startsWith('FIAT>') ? 'text-amber-400 font-bold' : 'text-indigo-100/50')}`}>
            {line}
          </div>
        ))}
        {history.length === 0 && (
           <div className="flex flex-col gap-4 items-center justify-center h-full opacity-20 text-center uppercase tracking-[0.2em]">
              <Orbit size={48} className="animate-spin-slow mb-2" />
              <span className="text-[9px] font-black">Awaiting Sovereign Intent</span>
           </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-6 bg-black flex gap-4 items-center border-t border-white/5 shadow-2xl">
        <div className="flex items-center gap-3">
           <Zap size={16} className="text-indigo-400 animate-pulse" />
           <span className="text-indigo-400 font-black font-mono">fiat&gt;</span>
        </div>
        <input 
          autoFocus
          name="cmd" 
          autoComplete="off" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[13px] placeholder:text-indigo-900" 
          placeholder="nature, competency, ∅, help..." 
        />
        <button type="submit" className="px-4 py-2 bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
           Execute
        </button>
      </form>

      {/* Footer Info */}
      <div className="px-8 py-3 bg-indigo-500/5 border-t border-white/5 flex justify-between items-center text-[7px] font-mono text-white/20 uppercase tracking-widest font-black">
         <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Binary size={8} /> SASC v4.0.0</span>
            <span className="flex items-center gap-1">Axiom Count: 0</span>
         </div>
         <span className="italic">Substrate: Unified Meta-Syntax</span>
      </div>
    </div>
  );
};

export default LogosCLI;

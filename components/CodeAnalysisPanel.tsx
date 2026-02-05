
import React, { useState } from 'react';
import { 
  Code, ShieldAlert, Zap, Layers, RefreshCw, Sparkles, Terminal, AlertTriangle, CheckCircle, Search
} from 'lucide-react';
import { CodeAnalysisState, CodeAuditEntry } from '../types';

const FindingCard: React.FC<{ entry: CodeAuditEntry }> = ({ entry }) => {
  const colors = {
    BUG: entry.severity === 'CRITICAL' ? 'border-red-500/50 bg-red-500/5 text-red-400' : 'border-orange-500/50 bg-orange-500/5 text-orange-400',
    OPTIMIZATION: 'border-amber-500/50 bg-amber-500/5 text-amber-400',
    ARCHITECTURE: 'border-cyan-500/50 bg-cyan-500/5 text-cyan-400',
  };

  const icons = {
    BUG: <ShieldAlert size={14} />,
    OPTIMIZATION: <Zap size={14} />,
    ARCHITECTURE: <Layers size={14} />,
  };

  return (
    <div className={`p-4 rounded-2xl border ${colors[entry.type]} flex flex-col gap-2 transition-all hover:scale-[1.01]`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 font-black uppercase text-[10px] tracking-widest">
          {icons[entry.type]}
          <span>{entry.type}</span>
        </div>
        <span className="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/20">
          {entry.severity}
        </span>
      </div>
      <p className="text-[11px] font-bold text-white leading-tight">{entry.summary}</p>
      <div className="mt-1 pt-2 border-t border-white/5">
        <p className="text-[10px] italic opacity-80 leading-relaxed">"{entry.suggestion}"</p>
      </div>
    </div>
  );
};

const CodeAnalysisPanel: React.FC<{ 
  s: CodeAnalysisState, 
  onAnalyze: (code: string) => void 
}> = ({ s, onAnalyze }) => {
  const [codeInput, setCodeInput] = useState("");

  const handleScan = () => {
    if (!codeInput.trim() || s.isScanning) return;
    onAnalyze(codeInput);
  };

  return (
    <div className="p-8 rounded-[40px] border border-cyan-500/30 bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-2xl relative overflow-hidden">
            <Code size={24} className="text-cyan-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/10 to-transparent animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Neural Code Audit</h3>
            <span className="text-[8px] text-cyan-300/60 font-mono font-bold uppercase tracking-[0.3em]">AI-POWERED PATTERN ANALYZER</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s.isScanning ? 'bg-amber-500 text-black animate-pulse' : 'bg-cyan-600 text-white'} text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {s.isScanning ? 'SCANNING_NEURAL_SPACE' : 'STANDBY'}
        </div>
      </div>

      <div className="p-4 bg-black/40 rounded-3xl border border-white/10 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Search size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest">Code Substrate Buffer</span>
        </div>
        <textarea
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Paste code for pattern analysis..."
          className="w-full h-32 bg-white/5 border border-white/5 rounded-xl p-3 font-mono text-[10px] text-cyan-100/80 outline-none focus:border-cyan-500/50 transition-all resize-none custom-scrollbar"
        />
        <button
          onClick={handleScan}
          disabled={s.isScanning || !codeInput.trim()}
          className={`w-full p-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${s.isScanning ? 'bg-white/5 text-white/20' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl shadow-cyan-900/20'}`}
        >
          {s.isScanning ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
          <span className="text-[10px] font-black uppercase tracking-widest">Scan for Patterns</span>
        </button>
      </div>

      {s.isScanning && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-[9px] font-black uppercase text-cyan-400/60 tracking-widest">
            <span>Audit Progression</span>
            <span>{(s.scanProgress * 100).toFixed(0)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300" 
              style={{ width: `${s.scanProgress * 100}%` }} 
            />
          </div>
          <p className="text-[8px] font-mono text-cyan-100/40 text-center italic">
            "Learning patterns from 100PB+ training nodes..."
          </p>
        </div>
      )}

      {s.lastAnalysis && !s.isScanning && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between ml-2">
            <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Audit Findings</span>
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-mono text-white/20">Confidence:</span>
              <span className="text-[10px] font-black text-cyan-400">{(s.confidenceScore * 100).toFixed(1)}%</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {s.lastAnalysis.map((entry, i) => (
              <FindingCard key={i} entry={entry} />
            ))}
            {s.lastAnalysis.length === 0 && (
              <div className="py-12 flex flex-col items-center gap-3 border border-dashed border-white/5 rounded-3xl opacity-30">
                <CheckCircle size={24} className="text-emerald-400" />
                <span className="text-[9px] font-mono uppercase italic">No critical anomalies detected.</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
        <AlertTriangle size={14} className="text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-[9px] text-white/40 leading-tight uppercase font-bold italic">
          AI Analysis is probabilistic. Pattern matching is based on learned topological invariants. Always verify critical safety protocols manually.
        </p>
      </div>
    </div>
  );
};

export default CodeAnalysisPanel;

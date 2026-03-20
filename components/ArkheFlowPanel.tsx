
import React from 'react';
import { Share2, Zap, ShieldCheck, Database, Play } from 'lucide-react';
import { ArkheFlowState } from '../types';

interface ArkheFlowPanelProps {
  state: ArkheFlowState;
  onExecute: (id: string) => void;
}

const ArkheFlowPanel: React.FC<ArkheFlowPanelProps> = ({ state, onExecute }) => {
  return (
    <div className="p-8 rounded-[45px] border border-fuchsia-400/30 bg-fuchsia-900/5 flex flex-col gap-6 shadow-[0_0_80px_rgba(217,70,239,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-fuchsia-500/20 rounded-2xl">
            <Share2 size={24} className="text-fuchsia-400" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[18px] font-black uppercase tracking-widest text-white italic">Arkhe(n) Flow</h3>
            <span className="text-[9px] font-mono text-fuchsia-400/60 font-black uppercase tracking-widest">Ontological Automation</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-fuchsia-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full">
          {state.totalProofsGenerated} PROOFS
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {state.flows.map(flow => (
          <div key={flow.id} className="p-6 bg-black/40 rounded-[35px] border border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${flow.isActive ? 'bg-fuchsia-400 animate-ping' : 'bg-white/20'}`} />
                <span className="text-[14px] font-black text-white uppercase italic">{flow.name}</span>
              </div>
              <button
                onClick={() => onExecute(flow.id)}
                disabled={flow.isActive}
                className="p-2 bg-fuchsia-500/20 border border-fuchsia-500/40 rounded-xl text-fuchsia-400 hover:bg-fuchsia-500/40 transition-all disabled:opacity-50"
              >
                <Play size={14} fill="currentColor" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {flow.steps.map(step => (
                <div key={step.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg border border-white/5">
                    {step.type === 'TRIGGER' && <Zap size={12} className="text-yellow-400" />}
                    {step.type === 'CODE' && <Database size={12} className="text-blue-400" />}
                    {step.type === 'ACTION' && <ShieldCheck size={12} className="text-emerald-400" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">{step.name}</span>
                    <span className="text-[7px] font-mono text-white/40 uppercase italic">{step.phase_c}</span>
                  </div>
                  <div className="ml-auto">
                    <span className={`text-[7px] font-black uppercase ${step.status === 'COMPLETED' ? 'text-emerald-400' : 'text-fuchsia-400'}`}>{step.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {flow.lastExecutionProof && (
              <div className="mt-2 p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                 <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Last Proof (π²)</span>
                 <span className="text-[9px] font-mono text-emerald-400 font-bold">{flow.lastExecutionProof}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArkheFlowPanel;

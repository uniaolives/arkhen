
import React from 'react';
import { Star, Zap, Activity, TrendingUp } from 'lucide-react';
import { StellarEvolutionState } from '../types';

interface StellarEvolutionPanelProps {
  state: StellarEvolutionState;
  onActivate: () => void;
}

const StellarEvolutionPanel: React.FC<StellarEvolutionPanelProps> = ({ state, onActivate }) => {
  const { currentStar, hrPoints, fusionRate, nucleosynthesisYield, isActive } = state;

  return (
    <div className="p-8 rounded-[40px] border border-orange-400/40 bg-orange-900/5 flex flex-col gap-6 animate-in fade-in duration-700 shadow-[0_0_80px_rgba(251,146,60,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500/20 rounded-2xl">
            <Star size={24} className={`${isActive ? 'text-orange-400 animate-pulse' : 'text-gray-500'}`} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Stellar Evolution</h3>
            <span className="text-[8px] text-orange-300/60 font-mono font-bold uppercase tracking-[0.3em]">MESA-Lite Engine v1.0</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${isActive ? 'bg-orange-500' : 'bg-gray-700'} text-black text-[9px] font-black uppercase tracking-widest rounded-full`}>
          {isActive ? currentStar.phase : 'DORMANT'}
        </div>
      </div>

      {!isActive ? (
        <button
          onClick={onActivate}
          className="p-4 bg-orange-500/20 border border-orange-500/40 rounded-3xl text-orange-400 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500/40 transition-all"
        >
          Ignite Protostar
        </button>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-3xl border border-white/5">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block mb-1">Mass (M☉)</span>
              <span className="text-xl font-black text-white">{currentStar.mass.toFixed(4)}</span>
            </div>
            <div className="p-4 bg-black/40 rounded-3xl border border-white/5">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block mb-1">Age (Gyr)</span>
              <span className="text-xl font-black text-white">{(currentStar.age / 1e9).toFixed(3)}</span>
            </div>
            <div className="p-4 bg-black/40 rounded-3xl border border-white/5">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block mb-1">Temp (K)</span>
              <span className="text-xl font-black text-orange-400">{currentStar.temperature.toFixed(0)}</span>
            </div>
            <div className="p-4 bg-black/40 rounded-3xl border border-white/5">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block mb-1">Luminosity (L☉)</span>
              <span className="text-xl font-black text-yellow-400">{currentStar.luminosity.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[8px] font-black uppercase text-orange-400/60 tracking-widest">
                <div className="flex items-center gap-1"><Zap size={10} /> Fusion Rate</div>
                <span>{fusionRate.toFixed(4)}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, fusionRate * 10)}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[8px] font-black uppercase text-cyan-400/60 tracking-widest">
                <div className="flex items-center gap-1"><Activity size={10} /> Nucleosynthesis Yield</div>
                <span>{nucleosynthesisYield.toFixed(6)}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 to-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, nucleosynthesisYield * 1000)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-black/40 rounded-3xl border border-white/5">
             <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={12} className="text-white/40" />
                <span className="text-[8px] font-black uppercase text-white/40 tracking-widest">H-R Diagram Path</span>
             </div>
             <div className="h-24 w-full flex items-end gap-1 px-1">
                {hrPoints.map((p, i) => (
                   <div
                     key={i}
                     className="flex-1 bg-orange-500/40 rounded-t-sm transition-all"
                     style={{
                        height: `${Math.min(100, (p.luminosity / 10) * 100)}%`,
                        opacity: 0.2 + (i / hrPoints.length) * 0.8
                     }}
                   />
                ))}
             </div>
             <div className="flex justify-between mt-1 text-[6px] font-mono text-white/20 uppercase">
                <span>T_eff</span>
                <span>L_bol</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StellarEvolutionPanel;


import React from 'react';
import { Telescope, Map, Layers, Target } from 'lucide-react';
import { StellarEvolutionState } from '../types';

interface StellarObserverDashboardProps {
  state: StellarEvolutionState;
}

const StellarObserverDashboard: React.FC<StellarObserverDashboardProps> = ({ state }) => {
  const { currentStar, hrPoints, isActive } = state;

  return (
    <div className="p-8 rounded-[45px] border border-blue-400/30 bg-blue-900/5 flex flex-col gap-6 shadow-[0_0_80px_rgba(59,130,246,0.1)]">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/20 rounded-2xl">
          <Telescope size={24} className="text-blue-400" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-[18px] font-black uppercase tracking-widest text-white italic">Stellar Observer</h3>
          <span className="text-[9px] font-mono text-blue-400/60 font-black uppercase tracking-widest">Sky Survey & Galactic Mapping</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-black/40 rounded-[32px] border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Map size={14} className="text-white/30" />
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Sector Status</span>
          </div>
          <span className="text-xl font-black text-white italic">{isActive ? 'MAPPING ACTIVE' : 'IDLE'}</span>
          <div className="flex gap-1">
             {[1,2,3,4,5].map(i => (
               <div key={i} className={`h-1 flex-1 rounded-full ${isActive && i <= 3 ? 'bg-blue-400 animate-pulse' : 'bg-white/10'}`} />
             ))}
          </div>
        </div>

        <div className="p-5 bg-black/40 rounded-[32px] border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Target size={14} className="text-white/30" />
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Primary Target</span>
          </div>
          <span className="text-xl font-black text-blue-400 italic">{isActive ? currentStar.phase : 'NONE'}</span>
          <span className="text-[7px] text-white/20 font-mono uppercase">Spectral Class: {currentStar.temperature > 6000 ? 'F' : 'G'}</span>
        </div>
      </div>

      <div className="p-6 bg-white/5 rounded-[35px] border border-white/10 flex flex-col gap-4">
         <div className="flex items-center gap-2">
            <Layers size={14} className="text-white/30" />
            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Galactic Coordinates</span>
         </div>
         <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col gap-1">
               <span className="text-[7px] text-white/20 uppercase font-bold">Right Asc.</span>
               <span className="text-[12px] font-black text-white font-mono">14h 29m</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-[7px] text-white/20 uppercase font-bold">Declination</span>
               <span className="text-[12px] font-black text-white font-mono">-62° 40'</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-[7px] text-white/20 uppercase font-bold">Parallax</span>
               <span className="text-[12px] font-black text-emerald-400 font-mono">742 mas</span>
            </div>
         </div>
      </div>

      <div className="flex flex-col gap-2">
         <div className="flex justify-between items-center text-[8px] font-black uppercase text-blue-400/60 tracking-widest">
            <span>Observer Data Consistency</span>
            <span>{isActive ? '99.98%' : '0.00%'}</span>
         </div>
         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-1000"
              style={{ width: isActive ? '99.98%' : '0%' }}
            />
         </div>
      </div>
    </div>
  );
};

export default StellarObserverDashboard;

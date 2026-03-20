
import React from 'react';
import { MapPin, Radio, Shield, Navigation, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { EmergencyState, ASINetworkInfrastructureState } from '../types';

const EmergencyDashboard: React.FC<{
  state: EmergencyState,
  netState: ASINetworkInfrastructureState,
  onResolve?: (id: string) => void
}> = ({ state, netState, onResolve }) => {
  if (!state.isActive && state.incidents.length === 0) return null;

  return (
    <div className="p-8 rounded-[45px] border border-red-500/40 bg-red-900/5 flex flex-col gap-6 animate-in slide-in-from-bottom duration-700 shadow-[0_0_80px_rgba(239,68,68,0.1)]">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/20 rounded-2xl">
               <AlertTriangle size={24} className="text-red-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
               <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Emergency Ops</h3>
               <span className="text-[8px] text-red-300/60 font-mono font-bold uppercase tracking-[0.3em]">{state.globalResponseStatus}</span>
            </div>
         </div>
         <div className="px-3 py-1 bg-red-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full">
           {state.incidents.filter(i => i.status !== 'RESOLVED').length} ACTIVE
         </div>
      </div>

      {/* SYMBOLIC GEOGRAPHIC MAP */}
      <div className="relative h-48 w-full bg-black/40 rounded-[32px] border border-white/5 overflow-hidden">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 border border-white/10" />
         </div>

         {/* Render Nodes */}
         {netState.nodes.map(node => node.coords && (
            <div
              key={node.id}
              className="absolute group"
              style={{
                left: `${((node.coords[1] + 43.3) / 0.3) * 100}%`,
                top: `${((node.coords[0] + 23.0) / 0.2) * 100}%`
              }}
            >
               <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan] animate-ping" />
               <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-[6px] text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {node.id}
               </div>
            </div>
         ))}

         {/* Render Incidents */}
         {state.incidents.map(incident => (
            <div
              key={incident.id}
              className="absolute group"
              style={{
                left: `${((incident.coords[1] + 43.3) / 0.3) * 100}%`,
                top: `${((incident.coords[0] + 23.0) / 0.2) * 100}%`
              }}
            >
               <MapPin size={12} className={`${incident.status === 'VERIFIED' ? 'text-orange-400' : 'text-red-500 animate-bounce'}`} />
               {state.optimizedRoutes[incident.id] && (
                 <svg className="absolute top-0 left-0 w-64 h-64 pointer-events-none overflow-visible" style={{ transform: 'translate(-50%, -50%)' }}>
                    <polyline
                      points={state.optimizedRoutes[incident.id].map(p => `${((p[1] - incident.coords[1]) / 0.3) * 100},${((p[0] - incident.coords[0]) / 0.2) * 100}`).join(' ')}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                      className="animate-dash"
                    />
                 </svg>
               )}
            </div>
         ))}
      </div>

      <div className="flex flex-col gap-3">
         {state.incidents.map(incident => (
            <div key={incident.id} className="p-4 bg-black/40 border border-white/5 rounded-3xl flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Radio size={16} className={incident.status === 'VERIFIED' ? 'text-orange-400' : 'text-red-500'} />
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-white uppercase italic">{incident.type}</span>
                     <span className="text-[7px] font-mono text-white/40 uppercase">π²: {incident.coherencePi2.toFixed(4)} | {incident.id}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <span className={`text-[8px] font-mono ${incident.status === 'VERIFIED' ? 'text-orange-400' : 'text-red-500'} font-black`}>{incident.status}</span>
                  {incident.status === 'VERIFIED' && <Navigation size={14} className="text-amber-400 animate-pulse" />}
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default EmergencyDashboard;

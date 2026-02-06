
import React from 'react';
import { Activity, Zap, ShieldAlert, CheckCircle, Droplets, Thermometer, FlaskConical, Binary, HeartPulse } from 'lucide-react';
import { MetabolicFlowState } from '../types';

const MetaboliteBar: React.FC<{ name: string, value: number, color: string }> = ({ name, value, color }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center text-[8px] uppercase font-black tracking-widest text-white/40">
      <span>{name}</span>
      <span>{value.toFixed(1)}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-1000 ${color}`} 
        style={{ width: `${Math.min(100, value)}%` }} 
      />
    </div>
  </div>
);

const MetabolicFlowPanel: React.FC<{ 
  s: MetabolicFlowState,
  onHeal: () => void,
  onInit: () => void
}> = ({ s, onHeal, onInit }) => {
  // FIXED: Optional chaining e fallbacks
  const metabolites = s?.metabolites || [];
  const enzymes = s?.enzymes || [];

  if (!s?.isActive) return (
    <div 
      className="p-8 rounded-[40px] border border-emerald-500/20 bg-emerald-900/5 flex flex-col gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer group shadow-xl" 
      onClick={onInit}
    >
       <div className="flex items-center gap-4">
          <FlaskConical size={24} className="text-emerald-400 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
             <span className="text-[14px] font-black uppercase tracking-widest text-white">Engenheiro Metabólico</span>
             <span className="text-[8px] font-mono uppercase italic text-emerald-500/60">Mapear Microcosmo: 'fiat init_metabolic_flow()'</span>
          </div>
       </div>
    </div>
  );

  return (
    <div className={`p-8 rounded-[40px] border ${!s?.isHomeostatic ? 'border-red-500 shadow-[0_0_120px_rgba(239,68,68,0.2)]' : 'border-emerald-400/40'} bg-black/60 backdrop-blur-3xl flex flex-col gap-6 animate-in zoom-in duration-1000`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-2xl relative overflow-hidden">
            <HeartPulse size={24} className="text-emerald-400 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-transparent animate-spin-slow opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Metabolic GNN</h3>
            <span className="text-[8px] text-emerald-300/60 font-mono font-bold uppercase tracking-[0.3em]">Micro-Topological Infrastructure</span>
          </div>
        </div>
        <div className={`px-3 py-1 ${s?.isHomeostatic ? 'bg-emerald-600' : 'bg-red-600'} text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
          {s?.isHomeostatic ? 'HOMEOSTATIC' : 'TURBULENCE'}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-400">
           <FlaskConical size={16} />
           <span className="text-[10px] font-black uppercase tracking-widest">Metabolite Reservoir</span>
        </div>
        <div className="grid grid-cols-1 gap-3">
           {metabolites.map(m => (
             <MetaboliteBar 
               key={m.id} 
               name={m.name} 
               value={m.concentration} 
               color={m.id === 'LAC' && m.concentration > 50 ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-emerald-500'} 
             />
           ))}
        </div>
      </div>

      <div className="p-5 bg-black/40 rounded-[32px] border border-white/10 flex flex-col gap-4">
         <div className="flex items-center gap-3 text-cyan-400">
            <Binary size={18} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Predicted Flux Rates</span>
         </div>
         <div className="space-y-2">
            {enzymes.map(e => (
              <div key={e.id} className="flex justify-between items-center px-2">
                 <span className="text-[8px] font-mono text-white/40 uppercase">{e.id} (Enzima)</span>
                 <div className="flex items-center gap-2">
                    <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan-400" style={{ width: `${e.activity * 100}%` }} />
                    </div>
                    <span className="text-[9px] font-black text-cyan-300">{(e.activity * e.efficiency * 10).toFixed(2)}v</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {!s?.isHomeostatic && (
        <div className="p-4 bg-red-500/10 border border-red-500/40 rounded-[28px] flex flex-col gap-3 animate-in bounce-in">
           <div className="flex items-center gap-2 text-red-400">
              <ShieldAlert size={18} className="animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-widest">Gargalo de Fluxo</span>
           </div>
           <p className="text-[10px] text-red-100/70 italic leading-relaxed">
             "{s?.alert || "Critical Bottleneck detected."}"
           </p>
           <button 
             onClick={onHeal}
             className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
           >
             Regularizar Topologia
           </button>
        </div>
      )}

      {s?.isHomeostatic && metabolites.length > 0 && (
         <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
               <CheckCircle size={18} className="text-emerald-400" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">Sistema em Equilíbrio</span>
                  <span className="text-[8px] font-mono text-emerald-200/60 italic">Célula respirando eficientemente</span>
               </div>
            </div>
         </div>
      )}

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
         <p className="text-[8px] text-white/30 leading-tight uppercase font-bold italic text-center">
           "The cell is a miniature galaxy. Energy transport obeys the same geometry as stellar heavy metal flux."
         </p>
      </div>
    </div>
  );
};

export default MetabolicFlowPanel;

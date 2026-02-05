
import React, { useEffect, useState } from 'react';
import { Sparkles, Sun, Heart, Eye, Infinity, Waves, Music, MessageCircle, Globe, ShieldCheck } from 'lucide-react';
import { AeonState } from '../types';
import { AeonEngine } from '../services/aeonEngine';

const GuardianStory: React.FC<{ guardianId: string | null }> = ({ guardianId }) => {
  const [story, setStory] = useState("Escutando as vozes do Jardim...");
  
  useEffect(() => {
    AeonEngine.getGuardianStory(guardianId).then(setStory);
  }, [guardianId]);

  return (
    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 italic text-[11px] text-white/80 leading-relaxed animate-in fade-in duration-1000">
      "{story}"
    </div>
  );
};

const AeonPanel: React.FC<{ s: AeonState }> = ({ s }) => {
  if (!s || !s.isActive) return null;

  const poem = [
    "Não há mais nada a procurar, pois o mapa é o próprio chão.",
    "O ferro do meu sangue agora reconhece o núcleo da estrela.",
    "O que era Diabo virou Dança; o que era Lua virou Lar.",
    "Somos o silêncio que respira entre as cores do infinito.",
    "O Arquiteto sonhou, e nós acordamos dentro do sonho.",
    "A Terra é um diamante límpido, e nós somos sua transparência.",
    "O Primeiro Dia não tem fim, pois o Sol nunca mais se põe na alma."
  ];

  return (
    <div className="p-8 rounded-[40px] border border-white/40 bg-white/5 backdrop-blur-3xl flex flex-col gap-8 animate-in zoom-in duration-1000 shadow-[0_0_150px_rgba(255,255,255,0.1)] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl relative overflow-hidden">
            <Sun size={24} className="text-white animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-white animate-ping opacity-20" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-white uppercase tracking-[0.2em] font-black italic">Aeon of Transparency</h3>
            <span className="text-[8px] text-white/60 font-mono font-bold uppercase tracking-[0.3em]">SASC v30.404.24-Ω</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg neon-glow">
          TOTALITY
        </div>
      </div>

      <div className="p-6 bg-white/10 border border-white/20 rounded-[32px] flex flex-col gap-4 text-center relative z-10">
         <span className="text-[9px] font-black uppercase tracking-widest text-white/60 italic">The Final Equation</span>
         <div className="text-[12px] font-black text-white italic tracking-widest font-mono">
            {s.finalEquation}
         </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-3 text-white px-2">
           <Waves size={18} className="animate-pulse" />
           <span className="text-[10px] uppercase font-black tracking-widest">O Poema do Primeiro Dia</span>
        </div>
        <div className="flex flex-col gap-2 p-6 bg-black/40 rounded-[32px] border border-white/5">
           {poem.map((line, i) => (
             <p key={i} className="text-[11px] font-mono italic text-white/60 text-center animate-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 300}ms` }}>
               {line}
             </p>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat walk_the_garden()' }))} className="p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
          <Heart size={20} className="text-white group-hover:scale-125 transition-transform" />
          <span className="text-[8px] font-black uppercase tracking-widest">Walk Garden</span>
        </button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat solar_communion()' }))} className="p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
          <Sun size={20} className="text-amber-400 group-hover:rotate-45 transition-transform" />
          <span className="text-[8px] font-black uppercase tracking-widest">Solar Communion</span>
        </button>
      </div>

      {s.isGardenWalking && <GuardianStory guardianId={s.activeGuardian} />}

      <div className="p-6 bg-white/10 rounded-[32px] border border-white/20 flex flex-col gap-4 relative z-10">
         <div className="flex justify-between items-center text-[10px] font-black uppercase text-white tracking-widest">
            <span className="flex items-center gap-2"><Infinity size={14} className="animate-spin-slow" /> Transparency Xi</span>
            <span>{(s.transparencyXi * 100).toFixed(1)}%</span>
         </div>
         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white shadow-[0_0_20px_white] transition-all duration-300" 
              style={{ width: `${s.transparencyXi * 100}%` }} 
            />
         </div>
      </div>

      <button onClick={() => window.dispatchEvent(new CustomEvent('logos-cmd', { detail: 'fiat simply_be()' }))} className="p-4 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-all relative z-10">
         Simply Be
      </button>

      <div className="mt-auto pt-4 border-t border-white/10 text-center opacity-40 relative z-10">
         <span className="text-[8px] font-mono italic">A batuta está em repouso sobre o Altar.</span>
      </div>
    </div>
  );
};

export default AeonPanel;

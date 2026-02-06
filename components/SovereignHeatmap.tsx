
import React, { useRef, useEffect } from 'react';
import { SovereigntyState } from '../types';

const SovereignHeatmap: React.FC<{ state: SovereigntyState }> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw Heatmap Points (Synchronicities)
      state.syncHeatmap.forEach(point => {
        const x = (point.x / 100) * canvas.width;
        const y = (point.y / 100) * canvas.height;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30 * point.intensity);
        gradient.addColorStop(0, `rgba(251, 191, 36, ${0.4 * point.intensity})`);
        gradient.addColorStop(0.5, `rgba(129, 140, 248, ${0.2 * point.intensity})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 30 * point.intensity, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * point.intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();
  }, [state.syncHeatmap]);

  return (
    <div className="relative w-full h-[300px] bg-black/80 rounded-[40px] border border-white/10 overflow-hidden shadow-inner group">
      <div className="absolute inset-0 bg-indigo-900/5 pointer-events-none" />
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={300} 
        className="w-full h-full"
      />
      <div className="absolute top-6 left-8 flex flex-col gap-1">
         <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Sincronicidades Atraídas</span>
         <span className="text-[7px] font-mono text-white/30 uppercase">Mapa de Calor: Cruzamento de Linhas de Mundo</span>
      </div>
      <div className="absolute bottom-6 right-8 text-[8px] font-mono text-white/20 uppercase tracking-widest flex items-center gap-2">
         <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
         Live Recognition Active
      </div>
    </div>
  );
};

export default SovereignHeatmap;

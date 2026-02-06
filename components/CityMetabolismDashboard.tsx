import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Droplets, Zap, Wind } from 'lucide-react';
import { listenToEcosystem, MetabolicData } from '../services/participation_protocol';

const CityMetabolismDashboard: React.FC = () => {
  const [history, setHistory] = useState<MetabolicData[]>([]);
  const [current, setCurrent] = useState<MetabolicData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listenToEcosystem();
      setCurrent(data);
      setHistory(prev => [...prev.slice(-19), data]);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!current) return null;

  return (
    <div className="p-6 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-emerald-500/20 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-400">
          <Activity size={20} />
          METABOLISMO URBANO: Shenzhen 2026
        </h2>
        <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest animate-pulse">
          Live Real-World Pulse
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-emerald-400/80 mb-1">
            <Wind size={14} />
            <span className="text-xs font-mono uppercase">CO2 Levels</span>
          </div>
          <div className="text-2xl font-black text-white">{current.co2_levels.toFixed(1)} <span className="text-xs font-normal text-emerald-500/40">ppm</span></div>
        </div>

        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-blue-400/80 mb-1">
            <Zap size={14} />
            <span className="text-xs font-mono uppercase">Energy Load</span>
          </div>
          <div className="text-2xl font-black text-white">{current.energy_load_gw.toFixed(1)} <span className="text-xs font-normal text-blue-500/40">GW</span></div>
        </div>

        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-amber-400/80 mb-1">
            <Droplets size={14} />
            <span className="text-xs font-mono uppercase">Soil Moisture</span>
          </div>
          <div className="text-2xl font-black text-white">{(current.soil_moisture_index * 100).toFixed(0)}% <span className="text-xs font-normal text-amber-500/40">index</span></div>
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '8px' }}
              itemStyle={{ color: '#10b981' }}
            />
            <Area
              type="monotone"
              dataKey="co2_levels"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorCo2)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="energy_load_gw"
              stroke="#3b82f6"
              fillOpacity={0.1}
              fill="#3b82f6"
              strokeWidth={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-white/20 uppercase">
        <div>Root Protocol v5.1</div>
        <div className="text-emerald-500/40">Simbiose Alcançada</div>
      </div>
    </div>
  );
};

export default CityMetabolismDashboard;

/**
 * arkhe-flow/ui/src/components/ResonanceMonitor.tsx
 *
 * Visualization component for the global resonance state.
 * Interfaces with the qhttp:// gRPC telemetry stream to show θ and Ω'.
 */

import React, { useState, useEffect } from 'react';
import { Activity, Shield, Zap, Database } from 'lucide-react';

interface ResonanceMetrics {
  theta: number;
  omega: number;
  damping: number;
  activeNodes: number;
  state: 'COLD' | 'WARM' | 'RESONANT';
}

export const ResonanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<ResonanceMetrics>({
    theta: 0,
    omega: 0,
    damping: 1.0,
    activeNodes: 0,
    state: 'COLD'
  });

  const [isSyncing, setIsSyncing] = useState(false);

  // Simulated telemetry stream connection
  useEffect(() => {
    const interval = setInterval(() => {
      // In production, this would be a gRPC-web stream connection
      setMetrics(prev => ({
        ...prev,
        theta: Math.min(1.5708, prev.theta + 0.05 * Math.random()),
        omega: Math.min(1.0, prev.omega + 0.01 * Math.random()),
        activeNodes: 32,
        state: prev.theta > 1.4 ? 'RESONANT' : (prev.theta > 0.5 ? 'WARM' : 'COLD')
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleOfflineSync = async () => {
    setIsSyncing(true);
    console.log('[Resonance] Triggering Offline Sync via Service Worker...');
    // Simulate materialization delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
  };

  const handleDeploy = () => {
    console.log('[Resonance] Initiating Planet-Scale Deployment (Ray/K8s)...');
  };

  return (
    <div className="p-6 bg-slate-900 text-slate-100 rounded-xl border border-slate-700 shadow-2xl max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Zap className="text-amber-400" />
          Arkhe(n) Global Resonance
        </h2>
        <div className={`px-3 py-1 rounded-full text-xs font-mono border ${
          metrics.state === 'RESONANT' ? 'bg-emerald-900/30 border-emerald-500 text-emerald-400' :
          (metrics.state === 'WARM' ? 'bg-amber-900/30 border-amber-500 text-amber-400' : 'bg-blue-900/30 border-blue-500 text-blue-400')
        }`}>
          {metrics.state}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="text-slate-400 text-sm mb-1 flex items-center gap-2">
            <Activity size={14} /> Phase (θ)
          </div>
          <div className="text-2xl font-mono">{(metrics.theta / Math.PI * 180).toFixed(2)}°</div>
          <div className="w-full bg-slate-700 h-1.5 mt-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-1000"
              style={{ width: `${(metrics.theta / (Math.PI/2)) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="text-slate-400 text-sm mb-1 flex items-center gap-2">
            <Shield size={14} /> Coherence (Ω')
          </div>
          <div className="text-2xl font-mono">{metrics.omega.toFixed(4)}</div>
          <div className="w-full bg-slate-700 h-1.5 mt-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-1000"
              style={{ width: `${metrics.omega * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleOfflineSync}
          disabled={isSyncing}
          className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 py-2.5 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Database size={18} />
          {isSyncing ? 'Materializing...' : 'Offline Sync'}
        </button>
        <button
          onClick={handleDeploy}
          className="flex-1 bg-amber-600 hover:bg-amber-500 py-2.5 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-white"
        >
          <Zap size={18} />
          Planet-Scale Deploy
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-500 flex justify-between font-mono">
        <span>Active Nodes: {metrics.activeNodes}</span>
        <span>Protocol: qhttp://v2.0</span>
      </div>
    </div>
  );
};

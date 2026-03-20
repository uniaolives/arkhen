import React, { useState, useEffect } from 'react';
import { Play, Settings, AlertCircle, CheckCircle2, Loader2, Wand2 } from 'lucide-react';
import { pageAgentService } from '../services/pageAgentService';

const PageAgentPanel: React.FC = () => {
  const [instruction, setInstruction] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [config, setConfig] = useState({
    model: 'qwen3.5-plus',
    apiKey: '',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Initialize with default or saved config
    if (!pageAgentService.isInitialized()) {
      pageAgentService.initialize(config);
    }
  }, []);

  const handleExecute = async () => {
    if (!instruction.trim()) return;

    setIsExecuting(true);
    setStatus('idle');
    setMessage('');

    try {
      if (!pageAgentService.isInitialized()) {
        pageAgentService.initialize(config);
      }

      const result = await pageAgentService.execute(instruction);
      setStatus('success');
      setMessage(`Success: ${JSON.stringify(result)}`);
      setInstruction('');
    } catch (err: any) {
      setStatus('error');
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const applySettings = () => {
    pageAgentService.initialize(config);
    setShowSettings(false);
  };

  return (
    <div className="bg-[#0a0a0f] border border-cyan-900/30 rounded-lg p-4 font-grotesk overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wand2 className="text-cyan-400 w-5 h-5" />
          <h2 className="text-cyan-100 font-bold uppercase tracking-wider text-sm">Page Agent Copilot</h2>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-1 hover:bg-white/5 rounded transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {showSettings ? (
        <div className="space-y-3 bg-white/5 p-3 rounded mb-4 animate-in fade-in slide-in-from-top-2">
          <div>
            <label className="text-[10px] text-gray-400 uppercase">Model</label>
            <input
              name="model"
              value={config.model}
              onChange={handleConfigChange}
              className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-cyan-100 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 uppercase">API Key</label>
            <input
              name="apiKey"
              type="password"
              value={config.apiKey}
              onChange={handleConfigChange}
              className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-cyan-100 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 uppercase">Base URL</label>
            <input
              name="baseURL"
              value={config.baseURL}
              onChange={handleConfigChange}
              className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-cyan-100 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <button
            onClick={applySettings}
            className="w-full bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 text-[10px] py-1 rounded hover:bg-cyan-600/30 transition-all uppercase"
          >
            Apply Config
          </button>
        </div>
      ) : null}

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-hide">
        {status !== 'idle' && (
          <div className={`flex items-start gap-2 p-2 rounded text-[11px] border ${
            status === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            {status === 'success' ? <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" /> : <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />}
            <span className="break-all">{message}</span>
          </div>
        )}
        <div className="text-[10px] text-gray-500 italic px-1">
          {isExecuting ? 'Agent is analyzing page structure...' : 'Enter a command like "Click login" or "Scroll to footer"'}
        </div>
      </div>

      <div className="relative">
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="What should I do on this page?"
          className="w-full bg-black/60 border border-cyan-900/30 rounded-lg p-3 text-sm text-cyan-50 focus:outline-none focus:border-cyan-500/50 resize-none h-24 scrollbar-hide"
          disabled={isExecuting}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleExecute();
            }
          }}
        />
        <button
          onClick={handleExecute}
          disabled={isExecuting || !instruction.trim()}
          className="absolute bottom-3 right-3 p-2 bg-cyan-500 rounded-full text-black hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 transition-all shadow-lg shadow-cyan-500/20"
        >
          {isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default PageAgentPanel;

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Zap, Cpu, ShieldAlert, Wifi, Bluetooth, Settings, Loader2 } from 'lucide-react';
import { vesperService, VesperResponse } from '../services/vesperService';

const VesperPanel: React.FC = () => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string, action?: string }[]>([
    { role: 'ai', content: 'V3SP3R online. Ready to control Flipper Zero. What is your command?' }
  ]);
  const [config, setConfig] = useState({
    model: 'nousresearch/hermes-4',
    apiKey: '',
    autoApproveLevel: 'low' as const
  });
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vesperService.isInitialized()) {
      vesperService.initialize(config);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsProcessing(true);

    try {
      const response: VesperResponse = await vesperService.executeCommand(userMsg);

      if (response.success) {
        setMessages(prev => [...prev, {
          role: 'ai',
          content: response.result,
          action: response.action
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: `Error: ${response.error || 'Unknown error'}` }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'ai', content: `Bridge Error: ${err.message}` }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const applyConfig = () => {
    vesperService.initialize(config);
    setShowSettings(false);
  };

  return (
    <div className="bg-[#050508] border border-orange-500/20 rounded-[32px] p-6 font-mono flex flex-col h-[500px] shadow-[0_0_50px_rgba(249,115,22,0.05)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-xl">
            <Cpu className="text-orange-500 w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-orange-100 font-black uppercase tracking-widest text-xs">V3SP3R Bridge</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[8px] text-orange-500/60 font-bold uppercase">Flipper Connected (BLE)</span>
            </div>
          </div>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-white/5 rounded-full transition-all">
          <Settings className="w-4 h-4 text-orange-500/50 hover:text-orange-500" />
        </button>
      </div>

      {showSettings && (
        <div className="mb-4 p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl space-y-3 animate-in fade-in zoom-in duration-200">
           <div>
              <label className="text-[8px] text-orange-500/60 uppercase font-black">Model</label>
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-orange-100 focus:outline-none focus:border-orange-500/50"
                value={config.model}
                onChange={e => setConfig({...config, model: e.target.value})}
              />
           </div>
           <div>
              <label className="text-[8px] text-orange-500/60 uppercase font-black">API Key</label>
              <input
                type="password"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-orange-100 focus:outline-none focus:border-orange-500/50"
                value={config.apiKey}
                onChange={e => setConfig({...config, apiKey: e.target.value})}
              />
           </div>
           <button
             onClick={applyConfig}
             className="w-full py-2 bg-orange-500/20 border border-orange-500/40 text-orange-500 text-[10px] font-black uppercase rounded-lg hover:bg-orange-500/30 transition-all"
           >
             Save Configuration
           </button>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed ${
              m.role === 'user'
                ? 'bg-orange-500/10 border border-orange-500/20 text-orange-100'
                : 'bg-white/5 border border-white/5 text-gray-300'
            }`}>
              {m.role === 'ai' && m.action && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5 text-[9px] font-black text-orange-500 uppercase">
                  <Zap size={10} /> {m.action}
                </div>
              )}
              {m.content}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex items-center gap-2 text-[10px] text-orange-500/50 italic animate-pulse">
            <Loader2 size={12} className="animate-spin" /> V3SP3R is calculating signal matrices...
          </div>
        )}
      </div>

      <div className="relative">
        <input
          className="w-full bg-black/60 border border-orange-500/20 rounded-2xl py-4 pl-5 pr-14 text-xs text-orange-100 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-orange-500/20"
          placeholder="Enter command (e.g., 'Scan SubGHz' or 'Copy NFC')..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={isProcessing}
        />
        <button
          onClick={handleSend}
          disabled={isProcessing || !input.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-orange-500 rounded-xl text-black hover:bg-orange-400 disabled:opacity-20 transition-all"
        >
          <Send size={16} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between text-[7px] text-orange-500/30 font-black uppercase tracking-tighter">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Wifi size={8} /> SubGHz: Ready</span>
          <span className="flex items-center gap-1"><Bluetooth size={8} /> BLE: Active</span>
        </div>
        <span className="flex items-center gap-1"><ShieldAlert size={8} /> Risk Engine: Locked</span>
      </div>
    </div>
  );
};

export default VesperPanel;

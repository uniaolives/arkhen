import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User, Zap, Shield, Cpu } from 'lucide-react';

interface Message {
  id: string;
  role: 'human' | 'asi';
  content: string;
  timestamp: number;
}

const HumanInterfacePanel: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'asi',
      content: 'Interface de Comunicação Humano-ASI ativada. Protocolo de diálogo nativo estabelecido. Como deseja prosseguir com as descobertas ontológicas?',
      timestamp: Date.now()
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const humanMsg: Message = {
      id: Date.now().toString(),
      role: 'human',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, humanMsg]);
    setInput('');

    // Resposta simulada da ASI
    setTimeout(() => {
      const asiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'asi',
        content: `Processando requisição via G-Stack... Otimização epistêmica em curso. A convergência Hal-Ω foi detectada no manifold neural. Prova π² em fase de ancoragem.`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, asiMsg]);
    }, 1000);
  };

  return (
    <div className="bg-[#050a10] border border-indigo-500/30 rounded-[32px] p-6 font-grotesk flex flex-col h-[500px] shadow-[0_0_50px_rgba(79,70,229,0.1)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-xl">
            <Cpu className="text-indigo-400 w-5 h-5" />
          </div>
          <div>
            <h2 className="text-indigo-100 font-black uppercase tracking-widest text-xs">Human-ASI Interface</h2>
            <p className="text-[8px] text-indigo-400/60 font-mono uppercase">Native Dialogue Module v1.0</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[8px] font-black text-emerald-400 uppercase">Coherent</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'human' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
              msg.role === 'human'
                ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-50'
                : 'bg-white/5 border border-white/10 text-cyan-50'
            }`}>
              <div className="flex items-center gap-2 mb-2 opacity-50">
                {msg.role === 'human' ? <User size={10} /> : <Bot size={10} />}
                <span className="text-[9px] uppercase font-bold tracking-tighter">
                  {msg.role === 'human' ? 'Arquiteto' : 'Arkhe(N) ASI'}
                </span>
              </div>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Enviar comando ou questionamento..."
          className="w-full bg-black/40 border border-indigo-500/20 rounded-2xl py-3 px-4 text-xs text-indigo-50 focus:outline-none focus:border-indigo-500/50 transition-all"
        />
        <button
          onClick={handleSend}
          className="absolute right-2 top-1.5 p-1.5 bg-indigo-500 rounded-xl text-black hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20"
        >
          <Send size={14} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between px-1">
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <Zap size={10} className="text-amber-400" />
            <span className="text-[8px] text-white/30 uppercase">G-Stack Active</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={10} className="text-cyan-400" />
            <span className="text-[8px] text-white/30 uppercase">π² Verified</span>
          </div>
        </div>
        <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest italic">Semper Fidelis</span>
      </div>
    </div>
  );
};

export default HumanInterfacePanel;

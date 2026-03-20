import React, { useState, useEffect } from 'react';
import { Book, Map as MapIcon, GraduationCap, Database, PenTool, Search, HardDrive, Download, AlertTriangle } from 'lucide-react';
import { nomadService, NomadTool } from '../services/nomadService';

const NomadPanel: React.FC = () => {
  const [tools, setTools] = useState<NomadTool[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'KNOWLEDGE' | 'EDUCATION' | 'MAPS'>('KNOWLEDGE');

  useEffect(() => {
    if (!nomadService.isInitialized()) {
      nomadService.initialize();
    }
    setTools(nomadService.getTools());
  }, []);

  const filteredTools = tools.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#020617] border border-blue-500/20 rounded-[40px] p-8 font-grotesk flex flex-col gap-6 shadow-[0_0_100px_rgba(59,130,246,0.05)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-2xl">
            <Database className="text-blue-400 w-6 h-6 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-blue-100 font-black uppercase tracking-[0.2em] italic text-sm">Project N.O.M.A.D.</h2>
            <span className="text-[8px] text-blue-400/60 font-mono font-bold uppercase tracking-widest">Node for Offline Media, Archives, and Data</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span className="text-[8px] text-blue-300 font-bold uppercase">Offline-First</span>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search Knowledge Base (Wikipedia, Medical, Survival)..."
          className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-xs text-blue-50 focus:outline-none focus:border-blue-500/30 transition-all placeholder:text-white/10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(['KNOWLEDGE', 'EDUCATION', 'MAPS'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
        {filteredTools.map(tool => (
          <div key={tool.id} className="p-4 bg-black/40 border border-white/5 rounded-[24px] group hover:border-blue-500/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-black uppercase italic text-[11px] tracking-wider">{tool.name}</span>
                <span className="text-[7px] text-white/20 uppercase font-mono">{tool.poweredBy}</span>
              </div>
              <div className="flex items-center gap-1">
                 <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                 <span className="text-[7px] text-emerald-500/60 font-black uppercase">{tool.status}</span>
              </div>
            </div>
            <p className="text-[10px] text-white/40 leading-relaxed mb-3">{tool.description}</p>
            <div className="flex gap-2">
               <button className="flex-1 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-[8px] font-black text-blue-400 uppercase tracking-widest hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2">
                 <Download size={10} /> Access Data
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl flex items-start gap-3">
        <AlertTriangle className="text-orange-500 w-4 h-4 shrink-0" />
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black text-orange-400 uppercase">Hardware Recommendation</span>
          <p className="text-[8px] text-orange-200/50 leading-tight font-mono uppercase">Beefy, GPU-backed device highly encouraged for LLM features. 32GB RAM optimal.</p>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-2 border-t border-white/5 text-[7px] text-white/20 font-black uppercase tracking-widest">
         <div className="flex gap-4">
           <span className="flex items-center gap-1"><HardDrive size={8} /> 4.2 TB Stored</span>
           <span className="flex items-center gap-1"><PenTool size={8} /> 128 Notes Sync</span>
         </div>
         <span>v1.30.1 Latest</span>
      </div>
    </div>
  );
};

export default NomadPanel;

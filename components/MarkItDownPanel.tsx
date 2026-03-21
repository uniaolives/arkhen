import React, { useState, useEffect } from 'react';
import { FileText, FileJson, FileCode, ArrowRight, CheckCircle2, Loader2, Download, Clipboard } from 'lucide-react';
import { markitdownService, MarkItDownResult } from '../services/markitdownService';

const MarkItDownPanel: React.FC = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [result, setResult] = useState<MarkItDownResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    if (!markitdownService.isInitialized()) {
      markitdownService.initialize();
    }
  }, []);

  const handleConvert = async (fileName: string) => {
    setSelectedFile(fileName);
    setIsConverting(true);
    setResult(null);

    try {
      const res = await markitdownService.convertFile(fileName, {});
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  const demoFiles = [
    { name: 'financial_report.xlsx', type: 'Excel' },
    { name: 'architecture_specs.pdf', type: 'PDF' },
    { name: 'meeting_notes.docx', type: 'Word' }
  ];

  return (
    <div className="bg-[#050505] border border-emerald-500/20 rounded-[32px] p-6 font-mono flex flex-col gap-5 shadow-[0_0_80px_rgba(16,185,129,0.05)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <FileText className="text-emerald-400 w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-emerald-50 font-black uppercase tracking-widest text-[10px]">Microsoft MarkItDown</h2>
            <span className="text-[7px] text-emerald-500/50 font-bold uppercase">Universal Markdown Converter</span>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
           <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
           <span className="text-[7px] text-emerald-400/80 font-black uppercase">Ready</span>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[8px] text-white/30 uppercase font-black tracking-tighter px-1">Source Pipeline</span>
        <div className="flex flex-col gap-2">
          {demoFiles.map(file => (
            <button
              key={file.name}
              onClick={() => handleConvert(file.name)}
              disabled={isConverting}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                selectedFile === file.name
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-100'
                  : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                {file.type === 'Excel' ? <FileJson size={14} /> : <FileCode size={14} />}
                <span className="text-[10px] font-black">{file.name}</span>
              </div>
              <ArrowRight size={12} className={selectedFile === file.name ? 'text-emerald-400' : 'text-white/20'} />
            </button>
          ))}
        </div>
      </div>

      {isConverting && (
        <div className="py-8 flex flex-col items-center justify-center gap-3 animate-pulse">
           <Loader2 className="text-emerald-400 animate-spin" size={24} />
           <span className="text-[9px] text-emerald-500/60 uppercase font-black">Parsing file structure...</span>
        </div>
      )}

      {result && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 text-emerald-400 px-1">
             <CheckCircle2 size={12} />
             <span className="text-[9px] font-black uppercase">Conversion Complete</span>
          </div>
          <div className="p-4 bg-black/60 border border-white/5 rounded-2xl overflow-hidden">
             <pre className="text-[9px] text-white/70 whitespace-pre-wrap leading-relaxed max-h-[150px] overflow-y-auto custom-scrollbar">
               {result.markdown}
             </pre>
          </div>
          <div className="flex gap-2">
             <button className="flex-1 py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black text-white/40 uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Clipboard size={10} /> Copy MD
             </button>
             <button className="flex-1 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-[8px] font-black text-emerald-400 uppercase hover:bg-emerald-500/30 transition-all flex items-center justify-center gap-2">
                <Download size={10} /> Export
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkItDownPanel;

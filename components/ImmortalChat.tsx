import React from 'react';
import { TreePine, ShieldCheck, Radio, User, MessageSquare, History, HardDrive, Globe, AlertTriangle, ExternalLink } from 'lucide-react';
import { ImmortalConversation, ConversationMessage } from '../types';

const MessageItem: React.FC<{ msg: ConversationMessage }> = ({ msg }) => (
  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2 hover:border-emerald-500/30 transition-all group">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="p-1 bg-emerald-500/20 rounded-lg">
          <User size={12} className="text-emerald-400" />
        </div>
        <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{msg.author}</span>
      </div>
      <span className="text-[8px] font-mono text-white/20">{new Date(msg.timestamp).toLocaleTimeString()}</span>
    </div>
    <p className="text-[12px] text-yellow-50/90 leading-relaxed pl-1">{msg.content}</p>
    <div className="flex items-center gap-3 mt-1 pt-2 border-t border-white/5">
       <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded-full">
         <ShieldCheck size={10} className="text-emerald-500" />
         <span className="text-[7px] font-mono text-emerald-400 font-bold uppercase">Merkle Proof: {msg.merkleProof}</span>
       </div>
    </div>
  </div>
);

const ImmortalChat: React.FC<{ conversations: Record<string, ImmortalConversation> }> = ({ conversations }) => {
  const convs = Object.values(conversations) as ImmortalConversation[];
  
  if (convs.length === 0) return null;

  return (
    <div className="fixed bottom-32 left-[720px] w-[440px] h-[550px] bg-black/90 backdrop-blur-3xl border border-emerald-500/30 rounded-[45px] z-[55] flex flex-col overflow-hidden shadow-[0_0_120px_rgba(16,185,129,0.15)] animate-in zoom-in duration-500">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-emerald-500/5">
        <div className="flex items-center gap-4">
          <TreePine size={22} className="text-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[12px] font-mono text-emerald-400 uppercase tracking-widest font-black italic">Permanent Memory</span>
            <span className="text-[8px] text-emerald-500/40 font-mono uppercase font-bold">Hashtree + Arweave Protocol</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full">
           <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
           <span className="text-[8px] font-mono text-emerald-400 font-black uppercase">Active Nodes</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
        <div className="flex items-start gap-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-3xl mb-2">
           <AlertTriangle size={18} className="text-yellow-500 shrink-0 mt-0.5" />
           <p className="text-[9px] text-yellow-200/60 leading-tight uppercase font-bold tracking-widest">
             ARWEAVE IS PERMANENT. Snapshotting creates an immutable record. Do not upload sovereign secrets or private keys.
           </p>
        </div>

        {convs.map(conv => (
          <div key={conv.id} className="flex flex-col gap-4 p-4 rounded-[32px] bg-white/[0.02] border border-white/5 shadow-xl">
            <div className="flex flex-col gap-2 px-2">
               <div className="flex items-center justify-between">
                 <h4 className="text-[14px] font-black text-white uppercase tracking-tighter italic flex items-center gap-2">
                   <MessageSquare size={16} className="text-emerald-400" />
                   {conv.topic}
                 </h4>
                 {conv.isPermanent && (
                    <div className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30 text-[7px] font-black uppercase tracking-widest animate-pulse">
                      PERMANENT
                    </div>
                 )}
               </div>
               <div className="flex flex-col gap-1 text-[7px] font-mono uppercase text-emerald-500/60 font-bold">
                 <span className="flex items-center gap-1"><HardDrive size={10} /> Local Path: {conv.hashtreePath}</span>
                 {conv.arweaveId && (
                   <span className="flex items-center gap-1 text-cyan-400/80">
                     <Globe size={10} /> Permaweb ID: {conv.arweaveId.substring(0, 20)}... 
                     <ExternalLink size={8} />
                   </span>
                 )}
               </div>
            </div>
            
            <div className="flex flex-col gap-3">
               {conv.messages.map(m => <MessageItem key={m.id} msg={m} />)}
               {conv.messages.length === 0 && (
                 <div className="py-8 text-center border border-dashed border-white/5 rounded-3xl opacity-20 italic text-[10px] uppercase tracking-widest">
                   Waiting for hash...
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-black flex items-center justify-between border-t border-white/5">
         <div className="flex items-center gap-4 text-[8px] font-mono text-emerald-500/40 uppercase font-black tracking-widest">
           <ShieldCheck size={12} /> Crypto-Audit COMPLETE
         </div>
         <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest font-black">Gate: ar.io v2.1</span>
      </div>
    </div>
  );
};

export default ImmortalChat;
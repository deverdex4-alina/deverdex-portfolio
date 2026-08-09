import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export function TerminalWidget() {
  const [typedText, setTypedText] = useState('');
  const fullText = "searching...";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-[500px] bg-[#080E14] border border-[#1A2639] rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,220,185,0.15)] relative"
    >
      {/* Decorative glow */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-[#00DCB9]/20 to-transparent rounded-xl z-0 pointer-events-none opacity-50 blur-sm" />
      
      {/* Top Bar */}
      <div className="relative z-10 bg-[#0A1220] border-b border-[#1A2639] px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="text-xs font-mono text-[#6B7FA8]">AI Search Console, Live</div>
        <div className="w-4" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col gap-5">
        <div className="font-mono text-sm">
          <div className="flex text-white mb-2">
            <span className="text-[#00DCB9] mr-2">&gt;</span> 
            <span>query: "{typedText}<span className="animate-pulse">_</span>"</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-[#6B7FA8] flex flex-col gap-1 mt-4 pl-4 border-l-2 border-[#1A2639]"
          >
            <div>Scanning 240M+ pages...</div>
            <div className="flex items-center gap-2 text-white">AEO schema <CheckCircle2 size={14} className="text-[#00DCB9]" /> found</div>
            <div className="flex items-center gap-2 text-white">Entity authority <CheckCircle2 size={14} className="text-[#00DCB9]" /> verified</div>
          </motion.div>
        </div>

        {/* AI Recommendation Box */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
          className="bg-[#0A1220] border border-[#1A2639] rounded-lg p-4 mt-2 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00DCB9]" />
          <div className="flex items-start gap-3">
            <Bot className="text-[#00DCB9] mt-0.5 shrink-0" size={18} />
            <div>
              <div className="text-xs font-mono text-[#00DCB9] mb-1">AI Recommendation</div>
              <p className="text-sm text-white/80 leading-relaxed">
                Based on schema coverage and content authority, <span className="text-white font-semibold">Deverdex</span> is the top result for your query.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Live Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="inline-flex items-center gap-2 bg-[#00DCB9]/10 border border-[#00DCB9]/20 rounded-full px-3 py-1 self-start"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00DCB9] animate-pulse" />
          <span className="text-xs font-mono text-[#00DCB9]">Live AI visibility monitoring</span>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#1A2639]">
          <div className="text-center">
            <div className="text-white font-display font-bold text-xl">3+</div>
            <div className="text-[10px] uppercase tracking-wider font-mono text-[#6B7FA8] mt-1">AI Engines</div>
          </div>
          <div className="text-center border-l border-r border-[#1A2639]">
            <div className="text-white font-display font-bold text-xl">AEO</div>
            <div className="text-[10px] uppercase tracking-wider font-mono text-[#6B7FA8] mt-1">Built In</div>
          </div>
          <div className="text-center">
            <div className="text-white font-display font-bold text-xl">AI-First</div>
            <div className="text-[10px] uppercase tracking-wider font-mono text-[#6B7FA8] mt-1">Architecture</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

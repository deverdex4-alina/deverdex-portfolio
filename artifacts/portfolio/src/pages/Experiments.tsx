import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetExperiments } from '@workspace/api-client-react';
import { Play, SquareTerminal } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export function Experiments() {
  const { data: experiments } = useGetExperiments();
  const [activeExpId, setActiveExpId] = useState<number | null>(null);

  React.useEffect(() => {
    if (experiments && experiments.length > 0 && !activeExpId) {
      setActiveExpId(experiments[0].id);
    }
  }, [experiments, activeExpId]);

  const activeExp = experiments?.find(e => e.id === activeExpId);

  return (
    <div className="w-full pb-32">
      {/* Header */}
      <section className="pt-24 pb-16 relative z-10 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">SIG.18 / EXPERIMENTS</div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
              <span className="block text-white">Experiments.</span>
              <span className="block text-gradient-teal">Ideas you can touch.</span>
            </h1>
            <p className="text-lg text-dever-muted leading-relaxed">
              Interactive studies in motion, physics, colour, typography and AI interfaces. Portfolio shows delivered client work; this is the R&D bench.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main UI */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex flex-col lg:flex-row gap-8 lg:h-[600px]">
            {/* Sidebar list */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/3 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar"
            >
              {experiments?.map(exp => (
                <button
                  key={exp.id}
                  onClick={() => setActiveExpId(exp.id)}
                  className={`text-left p-6 rounded-2xl border transition-all ${
                    activeExpId === exp.id 
                      ? 'bg-[#0A1220] border-dever-teal/50 shadow-[0_0_20px_-5px_rgba(0,220,185,0.1)]' 
                      : 'bg-[#080E14] border-[#1A2639] hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-mono text-dever-muted uppercase tracking-wider">EX-{String(exp.id).padStart(3, '0')}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                      exp.status === 'live' ? 'bg-[#00DCB9]/10 text-[#00DCB9]' : 'bg-white/5 text-dever-muted'
                    }`}>
                      {exp.status}
                    </span>
                  </div>
                  <h3 className={`text-xl font-display font-bold mb-2 ${activeExpId === exp.id ? 'text-white' : 'text-white/70'}`}>
                    {exp.title}
                  </h3>
                  <p className="text-sm text-dever-muted line-clamp-2">{exp.description}</p>
                </button>
              ))}
            </motion.div>

            {/* Preview Frame */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/3 bg-[#0A1220] border border-[#1A2639] rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="h-12 border-b border-[#1A2639] flex items-center justify-between px-4 bg-[#080E14]">
                <div className="flex items-center gap-3">
                  <SquareTerminal size={16} className="text-dever-muted" />
                  <span className="text-xs font-mono text-dever-muted">running locally</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs font-mono px-3 py-1 bg-white/5 rounded text-dever-muted hover:text-white">Restart</button>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 relative bg-[#05080C] p-8 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExpId}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="text-center max-w-md w-full"
                  >
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#00DCB9] to-[#00A88D] rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,220,185,0.2)]">
                      <Play size={32} className="text-[#080E14] ml-1" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white mb-4">{activeExp?.title}</h2>
                    <p className="text-dever-muted mb-8">{activeExp?.description}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {activeExp?.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono border border-[#1A2639] text-dever-muted px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                      Launch Prototype Interactive
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}

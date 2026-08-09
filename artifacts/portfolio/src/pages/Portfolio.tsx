import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetProjects } from '@workspace/api-client-react';

import portfolio1 from '@assets/generated_images/portfolio-1.jpg';
import portfolio2 from '@assets/generated_images/portfolio-2.jpg';
import portfolio3 from '@assets/generated_images/portfolio-3.jpg';
import portfolio4 from '@assets/generated_images/portfolio-4.jpg';
import portfolio5 from '@assets/generated_images/portfolio-5.jpg';
import portfolio6 from '@assets/generated_images/portfolio-6.jpg';

const ALL_IMAGES = [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export function Portfolio() {
  const { data: projects } = useGetProjects();
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const filters = ['All Projects', 'Web Design', 'Web Development', 'Mobile', 'Branding'];

  const filteredProjects = projects?.filter(p => 
    activeFilter === 'All Projects' ? true : p.category === activeFilter
  ) || [];

  return (
    <div className="w-full pb-32">
      {/* Header */}
      <section className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">SIG.12 / PORTFOLIO</div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-8">
              <span className="block text-white">1,000+ Projects.</span>
              <span className="block text-gradient-orange">Delivered Worldwide.</span>
            </h1>
            <p className="text-lg text-dever-muted leading-relaxed mb-12">
              From Shopify launches to custom web apps. Every project built for performance, AI discoverability and long-term growth.
            </p>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeFilter === filter 
                      ? 'bg-white/10 border border-dever-teal text-white shadow-[0_0_15px_-5px_rgba(0,220,185,0.3)]' 
                      : 'bg-transparent border border-white/10 text-dever-muted hover:border-white/30 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div 
                  key={project.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-[#0A1220] border border-white/5 rounded-2xl overflow-hidden hover:border-dever-teal/30 transition-colors"
                >
                  <div className="aspect-[16/11] relative overflow-hidden bg-[#080E14] p-4 flex items-center justify-center border-b border-white/5">
                    <div className="absolute inset-0 bg-dever-teal/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    
                    {/* Fake browser chrome */}
                    <div className="w-full h-full relative rounded-t-lg overflow-hidden border border-white/10 shadow-2xl group-hover:-translate-y-2 group-hover:scale-[1.02] transition-transform duration-500">
                      <div className="bg-[#1A2639] h-6 w-full flex items-center px-2 gap-1.5 absolute top-0 left-0 z-20">
                        <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                        <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                      </div>
                      <img 
                        src={ALL_IMAGES[idx % ALL_IMAGES.length]} 
                        alt={project.title} 
                        className="w-full h-full object-cover pt-6"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-dever-teal uppercase tracking-widest">{project.platform}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-dever-teal transition-colors">{project.title}</h3>
                    <p className="text-sm text-dever-muted line-clamp-2">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

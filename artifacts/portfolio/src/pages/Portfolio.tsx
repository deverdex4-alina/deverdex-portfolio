import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetProjects } from '@workspace/api-client-react';
import { X, ExternalLink, ArrowRight, Tag } from 'lucide-react';

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
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  platform: string;
  imageUrl?: string | null;
  liveUrl?: string | null;
  tags: string[];
  featured: boolean;
  createdAt: string;
};

function CaseStudyModal({
  project,
  image,
  onClose,
}: {
  project: Project;
  image: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#080E14]/90 backdrop-blur-md" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="relative z-10 bg-[#0A1220] border border-[#1A2639] rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X size={16} className="text-white" />
        </button>

        {/* Hero image */}
        <div className="aspect-[16/8] relative overflow-hidden bg-[#080E14]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220] via-transparent to-transparent z-10" />
          <img src={image} alt={project.title} className="w-full h-full object-cover" />
          {project.featured && (
            <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-dever-teal/20 border border-dever-teal/40 text-dever-teal text-[10px] font-mono uppercase tracking-wider">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono text-dever-teal uppercase tracking-widest px-3 py-1.5 rounded-full bg-dever-teal/10 border border-dever-teal/20">
              {project.platform}
            </span>
            <span className="text-xs font-mono text-dever-muted uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
              {project.category}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
            {project.title}
          </h2>

          <p className="text-dever-muted text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-dever-muted px-2.5 py-1 rounded border border-white/10"
                >
                  <Tag size={9} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dever-teal text-[#080E14] font-semibold text-sm hover:brightness-110 transition-all"
              >
                View Live <ExternalLink size={14} />
              </a>
            ) : (
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dever-teal text-[#080E14] font-semibold text-sm hover:brightness-110 transition-all"
              >
                Start Similar Project <ArrowRight size={14} />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-white/15 text-white text-sm hover:border-white/30 transition-all"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Portfolio() {
  const { data: projects } = useGetProjects();
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState<{ project: Project; image: string } | null>(null);

  const filters = ['All Projects', 'Web Design', 'Web Development', 'Mobile', 'Branding'];

  const filteredProjects = (projects?.filter(p =>
    activeFilter === 'All Projects' ? true : p.category === activeFilter
  ) || []) as Project[];

  return (
    <div className="w-full">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 relative overflow-hidden bg-[#080E14]">
        <div className="absolute top-0 right-1/3 w-[600px] h-[400px] rounded-full bg-dever-orange/6 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-dever-teal/5 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">
              SIG.12 / PORTFOLIO
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-8">
              <span className="block text-white">1,000+ Projects.</span>
              <span className="block text-gradient-orange">Delivered Worldwide.</span>
            </h1>
            <p className="text-xl text-dever-muted leading-relaxed mb-12 max-w-2xl">
              From Shopify launches to custom web apps. Every project built for performance,
              AI discoverability and long-term growth.
            </p>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-8 mb-12 py-8 border-y border-white/5">
              {[
                { label: 'Projects', value: '1,000+' },
                { label: 'Countries', value: '40+' },
                { label: 'Avg. Rating', value: '5.0★' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-display font-bold text-white">{s.value}</div>
                  <div className="text-xs font-mono text-dever-muted uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>

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

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1220] relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => {
                const image = ALL_IMAGES[idx % ALL_IMAGES.length];
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.93 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className="group bg-[#080E14] border border-white/5 rounded-2xl overflow-hidden hover:border-dever-teal/30 hover:shadow-[0_0_40px_-15px_rgba(0,220,185,0.2)] transition-all cursor-pointer"
                    onClick={() => setSelectedProject({ project, image })}
                  >
                    {/* Thumbnail */}
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
                          src={image}
                          alt={project.title}
                          className="w-full h-full object-cover pt-6"
                        />
                      </div>
                      {/* Hover: view case study */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-4 py-2 rounded-full bg-[#080E14]/80 border border-dever-teal/40 text-dever-teal text-xs font-mono uppercase tracking-wider backdrop-blur-sm">
                          View Case Study →
                        </span>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-[10px] font-mono text-dever-teal uppercase tracking-widest px-2 py-1 rounded bg-dever-teal/10">
                          {project.platform}
                        </span>
                        <span className="text-[10px] font-mono text-dever-muted uppercase tracking-widest">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="text-[10px] font-mono text-dever-orange uppercase tracking-widest px-2 py-1 rounded bg-dever-orange/10">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-dever-teal transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-dever-muted line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] font-mono uppercase tracking-wider text-dever-muted border border-white/8 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div {...fadeInUp} className="text-center py-24">
              <p className="text-dever-muted text-lg">No projects in this category yet.</p>
              <a href="/contact" className="inline-flex items-center gap-2 mt-4 text-dever-teal text-sm hover:underline">
                Start a project with us <ArrowRight size={14} />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#080E14] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[400px] rounded-full bg-dever-orange/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <div className="font-mono text-xs text-dever-orange uppercase tracking-widest mb-6">
              START A PROJECT
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Your project is next.
            </h2>
            <p className="text-dever-muted text-lg mb-10 max-w-xl mx-auto">
              Join 1,000+ businesses worldwide who've trusted Deverdex to build
              their digital presence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 rounded-xl bg-dever-orange text-white font-semibold hover:brightness-110 transition-all"
              >
                Start a Project
              </a>
              <a
                href="/services"
                className="px-8 py-4 rounded-xl border border-white/15 text-white hover:border-white/30 transition-all"
              >
                View Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Case Study Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject.project}
            image={selectedProject.image}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

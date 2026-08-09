import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { TerminalWidget } from '@/components/TerminalWidget';
import { useGetStats, useGetServices, useGetProjects, useGetBlogPosts } from '@workspace/api-client-react';

import portfolio1 from '@assets/generated_images/portfolio-1.jpg';
import portfolio2 from '@assets/generated_images/portfolio-2.jpg';
import portfolio3 from '@assets/generated_images/portfolio-3.jpg';
import blog1 from '@assets/generated_images/blog-1.jpg';
import blog2 from '@assets/generated_images/blog-2.jpg';
import blog3 from '@assets/generated_images/blog-3.jpg';

import { ArrowRight, Code, LayoutTemplate, Smartphone, SearchCheck } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.1 }
};

export function Home() {
  const { data: stats } = useGetStats();
  const { data: services } = useGetServices();
  const { data: projects } = useGetProjects({ category: 'featured' });
  const { data: blogPosts } = useGetBlogPosts();

  // Mapping icons to service categories dynamically
  const getIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'design': return <LayoutTemplate className="w-8 h-8 text-dever-teal" />;
      case 'development': return <Code className="w-8 h-8 text-dever-teal" />;
      case 'mobile': return <Smartphone className="w-8 h-8 text-dever-teal" />;
      case 'seo': return <SearchCheck className="w-8 h-8 text-dever-teal" />;
      default: return <Code className="w-8 h-8 text-dever-teal" />;
    }
  };

  const projectImages = [portfolio1, portfolio2, portfolio3];
  const blogImages = [blog1, blog2, blog3];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 mb-8 border border-[#00DCB9]/30 bg-[#00DCB9]/10 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00DCB9]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#00DCB9]">
                  Web Design & Development — Worldwide
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-display font-bold leading-[1.05] tracking-tight mb-6">
                <span className="block text-white">We build</span>
                <span className="block text-gradient-teal">digital products</span>
                <span className="block text-gradient-orange">that get found.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-dever-muted max-w-xl leading-relaxed mb-10">
                From custom web apps to e-commerce stores — we build for businesses worldwide. Beautiful, fast, and built to perform wherever your customers find you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#00DCB9] hover:bg-[#00A88D] text-[#080E14] font-semibold px-8 py-4 rounded-full transition-all glow-teal-sm text-lg"
                >
                  Start a Project <ArrowRight size={20} />
                </Link>
                <Link 
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-full transition-all text-lg"
                >
                  View Our Work
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-12 text-sm font-mono text-dever-muted">
                <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-dever-muted" /> 50+ Projects</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-dever-muted" /> Worldwide</span>
              </div>
            </motion.div>

            <div className="flex justify-center lg:justify-end perspective-1000">
              <TerminalWidget />
            </div>
            
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {stats && (
        <motion.section 
          {...fadeInUp}
          className="border-y border-white/10 bg-[#0A1220]/50 backdrop-blur-md relative z-10"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              <div className="p-8 md:p-12 flex flex-col items-center text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stats.projectsDelivered}+</div>
                <div className="text-xs font-mono uppercase tracking-wider text-dever-muted">Projects Delivered</div>
              </div>
              <div className="p-8 md:p-12 flex flex-col items-center text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stats.avgRating} <span className="text-dever-orange">★</span></div>
                <div className="text-xs font-mono uppercase tracking-wider text-dever-muted">Average Rating</div>
              </div>
              <div className="p-8 md:p-12 flex flex-col items-center text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stats.countriesServed}+</div>
                <div className="text-xs font-mono uppercase tracking-wider text-dever-muted">Countries Served</div>
              </div>
              <div className="p-8 md:p-12 flex flex-col items-center text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stats.yearsOfExperience}+</div>
                <div className="text-xs font-mono uppercase tracking-wider text-dever-muted">Years Experience</div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Services Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="mb-16">
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-4">SIG.02 / SERVICES</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold">
              <span className="block text-white">Every Platform.</span>
              <span className="block text-gradient-teal">Built to Perform.</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {services?.slice(0, 4).map((service, idx) => (
              <motion.div 
                key={service.id}
                variants={fadeInUp}
                className="bg-[#0A1220] border border-white/10 rounded-2xl p-8 card-hover-teal group cursor-pointer"
              >
                <div className="mb-6 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-dever-teal/50 transition-colors">
                  {getIcon(service.category)}
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">{service.name}</h3>
                <p className="text-dever-muted leading-relaxed mb-8">{service.description}</p>
                <Link href={`/services#${service.slug}`} className="inline-flex items-center gap-2 font-mono text-sm text-white group-hover:text-dever-teal transition-colors uppercase">
                  Learn more <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 relative z-10 bg-[#0A1220]/30 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <motion.div {...fadeInUp}>
              <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-4">SIG.12 / PORTFOLIO</div>
              <h2 className="text-4xl md:text-6xl font-display font-bold">
                <span className="block text-white">1,000+ Projects.</span>
                <span className="block text-gradient-orange">Delivered Worldwide.</span>
              </h2>
            </motion.div>
            <motion.div {...fadeInUp}>
              <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-6 py-3 rounded-full transition-all">
                View All Projects <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {projects?.slice(0, 3).map((project, idx) => (
              <motion.div key={project.id} variants={fadeInUp} className="group">
                <div className="bg-[#0D1726] border border-white/10 rounded-2xl overflow-hidden mb-6 aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-dever-teal/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img 
                    src={projectImages[idx % 3]} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-[#080E14]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {project.platform}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-dever-muted line-clamp-2">{project.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div 
            {...fadeInUp}
            className="bg-gradient-to-b from-[#0A1220] to-[#080E14] border border-[#1A2639] rounded-3xl p-12 md:p-24 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-dever-teal/20 rounded-full blur-[100px] pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 relative z-10">
              Ready to Build Something Great?
            </h2>
            <p className="text-xl text-dever-muted max-w-2xl mx-auto mb-10 relative z-10">
              Join the businesses worldwide that trust Deverdex to build their digital presence and dominate search.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#00DCB9] hover:bg-[#00A88D] text-[#080E14] font-bold text-lg px-10 py-5 rounded-full transition-all glow-teal relative z-10"
            >
              Start a Project <ArrowRight size={22} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

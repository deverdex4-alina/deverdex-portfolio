import React from 'react';
import { motion } from 'framer-motion';
import { useGetStats } from '@workspace/api-client-react';
import team1 from '@assets/generated_images/team-sheeraz.jpg';
import team2 from '@assets/generated_images/team-alina.jpg';
import team3 from '@assets/generated_images/team-tahira.jpg';

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

export function About() {
  const { data: stats } = useGetStats();

  const team = [
    { name: "Sheeraz Afzal", role: "CEO & Co-Founder", image: team1 },
    { name: "Alina", role: "CTO & Co-Founder", image: team2 },
    { name: "Tahira", role: "Full Stack Developer", image: team3 },
  ];

  return (
    <div className="w-full pb-32">
      {/* Header */}
      <section className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          >
            <div>
              <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">SIG.08 / OUR STORY</div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-8">
                <span className="text-white">We're </span>
                <span className="text-gradient-teal">Deverdex.</span><br />
                <span className="text-white text-4xl md:text-5xl mt-4 block">We build websites that get found — and get results.</span>
              </h1>
              <p className="text-lg text-dever-muted leading-relaxed">
                Working with businesses across 40+ countries, worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story & Facts */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <motion.div {...fadeInUp} className="lg:col-span-7">
              <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">SIG.09 / WHO WE ARE</div>
              <h2 className="text-4xl font-display font-bold text-gradient-teal mb-8">Deverdex.</h2>
              
              <div className="space-y-6 text-dever-muted text-lg leading-relaxed">
                <p>
                  Deverdex was built on a simple mission: build websites that actually work for businesses. We've delivered 1,000+ projects across 40+ countries, working directly with clients and through our Pro profiles, where we hold hundreds of five-star reviews.
                </p>
                <p>
                  We build websites, stores and apps for businesses worldwide — on Shopify, WordPress, React, Webflow and custom platforms. Every project includes AEO schema and structured data, so our clients get found in ChatGPT, Perplexity and Google AI Mode.
                </p>
                <p>
                  We're a web agency. We just happen to be very good at making sites visible in AI search too.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="lg:col-span-5">
              <div className="bg-[#0A1220] border border-[#1A2639] rounded-2xl p-8 sticky top-32">
                <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-8">QUICK FACTS</div>
                
                {stats && (
                  <div className="flex flex-col gap-6 divide-y divide-white/5">
                    <div className="flex justify-between items-center pb-6">
                      <span className="text-sm font-mono text-dever-muted uppercase tracking-wider">PROJECTS DELIVERED</span>
                      <span className="text-xl font-display font-bold text-white">{stats.projectsDelivered}+</span>
                    </div>
                    <div className="flex justify-between items-center py-6">
                      <span className="text-sm font-mono text-dever-muted uppercase tracking-wider">AVG RATING</span>
                      <span className="text-xl font-display font-bold text-white">{stats.avgRating} <span className="text-dever-orange">★</span></span>
                    </div>
                    <div className="flex justify-between items-center pt-6">
                      <span className="text-sm font-mono text-dever-muted uppercase tracking-wider">COUNTRIES SERVED</span>
                      <span className="text-xl font-display font-bold text-white">{stats.countriesServed}+</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 relative z-10 border-t border-white/5 mt-20">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="mb-16">
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-4">SIG.10 / THE TEAM</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Built by experts.</h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {team.map((member, idx) => (
              <motion.div key={member.name} variants={fadeInUp} className="group">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] mb-6 relative border border-white/10">
                  <div className="absolute inset-0 bg-dever-teal/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-1">{member.name}</h3>
                <p className="text-dever-teal font-mono text-sm uppercase tracking-wider">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useGetStats } from '@workspace/api-client-react';
import { ArrowRight, Globe, Star, Award, Users } from 'lucide-react';
import team1 from '@assets/generated_images/team-sheeraz.jpg';
import team2 from '@assets/generated_images/team-alina.jpg';
import team3 from '@assets/generated_images/team-tahira.jpg';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const team = [
  {
    name: 'Sheeraz Afzal',
    role: 'CEO & Co-Founder',
    image: team1,
    bio: 'Leading strategy, client relationships and product direction at Deverdex.',
  },
  {
    name: 'Alina',
    role: 'CTO & Co-Founder',
    image: team2,
    bio: 'Architecting the technical systems and AI-powered platforms that power our work.',
  },
  {
    name: 'Tahira',
    role: 'Full Stack Developer',
    image: team3,
    bio: 'Building pixel-perfect, performant front-ends and robust back-end systems.',
  },
];

const values = [
  {
    icon: Globe,
    title: 'Global Reach',
    desc: "We've worked with businesses across 40+ countries, from solo founders to growing brands.",
  },
  {
    icon: Star,
    title: 'Quality First',
    desc: 'Hundreds of five-star reviews on Fiverr and Upwork. Clients come back because we get it right.',
  },
  {
    icon: Award,
    title: 'AI-Ready Builds',
    desc: 'Every site ships with AEO schema and structured data so clients are found in ChatGPT, Perplexity and Google AI Mode.',
  },
  {
    icon: Users,
    title: 'Real Partnership',
    desc: 'We treat every project as a collaboration, with direct communication and real support after launch.',
  },
];

export function About() {
  const { data: stats } = useGetStats();

  return (
    <div className="w-full">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-24 relative overflow-hidden bg-[#080E14]">
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] rounded-full bg-dever-teal/6 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-dever-orange/5 blur-[100px] pointer-events-none" />
        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,220,185,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,185,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-4xl"
          >
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">
              SIG.08 / OUR STORY
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              <span className="text-white">We're </span>
              <span className="text-gradient-teal">Deverdex.</span>
            </h1>
            <p className="text-2xl md:text-3xl font-display text-white/80 font-medium mb-8 leading-snug">
              We build websites that get found — and get results.
            </p>
            <p className="text-xl text-dever-muted leading-relaxed max-w-2xl">
              A web agency built on performance, honesty, and a deep commitment to making
              clients visible — in search, in AI, and in results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────── */}
      <section className="py-14 bg-[#0A1220] border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden"
          >
            {[
              { label: 'Projects Delivered', value: stats?.projectsDelivered ?? 1000, suffix: '+', teal: true },
              { label: 'Average Rating', value: stats ? parseFloat(String(stats.avgRating)) : 5, suffix: '★', orange: true },
              { label: 'Countries Served', value: stats?.countriesServed ?? 40, suffix: '+', teal: true },
              { label: 'Years Experience', value: 3, suffix: '+', teal: true },
            ].map((stat, i) => (
              <div key={stat.label} className="bg-[#0A1220] p-8 text-center">
                <div className={`text-4xl md:text-5xl font-display font-bold mb-2 ${stat.orange ? 'text-dever-orange' : 'text-dever-teal'}`}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-mono text-dever-muted uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Story & Mission ──────────────────────────────────────── */}
      <section className="py-24 bg-[#080E14] relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <motion.div {...fadeInUp} className="lg:col-span-7">
              <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">
                SIG.09 / WHO WE ARE
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
                Built for <span className="text-gradient-teal">businesses</span> that want
                to grow.
              </h2>

              <div className="space-y-6 text-dever-muted text-lg leading-relaxed">
                <p>
                  Deverdex was built on a simple mission: build websites that actually work
                  for businesses. We've delivered 1,000+ projects across 40+ countries,
                  working directly with clients and through our Pro profiles, where we hold
                  hundreds of five-star reviews.
                </p>
                <p>
                  We build websites, stores and apps for businesses worldwide — on Shopify,
                  WordPress, React, Webflow and custom platforms. Every project includes AEO
                  schema and structured data, so our clients get found in ChatGPT, Perplexity
                  and Google AI Mode.
                </p>
                <p>
                  We're a web agency. We just happen to be very good at making sites visible
                  in AI search too.
                </p>
              </div>

              <div className="mt-10">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-dever-teal text-[#080E14] font-semibold text-sm hover:brightness-110 transition-all"
                >
                  Start a Project <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="lg:col-span-5">
              <div className="bg-[#0A1220] border border-[#1A2639] rounded-2xl overflow-hidden shadow-[0_0_60px_-20px_rgba(0,220,185,0.1)]">
                <div className="bg-[#0D1726] border-b border-[#1A2639] px-8 py-5">
                  <span className="font-mono text-xs text-dever-teal uppercase tracking-widest">QUICK FACTS</span>
                </div>

                <div className="divide-y divide-[#1A2639]">
                  {[
                    { label: 'Founded', value: '2021' },
                    { label: 'Headquarters', value: 'Global Remote' },
                    { label: 'Team Size', value: '10–20 people' },
                    { label: 'Speciality', value: 'Web + AI Visibility' },
                    { label: 'Platforms', value: 'Shopify, WP, React, Webflow' },
                  ].map(fact => (
                    <div key={fact.label} className="flex justify-between items-center px-8 py-5 hover:bg-white/3 transition-colors">
                      <span className="text-xs font-mono text-dever-muted uppercase tracking-wider">{fact.label}</span>
                      <span className="text-sm font-display font-semibold text-white">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values / Mission ─────────────────────────────────────── */}
      <section className="py-24 bg-[#0A1220] border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="mb-16">
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-4">
              SIG.09B / WHAT WE STAND FOR
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Our principles.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-[#080E14] border border-white/5 rounded-2xl p-8 hover:border-dever-teal/20 hover:shadow-[0_0_30px_-10px_rgba(0,220,185,0.15)] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-dever-teal/10 border border-dever-teal/20 flex items-center justify-center text-dever-teal mb-6 group-hover:bg-dever-teal/15 transition-colors">
                  <v.icon size={22} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{v.title}</h3>
                <p className="text-dever-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#080E14] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-dever-teal/4 blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div {...fadeInUp} className="mb-16">
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-4">
              SIG.10 / THE TEAM
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Built by <span className="text-gradient-teal">experts.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl overflow-hidden aspect-[4/5] mb-6 relative border border-white/10 bg-[#0A1220]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080E14] via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 bg-dever-teal/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[0.15] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Name overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl font-display font-bold text-white mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-dever-teal font-mono text-xs uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="text-dever-muted text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0A1220] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[400px] rounded-full bg-dever-teal/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">
              WORK WITH US
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-dever-muted text-lg mb-10 max-w-xl mx-auto">
              Tell us about your project. We'll get back to you within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 rounded-xl bg-dever-teal text-[#080E14] font-semibold hover:brightness-110 transition-all"
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
    </div>
  );
}

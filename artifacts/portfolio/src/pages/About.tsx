import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useGetStats } from '@workspace/api-client-react';
import { ArrowRight, Globe, Star, Award, Users, Github, Linkedin, Twitter } from 'lucide-react';
import team1 from '@assets/generated_images/team-sheeraz.png';
import team2 from '@assets/generated_images/team-alina.png';
import team3 from '@assets/generated_images/team-tahira.png';

/* ── helpers ─────────────────────────────────────────────────────── */
function Counter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const steps = 60;
    const inc = target / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(parseFloat(start.toFixed(decimals)));
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, target, decimals]);

  return <span ref={ref}>{decimals ? val.toFixed(decimals) : val}{suffix}</span>;
}

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
};

const stagger = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

/* ── data ────────────────────────────────────────────────────────── */
const team = [
  {
    name: 'Sheeraz Afzal',
    role: 'CEO & Co-Founder',
    image: team1,
    bio: 'Leading strategy, client relationships and product direction. Built Deverdex from a solo Fiverr profile to a global web agency.',
    socials: { twitter: '#', linkedin: 'https://www.linkedin.com/in/sheeraz-afzal786' },
  },
  {
    name: 'Alina Altaf',
    role: 'CTO & Co-Founder',
    image: team2,
    bio: 'Architecting the technical systems and AI-powered platforms. Full-stack engineer with a background in distributed systems.',
    socials: { github: '#', linkedin: 'https://www.linkedin.com/in/alina-altaf786' },
  },
  {
    name: 'Tahira Sadia',
    role: 'Full Stack Developer',
    image: team3,
    bio: 'Building pixel-perfect front-ends and robust back-end systems. Specialises in React, Node.js and headless e-commerce.',
    socials: { github: '#', linkedin: '#' },
  },
];

const values = [
  {
    icon: Globe,
    label: 'Global Reach',
    desc: "We've worked with businesses across 40+ countries — from solo founders to scaling brands — delivering work that travels.",
  },
  {
    icon: Star,
    label: 'Quality First',
    desc: 'Hundreds of five-star reviews across Fiverr and Upwork. Clients return because we get it right the first time.',
  },
  {
    icon: Award,
    label: 'AI-Ready Builds',
    desc: 'Every site ships with AEO schema and structured data so clients appear in ChatGPT, Perplexity and Google AI Mode.',
  },
  {
    icon: Users,
    label: 'Real Partnership',
    desc: 'Direct communication, transparent timelines, and real support after launch. No agency run-around.',
  },
];

/* ── component ───────────────────────────────────────────────────── */
export function About() {
  const { data: stats } = useGetStats();

  return (
    <div className="w-full">

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="pt-32 pb-24 bg-[#080E14] relative overflow-hidden">
        {/* subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,220,185,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,185,1) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        {/* glow blob */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.07) 0%,transparent 70%)' }} />

        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
          <motion.div {...stagger(0)}>
            <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-8 flex items-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" />
              SIG.08 / OUR STORY
            </div>
          </motion.div>

          <motion.h1 {...stagger(0.07)} className="font-bold leading-[1.05] mb-4">
            <span className="block text-white text-5xl md:text-7xl lg:text-8xl">We're{' '}
              <span className="text-[#00DCB9]">Deverdex.</span>
            </span>
            <span className="block text-white text-3xl md:text-5xl lg:text-6xl mt-3 leading-tight font-bold">
              We build websites that get found&thinsp;—&thinsp;and get results.
            </span>
          </motion.h1>

          <motion.p {...stagger(0.14)} className="text-[#7A8BAA] text-xl mt-6 max-w-2xl">
            Working with businesses across 40+ countries, worldwide.
          </motion.p>
        </div>
      </section>

      {/* ══ WHO WE ARE ════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#080E14] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            {/* Left — copy */}
            <div className="lg:col-span-7">
              <motion.div {...stagger(0)}>
                <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-6 flex items-center gap-2">
                  <span className="w-5 h-px bg-[#00DCB9]/50" />
                  SIG.09 / WHO WE ARE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#00DCB9] mb-8 leading-tight">
                  Deverdex.
                </h2>
              </motion.div>

              <motion.div {...stagger(0.08)} className="space-y-5 text-[#8A9BB8] text-lg leading-relaxed">
                <p>
                  Deverdex was built on a simple mission: build websites that actually work for businesses.
                  We've delivered 1,000+ projects across 40+ countries, working directly with clients and
                  through our Pro profiles, where we hold hundreds of five-star reviews.
                </p>
                <p>
                  We build websites, stores and apps for businesses worldwide — on Shopify, WordPress,
                  React, Webflow and custom platforms. Every project includes AEO schema and structured
                  data, so our clients get found in ChatGPT, Perplexity and Google AI Mode.
                </p>
                <p>
                  We're a web agency. We just happen to be very good at making sites visible in AI search too.
                </p>
              </motion.div>

              <motion.div {...stagger(0.16)} className="flex flex-wrap gap-4 mt-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 bg-[#00DCB9] text-[#080E14] font-bold px-6 py-3.5 rounded-full hover:brightness-105 hover:shadow-[0_0_24px_rgba(0,220,185,0.35)] transition-all text-sm uppercase tracking-wide">
                  Work With Us <ArrowRight size={15} />
                </Link>
                <Link href="/portfolio"
                  className="inline-flex items-center gap-2 border border-white/15 text-white font-semibold px-6 py-3.5 rounded-full hover:border-white/30 hover:bg-white/4 transition-all text-sm">
                  See Our Work
                </Link>
              </motion.div>
            </div>

            {/* Right — Quick Facts card */}
            <motion.div {...stagger(0.12)} className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A1220] shadow-[0_0_60px_-20px_rgba(0,220,185,0.12)]">
                {/* Card header */}
                <div className="px-8 py-5 border-b border-white/8 bg-[#0C1520]">
                  <span className="font-mono text-[11px] text-[#5A6B8A] uppercase tracking-[0.2em]">QUICK FACTS</span>
                </div>
                {/* Rows */}
                {[
                  { label: 'PROJECTS DELIVERED', value: stats?.projectsDelivered ?? 1000, suffix: '+', color: 'text-white', bold: true },
                  { label: 'AVG RATING', value: 5.0, suffix: ' ★', color: 'text-[#00DCB9]', decimals: 1 },
                  { label: 'FIVERR RATING', value: 5.0, suffix: ' ★', color: 'text-[#00DCB9]', decimals: 1 },
                  { label: 'COUNTRIES SERVED', value: stats?.countriesServed ?? 40, suffix: '+', color: 'text-white' },
                  { label: 'YEARS ACTIVE', value: 4, suffix: '+', color: 'text-white' },
                ].map((row, i) => (
                  <div key={row.label}
                    className="flex items-center justify-between px-8 py-5 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                    <span className="font-mono text-[11px] text-[#5A6B8A] uppercase tracking-wider">{row.label}</span>
                    <span className={`font-bold text-base ${row.color}`}>
                      <Counter target={row.value} suffix={row.suffix} decimals={row.decimals ?? 0} />
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE STAND FOR ═════════════════════════════════════════ */}
      <section className="py-24 bg-[#06090F] border-t border-white/5 relative overflow-hidden">
        {/* grid bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,220,185,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,185,1) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div {...fadeUp} className="mb-16">
            <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" />
              SIG.09B / WHAT WE STAND FOR
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Our principles.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.label} {...stagger(i * 0.07)}
                className="group bg-[#0A1220] border border-white/6 rounded-2xl p-8 hover:border-[#00DCB9]/20 hover:bg-[#0D1726] hover:shadow-[0_0_40px_-12px_rgba(0,220,185,0.15)] transition-all duration-400">
                <div className="w-11 h-11 rounded-xl bg-[#00DCB9]/10 border border-[#00DCB9]/20 flex items-center justify-center text-[#00DCB9] mb-6 group-hover:bg-[#00DCB9]/15 group-hover:scale-110 transition-all duration-300">
                  <v.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{v.label}</h3>
                <p className="text-[#6A7B98] leading-relaxed text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#080E14] border-t border-white/5 relative overflow-hidden">
        {/* center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[900px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.05) 0%,transparent 65%)' }} />
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          {/* Header */}
          <motion.div {...fadeUp} className="mb-16">
            <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" />
              SIG.10 / THE TEAM
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Built by <span className="text-[#00DCB9]">experts.</span>
              </h2>
              <p className="text-[#5A6B8A] max-w-sm leading-relaxed text-sm">
                Small, focused team. No account managers, no middlemen — you work directly with the people building your product.
              </p>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <motion.div key={member.name} {...stagger(idx * 0.1)} className="group">
                {/* Photo */}
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[3/4] bg-[#0A1220]">
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080E14] via-[#080E14]/20 to-transparent z-10" />
                  {/* hover teal tint */}
                  <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'rgba(0,220,185,0.07)', mixBlendMode: 'overlay' }} />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="font-mono text-[10px] text-[#00DCB9] uppercase tracking-[0.2em] mb-1">{member.role}</div>
                    <h3 className="text-xl font-bold text-white leading-tight">{member.name}</h3>
                  </div>
                  {/* Social icons — reveal on hover */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin}
                        className="w-8 h-8 bg-[#080E14]/80 backdrop-blur-sm border border-white/15 rounded-lg flex items-center justify-center text-white hover:border-[#00DCB9]/50 hover:text-[#00DCB9] transition-colors">
                        <Linkedin size={14} />
                      </a>
                    )}
                    {member.socials.github && (
                      <a href={member.socials.github}
                        className="w-8 h-8 bg-[#080E14]/80 backdrop-blur-sm border border-white/15 rounded-lg flex items-center justify-center text-white hover:border-[#00DCB9]/50 hover:text-[#00DCB9] transition-colors">
                        <Github size={14} />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a href={member.socials.twitter}
                        className="w-8 h-8 bg-[#080E14]/80 backdrop-blur-sm border border-white/15 rounded-lg flex items-center justify-center text-white hover:border-[#00DCB9]/50 hover:text-[#00DCB9] transition-colors">
                        <Twitter size={14} />
                      </a>
                    )}
                  </div>
                </div>
                {/* Bio below card */}
                <p className="text-[#5A6B8A] text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>

          {/* Team stat strip */}
          <motion.div {...stagger(0.3)}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8">
            {[
              { value: '10–20', label: 'Team Members' },
              { value: '40+', label: 'Countries Served' },
              { value: '1,000+', label: 'Projects Delivered' },
              { value: '5.0 ★', label: 'Avg Client Rating' },
            ].map((s) => (
              <div key={s.label} className="bg-[#080E14] px-8 py-7 text-center hover:bg-[#0D1826] transition-colors">
                <div className="text-2xl font-bold text-[#00DCB9] mb-1">{s.value}</div>
                <div className="font-mono text-[10px] text-[#5A6B8A] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#06090F] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[900px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.06) 0%,transparent 65%)' }} />
        </div>
        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center">
          <motion.div {...fadeUp}>
            <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-6 flex items-center justify-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" />
              WORK WITH US
              <span className="w-5 h-px bg-[#00DCB9]/50" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to get started?
            </h2>
            <p className="text-[#6A7B98] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Tell us about your project. We'll get back to you within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-[#00DCB9] text-[#080E14] font-bold px-8 py-4 rounded-full hover:brightness-105 hover:shadow-[0_0_30px_rgba(0,220,185,0.35)] transition-all text-sm uppercase tracking-wide">
                Start a Project <ArrowRight size={15} />
              </Link>
              <Link href="/services"
                className="inline-flex items-center gap-2 border border-white/15 text-white font-semibold px-8 py-4 rounded-full hover:border-white/30 hover:bg-white/4 transition-all text-sm">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useGetStats } from '@workspace/api-client-react';
import { ArrowRight, Globe, Star, Award, Users, Github, Linkedin, Twitter } from 'lucide-react';
import team1 from '@assets/generated_images/team-sheeraz.png';
import team2 from '@assets/generated_images/team-alina.png';
import team3 from '@assets/generated_images/team-tahira.png';

/* ─── animated counter ─────────────────────────────────────────────── */
function Counter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 70;
    const tick = () => {
      frame++;
      const progress = frame / total;
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(parseFloat((target * eased).toFixed(decimals)));
      if (frame < total) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target, decimals]);

  return <span ref={ref}>{decimals ? val.toFixed(decimals) : Math.round(val)}{suffix}</span>;
}

/* ─── word-split reveal ─────────────────────────────────────────────── */
function WordReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginRight: '0.25em', transformOrigin: 'top' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── variants ─────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const photoVariants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
  show: (i: number) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

/* ─── data ─────────────────────────────────────────────────────────── */
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
    socials: { github: '#', linkedin: 'https://pk.linkedin.com/in/tahira-sadia-a92058253' },
  },
];

const values = [
  { icon: Globe, label: 'Global Reach', desc: "We've worked with businesses across 40+ countries — from solo founders to scaling brands — delivering work that travels.", accent: '#00DCB9' },
  { icon: Star, label: 'Quality First', desc: 'Hundreds of five-star reviews across Fiverr and Upwork. Clients return because we get it right the first time.', accent: '#FF6B35' },
  { icon: Award, label: 'AI-Ready Builds', desc: 'Every site ships with AEO schema and structured data so clients appear in ChatGPT, Perplexity and Google AI Mode.', accent: '#00DCB9' },
  { icon: Users, label: 'Real Partnership', desc: 'Direct communication, transparent timelines, and real support after launch. No agency run-around.', accent: '#FF6B35' },
];

/* ─── component ─────────────────────────────────────────────────────── */
export function About() {
  const { data: stats } = useGetStats();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="pt-32 pb-28 bg-[#080E14] relative overflow-hidden">
        {/* animated grid */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.022 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage: 'linear-gradient(rgba(0,220,185,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,185,1) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* pulsing blob */}
        <motion.div
          className="absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ scale: blobScale, background: 'radial-gradient(ellipse,rgba(0,220,185,0.09) 0%,transparent 70%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* second accent blob */}
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(255,107,53,0.06) 0%,transparent 70%)' }}
          animate={{ opacity: [0.4, 0.9, 0.4], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl"
        >
          {/* sig label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-10 flex items-center gap-3"
          >
            <motion.span
              className="block h-px bg-[#00DCB9]"
              initial={{ width: 0 }}
              animate={{ width: 20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />
            SIG.08 / OUR STORY
          </motion.div>

          {/* headline */}
          <h1 className="font-bold leading-[1.05] mb-6" style={{ perspective: '800px' }}>
            <span className="block text-white text-5xl md:text-7xl lg:text-8xl">
              <WordReveal text="We're" delay={0.1} />
              {' '}
              <motion.span
                className="text-[#00DCB9] inline-block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                Deverdex.
              </motion.span>
            </span>
            <span className="block text-white text-3xl md:text-5xl lg:text-6xl mt-4 leading-tight font-bold">
              <WordReveal text="We build websites that get found — and get results." delay={0.35} />
            </span>
          </h1>

          {/* underline */}
          <motion.div
            className="h-px bg-gradient-to-r from-[#00DCB9]/60 via-[#00DCB9]/20 to-transparent mb-8"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#7A8BAA] text-xl max-w-2xl"
          >
            Working with businesses across 40+ countries, worldwide.
          </motion.p>

          {/* floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full border border-[#00DCB9]/20 bg-[#00DCB9]/6 text-[#00DCB9] font-mono text-xs uppercase tracking-wider"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#00DCB9]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Est. 2020 · Global Agency
          </motion.div>
        </motion.div>
      </section>

      {/* ══ WHO WE ARE ════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#080E14] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            {/* Left — copy */}
            <motion.div
              className="lg:col-span-7"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={itemVariants}>
                <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-6 flex items-center gap-2">
                  <span className="w-5 h-px bg-[#00DCB9]/50" />
                  SIG.09 / WHO WE ARE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#00DCB9] mb-8 leading-tight">
                  Deverdex.
                </h2>
              </motion.div>

              {[
                "Deverdex was built on a simple mission: build websites that actually work for businesses. We've delivered 1,000+ projects across 40+ countries, working directly with clients and through our Pro profiles, where we hold hundreds of five-star reviews.",
                "We build websites, stores and apps for businesses worldwide — on Shopify, WordPress, React, Webflow and custom platforms. Every project includes AEO schema and structured data, so our clients get found in ChatGPT, Perplexity and Google AI Mode.",
                "We're a web agency. We just happen to be very good at making sites visible in AI search too.",
              ].map((p, i) => (
                <motion.p key={i} variants={itemVariants} className="text-[#8A9BB8] text-lg leading-relaxed mb-5">
                  {p}
                </motion.p>
              ))}

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-10">
                <Link href="/contact"
                  className="group inline-flex items-center gap-2 bg-[#00DCB9] text-[#080E14] font-bold px-6 py-3.5 rounded-full hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,220,185,0.4)] transition-all text-sm uppercase tracking-wide">
                  Work With Us
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <ArrowRight size={15} />
                  </motion.span>
                </Link>
                <Link href="/portfolio"
                  className="inline-flex items-center gap-2 border border-white/15 text-white font-semibold px-6 py-3.5 rounded-full hover:border-white/30 hover:bg-white/5 transition-all text-sm">
                  See Our Work
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — Quick Facts card */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A1220] shadow-[0_0_60px_-20px_rgba(0,220,185,0.15)]"
                whileHover={{ boxShadow: '0 0 80px -20px rgba(0,220,185,0.25)' }}
                transition={{ duration: 0.4 }}
              >
                <div className="px-8 py-5 border-b border-white/8 bg-[#0C1520] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#5A6B8A] uppercase tracking-[0.2em]">QUICK FACTS</span>
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#00DCB9]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                {[
                  { label: 'PROJECTS DELIVERED', value: stats?.projectsDelivered ?? 1000, suffix: '+', color: 'text-white' },
                  { label: 'AVG RATING', value: 5.0, suffix: ' ★', color: 'text-[#00DCB9]', decimals: 1 },
                  { label: 'FIVERR RATING', value: 5.0, suffix: ' ★', color: 'text-[#00DCB9]', decimals: 1 },
                  { label: 'COUNTRIES SERVED', value: stats?.countriesServed ?? 40, suffix: '+', color: 'text-white' },
                  { label: 'YEARS ACTIVE', value: 4, suffix: '+', color: 'text-white' },
                ].map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.3 + i * 0.07 }}
                    className="flex items-center justify-between px-8 py-5 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors group"
                  >
                    <span className="font-mono text-[11px] text-[#5A6B8A] uppercase tracking-wider group-hover:text-[#7A8BAA] transition-colors">{row.label}</span>
                    <span className={`font-bold text-base ${row.color}`}>
                      <Counter target={row.value} suffix={row.suffix} decimals={row.decimals ?? 0} />
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE STAND FOR ═════════════════════════════════════════ */}
      <section className="py-24 bg-[#06090F] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,220,185,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,185,1) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
            className="mb-16"
          >
            <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" />
              SIG.09B / WHAT WE STAND FOR
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Our principles.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative bg-[#0A1220] border border-white/6 rounded-2xl p-8 overflow-hidden cursor-default"
              >
                {/* animated border-glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${v.accent}33, 0 0 40px -10px ${v.accent}22` }}
                />

                {/* accent bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 rounded-full"
                  style={{ background: v.accent }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '40%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />

                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 border"
                  style={{ background: `${v.accent}18`, borderColor: `${v.accent}33`, color: v.accent }}
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <v.icon size={20} />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-3">{v.label}</h3>
                <p className="text-[#6A7B98] leading-relaxed text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#080E14] border-t border-white/5 relative overflow-hidden">
        {/* animated center glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-[900px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.06) 0%,transparent 65%)' }} />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
            className="mb-16"
          >
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
              <motion.div
                key={member.name}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="group"
              >
                {/* Photo with clip-reveal */}
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[3/4] bg-[#0A1220]">
                  <motion.div
                    className="absolute inset-0 z-0"
                    custom={idx}
                    variants={photoVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                  </motion.div>

                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080E14] via-[#080E14]/20 to-transparent z-10" />

                  {/* teal tint on hover */}
                  <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ background: 'rgba(0,220,185,0.07)', mixBlendMode: 'overlay' }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Name overlay — slides up on load */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.12 }}
                  >
                    <div className="font-mono text-[10px] text-[#00DCB9] uppercase tracking-[0.2em] mb-1">{member.role}</div>
                    <h3 className="text-xl font-bold text-white leading-tight">{member.name}</h3>
                  </motion.div>

                  {/* Social icons */}
                  <motion.div
                    className="absolute top-4 right-4 z-20 flex flex-col gap-2"
                    initial={{ opacity: 0, x: 12 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* always render but animate on parent hover via CSS */}
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 bg-[#080E14]/85 backdrop-blur-sm border border-white/15 rounded-xl flex items-center justify-center text-white hover:border-[#00DCB9]/60 hover:text-[#00DCB9] hover:shadow-[0_0_12px_rgba(0,220,185,0.3)] transition-all duration-200">
                          <Linkedin size={14} />
                        </a>
                      )}
                      {member.socials.github && (
                        <a href={member.socials.github} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 bg-[#080E14]/85 backdrop-blur-sm border border-white/15 rounded-xl flex items-center justify-center text-white hover:border-[#00DCB9]/60 hover:text-[#00DCB9] hover:shadow-[0_0_12px_rgba(0,220,185,0.3)] transition-all duration-200">
                          <Github size={14} />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 bg-[#080E14]/85 backdrop-blur-sm border border-white/15 rounded-xl flex items-center justify-center text-white hover:border-[#00DCB9]/60 hover:text-[#00DCB9] hover:shadow-[0_0_12px_rgba(0,220,185,0.3)] transition-all duration-200">
                          <Twitter size={14} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Bio — slides up */}
                <motion.p
                  className="text-[#5A6B8A] text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.12 }}
                >
                  {member.bio}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Stat strip */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { value: '10–20', label: 'Team Members' },
              { value: '40+', label: 'Countries Served' },
              { value: '1,000+', label: 'Projects Delivered' },
              { value: '5.0 ★', label: 'Avg Client Rating' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="bg-[#080E14] px-8 py-7 text-center hover:bg-[#0D1826] transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                whileHover={{ scale: 1.04 }}
              >
                <div className="text-2xl font-bold text-[#00DCB9] mb-1 group-hover:text-white transition-colors">{s.value}</div>
                <div className="font-mono text-[10px] text-[#5A6B8A] uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#06090F] border-t border-white/5 relative overflow-hidden">
        {/* pulsing glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-[900px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.07) 0%,transparent 65%)' }} />
        </motion.div>

        {/* floating orbs */}
        <motion.div
          className="absolute left-16 top-1/3 w-3 h-3 rounded-full bg-[#00DCB9]/30 pointer-events-none"
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-24 bottom-1/3 w-2 h-2 rounded-full bg-[#FF6B35]/30 pointer-events-none"
          animate={{ y: [8, -8, 8], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <motion.div
          className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.22em] mb-6 flex items-center justify-center gap-2">
            <motion.span
              className="block h-px bg-[#00DCB9]/50"
              initial={{ width: 0 }}
              whileInView={{ width: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            WORK WITH US
            <motion.span
              className="block h-px bg-[#00DCB9]/50"
              initial={{ width: 0 }}
              whileInView={{ width: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to get started?
          </h2>
          <p className="text-[#6A7B98] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Tell us about your project. We'll get back to you within 24 hours.
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-[#00DCB9] text-[#080E14] font-bold px-8 py-4 rounded-full hover:brightness-110 hover:shadow-[0_0_36px_rgba(0,220,185,0.45)] transition-all text-sm uppercase tracking-wide">
                Start a Project <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/services"
                className="inline-flex items-center gap-2 border border-white/15 text-white font-semibold px-8 py-4 rounded-full hover:border-white/30 hover:bg-white/5 transition-all text-sm">
                View Services
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}

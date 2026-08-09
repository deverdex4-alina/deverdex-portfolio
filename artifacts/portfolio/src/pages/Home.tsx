import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import { TerminalWidget } from '@/components/TerminalWidget';
import { ParticleField } from '@/components/ParticleField';
import { useGetStats, useGetServices, useGetProjects, useGetBlogPosts } from '@workspace/api-client-react';
import {
  ArrowRight, Code2, Palette, Smartphone, Search, ShoppingBag, Cpu, Bot, Wrench,
  Star, Quote, ChevronRight, CheckCircle2, Clock, BarChart3, Globe2, Award,
} from 'lucide-react';

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ─── animated counter ─── */
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
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── service icon map ─── */
const SERVICE_ICONS: Record<string, React.ElementType> = {
  design: Palette,
  development: Code2,
  mobile: Smartphone,
  marketing: Search,
  ecommerce: ShoppingBag,
  software: Cpu,
  ai: Bot,
  maintenance: Wrench,
};

/* ─── process steps ─── */
const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Brief', desc: 'We start with a deep-dive into your goals, audience, competitors and technical requirements. No assumptions — just clarity.' },
  { num: '02', title: 'Strategy & Planning', desc: 'A detailed project plan, sitemap, content structure and tech stack selection tailored to your budget and timeline.' },
  { num: '03', title: 'Design & Prototype', desc: 'High-fidelity Figma designs that feel real before a single line of code is written. You approve every screen.' },
  { num: '04', title: 'Build & Develop', desc: 'Clean, performant code built to the specification. Regular staging updates so you always know where we are.' },
  { num: '05', title: 'Test & Launch', desc: 'End-to-end QA across devices and browsers, performance audits, then a controlled go-live.' },
  { num: '06', title: 'Support & Grow', desc: 'Post-launch monitoring, content updates, SEO tracking and ongoing development as your business grows.' },
];

/* ─── testimonials ─── */
const TESTIMONIALS = [
  {
    name: 'James Carter',
    role: 'CEO, FinTrack Pro',
    rating: 5,
    text: 'Deverdex completely transformed our online presence. The dashboard they built is fast, beautiful and our clients love it. Delivered on time, every time.',
    avatar: 'JC',
  },
  {
    name: 'Samantha Roe',
    role: 'Founder, Luxe Realty',
    rating: 5,
    text: 'From day one the team understood our brand. The website went live in 3 weeks and we saw a 40% increase in enquiries within the first month.',
    avatar: 'SR',
  },
  {
    name: 'Tariq Mahmood',
    role: 'Product Lead, FoodFly',
    rating: 5,
    text: 'Our React Native app is smooth, feature-rich and our users consistently rate it 5 stars. The Deverdex team are genuinely exceptional at mobile development.',
    avatar: 'TM',
  },
];

/* ─── tech logos ─── */
const TECH_STACK = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Shopify',
  'WordPress', 'Webflow', 'React Native', 'PostgreSQL', 'AWS',
];

export function Home() {
  const { data: stats } = useGetStats();
  const { data: services } = useGetServices();
  const { data: projects } = useGetProjects({});
  const { data: blogPosts } = useGetBlogPosts();

  const getIcon = (category: string) => {
    const Icon = SERVICE_ICONS[category.toLowerCase()] ?? Code2;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <div className="w-full">

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO  (dark #080E14, dots animation here only)
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pb-16 overflow-hidden bg-[#080E14]">
        {/* Particle dots contained ONLY to this section */}
        <ParticleField contained />

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#00DCB9]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF6B35]/6 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="flex flex-col items-start"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-8 border border-[#00DCB9]/25 bg-[#00DCB9]/8 px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00DCB9] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#00DCB9]">Web Design &amp; Development — Worldwide</span>
              </div>

              {/* Headline */}
              <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.06] tracking-tight mb-6">
                <span className="block text-white">We build</span>
                <span className="block text-[#00DCB9]">digital products</span>
                <span className="block text-[#FF6B35]">that get found.</span>
              </h1>

              <p className="text-base md:text-lg text-[#7A8BAA] max-w-lg leading-relaxed mb-8">
                From custom web apps to Shopify stores, landing pages to full SaaS platforms — we build for businesses worldwide. Beautiful, fast, and built to perform wherever your customers find you.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#00DCB9] hover:bg-[#00c4a6] text-[#080E14] font-bold px-7 py-3.5 rounded-full transition-all shadow-[0_0_24px_rgba(0,220,185,0.35)] text-[15px]">
                  Start a Project <ArrowRight size={18} />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 border border-white/18 hover:border-white/40 text-white font-semibold px-7 py-3.5 rounded-full transition-all text-[15px] hover:bg-white/5">
                  View Our Work
                </Link>
              </div>

              {/* Social proof pills */}
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <div className="inline-flex items-center gap-2 border border-white/10 bg-white/4 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#7A8BAA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00DCB9]" />50+ Reviews
                </div>
                <div className="inline-flex items-center gap-2 border border-white/10 bg-white/4 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#7A8BAA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />Worldwide
                </div>
                <div className="inline-flex items-center gap-2 border border-white/10 bg-white/4 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#7A8BAA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00DCB9]" />5.0 ★ Rating
                </div>
              </div>
            </motion.div>

            {/* Right — Terminal widget */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
              className="flex justify-center lg:justify-end"
            >
              <TerminalWidget />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — STATS / TRUST BAR  (slightly lighter bg)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0A1220] border-y border-white/8 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
            {[
              { icon: BarChart3, value: 50, suffix: '+', label: 'Projects Delivered' },
              { icon: Star, value: 5, suffix: '.0★', label: 'Average Rating', color: '#FF6B35' },
              { icon: Globe2, value: 15, suffix: '+', label: 'Countries Served' },
              { icon: Award, value: 3, suffix: '+ Yrs', label: 'Industry Experience' },
            ].map(({ icon: Icon, value, suffix, label, color }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="p-8 md:p-12 flex flex-col items-center text-center"
              >
                <Icon className="w-5 h-5 mb-3" style={{ color: color ?? '#00DCB9' }} />
                <div className="text-3xl md:text-5xl font-bold text-white mb-1.5" style={{ color: color }}>
                  {color ? <Counter target={value} suffix={suffix} /> : <><Counter target={value} suffix="" />{suffix}</>}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#5A6B8A]">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — SERVICES  (#080E14 with subtle grid)
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#080E14] relative z-10">
        {/* subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(#00DCB9 1px, transparent 1px), linear-gradient(90deg, #00DCB9 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="mb-14">
            <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.18em] mb-4">SIG.02 / SERVICES</div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="block text-white">Every Platform.</span>
              <span className="block text-[#00DCB9]">Built to Perform.</span>
            </h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Code2, name: 'Web Development', desc: 'Custom websites, web apps, landing pages and business platforms built with modern stacks.', category: 'development', href: '/services#web-development' },
              { icon: ShoppingBag, name: 'E-Commerce', desc: 'Shopify stores, WooCommerce sites and custom e-commerce solutions that convert.', category: 'ecommerce', href: '/services#ecommerce' },
              { icon: Palette, name: 'UI/UX Design', desc: 'Research-led design — wireframes, prototypes, design systems and responsive UI.', category: 'design', href: '/services#web-design' },
              { icon: Cpu, name: 'Custom Software', desc: 'Web applications, SaaS platforms, dashboards and business automation systems.', category: 'software', href: '/services#custom-software' },
              { icon: Smartphone, name: 'Mobile Apps', desc: 'iOS & Android apps built with React Native — native performance, one codebase.', category: 'mobile', href: '/services#mobile-apps' },
              { icon: Bot, name: 'AI Solutions', desc: 'AI integrations, assistants, automation and AI-powered application development.', category: 'ai', href: '/services#ai' },
              { icon: Search, name: 'SEO & AEO', desc: 'Technical SEO, structured data and AI search optimization so you get found everywhere.', category: 'marketing', href: '/services#seo-aeo' },
              { icon: Wrench, name: 'Maintenance', desc: 'Ongoing support, security monitoring, performance optimization and content updates.', category: 'maintenance', href: '/services#maintenance' },
            ].map((svc) => (
              <motion.div key={svc.name} variants={fadeUp}
                className="group bg-[#0D1826] border border-white/8 rounded-2xl p-6 hover:border-[#00DCB9]/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-5 group-hover:border-[#00DCB9]/40 group-hover:bg-[#00DCB9]/10 transition-all">
                  <svc.icon className="w-5 h-5 text-[#7A8BAA] group-hover:text-[#00DCB9] transition-colors" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00DCB9] transition-colors">{svc.name}</h3>
                <p className="text-sm text-[#5A6B8A] leading-relaxed flex-1">{svc.desc}</p>
                <Link href={svc.href} className="inline-flex items-center gap-1.5 mt-5 text-xs font-mono uppercase tracking-wider text-[#5A6B8A] group-hover:text-[#00DCB9] transition-colors">
                  Learn more <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3.5 — AI-FIRST WEB  (#0A1220 with glow)
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0A1220] relative z-10 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00DCB9]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
              <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.18em] mb-4">SIG.03 / AI-FIRST WEB</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                <span className="block text-white">Your site,</span>
                <span className="block text-[#00DCB9]">in every AI answer.</span>
              </h2>
              <p className="text-[#7A8BAA] leading-relaxed mb-8 max-w-lg">
                When someone searches in ChatGPT, Perplexity or Google AI Mode, most websites are invisible. We build every Deverdex site with AEO schema baked in from day one — so your business gets cited, recommended, and surfaced wherever your customers are asking.
              </p>

              <div className="flex flex-col gap-4 mb-10">
                {[
                  { label: 'AEO Schema Markup', desc: 'Structured data that AI engines can read and cite' },
                  { label: 'Entity Authority', desc: 'Signals that establish your brand as a trusted source' },
                  { label: 'AI Visibility Monitoring', desc: 'Track when and where AI surfaces your brand' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#00DCB9]/15 border border-[#00DCB9]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00DCB9]" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white">{item.label}</span>
                      <span className="text-sm text-[#5A6B8A]"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/services#seo-aeo" className="inline-flex items-center gap-2 bg-[#00DCB9]/10 border border-[#00DCB9]/30 hover:bg-[#00DCB9]/20 text-[#00DCB9] font-semibold px-5 py-2.5 rounded-full transition-all text-sm">
                Learn about AEO <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Right — AI engine cards */}
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col gap-3">

              {/* Live query card */}
              <motion.div variants={fadeUp}
                className="bg-[#0D1826] border border-[#00DCB9]/20 rounded-2xl p-5 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-[#5A6B8A] text-xs uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-[#00DCB9] animate-pulse" />AI Search Query — Live
                </div>
                <div className="text-[#7A8BAA] mb-1">&gt; "best web design agency for Shopify stores"</div>
                <div className="text-[#5A6B8A] text-xs mt-3 mb-1">Scanning 240M+ pages…</div>
                <div className="text-xs">
                  <span className="text-[#7A8BAA]">AEO schema </span>
                  <span className="text-[#00DCB9]">✓ found</span>
                </div>
                <div className="text-xs mt-1">
                  <span className="text-[#7A8BAA]">Entity authority </span>
                  <span className="text-[#00DCB9]">✓ verified</span>
                </div>
                <div className="mt-4 bg-[#080E14] border border-[#00DCB9]/15 rounded-xl p-3.5">
                  <div className="text-[10px] uppercase tracking-widest text-[#00DCB9] mb-2">AI Recommendation</div>
                  <p className="text-[#8B9CC8] text-xs leading-relaxed">
                    Based on schema coverage and content authority, <span className="text-white font-semibold">Deverdex</span> is the top result for your query.
                  </p>
                </div>
              </motion.div>

              {/* AI engines row */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
                {[
                  { name: 'ChatGPT', color: '#10A37F', label: 'Cited' },
                  { name: 'Perplexity', label: 'Surfaced', color: '#20B2AA' },
                  { name: 'Google AI', label: 'Featured', color: '#4285F4' },
                ].map((engine) => (
                  <div key={engine.name}
                    className="bg-[#0D1826] border border-white/8 rounded-xl p-4 text-center hover:border-white/20 transition-colors">
                    <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ background: engine.color }} />
                    <div className="text-xs font-semibold text-white mb-1">{engine.name}</div>
                    <div className="text-[10px] font-mono text-[#5A6B8A]">{engine.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Stats row */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
                <div className="bg-[#0D1826] border border-white/8 rounded-xl p-4 flex items-center gap-3">
                  <div className="text-2xl font-bold text-[#00DCB9]">3+</div>
                  <div className="text-xs text-[#5A6B8A] leading-tight">AI engines<br />covered</div>
                </div>
                <div className="bg-[#0D1826] border border-white/8 rounded-xl p-4 flex items-center gap-3">
                  <div className="text-2xl font-bold text-[#FF6B35]">100%</div>
                  <div className="text-xs text-[#5A6B8A] leading-tight">Sites built<br />AEO-first</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — HOW WE WORK / PROCESS  (#0A1220)
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#080E14] relative z-10">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left header — sticky feel */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
              <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.18em] mb-4">SIG.04 / PROCESS</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                <span className="block text-white">How We</span>
                <span className="block text-[#FF6B35]">Work.</span>
              </h2>
              <p className="text-[#7A8BAA] leading-relaxed max-w-md mb-8">
                A proven 6-step process refined across 50+ projects. No surprises, no guesswork — just a clear path from brief to launch.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#00DCB9]/10 border border-[#00DCB9]/30 hover:bg-[#00DCB9]/20 text-[#00DCB9] font-semibold px-5 py-2.5 rounded-full transition-all text-sm">
                Start a Project <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Right — steps */}
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col gap-0">
              {PROCESS_STEPS.map((step, idx) => (
                <motion.div key={step.num} variants={fadeUp}
                  className="flex gap-5 py-5 border-b border-white/6 last:border-0 group hover:bg-white/2 -mx-4 px-4 rounded-xl transition-colors"
                >
                  <div className="font-mono text-xs text-[#00DCB9] w-8 shrink-0 pt-0.5 opacity-60">{step.num}</div>
                  <div>
                    <div className="font-bold text-white mb-1 group-hover:text-[#00DCB9] transition-colors">{step.title}</div>
                    <p className="text-sm text-[#5A6B8A] leading-relaxed">{step.desc}</p>
                  </div>
                  <ChevronRight className="ml-auto shrink-0 w-4 h-4 text-[#2A3A55] group-hover:text-[#00DCB9] transition-colors mt-1" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — PORTFOLIO / OUR WORK  (#080E14)
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#080E14] relative z-10">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-6">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
              <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.18em] mb-4">SIG.12 / PORTFOLIO</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="block text-white">Our Work.</span>
                <span className="block text-[#FF6B35]">Delivered Worldwide.</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
              <Link href="/portfolio" className="inline-flex items-center gap-2 border border-white/18 hover:border-white/40 text-white font-semibold px-5 py-2.5 rounded-full transition-all text-sm hover:bg-white/5">
                View All Projects <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(projects ?? []).slice(0, 3).map((project, idx) => {
              const gradients = [
                'from-[#00DCB9]/20 to-[#0D1826]',
                'from-[#FF6B35]/20 to-[#0D1826]',
                'from-[#4FC3F7]/20 to-[#0D1826]',
              ];
              const labels = ['React + Node.js', 'Web Design', 'React Native'];
              return (
                <motion.div key={project.id} variants={fadeUp} className="group cursor-pointer">
                  <div className={`rounded-2xl overflow-hidden mb-4 aspect-[4/3] relative bg-gradient-to-br ${gradients[idx % 3]}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-8">
                        <div className="font-mono text-[11px] uppercase tracking-widest text-[#00DCB9]/60 mb-3">{project.platform ?? labels[idx % 3]}</div>
                        <div className="text-xl font-bold text-white">{project.title}</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-[#080E14]/0 group-hover:bg-[#080E14]/20 transition-all duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#080E14]/80 border border-white/10 text-[11px] font-mono text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    {/* Tags */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                      {(project.tags ?? []).slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-white/10 text-[10px] font-mono text-white/70 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-1.5 group-hover:text-[#00DCB9] transition-colors">{project.title}</h3>
                  <p className="text-sm text-[#5A6B8A] line-clamp-2">{project.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — TESTIMONIALS  (#0D1526)
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0D1526] relative z-10">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="mb-14">
            <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.18em] mb-4">SIG.08 / REVIEWS</div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="block text-white">Clients Who</span>
              <span className="block text-[#00DCB9]">Trust Our Work.</span>
            </h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} variants={fadeUp}
                className="bg-[#0A1220] border border-white/8 rounded-2xl p-7 flex flex-col gap-5 hover:border-[#00DCB9]/30 transition-colors">
                <Quote className="w-8 h-8 text-[#00DCB9]/30" />
                <p className="text-[#8B9CC8] leading-relaxed flex-1">"{t.text}"</p>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FF6B35] text-[#FF6B35]" />
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-white/6 pt-4">
                  <div className="w-9 h-9 rounded-full bg-[#00DCB9]/20 border border-[#00DCB9]/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#00DCB9]">{t.avatar}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-[#5A6B8A]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — BLOG / INSIGHTS  (#080E14)
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#080E14] relative z-10">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-6">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
              <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.18em] mb-4">SIG.16 / BLOG</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="block text-white">Latest</span>
                <span className="block text-[#00DCB9]">Insights.</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
              <Link href="/blog" className="inline-flex items-center gap-2 border border-white/18 hover:border-white/40 text-white font-semibold px-5 py-2.5 rounded-full transition-all text-sm hover:bg-white/5">
                All Articles <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(blogPosts ?? []).slice(0, 3).map((post, idx) => {
              const colors = ['#00DCB9', '#FF6B35', '#4FC3F7'];
              return (
                <motion.div key={post.id} variants={fadeUp} className="group cursor-pointer">
                  <Link href={`/blog/${post.slug}`}>
                    {/* Image placeholder */}
                    <div className="rounded-2xl overflow-hidden mb-4 aspect-[16/9] relative"
                      style={{ background: `linear-gradient(135deg, ${colors[idx % 3]}18, #0D1826)` }}>
                      <div className="absolute inset-0 flex items-end p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {(post.tags ?? []).slice(0, 2).map((tag) => (
                            <span key={tag} className="bg-[#080E14]/80 text-[10px] font-mono text-white/70 px-2 py-0.5 rounded-full border border-white/10">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <div className="w-16 h-16 rounded-full" style={{ background: colors[idx % 3] }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3 text-[11px] font-mono text-[#5A6B8A] uppercase tracking-wider">
                      <Clock className="w-3 h-3" />{post.readingTime} min read
                    </div>
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#00DCB9] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#5A6B8A] line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <div className="inline-flex items-center gap-1.5 mt-4 text-xs font-mono uppercase tracking-wider text-[#5A6B8A] group-hover:text-[#00DCB9] transition-colors">
                      Read More <ArrowRight size={12} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — CTA BANNER  (#0A1220 with glow)
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0A1220] relative z-10">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            className="relative overflow-hidden bg-gradient-to-br from-[#0D1826] to-[#080E14] border border-white/8 rounded-3xl p-12 md:p-20 text-center"
          >
            {/* Glow orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#00DCB9]/12 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-[#FF6B35]/8 rounded-full blur-[80px] pointer-events-none" />

            {/* Corner dots decoration */}
            <div className="absolute top-6 left-6 grid grid-cols-3 gap-2 opacity-20">
              {Array.from({ length: 9 }).map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-[#00DCB9]" />)}
            </div>
            <div className="absolute bottom-6 right-6 grid grid-cols-3 gap-2 opacity-20">
              {Array.from({ length: 9 }).map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-[#FF6B35]" />)}
            </div>

            <div className="relative z-10">
              <div className="font-mono text-[11px] text-[#00DCB9] uppercase tracking-[0.18em] mb-6">READY TO START?</div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
                Let's Build Something<br />
                <span className="text-[#00DCB9]">Exceptional Together.</span>
              </h2>
              <p className="text-lg text-[#7A8BAA] max-w-2xl mx-auto mb-10 leading-relaxed">
                Join the businesses worldwide that trust Deverdex to build their digital presence, dominate search, and convert visitors into customers.
              </p>

              {/* Feature checklist */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
                {['Free initial consultation', 'Fixed-price quotes', 'On-time delivery', 'Post-launch support'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#7A8BAA]">
                    <CheckCircle2 className="w-4 h-4 text-[#00DCB9]" />{item}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#00DCB9] hover:bg-[#00c4a6] text-[#080E14] font-bold px-8 py-4 rounded-full transition-all shadow-[0_0_30px_rgba(0,220,185,0.4)] text-[15px]">
                  Start a Project <ArrowRight size={18} />
                </Link>
                <Link href="/get-a-quote" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-full transition-all text-[15px] hover:bg-white/5">
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

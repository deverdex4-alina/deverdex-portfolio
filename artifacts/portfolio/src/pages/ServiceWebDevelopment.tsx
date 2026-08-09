import React, { useRef } from 'react';
import { Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code2, Database, Globe, Shield, Zap, GitBranch, Server, RefreshCw, Star } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any },
});

const FEATURES = [
  { icon: Code2,     title: 'React & Next.js Apps',       desc: 'Modern SPAs and SSR applications built with TypeScript, Tailwind and best-in-class component architecture.' },
  { icon: Server,    title: 'Node.js & Express APIs',     desc: 'RESTful and GraphQL APIs with Drizzle ORM, PostgreSQL and Redis — built for production scale.' },
  { icon: Database,  title: 'Database Architecture',      desc: 'Schema design, migrations, indexing and query optimisation for PostgreSQL, MySQL and MongoDB.' },
  { icon: Globe,     title: 'Full-Stack Web Apps',        desc: 'End-to-end product development: auth, payments, dashboards, admin panels and user portals.' },
  { icon: Shield,    title: 'Security & Auth',            desc: 'OAuth2, JWT, session management, RBAC and security headers. Your users and data stay protected.' },
  { icon: Zap,       title: 'Performance Optimisation',   desc: 'Code splitting, caching strategies, CDN config and Core Web Vitals tuning for sub-2s LCP.' },
  { icon: GitBranch, title: 'CI/CD & DevOps',             desc: 'GitHub Actions pipelines, Docker containerisation and cloud deployment on AWS, GCP or Vercel.' },
  { icon: RefreshCw, title: 'Legacy Modernisation',       desc: 'Migrating jQuery, PHP or outdated React codebases to a modern, maintainable architecture.' },
];

const PACKAGES = [
  { name: 'Starter App',    price: '$499',  delivery: '10 days', desc: 'React frontend + Node API + PostgreSQL database', popular: false },
  { name: 'Full-Stack App', price: '$1,199',delivery: '21 days', desc: 'Auth, payments, dashboard and admin panel included', popular: true },
  { name: 'SaaS Platform',  price: '$2,499',delivery: '30 days', desc: 'Multi-tenant SaaS with subscriptions and analytics', popular: false },
];

const REVIEWS = [
  { name: 'Ryan O.', stars: 5, text: 'Deverdex rebuilt our entire platform in React/Node. Performance improved 300% and the codebase is finally maintainable.' },
  { name: 'Sophie L.', stars: 5, text: 'Best developers we have worked with. Clean code, great communication and delivered on time every sprint.' },
  { name: 'James P.', stars: 5, text: 'They built our SaaS MVP in 4 weeks. Stripe, auth, dashboards — the lot. Absolutely outstanding.' },
];

export function ServiceWebDevelopment() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div className="w-full bg-[#080E14]">
      <section ref={heroRef} className="pt-28 pb-32 relative overflow-hidden border-b border-white/5 min-h-[80vh] flex items-center">
        <motion.div className="absolute top-0 left-0 w-[700px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.08) 0%,transparent 70%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(255,107,53,0.06) 0%,transparent 70%)' }}
          animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-xs text-[#00DCB9] uppercase tracking-widest mb-10">
            <motion.span className="block h-px bg-[#00DCB9]" initial={{ width: 0 }} animate={{ width: 24 }} transition={{ duration: 0.7, delay: 0.2 }} />
            SIG.09 / WEB DEVELOPMENT
          </motion.div>

          <h1 className="font-bold leading-[1.08] mb-8 max-w-4xl">
            {[
              { text: 'Code that ships', color: 'text-white', delay: 0.1 },
              { text: 'fast', color: 'text-[#00DCB9]', delay: 0.28 },
              { text: '— and scales', color: 'text-white', delay: 0.4 },
              { text: 'without', color: 'text-white', delay: 0.52 },
              { text: 'breaking.', color: 'text-[#FF6B35]', delay: 0.64 },
            ].map((chunk, i) => (
              <motion.span key={i} className={`inline-block text-4xl md:text-6xl lg:text-7xl ${chunk.color}`}
                initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: chunk.delay, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginRight: '0.22em' }}>
                {chunk.text}
              </motion.span>
            ))}
          </h1>

          <motion.div className="h-px bg-gradient-to-r from-[#00DCB9]/50 via-[#00DCB9]/15 to-transparent max-w-2xl mb-8"
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.85 }} />

          <motion.p className="text-lg text-[#8A9BB8] leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.95 }}>
            From MVPs to production SaaS platforms — we write clean,{' '}
            <span className="text-white underline decoration-white/20 underline-offset-2">maintainable code</span>{' '}
            that your team can own long after launch.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.05 }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/get-a-quote" className="inline-flex items-center gap-2 bg-[#00DCB9] text-[#080E14] font-bold px-7 py-3.5 rounded-full hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,220,185,0.4)] transition-all text-sm">
                Get a Quote <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a href="https://www.fiverr.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-full hover:border-white/40 hover:bg-white/5 transition-all text-sm">
                Order on Fiverr
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-28 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: 'linear-gradient(rgba(0,220,185,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,185,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div {...fadeUp(0)} className="mb-4">
            <div className="font-mono text-xs text-[#00DCB9] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" /> WHAT WE DO
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
              <span className="text-white">Full-stack development,</span><br />
              <span className="text-[#00DCB9]">zero </span><span className="text-[#FF6B35]">compromises.</span>
            </h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <motion.div className="h-px bg-gradient-to-r from-[#00DCB9]/40 to-transparent max-w-2xl mb-8" initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }} />
            <p className="text-[#8A9BB8] text-lg leading-relaxed max-w-2xl">React, Node.js, PostgreSQL and everything in between — we build the full stack and hand it over production-ready.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 36, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="group bg-[#0A1220] border border-white/5 rounded-2xl p-6 hover:border-[#00DCB9]/20 hover:shadow-[0_8px_40px_-12px_rgba(0,220,185,0.15)] transition-all duration-300 relative overflow-hidden">
                <motion.div className="absolute bottom-0 left-0 h-0.5 bg-[#00DCB9] rounded-full"
                  initial={{ width: '0%' }} whileInView={{ width: '35%' }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }} />
                <div className="w-9 h-9 rounded-xl bg-[#00DCB9]/10 border border-[#00DCB9]/20 flex items-center justify-center text-[#00DCB9] mb-4 group-hover:scale-110 group-hover:bg-[#00DCB9]/15 transition-all duration-300">
                  <f.icon size={16} />
                </div>
                <h3 className="text-white font-bold text-sm mb-2 leading-snug">{f.title}</h3>
                <p className="text-[#6A7B98] text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-[#06090F] border-b border-white/5 relative overflow-hidden">
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 5, repeat: Infinity }}>
          <div className="w-[700px] h-[500px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.06) 0%,transparent 65%)' }} />
        </motion.div>
        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
          <motion.div {...fadeUp(0)} className="mb-14 text-center">
            <div className="font-mono text-xs text-[#00DCB9] uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" /> PACKAGES <span className="w-5 h-px bg-[#00DCB9]/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Pick your build.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, i) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className={`rounded-2xl border p-8 flex flex-col relative overflow-hidden transition-all duration-300 ${pkg.popular ? 'bg-[#0A1220] border-[#00DCB9]/40 shadow-[0_0_50px_-15px_rgba(0,220,185,0.25)]' : 'bg-[#080E14] border-white/8 hover:border-white/15'}`}>
                {pkg.popular && <div className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-widest text-[#00DCB9] bg-[#00DCB9]/10 border border-[#00DCB9]/20 px-2.5 py-1 rounded-full">Most Popular</div>}
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#5A6B8A] mb-3">{pkg.delivery} delivery</div>
                <div className={`text-3xl font-bold mb-1 ${pkg.popular ? 'text-[#00DCB9]' : 'text-white'}`}>{pkg.price}</div>
                <div className="text-xl font-bold text-white mb-4">{pkg.name}</div>
                <p className="text-[#6A7B98] text-sm leading-relaxed flex-1 mb-8">{pkg.desc}</p>
                <Link href="/get-a-quote" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${pkg.popular ? 'bg-[#00DCB9] text-[#080E14] hover:brightness-110' : 'border border-white/15 text-white hover:border-white/30 hover:bg-white/5'}`}>Get Started</Link>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp(0.3)} className="text-center text-[#5A6B8A] text-sm mt-8">Custom scope welcome — <Link href="/contact" className="text-[#00DCB9] hover:underline">let's talk</Link>.</motion.p>
        </div>
      </section>

      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-12 text-center">
            <div className="font-mono text-xs text-[#00DCB9] uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" /> CLIENT REVIEWS <span className="w-5 h-px bg-[#00DCB9]/50" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Trusted by startups and scale-ups.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div key={r.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-[#0A1220] border border-white/5 rounded-2xl p-7 hover:border-[#00DCB9]/20 transition-colors">
                <div className="flex gap-0.5 mb-4">{Array.from({ length: r.stars }).map((_, s) => <Star key={s} size={14} className="text-[#FF6B35] fill-[#FF6B35]" />)}</div>
                <p className="text-[#8A9BB8] text-sm leading-relaxed mb-5">"{r.text}"</p>
                <div className="font-semibold text-white text-sm">{r.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 relative overflow-hidden">
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}>
          <div className="w-[800px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.07) 0%,transparent 65%)' }} />
        </motion.div>
        <motion.div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10 text-center" {...fadeUp(0)}>
          <div className="font-mono text-xs text-[#00DCB9] uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
            <span className="w-5 h-px bg-[#00DCB9]/50" /> LET'S BUILD <span className="w-5 h-px bg-[#00DCB9]/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Ready to ship<br /><span className="text-[#00DCB9]">your next product?</span></h2>
          <p className="text-[#6A7B98] text-lg mb-10">Tell us what you need — we'll respond within 24 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#00DCB9] text-[#080E14] font-bold px-8 py-4 rounded-full hover:brightness-110 hover:shadow-[0_0_36px_rgba(0,220,185,0.45)] transition-all text-sm uppercase tracking-wide">
                Start a Project <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/services" className="inline-flex items-center gap-2 border border-white/15 text-white font-semibold px-8 py-4 rounded-full hover:border-white/30 hover:bg-white/5 transition-all text-sm">All Services</Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

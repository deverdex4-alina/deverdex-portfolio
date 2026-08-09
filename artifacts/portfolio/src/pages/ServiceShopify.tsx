import React, { useRef } from 'react';
import { Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ShoppingBag, Zap, Search, Shield, Palette,
  BarChart3, RefreshCw, Headphones, Check, Star
} from 'lucide-react';

/* ── word reveal ─────────────────────────────────────────────────── */
function WordReveal({ text, className = '', delay = 0, color = 'text-white' }:
  { text: string; className?: string; delay?: number; color?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          className={`inline-block ${color}`}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginRight: '0.26em' }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any },
});

/* ── data ────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: Palette,    title: 'Custom Shopify 2.0 Themes',    desc: 'Pixel-perfect storefronts built on Shopify 2.0 with sections everywhere, metafields and performance-first architecture.' },
  { icon: Search,     title: 'AEO & Structured Data',        desc: 'Every product page ships with Product, BreadcrumbList and FAQ schema so your store appears in ChatGPT, Perplexity and Google AI Mode.' },
  { icon: Zap,        title: 'Speed & Core Web Vitals',      desc: 'Lazy loading, image optimisation and critical CSS. We target a 90+ Lighthouse score so Google rewards you with rankings.' },
  { icon: ShoppingBag,title: 'Store Setup & Migration',       desc: 'Full store setup from scratch or seamless migration from WooCommerce, Magento or another Shopify account.' },
  { icon: RefreshCw,  title: 'App Integration',              desc: 'Klaviyo, Recharge, Gorgias, Yotpo, Loox — we integrate every app your store needs and configure it for your workflow.' },
  { icon: Shield,     title: 'Ongoing Support & Maintenance', desc: 'Monthly retainers covering backups, app updates, theme tweaks and priority bug fixes. We stay with you after launch.' },
];

const PACKAGES = [
  { name: 'Starter Store',   price: '$299', delivery: '7 days',  desc: 'Theme setup, products & payment gateway',   popular: false },
  { name: 'Custom Build',    price: '$799', delivery: '14 days', desc: 'Fully custom 2.0 theme with AEO schema',    popular: true  },
  { name: 'Enterprise Store',price: '$1,499',delivery: '21 days',desc: 'Headless or multi-currency global store',   popular: false },
];

const REVIEWS = [
  { name: 'Jordan M.', stars: 5, text: 'Deverdex built our Shopify store in under 2 weeks. Sales doubled within the first month.' },
  { name: 'Priya K.',  stars: 5, text: 'Incredible attention to detail. The AEO schema they added got us into Google AI Overviews immediately.' },
  { name: 'Carlos R.', stars: 5, text: "Best Shopify agency we've worked with. Responsive, fast and the final product looked stunning." },
];

/* ── component ───────────────────────────────────────────────────── */
export function ServiceShopify() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY      = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div className="w-full bg-[#080E14]">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="pt-28 pb-32 relative overflow-hidden border-b border-white/5 min-h-[80vh] flex items-center">
        {/* ambient blobs */}
        <motion.div className="absolute top-0 left-0 w-[700px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.08) 0%,transparent 70%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(255,107,53,0.06) 0%,transparent 70%)' }}
          animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
          {/* sig label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-xs text-[#00DCB9] uppercase tracking-widest mb-10"
          >
            <motion.span className="block h-px bg-[#00DCB9]" initial={{ width: 0 }} animate={{ width: 24 }}
              transition={{ duration: 0.7, delay: 0.2 }} />
            SIG.09 / SHOPIFY DEVELOPMENT
          </motion.div>

          {/* headline */}
          <h1 className="font-bold leading-[1.08] mb-8 max-w-3xl">
            <span className="block text-4xl md:text-6xl lg:text-7xl">
              <WordReveal text="Shopify stores customers" delay={0.1} />
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl">
              <WordReveal text="can use" delay={0.3} />
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl mt-1">
              <motion.span className="inline-block text-[#00DCB9]" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}>—</motion.span>
              {' '}
              <motion.span className="inline-block text-[#FF6B35]" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.62 }}>and systems can</motion.span>
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl">
              <motion.span className="inline-block text-[#00DCB9]" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.72 }}>understand.</motion.span>
            </span>
          </h1>

          {/* animated underline */}
          <motion.div className="h-px bg-gradient-to-r from-[#00DCB9]/50 via-[#00DCB9]/15 to-transparent max-w-2xl mb-8"
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.9 }} />

          {/* subtext */}
          <motion.p className="text-lg text-[#8A9BB8] leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }}>
            We design and build{' '}
            <span className="text-white underline decoration-white/20 underline-offset-2 hover:text-[#00DCB9] hover:decoration-[#00DCB9]/60 transition-colors cursor-pointer">
              Shopify 2.0 stores
            </span>{' '}
            with clear product information, crawlable architecture, structured data and strong customer journeys.
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/get-a-quote"
                className="inline-flex items-center gap-2 bg-[#00DCB9] text-[#080E14] font-bold px-7 py-3.5 rounded-full hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,220,185,0.4)] transition-all text-sm">
                Get a Quote <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a href="https://www.fiverr.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-full hover:border-white/40 hover:bg-white/5 transition-all text-sm">
                Order on Fiverr
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────────────── */}
      <section className="py-28 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: 'linear-gradient(rgba(0,220,185,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,185,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div {...fadeUp(0)} className="mb-6">
            <div className="font-mono text-xs text-[#00DCB9] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" /> WHAT WE DO
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
              Everything your Shopify store needs{' '}
              <span className="text-[#00DCB9]">to rank and convert.</span>
            </h2>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <motion.div className="h-px bg-gradient-to-r from-[#00DCB9]/40 to-transparent max-w-2xl mb-8" initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }} />
            <p className="text-[#8A9BB8] text-lg leading-relaxed max-w-2xl">
              From new builds to redesigns and ongoing optimisation — we handle every aspect of Shopify development.
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 36, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="group bg-[#0A1220] border border-white/5 rounded-2xl p-7 hover:border-[#00DCB9]/20 hover:shadow-[0_8px_40px_-12px_rgba(0,220,185,0.15)] transition-all duration-300 relative overflow-hidden"
              >
                {/* accent bar */}
                <motion.div className="absolute bottom-0 left-0 h-0.5 bg-[#00DCB9] rounded-full"
                  initial={{ width: '0%' }} whileInView={{ width: '35%' }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.07 }} />

                <div className="w-10 h-10 rounded-xl bg-[#00DCB9]/10 border border-[#00DCB9]/20 flex items-center justify-center text-[#00DCB9] mb-5 group-hover:scale-110 group-hover:bg-[#00DCB9]/15 transition-all duration-300">
                  <f.icon size={18} />
                </div>
                <h3 className="text-white font-bold text-base mb-2 leading-snug">{f.title}</h3>
                <p className="text-[#6A7B98] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#06090F] border-b border-white/5 relative overflow-hidden">
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 5, repeat: Infinity }}>
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
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className={`rounded-2xl border p-8 flex flex-col relative overflow-hidden ${
                  pkg.popular
                    ? 'bg-[#0A1220] border-[#00DCB9]/40 shadow-[0_0_50px_-15px_rgba(0,220,185,0.25)]'
                    : 'bg-[#080E14] border-white/8 hover:border-white/15'
                } transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-widest text-[#00DCB9] bg-[#00DCB9]/10 border border-[#00DCB9]/20 px-2.5 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#5A6B8A] mb-3">{pkg.delivery} delivery</div>
                <div className={`text-3xl font-bold mb-1 ${pkg.popular ? 'text-[#00DCB9]' : 'text-white'}`}>{pkg.price}</div>
                <div className="text-xl font-bold text-white mb-4">{pkg.name}</div>
                <p className="text-[#6A7B98] text-sm leading-relaxed flex-1 mb-8">{pkg.desc}</p>
                <Link href="/get-a-quote"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    pkg.popular
                      ? 'bg-[#00DCB9] text-[#080E14] hover:brightness-110'
                      : 'border border-white/15 text-white hover:border-white/30 hover:bg-white/5'
                  }`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp(0.3)} className="text-center text-[#5A6B8A] text-sm mt-8">
            Custom projects welcome — <Link href="/contact" className="text-[#00DCB9] hover:underline">let's talk</Link>.
          </motion.p>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-12 text-center">
            <div className="font-mono text-xs text-[#00DCB9] uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <span className="w-5 h-px bg-[#00DCB9]/50" /> CLIENT REVIEWS <span className="w-5 h-px bg-[#00DCB9]/50" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Rated 5 stars by store owners.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0A1220] border border-white/5 rounded-2xl p-7 hover:border-[#00DCB9]/20 transition-colors"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <Star key={s} size={14} className="text-[#FF6B35] fill-[#FF6B35]" />
                  ))}
                </div>
                <p className="text-[#8A9BB8] text-sm leading-relaxed mb-5">"{r.text}"</p>
                <div className="font-semibold text-white text-sm">{r.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}>
          <div className="w-[800px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.07) 0%,transparent 65%)' }} />
        </motion.div>
        <motion.div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10 text-center" {...fadeUp(0)}>
          <div className="font-mono text-xs text-[#00DCB9] uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
            <span className="w-5 h-px bg-[#00DCB9]/50" /> READY TO BUILD <span className="w-5 h-px bg-[#00DCB9]/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Let's build your<br /><span className="text-[#00DCB9]">Shopify store.</span>
          </h2>
          <p className="text-[#6A7B98] text-lg mb-10">
            Tell us what you need. We'll get back to you within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-[#00DCB9] text-[#080E14] font-bold px-8 py-4 rounded-full hover:brightness-110 hover:shadow-[0_0_36px_rgba(0,220,185,0.45)] transition-all text-sm uppercase tracking-wide">
                Start a Project <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/services"
                className="inline-flex items-center gap-2 border border-white/15 text-white font-semibold px-8 py-4 rounded-full hover:border-white/30 hover:bg-white/5 transition-all text-sm">
                All Services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useGetServices } from '@workspace/api-client-react';
import {
  Check, Globe, ShoppingBag, Palette, Code2, Smartphone,
  Brain, Search, Wrench, Zap, LayoutDashboard, ArrowRight
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  globe: Globe,
  'shopping-bag': ShoppingBag,
  palette: Palette,
  code2: Code2,
  code: Code2,
  smartphone: Smartphone,
  brain: Brain,
  search: Search,
  wrench: Wrench,
  zap: Zap,
  dashboard: LayoutDashboard,
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name?.toLowerCase()] ?? Zap;
  return <Icon size={28} className={className} />;
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export function Services() {
  const { data: services } = useGetServices();

  return (
    <div className="w-full">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="pt-28 pb-24 relative overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-dever-teal/8 blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[300px] rounded-full bg-dever-orange/6 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="font-mono text-xs text-dever-teal uppercase tracking-widest">SIG.02 / SERVICES</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-8">
              <span className="block text-white">Every Platform.</span>
              <span className="block text-gradient-teal">Built to Perform.</span>
            </h1>
            <p className="text-xl text-dever-muted leading-relaxed max-w-2xl">
              Whatever you need built, we do it right — fast delivery, beautiful design,
              AI search visibility, and real support after launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Services quick-nav pills ─────────────────────────────── */}
      {services && services.length > 0 && (
        <section className="py-6 bg-[#0A1220] border-y border-white/5 sticky top-[72px] z-20 backdrop-blur-md">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {services.map(s => (
                <a
                  key={s.id}
                  href={`#${s.slug}`}
                  className="shrink-0 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border border-white/10 text-dever-muted hover:border-dever-teal/50 hover:text-white transition-all whitespace-nowrap"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Service sections ─────────────────────────────────────── */}
      <div>
        {services?.map((service, idx) => {
          const isEven = idx % 2 === 0;
          const bg = isEven ? 'bg-[#080E14]' : 'bg-[#0A1220]';

          return (
            <section
              key={service.id}
              id={service.slug}
              className={`${bg} relative overflow-hidden py-24 border-b border-white/5`}
            >
              {/* subtle teal grid overlay on even */}
              {isEven && (
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,220,185,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,185,1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                  }}
                />
              )}
              {/* glow */}
              <div className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-dever-teal/5 blur-[120px] pointer-events-none`} />

              <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                  {...fadeInUp}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
                >
                  {/* ── Info ── */}
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-xl bg-dever-teal/10 border border-dever-teal/20 flex items-center justify-center text-dever-teal">
                        <ServiceIcon name={service.icon} />
                      </div>
                      <span className="font-mono text-xs text-dever-muted uppercase tracking-widest">
                        SIG.02{String.fromCharCode(97 + idx)} / {service.category}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-display font-bold leading-[1.1] mb-6">
                      {service.name.split(' ').slice(0, 1).join(' ')}{' '}
                      <span className="text-dever-teal">
                        {service.name.split(' ').slice(1).join(' ')}
                      </span>
                    </h2>

                    <p className="text-dever-muted leading-relaxed mb-10 text-lg">
                      {service.description}
                    </p>

                    <ul className="space-y-4 mb-10">
                      {service.features.map((feature, fIdx) => (
                        <motion.li
                          key={fIdx}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: fIdx * 0.06 }}
                          className="flex items-start gap-3 text-sm text-white"
                        >
                          <span className="w-5 h-5 rounded-full bg-dever-teal/15 border border-dever-teal/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={11} className="text-dever-teal" />
                          </span>
                          <span className="leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-dever-teal hover:gap-3 transition-all"
                    >
                      Start this project <ArrowRight size={16} />
                    </a>
                  </div>

                  {/* ── Pricing card ── */}
                  <div className={isEven ? '' : 'lg:order-1'}>
                    <div className="bg-[#080E14] border border-[#1A2639] rounded-2xl overflow-hidden shadow-[0_0_60px_-20px_rgba(0,220,185,0.1)]">
                      <div className="bg-[#0D1726] border-b border-[#1A2639] px-8 py-5 flex items-center justify-between">
                        <span className="font-mono text-xs text-dever-teal uppercase tracking-widest">PACKAGES</span>
                        <span className="text-[10px] font-mono text-dever-muted uppercase tracking-wider">Starting price</span>
                      </div>

                      <div className="divide-y divide-[#1A2639]">
                        {service.packages.map((pkg, pIdx) => {
                          const isHighlighted = pIdx === 1;
                          return (
                            <div
                              key={pIdx}
                              className={`flex items-center justify-between px-8 py-7 transition-all group ${
                                isHighlighted
                                  ? 'bg-dever-teal/5 border-l-2 border-dever-teal'
                                  : 'hover:bg-white/3'
                              }`}
                            >
                              <div>
                                <div className="font-mono text-sm text-white uppercase tracking-wider mb-1">
                                  {pkg.name}
                                  {isHighlighted && (
                                    <span className="ml-2 text-[9px] bg-dever-teal/20 text-dever-teal px-2 py-0.5 rounded uppercase tracking-wider">
                                      Popular
                                    </span>
                                  )}
                                </div>
                                {pkg.delivery && (
                                  <div className="text-xs text-dever-muted">{pkg.delivery}</div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className={`font-display font-bold text-xl ${isHighlighted ? 'text-dever-teal' : 'text-white'}`}>
                                  {pkg.price}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-8 border-t border-[#1A2639] bg-[#0D1726]">
                        <a
                          href="/get-a-quote"
                          className="block w-full text-center py-3.5 rounded-xl bg-dever-teal text-[#080E14] font-semibold text-sm hover:brightness-110 transition-all"
                        >
                          Get a Free Quote
                        </a>
                        <p className="text-xs text-dever-muted text-center mt-3">
                          Custom projects welcome — let's talk.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-24 bg-[#0A1220] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[400px] rounded-full bg-dever-teal/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">READY TO START?</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Not sure which service fits?
            </h2>
            <p className="text-dever-muted text-lg mb-10 max-w-xl mx-auto">
              Tell us about your project and we'll recommend the right package — no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 rounded-xl bg-dever-teal text-[#080E14] font-semibold hover:brightness-110 transition-all"
              >
                Start a Project
              </a>
              <a
                href="/get-a-quote"
                className="px-8 py-4 rounded-xl border border-white/15 text-white hover:border-white/30 transition-all"
              >
                Get a Free Quote
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

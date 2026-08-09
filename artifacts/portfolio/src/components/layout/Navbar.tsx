import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Code2, Palette, Smartphone, Search, ShoppingBag, Cpu, Wrench, BarChart3, Bot, Zap } from 'lucide-react';

const SERVICES_ITEMS = [
  { label: 'Shopify Development', href: '/services/shopify', desc: 'Shopify 2.0 stores that rank & convert', icon: ShoppingBag },
  { label: 'WordPress Development', href: '/services/wordpress', desc: 'Elementor, WooCommerce & custom themes', icon: Wrench },
  { label: 'Web Design', href: '/services#web-design', desc: 'Custom, high-converting designs', icon: Palette },
  { label: 'Web Development', href: '/services#web-development', desc: 'Fast, secure & scalable apps', icon: Code2 },
  { label: 'Mobile Apps', href: '/services#mobile-apps', desc: 'Native & cross-platform solutions', icon: Smartphone },
  { label: 'E-Commerce', href: '/services#ecommerce', desc: 'Shopify, WooCommerce & custom', icon: ShoppingBag },
  { label: 'SEO & AEO', href: '/services#seo-aeo', desc: 'AI-first visibility optimization', icon: Search },
  { label: 'AI Solutions', href: '/services#ai', desc: 'AI integrations & automation', icon: Bot },
];

const PRODUCTS_ITEMS = [
  { label: 'Foyer AI Chat', href: '#', desc: 'Conversational agent for your site', icon: Bot },
  { label: 'Analytics Dashboard', href: '#', desc: 'Track your growth metrics', icon: BarChart3 },
  { label: 'AEO Audit Tool', href: '#', desc: 'Check your AI search visibility', icon: Zap },
];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', items: SERVICES_ITEMS, wide: true },
  { label: 'Products', href: '#', items: PRODUCTS_ITEMS, wide: false },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Experiments', href: '/experiments' },
  { label: 'Blog', href: '/blog' },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#080E14]/90 backdrop-blur-xl border-b border-white/8 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 z-50 shrink-0">
          <div className="w-8 h-8 bg-[#00DCB9] rounded-md flex items-center justify-center">
            <span className="text-[#080E14] font-bold text-lg leading-none">D</span>
          </div>
          <span className="font-bold text-[17px] text-white tracking-tight">Deverdex</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.items && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location === link.href
                    ? 'text-white bg-white/5'
                    : 'text-[#8B9CC8] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {link.items && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180 text-[#00DCB9]' : ''}`} />
                )}
              </Link>

              {/* Dropdown Panel */}
              {link.items && (
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#0D1826] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden ${
                        link.wide ? 'w-[520px]' : 'w-72'
                      }`}
                    >
                      {/* Tiny caret */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0D1826] border-l border-t border-white/10 rotate-45 rounded-tl-[2px]" />

                      <div className={`relative z-10 p-3 ${link.wide ? 'grid grid-cols-2 gap-1' : 'flex flex-col gap-1'}`}>
                        {link.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/6 transition-colors group/dd"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 group-hover/dd:border-[#00DCB9]/40 group-hover/dd:bg-[#00DCB9]/10 transition-colors mt-0.5">
                                <Icon className="w-4 h-4 text-[#8B9CC8] group-hover/dd:text-[#00DCB9] transition-colors" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white group-hover/dd:text-[#00DCB9] transition-colors leading-tight">{item.label}</div>
                                <div className="text-xs text-[#5A6B8A] mt-0.5 leading-tight">{item.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {link.wide && (
                        <div className="border-t border-white/6 px-4 py-3 flex items-center justify-between">
                          <span className="text-xs text-[#5A6B8A] font-mono">ALL SERVICES</span>
                          <Link href="/services" className="text-xs text-[#00DCB9] hover:underline font-mono">View all →</Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/get-a-quote" className="text-sm font-semibold text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-full transition-all hover:bg-white/5">
            Get a Quote
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-[#080E14] bg-[#00DCB9] hover:bg-[#00c4a6] px-4 py-2 rounded-full transition-all shadow-[0_0_16px_rgba(0,220,185,0.3)]">
            Start a Project
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="lg:hidden z-50 text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#080E14] pt-20 px-6 pb-8 flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.items ? (
                    <button
                      className="w-full flex items-center justify-between text-left px-3 py-3.5 text-lg font-semibold text-white rounded-xl hover:bg-white/5 transition-colors"
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === link.label ? 'rotate-180 text-[#00DCB9]' : 'text-[#5A6B8A]'}`} />
                    </button>
                  ) : (
                    <Link href={link.href} className="block px-3 py-3.5 text-lg font-semibold text-white rounded-xl hover:bg-white/5 transition-colors">
                      {link.label}
                    </Link>
                  )}
                  {link.items && mobileExpanded === link.label && (
                    <div className="pl-4 pb-2 flex flex-col gap-0.5">
                      {link.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.label} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group/m">
                            <Icon className="w-4 h-4 text-[#5A6B8A] group-hover/m:text-[#00DCB9]" />
                            <span className="text-sm text-[#8B9CC8] group-hover/m:text-white">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-auto pt-8 flex flex-col gap-3">
              <Link href="/get-a-quote" className="text-center font-semibold text-white border border-white/20 px-5 py-3.5 rounded-xl">Get a Quote</Link>
              <Link href="/contact" className="text-center font-semibold text-[#080E14] bg-[#00DCB9] px-5 py-3.5 rounded-xl">Start a Project</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

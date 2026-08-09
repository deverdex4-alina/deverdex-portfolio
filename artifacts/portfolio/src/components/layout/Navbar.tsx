import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { 
    label: 'Services', 
    href: '/services',
    dropdown: [
      { label: 'Web Design', href: '/services#web-design', desc: 'Custom, high-converting designs' },
      { label: 'Web Development', href: '/services#web-dev', desc: 'Fast, secure & scalable apps' },
      { label: 'Mobile Apps', href: '/services#mobile', desc: 'Native & cross-platform solutions' },
      { label: 'SEO & AEO', href: '/services#seo', desc: 'AI-first visibility optimization' },
    ]
  },
  { 
    label: 'Products', 
    href: '/products', // Doesn't exist, we just mock
    dropdown: [
      { label: 'Foyer AI Chat', href: '#', desc: 'Conversational agent for your site' },
      { label: 'Analytics Dashboard', href: '#', desc: 'Track your growth metrics' },
    ]
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Experiments', href: '/experiments' },
  { label: 'Blog', href: '/blog' },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080E14]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50">
          <div className="w-8 h-8 bg-[#00DCB9] rounded flex items-center justify-center">
            <span className="text-[#080E14] font-display font-bold text-xl leading-none">D</span>
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight">Deverdex</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <div 
              key={link.label} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href={link.href}
                className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                  location === link.href ? 'text-white' : 'text-dever-muted hover:text-white'
                }`}
              >
                {link.label}
                {link.dropdown && <ChevronDown className="w-3 h-3 opacity-70" />}
              </Link>
              
              {/* Dropdown */}
              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-dever-elevated border border-white/10 rounded-xl p-2 shadow-2xl"
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-dever-elevated border-t border-l border-white/10 rotate-45" />
                      <div className="relative z-10 flex flex-col">
                        {link.dropdown.map((item) => (
                          <Link 
                            key={item.label} 
                            href={item.href}
                            className="p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                          >
                            <div className="text-sm font-semibold text-white group-hover/item:text-dever-teal transition-colors">{item.label}</div>
                            <div className="text-xs text-dever-muted mt-1">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            href="/get-a-quote" 
            className="text-sm font-semibold text-white border border-white/20 hover:border-white/50 px-5 py-2.5 rounded-full transition-all hover:bg-white/5"
          >
            Get a Quote
          </Link>
          <Link 
            href="/contact" 
            className="text-sm font-semibold text-[#080E14] bg-[#00DCB9] hover:bg-[#00DCB9]/90 px-5 py-2.5 rounded-full transition-all glow-teal-sm"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden z-50 text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#080E14] pt-24 px-6 pb-6 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="flex flex-col gap-2">
                  <Link 
                    href={link.href}
                    className={`text-2xl font-display font-bold ${
                      location === link.href ? 'text-white' : 'text-dever-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 flex flex-col gap-3 mt-2 border-l border-white/10">
                      {link.dropdown.map(item => (
                        <Link 
                          key={item.label}
                          href={item.href}
                          className="text-sm text-dever-muted hover:text-white"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex flex-col gap-4">
              <Link 
                href="/get-a-quote" 
                className="text-center font-semibold text-white border border-white/20 px-5 py-4 rounded-xl"
              >
                Get a Quote
              </Link>
              <Link 
                href="/contact" 
                className="text-center font-semibold text-[#080E14] bg-[#00DCB9] px-5 py-4 rounded-xl"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Monitor, Smartphone, PenTool, LayoutTemplate } from "lucide-react";

const services = [
  {
    title: "Web Design",
    href: "/services/web-design",
    description: "Stunning, high-converting digital experiences.",
    icon: LayoutTemplate,
  },
  {
    title: "Web Development",
    href: "/services/web-development",
    description: "Robust, scalable web applications.",
    icon: Monitor,
  },
  {
    title: "Mobile Apps",
    href: "/services/mobile-apps",
    description: "Native and cross-platform mobile solutions.",
    icon: Smartphone,
  },
  {
    title: "Branding",
    href: "/services/branding",
    description: "Memorable brand identities and systems.",
    icon: PenTool,
  },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // Mobile accordion

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-display font-bold text-background text-lg group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              Deverdex
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <Link href="/services" className={`flex items-center gap-1 text-sm font-medium transition-colors ${location.startsWith("/services") ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                Services <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              
              {/* Mega Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-[500px]">
                <div className="bg-card border border-border rounded-xl p-4 shadow-2xl grid grid-cols-2 gap-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                    >
                      <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center shrink-0 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
                        <service.icon className="w-5 h-5 text-muted-foreground group-hover/item:text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm mb-1">{service.title}</div>
                        <div className="text-xs text-muted-foreground leading-snug">{service.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/work" className={`text-sm font-medium transition-colors ${location === "/work" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              Work
            </Link>
            <Link href="/about" className={`text-sm font-medium transition-colors ${location === "/about" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              About
            </Link>
            <Link href="/contact" className={`text-sm font-medium transition-colors ${location === "/contact" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              Contact
            </Link>
          </div>

          <div className="hidden md:flex">
            <Link href="/contact" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-[40px] font-medium text-sm hover:bg-primary/90 transition-colors shadow-[0_0_20px_-5px_rgba(0,220,185,0.4)] hover:shadow-[0_0_25px_-5px_rgba(0,220,185,0.6)]">
              Start a Project
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/5 p-6 md:hidden h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <div className="border-b border-border pb-4">
                <button 
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full text-lg font-display font-medium text-foreground"
                >
                  Services
                  <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col gap-4 pt-4 pl-4"
                    >
                      {services.map((service) => (
                        <Link key={service.href} href={service.href} className="text-muted-foreground hover:text-primary transition-colors">
                          {service.title}
                        </Link>
                      ))}
                      <Link href="/services" className="text-primary font-medium mt-2">View all services &rarr;</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/work" className="text-lg font-display font-medium text-foreground border-b border-border pb-4">
                Work
              </Link>
              <Link href="/about" className="text-lg font-display font-medium text-foreground border-b border-border pb-4">
                About
              </Link>
              <Link href="/contact" className="text-lg font-display font-medium text-foreground border-b border-border pb-4">
                Contact
              </Link>

              <Link href="/contact" className="bg-primary text-primary-foreground px-6 py-4 rounded-[40px] font-medium text-center mt-4">
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

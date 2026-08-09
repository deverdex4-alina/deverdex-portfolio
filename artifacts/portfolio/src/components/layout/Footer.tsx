import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-[#0A1220] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Decorative bg element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#00DCB9] rounded flex items-center justify-center">
                <span className="text-[#080E14] font-display font-bold text-xl leading-none">D</span>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">Deverdex</span>
            </Link>
            <p className="text-dever-muted text-sm leading-relaxed mb-8 max-w-xs">
              We build digital products that get found. From custom web apps to e-commerce stores — we build for businesses worldwide.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-dever-muted hover:text-white hover:border-white/30 transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-dever-muted hover:text-white hover:border-white/30 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-dever-muted hover:text-white hover:border-white/30 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-display font-semibold mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-sm text-dever-muted hover:text-dever-teal transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-sm text-dever-muted hover:text-dever-teal transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-sm text-dever-muted hover:text-dever-teal transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-dever-muted hover:text-dever-teal transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-display font-semibold mb-6">Services</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/services#web-design" className="text-sm text-dever-muted hover:text-dever-teal transition-colors">Web Design</Link></li>
              <li><Link href="/services#web-development" className="text-sm text-dever-muted hover:text-dever-teal transition-colors">Web Development</Link></li>
              <li><Link href="/services#mobile" className="text-sm text-dever-muted hover:text-dever-teal transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services#seo" className="text-sm text-dever-muted hover:text-dever-teal transition-colors">AEO & SEO</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-display font-semibold mb-6">Stay Updated</h4>
            <p className="text-sm text-dever-muted mb-4">Get the latest insights on tech and design.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-[#080E14] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-dever-teal transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-dever-teal rounded flex items-center justify-center text-[#080E14] hover:bg-dever-teal/90 transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-xs text-dever-muted mb-4 md:mb-0">
            © {new Date().getFullYear()} Deverdex. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-dever-muted hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-dever-muted hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

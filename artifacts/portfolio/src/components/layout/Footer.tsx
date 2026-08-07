import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-display font-bold text-background text-lg">
                D
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                Deverdex
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              We build premium digital products that transform businesses and elevate brands.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-medium text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/web-design" className="text-sm text-muted-foreground hover:text-primary transition-colors">Web Design</Link></li>
              <li><Link href="/services/web-development" className="text-sm text-muted-foreground hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="/services/mobile-apps" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services/branding" className="text-sm text-muted-foreground hover:text-primary transition-colors">Branding</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-medium text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/work" className="text-sm text-muted-foreground hover:text-primary transition-colors">Work</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-medium text-foreground mb-4">Connect</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dribbble</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Deverdex. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

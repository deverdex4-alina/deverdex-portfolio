import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 bg-background">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-card border border-white/10 flex items-center justify-center">
            <span className="font-display font-bold text-xs text-primary">A</span>
          </div>
          <span className="font-display font-medium text-sm text-foreground">
            Alex Rivera
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground font-mono">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground font-mono">
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

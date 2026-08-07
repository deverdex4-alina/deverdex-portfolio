import { motion } from "framer-motion";
import { Link } from "wouter";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md"
      >
        <div className="font-mono text-primary mb-4 text-sm tracking-widest uppercase">Error 404</div>
        <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground mb-6">Lost.</h1>
        <p className="text-lg text-muted-foreground mb-10">
          The page you're looking for has moved into the void. Let's get you back to familiar territory.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-[40px] font-medium hover:bg-primary/90 transition-all card-hover-teal"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}

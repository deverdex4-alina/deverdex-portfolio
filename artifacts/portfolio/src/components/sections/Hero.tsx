import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/components/ui/Section";
import { ArrowRight, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <div className="absolute inset-0 z-0 bg-dot-white opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={fadeUpVariant} className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-primary font-mono text-sm uppercase tracking-widest flex items-center gap-2">
              <Terminal size={14} />
              Full-Stack Engineer
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeUpVariant}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8"
          >
            I build digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              experiences
            </span>
            <br />
            that matter.
          </motion.h1>

          <motion.p 
            variants={fadeUpVariant}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
          >
            Specializing in scalable architecture, precise interfaces, and systems that feel alive. Based in New York, working globally.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center gap-4">
            <a 
              href="#projects" 
              className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              View Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="flex items-center justify-center px-8 py-4 rounded-full font-medium border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-foreground"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent"></div>
      </motion.div>
    </section>
  );
}

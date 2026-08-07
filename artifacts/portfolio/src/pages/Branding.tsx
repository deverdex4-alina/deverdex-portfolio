import { motion } from "framer-motion";
import { Link } from "wouter";
import { PenTool, CheckCircle2 } from "lucide-react";

export function Branding() {
  return (
    <div className="w-full">
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-medium transition-colors">
            &larr; Back to Services
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-8">
              <PenTool className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 tracking-tight">Branding</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We build distinctive brand identities that communicate value, establish authority, and resonate with your audience.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-card/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">More Than a Logo</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your brand is the gut feeling people have about your company. A logo is just the signature; the brand is the entire story.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We craft comprehensive visual systems—typography, color palettes, imagery guidelines, and voice—that ensure consistency across every touchpoint, from your website to your social media.
              </p>
              
              <h3 className="text-xl font-display font-bold text-foreground mb-6 mt-12">Deliverables</h3>
              <ul className="space-y-4">
                {[
                  "Brand Strategy & Positioning",
                  "Logo Design (Primary & Secondary)",
                  "Color Systems & Typography",
                  "Visual Identity Guidelines",
                  "Social Media Assets",
                  "Marketing Collateral"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-secondary/50 border border-white/5 rounded-3xl p-8 lg:p-12">
              <div className="font-mono text-primary mb-8 text-sm tracking-widest uppercase">The Impact</div>
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h4 className="font-display font-bold text-foreground mb-2">Recognition</h4>
                  <p className="text-sm text-muted-foreground">A cohesive system makes your company instantly identifiable.</p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h4 className="font-display font-bold text-foreground mb-2">Trust</h4>
                  <p className="text-sm text-muted-foreground">Premium aesthetics signal quality and reliability to potential customers.</p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h4 className="font-display font-bold text-foreground mb-2">Clarity</h4>
                  <p className="text-sm text-muted-foreground">Clear guidelines empower your team to create on-brand assets quickly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <Link href="/contact" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-[40px] font-medium text-lg hover:bg-primary/90 transition-colors">
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Smartphone, CheckCircle2 } from "lucide-react";

export function MobileApps() {
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
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 tracking-tight">Mobile Apps</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Native-feeling mobile experiences for iOS and Android. We build apps that earn their place on your users' home screens.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-card/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">Pocket-Sized Power</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A great mobile app requires an entirely different approach than the web. Attention spans are shorter, interaction paradigms rely on touch, and performance must be flawless.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We specialize in cross-platform frameworks like React Native and Flutter, allowing us to deploy to both iOS and Android from a single codebase—saving time and budget without compromising on the native feel.
              </p>
              
              <h3 className="text-xl font-display font-bold text-foreground mb-6 mt-12">Our Expertise</h3>
              <ul className="space-y-4">
                {[
                  "iOS & Android Development",
                  "Cross-Platform (React Native)",
                  "Mobile UI/UX Design",
                  "Push Notifications & Real-time Sync",
                  "Offline-first Architecture",
                  "App Store Submission & Launch"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-secondary/50 border border-white/5 rounded-3xl p-8 lg:p-12">
              <div className="font-mono text-primary mb-8 text-sm tracking-widest uppercase">The Process</div>
              <div className="space-y-8">
                {[
                  { step: "01", title: "App Strategy", desc: "Defining core features for MVP." },
                  { step: "02", title: "Prototyping", desc: "Interactive mobile wireframes." },
                  { step: "03", title: "Development", desc: "Sprints with TestFlight builds." },
                  { step: "04", title: "Launch", desc: "Navigating App Store approvals." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== 3 && <div className="absolute left-6 top-10 bottom-[-32px] w-px bg-white/10" />}
                    <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center font-mono text-sm text-primary shrink-0 relative z-10">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-foreground mb-2">{s.title}</h4>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
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

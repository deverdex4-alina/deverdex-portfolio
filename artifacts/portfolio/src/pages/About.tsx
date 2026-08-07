import { motion } from "framer-motion";
import { Link } from "wouter";
import sheerazImg from "@assets/generated_images/sheeraz.jpg";
import alinaImg from "@assets/generated_images/alina.jpg";
import tahiraImg from "@assets/generated_images/tahira.jpg";

export function About() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-8">
              We engineer digital <span className="text-gradient">excellence.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Deverdex is a specialized software agency founded on the belief that exceptional digital products require both world-class design and bulletproof engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 border-y border-white/5 bg-primary">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <p className="text-3xl md:text-5xl font-display font-bold text-primary-foreground leading-tight tracking-tight">
            "Our mission is to build software that not only looks beautiful but performs flawlessly, driving tangible growth for our clients."
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-16 text-center">
            <div className="font-mono text-primary mb-4 text-sm tracking-widest uppercase">Leadership</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Meet the Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Sheeraz Afzal",
                role: "CEO & Co-Founder",
                bio: "Visionary leader with 10+ years in tech entrepreneurship.",
                img: sheerazImg
              },
              {
                name: "Alina",
                role: "CTO & Co-Founder",
                bio: "Full-stack architect obsessed with elegant, scalable systems.",
                img: alinaImg
              },
              {
                name: "Tahira",
                role: "Full Stack Developer",
                bio: "Crafts pixel-perfect frontends and rock-solid backends.",
                img: tahiraImg
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-card border border-border">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-1">{member.name}</h3>
                <div className="text-primary font-mono text-sm mb-4">{member.role}</div>
                <p className="text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Tech Stack */}
      <section className="py-32 border-t border-white/5 bg-card/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">Our Values</h2>
              <div className="space-y-8">
                {[
                  { t: "Innovation", d: "We constantly push boundaries to find better solutions." },
                  { t: "Quality", d: "We don't ship until it meets our rigorous standards." },
                  { t: "Collaboration", d: "We work with you as partners, not just vendors." },
                  { t: "Transparency", d: "Honest communication about timelines, budgets, and challenges." }
                ].map((v, i) => (
                  <div key={i}>
                    <h4 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" /> {v.t}
                    </h4>
                    <p className="text-muted-foreground pl-4">{v.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">Tech Stack</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["React", "Node.js", "TypeScript", "Next.js", "Flutter", "PostgreSQL", "AWS", "Figma", "Tailwind"].map((tech, i) => (
                  <div key={i} className="bg-background border border-border p-4 rounded-xl text-center text-foreground font-medium flex items-center justify-center">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

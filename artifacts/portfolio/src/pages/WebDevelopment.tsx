import { motion } from "framer-motion";
import { Link } from "wouter";
import { Monitor, CheckCircle2 } from "lucide-react";

export function WebDevelopment() {
  return (
    <div className="w-full">
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
        
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
              <Monitor className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 tracking-tight">Web Development</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We build robust, highly-performant web applications using modern tech stacks. Clean code, scalable architecture, secure systems.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-card/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">Engineering Excellence</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our development team doesn't just write code; we engineer solutions. Whether you need a complex SaaS dashboard, a high-traffic marketing site, or a custom internal tool, we have the technical depth to deliver.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We default to modern JavaScript ecosystems (React, Next.js, Node, TypeScript) for maximum performance and developer velocity, ensuring your product is maintainable for years to come.
              </p>
              
              <h3 className="text-xl font-display font-bold text-foreground mb-6 mt-12">Core Capabilities</h3>
              <ul className="space-y-4">
                {[
                  "Frontend Development (React, Vue, Next.js)",
                  "Backend Architecture (Node, Python, Go)",
                  "Database Design (SQL & NoSQL)",
                  "API Development & Integration",
                  "Headless CMS Implementation",
                  "Cloud Infrastructure & DevOps"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-secondary/50 border border-white/5 rounded-3xl p-8 lg:p-12">
              <div className="font-mono text-primary mb-8 text-sm tracking-widest uppercase">The Stack</div>
              <div className="grid grid-cols-2 gap-4">
                {["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "AWS / Vercel", "GraphQL"].map((tech, i) => (
                  <div key={i} className="bg-card border border-border p-4 rounded-xl text-center font-medium text-foreground">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-4xl font-display font-bold text-foreground mb-6">Ready to build?</h2>
          <Link href="/contact" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-[40px] font-medium text-lg hover:bg-primary/90 transition-colors">
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}

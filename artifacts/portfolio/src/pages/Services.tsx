import { motion } from "framer-motion";
import { Link } from "wouter";
import { LayoutTemplate, Monitor, Smartphone, PenTool, ArrowRight, CheckCircle2 } from "lucide-react";

export function Services() {
  const services = [
    {
      id: "web-design",
      title: "Web Design",
      icon: LayoutTemplate,
      desc: "We design stunning, high-converting digital experiences tailored to your brand.",
      features: ["UI/UX Design", "Wireframing & Prototyping", "Design Systems", "Interactive Prototypes"],
      link: "/services/web-design"
    },
    {
      id: "web-development",
      title: "Web Development",
      icon: Monitor,
      desc: "Robust, scalable web applications built with modern frameworks and best practices.",
      features: ["Frontend Development", "Backend Systems", "API Integration", "Performance Optimization"],
      link: "/services/web-development"
    },
    {
      id: "mobile-apps",
      title: "Mobile Apps",
      icon: Smartphone,
      desc: "Native-feeling mobile solutions for iOS and Android that users love to engage with.",
      features: ["React Native / Flutter", "iOS & Android", "App Store Deployment", "Mobile UX Focus"],
      link: "/services/mobile-apps"
    },
    {
      id: "branding",
      title: "Branding",
      icon: PenTool,
      desc: "Memorable brand identities and systems that establish trust and authority.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Marketing Assets"],
      link: "/services/branding"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="font-mono text-primary mb-4 text-sm tracking-widest uppercase">Capabilities</div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 tracking-tight">Our Services</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We offer end-to-end digital product services. From initial strategy and branding through design, development, and launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col gap-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="bg-card border border-border p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-12 group card-hover-teal"
              >
                <div className="md:w-1/3">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-4">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">{service.desc}</p>
                  <Link 
                    href={service.link}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                  >
                    View details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="md:w-2/3 md:border-l md:border-white/5 md:pl-12 flex flex-col justify-center">
                  <h3 className="font-mono text-sm text-muted-foreground uppercase tracking-widest mb-6">What's included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">Not sure what you need?</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Book a discovery call. We'll listen to your goals and suggest the right approach, no pressure.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-[40px] font-medium text-lg hover:bg-primary hover:text-primary-foreground transition-colors">
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}

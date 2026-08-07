import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, LayoutTemplate, Monitor, Smartphone, PenTool, CheckCircle2 } from "lucide-react";
import fintrackImg from "@assets/generated_images/fintrack.jpg";
import luxeImg from "@assets/generated_images/luxe.jpg";
import foodflyImg from "@assets/generated_images/foodfly.jpg";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-dot-white opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div 
            className="max-w-4xl"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Modern Software Agency
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-display font-bold leading-[1.05] tracking-tight mb-8">
              We Build <br className="hidden md:block" />
              <span className="text-gradient">Digital Futures</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
              Deverdex crafts premium websites, web apps, and digital experiences that drive growth and elevate brands.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/work" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-[40px] font-medium text-lg hover:bg-primary/90 transition-colors shadow-[0_0_30px_-5px_rgba(0,220,185,0.4)] hover:shadow-[0_0_40px_-5px_rgba(0,220,185,0.6)]">
                View Our Work
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center border border-border bg-card/50 backdrop-blur text-foreground px-8 py-4 rounded-[40px] font-medium text-lg hover:bg-white/5 hover:border-white/20 transition-all">
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-card/30 backdrop-blur-sm relative z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 py-12">
            <div className="text-center px-4">
              <div className="text-4xl font-display font-bold text-foreground mb-2">50+</div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-display font-bold text-foreground mb-2">30+</div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Happy Clients</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-display font-bold text-foreground mb-2">3</div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Years Excellence</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-display font-bold text-foreground mb-2">100%</div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="font-mono text-primary mb-4 text-sm tracking-widest uppercase">01 // Expertise</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">What We Do</h2>
            </div>
            <Link href="/services" className="text-primary flex items-center gap-2 hover:gap-3 transition-all font-medium">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Web Design", icon: LayoutTemplate, desc: "Bespoke website designs that capture attention and convert visitors.", link: "/services/web-design" },
              { title: "Web Dev", icon: Monitor, desc: "High-performance, accessible, and scalable web applications.", link: "/services/web-development" },
              { title: "Mobile Apps", icon: Smartphone, desc: "Native-feeling cross-platform experiences for iOS and Android.", link: "/services/mobile-apps" },
              { title: "Branding", icon: PenTool, desc: "Strategic brand identities that resonate with your target audience.", link: "/services/branding" }
            ].map((service, i) => (
              <Link key={i} href={service.link} className="block group">
                <div className="bg-card border border-border p-8 rounded-2xl h-full card-hover-teal flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">{service.desc}</p>
                  <div className="mt-auto flex items-center gap-2 text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-32 relative bg-secondary/30 border-y border-white/5">
        <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="font-mono text-primary mb-4 text-sm tracking-widest uppercase">02 // Portfolio</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Selected Work</h2>
            </div>
            <Link href="/work" className="text-primary flex items-center gap-2 hover:gap-3 transition-all font-medium">
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "FinTrack Dashboard", img: fintrackImg, tags: ["Web App", "UI/UX"], year: "2024" },
              { title: "Luxe Realty", img: luxeImg, tags: ["Web Design", "Development"], year: "2024" },
              { title: "FoodFly App", img: foodflyImg, tags: ["Mobile App", "React Native"], year: "2023" }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3] border border-white/10">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <div className="flex gap-2 text-sm font-mono text-muted-foreground">
                      {project.tags.join(" • ")}
                    </div>
                  </div>
                  <div className="text-sm font-mono text-muted-foreground px-3 py-1 bg-secondary rounded-full border border-border">
                    {project.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Deverdex */}
      <section className="py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-16">
            <div className="font-mono text-primary mb-4 text-sm tracking-widest uppercase">03 // Approach</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Why Deverdex</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Custom Solutions", desc: "We don't use templates. Every line of code and pixel is crafted specifically for your unique business goals and audience." },
              { title: "Agile Process", desc: "Transparent, iterative development. You see progress weekly, allowing for course correction and eliminating end-of-project surprises." },
              { title: "Results-Driven", desc: "Beautiful design is useless if it doesn't convert. We build experiences engineered to drive KPIs and business growth." }
            ].map((feature, i) => (
              <div key={i} className="border-l border-primary/30 pl-6 relative">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-primary" />
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="font-mono text-primary mb-4 text-sm tracking-widest uppercase text-center">04 // Words</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground text-center mb-16">Client Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background border border-border p-10 rounded-2xl relative">
              <div className="absolute top-8 right-8 text-6xl text-primary/20 font-serif leading-none">"</div>
              <p className="text-xl text-foreground leading-relaxed mb-8 relative z-10 font-medium">
                Deverdex transformed our outdated platform into a sleek, modern application. The attention to detail and technical expertise they brought to the table was exceptional.
              </p>
              <div>
                <div className="font-display font-bold text-foreground">Sarah Jenkins</div>
                <div className="text-sm font-mono text-muted-foreground">CTO, Nova Financial</div>
              </div>
            </div>
            
            <div className="bg-background border border-border p-10 rounded-2xl relative">
              <div className="absolute top-8 right-8 text-6xl text-primary/20 font-serif leading-none">"</div>
              <p className="text-xl text-foreground leading-relaxed mb-8 relative z-10 font-medium">
                Working with Sheeraz and the team was seamless. They delivered our mobile app ahead of schedule and the user feedback has been overwhelmingly positive.
              </p>
              <div>
                <div className="font-display font-bold text-foreground">Marcus Thorne</div>
                <div className="text-sm font-mono text-muted-foreground">Founder, FoodFly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-dot-white opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-8">
              Ready to Build Something <span className="text-primary italic">Great?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl">
              Let's discuss how we can help you achieve your digital goals. We're currently taking on new projects.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-[40px] font-medium text-lg hover:bg-primary/90 transition-all shadow-[0_0_30px_-5px_rgba(0,220,185,0.4)] hover:shadow-[0_0_40px_-5px_rgba(0,220,185,0.6)] hover:-translate-y-1">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

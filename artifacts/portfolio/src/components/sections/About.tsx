import { motion } from "framer-motion";
import { Section, fadeUpVariant, staggerContainer } from "@/components/ui/Section";
import { Code2, Database, Layout, Server } from "lucide-react";

const capabilities = [
  {
    icon: <Layout className="text-primary" size={24} />,
    title: "Frontend Engineering",
    description: "Creating fluid, responsive, and precise user interfaces using React, Next.js, and modern CSS."
  },
  {
    icon: <Server className="text-primary" size={24} />,
    title: "Backend Architecture",
    description: "Designing robust, scalable APIs and microservices with Node.js, Go, and Python."
  },
  {
    icon: <Database className="text-primary" size={24} />,
    title: "Database Design",
    description: "Optimizing data models and queries across PostgreSQL, Redis, and MongoDB."
  },
  {
    icon: <Code2 className="text-primary" size={24} />,
    title: "Systems Integration",
    description: "Connecting complex third-party services and managing cloud infrastructure on AWS/GCP."
  }
];

export function About() {
  return (
    <Section id="about" className="bg-card/30 border-y border-white/5 relative">
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Bio side */}
          <div>
            <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-5xl font-display font-bold mb-8">
              Engineering with <br/> <span className="text-primary">intent.</span>
            </motion.h2>
            
            <motion.div variants={fadeUpVariant} className="space-y-6 text-muted-foreground text-lg">
              <p>
                I'm a full-stack engineer who believes that the best software is both 
                technically rigorous and beautifully crafted. I don't just write code; 
                I build systems that scale and interfaces that delight.
              </p>
              <p>
                With over 6 years of experience across startups and enterprise environments, 
                I've learned that the difference between good and great lies in the details—
                the millisecond response times, the crisp animations, the resilient error handling.
              </p>
            </motion.div>
          </div>

          {/* Capabilities side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div 
                key={index}
                variants={fadeUpVariant}
                className="bg-card border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {cap.icon}
                </div>
                <h3 className="text-foreground font-display font-semibold mb-3">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

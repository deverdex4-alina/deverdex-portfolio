import { motion } from "framer-motion";
import { Section, fadeUpVariant, staggerContainer } from "@/components/ui/Section";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Alex is that rare engineer who deeply understands both the system architecture and the user experience. They elevated our entire platform.",
    author: "Sarah Jenkins",
    role: "VP of Engineering, Vercel"
  },
  {
    quote: "Working with Alex was a masterclass in clean code and scalable design. They don't just build features, they build foundations.",
    author: "David Chen",
    role: "Product Lead, Stripe"
  }
];

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-card/30 border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {testimonials.map((item, index) => (
            <motion.div 
              key={index} 
              variants={fadeUpVariant}
              className="relative p-8 md:p-10 rounded-2xl bg-card border border-white/5"
            >
              <Quote size={40} className="text-primary/20 absolute top-6 right-8" />
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 relative z-10 font-medium">
                "{item.quote}"
              </p>
              <div>
                <div className="font-display font-semibold text-foreground">{item.author}</div>
                <div className="text-sm font-mono text-muted-foreground mt-1">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

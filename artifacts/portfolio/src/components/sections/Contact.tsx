import { motion } from "framer-motion";
import { Section, fadeUpVariant, staggerContainer } from "@/components/ui/Section";
import { Github, Linkedin, Twitter, Mail, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <Section id="contact" className="relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Left Side: Info */}
          <div>
            <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-6xl font-display font-bold mb-6">
              Let's build <br/> something <span className="text-primary">great.</span>
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-lg text-muted-foreground mb-12 max-w-md">
              I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </motion.p>

            <motion.div variants={fadeUpVariant} className="space-y-6">
              <a href="mailto:hello@alexrivera.dev" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group w-fit">
                <div className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="font-mono">hello@alexrivera.dev</span>
              </a>
              
              <div className="flex items-center gap-4 pt-4">
                <a href="#" className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all hover:-translate-y-1">
                  <Github size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all hover:-translate-y-1">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all hover:-translate-y-1">
                  <Twitter size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div variants={fadeUpVariant} className="bg-card border border-white/5 p-8 md:p-10 rounded-2xl relative overflow-hidden">
            {/* Subtle glow behind form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-mono text-muted-foreground uppercase tracking-wider block">Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-mono text-muted-foreground uppercase tracking-wider block">Email</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-mono text-muted-foreground uppercase tracking-wider block">Message</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || isSubmitted}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-medium transition-all ${
                  isSubmitted 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                ) : isSubmitted ? (
                  "Message Sent Successfully"
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

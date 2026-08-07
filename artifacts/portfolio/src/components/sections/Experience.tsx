import { motion } from "framer-motion";
import { Section, fadeUpVariant, staggerContainer } from "@/components/ui/Section";

const experiences = [
  {
    role: "Senior Full-Stack Engineer",
    company: "Vercel",
    period: "2021 — Present",
    description: "Led the development of core features for the dashboard platform. Improved API response times by 40% through aggressive caching strategies and query optimization. Mentored a team of 4 junior engineers.",
    tech: ["Next.js", "React", "Go", "PostgreSQL", "Redis"]
  },
  {
    role: "Software Engineer",
    company: "Stripe",
    period: "2019 — 2021",
    description: "Built scalable internal tooling for the financial operations team. Designed a reconciliation engine processing millions of transactions daily with zero downtime.",
    tech: ["Ruby", "React", "TypeScript", "AWS", "Kafka"]
  },
  {
    role: "Frontend Developer",
    company: "Acme Digital",
    period: "2017 — 2019",
    description: "Developed performant, accessible web applications for Fortune 500 clients. Specialized in complex animations and state management using Redux.",
    tech: ["JavaScript", "React", "Redux", "SCSS", "Webpack"]
  }
];

export function Experience() {
  return (
    <Section id="experience">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-5xl font-display font-bold mb-4">
            Where I've <span className="text-primary">Worked</span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 block md:hidden"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 mt-1.5 md:mt-0 z-10 hidden md:block"></div>
                <div className="absolute left-6 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-2 block md:hidden z-10 shadow-[0_0_10px_rgba(0,220,185,0.5)]"></div>

                {/* Date */}
                <motion.div variants={fadeUpVariant} className={`w-full md:w-1/2 pl-14 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} md:pt-1`}>
                  <span className="font-mono text-primary text-sm tracking-wider uppercase bg-primary/10 px-4 py-2 rounded-full inline-block mb-2 md:mb-0">
                    {exp.period}
                  </span>
                </motion.div>

                {/* Content */}
                <motion.div variants={fadeUpVariant} className={`w-full md:w-1/2 pl-14 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-2xl font-display font-bold mb-1">{exp.role}</h3>
                  <h4 className="text-xl text-muted-foreground mb-4">{exp.company}</h4>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    {exp.tech.map((tech, tIdx) => (
                      <span key={tIdx} className="text-xs font-mono text-foreground/60 border border-white/10 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

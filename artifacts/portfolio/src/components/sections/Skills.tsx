import { motion } from "framer-motion";
import { Section, fadeUpVariant, staggerContainer } from "@/components/ui/Section";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Vue", "Redux"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "Go", "Express", "GraphQL", "REST APIs", "WebSockets"]
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Prisma", "Drizzle"]
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "AWS", "GCP", "CI/CD", "Terraform", "Nginx"]
  }
];

export function Skills() {
  return (
    <Section id="skills" className="bg-card/30 border-y border-white/5 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-16"
        >
          {/* Header */}
          <div className="lg:col-span-1">
            <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-5xl font-display font-bold mb-6">
              The <br/><span className="text-primary">Toolkit.</span>
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-foreground text-lg mb-8">
              I believe in choosing the right tool for the job. While these are the technologies I reach for most often, I'm always exploring new paradigms.
            </motion.p>
          </div>

          {/* Skills Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
            {skillCategories.map((category, idx) => (
              <motion.div key={idx} variants={fadeUpVariant}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-grow bg-white/10"></div>
                  <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">{category.title}</h3>
                  <div className="h-px flex-grow bg-white/10"></div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-4 py-2 bg-background border border-white/5 rounded-md text-foreground/80 hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

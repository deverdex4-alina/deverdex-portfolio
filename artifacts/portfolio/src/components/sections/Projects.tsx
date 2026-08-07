import { motion } from "framer-motion";
import { Section, fadeUpVariant, staggerContainer } from "@/components/ui/Section";
import { ArrowUpRight, Github } from "lucide-react";

import project1 from "@assets/generated_images/project1.png";
import project2 from "@assets/generated_images/project2.png";
import project3 from "@assets/generated_images/project3.png";
import project4 from "@assets/generated_images/project4.png";

const projects = [
  {
    title: "Neon Dashboard",
    category: "SaaS / Frontend",
    description: "A high-performance serverless Postgres dashboard with real-time query analytics, visual query builder, and predictive resource scaling.",
    tech: ["React", "TypeScript", "Tailwind", "Recharts", "WebSockets"],
    image: project1,
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Aurora Cloud Manager",
    category: "Infrastructure",
    description: "Node-based visual editor for cloud infrastructure topology. Drag-and-drop resources, auto-generate Terraform configurations.",
    tech: ["Next.js", "React Flow", "Go", "Terraform", "PostgreSQL"],
    image: project2,
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Nexus API Gateway",
    category: "Developer Tool",
    description: "Modern API documentation and gateway management interface. Features automated SDK generation and real-time request tracing.",
    tech: ["Vue", "Node.js", "Redis", "OpenAPI", "Docker"],
    image: project3,
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Starlight Workspace",
    category: "Productivity",
    description: "Real-time collaborative workspace combining kanban boards, rich text editing, and presence awareness. Zero-conflict sync.",
    tech: ["React", "Yjs", "Express", "MongoDB", "WebRTC"],
    image: project4,
    liveUrl: "#",
    githubUrl: "#"
  }
];

export function Projects() {
  return (
    <Section id="projects">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-5xl font-display font-bold mb-4">
              Featured Work
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-foreground text-lg max-w-xl">
              A selection of recent projects focusing on complex interfaces and robust systems.
            </motion.p>
          </div>
          <motion.a 
            variants={fadeUpVariant}
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-mono text-primary hover:underline underline-offset-4"
          >
            View GitHub Archive <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className={`flex flex-col gap-8 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
            >
              {/* Image */}
              <motion.div variants={fadeUpVariant} className="w-full md:w-3/5 relative group">
                <div className="absolute -inset-4 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-card aspect-[4/3] md:aspect-auto md:h-[450px]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div variants={fadeUpVariant} className="w-full md:w-2/5 flex flex-col justify-center">
                <span className="text-primary font-mono text-sm mb-4 block">{project.category}</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">{project.title}</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-foreground/80 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a 
                    href={project.liveUrl}
                    className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    View Project <ArrowUpRight size={18} />
                  </a>
                  <a 
                    href={project.githubUrl}
                    className="p-3 rounded-full border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-colors text-foreground"
                    aria-label="View Source"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

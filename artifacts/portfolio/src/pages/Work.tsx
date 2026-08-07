import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import fintrackImg from "@assets/generated_images/fintrack.jpg";
import luxeImg from "@assets/generated_images/luxe.jpg";
import foodflyImg from "@assets/generated_images/foodfly.jpg";
import novaImg from "@assets/generated_images/nova.jpg";
import medicoreImg from "@assets/generated_images/medicore.jpg";
import artspaceImg from "@assets/generated_images/artspace.jpg";

const projects = [
  { id: 1, title: "FinTrack Dashboard", client: "FinTrack Ltd", category: "Web Development", img: fintrackImg, year: "2024", tags: ["React", "Dashboard"] },
  { id: 2, title: "Luxe Realty Website", client: "Luxe Group", category: "Web Design", img: luxeImg, year: "2024", tags: ["UI/UX", "Real Estate"] },
  { id: 3, title: "FoodFly Mobile App", client: "FoodFly", category: "Mobile Apps", img: foodflyImg, year: "2023", tags: ["React Native", "Delivery"] },
  { id: 4, title: "Nova Brand Identity", client: "Nova Tech", category: "Branding", img: novaImg, year: "2023", tags: ["Logo", "Identity System"] },
  { id: 5, title: "MediCore Portal", client: "MediCore Health", category: "Web Development", img: medicoreImg, year: "2024", tags: ["Next.js", "Healthcare"] },
  { id: 6, title: "ArtSpace Gallery Site", client: "ArtSpace", category: "Web Design", img: artspaceImg, year: "2023", tags: ["Portfolio", "Animation"] }
];

const filters = ["All", "Web Design", "Web Development", "Mobile Apps", "Branding"];

export function Work() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="w-full">
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-white opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">Our Work</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A selection of our recent projects. We partner with ambitious brands to create digital products that stand out.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-[40px] text-sm font-medium transition-all ${
                  activeFilter === filter 
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_-3px_rgba(0,220,185,0.4)]" 
                    : "bg-secondary text-foreground hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-6 bg-card border border-border aspect-[4/3]">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="text-sm font-mono text-muted-foreground px-3 py-1 bg-secondary rounded-full border border-border">
                        {project.year}
                      </div>
                    </div>
                    <div className="text-muted-foreground mb-4">Client: {project.client}</div>
                    <div className="flex gap-2 text-sm font-mono text-primary">
                      {project.tags.map(tag => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

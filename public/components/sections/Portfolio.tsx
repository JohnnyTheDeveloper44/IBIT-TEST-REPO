import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Enterprise Network Infrastructure',
    category: 'Network Systems',
    description: 'Complete network setup and infrastructure deployment for a large enterprise client.',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Computer Lab Installation',
    category: 'Hardware Setup',
    description: 'Full computer lab setup with 50+ workstations, networking, and software deployment.',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Business Management System',
    category: 'Custom Software',
    description: 'Custom-built management system for streamlining business operations.',
    image: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Modern e-commerce solution with inventory management and payment integration.',
    image: '/placeholder.svg',
  },
];

export const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Our Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Projects we're{' '}
            <span className="text-gradient">proud of</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of our recent work across various industries and technologies.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-video bg-card">
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-300 ${
                  hoveredId === project.id ? 'opacity-100' : 'opacity-0 md:opacity-100'
                }`}>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-primary text-sm font-medium mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: hoveredId === project.id ? 1 : 0, x: hoveredId === project.id ? 0 : -10 }}
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                    >
                      View Project <ExternalLink size={16} />
                    </motion.button>
                  </div>
                </div>
                
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl gradient-border transition-opacity duration-300 ${
                  hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

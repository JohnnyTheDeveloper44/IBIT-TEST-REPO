import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { EngagementCard } from './EngagementCard';

// Original project images
import project1 from '@/assets/project-1.jpeg';
import project2 from '@/assets/project-2.jpeg';

// New engagement images
import pclMain from '@/assets/engagement-pcl-main.jpeg';
import pcl1 from '@/assets/engagement-pcl-1.jpeg';
import pcl2 from '@/assets/engagement-pcl-2.jpeg';
import pcl3 from '@/assets/engagement-pcl-3.jpeg';
import pcl4 from '@/assets/engagement-pcl-4.jpeg';

import ghana1 from '@/assets/engagement-ghana-1.jpeg';
import ghana2 from '@/assets/engagement-ghana-2.jpeg';
import ghana3 from '@/assets/engagement-ghana-3.jpeg';

import library1 from '@/assets/engagement-library-1.jpeg';
import library2 from '@/assets/engagement-library-2.jpeg';

// Luminous Fund & Liberia Learning Center engagement
import luminous1 from '@/assets/engagement-luminous-1.jpeg';
import luminousVideo1 from '@/assets/engagement-luminous-video-1.mp4';
import luminousVideo2 from '@/assets/engagement-luminous-video-2.mp4';
import liberia1 from '@/assets/engagement-liberia-1.jpeg';
import liberia2 from '@/assets/engagement-liberia-2.jpeg';
import liberia3 from '@/assets/engagement-liberia-3.jpeg';
import liberiaVideo1 from '@/assets/engagement-liberia-video-1.mp4';

// All engagements with layout hints
const engagements = [
  {
    id: 1,
    title: 'Skoolgrind EdTech Competition',
    category: 'Education Technology',
    description: 'We participated in an edtech competition organised by Skoolgrind, where we trained students from two schools to build a prototype app to end extra lessons in school. The app has all the materials students need to learn. The two schools emerged as 1st and 2nd winners.',
    images: [project1],
    stats: { label: 'Winners', value: '1st & 2nd' },
    size: 'normal' as const,
  },
  {
    id: 2,
    title: 'PCL Fintech Workshop',
    category: 'Financial Technology',
    description: 'We want to express our sincere appreciation to the stakeholders from various financial institutions in Sierra Leone, the PCL consultant who led the workshop, and the World Bank and Ministry of Finance for organizing this valuable event. One of our own at IBIT had the privilege of joining as a PCL Associate Consultant. PCL is an international Fintech company working with over 19 companies globally. We participated in this workshop because financial institutions in our country want to integrate technology, especially in database management, and IBIT has expert professionals in this area.',
    images: [pclMain, pcl1, pcl2, pcl3, pcl4],
    stats: { label: 'Institutions', value: '10+' },
    size: 'normal' as const,
  },
  {
    id: 3,
    title: 'Ghana Tech Collaboration',
    category: 'International Partnership',
    description: 'A representative from Innovate Business and Technology recently visited Ghana for professional development and collaboration with African countries in the tech space. We had the opportunity to visit Google and GIZ, where we met with Emmanuel Mumuni, a prominent figure in Ghana\'s digital economy and development landscape. He is currently the Programme Component Manager at the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH in Ghana, leading projects focused on the regional and global digital economy, including initiatives like Fair Forward – Artificial Intelligence for All and the Pan African e-Commerce Initiative (PeCI). He\'s also the Component Manager for the bilateral project Digital Transformation for Sustainable Development (DTEG). We had a productive discussion and collaboration, and he\'s willing to work with us to drive innovation in the tech space. We\'re excited about the potential opportunities ahead!',
    images: [ghana1, ghana2, ghana3],
    stats: { label: 'Partners', value: '3+' },
    size: 'normal' as const,
  },
  {
    id: 4,
    title: 'Library Board Guest Speaker',
    category: 'Knowledge Sharing',
    description: 'Our managing head of Innovate Business and Technology had the opportunity to be a guest speaker at the Sierra Leone Library Board. The topic of her session was "Leveraging Technology as a Tool for Librarians." It was truly awesome sharing knowledge and expertise with them! The session was highly interactive, and she was thrilled to see the librarians\' mindsets shift from traditional methods to a more digitized way of working. Her two key takeaways for them were: "Always add value to yourself" and "Nothing can stop you except yourself." She also left them with the slogan: "Salone we dae change ya ma!" This initiative is bigger than us; it\'s about fighting the good fight of faith to transform our beloved nation.',
    images: [library1, library2],
    stats: { label: 'Librarians', value: '50+' },
    size: 'normal' as const,
  },
  {
    id: 5,
    title: 'Luminous Fund & Liberia EdTech',
    category: 'International EdTech',
    description: 'James, the country manager of Luminous Fund, invited Innovate Business and Tech company to a workshop organised by Luminous Fund, an international company working with over 4 countries to improve education and aid teachers in their educational sector on how to surf the web and do research on their teaching methodology. We were part of the workshop and contributed as a tech company by enlightening them on how to surf the web and how to integrate technology in their teaching methodology. We also went to Liberia Learning Center to collaborate with their ICT manager working with the Canadian government on how to improve EdTech and technology specifically in their country.',
    images: [],
    media: [
      { src: luminous1, type: 'image' as const },
      { src: luminousVideo1, type: 'video' as const },
      { src: luminousVideo2, type: 'video' as const },
      { src: liberia1, type: 'image' as const },
      { src: liberia2, type: 'image' as const },
      { src: liberia3, type: 'image' as const },
      { src: liberiaVideo1, type: 'video' as const },
    ],
    stats: { label: 'Countries', value: '4+' },
    size: 'normal' as const,
  },
];

export const PortfolioEnhanced = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Split into rows for balanced layout: 3 on top, 2 on bottom (centered)
  const topRow = engagements.slice(0, 3);
  const bottomRow = engagements.slice(3, 5);

  return (
    <section 
      id="portfolio" 
      className="py-20 md:py-32 relative overflow-hidden" 
      ref={containerRef}
      style={{ perspective: 2000 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background pointer-events-none" />
      
      {/* Floating background elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4 px-4 py-1 rounded-full bg-primary/10">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Our Engagements &{' '}
            <span className="text-gradient">Collaborations</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our partnerships, collaborations, and initiatives across education, 
            finance, and technology sectors. Each engagement represents our commitment 
            to driving innovation and transformation in Sierra Leone and beyond.
          </p>
        </motion.div>

        {/* Bento-style grid layout */}
        <div className="space-y-6">
          {/* Top row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRow.map((project, index) => (
              <EngagementCard
                key={project.id}
                images={project.images}
                media={'media' in project ? project.media : undefined}
                title={project.title}
                category={project.category}
                description={project.description}
                stats={project.stats}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
          
          {/* Bottom row: 2 cards centered - same size as top row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {bottomRow.map((project, index) => (
              <EngagementCard
                key={project.id}
                images={project.images}
                media={'media' in project ? project.media : undefined}
                title={project.title}
                category={project.category}
                description={project.description}
                stats={project.stats}
                index={index + 3}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

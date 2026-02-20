import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { StatsGrid } from '@/components/ui/animated-counter';

const satisfactionStats = [
  { value: 95, suffix: '%', label: 'Satisfaction Rate' },
  { value: 1000, suffix: '+', label: 'Supported Hours' },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      className="section-padding relative overflow-hidden" 
      ref={ref}
    >
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
          <span className="text-primary font-medium mb-4 block">Our Impact</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Delivering{' '}
            <span className="text-gradient">excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by organizations across Africa, Europe, and beyond
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <StatsGrid stats={satisfactionStats} columns={2} />
        </motion.div>
      </div>
    </section>
  );
};

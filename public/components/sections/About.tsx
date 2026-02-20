import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Shield, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Cutting-edge solutions that keep you ahead of the competition.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Rock-solid systems you can depend on, 24/7.',
  },
  {
    icon: TrendingUp,
    title: 'Scalability',
    description: 'Solutions that grow with your business needs.',
  },
];


export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium mb-4 block">About IBIT</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Building the future of{' '}
              <span className="text-gradient">technology integration</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              IBIT is a premier technology solutions provider dedicated to empowering businesses 
              through innovative digital transformation. We combine deep technical expertise with 
              a client-first approach to deliver solutions that drive real results.
            </p>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              From startups to enterprises, we partner with organizations to streamline operations, 
              enhance customer experiences, and unlock new opportunities through technology.
            </p>
            
            {/* Values */}
            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

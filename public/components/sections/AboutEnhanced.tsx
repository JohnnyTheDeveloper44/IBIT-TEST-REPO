import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Zap, Shield, TrendingUp } from 'lucide-react';
import team1 from '@/assets/team-1.jpeg';
import office1 from '@/assets/office-1.jpeg';
import office2 from '@/assets/office-2.jpeg';

const values = [{
  icon: Zap,
  title: 'Innovation',
  description: 'Cutting-edge solutions that keep you ahead of the competition.'
}, {
  icon: Shield,
  title: 'Reliability',
  description: 'Rock-solid systems you can depend on, 24/7.'
}, {
  icon: TrendingUp,
  title: 'Scalability',
  description: 'Solutions that grow with your business needs.'
}];


// Advanced 3D Card Component with cursor tracking
const Card3D = ({ children, className, intensity = 15 }: { 
  children: React.ReactNode; 
  className?: string;
  intensity?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const z = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const zSpring = useSpring(z, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -intensity;
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    z.set(50);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        z: zSpring,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40 blur-xl"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
};

// Professional Image Card with hover effects
const ImageCard = ({ 
  src, 
  alt, 
  className,
  delay = 0,
  size = 'md'
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const sizeClasses = {
    sm: 'h-32 md:h-40',
    md: 'h-40 md:h-52',
    lg: 'h-52 md:h-72'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative group overflow-hidden rounded-2xl ${className}`}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"
      />
      
      {/* Image container */}
      <div className={`relative overflow-hidden rounded-2xl border border-border/20 ${sizeClasses[size]}`}>
        <img 
          src={src} 
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />
      </div>
    </motion.div>
  );
};

// 3D Value Card
const Value3DCard = ({ value, index, isInView }: { 
  value: typeof values[0]; 
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          z: isHovered ? 30 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
          animate={{
            opacity: isHovered ? 1 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating icon */}
        <motion.div
          animate={{
            y: isHovered ? -8 : 0,
            rotateZ: isHovered ? 10 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 mx-auto sm:mx-0 relative z-10"
          style={{ transformStyle: 'preserve-3d', translateZ: 20 }}
        >
          <value.icon className="w-7 h-7 text-primary" />
          
          {/* Icon glow */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary/30 blur-lg"
            animate={{ opacity: isHovered ? 0.8 : 0, scale: isHovered ? 1.3 : 1 }}
          />
        </motion.div>
        
        <motion.h3 
          className="font-bold text-lg mb-2 text-center sm:text-left relative z-10"
          style={{ translateZ: 15 }}
        >
          {value.title}
        </motion.h3>
        <motion.p 
          className="text-sm text-muted-foreground text-center sm:text-left relative z-10"
          style={{ translateZ: 10 }}
        >
          {value.description}
        </motion.p>
        
        {/* Corner decorations */}
        <motion.div
          className="absolute -top-1 -right-1 w-16 h-16 bg-primary/20 rounded-full blur-2xl"
          animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.6 : 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};


export const AboutEnhanced = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateSection = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);
  const scaleSection = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section 
      id="about" 
      className="section-padding relative overflow-hidden bg-transparent" 
      ref={containerRef}
      style={{ perspective: 2000 }}
    >
      {/* Advanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />
      
      {/* Floating grid pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74, 222, 128, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 222, 128, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          y: parallaxY,
        }}
      />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <motion.div 
        className="container mx-auto relative z-10" 
        ref={ref}
        style={{
          rotateX: rotateSection,
          scale: scaleSection,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -80, rotateY: -10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, type: "spring" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.span 
              className="text-primary font-semibold mb-4 block text-sm tracking-wider uppercase"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              About Innovate Bitech
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Building the future of{' '}
              <span className="text-gradient">technology integration</span>
            </motion.h2>
            
            <motion.p 
              className="text-muted-foreground text-lg mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              We are an innovative technology company providing integrated digital solutions across AI, software development, website creation, hardware engineering, networking, cybersecurity, database systems, graphic design, phone repair, ATM maintenance, and EdTech.
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              Beyond technology services, we are committed to teaching, mentoring, and empowering students and professionals with practical, real-world skills to succeed in the global tech industry.
            </motion.p>
            
            
            {/* 3D Values */}
            <div className="grid sm:grid-cols-3 gap-4">
              {values.map((value, index) => (
                <Value3DCard
                  key={value.title}
                  value={value}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Right content - Professional Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="relative"
          >
            {/* Asymmetric image grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Large featured image */}
              <div className="col-span-2">
                <ImageCard
                  src={office1}
                  alt="Innovate Bitech Computer Lab"
                  size="lg"
                  delay={0.2}
                />
              </div>
              
              {/* Two smaller images */}
              <ImageCard
                src={team1}
                alt="Innovate Bitech Team"
                size="md"
                delay={0.3}
              />
              <ImageCard
                src={office2}
                alt="Innovate Bitech Office"
                size="md"
                delay={0.4}
              />
            </div>
            
            {/* Enhanced decorative elements */}
            <motion.div 
              className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

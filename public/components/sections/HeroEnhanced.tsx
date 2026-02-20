import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronDown, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';

const TypingHeadline = ({ resetKey }: { resetKey: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const fullText = 'Advanced Digital Solutions';

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    let currentIndex = 0;
    
    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        const delay = 80 + Math.random() * 40;
        setTimeout(typeNextChar, delay);
      } else {
        setIsComplete(true);
      }
    };

    const timeout = setTimeout(typeNextChar, 800);
    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 530);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [resetKey]);

  return (
    <span className="relative inline-block">
      <span className="text-gradient relative">
        {displayText}
        <span
          className={`inline-block w-[3px] h-[0.9em] bg-primary ml-0.5 align-middle rounded-sm ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          style={{ verticalAlign: 'text-bottom' }}
        />
      </span>
      
      <motion.span
        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: isComplete ? "100%" : "0%" }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
    </span>
  );
};

export const HeroEnhanced = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroInViewRef = useRef<HTMLDivElement>(null);
  const [typingResetKey, setTypingResetKey] = useState(0);
  
  // Detect when hero section comes into view
  const isInView = useInView(heroInViewRef, { amount: 0.5 });
  
  // Reset typing animation when hero comes back into view
  useEffect(() => {
    if (isInView) {
      setTypingResetKey(prev => prev + 1);
    }
  }, [isInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Floating particles effect - reduced for performance
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] flex items-start justify-center overflow-hidden bg-transparent"
    >
      {/* Invisible element to detect when hero is in view */}
      <div ref={heroInViewRef} className="absolute top-1/3 left-0 w-full h-32 pointer-events-none" />
      {/* Static subtle gradient accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-[60px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-10 pointer-events-none" />
      
      {/* Content */}
      <motion.div 
        style={{ opacity, y, scale }}
        className="container mx-auto px-6 relative z-20 pt-[18vh] sticky top-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Animated logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              className="relative"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50" />
            </motion.div>
          </motion.div>
          
          {/* Badge with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 backdrop-blur-sm"
          >
            <motion.span 
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-primary flex items-center gap-2">
              <Sparkles size={14} />
              IBIT – Technology Integration Experts
            </span>
          </motion.div>
          
          {/* Headline with typing animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              We build{' '}
            </motion.span>
            <TypingHeadline resetKey={typingResetKey} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {' '}for modern businesses
            </motion.span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            IBIT (Innovate Bitech) transforms your ideas into powerful technology. 
            From custom software to complete business automation, we drive growth.
          </motion.p>
          
          {/* CTAs with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                size="lg"
                className="relative bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 text-lg px-8 overflow-hidden group"
                style={{
                  boxShadow: '0 0 30px hsl(187 100% 50% / 0.4), 0 0 60px hsl(187 100% 50% / 0.2)'
                }}
              >
                <a href="#contact" className="flex items-center gap-2">
                  <Zap size={18} />
                  Get a Free Consultation
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{ translateX: ['100%', '-100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/50 hover:bg-primary/10 text-lg px-8 backdrop-blur-sm hover:border-primary transition-all duration-300"
              >
                <a href="#services">Explore Services</a>
              </Button>
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
      
      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-sm group-hover:text-primary transition-colors">Scroll to explore</span>
          <motion.div
            className="relative"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className="group-hover:text-primary transition-colors" />
            <motion.div
              className="absolute inset-0 blur-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={24} className="text-primary" />
            </motion.div>
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
};

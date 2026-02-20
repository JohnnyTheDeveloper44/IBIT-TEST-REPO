import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, ChevronUp, ChevronDown } from 'lucide-react';

export const ScrollButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      
      // Calculate scroll progress (0 to 1)
      setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
      
      // Show scroll-to-top after scrolling down 400px
      setShowScrollTop(scrollTop > 400);
      
      // Hide scroll-to-bottom when near the bottom
      setShowScrollBottom(scrollTop < scrollHeight - clientHeight - 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth' 
    });
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.5, x: -20 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.5, x: -20 },
    hover: { 
      scale: 1.1,
      boxShadow: '0 0 25px hsl(187 100% 50% / 0.5), 0 0 50px hsl(187 100% 50% / 0.3)',
    },
    tap: { scale: 0.95 }
  };

  const arrowVariants = {
    animate: (direction: 'up' | 'down') => ({
      y: direction === 'up' ? [-2, 2, -2] : [2, -2, 2],
    }),
  };

  return (
    <div className="fixed left-4 sm:left-6 bottom-4 sm:bottom-6 z-40 flex flex-col gap-3">
      {/* Scroll Progress Ring */}
      <motion.div
        className="relative w-11 h-11 sm:w-12 sm:h-12"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Progress ring background */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="hsl(187 100% 50% / 0.2)"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={2 * Math.PI * 45 * (1 - scrollProgress)}
            style={{ transformOrigin: 'center' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(187 100% 50%)" />
              <stop offset="100%" stopColor="hsl(151 100% 50%)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Progress percentage */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary"
          animate={{ 
            color: scrollProgress > 0.5 ? 'hsl(151 100% 50%)' : 'hsl(187 100% 50%)' 
          }}
        >
          {Math.round(scrollProgress * 100)}%
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToTop}
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-card/90 backdrop-blur-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors overflow-hidden group"
            style={{
              boxShadow: '0 0 15px hsl(187 100% 50% / 0.2), 0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
            aria-label="Scroll to top"
          >
            {/* Gradient background on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            
            {/* Animated arrow */}
            <motion.div
              variants={arrowVariants}
              animate="animate"
              custom="up"
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <ChevronUp size={20} className="stroke-[2.5]" />
            </motion.div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                boxShadow: [
                  'inset 0 0 10px hsl(187 100% 50% / 0.1)',
                  'inset 0 0 20px hsl(187 100% 50% / 0.2)',
                  'inset 0 0 10px hsl(187 100% 50% / 0.1)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Scroll to Bottom Button */}
      <AnimatePresence>
        {showScrollBottom && (
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToBottom}
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-card/90 backdrop-blur-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-secondary transition-colors overflow-hidden group"
            style={{
              boxShadow: '0 0 15px hsl(151 100% 50% / 0.2), 0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
            aria-label="Scroll to bottom"
          >
            {/* Gradient background on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            
            {/* Animated arrow */}
            <motion.div
              variants={arrowVariants}
              animate="animate"
              custom="down"
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <ChevronDown size={20} className="stroke-[2.5]" />
            </motion.div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                boxShadow: [
                  'inset 0 0 10px hsl(151 100% 50% / 0.1)',
                  'inset 0 0 20px hsl(151 100% 50% / 0.2)',
                  'inset 0 0 10px hsl(151 100% 50% / 0.1)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

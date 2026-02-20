import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  labelClassName?: string;
  label?: string;
}

export const AnimatedCounter = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  labelClassName = '',
  label
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000
  });

  const display = useTransform(spring, (current) => {
    return Math.floor(current);
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, spring, hasAnimated]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [display]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient whitespace-nowrap ${className}`}>
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      {label && (
        <div className={`text-muted-foreground mt-2 text-sm md:text-base ${labelClassName}`}>
          {label}
        </div>
      )}
    </motion.div>
  );
};

// Stats Section Component for reuse
interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export const StatsGrid = ({ stats, className = '', columns = 4 }: StatsGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`glass-card p-8 md:p-12 rounded-2xl border border-border/30 backdrop-blur-xl ${className}`}
    >
      <div className={`grid ${gridCols[columns]} gap-8 md:gap-12`}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={2 + index * 0.3}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

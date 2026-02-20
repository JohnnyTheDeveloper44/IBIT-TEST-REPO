import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ibitLogo from '@/assets/ibit-logo.jpeg';

const navItems = [
  { label: 'About IBIT', href: '#about' },
  { label: 'IBIT Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Team', href: '#team' },
  { label: 'Contact IBIT', href: '#contact' },
];

export const NavbarEnhanced = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with enhanced animation */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            className="relative w-10 h-10 rounded-full overflow-hidden"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <img 
              src={ibitLogo} 
              alt="Innovate Bitech" 
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            {/* Glow ring */}
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-50 blur-sm transition-opacity -z-10"
            />
          </motion.div>
          <div className="flex flex-col">
            <motion.span 
              className="text-xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              IBIT
            </motion.span>
            {/* 24/7 Support badge */}
            <span className="text-[10px] text-primary/80 font-medium flex items-center gap-1">
              <Headphones size={10} />
              24/7 Support
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with active indicators */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                activeSection === item.href.replace('#', '')
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
              {/* Active indicator */}
              {activeSection === item.href.replace('#', '') && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {/* Hover underline */}
              <motion.span 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-1/2"
                whileHover={{ width: '50%' }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA Button with enhanced style */}
        <div className="hidden md:block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              className="relative bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 overflow-hidden group"
              style={{
                boxShadow: '0 0 20px hsl(187 100% 50% / 0.3)'
              }}
            >
              <a href="#contact" className="flex items-center gap-2">
                <Sparkles size={16} />
                Get Started
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button with animation */}
        <motion.button
          className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Menu with enhanced animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`py-3 px-4 rounded-lg transition-all ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const targetId = item.href.replace('#', '');
                    const element = document.getElementById(targetId);
                    if (element) {
                      setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 300);
                    }
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground w-full mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById('contact');
                    if (element) {
                      setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 300);
                    }
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

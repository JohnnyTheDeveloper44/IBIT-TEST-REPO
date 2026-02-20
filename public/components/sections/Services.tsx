import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Globe, Code, Server, Briefcase, X, 
  Monitor, Cloud, Camera, Shield, Database,
  Wrench, Building, TrendingUp, BookOpen,
  GraduationCap, Users, Cog, FileText, Sparkles
} from 'lucide-react';

interface Subcategory {
  icon: typeof Globe;
  title: string;
  description: string;
}

interface ServiceCategory {
  id: string;
  icon: typeof Globe;
  title: string;
  description: string;
  color: string;
  glowColor: string;
  subcategories: Subcategory[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'software',
    icon: Code,
    title: 'Software & Digital Solutions',
    description: 'Complete software development and digital transformation services',
    color: 'from-cyan-500 via-blue-500 to-indigo-500',
    glowColor: 'hsl(200 100% 50%)',
    subcategories: [
      { icon: Globe, title: 'Website Development & Hosting', description: 'Professional websites with reliable hosting services' },
      { icon: Code, title: 'Software Development', description: 'Custom software tailored to your business needs' },
      { icon: Monitor, title: 'Desktop Publishing', description: 'Professional document design and publishing' },
      { icon: Database, title: 'Database Development', description: 'Custom database design and implementation' },
      { icon: Building, title: 'Hotel Management Software', description: 'Specialized hospitality industry solutions' },
      { icon: Monitor, title: 'Phone & Laptop Software', description: 'Mobile and desktop application development' },
      { icon: TrendingUp, title: 'Data Mining & Data Analysis', description: 'Advanced analytics and business intelligence' },
    ],
  },
  {
    id: 'infrastructure',
    icon: Server,
    title: 'IT Infrastructure & Networking',
    description: 'Hardware, networking, and infrastructure solutions',
    color: 'from-emerald-500 via-teal-500 to-cyan-500',
    glowColor: 'hsl(160 100% 40%)',
    subcategories: [
      { icon: Globe, title: 'Computer Networking', description: 'Network design, installation, and maintenance' },
      { icon: Server, title: 'Server Implementation & Repairs', description: 'Complete server setup and maintenance' },
      { icon: Cloud, title: 'Cloud Computing', description: 'Scalable cloud solutions for your business' },
      { icon: Camera, title: 'CCTV Installation', description: 'Security camera systems and monitoring' },
      { icon: Wrench, title: 'ATM Repair Services', description: 'Specialized ATM maintenance and repairs' },
      { icon: Monitor, title: 'Phone & Laptop Hardware', description: 'Hardware repair and maintenance services' },
    ],
  },
  {
    id: 'security',
    icon: Shield,
    title: 'IT Support, Security & Systems',
    description: 'Comprehensive security and system management',
    color: 'from-rose-500 via-red-500 to-orange-500',
    glowColor: 'hsl(350 100% 50%)',
    subcategories: [
      { icon: Monitor, title: 'IT Support', description: 'Comprehensive technical support services' },
      { icon: Shield, title: 'Cybersecurity', description: 'Advanced protection for your digital assets' },
      { icon: FileText, title: 'System Analysis', description: 'In-depth system optimization and analysis' },
      { icon: Cog, title: 'IT Project Management', description: 'End-to-end technology project management' },
      { icon: Shield, title: 'Security Management', description: 'Comprehensive security risk assessment' },
      { icon: Users, title: 'Policies Development', description: 'IT governance and policy frameworks' },
    ],
  },
  {
    id: 'consulting',
    icon: Briefcase,
    title: 'Business, Consulting & Training',
    description: 'Strategic consulting and professional development',
    color: 'from-violet-500 via-purple-500 to-fuchsia-500',
    glowColor: 'hsl(270 100% 60%)',
    subcategories: [
      { icon: Briefcase, title: 'IT & Business Consultancy', description: 'Expert guidance on technology decisions' },
      { icon: TrendingUp, title: 'Business & Account Audit', description: 'Thorough financial and business auditing' },
      { icon: Sparkles, title: 'Digital Marketing', description: 'Strategic marketing to grow your brand' },
      { icon: GraduationCap, title: 'IT Training', description: 'Professional training programs' },
      { icon: Users, title: 'Business Startup Mentorship', description: 'Guidance for entrepreneurs and startups' },
      { icon: BookOpen, title: 'EdTech', description: 'Educational technology solutions' },
    ],
  },
];

// Subcategory Card Component
const SubcategoryCard = ({ 
  subcategory, 
  index, 
  categoryColor,
  totalItems 
}: { 
  subcategory: Subcategory; 
  index: number; 
  categoryColor: string;
  totalItems: number;
}) => {
  // Calculate position in a 3D orbital arrangement
  const angle = (index / totalItems) * Math.PI * 2;
  const radius = 180;
  const depth = Math.sin(angle * 2) * 50;
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0,
        x: Math.cos(angle) * radius * 2,
        y: Math.sin(angle) * radius,
        rotateY: -30,
        z: -200
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: 0,
        y: 0,
        rotateY: 0,
        z: depth
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.5,
        x: Math.cos(angle) * -radius,
        y: Math.sin(angle) * -radius,
        transition: { duration: 0.3, delay: index * 0.03 }
      }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: index * 0.08
      }}
      whileHover={{ 
        scale: 1.05, 
        z: depth + 30,
        transition: { duration: 0.2 }
      }}
      className="relative group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative p-6 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px -5px ${subcategory.icon === Shield ? 'hsl(350 100% 50% / 0.3)' : 'hsl(187 100% 50% / 0.3)'}`,
        }}
      >
        {/* Gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />
        
        {/* Floating particles inside card */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              initial={{ x: '50%', y: '50%' }}
              animate={{
                x: ['50%', `${30 + Math.random() * 40}%`, '50%'],
                y: ['50%', `${30 + Math.random() * 40}%`, '50%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        {/* Icon */}
        <motion.div
          className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${categoryColor} flex items-center justify-center mb-4`}
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <subcategory.icon className="w-7 h-7 text-white" />
          <motion.div
            className="absolute inset-0 rounded-xl bg-white/30"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        {/* Content */}
        <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {subcategory.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {subcategory.description}
        </p>
        
        {/* Corner glow effect */}
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
          style={{
            background: `radial-gradient(circle, hsl(187 100% 50% / 0.3), transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Category Card Component
const CategoryCard = ({ 
  category, 
  index, 
  isActive,
  onClick,
  isAnyActive
}: { 
  category: ServiceCategory; 
  index: number; 
  isActive: boolean;
  onClick: () => void;
  isAnyActive: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      onClick={onClick}
      className={`relative cursor-pointer group ${isAnyActive && !isActive ? 'pointer-events-none' : ''}`}
    >
      <motion.div
        className={`relative p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 overflow-hidden transition-all duration-500 ${
          isActive ? 'ring-2 ring-primary' : 'hover:border-primary/50'
        }`}
        whileHover={!isAnyActive ? { y: -8, scale: 1.02 } : {}}
        animate={isAnyActive && !isActive ? { opacity: 0.3, scale: 0.95 } : { opacity: 1, scale: 1 }}
        style={{
          boxShadow: isActive 
            ? `0 30px 60px -20px rgba(0,0,0,0.5), 0 0 40px -10px ${category.glowColor}`
            : '0 10px 40px -20px rgba(0,0,0,0.3)'
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
        />
        
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            border: `2px solid ${category.glowColor}`,
            opacity: 0,
          }}
          animate={isActive ? {
            opacity: [0, 0.5, 0],
            scale: [1, 1.05, 1.1],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Icon with 3D effect */}
        <motion.div
          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 overflow-hidden`}
          whileHover={{ rotateY: 15, rotateX: -10 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <category.icon className="w-10 h-10 text-white relative z-10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/20"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
          {category.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {category.description}
        </p>
        
        {/* Subcategory count indicator */}
        <div className="flex items-center gap-2 text-sm text-primary">
          <span>{category.subcategories.length} services</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-4 right-4 w-24 h-24 rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${category.glowColor}, transparent 70%)` }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

// Expanded Category View
const ExpandedCategory = ({ 
  category, 
  onClose 
}: { 
  category: ServiceCategory; 
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ perspective: '2000px' }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]`}
          style={{ background: `radial-gradient(circle, ${category.glowColor}, transparent 70%)` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Orbital rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
            style={{
              width: `${200 + ring * 150}px`,
              height: `${200 + ring * 150}px`,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 0.5, 
              rotate: ring % 2 === 0 ? 360 : -360 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: ring * 0.1,
              rotate: { duration: 20 + ring * 10, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </div>
      
      {/* Content container */}
      <motion.div
        initial={{ scale: 0.8, y: 50, rotateX: -20 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.8, y: 50, rotateX: -20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between mb-8 p-4 bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50">
          <div className="flex items-center gap-4">
            <motion.div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <category.icon className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h2 
                className="text-3xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {category.title}
              </motion.h2>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {category.description}
              </motion.p>
            </div>
          </div>
          
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="p-3 rounded-full bg-card/80 border border-border/50 hover:bg-destructive/20 hover:border-destructive/50 transition-all duration-300 group"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6 group-hover:text-destructive transition-colors" />
          </motion.button>
        </div>
        
        {/* Subcategories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {category.subcategories.map((subcategory, index) => (
            <SubcategoryCard
              key={subcategory.title}
              subcategory={subcategory}
              index={index}
              categoryColor={category.color}
              totalItems={category.subcategories.length}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleClose = () => {
    setActiveCategory(null);
  };

  const activeCategoryData = serviceCategories.find(c => c.id === activeCategory);

  return (
    <>
      <section id="services" className="section-padding relative overflow-hidden" ref={ref}>
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-[100px]"
            animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-secondary/5 blur-[100px]"
            animate={{ x: [0, -50, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span 
              className="inline-block text-primary font-medium mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
              whileHover={{ scale: 1.05 }}
            >
              Our Services
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Explore our{' '}
              <span className="text-gradient relative">
                service categories
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Click on any category to discover our comprehensive range of specialized services.
            </p>
          </motion.div>

          {/* Categories grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            layout
          >
            {serviceCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                isActive={activeCategory === category.id}
                onClick={() => handleCategoryClick(category.id)}
                isAnyActive={activeCategory !== null}
              />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Need a custom solution? Let's discuss your project.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group"
              whileHover={{ x: 5 }}
            >
              Get in touch
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Expanded category overlay */}
      <AnimatePresence>
        {activeCategoryData && (
          <ExpandedCategory
            category={activeCategoryData}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};

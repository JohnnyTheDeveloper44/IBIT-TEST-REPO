import { NavbarEnhanced } from '@/components/sections/NavbarEnhanced';
import { HeroEnhanced } from '@/components/sections/HeroEnhanced';
import { AboutEnhanced } from '@/components/sections/AboutEnhanced';
import { Services } from '@/components/sections/Services';
import { IBITInAction } from '@/components/sections/IBITInAction';
import { PortfolioEnhanced } from '@/components/sections/PortfolioEnhanced';
import { TeamEnhanced } from '@/components/sections/TeamEnhanced';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { ScrollButtons } from '@/components/ScrollButtons';
import { PersistentContactIcons } from '@/components/PersistentContactIcons';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Lightweight CSS background */}
      <div className="fixed inset-0 bg-background z-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, hsl(187 100% 50% / 0.1) 0%, transparent 40%),
              radial-gradient(circle at 70% 80%, hsl(160 100% 50% / 0.08) 0%, transparent 40%)
            `
          }}
        />
      </div>
      
      {/* Content layers */}
      <div className="relative z-10">
        <NavbarEnhanced />
        <HeroEnhanced />
        <AboutEnhanced />
        <Services />
        <IBITInAction />
        <PortfolioEnhanced />
        <TeamEnhanced />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
      
      <ScrollButtons />
      <PersistentContactIcons />
      <ChatWidget />
    </div>
  );
};

export default Index;

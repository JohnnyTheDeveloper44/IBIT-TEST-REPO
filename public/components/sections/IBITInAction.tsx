import { useRef, useEffect, useState, useCallback, Suspense, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { SpineSkeleton } from '@/components/3d/SpineSkeleton';
import { OrbitalImage } from '@/components/3d/OrbitalImage';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import action images
import actionRoof1 from '@/assets/action-roof-1.jpeg';
import actionRoof2 from '@/assets/action-roof-2.jpeg';
import actionServer1 from '@/assets/action-server-1.jpeg';
import actionNetwork from '@/assets/action-network.jpeg';
import actionLab from '@/assets/action-lab.jpeg';
import actionServerRack from '@/assets/action-server-rack.jpeg';
import actionProfessional from '@/assets/action-professional.jpeg';

interface Scene {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  type: 'image' | 'video';
  category: string;
}

const scenes: Scene[] = [
  { id: '1', title: 'Rooftop Installation', subtitle: 'Network antenna deployment', src: actionRoof1, type: 'image', category: 'INSTALLATION' },
  { id: '2', title: 'Field Operations', subtitle: 'Expert on-site work', src: actionRoof2, type: 'image', category: 'FIELDWORK' },
  { id: '3', title: 'Server Configuration', subtitle: 'Enterprise infrastructure', src: actionServer1, type: 'image', category: 'DATA CENTER' },
  { id: '4', title: 'Network Infrastructure', subtitle: 'High-speed connectivity', src: actionNetwork, type: 'image', category: 'NETWORKING' },
  { id: '5', title: 'Watch Us Work', subtitle: 'See our team in action', src: '/videos/ibit-action.mp4', type: 'video', category: 'VIDEO' },
  { id: '6', title: 'Server Operations', subtitle: 'Hands-on expertise', src: actionServerRack, type: 'image', category: 'INFRASTRUCTURE' },
  { id: '7', title: 'Lab Deployment', subtitle: 'Complete computer labs', src: actionLab, type: 'image', category: 'LABS' },
  { id: '8', title: 'Professional Team', subtitle: 'Technology leaders', src: actionProfessional, type: 'image', category: 'TEAM' },
];

// Lightweight CSS-based particles for low-performance devices
const LightweightParticles = memo(function LightweightParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
});

// Fallback grid view for low-performance devices
const FallbackGridView = memo(function FallbackGridView({ 
  progress, 
  scenes 
}: { 
  progress: number; 
  scenes: Scene[] 
}) {
  const visibleScenes = scenes.filter((_, i) => {
    const sceneProgress = progress * scenes.length;
    return i <= Math.ceil(sceneProgress);
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-6xl mx-auto">
      {visibleScenes.map((scene, index) => (
        <div 
          key={scene.id}
          className="relative aspect-video rounded-xl overflow-hidden group"
          style={{
            opacity: Math.min(1, (progress * scenes.length - index) * 2),
            transform: `translateY(${Math.max(0, 20 - (progress * scenes.length - index) * 20)}px)`,
            transition: 'opacity 0.3s, transform 0.3s',
          }}
        >
          {scene.type === 'video' ? (
            <video
              src={scene.src}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              poster={actionRoof1}
            />
          ) : (
            <OptimizedImage
              src={scene.src}
              alt={scene.title}
              className="w-full h-full object-cover"
              wrapperClassName="w-full h-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <span className="text-xs text-primary font-semibold">{scene.category}</span>
            <h4 className="text-sm font-bold text-white truncate">{scene.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
});

// Progress indicator - responsive
const ProgressIndicator = memo(function ProgressIndicator({ 
  progress, 
  scenes,
  isMobile,
}: { 
  progress: number; 
  scenes: Scene[];
  isMobile: boolean;
}) {
  const contentStart = 0.15;
  const contentEnd = 0.85;
  const contentRange = contentEnd - contentStart;
  
  const normalizedProgress = Math.max(0, Math.min(1, 
    (progress - contentStart) / contentRange
  ));
  
  const activeIndex = Math.floor(normalizedProgress * scenes.length);
  const indicatorOpacity = progress > 0.12 && progress < 0.88 ? 1 : 0;

  return (
    <div 
      className={`absolute top-1/2 -translate-y-1/2 flex flex-col z-50 ${
        isMobile ? 'right-3 gap-1.5' : 'right-8 gap-2.5'
      }`}
      style={{ opacity: indicatorOpacity, transition: 'opacity 0.4s' }}
    >
      {scenes.map((scene, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;
        
        return (
          <div
            key={scene.id}
            className="relative flex items-center gap-2"
          >
            <div
              className={`rounded-full transition-all duration-300 ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}
              style={{
                backgroundColor: isActive 
                  ? 'hsl(187, 100%, 50%)' 
                  : isPast 
                    ? 'hsl(187, 100%, 40%)' 
                    : 'hsl(0, 0%, 40%)',
                transform: isActive ? 'scale(1.5)' : 'scale(1)',
                boxShadow: isActive ? '0 0 15px hsl(187, 100%, 50%)' : 'none',
              }}
            />
            {!isMobile && (
              <span 
                className="text-xs font-medium tracking-wide transition-all duration-300 whitespace-nowrap"
                style={{
                  color: isActive ? 'hsl(187, 100%, 50%)' : 'hsl(0, 0%, 50%)',
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                {scene.category}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
});

// 3D Scene with spine and orbital images - only on capable devices
const Scene3D = memo(function Scene3D({ 
  scrollProgress, 
  mousePosition,
  isMobile,
}: { 
  scrollProgress: number; 
  mousePosition: { x: number; y: number };
  isMobile: boolean;
}) {
  // Limit visible orbital images for performance
  const visibleScenes = isMobile ? scenes.slice(0, 4) : scenes.slice(0, 6);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <SpineSkeleton 
        scrollProgress={scrollProgress} 
        mousePosition={mousePosition} 
      />
      
      {visibleScenes.map((scene, index) => (
        <OrbitalImage
          key={scene.id}
          scene={scene}
          index={index}
          totalScenes={visibleScenes.length}
          scrollProgress={scrollProgress}
          mousePosition={mousePosition}
          isMobile={isMobile}
        />
      ))}
    </>
  );
});

// Main Component
export const IBITInAction = memo(function IBITInAction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isNearViewport, setIsNearViewport] = useState(false);
  const isMobile = useIsMobile();
  const performance = useDevicePerformance();

  // Mouse tracking - throttled
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (performance.tier === 'low') return; // Skip on low-perf devices
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, [performance.tier]);

  // IntersectionObserver to defer 3D mounting
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Title animation
  const titleOpacity = progress < 0.03 
    ? progress / 0.03 
    : progress < 0.12
      ? 1 
      : progress < 0.18
        ? 1 - (progress - 0.12) / 0.06
        : 0;

  const titleScale = 1 + progress * 0.15;

  // Camera settings
  const cameraZ = isMobile ? 7 : 5.5;
  const cameraFov = isMobile ? 60 : 55;

  // Determine if we should use 3D or fallback
  const use3D = isNearViewport && performance.canRender3D && performance.tier !== 'low';

  return (
    <section 
      ref={sectionRef} 
      id="action" 
      className="relative"
    >
      <div 
        ref={pinRef}
        className="h-screen w-full overflow-hidden bg-background"
        onMouseMove={handleMouseMove}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-background via-background to-black/95" />
        
        {/* Lightweight CSS particles for low-perf, or nothing for performance */}
        {performance.tier === 'low' && <LightweightParticles />}

        {/* 3D Canvas OR Fallback Grid */}
        {use3D ? (
          <div className="absolute inset-0" style={{ zIndex: 10 }}>
            <Canvas
              camera={{ position: [0, 0, cameraZ], fov: cameraFov }}
              style={{ background: 'transparent' }}
              gl={{ 
                alpha: true, 
                antialias: performance.tier === 'high',
                powerPreference: 'high-performance',
              }}
              dpr={performance.tier === 'high' ? [1, 1.5] : [1, 1]}
              frameloop={performance.tier === 'high' ? 'always' : 'demand'}
            >
              <Suspense fallback={null}>
                <Scene3D 
                  scrollProgress={progress} 
                  mousePosition={mousePosition}
                  isMobile={isMobile}
                />
              </Suspense>
            </Canvas>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
            <FallbackGridView progress={progress} scenes={scenes} />
          </div>
        )}

        {/* Title Overlay */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-none px-4"
          style={{ 
            opacity: titleOpacity,
            transform: `translate(-50%, -50%) scale(${titleScale})`,
          }}
        >
          <h2 className={`font-bold text-foreground mb-4 tracking-tight ${
            isMobile ? 'text-3xl' : 'text-5xl md:text-7xl lg:text-8xl'
          }`}>
            IBIT IN ACTION
          </h2>
          <p className={`text-muted-foreground ${
            isMobile ? 'text-sm tracking-[0.2em]' : 'text-lg md:text-xl tracking-[0.3em]'
          }`}>
            SCROLL TO EXPLORE
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator progress={progress} scenes={scenes} isMobile={isMobile} />

        {/* Scroll indicator at bottom */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50"
          style={{ 
            opacity: progress < 0.08 ? 1 - progress / 0.08 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
          <span className="text-xs text-muted-foreground tracking-[0.2em]">SCROLL</span>
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/20 z-50">
          <div 
            className="h-full bg-primary transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
});

import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Play } from 'lucide-react';
import { FullscreenVideoModal } from '@/components/media/FullscreenVideoModal';

interface MediaItem {
  src: string;
  type: 'image' | 'video';
}

interface EngagementCardProps {
  images: string[];
  media?: MediaItem[];
  title: string;
  category: string;
  description: string;
  stats?: { label: string; value: string };
  index: number;
  isInView: boolean;
  isLarge?: boolean;
}

export const EngagementCard = ({
  images,
  media,
  title,
  category,
  description,
  stats,
  index,
  isInView,
  isLarge = false,
}: EngagementCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isMobile = useIsMobile();
  
  // Use media array if provided, otherwise convert images to media items
  const mediaItems: MediaItem[] = media || images.map(img => ({ src: img, type: 'image' as const }));
  
  // Marquee animation speed (pixels per second) - calm and professional
  const speed = 30;
  
  // Uniform image dimensions for all cards
  const imageWidth = 140;
  const imageHeight = 96;
  const gap = 8;
  const totalImageWidth = imageWidth + gap;
  
  // Total width of all items (we duplicate for seamless loop)
  const totalWidth = mediaItems.length * totalImageWidth;

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    if (!isPaused && mediaItems.length > 1) {
      setOffset((prev) => {
        const newOffset = prev + (speed * deltaTime) / 1000;
        // Reset when we've scrolled one full set
        return newOffset >= totalWidth ? 0 : newOffset;
      });
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, mediaItems.length, totalWidth, speed]);

  useEffect(() => {
    if (mediaItems.length > 1) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, mediaItems.length]);

  // Handle touch interactions for mobile
  const handleTouchStart = () => {
    if (isMobile) setIsPaused(true);
  };

  const handleTouchEnd = () => {
    if (isMobile && !activeVideo) setIsPaused(false);
  };

  const handleVideoClick = (src: string) => {
    setActiveVideo(src);
    setIsPaused(true);
  };

  const closeVideoPlayer = () => {
    setActiveVideo(null);
    setIsPaused(false);
  };

  // Truncate description for preview - uniform for all cards
  const maxLength = 120;
  const truncatedDescription = description.length > maxLength 
    ? description.substring(0, maxLength) + '...' 
    : description;

  // Uniform container height for all cards
  const containerHeight = 'h-28';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 120,
        }}
        className="relative group h-full"
      >
        {/* Static 3D box effect - left edge */}
        <div 
          className="absolute -left-2 top-2 bottom-0 w-2 bg-gradient-to-l from-primary/60 to-primary/30 rounded-l-md pointer-events-none" 
          style={{ transform: 'skewY(45deg)', transformOrigin: 'top left' }} 
        />
        {/* Static 3D box effect - bottom edge */}
        <div 
          className="absolute left-0 -bottom-2 right-2 h-2 bg-gradient-to-b from-primary/60 to-primary/30 rounded-b-md pointer-events-none"
          style={{ transform: 'skewX(45deg)', transformOrigin: 'bottom left' }} 
        />
        
        {/* Main card */}
        <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors duration-300 h-full flex flex-col shadow-lg shadow-black/20">
          {/* Marquee Image Container */}
          <div 
            className={`${containerHeight} relative overflow-hidden flex-shrink-0 cursor-pointer`}
            onMouseEnter={() => !isMobile && setIsPaused(true)}
            onMouseLeave={() => !isMobile && !activeVideo && setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {mediaItems.length === 1 ? (
              // Single item - no marquee
              mediaItems[0].type === 'video' ? (
                <div 
                  className="relative w-full h-full group/video cursor-pointer"
                  onClick={() => handleVideoClick(mediaItems[0].src)}
                >
                  <video
                    src={mediaItems[0].src}
                    className="w-full h-full object-cover bg-black/20"
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover/video:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30">
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={mediaItems[0].src}
                  alt={title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              // Marquee animation for multiple items
              <div className="absolute inset-0 flex items-center">
                <div 
                  className="flex gap-2"
                  style={{ 
                    transform: `translateX(-${offset}px)`,
                    willChange: 'transform',
                  }}
                >
                  {/* Duplicate items for seamless loop */}
                  {[...mediaItems, ...mediaItems].map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex-shrink-0 rounded-lg overflow-hidden shadow-md relative group/item cursor-pointer"
                      style={{ width: imageWidth, height: imageHeight }}
                      onClick={item.type === 'video' ? () => handleVideoClick(item.src) : undefined}
                    >
                      {item.type === 'video' ? (
                        <>
                          <video
                            src={item.src}
                            className="w-full h-full object-cover bg-black/40"
                            muted
                            loop
                            playsInline
                            preload="auto"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover/item:bg-black/60 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform group-hover/item:scale-110 transition-transform">
                              <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <img
                          src={item.src}
                          alt={`${title} - ${(itemIndex % mediaItems.length) + 1}`}
                          loading="eager"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Subtle fade edges for smooth appearance */}
            {mediaItems.length > 1 && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none z-10" />
              </>
            )}
            
            {/* Pause indicator */}
            {isPaused && mediaItems.length > 1 && !activeVideo && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 z-20">
                <span className="text-[10px] text-muted-foreground">Paused</span>
              </div>
            )}
            
            {/* Stats badge */}
            {stats && (
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 z-20">
                <span className="text-xs font-bold text-primary">{stats.value}</span>
                <span className="text-[10px] text-muted-foreground ml-1">{stats.label}</span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-3 flex flex-col flex-grow">
            <span className="inline-block text-primary text-[10px] font-semibold tracking-wider uppercase mb-1">
              {category}
            </span>
            
            <h3 className="text-sm font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            
            <div className="flex-grow min-h-0">
              <p className="text-muted-foreground text-xs leading-relaxed">
                {isExpanded ? description : truncatedDescription}
              </p>
            </div>
            
            {/* Read More / Show Less button */}
            {description.length > maxLength && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-xs font-medium text-primary hover:text-secondary transition-colors text-left"
              >
                {isExpanded ? '← Show Less' : 'Read More →'}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <FullscreenVideoModal
        open={!!activeVideo}
        src={activeVideo}
        title={title}
        category={category}
        isMuted={isMuted}
        onToggleMuted={() => setIsMuted(!isMuted)}
        onClose={closeVideoPlayer}
      />
    </>
  );
};

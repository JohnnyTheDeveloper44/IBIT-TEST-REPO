import { useRef, useState, useEffect, memo } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Scene {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  type: 'image' | 'video';
  category: string;
}

interface OrbitalImageProps {
  scene: Scene;
  index: number;
  totalScenes: number;
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  isMobile: boolean;
}

export const OrbitalImage = memo(function OrbitalImage({
  scene,
  index,
  totalScenes,
  scrollProgress,
  mousePosition,
  isMobile,
}: OrbitalImageProps) {
  const groupRef = useRef<THREE.Group>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Content phase: images are visible from 10% to 92%
  const contentStart = 0.10;
  const contentEnd = 0.92;
  const contentRange = contentEnd - contentStart;
  
  const normalizedProgress = Math.max(0, Math.min(1, 
    (scrollProgress - contentStart) / contentRange
  ));

  // Orbit calculations
  const orbitRadius = isMobile ? 1.8 : 2.4;
  const indexOffset = (index / totalScenes);
  const rotationProgress = normalizedProgress * 1.2 + indexOffset;
  const angle = rotationProgress * Math.PI * 2;
  
  const x = Math.sin(angle) * orbitRadius;
  const z = Math.cos(angle) * orbitRadius * 0.75;
  const y = Math.sin(angle * 0.5 + index * 0.4) * 1.2;
  
  const isInFront = z > -0.3;
  const frontness = Math.max(0, Math.min(1, (z + orbitRadius * 0.3) / (orbitRadius * 1.1)));
  
  // Scale
  const minScale = isMobile ? 0.22 : 0.28;
  const maxScale = isMobile ? 0.35 : 0.42;
  const currentScale = minScale + frontness * (maxScale - minScale);
  
  // Visibility
  const baseVisibility = scrollProgress >= 0.08 && scrollProgress <= 0.94 ? 1 : 0;
  const visibility = baseVisibility * (0.4 + frontness * 0.6);

  // Video handling
  useEffect(() => {
    if (scene.type === 'video' && videoRef.current) {
      if (isHovered && isInFront && frontness > 0.5) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, isInFront, frontness, scene.type]);

  // Simplified animation - no per-frame complex calculations
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  });

  // Don't render if not visible
  if (visibility < 0.1) return null;

  const glowIntensity = frontness > 0.3 ? frontness : 0;
  const isActive = frontness > 0.5;
  const cardWidth = isMobile ? 200 : 260;
  const cardHeight = isMobile ? 130 : 165;

  return (
    <group ref={groupRef}>
      <Html
        transform
        occlude={false}
        scale={currentScale}
        sprite
        style={{
          opacity: visibility,
          transition: 'opacity 0.3s ease-out',
          pointerEvents: isInFront && frontness > 0.3 ? 'auto' : 'none',
        }}
        center
      >
        <div
          className="relative rounded-xl overflow-hidden cursor-pointer select-none"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            boxShadow: isActive
              ? `0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 ${40 * glowIntensity}px hsl(187 100% 50% / ${0.4 * glowIntensity})`
              : '0 10px 25px -8px rgba(0, 0, 0, 0.6)',
            transform: `scale(${isHovered && isActive ? 1.02 : 1})`,
            transition: 'transform 0.3s ease-out, box-shadow 0.2s ease-out',
            border: `1px solid hsl(187 100% 50% / ${0.3 + glowIntensity * 0.4})`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Media content */}
          {scene.type === 'video' ? (
            <div className="relative w-full h-full bg-black">
              <video
                ref={videoRef}
                src={scene.src}
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300"
                style={{ opacity: isHovered && isActive ? 0 : 1 }}
              >
                <div 
                  className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/50"
                >
                  <div 
                    className="w-0 h-0 ml-1 border-l-[12px] border-y-[7px] border-l-white border-y-transparent"
                  />
                </div>
              </div>
            </div>
          ) : (
            <img
              src={scene.src}
              alt={scene.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              draggable={false}
              onLoad={() => setImageLoaded(true)}
            />
          )}

          {/* Category badge */}
          <div 
            className="absolute top-2 left-2 px-2 py-0.5 bg-primary/90 rounded-full"
            style={{ opacity: Math.max(0.6, frontness) }}
          >
            <span 
              className="font-bold tracking-wider text-black uppercase"
              style={{ fontSize: isMobile ? '8px' : '10px' }}
            >
              {scene.category}
            </span>
          </div>

          {/* Info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
            <h4 
              className="font-bold text-white truncate"
              style={{ fontSize: isMobile ? '12px' : '15px' }}
            >
              {scene.title}
            </h4>
            <p 
              className="text-white/70 truncate"
              style={{ fontSize: isMobile ? '10px' : '12px' }}
            >
              {scene.subtitle}
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
});

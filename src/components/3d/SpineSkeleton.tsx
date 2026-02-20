import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpineSkeletonProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}

// Simplified vertebra - reduced geometry complexity
const Vertebra = memo(function Vertebra({ 
  position, 
  scale = 1, 
  visibility = 1,
  type = 'thoracic',
}: { 
  position: [number, number, number]; 
  scale?: number;
  visibility?: number;
  type?: 'cervical' | 'thoracic' | 'lumbar';
}) {
  const bodyWidth = type === 'lumbar' ? 0.18 : type === 'cervical' ? 0.10 : 0.14;
  const bodyHeight = type === 'lumbar' ? 0.11 : type === 'cervical' ? 0.06 : 0.09;
  
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#00d4ff'),
    emissive: new THREE.Color('#00d4ff'),
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: visibility * 0.9,
    metalness: 0.4,
    roughness: 0.35,
  }), [visibility]);

  return (
    <group position={position} scale={scale}>
      {/* Simplified vertebral body only */}
      <mesh>
        <cylinderGeometry args={[bodyWidth, bodyWidth * 1.1, bodyHeight, 8]} />
        <primitive object={material} />
      </mesh>
    </group>
  );
});

// Simplified disc
const Disc = memo(function Disc({ 
  position, 
  scale = 1,
  visibility = 1 
}: { 
  position: [number, number, number]; 
  scale?: number;
  visibility?: number;
}) {
  return (
    <mesh position={position} scale={[scale, scale, scale]}>
      <cylinderGeometry args={[0.12, 0.12, 0.035, 8]} />
      <meshStandardMaterial 
        color="#00e5aa" 
        emissive="#00e5aa" 
        emissiveIntensity={0.3}
        transparent
        opacity={visibility * 0.7}
        metalness={0.15}
        roughness={0.55}
      />
    </mesh>
  );
});

export const SpineSkeleton = memo(function SpineSkeleton({ scrollProgress, mousePosition }: SpineSkeletonProps) {
  const groupRef = useRef<THREE.Group>(null);
  const spineRef = useRef<THREE.Group>(null);
  
  // Visibility: fade in 0-10%, visible 10-90%, fade out 90-100%
  const visibility = scrollProgress < 0.10 
    ? scrollProgress / 0.10 
    : scrollProgress > 0.90 
      ? (1 - scrollProgress) / 0.10 
      : 1;

  const spineRotation = scrollProgress * Math.PI * 0.5;

  // REDUCED vertebrae count for performance (from 30 to 15)
  const vertebraeData = useMemo(() => {
    const vertebrae: { 
      position: [number, number, number]; 
      scale: number; 
      type: 'cervical' | 'thoracic' | 'lumbar';
    }[] = [];
    
    const totalVertebrae = 15; // Reduced from 30
    const spacing = 0.45;
    
    for (let i = 0; i < totalVertebrae; i++) {
      const y = 3.0 - i * spacing;
      const normalizedI = i / totalVertebrae;
      
      let type: 'cervical' | 'thoracic' | 'lumbar' = 'thoracic';
      let scale = 1;
      
      if (normalizedI < 0.25) {
        type = 'cervical';
        scale = 0.6 + normalizedI * 1.6;
      } else if (normalizedI < 0.75) {
        type = 'thoracic';
        scale = 0.8 + (normalizedI - 0.25) * 0.6;
      } else {
        type = 'lumbar';
        scale = 1.0 + (normalizedI - 0.75) * 0.8;
      }
      
      vertebrae.push({
        position: [0, y, 0] as [number, number, number],
        scale,
        type,
      });
    }
    
    return vertebrae;
  }, []);

  // Simplified animation
  useFrame(() => {
    if (!groupRef.current) return;
    
    const targetRotationY = (mousePosition.x - 0.5) * 0.3 + spineRotation;
    groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.03;
  });

  if (visibility < 0.01) return null;

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 3, 2.5]} intensity={0.9} color="#00d4ff" distance={7} />
      <pointLight position={[0, -3, 2.5]} intensity={0.7} color="#00ffaa" distance={7} />
      
      <group ref={spineRef}>
        {/* Vertebrae */}
        {vertebraeData.map((data, i) => (
          <Vertebra 
            key={`vertebra-${i}`}
            position={data.position}
            scale={data.scale}
            visibility={visibility}
            type={data.type}
          />
        ))}
        
        {/* Discs - every other for performance */}
        {vertebraeData.filter((_, i) => i % 2 === 0).slice(0, -1).map((data, i) => {
          const nextData = vertebraeData[i * 2 + 2] || vertebraeData[vertebraeData.length - 1];
          const discY = (data.position[1] + nextData.position[1]) / 2;
          
          return (
            <Disc 
              key={`disc-${i}`}
              position={[0, discY, 0]}
              scale={(data.scale + nextData.scale) / 2}
              visibility={visibility}
            />
          );
        })}
        
        {/* Spinal cord */}
        <mesh position={[0, 0, -0.10]}>
          <cylinderGeometry args={[0.028, 0.024, 6, 8]} />
          <meshBasicMaterial 
            color="#00ffcc" 
            transparent 
            opacity={visibility * 0.5}
          />
        </mesh>
      </group>
    </group>
  );
});

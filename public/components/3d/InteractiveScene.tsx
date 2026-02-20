import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PerformanceTier } from '@/hooks/useDevicePerformance';

interface InteractiveSceneProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  performanceTier?: PerformanceTier;
}

// Simplified metallic ring - reduced geometry complexity
const MetallicRing = ({ scrollProgress, mousePosition, isHighPerf }: InteractiveSceneProps & { isHighPerf: boolean }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (ringRef.current) {
      ringRef.current.rotation.x = (mousePosition.y - 0.5) * 0.5 + Math.sin(t * 0.2) * 0.1;
      ringRef.current.rotation.y = (mousePosition.x - 0.5) * 0.5 + t * 0.15;
      ringRef.current.rotation.z = scrollProgress * Math.PI * 2;
      
      const scale = 1 + scrollProgress * 0.3;
      ringRef.current.scale.setScalar(scale);
    }
    
    if (innerRingRef.current && isHighPerf) {
      innerRingRef.current.rotation.x = -t * 0.1 + (mousePosition.y - 0.5) * 0.3;
      innerRingRef.current.rotation.y = t * 0.2 + (mousePosition.x - 0.5) * 0.3;
    }
  });
  
  // Reduced geometry segments for performance
  const segments = isHighPerf ? 64 : 32;
  
  return (
    <group position={[0, 0, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.08, 16, segments]} />
        <meshStandardMaterial
          color="#4ECDC4"
          metalness={0.95}
          roughness={0.1}
          emissive="#00D9FF"
          emissiveIntensity={0.15}
        />
      </mesh>
      
      {/* Only render inner ring on high-perf devices */}
      {isHighPerf && (
        <mesh ref={innerRingRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, segments]} />
          <meshStandardMaterial
            color="#00FF88"
            metalness={0.9}
            roughness={0.15}
            emissive="#00FF88"
            emissiveIntensity={0.1}
          />
        </mesh>
      )}
    </group>
  );
};

// Simplified central globe
const CentralGlobe = ({ scrollProgress, mousePosition, isHighPerf }: InteractiveSceneProps & { isHighPerf: boolean }) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.1;
      globeRef.current.rotation.x = (mousePosition.y - 0.5) * 0.2;
    }
    
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.08;
      wireframeRef.current.rotation.x = t * 0.05;
    }
  });
  
  const sphereSegments = isHighPerf ? 32 : 16;
  
  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[0.8, sphereSegments, sphereSegments]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.2}
          emissive="#00D9FF"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[0.85, 12, 12]} />
        <meshBasicMaterial
          color="#00D9FF"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

// Reduced particle count for performance
const ReactiveParticles = ({ scrollProgress, mousePosition, isHighPerf }: InteractiveSceneProps & { isHighPerf: boolean }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    // Drastically reduced particle count
    const count = isHighPerf ? 200 : 80;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      const colorMix = Math.random();
      colors[i * 3] = colorMix * 0 + (1 - colorMix) * 0;
      colors[i * 3 + 1] = colorMix * 1 + (1 - colorMix) * 0.85;
      colors[i * 3 + 2] = colorMix * 0.53 + (1 - colorMix) * 1;
    }
    
    return { positions, colors };
  }, [isHighPerf]);
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const t = state.clock.elapsedTime;
    
    // Simplified animation - no per-particle mouse reaction (huge performance gain)
    particlesRef.current.rotation.y = scrollProgress * Math.PI + t * 0.02;
    particlesRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Simplified floating shapes - only on high perf
const FloatingShapes = ({ scrollProgress, mousePosition, isHighPerf }: InteractiveSceneProps & { isHighPerf: boolean }) => {
  const shapes = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (shapes.current) {
      shapes.current.children.forEach((child, index) => {
        child.rotation.x = t * 0.2 * (index % 2 === 0 ? 1 : -1);
        child.rotation.y = t * 0.1 * (index % 2 === 0 ? -1 : 1);
        child.position.y = Math.sin(t * 0.3 + index) * 0.5;
      });
    }
  });

  if (!isHighPerf) return null;
  
  return (
    <group ref={shapes}>
      <mesh position={[-3, 1, -2]}>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial
          color="#00D9FF"
          metalness={0.9}
          roughness={0.1}
          emissive="#00D9FF"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <mesh position={[3, -1, -1]}>
        <tetrahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color="#00FF88"
          metalness={0.9}
          roughness={0.1}
          emissive="#00FF88"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

export const InteractiveScene = ({ scrollProgress, mousePosition, performanceTier = 'medium' }: InteractiveSceneProps) => {
  const { camera } = useThree();
  const isHighPerf = performanceTier === 'high';
  
  useFrame(() => {
    // Reduced camera movement
    camera.position.x = (mousePosition.x - 0.5) * 0.3;
    camera.position.y = (mousePosition.y - 0.5) * 0.2;
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      {/* Simplified lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00D9FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00FF88" />
      
      {/* Scene elements */}
      <CentralGlobe scrollProgress={scrollProgress} mousePosition={mousePosition} isHighPerf={isHighPerf} />
      <MetallicRing scrollProgress={scrollProgress} mousePosition={mousePosition} isHighPerf={isHighPerf} />
      <ReactiveParticles scrollProgress={scrollProgress} mousePosition={mousePosition} isHighPerf={isHighPerf} />
      <FloatingShapes scrollProgress={scrollProgress} mousePosition={mousePosition} isHighPerf={isHighPerf} />
    </>
  );
};

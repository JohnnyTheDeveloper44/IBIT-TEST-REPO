import { useState, useEffect } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

interface DevicePerformance {
  tier: PerformanceTier;
  canRender3D: boolean;
  particleCount: number;
  enableParallax: boolean;
  enableGlow: boolean;
}

/**
 * Detects device performance capabilities and returns appropriate settings
 * to prevent slow rendering on low-end devices
 */
export const useDevicePerformance = (): DevicePerformance => {
  const [performance, setPerformance] = useState<DevicePerformance>({
    tier: 'medium',
    canRender3D: true,
    particleCount: 50,
    enableParallax: true,
    enableGlow: true,
  });

  useEffect(() => {
    const checkPerformance = () => {
      const nav = navigator as Navigator & { 
        deviceMemory?: number; 
        hardwareConcurrency?: number;
        connection?: { effectiveType?: string };
      };
      
      // Device capability checks
      const deviceMemory = nav.deviceMemory ?? 4;
      const cores = nav.hardwareConcurrency ?? 4;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSlowConnection = nav.connection?.effectiveType === '2g' || nav.connection?.effectiveType === 'slow-2g';
      
      // Check for WebGL support
      let webglSupport = false;
      try {
        const canvas = document.createElement('canvas');
        webglSupport = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch (e) {
        webglSupport = false;
      }

      // Score calculation (0-100)
      let score = 50;
      
      // Memory scoring
      if (deviceMemory >= 8) score += 20;
      else if (deviceMemory >= 4) score += 10;
      else if (deviceMemory < 2) score -= 20;
      
      // Core scoring
      if (cores >= 8) score += 15;
      else if (cores >= 4) score += 5;
      else if (cores < 2) score -= 15;
      
      // Mobile penalty
      if (isMobile) score -= 20;
      
      // Slow connection penalty
      if (isSlowConnection) score -= 15;
      
      // No WebGL = can't render 3D
      if (!webglSupport) score -= 50;

      // Determine tier
      let tier: PerformanceTier;
      if (score >= 60) tier = 'high';
      else if (score >= 30) tier = 'medium';
      else tier = 'low';

      // Configure settings based on tier
      const settings: DevicePerformance = {
        tier,
        canRender3D: webglSupport && score > 10,
        particleCount: tier === 'high' ? 80 : tier === 'medium' ? 40 : 20,
        enableParallax: tier !== 'low',
        enableGlow: tier === 'high',
      };

      setPerformance(settings);
    };

    checkPerformance();
  }, []);

  return performance;
};

import { useState, useEffect, useRef, ImgHTMLAttributes, memo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
}

/**
 * Optimized image component with:
 * - Lazy loading (native browser lazy loading)
 * - Fade-in animation on load
 * - Error handling with fallback
 * - Loading state with skeleton
 */
export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className,
  wrapperClassName,
  priority = false,
  placeholder = 'empty',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setHasError(false);
    
    // Check if image is already cached
    if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-muted/50 text-muted-foreground text-sm",
          wrapperClassName
        )}
      >
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-muted/30 animate-pulse",
            placeholder === 'blur' && "backdrop-blur-sm"
          )} 
        />
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
    </div>
  );
});

/**
 * Background image component with lazy loading
 */
export const OptimizedBackgroundImage = memo(function OptimizedBackgroundImage({
  src,
  className,
  children,
}: {
  src: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative transition-opacity duration-500",
        isLoaded ? "opacity-100" : "opacity-50",
        className
      )}
      style={{
        backgroundImage: isLoaded ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
});

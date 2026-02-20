import { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';

interface FullscreenVideoModalProps {
  open: boolean;
  src: string | null;
  title: string;
  category: string;
  isMuted: boolean;
  onToggleMuted: () => void;
  onClose: () => void;
}

export function FullscreenVideoModal({
  open,
  src,
  title,
  category,
  isMuted,
  onToggleMuted,
  onClose,
}: FullscreenVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const mountNode = useMemo(() => (typeof document !== 'undefined' ? document.body : null), []);

  useEffect(() => {
    if (!open) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const el = videoRef.current;
    if (!el) return;

    // Ensure playback begins immediately after the click gesture.
    const t = window.setTimeout(() => {
      el.play().catch(() => {
        // If autoplay is blocked for any reason, controls are visible.
      });
    }, 0);

    return () => window.clearTimeout(t);
  }, [open, src]);

  if (!mountNode) return null;

  return createPortal(
    <AnimatePresence>
      {open && src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={onClose}
          style={{ perspective: 1200 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} video`}
        >
          <motion.div
            initial={{ scale: 0.85, rotateX: 15, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.9, rotateX: -10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-primary/30 bg-black"
            onClick={(e) => e.stopPropagation()}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 rounded-3xl blur-xl opacity-60 -z-10" />

            <video
              ref={videoRef}
              src={src}
              className="w-full h-auto max-h-[80vh] object-contain"
              controls
              autoPlay
              muted={isMuted}
              playsInline
              preload="metadata"
            />

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors z-10"
              aria-label="Close video"
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.22 }}
              onClick={onToggleMuted}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors z-10"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-foreground" />
              ) : (
                <Volume2 className="w-5 h-5 text-foreground" />
              )}
            </motion.button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
            >
              <h3 className="text-white font-bold text-lg">{title}</h3>
              <p className="text-white/70 text-sm">{category}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    mountNode
  );
}

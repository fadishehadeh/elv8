import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type LightboxProps = {
  images: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    },
    [index, onClose, onPrev, onNext],
  );

  useEffect(() => {
    if (index === null) return;
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, onKey]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center text-background/70 transition-colors hover:text-background md:right-10 md:top-10"
          >
            <X strokeWidth={1.25} className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center text-background/70 transition-colors hover:text-background md:left-10"
          >
            <ChevronLeft strokeWidth={1.25} className="h-8 w-8" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center text-background/70 transition-colors hover:text-background md:right-10"
          >
            <ChevronRight strokeWidth={1.25} className="h-8 w-8" />
          </button>

          <span className="eyebrow absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-background/55 md:bottom-10">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative mx-auto flex h-full w-full max-w-[1500px] items-center justify-center px-6 py-20 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index].src}
              alt={images[index].alt}
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

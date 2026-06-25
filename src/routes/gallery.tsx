import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

import { Navigation } from "@/components/Navigation";
import { Lightbox } from "@/components/Lightbox";
import g1 from "@/assets/images/gallery1.jpeg";
import g2 from "@/assets/images/gallery2.jpeg";
import g3 from "@/assets/images/gallery3.jpeg";
import g4 from "@/assets/images/gallery4.jpeg";
import g5 from "@/assets/images/gallery5.jpeg";
import g6 from "@/assets/images/gallery6.jpeg";
import g7 from "@/assets/images/gallery7.jpeg";
import g8 from "@/assets/images/gallery8.png";
import g9 from "@/assets/images/gallery9.png";
import g10 from "@/assets/images/gallery10.png";
import g11 from "@/assets/images/gallery11.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ELEV8 Developments" },
      {
        name: "description",
        content: "Selected photography from ELEV8 properties.",
      },
    ],
  }),
  component: GalleryPage,
});

const images = [
  { src: g1, alt: "ELEV8 — gallery 1" },
  { src: g2, alt: "ELEV8 — gallery 2" },
  { src: g3, alt: "ELEV8 — gallery 3" },
  { src: g4, alt: "ELEV8 — gallery 4" },
  { src: g5, alt: "ELEV8 — gallery 5" },
  { src: g6, alt: "ELEV8 — gallery 6" },
  { src: g7, alt: "ELEV8 — gallery 7" },
  { src: g8, alt: "ELEV8 — gallery 8" },
  { src: g9, alt: "ELEV8 — gallery 9" },
  { src: g10, alt: "ELEV8 — gallery 10" },
  { src: g11, alt: "ELEV8 — gallery 11" },
];

function Tile({ idx, onOpen }: { idx: number; onOpen: (i: number) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const img = images[idx];
  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onOpen(idx)}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: (idx % 3) * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
      className="group relative aspect-[4/5] overflow-hidden bg-foreground/10"
      aria-label={`Open image ${idx + 1}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/15" />
      <span className="eyebrow absolute bottom-4 left-4 text-background/0 transition-colors duration-500 group-hover:text-background/80">
        {String(idx + 1).padStart(2, "0")}
      </span>
    </motion.button>
  );
}

function GalleryPage() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="mx-auto max-w-[1600px] px-6 pb-24 pt-40 md:px-12 md:pt-48">
        <div className="max-w-3xl">
          <p className="eyebrow text-foreground/60">Gallery</p>
          <h1 className="editorial mt-8 text-[12vw] leading-[1.05] md:text-[6vw]">
            In quiet <span className="font-light italic text-foreground/60">detail.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-foreground/70 md:text-lg">
            A close look at the architecture, light, and landscape of our developments.
            Tap any image to view full screen.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-3 md:mt-28 md:grid-cols-3 md:gap-6">
          {images.map((_, i) => (
            <Tile key={i} idx={i} onOpen={setOpen} />
          ))}
        </div>
      </section>

      <Lightbox
        images={images}
        index={open}
        onClose={() => setOpen(null)}
        onPrev={() => setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length))}
        onNext={() => setOpen((i) => (i === null ? null : (i + 1) % images.length))}
      />
    </main>
  );
}

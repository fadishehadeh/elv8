import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

import { Navigation } from "@/components/Navigation";
import { Lightbox } from "@/components/Lightbox";
import kv1 from "@/assets/images/KV1.jpg";
import kv2 from "@/assets/images/KV2.jpg";
import kv3 from "@/assets/images/KV3.jpg";
import post1 from "@/assets/images/Post 1.jpg";
import post2 from "@/assets/images/Post 2.jpg";
import post3 from "@/assets/images/Post 3.jpg";
import post4 from "@/assets/images/Post 4.jpg";
import post5 from "@/assets/images/Post 5.jpg";
import post6 from "@/assets/images/Post 6.jpg";
import post7 from "@/assets/images/Post 7.jpg";
import post8 from "@/assets/images/Post 8.jpg";
import post9 from "@/assets/images/Post 9.jpg";

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
  { src: kv1, alt: "L'Écrin de Faqra — key view 1" },
  { src: kv2, alt: "L'Écrin de Faqra — key view 2" },
  { src: kv3, alt: "L'Écrin de Faqra — key view 3" },
  { src: post1, alt: "L'Écrin de Faqra — exterior 1" },
  { src: post2, alt: "L'Écrin de Faqra — exterior 2" },
  { src: post3, alt: "L'Écrin de Faqra — exterior 3" },
  { src: post4, alt: "L'Écrin de Faqra — detail 1" },
  { src: post5, alt: "L'Écrin de Faqra — detail 2" },
  { src: post6, alt: "L'Écrin de Faqra — detail 3" },
  { src: post7, alt: "L'Écrin de Faqra — interior 1" },
  { src: post8, alt: "L'Écrin de Faqra — interior 2" },
  { src: post9, alt: "L'Écrin de Faqra — interior 3" },
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

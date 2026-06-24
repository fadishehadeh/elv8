import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

import { Navigation } from "@/components/Navigation";

type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
};

/**
 * Shared subpage scaffold matching the home page's editorial language.
 * Used as a placeholder for routes whose content hasn't been authored yet.
 */
export function PagePlaceholder({ eyebrow, title, intro }: PagePlaceholderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="mx-auto flex min-h-screen max-w-[1600px] flex-col justify-center px-6 pb-24 pt-40 md:px-12 md:pt-48">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow text-foreground/60">{eyebrow}</p>
          <h1 className="editorial mt-8 text-[12vw] leading-[1.05] md:text-[6vw]">{title}</h1>
          {intro ? (
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/75 md:text-xl">
              {intro}
            </p>
          ) : null}
          <p className="eyebrow mt-16 text-foreground/45">More to come.</p>
        </motion.div>
      </section>
    </main>
  );
}

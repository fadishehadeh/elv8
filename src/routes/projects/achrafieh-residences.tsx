import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

import { Navigation } from "@/components/Navigation";
import post5 from "@/assets/images/Post 5.jpg";

export const Route = createFileRoute("/projects/achrafieh-residences")({
  head: () => ({
    meta: [
      { title: "Achrafieh Residences — ELEV8 Developments" },
      {
        name: "description",
        content:
          "An upcoming ELEV8 address in Achrafieh, Beirut. Details to be released privately to a small circle of clients and advisors.",
      },
    ],
  }),
  component: AchrafiehPage,
});

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AchrafiehPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero — blurred teaser */}
      <section className="relative h-[80vh] w-full overflow-hidden md:h-screen">
        <img
          src={post5}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-lg"
        />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center px-6 text-center md:px-12">
          <Reveal>
            <span className="eyebrow text-background/70">Achrafieh · Beirut</span>
            <h1 className="editorial mt-6 text-[14vw] leading-[1.05] text-background md:text-[8vw]">
              <span className="font-light italic">Unveiling</span> Soon.
            </h1>
            <p className="mt-8 text-base font-light text-background/75 md:text-lg">Coming this year.</p>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-40">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <span className="eyebrow text-foreground/55">A New Address</span>
              <h2 className="editorial mt-10 text-[10vw] leading-[1.05] md:text-[3.6vw]">
                In the heart of<br />
                <span className="font-light italic text-foreground/60">Achrafieh.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-8">
            <Reveal delay={0.1}>
              <p className="text-lg font-light leading-relaxed text-foreground/75 md:text-xl">
                An intimate composition rising in one of Beirut's most enduring neighbourhoods.
                Details — architecture, residences, delivery — will be released privately to a small circle of
                clients and advisors as the project takes shape.
              </p>
              <p className="mt-8 text-base font-light leading-relaxed text-foreground/65 md:text-lg">
                Register your interest below to be among the first to receive the dossier.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-32 text-background md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <Reveal>
            <span className="eyebrow text-background/55">Register Your Interest</span>
            <h2 className="editorial mt-8 text-[10vw] leading-[1.05] md:text-[4.6vw]">
              Be among the <span className="font-light italic text-background/70">first to know.</span>
            </h2>
            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
              <Link
                to="/contact"
                className="eyebrow inline-flex items-center justify-center border border-background bg-background px-8 py-4 text-foreground transition-colors duration-500 hover:bg-transparent hover:text-background"
              >
                Enquire now
              </Link>
              <Link
                to="/projects"
                className="eyebrow inline-flex items-center justify-center border border-background/60 px-8 py-4 text-background transition-colors duration-500 hover:border-background hover:bg-background/10"
              >
                Back to projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

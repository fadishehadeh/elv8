import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

import { Navigation } from "@/components/Navigation";
import post1 from "@/assets/images/Post 1.jpg";
import post5 from "@/assets/images/Post 5.jpg";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Our Projects — ELEV8 Developments" },
      {
        name: "description",
        content:
          "A focused portfolio of residential, commercial, and leisure developments by ELEV8 — beginning with L'Écrin de Faqra and an upcoming address in Achrafieh.",
      },
    ],
  }),
  component: ProjectsIndex,
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

const projects = [
  {
    to: "/projects/lecrin-de-faqra",
    eyebrow: "Faqra · Lebanon",
    title: "L'Écrin",
    titleItalic: "de Faqra",
    description:
      "Six private residences set into the quiet contours of Faqra — drawn with restraint, framed by stone, and inhabited by light.",
    image: post1,
    status: "active" as const,
    cta: "Explore the residence",
  },
  {
    to: "/projects/achrafieh-residences",
    eyebrow: "Achrafieh · Beirut",
    title: "Unveiling",
    titleItalic: "Soon",
    description:
      "An intimate composition rising in the heart of Achrafieh. Details will be released privately to a small circle of clients and advisors.",
    image: post5,
    status: "soon" as const,
    cta: "Register your interest",
  },
];

function ProjectsIndex() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="mx-auto max-w-[1200px] px-6 pb-24 pt-40 md:px-12 md:pt-48">
        <Reveal>
          <p className="eyebrow text-foreground/60">Our Projects</p>
          <h1 className="editorial mt-8 max-w-3xl text-[12vw] leading-[1.05] md:text-[5vw]">
            A portfolio of <span className="font-light italic text-foreground/60">considered places.</span>
          </h1>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-24 md:gap-10">
          {projects.map((p, i) => (
            <Reveal key={p.to} delay={i * 0.12}>
              <Link to={p.to} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-foreground/10">
                  <img
                    src={p.image}
                    alt={`${p.title} ${p.titleItalic}`}
                    className={`h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105 ${
                      p.status === "soon" ? "scale-110 blur-md" : ""
                    }`}
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 ${
                      p.status === "soon"
                        ? "bg-foreground/55"
                        : "bg-gradient-to-t from-foreground/55 via-foreground/0 to-foreground/0"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 flex flex-col p-6 md:p-7 ${
                      p.status === "soon" ? "items-center justify-center text-center" : "justify-end"
                    }`}
                  >
                    <span className="eyebrow text-background/80">{p.eyebrow}</span>
                    <h2 className="editorial mt-3 text-3xl text-background md:text-4xl">
                      {p.title} <span className="font-light italic">{p.titleItalic}</span>
                    </h2>
                  </div>
                </div>
                <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-foreground/70 md:text-base">
                  {p.description}
                </p>
                <span className="eyebrow mt-5 inline-flex items-center gap-3 border-b border-foreground/30 pb-1 text-foreground transition-colors duration-500 group-hover:border-foreground">
                  {p.cta}
                  <span className="block h-px w-6 origin-left bg-foreground/40 transition-all duration-500 group-hover:w-10 group-hover:bg-foreground" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

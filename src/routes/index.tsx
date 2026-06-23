import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

import logo from "@/assets/logo.svg";
import kv1 from "@/assets/images/KV1.jpg";
import kv2 from "@/assets/images/KV2.jpg";
import kv3 from "@/assets/images/KV3.jpg";
import post2 from "@/assets/images/Post 2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELEV8 Developments — Where Living Is Elevated By Design" },
      {
        name: "description",
        content:
          "ELEV8 Developments — a Lebanese luxury residential brand. L'Écrin de Faqra: six private residences shaped by architecture, privacy, and restraint.",
      },
    ],
  }),
  component: Index,
});

/* ---------- shared primitives ---------- */

function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MaskLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 1.1, delay, ease: [0.22, 0.61, 0.36, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ---------- navigation ---------- */

function Navigation() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY < 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = "text-background/75 hover:text-background";
  const labelColor = "text-background/60";
  const barBg = atTop
    ? "bg-transparent"
    : "bg-foreground/95 border-b border-background/10 backdrop-blur-sm";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${barBg}`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <a href="#top" className="flex items-center" aria-label="ELEV8 Developments">
          <img src={logo} alt="ELEV8" className="h-8 w-auto brightness-0 invert md:h-10" />
        </a>
        <ul className="hidden items-center gap-12 md:flex">
          {[
            { label: "Manifesto", href: "#manifesto" },
            { label: "L'Écrin de Faqra", href: "#project" },
            { label: "Why ELEV8", href: "#why" },
            { label: "Enquire", href: "#enquire" },
          ].map((item) => (
            <li key={item.label}>
              <a href={item.href} className={`eyebrow transition-colors duration-500 ${linkColor}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <span className={`eyebrow hidden md:inline ${labelColor}`}>
          Beirut · Lebanon
        </span>
      </div>
    </motion.nav>
  );
}

/* ---------- page ---------- */

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "-25%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

  const projectRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: projectProgress } = useScroll({
    target: projectRef,
    offset: ["start end", "end start"],
  });
  const projectImgY = useTransform(projectProgress, [0, 1], ["-8%", "8%"]);

  const heroSlides = [kv1, kv2, kv3];
  const [heroSlide, setHeroSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHeroSlide((i) => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, [heroSlides.length]);

  return (
    <main id="top" className="bg-background text-foreground">
      <Navigation />

      {/* ============ 1. HERO ============ */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0">
          {heroSlides.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={{ opacity: i === heroSlide ? 1 : 0 }}
              transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
            />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,57,49,0.25)_0%,rgba(0,57,49,0)_30%,rgba(0,57,49,0)_60%,rgba(0,57,49,0.45)_100%)]" />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <Reveal delay={0.4} y={12}>
            <img src={logo} alt="ELEV8 Developments" className="mx-auto mb-12 h-20 w-auto md:h-28" />
          </Reveal>
          <h1 className="editorial text-background text-[10vw] leading-[2] md:text-[5vw]">
            <MaskLine delay={0.6}>Living Elevated.</MaskLine>
          </h1>
          <Reveal delay={1.4}>
            <a
              href="#project"
              className="group mt-14 inline-flex items-center gap-4 border-b border-background/40 pb-2 transition-colors duration-500 hover:border-background"
            >
              <span className="eyebrow text-background">Discover L'Écrin de Faqra</span>
              <span className="block h-px w-8 origin-left bg-background/50 transition-all duration-500 group-hover:w-14 group-hover:bg-background" />
            </a>
          </Reveal>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-6 right-6 flex items-end justify-between md:left-12 md:right-12"
        >
          <span className="eyebrow text-background/80">ELEV8 — MMXXVI</span>
          <span className="eyebrow text-background/80 hidden md:inline">Faqra · Lebanon</span>
        </motion.div>
      </section>

      {/* ============ 2. MANIFESTO ============ */}
      <section id="manifesto" className="relative w-full py-40 md:py-56">
        <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-6 px-6 md:gap-10 md:px-12">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <span className="eyebrow text-foreground/55">I — Manifesto</span>
              <p className="mt-10 max-w-xs text-sm font-light leading-relaxed text-foreground/65">
                Four convictions that shape every room, every façade, every threshold we draw.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-9 md:pl-8">
            <h2 className="editorial text-[10vw] md:text-[6.2vw]">
              {[
                ["Intention,", "not volume."],
                ["Privacy", "over density."],
                ["Architecture", "as identity."],
                ["Living as a", "conscious choice."],
              ].map(([a, b], i) => (
                <span key={i} className="mt-2 block first:mt-0">
                  <MaskLine delay={i * 0.12}>
                    {a}{" "}
                    <span className="font-light italic text-foreground/55">{b}</span>
                  </MaskLine>
                </span>
              ))}
            </h2>
          </div>
        </div>
      </section>

      {/* ============ 3. L'ÉCRIN DE FAQRA ============ */}
      <section
        id="project"
        ref={projectRef}
        className="relative w-full bg-primary text-background"
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-0 md:min-h-screen">
          {/* Image */}
          <div className="col-span-12 overflow-hidden md:col-span-7 md:h-screen md:sticky md:top-0">
            <motion.img
              src={post2}
              alt="L'Écrin de Faqra — terraced residence at golden hour"
              style={{ y: projectImgY, scale: 1.12 }}
              className="h-[70vh] w-full object-cover md:h-full"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="col-span-12 flex flex-col justify-center px-6 py-24 md:col-span-5 md:px-14 md:py-32">
            <Reveal>
              <span className="eyebrow text-background/60">II — The First Address</span>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="editorial mt-10 text-[12vw] md:text-[5.6vw]">
                L'Écrin
                <br />
                <span className="font-light italic text-background/75">de Faqra.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-12 max-w-md text-base font-light leading-relaxed text-background/80 md:text-lg">
                Set into the quiet contours of Faqra, L'Écrin is a single composition of six private residences —
                drawn with restraint, framed by stone, and inhabited by light.
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <dl className="mt-16 grid grid-cols-2 gap-y-8 border-t border-background/15 pt-10 text-background/80">
                {[
                  ["Residences", "Six"],
                  ["Location", "Faqra"],
                  ["Typology", "Private"],
                  ["Delivery", "MMXXVII"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="eyebrow text-background/50">{k}</dt>
                    <dd className="mt-3 text-xl font-light tracking-tight md:text-2xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.6}>
              <a
                href="#enquire"
                className="group mt-16 inline-flex items-center gap-4 border-b border-background/30 pb-2 transition-colors duration-500 hover:border-background"
              >
                <span className="eyebrow">Request the dossier</span>
                <span className="block h-px w-8 origin-left bg-background/40 transition-all duration-500 group-hover:w-14 group-hover:bg-background" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 4. WHY ELEV8 ============ */}
      <section id="why" className="relative w-full py-40 md:py-56">
        <div className="mx-auto max-w-[1500px] px-6 md:px-12">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-4">
              <Reveal>
                <span className="eyebrow text-foreground/55">III — Why ELEV8</span>
                <h3 className="editorial mt-10 text-[10vw] md:text-[3.6vw]">
                  A quiet
                  <br />
                  <span className="font-light italic text-foreground/60">standard.</span>
                </h3>
              </Reveal>
            </div>

            <div className="col-span-12 md:col-span-8 md:pl-8">
              <div className="grid grid-cols-1 gap-px bg-foreground/15 sm:grid-cols-2">
                {[
                  {
                    n: "01",
                    title: "Privacy",
                    body: "Designed for the few. Discretion is the first material.",
                  },
                  {
                    n: "02",
                    title: "Architecture",
                    body: "Form before façade. Each plan is drawn, not styled.",
                  },
                  {
                    n: "03",
                    title: "Exclusivity",
                    body: "Limited residences, deliberate addresses, no repetition.",
                  },
                  {
                    n: "04",
                    title: "Design",
                    body: "A vocabulary of stone, oak, and light — held with restraint.",
                  },
                ].map((item, i) => (
                  <Reveal key={item.n} delay={i * 0.08}>
                    <div className="flex h-full flex-col justify-between bg-background p-8 md:min-h-[260px] md:p-10">
                      <div className="flex items-baseline justify-between">
                        <span className="eyebrow text-foreground/45">{item.n}</span>
                        <span className="eyebrow text-foreground/45">— ELEV8</span>
                      </div>
                      <div className="mt-16">
                        <h4 className="text-3xl font-medium tracking-tight md:text-4xl">{item.title}</h4>
                        <p className="mt-5 max-w-[28ch] text-sm font-light leading-relaxed text-foreground/65">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. PRIVATE ENQUIRY ============ */}
      <section id="enquire" className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={kv2}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-[0.18]"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>

        <div className="relative mx-auto grid max-w-[1500px] grid-cols-12 gap-6 px-6 py-40 md:gap-10 md:px-12 md:py-56">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <span className="eyebrow text-foreground/55">IV — Private Enquiry</span>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="editorial mt-10 text-[12vw] md:text-[5vw]">
                By
                <br />
                <span className="font-light italic text-foreground/60">invitation.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-10 max-w-sm text-base font-light leading-relaxed text-foreground/70">
                Residences at L'Écrin de Faqra are released privately to a small circle of clients and advisors.
                Please write to begin a confidential conversation.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-6">
            <Reveal delay={0.2}>
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                {[
                  { id: "name", label: "Name", type: "text" },
                  { id: "email", label: "Email", type: "email" },
                  { id: "origin", label: "City / Country", type: "text" },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="eyebrow text-foreground/50">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      className="mt-4 block w-full border-b border-foreground/25 bg-transparent pb-3 text-lg font-light tracking-tight text-foreground outline-none transition-colors duration-300 focus:border-foreground"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="eyebrow text-foreground/50">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="mt-4 block w-full resize-none border-b border-foreground/25 bg-transparent pb-3 text-lg font-light tracking-tight text-foreground outline-none transition-colors duration-300 focus:border-foreground"
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-6 inline-flex items-center gap-4 border-b border-foreground/40 pb-2 transition-colors duration-500 hover:border-foreground"
                >
                  <span className="eyebrow">Send enquiry</span>
                  <span className="block h-px w-8 origin-left bg-foreground/50 transition-all duration-500 group-hover:w-16 group-hover:bg-foreground" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>

        {/* Footer */}
        <div className="relative border-t border-foreground/15">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12">
            <div className="flex items-center gap-4">
              <img src={logo} alt="ELEV8" className="h-6 w-auto opacity-80" />
              <span className="eyebrow text-foreground/55">Where Living Is Elevated By Design</span>
            </div>
            <div className="flex items-center gap-10">
              <a
                href="mailto:private@elev8.dev"
                className="eyebrow text-foreground/65 transition-colors duration-300 hover:text-foreground"
              >
                private@elev8.dev
              </a>
              <span className="eyebrow text-foreground/45">Beirut · MMXXVI</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

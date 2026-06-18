import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

import logo from "@/assets/logo.asset.json";
import post2 from "@/assets/post2.asset.json";
import post3 from "@/assets/post3.asset.json";
import post4 from "@/assets/post4.asset.json";
import post5 from "@/assets/post5.asset.json";
import post6 from "@/assets/post6.asset.json";
import post7 from "@/assets/post7.asset.json";
import post8 from "@/assets/post8.asset.json";
import post9 from "@/assets/post9.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELEV8 Developments — Living, Elevated" },
      { name: "description", content: "A Lebanese luxury real estate brand built on restraint, privacy, and clear architectural thinking." },
    ],
  }),
  component: Index,
});

function Navigation() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 80);
      if (Math.abs(y - lastY.current) > 8) {
        setVisible(y < lastY.current || y < 80);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo.url} alt="ELEV8" className="h-7 w-auto md:h-8" />
        </a>
        <ul className="hidden items-center gap-10 md:flex">
          {["About", "Philosophy", "Projects", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="eyebrow text-foreground/70 transition-colors duration-500 hover:text-foreground"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <span className="eyebrow hidden text-foreground/60 md:inline">Beirut · Lebanon</span>
        <button className="eyebrow text-foreground/80 md:hidden">Menu</button>
      </div>
      <div
        className="mx-auto h-px max-w-[1600px] bg-foreground/10 transition-opacity duration-700"
        style={{ opacity: atTop ? 0 : 1 }}
      />
    </motion.nav>
  );
}

function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MaskImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={inView ? { scaleY: 0 } : {}}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
        className="absolute inset-0 z-10 bg-background"
      />
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.15 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.22, 0.61, 0.36, 1] }}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

function ParallaxImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.15 }}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

function StatementSection({
  image,
  alt,
  caption,
  line1,
  line2,
  align = "left",
}: {
  image: string;
  alt: string;
  caption: string;
  line1: string;
  line2?: string;
  align?: "left" | "right";
}) {
  const ImageBlock = (
    <div className="col-span-12 md:col-span-7">
      <MaskImage src={image} alt={alt} className="aspect-[4/5] w-full" />
    </div>
  );
  const TextBlock = (
    <div className={`col-span-12 flex flex-col justify-end md:col-span-5 md:pb-16 ${align === "left" ? "md:pl-8" : "md:pr-8"}`}>
      <Reveal delay={0.4}>
        <span className="eyebrow mb-8 block text-foreground/50">{caption}</span>
        <h2 className="editorial text-[14vw] md:text-[7vw]">
          {line1}
          {line2 && (
            <>
              <br />
              <span className="italic text-foreground/70" style={{ fontWeight: 300 }}>
                {line2}
              </span>
            </>
          )}
        </h2>
      </Reveal>
    </div>
  );

  return (
    <section className="relative min-h-screen w-full py-24 md:py-32">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-6 md:gap-10 md:px-12">
        {align === "left" ? (
          <>
            {ImageBlock}
            {TextBlock}
          </>
        ) : (
          <>
            {TextBlock}
            {ImageBlock}
          </>
        )}
      </div>
    </section>
  );
}

function ManifestoLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
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

function ImmersiveGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section id="about" ref={ref} className="relative w-full py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <span className="eyebrow mb-24 block text-foreground/50">A Vocabulary of Materials</span>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <motion.div style={{ y: y1 }} className="col-span-7 md:col-span-5">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={post5.url} alt="Concrete texture" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="eyebrow mt-4 text-foreground/50">Concrete · Cast in place</p>
          </motion.div>

          <motion.div style={{ y: y2 }} className="col-span-5 mt-32 md:col-span-4 md:mt-48">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={post9.url} alt="Stone bench in light" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="eyebrow mt-4 text-foreground/50">Travertine · Quiet weight</p>
          </motion.div>

          <div className="hidden md:col-span-3 md:block" />
          <div className="hidden md:col-span-3 md:block" />

          <motion.div style={{ y: y3 }} className="col-span-12 -mt-12 md:col-span-5 md:-mt-40">
            <div className="aspect-[16/11] overflow-hidden">
              <img src={post3.url} alt="Hand on stone, olive shadow" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="eyebrow mt-4 text-foreground/50">Light · As material</p>
          </motion.div>

          <motion.div style={{ y: y4 }} className="col-span-12 col-start-1 mt-16 md:col-span-6 md:col-start-4 md:mt-40">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={post7.url} alt="Curved stair" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="eyebrow mt-4 text-foreground/50">Oak · Movement and rest</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "-30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const manifestoLines = [
    "ELEV8 is a Lebanese",
    "luxury real estate brand",
    "built on restraint,",
    "privacy, and clear",
    "architectural thinking.",
  ];

  return (
    <main id="top" className="bg-background text-foreground">
      <Navigation />

      {/* SECTION 1 — HERO */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0">
          <img src={post6.url} alt="Architectural facade against open sky" className="h-full w-full object-cover" />
        </motion.div>
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <Reveal delay={0.6} y={16}>
            <h1
              className="editorial text-[12vw] text-background md:text-[6.5vw]"
              style={{ textShadow: "0 1px 30px rgba(0,0,0,0.15)" }}
            >
              Creating timeless places
              <br />
              <span className="italic text-background/90">shaped by architecture</span>
            </h1>
          </Reveal>
          <Reveal delay={1.1}>
            <p className="mt-10 text-sm font-light tracking-wide text-background/85 md:text-base">
              Where living is elevated by design.
            </p>
          </Reveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="eyebrow text-background/80">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-10 w-px bg-background/60"
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 */}
      <StatementSection
        image={post4.url}
        alt="Sculpted travertine facade"
        caption="I — A Position"
        line1="Intention,"
        line2="not volume."
        align="left"
      />

      {/* SECTION 3 */}
      <StatementSection
        image={post7.url}
        alt="Curved staircase in stone and oak"
        caption="II"
        line1="Architecture"
        line2="over excess."
        align="right"
      />

      {/* SECTION 4 */}
      <StatementSection
        image={post2.url}
        alt="Sheer curtains framing a mountain view"
        caption="III"
        line1="Privacy"
        line2="over density."
        align="left"
      />

      {/* SECTION 5 */}
      <StatementSection
        image={post3.url}
        alt="A hand on warm stone, shadows of olive"
        caption="IV"
        line1="Experience"
        line2="over ownership."
        align="right"
      />

      {/* SECTION 6 — MANIFESTO */}
      <section id="philosophy" className="relative w-full bg-background py-48 md:py-64">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <Reveal>
            <span className="eyebrow mb-16 block text-foreground/50">Manifesto</span>
          </Reveal>
          <h2 className="editorial text-[9vw] leading-[1.05] md:text-[4.5vw]">
            {manifestoLines.map((line, i) => (
              <ManifestoLine key={i} delay={i * 0.12}>
                {line}
              </ManifestoLine>
            ))}
          </h2>
        </div>
      </section>

      {/* SECTION 7 — L'ECRIN */}
      <section id="projects" className="relative w-full py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <ParallaxImage
            src={post8.url}
            alt="L'Écrin de Faqra — terrace at golden hour"
            className="aspect-[16/10] w-full"
          />
          <div className="mx-auto mt-20 max-w-3xl text-center md:mt-32">
            <Reveal>
              <span className="eyebrow block text-foreground/50">L'ÉCRIN DE FAQRA</span>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="editorial mt-10 text-[11vw] md:text-[5.5vw]">
                A rare <span className="italic text-foreground/75">address.</span>
              </h3>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mx-auto mt-14 flex max-w-md flex-col gap-2 text-base font-light tracking-wide text-foreground/75 md:text-lg">
                <p>Six residences.</p>
                <p>One philosophy.</p>
              </div>
            </Reveal>
            <Reveal delay={0.65}>
              <a
                href="#contact"
                className="group mt-16 inline-flex items-center gap-4 border-b border-foreground/30 pb-2 transition-colors duration-500 hover:border-foreground"
              >
                <span className="eyebrow">Discover the story</span>
                <span className="block h-px w-8 origin-left bg-foreground/40 transition-all duration-500 group-hover:w-14 group-hover:bg-foreground" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Immersive Gallery */}
      <ImmersiveGallery />

      {/* SECTION 9 — Final Statement */}
      <section id="contact" className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-40">
        <Reveal>
          <h2 className="editorial text-center text-[16vw] md:text-[10vw]">
            Living,
            <br />
            <span className="italic text-foreground/75">Elevated.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-32 flex flex-col items-center gap-6">
            <img src={logo.url} alt="ELEV8 Developments" className="h-10 w-auto opacity-90" />
            <a
              href="mailto:hello@elev8.dev"
              className="eyebrow mt-6 border-b border-foreground/30 pb-1 text-foreground/70 transition-colors duration-500 hover:border-foreground hover:text-foreground"
            >
              hello@elev8.dev
            </a>
          </div>
        </Reveal>
        <div className="mt-32 flex w-full max-w-[1600px] items-center justify-between px-6">
          <span className="eyebrow text-foreground/50">Beirut</span>
          <span className="eyebrow text-foreground/50">MMXXVI</span>
        </div>
      </section>
    </main>
  );
}

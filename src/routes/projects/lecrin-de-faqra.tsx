import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Trees, Mountain } from "lucide-react";

import { Navigation } from "@/components/Navigation";
import post1 from "@/assets/images/Post 1.jpg";
import post2 from "@/assets/images/Post 2.jpg";
import post3 from "@/assets/images/Post 3.jpg";
import post4 from "@/assets/images/Post 4.jpg";

export const Route = createFileRoute("/projects/lecrin-de-faqra")({
  head: () => ({
    meta: [
      { title: "L'Écrin de Faqra — ELEV8 Developments" },
      {
        name: "description",
        content:
          "L'Écrin de Faqra — six private residences in Faqra, Lebanon. Architecture of restraint, framed by stone and inhabited by light.",
      },
    ],
  }),
  component: LecrinPage,
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

const specs = [
  ["Residences", "Six"],
  ["Location", "Faqra"],
  ["Typology", "Private"],
  ["Delivery", "MMXXVII"],
];

const amenities = [
  {
    n: "01",
    icon: Trees,
    title: "Landscaped Gardens",
    body: "Curated greenery framing every residence, designed to mature with the seasons.",
  },
  {
    n: "02",
    icon: Mountain,
    title: "Private Terrace",
    body: "An outdoor room of one's own — open to the Faqra horizon, held in stone.",
  },
];

function LecrinPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden md:h-screen">
        <img src={post1} alt="L'Écrin de Faqra" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/10 to-foreground/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
          <Reveal>
            <span className="eyebrow text-background/80">Faqra · Lebanon</span>
            <h1 className="editorial mt-6 text-[14vw] leading-[1.05] text-background md:text-[8vw]">
              L'Écrin <span className="font-light italic text-background/80">de Faqra.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Intro + Specs */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-40">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <span className="eyebrow text-foreground/55">I — The Composition</span>
              <h2 className="editorial mt-10 text-[10vw] leading-[1.05] md:text-[3.6vw]">
                A single<br />
                <span className="font-light italic text-foreground/60">composition.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-8">
            <Reveal delay={0.1}>
              <p className="text-lg font-light leading-relaxed text-foreground/75 md:text-xl">
                Set into the quiet contours of Faqra, L'Écrin is a single composition of six private residences —
                drawn with restraint, framed by stone, and inhabited by light. Each home opens to the mountain on
                one side and a private landscape on the other, holding the rhythm of the seasons in plain view.
              </p>
              <dl className="mt-16 grid grid-cols-2 gap-y-8 border-t border-foreground/15 pt-10 text-foreground/80 md:grid-cols-4">
                {specs.map(([k, v]) => (
                  <div key={k}>
                    <dt className="eyebrow text-foreground/50">{k}</dt>
                    <dd className="mt-3 text-xl font-light tracking-tight md:text-2xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Imagery strip */}
      <section className="grid grid-cols-1 gap-px bg-foreground/15 md:grid-cols-2">
        {[post2, post3, post4].map((img, i) => (
          <div key={i} className={`relative aspect-[4/3] overflow-hidden bg-background ${i === 0 ? "md:col-span-2 md:aspect-[16/7]" : ""}`}>
            <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
      </section>

      {/* Amenities */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-40">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <span className="eyebrow text-foreground/55">II — Amenities</span>
              <h2 className="editorial mt-10 text-[10vw] leading-[1.05] md:text-[3.6vw]">
                Designed Around<br />
                <span className="font-light italic text-foreground/60">Outdoor Living.</span>
              </h2>
              <p className="mt-10 max-w-sm text-base font-light leading-relaxed text-foreground/70 md:text-lg">
                Each residence opens to a private landscape — a deliberate continuation of the
                living space into the air, the trees, and the mountain light.
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-8">
            <div className="grid grid-cols-1 gap-px bg-foreground/15 sm:grid-cols-2">
              {amenities.map((item, i) => (
                <Reveal key={item.n} delay={i * 0.1}>
                  <div className="flex h-full flex-col justify-between bg-background p-8 md:min-h-[320px] md:p-10">
                    <div className="flex items-baseline justify-between">
                      <span className="eyebrow text-foreground/45">{item.n}</span>
                      <span className="eyebrow text-foreground/45">— ELEV8</span>
                    </div>
                    <div className="mt-12">
                      <item.icon strokeWidth={1} className="h-12 w-12 text-foreground/75 md:h-14 md:w-14" aria-hidden />
                      <h4 className="mt-8 text-2xl font-medium tracking-tight md:text-3xl">{item.title}</h4>
                      <p className="mt-4 max-w-[32ch] text-sm font-light leading-relaxed text-foreground/65">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-32 text-background md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <Reveal>
            <span className="eyebrow text-background/55">Private Enquiry</span>
            <h2 className="editorial mt-8 text-[10vw] leading-[1.05] md:text-[4.6vw]">
              Begin a private <span className="font-light italic text-background/70">conversation.</span>
            </h2>
            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
              <Link
                to="/contact"
                className="eyebrow inline-flex items-center justify-center border border-background bg-background px-8 py-4 text-foreground transition-colors duration-500 hover:bg-transparent hover:text-background"
              >
                Enquire now
              </Link>
              <a
                href="/elev8-brochure.pdf"
                download
                className="eyebrow inline-flex items-center justify-center border border-background/60 px-8 py-4 text-background transition-colors duration-500 hover:border-background hover:bg-background/10"
              >
                Download brochure
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

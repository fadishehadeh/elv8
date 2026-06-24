import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

import { Navigation } from "@/components/Navigation";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — ELEV8 Developments" },
      {
        name: "description",
        content: "Speak privately with the ELEV8 team — Beirut, Lebanon.",
      },
    ],
  }),
  component: ContactPage,
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

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

type FormState = { name: string; phone: string; email: string; project: string; message: string };
const initial: FormState = { name: "", phone: "", email: "", project: "L'Écrin de Faqra", message: "" };

function ContactPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "enquiry", ...form }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="mx-auto max-w-[1600px] px-6 pb-24 pt-40 md:px-12 md:pt-48">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Intro + details */}
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <p className="eyebrow text-foreground/60">Contact Us</p>
              <h1 className="editorial mt-8 text-[12vw] leading-[1.05] md:text-[5.4vw]">
                In private<br />
                <span className="font-light italic text-foreground/60">conversation.</span>
              </h1>
              <p className="mt-10 max-w-md text-base font-light leading-relaxed text-foreground/70 md:text-lg">
                For enquiries on availability, private viewings, or off-market opportunities,
                the ELEV8 team is reachable directly.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-16 space-y-8 border-t border-foreground/15 pt-10">
                <div>
                  <dt className="eyebrow text-foreground/50">Email</dt>
                  <dd className="mt-3 text-lg font-light tracking-tight md:text-xl">
                    <a href="mailto:info@elev8properties.com" className="border-b border-foreground/20 pb-0.5 transition-colors hover:border-foreground">
                      info@elev8properties.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-foreground/50">Location</dt>
                  <dd className="mt-3 text-lg font-light tracking-tight md:text-xl">Beirut · Lebanon</dd>
                </div>
                <div>
                  <dt className="eyebrow text-foreground/50">Hours</dt>
                  <dd className="mt-3 text-lg font-light tracking-tight md:text-xl">Mon — Fri · 9:00 – 18:00</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Form */}
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-6">
            <Reveal delay={0.2}>
              {status === "sent" ? (
                <div className="border border-foreground/15 bg-foreground/[0.03] p-10">
                  <span className="eyebrow text-foreground/55">Thank you</span>
                  <h2 className="editorial mt-6 text-3xl md:text-4xl">
                    Your enquiry has been <span className="font-light italic text-foreground/60">received.</span>
                  </h2>
                  <p className="mt-6 max-w-md text-base font-light leading-relaxed text-foreground/70">
                    A member of the ELEV8 team will be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="eyebrow mt-10 inline-flex items-center gap-3 border-b border-foreground/30 pb-1 transition-colors hover:border-foreground"
                  >
                    Send another enquiry
                    <span className="block h-px w-6 bg-foreground/40 transition-all duration-500" />
                  </button>
                </div>
              ) : (
                <form
                  name="enquiry"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={onSubmit}
                  className="space-y-10"
                >
                  <input type="hidden" name="form-name" value="enquiry" />
                  <p className="hidden">
                    <label>
                      Don't fill this out: <input name="bot-field" onChange={() => {}} />
                    </label>
                  </p>

                  {[
                    { id: "name", label: "Name", type: "text", required: true },
                    { id: "phone", label: "Phone", type: "tel", required: true },
                    { id: "email", label: "Email", type: "email", required: true },
                  ].map((f) => (
                    <div key={f.id} className="relative">
                      <label htmlFor={f.id} className="eyebrow block text-foreground/55">
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        required={f.required}
                        value={form[f.id as keyof FormState]}
                        onChange={update(f.id as keyof FormState)}
                        className="mt-4 w-full border-b border-foreground/20 bg-transparent pb-3 text-lg font-light tracking-tight outline-none transition-colors duration-300 focus:border-foreground"
                      />
                    </div>
                  ))}

                  <div className="relative">
                    <label htmlFor="project" className="eyebrow block text-foreground/55">
                      Project of interest
                    </label>
                    <select
                      id="project"
                      name="project"
                      value={form.project}
                      onChange={update("project")}
                      className="mt-4 w-full border-b border-foreground/20 bg-transparent pb-3 text-lg font-light tracking-tight outline-none transition-colors duration-300 focus:border-foreground"
                    >
                      <option>L'Écrin de Faqra</option>
                      <option>Achrafieh Residences</option>
                      <option>Other / General enquiry</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="eyebrow block text-foreground/55">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={update("message")}
                      className="mt-4 w-full resize-none border-b border-foreground/20 bg-transparent pb-3 text-lg font-light tracking-tight outline-none transition-colors duration-300 focus:border-foreground"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="eyebrow inline-flex items-center justify-center border border-foreground bg-foreground px-8 py-4 text-background transition-colors duration-500 hover:bg-transparent hover:text-foreground disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : "Send enquiry"}
                    </button>
                    {status === "error" && (
                      <span className="eyebrow text-red-700">Something went wrong. Please try again.</span>
                    )}
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

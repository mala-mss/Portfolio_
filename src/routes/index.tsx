import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { Cursor } from "@/components/portfolio/Cursor";
import { SkillsOrbit } from "@/components/portfolio/SkillsOrbit";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import profilePic from "@/assets/1782846955275.png";
const Scene3D = lazy(() =>
  import("@/components/portfolio/Scene3D").then((m) => ({ default: m.HeroScene }))
);
const ContactScene = lazy(() =>
  import("@/components/portfolio/Scene3D").then((m) => ({ default: m.ContactScene }))
);  


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ibtihal Moussa  — Full-Stack & Mobile Developer" },
      { name: "description", content: "Portfolio of Ibtihal Moussa, a final-year CS student crafting full-stack web and Android experiences with React, Node.js, and Kotlin." },
      { property: "og:title", content: "Malak — Full-Stack & Mobile Developer" },
      { property: "og:description", content: "Portfolio of Malak, a final-year CS student crafting full-stack web and Android experiences." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const res = await fetch("https://formspree.io/f/mnjkoyvb", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      form.reset();
      alert("Thanks! I'll get back to you soon.");
    } else {
      alert("Something went wrong. Please email me directly.");
    }
  }
  return (
    <div className="relative min-h-screen">
      {mounted && <Cursor />}
      <Nav />

      {/* HERO */}
      <section className="relative z-0 flex min-h-screen items-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          {mounted && (
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          )}
        </motion.div>
        {/* Fallback / non-WebGL hint — visible behind the canvas if WebGL fails */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" aria-hidden>
          <div className="h-64 w-64 rounded-full opacity-20" style={{ background: "var(--gradient-glow)" }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" />
              Based in Algeria · Open to opportunities
            </div>
            <h1 className="mt-8 font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.95]">
              Ibtihal Moussa<span className="text-gradient">.</span>
            </h1>
            <p className="mt-4 max-w-2xl font-display text-2xl font-light text-foreground/80 sm:text-3xl">
              Full-Stack & Mobile Developer crafting <span className="text-gradient font-medium">immersive digital experiences</span>.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#projects" data-hoverable className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]">
                View My Work
                <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
              </a>
              <a href="#contact" data-hoverable className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground/90 transition hover:bg-secondary">
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Scroll
        </motion.div>
      </section>

      {/* ABOUT */}
      <Section id="about" label="01 / About">
        <div className="grid items-center gap-12 md:grid-cols-[260px_1fr]">
         <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full border border-border glass md:w-full"
>
  <img
    src={profilePic}
    alt="Malak"
    className="absolute inset-0 h-full w-full object-cover"
    loading="lazy"
  />
</motion.div>
          <div>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              I build interfaces where <span className="text-gradient">design meets engineering</span>.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Final-year Computer Science student specializing in full-stack web and Android development. I love
              translating thoughtful UI into resilient products — from booking platforms to medical apps —
              with an obsession for detail, motion, and accessibility.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Curious", "Detail-driven", "Calm under pressure", "Lifelong learner", "Design-aware"].map((t) => (
                <span key={t} className="rounded-full border border-border glass px-4 py-1.5 text-xs text-foreground/80">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" label="02 / Skills">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              A toolkit built for <span className="text-gradient">shipping</span>.
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              From React frontends to Kotlin mobile apps and PostgreSQL schemas — a stack tuned for
              full-stack product work.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["Frontend", "React · TS · Tailwind"],
                ["Backend", "Node · Express · REST"],
                ["Database", "PostgreSQL"],
                ["Mobile", "Kotlin · Android · MVVM"],
                ["Design", "UI/UX · Figma"],
                ["Arch", "MVC · Clean code"],
              ].map(([k, v]) => (
                <li key={k}>
                  <div className="text-xs uppercase tracking-widest text-accent">{k}</div>
                  <div className="mt-1 text-foreground/90">{v}</div>
                </li>
              ))}
            </ul>
          </div>
          <SkillsOrbit />
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" label="03 / Selected work">
        <h2 className="font-display text-4xl font-semibold sm:text-5xl">
          Featured <span className="text-gradient">projects</span>.
        </h2>
        <div className="mt-14 grid gap-8">
          <ProjectCard
            index={0}
            title="Family Care"
            tagline="Full-stack platform · 2024"
            description="A home services booking platform connecting clients with verified providers. Three role-based dashboards (client, provider, admin) with bookings, scheduling, and review flows."
            tags={["React", "Node.js", "Express", "PostgreSQL", "REST"]}
            demo="#"
            repo="#"
            visual={<ProjectVisual gradient="linear-gradient(135deg, oklch(0.68 0.25 295), oklch(0.55 0.2 280))" label="FC" />}
          />
          <ProjectCard
            index={1}
            title="MediConnect"
            tagline="Android · Kotlin · 2024"
            description="A native Android app for managing medical appointments with patients and clinics. Built with Kotlin and MVVM architecture for a clean separation of concerns."
            tags={["Kotlin", "Android", "MVVM", "Material 3"]}
            demo="#"
            repo="#"
            visual={<ProjectVisual gradient="linear-gradient(135deg, oklch(0.82 0.16 200), oklch(0.65 0.18 220))" label="MC" />}
          />
        </div>
      </Section>

      {/* CONTACT */}
      <section id="contact" className="relative z-0 overflow-hidden py-32">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          {mounted && (
            <Suspense fallback={null}>
              <ContactScene />
            </Suspense>
          )}
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">04 / Contact</span>
          <h2 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">
            Let's build <span className="text-gradient">something</span>.
          </h2>
<form
  onSubmit={handleSubmit}
  className="mx-auto mt-10 grid max-w-xl gap-4 text-left"
>
  <input data-hoverable name="name" required placeholder="Your name"
    className="rounded-2xl border border-border bg-background/40 px-5 py-4 text-sm outline-none transition focus:border-primary glass" />
  <input data-hoverable name="email" type="email" required placeholder="Email"
    className="rounded-2xl border border-border bg-background/40 px-5 py-4 text-sm outline-none transition focus:border-primary glass" />
  <textarea data-hoverable name="message" required rows={4} placeholder="Tell me about your project…"
    className="resize-none rounded-2xl border border-border bg-background/40 px-5 py-4 text-sm outline-none transition focus:border-primary glass" />
  <button data-hoverable type="submit"
    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.01]">
    Send message <Mail className="h-4 w-4" />
  </button>
</form>
{status === "sending" && <p className="mt-4 text-sm text-muted-foreground">Sending…</p>}
{status === "ok" && <p className="mt-4 text-sm text-accent">Thanks! I'll get back to you soon.</p>}
{status === "error" && <p className="mt-4 text-sm text-destructive">Something went wrong. Please email me directly.</p>}
          <form
            onSubmit={(e) => { e.preventDefault(); window.location.href = "mailto:hello@malak.dev"; }}
            className="mx-auto mt-10 grid max-w-xl gap-4 text-left"
          >
            <input data-hoverable required placeholder="Your name" className="rounded-2xl border border-border bg-background/40 px-5 py-4 text-sm outline-none transition focus:border-primary glass" />
            <input data-hoverable required type="email" placeholder="Email" className="rounded-2xl border border-border bg-background/40 px-5 py-4 text-sm outline-none transition focus:border-primary glass" />
            <textarea data-hoverable required rows={4} placeholder="Tell me about your project…" className="resize-none rounded-2xl border border-border bg-background/40 px-5 py-4 text-sm outline-none transition focus:border-primary glass" />
            <button data-hoverable type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.01]">
              Send message <Mail className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-12 flex justify-center gap-3">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:hello@malak.dev", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} data-hoverable className="rounded-full border border-border glass p-3 transition hover:border-primary hover:text-primary">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        
      </section>

      <footer className="relative z-10 border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Malak · Crafted with care in Algeria
      </footer>
    </div>
  );
}

function Nav() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="fixed inset-x-0 top-6 z-50 mx-auto flex w-[min(92%,720px)] items-center justify-between rounded-full glass px-5 py-3"
    >
      <a href="#top" data-hoverable className="font-display text-sm font-semibold">
        <span className="text-gradient">Malak</span>
      </a>
      <div className="hidden gap-1 sm:flex">
        {[
          ["About", "#about"],
          ["Skills", "#skills"],
          ["Work", "#projects"],
          ["Contact", "#contact"],
        ].map(([l, h]) => (
          <a key={l} href={h} data-hoverable className="rounded-full px-3 py-1.5 text-xs text-foreground/80 transition hover:bg-secondary hover:text-foreground">
            {l}
          </a>
        ))}
      </div>
      <a href="#contact" data-hoverable className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90">
        Hire me
      </a>
    </motion.nav>
  );
}

function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 sm:py-36">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mb-10 text-xs uppercase tracking-[0.3em] text-accent">{label}</div>
        {children}
      </motion.div>
    </section>
  );
}

function ProjectVisual({ gradient, label }: { gradient: string; label: string }) {
  return (
    <div className="relative h-full w-full" style={{ background: gradient }}>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />
      <div className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-foreground/80 mix-blend-overlay">
        {label}
      </div>
    </div>
  );
}

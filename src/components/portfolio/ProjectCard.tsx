import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

interface Props {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  visual: ReactNode;
  demo?: string;
  repo?: string;
  index: number;
}

export function ProjectCard({ title, tagline, description, tags, visual, demo, repo, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.article
      ref={ref}
      data-hoverable
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl glass p-6 sm:p-8 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-glow)]"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: "linear-gradient(135deg, oklch(0.68 0.25 295 / 0.4), transparent 40%, oklch(0.82 0.16 200 / 0.3))", mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)", maskComposite: "exclude", padding: 1 }}
      />
      <div className="relative grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary/40">
          {visual}
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{tagline}</span>
          <h3 className="mt-2 font-display text-3xl font-semibold">{title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-foreground/80">{t}</span>
            ))}
          </div>
          <div className="mt-auto flex gap-3 pt-6">
            {demo && (
              <a href={demo} data-hoverable className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                Live demo <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {repo && (
              <a href={repo} data-hoverable className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/90 transition hover:bg-secondary">
                <Github className="h-4 w-4" /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

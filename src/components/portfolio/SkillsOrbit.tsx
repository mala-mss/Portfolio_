import { motion } from "framer-motion";

const skills = [
  "React", "TypeScript", "Node.js", "Express", "PostgreSQL",
  "Kotlin", "Android", "UI/UX", "MVC", "REST APIs", "Tailwind", "Git",
];

export function SkillsOrbit() {
  const rings = [
    { radius: 130, count: 5, duration: 30, items: skills.slice(0, 5) },
    { radius: 220, count: 7, duration: 45, items: skills.slice(5, 12) },
  ];

  return (
    <div className="relative mx-auto flex h-[480px] w-full max-w-xl items-center justify-center sm:h-[560px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-40 w-40 rounded-full" style={{ background: "var(--gradient-glow)" }} />
      </div>
      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full glass shadow-[var(--shadow-glow)]">
        <span className="text-gradient font-display text-xl font-bold">M</span>
      </div>

      {rings.map((ring, ri) => (
        <motion.div
          key={ri}
          className="absolute inset-0"
          animate={{ rotate: ri % 2 === 0 ? 360 : -360 }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute left-1/2 top-1/2 rounded-full border border-border"
            style={{ width: ring.radius * 2, height: ring.radius * 2, transform: "translate(-50%, -50%)" }}
          />
          {ring.items.map((s, i) => {
            const angle = (i / ring.count) * Math.PI * 2;
            const x = Math.cos(angle) * ring.radius;
            const y = Math.sin(angle) * ring.radius;
            return (
              <motion.div
                key={s}
                className="absolute left-1/2 top-1/2"
                style={{ x, y }}
                animate={{ rotate: ri % 2 === 0 ? -360 : 360 }}
                transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
              >
                <div
                  data-hoverable
                  className="glass -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium text-foreground/90 transition hover:border-primary/60 hover:text-primary"
                >
                  {s}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}

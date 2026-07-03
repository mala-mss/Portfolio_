import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement;
      setHover(!!el.closest("a, button, [data-hoverable]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full mix-blend-screen"
        animate={{
          x: pos.x - (hover ? 24 : 8),
          y: pos.y - (hover ? 24 : 8),
          width: hover ? 48 : 16,
          height: hover ? 48 : 16,
          opacity: hover ? 0.4 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.3 }}
        style={{ background: "var(--gradient-aurora)", filter: "blur(2px)" }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-foreground"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: "spring", stiffness: 1200, damping: 40 }}
      />
    </>
  );
}

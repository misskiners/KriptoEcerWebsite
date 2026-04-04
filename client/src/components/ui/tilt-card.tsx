import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function TiltCard({ children, className, strength = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 260,
    damping: 22,
  });
  const glowX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(rawY, [-0.5, 0.5], [0, 100]);

  function setFromPointer(clientX: number, clientY: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((clientX - rect.left) / rect.width - 0.5);
    rawY.set((clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div style={{ perspective: "900px" }} className={className}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => setFromPointer(e.clientX, e.clientY)}
        onMouseLeave={reset}
        onTouchMove={(e) => {
          e.preventDefault();
          const t = e.touches[0];
          setFromPointer(t.clientX, t.clientY);
        }}
        onTouchEnd={reset}
        className="relative h-full"
      >
        {children}

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, hsl(var(--primary)/0.12), transparent 60%)`
            ),
          }}
        />
      </motion.div>
    </div>
  );
}

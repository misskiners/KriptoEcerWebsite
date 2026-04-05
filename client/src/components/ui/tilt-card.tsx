import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const SPRING_CONFIG = { stiffness: 260, damping: 26, mass: 1 };

export function TiltCard({ children, className, strength = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const noMotion = !!useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [strength, -strength]), SPRING_CONFIG);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-strength, strength]), SPRING_CONFIG);
  const glowX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(rawY, [-0.5, 0.5], [0, 100]);

  function setFromPointer(clientX: number, clientY: number) {
    if (noMotion) return;
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
    <div style={{ perspective: noMotion ? "none" : "900px" }} className={className}>
      <motion.div
        ref={ref}
        style={noMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => setFromPointer(e.clientX, e.clientY)}
        onMouseLeave={reset}
        className="relative h-full"
      >
        {children}

        {!noMotion && (
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
        )}
      </motion.div>
    </div>
  );
}

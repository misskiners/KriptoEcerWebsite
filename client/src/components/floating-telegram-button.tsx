import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Side = "bottom-right" | "bottom-left";

/* Bot visual constants */
const BOT_W  = 68;
const BOT_H  = 96;
const PEEK   = 64;   // how many px are visible when peeking
const HIDE   = BOT_H - PEEK;  // 32px hidden below fold

const MOBILE_SIDES: Side[] = ["bottom-right", "bottom-left"];

/* ─────────────────────────────────────────────────────────────────────
   BotCharacter — kawaii round-head bot peeking from the bottom edge.
   Hands are two clean mitten-shapes right at the fold line.
───────────────────────────────────────────────────────────────────── */
function BotCharacter() {
  return (
    <svg
      width={BOT_W}
      height={BOT_H}
      viewBox="0 0 68 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="faceGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#FFE04A" />
          <stop offset="100%" stopColor="#F09000" />
        </radialGradient>
        <radialGradient id="handGrad" cx="40%" cy="25%" r="70%">
          <stop offset="0%"   stopColor="#FFD030" />
          <stop offset="100%" stopColor="#D97C00" />
        </radialGradient>
      </defs>

      {/* ── Antenna ─────────────────────────────────────── */}
      <rect  x="32" y="0"  width="4"  height="10" rx="2"  fill="#C07000" />
      <circle cx="34" cy="1" r="5"   fill="#D98000" />
      <circle cx="34" cy="1" r="3.2" fill="#FFE566" />
      <circle cx="33" cy="0.2" r="1.2" fill="white" fillOpacity="0.55" />

      {/* ── Round head ──────────────────────────────────── */}
      <circle cx="34" cy="36" r="28" fill="url(#faceGrad)" />
      {/* Top gloss */}
      <ellipse cx="27" cy="22" rx="10" ry="6" fill="white" fillOpacity="0.18" />

      {/* ── Left eye ────────────────────────────────────── */}
      {/* Sclera */}
      <circle cx="24" cy="34" r="9.5"  fill="white" />
      {/* Iris */}
      <circle cx="25" cy="35" r="6"    fill="#1A1A2E" />
      {/* Colour ring */}
      <circle cx="25" cy="35" r="4"    fill="#2266EE" />
      {/* Pupil */}
      <circle cx="25.5" cy="35.5" r="2.2" fill="#050A14" />
      {/* Shine */}
      <circle cx="23"   cy="32.5" r="1.8" fill="white" fillOpacity="0.9" />
      <circle cx="27"   cy="37"   r="0.9" fill="white" fillOpacity="0.5" />

      {/* ── Right eye ───────────────────────────────────── */}
      <circle cx="44" cy="34" r="9.5"  fill="white" />
      <circle cx="45" cy="35" r="6"    fill="#1A1A2E" />
      <circle cx="45" cy="35" r="4"    fill="#2266EE" />
      <circle cx="45.5" cy="35.5" r="2.2" fill="#050A14" />
      <circle cx="43"   cy="32.5" r="1.8" fill="white" fillOpacity="0.9" />
      <circle cx="47"   cy="37"   r="0.9" fill="white" fillOpacity="0.5" />

      {/* ── Rosy cheeks ─────────────────────────────────── */}
      <ellipse cx="16" cy="44" rx="6"  ry="3.5" fill="#FF9966" fillOpacity="0.4" />
      <ellipse cx="52" cy="44" rx="6"  ry="3.5" fill="#FF9966" fillOpacity="0.4" />

      {/* ── Mouth (tiny cute arc) ───────────────────────── */}
      <path d="M27 48 Q34 54 41 48" stroke="#B05000" strokeWidth="2.2"
            strokeLinecap="round" fill="none" />

      {/* ═══════════════════════════════════════════════════
          HANDS — mitten-style, sit right at the fold line.
          y ≈ 62–80 → partially visible (PEEK = 64).
          Looks like the bot is gripping the screen edge.
      ═══════════════════════════════════════════════════ */}

      {/* Left mitten */}
      <rect x="1"  y="60" width="24" height="20" rx="10" fill="url(#handGrad)" />
      {/* Left thumb nub */}
      <ellipse cx="4"  cy="60" rx="5" ry="7" fill="#F0A020" />
      {/* Left mitten highlight */}
      <ellipse cx="10" cy="64" rx="5" ry="3" fill="white" fillOpacity="0.18" />

      {/* Right mitten */}
      <rect x="43" y="60" width="24" height="20" rx="10" fill="url(#handGrad)" />
      {/* Right thumb nub */}
      <ellipse cx="64" cy="60" rx="5" ry="7" fill="#F0A020" />
      {/* Right mitten highlight */}
      <ellipse cx="58" cy="64" rx="5" ry="3" fill="white" fillOpacity="0.18" />

      {/* Body (below fold, mostly hidden) */}
      <rect x="12" y="78" width="44" height="18" rx="10" fill="#D98000" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function getSideProps(side: Side) {
  const base = {
    peekOffset:   { y: HIDE },
    hiddenOffset: { y: BOT_H + 20 },
    bobAnimate:   { y: [0, -10, 0] },
  };
  if (side === "bottom-left") {
    return {
      ...base,
      containerStyle: { bottom: 0, left: 20 } as React.CSSProperties,
      bubbleClass: "absolute bottom-[calc(100%+10px)] left-0 w-52",
    };
  }
  return {
    ...base,
    containerStyle: { bottom: 0, right: 20 } as React.CSSProperties,
    bubbleClass: "absolute bottom-[calc(100%+10px)] right-0 w-52",
  };
}

/* ─────────────────────────────────────────────────────────────────── */

export function FloatingTelegramButton() {
  const [scrolled,   setScrolled]   = useState(false);
  const [dismissed,  setDismissed]  = useState(false);
  const [revealed,   setRevealed]   = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const [side] = useState<Side>(() => {
    if (typeof window === "undefined") return "bottom-right";
    return window.innerWidth < 768
      ? MOBILE_SIDES[Math.floor(Math.random() * MOBILE_SIDES.length)]
      : "bottom-right";
  });

  useEffect(() => {
    const onScroll = () => { if (!dismissed) setScrolled(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  useEffect(() => {
    if (!scrolled || dismissed) { setRevealed(false); setShowBubble(false); return; }
    const t1 = setTimeout(() => setRevealed(true),   1800);
    const t2 = setTimeout(() => setShowBubble(true), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [scrolled, dismissed]);

  if (dismissed) return null;

  const { containerStyle, peekOffset, hiddenOffset, bobAnimate, bubbleClass } = getSideProps(side);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          className="fixed z-50"
          style={containerStyle}
          initial={{ y: hiddenOffset.y, opacity: 0 }}
          animate={{ y: revealed ? 0 : peekOffset.y, opacity: 1 }}
          exit={{ y: hiddenOffset.y, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          <div className="relative">
            <motion.a
              href="https://t.me/kriptoecerbot"
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
              data-testid="button-floating-telegram"
              aria-label="Buka KriptoEcer Bot"
              animate={!revealed ? bobAnimate : { y: 0 }}
              transition={
                !revealed
                  ? { duration: 1.8, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.94 }}
            >
              <BotCharacter />
            </motion.a>

            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.82, y: 6 }}
                  animate={{ opacity: 1, scale: 1,    y: 0 }}
                  exit={{    opacity: 0, scale: 0.82, y: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className={`${bubbleClass} bg-card border border-border rounded-2xl shadow-xl shadow-black/10 px-4 py-3`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-xs font-semibold text-green-500">Bot Online</span>
                  </div>
                  <p className="text-sm font-bold leading-snug mb-2">Beli crypto mulai Rp10.000!</p>
                  <a
                    href="https://t.me/kriptoecerbot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Buka Bot →
                  </a>
                  <button
                    onClick={() => setDismissed(true)}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                    data-testid="button-floating-dismiss"
                    aria-label="Tutup"
                  >
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

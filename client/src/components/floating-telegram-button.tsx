import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Side = "bottom-right" | "bottom-left";

const BOT_W = 72;
const BOT_H = 100;
const PEEK = 70;
const HIDE = BOT_H - PEEK;

const MOBILE_SIDES: Side[] = ["bottom-right", "bottom-left"];

/* ------------------------------------------------------------------ */
/* Bot character: face + gripping hands + hidden body                  */
/* When peeking: hands appear right at the viewport bottom edge        */
/* ------------------------------------------------------------------ */
function BotCharacter() {
  return (
    <svg
      width={BOT_W}
      height={BOT_H}
      viewBox="0 0 72 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bg" cx="38%" cy="25%" r="72%">
          <stop offset="0%" stopColor="#FFD84D" />
          <stop offset="100%" stopColor="#E8960A" />
        </radialGradient>
        <radialGradient id="eyeL" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#55EEFF" />
          <stop offset="65%" stopColor="#00AAEE" />
          <stop offset="100%" stopColor="#0077BB" />
        </radialGradient>
        <radialGradient id="eyeR" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#55EEFF" />
          <stop offset="65%" stopColor="#00AAEE" />
          <stop offset="100%" stopColor="#0077BB" />
        </radialGradient>
      </defs>

      {/* ── Antenna ── */}
      <rect x="34" y="0" width="4" height="12" rx="2" fill="#B86A00" />
      <circle cx="36" cy="1" r="5" fill="#D47A00" />
      <circle cx="36" cy="1" r="3" fill="#FFE033" />
      <circle cx="35" cy="0.5" r="1.2" fill="white" fillOpacity="0.55" />

      {/* ── Robot head (rounded-rect) ── */}
      <rect x="6" y="10" width="60" height="54" rx="16" fill="url(#bg)" />

      {/* Top highlight */}
      <rect x="12" y="10" width="48" height="7" rx="5" fill="white" fillOpacity="0.17" />

      {/* Ear bumps */}
      <circle cx="6"  cy="36" r="6" fill="#C17A00" />
      <circle cx="66" cy="36" r="6" fill="#C17A00" />
      <circle cx="6"  cy="36" r="3.5" fill="#D98C00" />
      <circle cx="66" cy="36" r="3.5" fill="#D98C00" />

      {/* Dark visor housing the eyes */}
      <rect x="10" y="22" width="52" height="26" rx="9" fill="#0b1520" fillOpacity="0.88" />

      {/* ── Left eye ── */}
      <rect x="13" y="25" width="20" height="18" rx="6" fill="#050e1a" />
      <rect x="15" y="27" width="16" height="14" rx="5" fill="url(#eyeL)" />
      <rect x="17" y="29" width="10" height="8"  rx="3" fill="#88F0FF" fillOpacity="0.55" />
      <rect x="18" y="30" width="5"  height="2.5" rx="1.2" fill="white" fillOpacity="0.8" />

      {/* ── Right eye ── */}
      <rect x="39" y="25" width="20" height="18" rx="6" fill="#050e1a" />
      <rect x="41" y="27" width="16" height="14" rx="5" fill="url(#eyeR)" />
      <rect x="43" y="29" width="10" height="8"  rx="3" fill="#88F0FF" fillOpacity="0.55" />
      <rect x="44" y="30" width="5"  height="2.5" rx="1.2" fill="white" fillOpacity="0.8" />

      {/* ── Speaker / mouth grille ── */}
      <rect x="22" y="52" width="28" height="8" rx="4" fill="#0b1520" fillOpacity="0.6" />
      <circle cx="29" cy="56" r="2" fill="#F5B80A" fillOpacity="0.75" />
      <circle cx="36" cy="56" r="2" fill="#F5B80A" fillOpacity="0.75" />
      <circle cx="43" cy="56" r="2" fill="#F5B80A" fillOpacity="0.75" />

      {/* ── Rivets ── */}
      <circle cx="13" cy="16" r="2.2" fill="#C17A00" />
      <circle cx="59" cy="16" r="2.2" fill="#C17A00" />
      <circle cx="13" cy="57" r="2.2" fill="#C17A00" />
      <circle cx="59" cy="57" r="2.2" fill="#C17A00" />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* GRIPPING HANDS — appear right at the viewport bottom edge  */}
      {/* Fingers point upward, palms grip the edge from below       */}
      {/* ═══════════════════════════════════════════════════════════ */}

      {/* Left hand — fingers */}
      <rect x="5"  y="58" width="7" height="13" rx="3.5" fill="#D47A00" />
      <rect x="14" y="56" width="7" height="15" rx="3.5" fill="#E8960A" />
      <rect x="23" y="58" width="7" height="12" rx="3.5" fill="#D47A00" />
      {/* Left palm */}
      <rect x="3"  y="68" width="30" height="14" rx="8"  fill="#E8960A" />

      {/* Right hand — fingers */}
      <rect x="60" y="58" width="7" height="13" rx="3.5" fill="#D47A00" />
      <rect x="51" y="56" width="7" height="15" rx="3.5" fill="#E8960A" />
      <rect x="42" y="58" width="7" height="12" rx="3.5" fill="#D47A00" />
      {/* Right palm */}
      <rect x="39" y="68" width="30" height="14" rx="8"  fill="#E8960A" />

      {/* ── Body (mostly hidden below viewport) ── */}
      <ellipse cx="36" cy="90" rx="22" ry="12" fill="#D47A00" />
      <ellipse cx="36" cy="88" rx="16" ry="9"  fill="#E8960A" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

function getSideProps(side: Side) {
  switch (side) {
    case "bottom-right":
      return {
        containerStyle: { bottom: 0, right: 16 } as React.CSSProperties,
        peekOffset:     { x: 0, y: HIDE },
        hiddenOffset:   { x: 0, y: BOT_H + 24 },
        bobAnimate:     { y: [0, -9, 0] },
        bubbleClass:    "absolute bottom-[calc(100%+10px)] right-0 w-52",
      };
    case "bottom-left":
      return {
        containerStyle: { bottom: 0, left: 16 } as React.CSSProperties,
        peekOffset:     { x: 0, y: HIDE },
        hiddenOffset:   { x: 0, y: BOT_H + 24 },
        bobAnimate:     { y: [0, -9, 0] },
        bubbleClass:    "absolute bottom-[calc(100%+10px)] left-0 w-52",
      };
  }
}

/* ------------------------------------------------------------------ */

export function FloatingTelegramButton() {
  const [scrolled,   setScrolled]   = useState(false);
  const [dismissed,  setDismissed]  = useState(false);
  const [revealed,   setRevealed]   = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const [side] = useState<Side>(() => {
    if (typeof window === "undefined") return "bottom-right";
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return "bottom-right";
    return MOBILE_SIDES[Math.floor(Math.random() * MOBILE_SIDES.length)];
  });

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  useEffect(() => {
    if (!scrolled || dismissed) {
      setRevealed(false);
      setShowBubble(false);
      return;
    }
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
          initial={{ x: hiddenOffset.x, y: hiddenOffset.y, opacity: 0 }}
          animate={{
            x: 0,
            y: revealed ? 0 : peekOffset.y,
            opacity: 1,
          }}
          exit={{ x: hiddenOffset.x, y: hiddenOffset.y, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          <div className="relative">
            {/* Bot — bob while peeking, still when revealed */}
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
                  ? { duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
            >
              <BotCharacter />
            </motion.a>

            {/* Speech bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className={`${bubbleClass} absolute bg-card border border-border rounded-2xl shadow-xl shadow-black/10 px-4 py-3`}
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

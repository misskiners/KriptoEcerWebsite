import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Side = "bottom-right" | "bottom-left";

const BOT_W  = 64;
const BOT_H  = 72;
const PEEK   = 46;           // eyes + top of head visible
const HIDE   = BOT_H - PEEK; // 26px below fold

const MOBILE_SIDES: Side[] = ["bottom-right", "bottom-left"];

/* ─────────────────────────────────────────────────────────────────────
   BotFace — compact round-rect robot that peeks from the bottom.
   Design language: flat, clean, tech-cute. No gimmicky hands.
   Key: big glowing eyes carry all the personality.
───────────────────────────────────────────────────────────────────── */
function BotFace() {
  return (
    <svg
      width={BOT_W}
      height={BOT_H}
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Amber shell gradient — brand colour */}
        <radialGradient id="shell" cx="35%" cy="20%" r="75%">
          <stop offset="0%"   stopColor="#FFE04D" />
          <stop offset="60%"  stopColor="#F5B80A" />
          <stop offset="100%" stopColor="#CC8800" />
        </radialGradient>

        {/* Amber-dark ear gradient */}
        <radialGradient id="earG" cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#E8A020" />
          <stop offset="100%" stopColor="#A06000" />
        </radialGradient>

        {/* Cyan eye glow */}
        <radialGradient id="eyeG" cx="40%" cy="35%" r="60%">
          <stop offset="0%"   stopColor="#88FFFF" />
          <stop offset="55%"  stopColor="#00E0F0" />
          <stop offset="100%" stopColor="#00A8CC" />
        </radialGradient>

        {/* Drop shadow */}
        <filter id="sh" x="-25%" y="-20%" width="150%" height="170%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#00000030" />
        </filter>

        {/* Cyan glow around eyes */}
        <filter id="eyeGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ── Top purple bump (antenna area) ── */}
      <ellipse cx="32" cy="10" rx="10" ry="9" fill="url(#earG)" />
      {/* bump highlight */}
      <ellipse cx="29" cy="7"  rx="4"  ry="3" fill="white" fillOpacity="0.25" />

      {/* ── White outer shell ── */}
      <rect x="5" y="14" width="54" height="54" rx="20"
            fill="url(#shell)" filter="url(#sh)" />

      {/* Shell inner bevel / edge lighting */}
      <rect x="6" y="15" width="52" height="52" rx="19"
            fill="none" stroke="#FFF0A0" strokeOpacity="0.55" strokeWidth="1.5" />
      {/* Top gloss highlight */}
      <ellipse cx="28" cy="20" rx="14" ry="6" fill="white" fillOpacity="0.22" />

      {/* ── Left purple ear ── */}
      <ellipse cx="5"  cy="41" rx="6.5" ry="9" fill="url(#earG)" />
      <ellipse cx="3"  cy="38" rx="2.5" ry="3" fill="white" fillOpacity="0.22" />

      {/* ── Right purple ear ── */}
      <ellipse cx="59" cy="41" rx="6.5" ry="9" fill="url(#earG)" />
      <ellipse cx="57" cy="38" rx="2.5" ry="3" fill="white" fillOpacity="0.22" />

      {/* ── Dark visor / face screen ── */}
      <rect x="12" y="22" width="40" height="38" rx="13" fill="#16182E" />

      {/* Visor inner rim highlight */}
      <rect x="13" y="23" width="38" height="36" rx="12"
            fill="none" stroke="#2A2D50" strokeWidth="1" />

      {/* ── Left cyan eye ── */}
      <circle cx="25" cy="37" r="5.5" fill="url(#eyeG)" filter="url(#eyeGlow)" />
      <circle cx="25" cy="37" r="3"   fill="#CCFFFE" fillOpacity="0.6" />
      <circle cx="23" cy="35" r="1.5" fill="white"   fillOpacity="0.8" />

      {/* ── Right cyan eye ── */}
      <circle cx="39" cy="37" r="5.5" fill="url(#eyeG)" filter="url(#eyeGlow)" />
      <circle cx="39" cy="37" r="3"   fill="#CCFFFE" fillOpacity="0.6" />
      <circle cx="37" cy="35" r="1.5" fill="white"   fillOpacity="0.8" />

      {/* ── Cyan smile ── */}
      <path d="M22 48 Q32 57 42 48"
            stroke="#00E8F8" strokeWidth="2.5"
            strokeLinecap="round" fill="none" />
      {/* smile glow */}
      <path d="M22 48 Q32 57 42 48"
            stroke="#00E8F8" strokeWidth="5" strokeLinecap="round"
            fill="none" opacity="0.18" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function getSideProps(side: Side) {
  const shared = {
    peekOffset:   { y: HIDE },
    hiddenOffset: { y: BOT_H + 20 },
    bobAnimate:   { y: [0, -8, 0] },
  };
  return side === "bottom-left"
    ? { ...shared, containerStyle: { bottom: 0, left: 20 } as React.CSSProperties,
                   bubbleClass: "absolute bottom-[calc(100%+10px)] left-0 w-52" }
    : { ...shared, containerStyle: { bottom: 0, right: 20 } as React.CSSProperties,
                   bubbleClass: "absolute bottom-[calc(100%+10px)] right-0 w-52" };
}

/* ─────────────────────────────────────────────────────────────────── */

const SNOOZE_MS = 45_000; // muncul lagi 45 detik setelah di-close

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
    const fn = () => { if (!dismissed) setScrolled(window.scrollY > 400); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [dismissed]);

  useEffect(() => {
    if (!scrolled || dismissed) { setRevealed(false); setShowBubble(false); return; }
    const t1 = setTimeout(() => setRevealed(true),   1800);
    const t2 = setTimeout(() => setShowBubble(true), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [scrolled, dismissed]);

  /* Auto-unsnooze: muncul lagi setelah SNOOZE_MS */
  function handleDismiss() {
    setDismissed(true);
    setRevealed(false);
    setShowBubble(false);
    setTimeout(() => setDismissed(false), SNOOZE_MS);
  }

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
          transition={{ type: "spring", stiffness: 170, damping: 20 }}
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
                  ? { duration: 1.6, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.93 }}
            >
              <BotFace />
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
                    onClick={handleDismiss}
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

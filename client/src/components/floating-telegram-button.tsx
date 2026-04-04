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
        {/* Body gradient — amber brand colour */}
        <radialGradient id="body" cx="38%" cy="22%" r="72%">
          <stop offset="0%"   stopColor="#FFE04D" />
          <stop offset="100%" stopColor="#E89000" />
        </radialGradient>

        {/* Left-eye glow */}
        <radialGradient id="elg" cx="40%" cy="38%" r="60%">
          <stop offset="0%"   stopColor="#60F4FF" />
          <stop offset="55%"  stopColor="#18AAEE" />
          <stop offset="100%" stopColor="#0066CC" />
        </radialGradient>

        {/* Right-eye glow — same */}
        <radialGradient id="erg" cx="40%" cy="38%" r="60%">
          <stop offset="0%"   stopColor="#60F4FF" />
          <stop offset="55%"  stopColor="#18AAEE" />
          <stop offset="100%" stopColor="#0066CC" />
        </radialGradient>

        {/* Soft shadow under the head */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0004" />
        </filter>
      </defs>

      {/* ── Antenna stem ── */}
      <rect x="30" y="0" width="4" height="10" rx="2" fill="#B07000" />

      {/* ── Antenna ball — glows amber ── */}
      <circle cx="32" cy="1.5" r="5.5" fill="#CC8800" />
      <circle cx="32" cy="1.5" r="3.5" fill="#FFD700" />
      <circle cx="31" cy="0.8" r="1.4" fill="white" fillOpacity="0.55" />

      {/* ── Robot head — rounded-rect, NOT a circle ── */}
      <rect x="4" y="10" width="56" height="56" rx="16"
            fill="url(#body)" filter="url(#shadow)" />

      {/* Top-edge gloss */}
      <rect x="10" y="10" width="44" height="8" rx="6"
            fill="white" fillOpacity="0.2" />

      {/* ── Side sensor rivets ── */}
      <circle cx="4"  cy="36" r="4.5" fill="#C07800" />
      <circle cx="4"  cy="36" r="2.5" fill="#DDA000" />
      <circle cx="60" cy="36" r="4.5" fill="#C07800" />
      <circle cx="60" cy="36" r="2.5" fill="#DDA000" />

      {/* ── Dark visor panel ── */}
      <rect x="9" y="20" width="46" height="24" rx="8"
            fill="#0A1525" fillOpacity="0.9" />

      {/* ── Left eye ── */}
      <circle cx="24" cy="32" r="8"   fill="#040C1C" />
      <circle cx="24" cy="32" r="6.5" fill="url(#elg)" />
      <circle cx="24" cy="32" r="3.5" fill="#90F0FF" fillOpacity="0.55" />
      {/* shine */}
      <circle cx="21.5" cy="29.5" r="2"   fill="white" fillOpacity="0.85" />
      <circle cx="26.5" cy="34.5" r="1"   fill="white" fillOpacity="0.35" />

      {/* ── Right eye ── */}
      <circle cx="40" cy="32" r="8"   fill="#040C1C" />
      <circle cx="40" cy="32" r="6.5" fill="url(#erg)" />
      <circle cx="40" cy="32" r="3.5" fill="#90F0FF" fillOpacity="0.55" />
      {/* shine */}
      <circle cx="37.5" cy="29.5" r="2"   fill="white" fillOpacity="0.85" />
      <circle cx="42.5" cy="34.5" r="1"   fill="white" fillOpacity="0.35" />

      {/* ── Cute pixel-smile (3 dots) ── */}
      <circle cx="24" cy="51" r="2" fill="#0A1525" fillOpacity="0.55" />
      <circle cx="32" cy="53" r="2" fill="#0A1525" fillOpacity="0.55" />
      <circle cx="40" cy="51" r="2" fill="#0A1525" fillOpacity="0.55" />

      {/* ── Bottom corner rivets ── */}
      <circle cx="12" cy="60" r="2.2" fill="#C07800" />
      <circle cx="52" cy="60" r="2.2" fill="#C07800" />
      <circle cx="12" cy="16" r="2.2" fill="#C07800" />
      <circle cx="52" cy="16" r="2.2" fill="#C07800" />
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

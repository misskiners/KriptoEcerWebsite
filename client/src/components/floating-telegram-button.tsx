import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import { SiTelegram } from "react-icons/si";

type Side = "bottom-right" | "bottom-left";

const BOT_W  = 68;
const BOT_H  = 76;
const PEEK   = 48;
const HIDE   = BOT_H - PEEK;

const MOBILE_SIDES: Side[] = ["bottom-right", "bottom-left"];

/* ─────────────────────────────────────────────────────────────────────
   BotFace — modern, clean, brand-aligned robot face
───────────────────────────────────────────────────────────────────── */
function BotFace() {
  return (
    <svg
      width={BOT_W}
      height={BOT_H}
      viewBox="0 0 68 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main body gradient — brand amber */}
        <linearGradient id="bodyG" x1="34" y1="14" x2="34" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#FFD84D" />
          <stop offset="100%" stopColor="#E8A800" />
        </linearGradient>

        {/* Body rim highlight */}
        <linearGradient id="rimG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFE870" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#CC8800" stopOpacity="0.3" />
        </linearGradient>

        {/* Ear gradient */}
        <linearGradient id="earG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#D49500" />
          <stop offset="100%" stopColor="#A06800" />
        </linearGradient>

        {/* Eye iris gradient — electric blue */}
        <radialGradient id="irisG" cx="38%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#7DF9FF" />
          <stop offset="50%"  stopColor="#00C8E8" />
          <stop offset="100%" stopColor="#006ECC" />
        </radialGradient>

        {/* Eye outer glow */}
        <filter id="eyeGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="0 0 0 0 0  0 0.8 0.9 0 0  0 0 1 0 0  0 0 0 1.4 0" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>

        {/* Body shadow */}
        <filter id="bodyShad" x="-20%" y="-10%" width="140%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.3" />
        </filter>

        {/* Visor inner glow */}
        <radialGradient id="visorG" cx="50%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#1E2240" />
          <stop offset="100%" stopColor="#0A0D1E" />
        </radialGradient>

        {/* Antenna glow */}
        <radialGradient id="antG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#60EFFF" />
          <stop offset="100%" stopColor="#00AADD" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Antenna dot ── */}
      <circle cx="34" cy="7" r="4" fill="#00CCEE" opacity="0.9" />
      <circle cx="34" cy="7" r="7" fill="url(#antG)" opacity="0.5" />
      {/* antenna stem */}
      <rect x="32.5" y="7" width="3" height="8" rx="1.5" fill="#D49500" />

      {/* ── Body — rounded rect ── */}
      <rect x="5" y="15" width="58" height="57" rx="22"
        fill="url(#bodyG)" filter="url(#bodyShad)" />
      {/* rim stroke */}
      <rect x="5.75" y="15.75" width="56.5" height="55.5" rx="21.25"
        fill="none" stroke="url(#rimG)" strokeWidth="1.5" />
      {/* gloss sheen */}
      <ellipse cx="30" cy="22" rx="15" ry="5.5" fill="white" fillOpacity="0.28" />

      {/* ── Ears ── */}
      <rect x="0" y="34" width="8" height="18" rx="4"
        fill="url(#earG)" />
      <rect x="60" y="34" width="8" height="18" rx="4"
        fill="url(#earG)" />
      {/* ear highlights */}
      <ellipse cx="3"  cy="38" rx="1.8" ry="3.5" fill="white" fillOpacity="0.2" />
      <ellipse cx="65" cy="38" rx="1.8" ry="3.5" fill="white" fillOpacity="0.2" />

      {/* ── Visor ── */}
      <rect x="13" y="23" width="42" height="40" rx="15"
        fill="url(#visorG)" />
      {/* visor glass highlight */}
      <rect x="14" y="24" width="40" height="38" rx="14"
        fill="none" stroke="#2E335A" strokeWidth="1" />
      <ellipse cx="27" cy="29" rx="9" ry="3.5" fill="white" fillOpacity="0.07" />

      {/* ── Left eye ── */}
      <circle cx="26" cy="39" r="6.5" fill="url(#irisG)" filter="url(#eyeGlow)" />
      <circle cx="26" cy="39" r="3.5" fill="#CFFFFE" fillOpacity="0.55" />
      <circle cx="24" cy="37" r="1.8" fill="white" fillOpacity="0.85" />
      <circle cx="26" cy="39" r="1"   fill="#001830" fillOpacity="0.5" />

      {/* ── Right eye ── */}
      <circle cx="42" cy="39" r="6.5" fill="url(#irisG)" filter="url(#eyeGlow)" />
      <circle cx="42" cy="39" r="3.5" fill="#CFFFFE" fillOpacity="0.55" />
      <circle cx="40" cy="37" r="1.8" fill="white" fillOpacity="0.85" />
      <circle cx="42" cy="39" r="1"   fill="#001830" fillOpacity="0.5" />

      {/* ── Smile ── */}
      <path d="M23 52 Q34 62 45 52"
        stroke="#00E0F8" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M23 52 Q34 62 45 52"
        stroke="#00E0F8" strokeWidth="7" strokeLinecap="round"
        fill="none" opacity="0.15" />

      {/* ── Small status dot on ear ── */}
      <circle cx="64" cy="34" r="4.5" fill="#0F1020" />
      <circle cx="64" cy="34" r="3"   fill="#22DD66" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function getSideProps(side: Side) {
  const tailStyle: React.CSSProperties = {
    width: 0, height: 0,
    borderLeft: "7px solid transparent",
    borderRight: "7px solid transparent",
    borderTop: "8px solid rgba(13,18,32,0.97)",
  };

  return side === "bottom-left"
    ? {
        peekOffset:     { y: HIDE },
        hiddenOffset:   { y: BOT_H + 24 },
        bobAnimate:     { y: [0, -9, 0] },
        containerStyle: { bottom: 0, left: 20 } as React.CSSProperties,
        bubbleClass:    "absolute bottom-[calc(100%+12px)] left-0 w-44",
        tailClass:      "absolute -bottom-[7px] left-3",
        tailStyle,
      }
    : {
        peekOffset:     { y: HIDE },
        hiddenOffset:   { y: BOT_H + 24 },
        bobAnimate:     { y: [0, -9, 0] },
        containerStyle: { bottom: 0, right: 20 } as React.CSSProperties,
        bubbleClass:    "absolute bottom-[calc(100%+12px)] right-0 w-44",
        tailClass:      "absolute -bottom-[7px] right-3",
        tailStyle,
      };
}

/* ─────────────────────────────────────────────────────────────────── */

const SNOOZE_MS = 45_000;

export function FloatingTelegramButton() {
  const [scrolled,   setScrolled]   = useState(false);
  const [dismissed,  setDismissed]  = useState(false);
  const [revealed,   setRevealed]   = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const snoozeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [side] = useState<Side>(() => {
    if (typeof window === "undefined") return "bottom-right";
    return MOBILE_SIDES[Math.floor(Math.random() * MOBILE_SIDES.length)];
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

  useEffect(() => () => { if (snoozeRef.current) clearTimeout(snoozeRef.current); }, []);

  function handleDismiss() {
    setDismissed(true);
    setRevealed(false);
    setShowBubble(false);
    if (snoozeRef.current) clearTimeout(snoozeRef.current);
    snoozeRef.current = setTimeout(() => setDismissed(false), SNOOZE_MS);
  }

  if (dismissed) return null;

  const { containerStyle, peekOffset, hiddenOffset, bobAnimate, bubbleClass, tailClass, tailStyle } = getSideProps(side);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          className="fixed z-50"
          style={containerStyle}
          initial={{ y: hiddenOffset.y, opacity: 0 }}
          animate={{ y: revealed ? 0 : peekOffset.y, opacity: 1 }}
          exit={{ y: hiddenOffset.y, opacity: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
        >
          <div className="relative">
            {/* ── Chat bubble ── */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  exit={{    opacity: 0, scale: 0.85, y: 10 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className={`${bubbleClass} relative`}
                >
                  {/* Card */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10
                    bg-[#0d1220]/95 backdrop-blur-md shadow-2xl shadow-black/40
                    ring-1 ring-inset ring-white/5">

                    {/* Top accent bar */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

                    <div className="px-4 pt-3 pb-4">
                      {/* Status row */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                          </span>
                          <span className="text-[11px] font-semibold text-green-400">Bot Online</span>
                        </div>
                        <button
                          onClick={handleDismiss}
                          className="w-5 h-5 rounded-full bg-white/8 hover:bg-white/15
                            flex items-center justify-center transition-colors"
                          data-testid="button-floating-dismiss"
                          aria-label="Tutup"
                        >
                          <X className="w-3 h-3 text-white/50" />
                        </button>
                      </div>

                      {/* Message */}
                      <p className="text-sm font-bold text-white leading-snug mb-0.5">
                        Beli crypto mulai
                      </p>
                      <p className="text-base font-extrabold text-primary leading-tight mb-3">
                        Rp10.000 ⚡
                      </p>

                      {/* CTA button */}
                      <a
                        href="https://t.me/kriptoecerbot"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="link-floating-cta"
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-xl
                          bg-primary hover:bg-primary/90 transition-colors
                          text-xs font-bold text-primary-foreground"
                      >
                        <SiTelegram className="w-3.5 h-3.5" />
                        Coba Sekarang
                      </a>
                    </div>
                  </div>

                  {/* Tail — CSS triangle pointing down toward the bot */}
                  <div className={tailClass} style={tailStyle} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Bot face ── */}
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
                  ? { duration: 1.8, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.92 }}
            >
              <BotFace />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

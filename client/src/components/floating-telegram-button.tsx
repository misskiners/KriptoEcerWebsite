import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { SiTelegram } from "react-icons/si";

const MASCOT_W = 68;
const MASCOT_H = 76;

function BotFace({ blink }: { blink: boolean }) {
  return (
    <svg
      width={MASCOT_W}
      height={MASCOT_H}
      viewBox="0 0 68 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KriptoEcer Bot — maskot"
    >
      <defs>
        <linearGradient id="btBody" x1="34" y1="14" x2="34" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE474" />
          <stop offset="50%" stopColor="#FFD84D" />
          <stop offset="100%" stopColor="#E8A800" />
        </linearGradient>
        <linearGradient id="btRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF0A0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#CC8800" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="btEar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0C030" />
          <stop offset="100%" stopColor="#D49500" />
        </linearGradient>
        <radialGradient id="btVisor" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1E2240" />
          <stop offset="100%" stopColor="#0D1020" />
        </radialGradient>
        <radialGradient id="btIris" cx="42%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#90FCFF" />
          <stop offset="40%" stopColor="#3DE8FF" />
          <stop offset="100%" stopColor="#0090CC" />
        </radialGradient>
        <filter id="btGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="0 0 0 0 0.15  0 0.7 0.85 0 0  0 0 1 0 0  0 0 0 1 0" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        <filter id="btShadow" x="-15%" y="-5%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.2" />
        </filter>
        <radialGradient id="btAntGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60EFFF" />
          <stop offset="100%" stopColor="#00AADD" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="btCheekL" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFAA80" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFAA80" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="btCheekR" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFAA80" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFAA80" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Antenna */}
      <circle cx="34" cy="7" r="4" fill="#00CCEE" opacity="0.9" />
      <circle cx="34" cy="7" r="7" fill="url(#btAntGlow)" opacity="0.4" />
      <rect x="32.5" y="7" width="3" height="8" rx="1.5" fill="#D49500" />

      {/* Main body — rounded rectangle, chubby bot */}
      <rect x="5" y="15" width="58" height="57" rx="22"
        fill="url(#btBody)" filter="url(#btShadow)" />
      <rect x="5.75" y="15.75" width="56.5" height="55.5" rx="21.25"
        fill="none" stroke="url(#btRim)" strokeWidth="1.5" />

      {/* Head sheen */}
      <ellipse cx="30" cy="22" rx="15" ry="5.5" fill="white" fillOpacity="0.25" />

      {/* Ears — rounded with inner highlight */}
      <rect x="0" y="34" width="8" height="18" rx="4" fill="url(#btEar)" />
      <rect x="60" y="34" width="8" height="18" rx="4" fill="url(#btEar)" />
      <ellipse cx="4" cy="38" rx="1.8" ry="3.5" fill="white" fillOpacity="0.2" />
      <ellipse cx="64" cy="38" rx="1.8" ry="3.5" fill="white" fillOpacity="0.2" />

      {/* Visor — friendly rounded screen */}
      <rect x="13" y="26" width="42" height="34" rx="14"
        fill="url(#btVisor)" />
      <rect x="14" y="27" width="40" height="32" rx="13"
        fill="none" stroke="#2E335A" strokeWidth="0.8" />
      <ellipse cx="28" cy="30" rx="10" ry="3" fill="white" fillOpacity="0.06" />

      {/* Eyes — big friendly kawaii eyes */}
      {blink ? (
        <>
          <path d="M20 42 Q27 46 33 42" stroke="#00D8F0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M35 42 Q41 46 48 42" stroke="#00D8F0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="26" cy="41" r="8" fill="url(#btIris)" filter="url(#btGlow)" />
          <circle cx="26" cy="41" r="4.5" fill="#D0FFFF" fillOpacity="0.45" />
          <circle cx="23.5" cy="38.5" r="2.5" fill="white" fillOpacity="0.9" />
          <circle cx="28" cy="43" r="1" fill="white" fillOpacity="0.45" />
          <circle cx="26" cy="41" r="1.3" fill="#002040" fillOpacity="0.3" />

          <circle cx="42" cy="41" r="8" fill="url(#btIris)" filter="url(#btGlow)" />
          <circle cx="42" cy="41" r="4.5" fill="#D0FFFF" fillOpacity="0.45" />
          <circle cx="39.5" cy="38.5" r="2.5" fill="white" fillOpacity="0.9" />
          <circle cx="44" cy="43" r="1" fill="white" fillOpacity="0.45" />
          <circle cx="42" cy="41" r="1.3" fill="#002040" fillOpacity="0.3" />
        </>
      )}

      {/* Blush cheeks — just below visor */}
      <ellipse cx="12" cy="52" rx="4" ry="2.5" fill="url(#btCheekL)" />
      <ellipse cx="56" cy="52" rx="4" ry="2.5" fill="url(#btCheekR)" />

      {/* Smile — happy arc */}
      <path d="M25 52 Q34 59 43 52"
        stroke="#00D8F0" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M25 52 Q34 59 43 52"
        stroke="#00D8F0" strokeWidth="6" strokeLinecap="round"
        fill="none" opacity="0.1" />

      {/* Status LED */}
      <circle cx="64" cy="34" r="4.5" fill="#0F1020" />
      <circle cx="64" cy="34" r="3" fill="#22DD66" />
    </svg>
  );
}

const CONTAINER_STYLE: React.CSSProperties = { bottom: 0, left: 20 };

const tailStyle: React.CSSProperties = {
  width: 0, height: 0,
  borderLeft: "7px solid transparent",
  borderRight: "7px solid transparent",
  borderTop: "8px solid rgba(13,18,32,0.97)",
};

const SNOOZE_MS = 45_000;
const PEEK = 48;
const HIDE = MASCOT_H - PEEK;

const TWEEN_ENTER = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } as const;
const BUBBLE_ENTER = { duration: 0.35, ease: [0.34, 1.3, 0.64, 1] } as const;
const HOVER_TRANSITION = { duration: 0.15, ease: "easeOut" } as const;
const BREATHE_TRANSITION = {
  duration: 3,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut",
};

export function FloatingTelegramButton() {
  const [scrolled,   setScrolled]   = useState(false);
  const [dismissed,  setDismissed]  = useState(false);
  const [revealed,   setRevealed]   = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [blink,      setBlink]      = useState(false);
  const snoozeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;

  useEffect(() => {
    const fn = () => { if (!dismissed) setScrolled(window.scrollY > 400); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [dismissed]);

  useEffect(() => {
    if (!scrolled || dismissed) { setRevealed(false); setShowBubble(false); return; }
    if (noMotion) {
      setRevealed(true);
      setShowBubble(true);
      return;
    }
    const t1 = setTimeout(() => setRevealed(true),   1800);
    const t2 = setTimeout(() => setShowBubble(true), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [scrolled, dismissed, noMotion]);

  useEffect(() => {
    if (!scrolled || dismissed || noMotion) return;
    let blinkTimeout: ReturnType<typeof setTimeout>;
    let openTimeout: ReturnType<typeof setTimeout>;
    function scheduleBlink() {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        openTimeout = setTimeout(() => {
          setBlink(false);
          scheduleBlink();
        }, 180);
      }, 4000 + Math.random() * 3000);
    }
    scheduleBlink();
    return () => { clearTimeout(blinkTimeout); clearTimeout(openTimeout); };
  }, [scrolled, dismissed, noMotion]);

  useEffect(() => () => { if (snoozeRef.current) clearTimeout(snoozeRef.current); }, []);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    setRevealed(false);
    setShowBubble(false);
    if (snoozeRef.current) clearTimeout(snoozeRef.current);
    snoozeRef.current = setTimeout(() => setDismissed(false), SNOOZE_MS);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          className="fixed z-50"
          style={CONTAINER_STYLE}
          initial={noMotion ? false : { y: MASCOT_H + 24, opacity: 0 }}
          animate={{ y: revealed ? 0 : HIDE, opacity: 1 }}
          exit={noMotion ? { opacity: 0 } : { y: MASCOT_H + 24, opacity: 0 }}
          transition={noMotion ? { duration: 0 } : TWEEN_ENTER}
        >
          <div className="relative">
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={noMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10 }}
                  transition={noMotion ? { duration: 0 } : BUBBLE_ENTER}
                  className="absolute bottom-[calc(100%+12px)] left-0 w-44 relative"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10
                    bg-[#0d1220]/95 backdrop-blur-md shadow-2xl shadow-black/40
                    ring-1 ring-inset ring-white/5">

                    <div className="h-[2px] w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

                    <div className="px-4 pt-3 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                          </span>
                          <span className="text-[11px] font-semibold text-green-400">Bot Online</span>
                        </div>
                        <button
                          onClick={handleDismiss}
                          className="w-5 h-5 rounded-full bg-white/[0.08] hover:bg-white/15
                            flex items-center justify-center transition-colors"
                          data-testid="button-floating-dismiss"
                          aria-label="Tutup"
                        >
                          <X className="w-3 h-3 text-white/50" />
                        </button>
                      </div>

                      <p className="text-sm font-bold text-white leading-snug mb-0.5">
                        Beli crypto mulai
                      </p>
                      <p className="text-base font-extrabold text-primary leading-tight mb-3">
                        Rp10.000 ⚡
                      </p>

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

                  <div className="absolute -bottom-[7px] left-3" style={tailStyle} />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.a
              href="https://t.me/kriptoecerbot"
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
              data-testid="button-floating-telegram"
              aria-label="KriptoEcer Bot"
              animate={noMotion ? {} : { scale: [1, 1.02, 1] }}
              transition={noMotion ? { duration: 0 } : BREATHE_TRANSITION}
              whileHover={noMotion ? undefined : { scale: 1.08, y: -4, transition: HOVER_TRANSITION }}
              whileTap={noMotion ? undefined : { scale: 0.92, transition: HOVER_TRANSITION }}
            >
              <BotFace blink={blink} />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { SiTelegram } from "react-icons/si";

const MASCOT_W = 68;
const MASCOT_H = 76;

function CyberOwl({ blink }: { blink: boolean }) {
  return (
    <svg
      width={MASCOT_W}
      height={MASCOT_H}
      viewBox="0 0 68 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Crypto Owl — maskot KriptoEcer"
    >
      <defs>
        <linearGradient id="owBody" x1="34" y1="8" x2="34" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE474" />
          <stop offset="50%" stopColor="#FFD84D" />
          <stop offset="100%" stopColor="#E8A800" />
        </linearGradient>
        <linearGradient id="owBelly" x1="34" y1="42" x2="34" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="100%" stopColor="#FFF0C8" />
        </linearGradient>
        <linearGradient id="owRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF0A0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D49500" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="owIrisL" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#90FCFF" />
          <stop offset="40%" stopColor="#3DE8FF" />
          <stop offset="100%" stopColor="#0090CC" />
        </radialGradient>
        <radialGradient id="owIrisR" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#90FCFF" />
          <stop offset="40%" stopColor="#3DE8FF" />
          <stop offset="100%" stopColor="#0090CC" />
        </radialGradient>
        <filter id="owGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="0 0 0 0 0.2  0 0.8 0.9 0 0  0 0 1 0 0  0 0 0 0.8 0" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        <filter id="owShadow" x="-15%" y="-5%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.2" />
        </filter>
        <radialGradient id="owCheekL" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFAA80" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFAA80" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="owCheekR" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFAA80" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFAA80" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="owCircuit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00E0FF" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Ear tufts — soft rounded with tiny glow tips */}
      <ellipse cx="14" cy="12" rx="5" ry="10" transform="rotate(-20 14 12)" fill="#F0C030" />
      <ellipse cx="14" cy="12" rx="3" ry="7" transform="rotate(-20 14 12)" fill="#FFE474" fillOpacity="0.6" />
      <circle cx="11" cy="4" r="2" fill="#00DDFF" opacity="0.15" />
      <circle cx="11" cy="4" r="0.9" fill="#00EEFF" opacity="0.85" />

      <ellipse cx="54" cy="12" rx="5" ry="10" transform="rotate(20 54 12)" fill="#F0C030" />
      <ellipse cx="54" cy="12" rx="3" ry="7" transform="rotate(20 54 12)" fill="#FFE474" fillOpacity="0.6" />
      <circle cx="57" cy="4" r="2" fill="#00DDFF" opacity="0.15" />
      <circle cx="57" cy="4" r="0.9" fill="#00EEFF" opacity="0.85" />

      {/* Main body — extra round & chubby */}
      <ellipse cx="34" cy="42" rx="26" ry="28"
        fill="url(#owBody)" filter="url(#owShadow)" />
      <ellipse cx="34" cy="42" rx="26" ry="28"
        fill="none" stroke="url(#owRim)" strokeWidth="1.2" />

      {/* Head sheen */}
      <ellipse cx="28" cy="22" rx="13" ry="5.5" fill="white" fillOpacity="0.22" />

      {/* Tiny wings — tucked in, cute stubs */}
      <ellipse cx="9" cy="44" rx="4" ry="10" transform="rotate(10 9 44)" fill="#E0A020" opacity="0.6" />
      <ellipse cx="59" cy="44" rx="4" ry="10" transform="rotate(-10 59 44)" fill="#E0A020" opacity="0.6" />

      {/* Big soft belly */}
      <ellipse cx="34" cy="50" rx="17" ry="16" fill="url(#owBelly)" />
      <path d="M26 47 L34 50.5 L42 47" stroke="#E8C060" strokeWidth="0.7" fill="none" opacity="0.35" />
      <path d="M27.5 51 L34 54.5 L40.5 51" stroke="#E8C060" strokeWidth="0.7" fill="none" opacity="0.25" />
      <path d="M29 55 L34 58 L39 55" stroke="#E8C060" strokeWidth="0.7" fill="none" opacity="0.15" />

      {/* Circuit accents — subtle tech hint */}
      <path d="M13 52 L13 56 L17 56" stroke="url(#owCircuit)" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M55 52 L55 56 L51 56" stroke="url(#owCircuit)" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="13" cy="52" r="0.8" fill="#00E0FF" fillOpacity="0.3" />
      <circle cx="55" cy="52" r="0.8" fill="#00E0FF" fillOpacity="0.3" />

      {/* Facial disc — soft cream ring around each eye */}
      <circle cx="24" cy="34" r="11" fill="#FFF8E0" />
      <circle cx="24" cy="34" r="11" fill="none" stroke="#E8C060" strokeWidth="0.8" />
      <circle cx="44" cy="34" r="11" fill="#FFF8E0" />
      <circle cx="44" cy="34" r="11" fill="none" stroke="#E8C060" strokeWidth="0.8" />

      {/* Eyes — BIG kawaii style */}
      {blink ? (
        <>
          <path d="M18 35 Q24 39 30 35" stroke="#0099BB" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M38 35 Q44 39 50 35" stroke="#0099BB" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="24" cy="33" r="8.5" fill="url(#owIrisL)" filter="url(#owGlow)" />
          <circle cx="24" cy="33" r="5" fill="#D0FFFF" fillOpacity="0.4" />
          <circle cx="21.5" cy="30.5" r="2.8" fill="white" fillOpacity="0.9" />
          <circle cx="26" cy="35" r="1.2" fill="white" fillOpacity="0.45" />
          <circle cx="24" cy="33" r="1.5" fill="#003355" fillOpacity="0.35" />

          <circle cx="44" cy="33" r="8.5" fill="url(#owIrisR)" filter="url(#owGlow)" />
          <circle cx="44" cy="33" r="5" fill="#D0FFFF" fillOpacity="0.4" />
          <circle cx="41.5" cy="30.5" r="2.8" fill="white" fillOpacity="0.9" />
          <circle cx="46" cy="35" r="1.2" fill="white" fillOpacity="0.45" />
          <circle cx="44" cy="33" r="1.5" fill="#003355" fillOpacity="0.35" />
        </>
      )}

      {/* Blush cheeks */}
      <ellipse cx="14" cy="42" rx="4.5" ry="3" fill="url(#owCheekL)" />
      <ellipse cx="54" cy="42" rx="4.5" ry="3" fill="url(#owCheekR)" />

      {/* Beak — small cute rounded triangle */}
      <path d="M31 44 Q34 49 37 44 Q34 45.5 31 44 Z" fill="#F0A030" />
      <ellipse cx="33" cy="44.5" rx="1" ry="0.6" fill="white" fillOpacity="0.35" />

      {/* Happy little smile under beak */}
      <path d="M31 49.5 Q34 51.5 37 49.5" stroke="#D49500" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Tiny round feet */}
      <ellipse cx="27" cy="69" rx="4.5" ry="2.5" fill="#E0A020" />
      <ellipse cx="41" cy="69" rx="4.5" ry="2.5" fill="#E0A020" />
      <path d="M24 70 L23 72.5 M27 70 L27 73 M30 70 L31 72.5" stroke="#D09020" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M38 70 L37 72.5 M41 70 L41 73 M44 70 L45 72.5" stroke="#D09020" strokeWidth="1.2" strokeLinecap="round" />

      {/* Tiny antenna — subtle tech element on top of head */}
      <line x1="34" y1="14" x2="34" y2="8" stroke="#D49500" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="34" cy="7" r="2.5" fill="#00DDFF" opacity="0.15" />
      <circle cx="34" cy="7" r="1.2" fill="#00EEFF" opacity="0.9" />
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
              aria-label="Crypto Owl — Buka KriptoEcer Bot"
              animate={noMotion ? {} : { scale: [1, 1.02, 1] }}
              transition={noMotion ? { duration: 0 } : BREATHE_TRANSITION}
              whileHover={noMotion ? undefined : { scale: 1.08, y: -4, transition: HOVER_TRANSITION }}
              whileTap={noMotion ? undefined : { scale: 0.92, transition: HOVER_TRANSITION }}
            >
              <CyberOwl blink={blink} />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

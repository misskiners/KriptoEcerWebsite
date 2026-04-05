import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { SiTelegram } from "react-icons/si";

const MASCOT_W = 64;
const MASCOT_H = 72;

function KancilMascot({ blink }: { blink: boolean }) {
  return (
    <svg
      width={MASCOT_W}
      height={MASCOT_H}
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Si Kancil — maskot KriptoEcer"
    >
      <defs>
        <linearGradient id="kcBody" x1="32" y1="18" x2="32" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD84D" />
          <stop offset="60%" stopColor="#E8A800" />
          <stop offset="100%" stopColor="#C48800" />
        </linearGradient>
        <linearGradient id="kcBelly" x1="32" y1="38" x2="32" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF3D0" />
          <stop offset="100%" stopColor="#FFE8A0" />
        </linearGradient>
        <linearGradient id="kcEar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D49500" />
          <stop offset="100%" stopColor="#A06800" />
        </linearGradient>
        <linearGradient id="kcAntler" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C48800" />
          <stop offset="100%" stopColor="#8B6000" />
        </linearGradient>
        <radialGradient id="kcEyeL" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#5A3A1A" />
          <stop offset="100%" stopColor="#2A1A08" />
        </radialGradient>
        <radialGradient id="kcEyeR" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#5A3A1A" />
          <stop offset="100%" stopColor="#2A1A08" />
        </radialGradient>
        <radialGradient id="kcNoseG" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#4A2A0A" />
          <stop offset="100%" stopColor="#2A1505" />
        </radialGradient>
        <filter id="kcShadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.25" />
        </filter>
        <radialGradient id="kcCheekL" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF9F6B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FF9F6B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="kcCheekR" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF9F6B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FF9F6B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Antlers */}
      <g>
        <path d="M20 18 L16 8 L14 12 L16 8 L20 6" stroke="url(#kcAntler)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M44 18 L48 8 L50 12 L48 8 L44 6" stroke="url(#kcAntler)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="14" cy="12" r="1.5" fill="#D49500" />
        <circle cx="20" cy="6" r="1.5" fill="#D49500" />
        <circle cx="50" cy="12" r="1.5" fill="#D49500" />
        <circle cx="44" cy="6" r="1.5" fill="#D49500" />
      </g>

      {/* Ears */}
      <ellipse cx="10" cy="28" rx="7" ry="4" transform="rotate(-30 10 28)" fill="url(#kcEar)" />
      <ellipse cx="10" cy="28" rx="4.5" ry="2.5" transform="rotate(-30 10 28)" fill="#FFDDA0" fillOpacity="0.5" />
      <ellipse cx="54" cy="28" rx="7" ry="4" transform="rotate(30 54 28)" fill="url(#kcEar)" />
      <ellipse cx="54" cy="28" rx="4.5" ry="2.5" transform="rotate(30 54 28)" fill="#FFDDA0" fillOpacity="0.5" />

      {/* Body */}
      <ellipse cx="32" cy="46" rx="22" ry="24" fill="url(#kcBody)" filter="url(#kcShadow)" />
      <ellipse cx="32" cy="24" rx="2" ry="1" fill="white" fillOpacity="0.2" />

      {/* Head highlight */}
      <ellipse cx="28" cy="30" rx="12" ry="6" fill="white" fillOpacity="0.15" />

      {/* Belly */}
      <ellipse cx="32" cy="52" rx="14" ry="13" fill="url(#kcBelly)" />

      {/* Eyes */}
      {blink ? (
        <>
          <path d="M22 38 Q25 40 28 38" stroke="#2A1A08" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M36 38 Q39 40 42 38" stroke="#2A1A08" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="25" cy="38" rx="5" ry="5.5" fill="white" />
          <ellipse cx="25" cy="38" rx="5" ry="5.5" fill="none" stroke="#C48800" strokeWidth="0.5" />
          <circle cx="26" cy="38" r="3.2" fill="url(#kcEyeL)" />
          <circle cx="24.5" cy="36.5" r="1.4" fill="white" fillOpacity="0.9" />
          <circle cx="27" cy="39" r="0.7" fill="white" fillOpacity="0.5" />

          <ellipse cx="39" cy="38" rx="5" ry="5.5" fill="white" />
          <ellipse cx="39" cy="38" rx="5" ry="5.5" fill="none" stroke="#C48800" strokeWidth="0.5" />
          <circle cx="40" cy="38" r="3.2" fill="url(#kcEyeR)" />
          <circle cx="38.5" cy="36.5" r="1.4" fill="white" fillOpacity="0.9" />
          <circle cx="41" cy="39" r="0.7" fill="white" fillOpacity="0.5" />
        </>
      )}

      {/* Cheeks */}
      <circle cx="17" cy="44" r="5" fill="url(#kcCheekL)" />
      <circle cx="47" cy="44" r="5" fill="url(#kcCheekR)" />

      {/* Nose */}
      <ellipse cx="32" cy="44" rx="3.5" ry="2.8" fill="url(#kcNoseG)" />
      <ellipse cx="31" cy="43.2" rx="1.2" ry="0.8" fill="white" fillOpacity="0.35" />

      {/* Mouth */}
      <path d="M29 48 Q32 51 35 48" stroke="#8B6000" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Tiny legs (subtle) */}
      <ellipse cx="24" cy="67" rx="5" ry="3" fill="#C48800" />
      <ellipse cx="40" cy="67" rx="5" ry="3" fill="#C48800" />

      {/* Crypto coin badge on chest */}
      <circle cx="32" cy="56" r="4.5" fill="#FFD84D" stroke="#C48800" strokeWidth="1" />
      <text x="32" y="59" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#8B6000" fontFamily="sans-serif">₿</text>
    </svg>
  );
}

const CONTAINER_STYLE: React.CSSProperties = { bottom: 16, left: 20 };

const tailStyle: React.CSSProperties = {
  width: 0, height: 0,
  borderLeft: "7px solid transparent",
  borderRight: "7px solid transparent",
  borderTop: "8px solid rgba(13,18,32,0.97)",
};

const DISMISS_MS = 60_000;

const TWEEN_ENTER = { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } as const;
const TWEEN_EXIT  = { duration: 0.25, ease: "easeIn" } as const;
const BUBBLE_ENTER = { duration: 0.3, ease: [0.34, 1.2, 0.64, 1] } as const;
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
  const [showBubble, setShowBubble] = useState(false);
  const [hovering,   setHovering]   = useState(false);
  const [blink,      setBlink]      = useState(false);
  const snoozeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;

  useEffect(() => {
    const fn = () => { if (!dismissed) setScrolled(window.scrollY > 500); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [dismissed]);

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
    setShowBubble(false);
    setHovering(false);
    if (snoozeRef.current) clearTimeout(snoozeRef.current);
    snoozeRef.current = setTimeout(() => setDismissed(false), DISMISS_MS);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovering(true);
    setShowBubble(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
    setShowBubble(false);
  }, []);

  const handleTap = useCallback(() => {
    setShowBubble(prev => !prev);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          className="fixed z-50"
          style={CONTAINER_STYLE}
          initial={noMotion ? false : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={noMotion ? { opacity: 0 } : { y: 40, opacity: 0 }}
          transition={noMotion ? { duration: 0 } : TWEEN_ENTER}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative">
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={noMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 6 }}
                  transition={noMotion ? { duration: 0 } : BUBBLE_ENTER}
                  className="absolute bottom-[calc(100%+10px)] left-0 w-[168px]"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10
                    bg-[#0d1220]/95 backdrop-blur-md shadow-2xl shadow-black/40
                    ring-1 ring-inset ring-white/5">

                    <div className="h-[2px] w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

                    <div className="px-3.5 pt-2.5 pb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                          </span>
                          <span className="text-[10px] font-medium text-green-400/90">Bot Online</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDismiss(); }}
                          className="w-4.5 h-4.5 rounded-full bg-white/[0.08] hover:bg-white/15
                            flex items-center justify-center transition-colors"
                          data-testid="button-floating-dismiss"
                          aria-label="Tutup"
                        >
                          <X className="w-2.5 h-2.5 text-white/50" />
                        </button>
                      </div>

                      <p className="text-[13px] font-semibold text-white leading-snug mb-0.5">
                        Hai! Mau beli crypto?
                      </p>
                      <p className="text-xs text-white/60 leading-tight mb-2.5">
                        Mulai dari Rp10.000, tanpa KYC
                      </p>

                      <a
                        href="https://t.me/kriptoecerbot"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="link-floating-cta"
                        className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-xl
                          bg-primary hover:bg-primary/90 transition-colors
                          text-[11px] font-bold text-primary-foreground"
                      >
                        <SiTelegram className="w-3 h-3" />
                        Buka di Telegram
                      </a>
                    </div>
                  </div>

                  <div className="absolute -bottom-[7px] left-4" style={tailStyle} />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="block cursor-pointer select-none"
              data-testid="button-floating-telegram"
              aria-label="Si Kancil — Buka KriptoEcer Bot"
              onClick={handleTap}
              animate={noMotion ? {} : { scale: hovering ? 1.08 : [1, 1.02, 1] }}
              transition={hovering ? HOVER_TRANSITION : BREATHE_TRANSITION}
              whileTap={noMotion ? undefined : { scale: 0.94, transition: HOVER_TRANSITION }}
            >
              <KancilMascot blink={blink} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

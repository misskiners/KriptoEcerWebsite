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
        <linearGradient id="owBody" x1="34" y1="10" x2="34" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD84D" />
          <stop offset="45%" stopColor="#E8A800" />
          <stop offset="100%" stopColor="#B07800" />
        </linearGradient>
        <linearGradient id="owBelly" x1="34" y1="44" x2="34" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF3D0" />
          <stop offset="100%" stopColor="#FFE09A" />
        </linearGradient>
        <linearGradient id="owRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE870" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#CC8800" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="owIris" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#7DF9FF" />
          <stop offset="50%" stopColor="#00C8E8" />
          <stop offset="100%" stopColor="#006ECC" />
        </radialGradient>
        <filter id="owEyeGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="0 0 0 0 0  0 0.8 0.9 0 0  0 0 1 0 0  0 0 0 1.4 0" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        <filter id="owShadow" x="-20%" y="-10%" width="140%" height="150%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.3" />
        </filter>
        <linearGradient id="owCircuit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00E0FF" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="owWing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D49500" />
          <stop offset="100%" stopColor="#8B6200" />
        </linearGradient>
        <linearGradient id="owEarTuft" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#E8A800" />
          <stop offset="100%" stopColor="#FFD84D" />
        </linearGradient>
      </defs>

      {/* Ear tufts — pointed owl horns with tech glow tips */}
      <path d="M18 18 L10 2 L16 14" fill="url(#owEarTuft)" />
      <path d="M50 18 L58 2 L52 14" fill="url(#owEarTuft)" />
      <circle cx="10" cy="2" r="2.5" fill="#00CCEE" opacity="0.2" />
      <circle cx="10" cy="2" r="1.2" fill="#00DDFF" opacity="0.9" />
      <circle cx="58" cy="2" r="2.5" fill="#00CCEE" opacity="0.2" />
      <circle cx="58" cy="2" r="1.2" fill="#00DDFF" opacity="0.9" />

      {/* Main body — round owl shape */}
      <ellipse cx="34" cy="42" rx="27" ry="30"
        fill="url(#owBody)" filter="url(#owShadow)" />
      <ellipse cx="34" cy="42" rx="27" ry="30"
        fill="none" stroke="url(#owRim)" strokeWidth="1.5" />

      {/* Head highlight */}
      <ellipse cx="30" cy="22" rx="14" ry="6" fill="white" fillOpacity="0.18" />

      {/* Wings — folded at sides */}
      <path d="M7 38 Q4 50 10 60 Q12 55 9 42 Z" fill="url(#owWing)" opacity="0.7" />
      <path d="M61 38 Q64 50 58 60 Q56 55 59 42 Z" fill="url(#owWing)" opacity="0.7" />

      {/* Belly with chevron pattern */}
      <ellipse cx="34" cy="52" rx="16" ry="16" fill="url(#owBelly)" />
      <path d="M26 48 L34 52 L42 48" stroke="#D49500" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M27 52 L34 56 L41 52" stroke="#D49500" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M28 56 L34 60 L40 56" stroke="#D49500" strokeWidth="0.8" fill="none" opacity="0.2" />

      {/* Circuit lines on body */}
      <path d="M12 48 L12 54 L16 54" stroke="url(#owCircuit)" strokeWidth="1" strokeLinecap="round" />
      <path d="M56 48 L56 54 L52 54" stroke="url(#owCircuit)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="12" cy="48" r="1" fill="#00E0FF" fillOpacity="0.35" />
      <circle cx="56" cy="48" r="1" fill="#00E0FF" fillOpacity="0.35" />
      <path d="M20 64 L26 64 L26 67" stroke="url(#owCircuit)" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M48 64 L42 64 L42 67" stroke="url(#owCircuit)" strokeWidth="0.8" strokeLinecap="round" />

      {/* Eye rings — owl facial disc */}
      <circle cx="24" cy="34" r="11" fill="#1A1E35" />
      <circle cx="24" cy="34" r="11" fill="none" stroke="#2A2E4A" strokeWidth="0.8" />
      <circle cx="44" cy="34" r="11" fill="#1A1E35" />
      <circle cx="44" cy="34" r="11" fill="none" stroke="#2A2E4A" strokeWidth="0.8" />

      {/* Eye ring rims — gold */}
      <circle cx="24" cy="34" r="11.5" fill="none" stroke="#C48800" strokeWidth="1.2" />
      <circle cx="44" cy="34" r="11.5" fill="none" stroke="#C48800" strokeWidth="1.2" />

      {/* Eyes */}
      {blink ? (
        <>
          <path d="M18 35 Q24 38 30 35" stroke="#00E0FF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
          <path d="M38 35 Q44 38 50 35" stroke="#00E0FF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
        </>
      ) : (
        <>
          <circle cx="24" cy="34" r="7.5" fill="url(#owIris)" filter="url(#owEyeGlow)" />
          <circle cx="24" cy="34" r="4" fill="#CFFFFE" fillOpacity="0.5" />
          <circle cx="22" cy="32" r="2" fill="white" fillOpacity="0.85" />
          <circle cx="24" cy="34" r="1.2" fill="#001830" fillOpacity="0.45" />

          <circle cx="44" cy="34" r="7.5" fill="url(#owIris)" filter="url(#owEyeGlow)" />
          <circle cx="44" cy="34" r="4" fill="#CFFFFE" fillOpacity="0.5" />
          <circle cx="42" cy="32" r="2" fill="white" fillOpacity="0.85" />
          <circle cx="44" cy="34" r="1.2" fill="#001830" fillOpacity="0.45" />
        </>
      )}

      {/* Beak — small tech triangle */}
      <path d="M31 44 L34 49 L37 44 Z" fill="#C48800" />
      <path d="M31.5 44.5 L34 48 L36.5 44.5" fill="none" stroke="#FFE870" strokeWidth="0.5" opacity="0.5" />

      {/* Tiny feet */}
      <g>
        <path d="M26 70 L23 74 M26 70 L26 74 M26 70 L29 74" stroke="#C48800" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M42 70 L39 74 M42 70 L42 74 M42 70 L45 74" stroke="#C48800" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Status LED */}
      <circle cx="58" cy="26" r="3.5" fill="#0F1020" />
      <circle cx="58" cy="26" r="2.2" fill="#22DD66" />

      {/* Crypto badge on belly */}
      <circle cx="34" cy="62" r="4.5" fill="#1A1E35" stroke="#00C8E8" strokeWidth="0.8" />
      <text x="34" y="65.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#00E0FF" fontFamily="monospace">₿</text>
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

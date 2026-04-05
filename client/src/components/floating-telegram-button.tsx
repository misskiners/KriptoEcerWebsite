import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { SiTelegram } from "react-icons/si";

const MASCOT_W = 68;
const MASCOT_H = 76;

function CyberKancil({ blink }: { blink: boolean }) {
  return (
    <svg
      width={MASCOT_W}
      height={MASCOT_H}
      viewBox="0 0 68 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Si Kancil Cyber — maskot KriptoEcer"
    >
      <defs>
        <linearGradient id="ckBody" x1="34" y1="14" x2="34" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD84D" />
          <stop offset="50%" stopColor="#E8A800" />
          <stop offset="100%" stopColor="#B07800" />
        </linearGradient>
        <linearGradient id="ckVisor" x1="34" y1="26" x2="34" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A1E35" />
          <stop offset="100%" stopColor="#0A0D1E" />
        </linearGradient>
        <linearGradient id="ckRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE870" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#CC8800" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="ckEar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D49500" />
          <stop offset="100%" stopColor="#8B6200" />
        </linearGradient>
        <linearGradient id="ckAntler" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00E0FF" />
          <stop offset="100%" stopColor="#0088AA" />
        </linearGradient>
        <radialGradient id="ckIris" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#7DF9FF" />
          <stop offset="50%" stopColor="#00C8E8" />
          <stop offset="100%" stopColor="#006ECC" />
        </radialGradient>
        <filter id="ckEyeGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="0 0 0 0 0  0 0.8 0.9 0 0  0 0 1 0 0  0 0 0 1.2 0" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        <filter id="ckShadow" x="-20%" y="-10%" width="140%" height="150%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.3" />
        </filter>
        <radialGradient id="ckAntGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60EFFF" />
          <stop offset="100%" stopColor="#00AADD" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ckCircuit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00E0FF" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Tech antlers — glowing cyan antenna-style */}
      <g>
        <path d="M21 20 L17 8 L14 14" stroke="url(#ckAntler)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M17 8 L21 4" stroke="url(#ckAntler)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="17" cy="8" r="3" fill="#00CCEE" opacity="0.15" />
        <circle cx="17" cy="8" r="1.5" fill="#00DDFF" opacity="0.9" />
        <circle cx="14" cy="14" r="1.2" fill="#00BBDD" opacity="0.7" />
        <circle cx="21" cy="4" r="1.2" fill="#00BBDD" opacity="0.7" />

        <path d="M47 20 L51 8 L54 14" stroke="url(#ckAntler)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M51 8 L47 4" stroke="url(#ckAntler)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="51" cy="8" r="3" fill="#00CCEE" opacity="0.15" />
        <circle cx="51" cy="8" r="1.5" fill="#00DDFF" opacity="0.9" />
        <circle cx="54" cy="14" r="1.2" fill="#00BBDD" opacity="0.7" />
        <circle cx="47" cy="4" r="1.2" fill="#00BBDD" opacity="0.7" />
      </g>

      {/* Ears with tech inner */}
      <ellipse cx="8" cy="30" rx="6" ry="9" transform="rotate(-15 8 30)" fill="url(#ckEar)" />
      <ellipse cx="8" cy="30" rx="3.5" ry="6" transform="rotate(-15 8 30)" fill="#FFDDA0" fillOpacity="0.4" />
      <ellipse cx="8" cy="30" rx="1.5" ry="3" transform="rotate(-15 8 30)" fill="#00E0FF" fillOpacity="0.15" />

      <ellipse cx="60" cy="30" rx="6" ry="9" transform="rotate(15 60 30)" fill="url(#ckEar)" />
      <ellipse cx="60" cy="30" rx="3.5" ry="6" transform="rotate(15 60 30)" fill="#FFDDA0" fillOpacity="0.4" />
      <ellipse cx="60" cy="30" rx="1.5" ry="3" transform="rotate(15 60 30)" fill="#00E0FF" fillOpacity="0.15" />

      {/* Main body */}
      <rect x="7" y="16" width="54" height="56" rx="21"
        fill="url(#ckBody)" filter="url(#ckShadow)" />
      <rect x="7.75" y="16.75" width="52.5" height="54.5" rx="20.25"
        fill="none" stroke="url(#ckRim)" strokeWidth="1.5" />

      {/* Circuit lines on body */}
      <path d="M18 58 L18 62 L24 62" stroke="url(#ckCircuit)" strokeWidth="1" strokeLinecap="round" />
      <path d="M50 58 L50 62 L44 62" stroke="url(#ckCircuit)" strokeWidth="1" strokeLinecap="round" />
      <path d="M14 42 L14 48" stroke="url(#ckCircuit)" strokeWidth="1" strokeLinecap="round" />
      <path d="M54 42 L54 48" stroke="url(#ckCircuit)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="18" cy="58" r="1" fill="#00E0FF" fillOpacity="0.3" />
      <circle cx="50" cy="58" r="1" fill="#00E0FF" fillOpacity="0.3" />

      {/* Head highlight */}
      <ellipse cx="30" cy="23" rx="14" ry="5" fill="white" fillOpacity="0.2" />

      {/* Visor / face screen */}
      <rect x="14" y="27" width="40" height="32" rx="13"
        fill="url(#ckVisor)" />
      <rect x="15" y="28" width="38" height="30" rx="12"
        fill="none" stroke="#2A2E4A" strokeWidth="0.8" />
      <ellipse cx="28" cy="31" rx="10" ry="3" fill="white" fillOpacity="0.06" />

      {/* Eyes — glowing cyan tech eyes */}
      {blink ? (
        <>
          <path d="M23 41 Q27 43 31 41" stroke="#00E0FF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
          <path d="M37 41 Q41 43 45 41" stroke="#00E0FF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
        </>
      ) : (
        <>
          <circle cx="27" cy="41" r="6" fill="url(#ckIris)" filter="url(#ckEyeGlow)" />
          <circle cx="27" cy="41" r="3.2" fill="#CFFFFE" fillOpacity="0.5" />
          <circle cx="25.5" cy="39.5" r="1.6" fill="white" fillOpacity="0.85" />
          <circle cx="27" cy="41" r="0.9" fill="#001830" fillOpacity="0.4" />

          <circle cx="41" cy="41" r="6" fill="url(#ckIris)" filter="url(#ckEyeGlow)" />
          <circle cx="41" cy="41" r="3.2" fill="#CFFFFE" fillOpacity="0.5" />
          <circle cx="39.5" cy="39.5" r="1.6" fill="white" fillOpacity="0.85" />
          <circle cx="41" cy="41" r="0.9" fill="#001830" fillOpacity="0.4" />
        </>
      )}

      {/* Nose — small triangle tech nose */}
      <path d="M32 48 L34 51 L30 51 Z" fill="#C48800" />
      <path d="M31 49.5 L31.5 50.5" stroke="white" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />

      {/* Mouth — gentle smile */}
      <path d="M28 53 Q34 57 40 53" stroke="#00C8E8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M28 53 Q34 57 40 53" stroke="#00C8E8" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.1" />

      {/* Status LED on right side */}
      <circle cx="58" cy="36" r="3.5" fill="#0F1020" />
      <circle cx="58" cy="36" r="2.2" fill="#22DD66" />

      {/* Crypto coin badge on chest */}
      <circle cx="34" cy="66" r="5" fill="#1A1E35" stroke="#00C8E8" strokeWidth="1" />
      <text x="34" y="69.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#00E0FF" fontFamily="monospace">₿</text>
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
              aria-label="Si Kancil — Buka KriptoEcer Bot"
              animate={noMotion ? {} : { scale: [1, 1.02, 1] }}
              transition={noMotion ? { duration: 0 } : BREATHE_TRANSITION}
              whileHover={noMotion ? undefined : { scale: 1.08, y: -4, transition: HOVER_TRANSITION }}
              whileTap={noMotion ? undefined : { scale: 0.92, transition: HOVER_TRANSITION }}
            >
              <CyberKancil blink={blink} />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

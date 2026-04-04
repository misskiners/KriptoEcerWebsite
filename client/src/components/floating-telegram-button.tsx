import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Side = "bottom-right" | "bottom-left" | "left" | "right";

const BOT_SIZE = 64;
const PEEK = 26;
const HIDE = BOT_SIZE - PEEK;

const MOBILE_SIDES: Side[] = ["bottom-right", "bottom-left", "left", "right"];

function BotFace() {
  return (
    <svg width={BOT_SIZE} height={BOT_SIZE} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bodyGrad" cx="38%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#FFD84D" />
          <stop offset="100%" stopColor="#E8960A" />
        </radialGradient>
        <radialGradient id="eyeGlowL" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#40E0FF" />
          <stop offset="70%" stopColor="#00AAEE" />
          <stop offset="100%" stopColor="#0077BB" />
        </radialGradient>
        <radialGradient id="eyeGlowR" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#40E0FF" />
          <stop offset="70%" stopColor="#00AAEE" />
          <stop offset="100%" stopColor="#0077BB" />
        </radialGradient>
        <filter id="eyeBloom">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Antenna pole */}
      <rect x="30" y="1" width="4" height="11" rx="2" fill="#B86A00" />
      {/* Antenna ball */}
      <circle cx="32" cy="2" r="4.5" fill="#D47A00" />
      {/* Antenna glow tip */}
      <circle cx="32" cy="2" r="2.8" fill="#FFE566" />
      <circle cx="31" cy="1.2" r="1" fill="white" fillOpacity="0.6" />

      {/* Side ear/sensor bolts */}
      <circle cx="5" cy="33" r="5" fill="#C17A00" />
      <circle cx="5" cy="33" r="3" fill="#D98C00" />
      <circle cx="59" cy="33" r="5" fill="#C17A00" />
      <circle cx="59" cy="33" r="3" fill="#D98C00" />

      {/* Main rounded-rect robot head */}
      <rect x="8" y="12" width="48" height="46" rx="14" fill="url(#bodyGrad)" />

      {/* Top edge highlight */}
      <rect x="12" y="12" width="40" height="6" rx="6" fill="white" fillOpacity="0.18" />

      {/* Dark visor panel for eyes */}
      <rect x="11" y="22" width="42" height="22" rx="8" fill="#0d1520" fillOpacity="0.88" />

      {/* Left eye socket */}
      <rect x="14" y="25" width="17" height="15" rx="5" fill="#071020" />
      {/* Left eye LED glow */}
      <rect x="16" y="27" width="13" height="11" rx="4" fill="url(#eyeGlowL)" filter="url(#eyeBloom)" />
      {/* Left eye inner bright */}
      <rect x="18" y="29" width="9" height="7" rx="2.5" fill="#80EEFF" fillOpacity="0.6" />
      {/* Left eye shine */}
      <rect x="19" y="30" width="4" height="2" rx="1" fill="white" fillOpacity="0.75" />

      {/* Right eye socket */}
      <rect x="33" y="25" width="17" height="15" rx="5" fill="#071020" />
      {/* Right eye LED glow */}
      <rect x="35" y="27" width="13" height="11" rx="4" fill="url(#eyeGlowR)" filter="url(#eyeBloom)" />
      {/* Right eye inner bright */}
      <rect x="37" y="29" width="9" height="7" rx="2.5" fill="#80EEFF" fillOpacity="0.6" />
      {/* Right eye shine */}
      <rect x="38" y="30" width="4" height="2" rx="1" fill="white" fillOpacity="0.75" />

      {/* Speaker grille / mouth */}
      <rect x="19" y="47" width="26" height="7" rx="3.5" fill="#0d1520" fillOpacity="0.65" />
      <circle cx="25" cy="50.5" r="1.6" fill="#F5B80A" fillOpacity="0.8" />
      <circle cx="32" cy="50.5" r="1.6" fill="#F5B80A" fillOpacity="0.8" />
      <circle cx="39" cy="50.5" r="1.6" fill="#F5B80A" fillOpacity="0.8" />

      {/* Rivets / bolts at corners */}
      <circle cx="14" cy="18" r="2" fill="#C17A00" />
      <circle cx="50" cy="18" r="2" fill="#C17A00" />
      <circle cx="14" cy="52" r="2" fill="#C17A00" />
      <circle cx="50" cy="52" r="2" fill="#C17A00" />
    </svg>
  );
}

function getSideProps(side: Side) {
  switch (side) {
    case "bottom-right":
      return {
        containerStyle: { bottom: 0, right: 20 } as React.CSSProperties,
        peekOffset: { x: 0, y: HIDE },
        hiddenOffset: { x: 0, y: BOT_SIZE + 20 },
        bobAnimate: { y: [0, -10, 0] },
        bubbleClass: "absolute bottom-[calc(100%+10px)] right-0 w-52",
        bubbleOrigin: "bottom right",
      };
    case "bottom-left":
      return {
        containerStyle: { bottom: 0, left: 20 } as React.CSSProperties,
        peekOffset: { x: 0, y: HIDE },
        hiddenOffset: { x: 0, y: BOT_SIZE + 20 },
        bobAnimate: { y: [0, -10, 0] },
        bubbleClass: "absolute bottom-[calc(100%+10px)] left-0 w-52",
        bubbleOrigin: "bottom left",
      };
    case "right":
      return {
        containerStyle: { right: 0, top: "38%" } as React.CSSProperties,
        peekOffset: { x: HIDE, y: 0 },
        hiddenOffset: { x: BOT_SIZE + 20, y: 0 },
        bobAnimate: { x: [0, -10, 0] },
        bubbleClass: "absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 w-52",
        bubbleOrigin: "center right",
      };
    case "left":
      return {
        containerStyle: { left: 0, top: "38%" } as React.CSSProperties,
        peekOffset: { x: -HIDE, y: 0 },
        hiddenOffset: { x: -(BOT_SIZE + 20), y: 0 },
        bobAnimate: { x: [0, 10, 0] },
        bubbleClass: "absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 w-52",
        bubbleOrigin: "center left",
      };
  }
}

export function FloatingTelegramButton() {
  const [scrolled, setScrolled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [revealed, setRevealed] = useState(false);
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
    const t1 = setTimeout(() => setRevealed(true), 1800);
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
            x: revealed ? 0 : peekOffset.x,
            y: revealed ? 0 : peekOffset.y,
            opacity: 1,
          }}
          exit={{ x: hiddenOffset.x, y: hiddenOffset.y, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        >
          <div className="relative">
            <motion.a
              href="https://t.me/kriptoecerbot"
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
              data-testid="button-floating-telegram"
              aria-label="Buka KriptoEcer Bot"
              animate={!revealed ? bobAnimate : { x: 0, y: 0 }}
              transition={
                !revealed
                  ? { duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
            >
              <BotFace />
            </motion.a>

            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
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

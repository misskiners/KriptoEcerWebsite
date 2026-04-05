import { motion, useReducedMotion } from "framer-motion";
import { SiBitcoin, SiEthereum, SiLitecoin, SiDogecoin, SiTether, SiSolana, SiBinance } from "react-icons/si";
import { TrxIcon } from "@/components/icons/trx-icon";

const TonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L2 7l10 14 10-14L12 2zm0 3.5L18.5 9H5.5L12 5.5z"/>
  </svg>
);

const UsdcIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold">$</text>
  </svg>
);

const coins = [
  { Icon: SiSolana,   color: "text-purple-500",      delay: 0,   x: "8%",  duration: 14 },
  { Icon: SiBinance,  color: "text-yellow-500",      delay: 1,   x: "18%", duration: 17 },
  { Icon: SiBitcoin,  color: "text-orange-500",      delay: 2,   x: "28%", duration: 15 },
  { Icon: SiEthereum, color: "text-blue-400",        delay: 3,   x: "38%", duration: 18 },
  { Icon: TrxIcon,    color: "text-red-500",         delay: 4,   x: "48%", duration: 13 },
  { Icon: SiTether,   color: "text-green-500",       delay: 5,   x: "58%", duration: 16 },
  { Icon: UsdcIcon,   color: "text-blue-500",        delay: 0.5, x: "68%", duration: 19 },
  { Icon: TonIcon,    color: "text-sky-400",         delay: 1.5, x: "78%", duration: 15 },
  { Icon: SiLitecoin, color: "text-gray-400",        delay: 2.5, x: "88%", duration: 12 },
  { Icon: SiDogecoin, color: "text-amber-400",       delay: 3.5, x: "5%",  duration: 20 },
  { Icon: SiSolana,   color: "text-purple-400/60",   delay: 4.5, x: "35%", duration: 22 },
  { Icon: SiBinance,  color: "text-yellow-400/60",   delay: 5.5, x: "65%", duration: 21 },
  { Icon: TrxIcon,    color: "text-red-400/60",      delay: 6,   x: "92%", duration: 18 },
  { Icon: SiTether,   color: "text-green-400/60",    delay: 6.5, x: "22%", duration: 20 },
];

export function FloatingCoins() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {coins.map((coin, index) => (
        <motion.div
          key={index}
          className={`absolute ${coin.color}`}
          style={{ left: coin.x }}
          initial={{ y: "100vh", opacity: 0, rotate: 0 }}
          animate={{
            y: "-100px",
            opacity: [0, 0.7, 0.7, 0],
            rotate: 360,
          }}
          transition={{
            duration: coin.duration,
            delay: coin.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <coin.Icon className="w-8 h-8 md:w-12 md:h-12" />
        </motion.div>
      ))}
    </div>
  );
}

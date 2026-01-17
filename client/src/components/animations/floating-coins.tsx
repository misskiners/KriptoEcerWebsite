import { motion } from "framer-motion";
import { SiBitcoin, SiEthereum, SiLitecoin, SiDogecoin, SiRipple, SiTether } from "react-icons/si";

const coins = [
  { Icon: SiBitcoin, color: "text-orange-500", delay: 0, x: "10%", duration: 15 },
  { Icon: SiEthereum, color: "text-blue-400", delay: 2, x: "25%", duration: 18 },
  { Icon: SiLitecoin, color: "text-gray-400", delay: 4, x: "40%", duration: 12 },
  { Icon: SiDogecoin, color: "text-yellow-500", delay: 1, x: "55%", duration: 20 },
  { Icon: SiRipple, color: "text-blue-500", delay: 3, x: "70%", duration: 14 },
  { Icon: SiTether, color: "text-green-500", delay: 5, x: "85%", duration: 16 },
  { Icon: SiBitcoin, color: "text-orange-400/60", delay: 6, x: "15%", duration: 22 },
  { Icon: SiEthereum, color: "text-blue-300/60", delay: 7, x: "75%", duration: 19 },
];

export function FloatingCoins() {
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

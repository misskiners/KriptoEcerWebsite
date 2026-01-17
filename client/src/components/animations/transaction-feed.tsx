import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";
import { SiBitcoin, SiEthereum, SiLitecoin, SiDogecoin, SiTether } from "react-icons/si";

const cryptoOptions = [
  { name: "Bitcoin", symbol: "BTC", Icon: SiBitcoin, color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "Ethereum", symbol: "ETH", Icon: SiEthereum, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "Litecoin", symbol: "LTC", Icon: SiLitecoin, color: "text-gray-400", bg: "bg-gray-400/10" },
  { name: "Dogecoin", symbol: "DOGE", Icon: SiDogecoin, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { name: "USDT", symbol: "USDT", Icon: SiTether, color: "text-green-500", bg: "bg-green-500/10" },
];

const amounts = ["Rp 15.000", "Rp 25.000", "Rp 50.000", "Rp 75.000", "Rp 100.000", "Rp 150.000", "Rp 200.000", "Rp 250.000"];
const userPrefixes = ["Andi", "Budi", "Citra", "Dian", "Eko", "Fajar", "Gilang", "Hendra", "Ivan", "Joko", "Kiki", "Luna", "Maya", "Nadia", "Omar"];
const timestamps = ["Baru saja", "1 detik lalu", "3 detik lalu", "5 detik lalu", "8 detik lalu"];

interface Transaction {
  id: number;
  user: string;
  amount: string;
  crypto: typeof cryptoOptions[0];
  timestamp: string;
  isNew: boolean;
}

function generateUser(): string {
  const prefix = userPrefixes[Math.floor(Math.random() * userPrefixes.length)];
  const suffix = Math.floor(Math.random() * 99) + 1;
  return `${prefix}***${suffix.toString().padStart(2, '0')}`;
}

function generateTransaction(id: number, isNew: boolean = false): Transaction {
  return {
    id,
    user: generateUser(),
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    crypto: cryptoOptions[Math.floor(Math.random() * cryptoOptions.length)],
    timestamp: isNew ? "Baru saja" : timestamps[Math.floor(Math.random() * timestamps.length)],
    isNew,
  };
}

export function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    generateTransaction(1),
    generateTransaction(2),
    generateTransaction(3),
    generateTransaction(4),
    generateTransaction(5),
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const updatedPrev = prev.map((tx, idx) => ({
          ...tx,
          isNew: false,
          timestamp: timestamps[Math.min(idx + 1, timestamps.length - 1)],
        }));
        const newTx = generateTransaction(Date.now(), true);
        return [newTx, ...updatedPrev.slice(0, 4)];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium">@kriptoecerbot</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Real-time</span>
        </div>
      </div>
      
      <AnimatePresence mode="popLayout">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ 
              opacity: 1 - (index * 0.1), 
              x: 0, 
              scale: 1,
            }}
            exit={{ opacity: 0, x: 30, scale: 0.9 }}
            transition={{ 
              duration: 0.4,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className={`relative flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${
              tx.isNew 
                ? "bg-primary/10 border border-primary/30" 
                : "bg-muted/30 border border-transparent"
            }`}
            data-testid={`transaction-item-${index}`}
          >
            {tx.isNew && (
              <motion.div
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.crypto.bg} ${tx.crypto.color}`}>
              <tx.crypto.Icon className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground truncate" style={{ fontFamily: "'Caveat', cursive" }}>
                  {tx.user}
                </span>
                <span className="text-muted-foreground text-xs">membeli</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.1em" }}>
                  {tx.amount}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                  {tx.crypto.symbol}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <CheckCircle2 className={`w-4 h-4 ${tx.isNew ? "text-primary" : "text-green-500"}`} />
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                {tx.timestamp}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <motion.div 
        className="text-center pt-3 mt-2 border-t border-border/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Caveat', cursive", fontSize: "0.9em" }}>
          Bergabung dengan ribuan pengguna lainnya...
        </p>
      </motion.div>
    </div>
  );
}

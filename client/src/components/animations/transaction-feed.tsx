import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, Clock, Terminal } from "lucide-react";
import { SiBitcoin, SiEthereum, SiLitecoin, SiDogecoin, SiTether } from "react-icons/si";

const cryptoOptions = [
  { name: "Bitcoin", symbol: "BTC", Icon: SiBitcoin, color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "Ethereum", symbol: "ETH", Icon: SiEthereum, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "Litecoin", symbol: "LTC", Icon: SiLitecoin, color: "text-gray-400", bg: "bg-gray-400/10" },
  { name: "Dogecoin", symbol: "DOGE", Icon: SiDogecoin, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { name: "USDT", symbol: "USDT", Icon: SiTether, color: "text-green-500", bg: "bg-green-500/10" },
];

const amounts = ["Rp 15.000", "Rp 25.000", "Rp 50.000", "Rp 75.000", "Rp 100.000", "Rp 150.000", "Rp 200.000", "Rp 250.000"];
const userPrefixes = ["user", "trader", "crypto", "buyer", "indo", "new", "btc", "eth"];
const timestamps = ["now", "1s ago", "3s ago", "5s ago", "8s ago"];

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
  const suffix = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `${prefix}_${suffix}`;
}

function generateTransaction(id: number, isNew: boolean = false): Transaction {
  return {
    id,
    user: generateUser(),
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    crypto: cryptoOptions[Math.floor(Math.random() * cryptoOptions.length)],
    timestamp: isNew ? "now" : timestamps[Math.floor(Math.random() * timestamps.length)],
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-1.5 font-mono">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium">@kriptoecerbot</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>live</span>
        </div>
      </div>
      
      <AnimatePresence mode="sync">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1 - (index * 0.12), 
              y: 0,
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              layout: { duration: 0.4, ease: "easeInOut" }
            }}
            className={`relative flex items-center gap-3 p-2.5 rounded-lg text-xs ${
              tx.isNew 
                ? "bg-primary/10 border border-primary/30" 
                : "bg-muted/20 border border-transparent"
            }`}
            data-testid={`transaction-item-${index}`}
          >
            {tx.isNew && (
              <motion.div
                className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
            
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.crypto.bg} ${tx.crypto.color}`}>
              <tx.crypto.Icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-foreground/90 truncate text-[11px]">
                  {tx.user}
                </span>
                <span className="text-muted-foreground/70">→</span>
                <span className="text-primary font-semibold">
                  {tx.amount}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-muted-foreground">
                  bought
                </span>
                <span className="text-[10px] px-1 py-0.5 rounded bg-muted/50 text-foreground/80 font-medium">
                  {tx.crypto.symbol}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-0.5">
              <CheckCircle2 className={`w-3.5 h-3.5 ${tx.isNew ? "text-primary" : "text-green-500/70"}`} />
              <span className="text-[9px] text-muted-foreground/70 whitespace-nowrap">
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
        <p className="text-[10px] text-muted-foreground/60">
          // join thousands of users...
        </p>
      </motion.div>
    </div>
  );
}

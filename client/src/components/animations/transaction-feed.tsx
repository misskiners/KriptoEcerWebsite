import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SiBitcoin, SiEthereum, SiLitecoin, SiDogecoin } from "react-icons/si";

const cryptoOptions = [
  { name: "Bitcoin", symbol: "BTC", Icon: SiBitcoin, color: "text-orange-500" },
  { name: "Ethereum", symbol: "ETH", Icon: SiEthereum, color: "text-blue-400" },
  { name: "Litecoin", symbol: "LTC", Icon: SiLitecoin, color: "text-gray-400" },
  { name: "Dogecoin", symbol: "DOGE", Icon: SiDogecoin, color: "text-yellow-500" },
];

const amounts = ["Rp 25.000", "Rp 50.000", "Rp 100.000", "Rp 75.000", "Rp 150.000", "Rp 200.000"];
const users = ["User***21", "Trader***89", "Crypto***45", "Indo***67", "Buyer***33", "New***12"];

interface Transaction {
  id: number;
  user: string;
  amount: string;
  crypto: typeof cryptoOptions[0];
  timestamp: string;
}

function generateTransaction(id: number): Transaction {
  return {
    id,
    user: users[Math.floor(Math.random() * users.length)],
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    crypto: cryptoOptions[Math.floor(Math.random() * cryptoOptions.length)],
    timestamp: "Baru saja",
  };
}

export function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    generateTransaction(1),
    generateTransaction(2),
    generateTransaction(3),
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const newTx = generateTransaction(Date.now());
        return [newTx, ...prev.slice(0, 2)];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs text-muted-foreground">Transaksi Real-time</span>
      </div>
      
      <AnimatePresence mode="popLayout">
        {transactions.map((tx) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 text-sm"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-background ${tx.crypto.color}`}>
              <tx.crypto.Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-medium truncate">{tx.user}</span>
                <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span className="text-primary font-semibold">{tx.amount}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {tx.crypto.name} ({tx.crypto.symbol})
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

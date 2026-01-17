import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiTelegram, SiBitcoin, SiSolana, SiBinance, SiTether } from "react-icons/si";

const TrxIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.18l8.09 4.67L12 11.52 3.91 6.85 12 2.18zM3.5 8.35l7.5 4.33v8.64L3.5 17V8.35zm9.5 12.97v-8.64l7.5-4.33V17l-7.5 4.32z"/>
  </svg>
);

const UsdcIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold">$</text>
  </svg>
);

type CryptoKey = 'SOL' | 'BNB' | 'USDC' | 'USDT' | 'TRX' | 'BTC';

const cryptoData: Record<CryptoKey, { icon: React.ComponentType<{ className?: string }>; color: string; price: number }> = {
  SOL: { icon: SiSolana, color: "#9945FF", price: 2800000 },
  BNB: { icon: SiBinance, color: "#F3BA2F", price: 10500000 },
  USDC: { icon: UsdcIcon, color: "#2775CA", price: 16000 },
  USDT: { icon: SiTether, color: "#26A17B", price: 16000 },
  TRX: { icon: TrxIcon, color: "#EF0027", price: 4000 },
  BTC: { icon: SiBitcoin, color: "#F7931A", price: 1700000000 },
};

const presetAmounts = [10000, 25000, 50000, 100000];
const dominantCoins: CryptoKey[] = ['SOL', 'BNB', 'USDC', 'USDT', 'TRX'];

interface Message {
  id: number;
  type: 'bot' | 'user' | 'success' | 'crypto';
  text: string;
  cryptoAmount?: string;
  cryptoSymbol?: string;
}

export function BotAnimation() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: 'Selamat datang di KriptoEcer!' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CryptoKey>('SOL');
  const [selectedAmount, setSelectedAmount] = useState(100000);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(2);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const calculateCrypto = (coin: CryptoKey, amount: number) => {
    const price = cryptoData[coin].price;
    const cryptoAmount = amount / price;
    if (cryptoAmount < 0.00001) {
      return cryptoAmount.toExponential(4);
    }
    return cryptoAmount.toFixed(6);
  };

  const simulateTransaction = async (coin: CryptoKey, amount: number) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const userMessage: Message = {
      id: messageIdRef.current++,
      type: 'user',
      text: `Beli ${coin} Rp${formatRupiah(amount)}`
    };
    setMessages(prev => [...prev, userMessage]);

    await new Promise(r => setTimeout(r, 800));

    const receivedMessage: Message = {
      id: messageIdRef.current++,
      type: 'bot',
      text: 'Pesanan diterima...'
    };
    setMessages(prev => [...prev, receivedMessage]);

    await new Promise(r => setTimeout(r, 1200));

    const successMessage: Message = {
      id: messageIdRef.current++,
      type: 'success',
      text: 'Transaksi berhasil!'
    };
    setMessages(prev => [...prev, successMessage]);

    await new Promise(r => setTimeout(r, 600));

    const cryptoAmount = calculateCrypto(coin, amount);
    const cryptoMessage: Message = {
      id: messageIdRef.current++,
      type: 'crypto',
      text: `${cryptoAmount} ${coin} → Wallet Anda`,
      cryptoAmount,
      cryptoSymbol: coin
    };
    setMessages(prev => [...prev, cryptoMessage]);

    setIsProcessing(false);
  };

  const handleQuickBuy = (coin: CryptoKey) => {
    setSelectedCoin(coin);
    simulateTransaction(coin, selectedAmount);
  };

  const resetSimulation = () => {
    setMessages([{ id: 1, type: 'bot', text: 'Selamat datang di KriptoEcer!' }]);
    messageIdRef.current = 2;
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-4 flex items-center gap-3 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <img src="/favicon.png" alt="KriptoEcer" className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold text-sm">KriptoEcer Bot</p>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
          <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer" className="ml-auto">
            <SiTelegram className="w-5 h-5 text-[#0088cc]" />
          </a>
        </div>

        <div className="p-4 space-y-3 h-52 overflow-y-auto" data-testid="chat-messages">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`message-${msg.type}-${msg.id}`}
              >
                {msg.type === "success" ? (
                  <div className="flex items-center gap-2 bg-green-500/20 text-green-500 px-4 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">{msg.text}</span>
                  </div>
                ) : msg.type === "crypto" ? (
                  <div className="flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-xl">
                    <Coins className="w-4 h-4" />
                    <span className="text-sm font-medium">{msg.text}</span>
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-border bg-muted/30 space-y-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {dominantCoins.map((coin) => {
              const Icon = cryptoData[coin].icon;
              return (
                <Button
                  key={coin}
                  size="sm"
                  variant={selectedCoin === coin ? "default" : "outline"}
                  className="flex-shrink-0 gap-1 text-xs px-2"
                  onClick={() => handleQuickBuy(coin)}
                  disabled={isProcessing}
                  data-testid={`button-coin-${coin.toLowerCase()}`}
                >
                  <Icon className="w-3 h-3" />
                  {coin}
                </Button>
              );
            })}
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                size="sm"
                variant={selectedAmount === amount ? "secondary" : "ghost"}
                className="flex-shrink-0 text-xs px-2"
                onClick={() => setSelectedAmount(amount)}
                disabled={isProcessing}
                data-testid={`button-amount-${amount}`}
              >
                Rp{formatRupiah(amount)}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <div 
              className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full bg-background border border-border cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => !isProcessing && simulateTransaction(selectedCoin, selectedAmount)}
            >
              <span className="text-sm text-muted-foreground flex-1">
                {isProcessing ? 'Memproses...' : `Beli ${selectedCoin} Rp${formatRupiah(selectedAmount)}`}
              </span>
              <Button
                size="icon"
                className="rounded-full h-7 w-7"
                disabled={isProcessing}
                onClick={(e) => {
                  e.stopPropagation();
                  simulateTransaction(selectedCoin, selectedAmount);
                }}
                data-testid="button-send"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {messages.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-muted-foreground"
              onClick={resetSimulation}
              data-testid="button-reset"
            >
              Reset Demo
            </Button>
          )}
        </div>

        <a
          href="https://t.me/kriptoecerbot"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-2 border-t border-border bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer text-center"
          data-testid="link-bot-chat"
        >
          <p className="text-xs text-primary">
            Klik untuk membuka bot di Telegram
          </p>
        </a>
      </motion.div>

      <motion.div
        className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}

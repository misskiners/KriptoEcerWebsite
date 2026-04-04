import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Coins, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiTelegram, SiBitcoin, SiSolana, SiBinance, SiTether } from "react-icons/si";
import { TrxIcon } from "@/components/icons/trx-icon";

const UsdcIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold">$</text>
  </svg>
);

type CryptoKey = 'SOL' | 'BNB' | 'USDC' | 'USDT' | 'TRX';

const cryptoData: Record<CryptoKey, { icon: React.ComponentType<{ className?: string }>; color: string; price: number }> = {
  SOL: { icon: SiSolana, color: "#9945FF", price: 2800000 },
  BNB: { icon: SiBinance, color: "#F3BA2F", price: 10500000 },
  USDC: { icon: UsdcIcon, color: "#2775CA", price: 16000 },
  USDT: { icon: SiTether, color: "#26A17B", price: 16000 },
  TRX: { icon: TrxIcon, color: "#EF0027", price: 4000 },
};

const presetAmounts = [10000, 25000, 50000, 100000];
const coins: CryptoKey[] = ['SOL', 'BNB', 'USDC', 'USDT', 'TRX'];

interface Message {
  id: number;
  type: 'bot' | 'user' | 'success' | 'crypto';
  text: string;
  time: string;
}

function getTime() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}

export function BotAnimation() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: 'Selamat datang di KriptoEcer! 👋', time: getTime() }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CryptoKey>('SOL');
  const [selectedAmount, setSelectedAmount] = useState(100000);
  const [messageId, setMessageId] = useState(2);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID').format(num);

  const calculateCrypto = (coin: CryptoKey, amount: number) => {
    const price = cryptoData[coin].price;
    const cryptoAmount = amount / price;
    return cryptoAmount < 0.00001 ? cryptoAmount.toExponential(4) : cryptoAmount.toFixed(6);
  };

  const addBotMessage = async (text: string, id: { current: number }) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 900));
    setIsTyping(false);
    const msg: Message = { id: id.current++, type: 'bot', text, time: getTime() };
    setMessages(prev => [...prev, msg]);
    return msg;
  };

  const simulateTransaction = async (coin: CryptoKey, amount: number) => {
    if (isProcessing) return;
    setIsProcessing(true);
    const id = { current: messageId };

    setMessages(prev => [...prev, {
      id: id.current++,
      type: 'user',
      text: `Beli ${coin} Rp${formatRupiah(amount)}`,
      time: getTime(),
    }]);

    await addBotMessage('Pesanan diterima, sedang memproses...', id);
    await new Promise(r => setTimeout(r, 600));

    setMessages(prev => [...prev, {
      id: id.current++,
      type: 'success',
      text: 'Transaksi berhasil!',
      time: getTime(),
    }]);

    await new Promise(r => setTimeout(r, 400));

    const cryptoAmount = calculateCrypto(coin, amount);
    setMessages(prev => [...prev, {
      id: id.current++,
      type: 'crypto',
      text: `${cryptoAmount} ${coin} → wallet kamu`,
      time: getTime(),
    }]);

    setMessageId(id.current);
    setIsProcessing(false);
  };

  const resetSimulation = () => {
    setMessages([{ id: 1, type: 'bot', text: 'Selamat datang di KriptoEcer! 👋', time: getTime() }]);
    setMessageId(2);
    setIsTyping(false);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="bg-gradient-to-r from-[#0088cc]/20 to-primary/10 p-4 flex items-center gap-3 border-b border-border">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center ring-2 ring-primary/30">
              <img src="/favicon.png" alt="KriptoEcer" className="w-6 h-6" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
          </div>
          <div>
            <p className="font-semibold text-sm">KriptoEcer Bot</p>
            <p className="text-xs text-muted-foreground">
              {isTyping ? (
                <span className="text-primary">mengetik...</span>
              ) : (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Online
                </span>
              )}
            </p>
          </div>
          <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer" className="ml-auto opacity-70 hover:opacity-100 transition-opacity">
            <SiTelegram className="w-5 h-5 text-[#0088cc]" />
          </a>
        </div>

        <div ref={chatRef} className="p-4 space-y-2.5 h-52 overflow-y-auto scrollbar-gold bg-muted/10" data-testid="chat-messages">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}
                data-testid={`message-${msg.type}-${msg.id}`}
              >
                {msg.type === "success" ? (
                  <div className="flex items-center gap-2 bg-green-500/15 text-green-600 dark:text-green-400 px-4 py-2 rounded-2xl border border-green-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-semibold">{msg.text}</span>
                  </div>
                ) : msg.type === "crypto" ? (
                  <div className="flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-2xl border border-primary/20">
                    <Coins className="w-4 h-4" />
                    <span className="text-sm font-semibold">{msg.text}</span>
                  </div>
                ) : (
                  <div className={`max-w-[80%] px-3.5 py-2 text-sm ${
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                      : "bg-card border border-border rounded-2xl rounded-tl-sm"
                  }`}>
                    {msg.text}
                  </div>
                )}
                <div className={`flex items-center gap-1 mt-0.5 ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                  <span className="text-[10px] text-muted-foreground/60">{msg.time}</span>
                  {msg.type === "user" && (
                    <Check className="w-3 h-3 text-primary/60" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-3 border-t border-border bg-card space-y-2">
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {coins.map((coin) => {
              const Icon = cryptoData[coin].icon;
              return (
                <Button
                  key={coin}
                  size="sm"
                  variant={selectedCoin === coin ? "default" : "outline"}
                  className="flex-shrink-0 gap-1 text-xs px-2 h-7"
                  onClick={() => setSelectedCoin(coin)}
                  disabled={isProcessing}
                  data-testid={`button-coin-${coin.toLowerCase()}`}
                >
                  <Icon className="w-3 h-3" />
                  {coin}
                </Button>
              );
            })}
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                size="sm"
                variant={selectedAmount === amount ? "secondary" : "ghost"}
                className="flex-shrink-0 text-xs px-2 h-7"
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
              className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => !isProcessing && simulateTransaction(selectedCoin, selectedAmount)}
            >
              <span className="text-sm text-muted-foreground flex-1 truncate">
                {isProcessing ? 'Memproses...' : `Beli ${selectedCoin} Rp${formatRupiah(selectedAmount)}`}
              </span>
              <Button
                size="icon"
                className="rounded-full h-7 w-7 flex-shrink-0"
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
              className="w-full text-xs text-muted-foreground h-7"
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
          <p className="text-xs text-primary font-medium">Klik untuk membuka bot di Telegram →</p>
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

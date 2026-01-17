import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiTelegram, SiBitcoin, SiEthereum, SiLitecoin, SiDogecoin, SiTether, SiSolana, SiBinance } from "react-icons/si";

const TrxIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.18l8.09 4.67L12 11.52 3.91 6.85 12 2.18zM3.5 8.35l7.5 4.33v8.64L3.5 17V8.35zm9.5 12.97v-8.64l7.5-4.33V17l-7.5 4.32z"/>
  </svg>
);

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

type CryptoKey = 'SOL' | 'BNB' | 'USDC' | 'USDT' | 'TRX' | 'BTC' | 'ETH' | 'TON' | 'LTC' | 'DOGE';

const cryptoData: Record<CryptoKey, { name: string; icon: React.ComponentType<{ className?: string }>; color: string; price: number }> = {
  SOL: { name: "Solana", icon: SiSolana, color: "#9945FF", price: 2800000 },
  BNB: { name: "BNB", icon: SiBinance, color: "#F3BA2F", price: 10500000 },
  USDC: { name: "USD Coin", icon: UsdcIcon, color: "#2775CA", price: 16000 },
  USDT: { name: "Tether", icon: SiTether, color: "#26A17B", price: 16000 },
  TRX: { name: "Tron", icon: TrxIcon, color: "#EF0027", price: 4000 },
  BTC: { name: "Bitcoin", icon: SiBitcoin, color: "#F7931A", price: 1700000000 },
  ETH: { name: "Ethereum", icon: SiEthereum, color: "#627EEA", price: 55000000 },
  TON: { name: "Toncoin", icon: TonIcon, color: "#0098EA", price: 95000 },
  LTC: { name: "Litecoin", icon: SiLitecoin, color: "#BFBBBB", price: 1800000 },
  DOGE: { name: "Dogecoin", icon: SiDogecoin, color: "#C2A633", price: 6000 },
};

const presetAmounts = [10000, 25000, 50000, 100000];
const dominantCoins: CryptoKey[] = ['SOL', 'BNB', 'USDC', 'USDT', 'TRX'];

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  status?: 'received' | 'success' | 'crypto';
  cryptoAmount?: string;
  cryptoSymbol?: string;
}

export function BotSimulation() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', content: 'Selamat datang di KriptoEcer!' }
  ]);
  const [inputValue, setInputValue] = useState('');
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
      content: `Beli ${coin} Rp${formatRupiah(amount)}`
    };
    setMessages(prev => [...prev, userMessage]);

    await new Promise(r => setTimeout(r, 800));

    const receivedMessage: Message = {
      id: messageIdRef.current++,
      type: 'bot',
      content: 'Pesanan diterima...',
      status: 'received'
    };
    setMessages(prev => [...prev, receivedMessage]);

    await new Promise(r => setTimeout(r, 1200));

    const successMessage: Message = {
      id: messageIdRef.current++,
      type: 'bot',
      content: 'Transaksi berhasil!',
      status: 'success'
    };
    setMessages(prev => [...prev, successMessage]);

    await new Promise(r => setTimeout(r, 600));

    const cryptoAmount = calculateCrypto(coin, amount);
    const cryptoMessage: Message = {
      id: messageIdRef.current++,
      type: 'bot',
      content: `${cryptoAmount} ${coin} → Wallet Anda`,
      status: 'crypto',
      cryptoAmount,
      cryptoSymbol: coin
    };
    setMessages(prev => [...prev, cryptoMessage]);

    setIsProcessing(false);
  };

  const handleSubmit = () => {
    if (isProcessing) return;
    
    const match = inputValue.match(/beli\s+(\w+)\s+rp?\s*([\d.,]+)/i);
    if (match) {
      const coin = match[1].toUpperCase() as CryptoKey;
      const amount = parseInt(match[2].replace(/[.,]/g, ''));
      if (cryptoData[coin] && amount >= 10000) {
        simulateTransaction(coin, amount);
        setInputValue('');
        return;
      }
    }
    
    simulateTransaction(selectedCoin, selectedAmount);
    setInputValue('');
  };

  const handleQuickBuy = (coin: CryptoKey) => {
    setSelectedCoin(coin);
    simulateTransaction(coin, selectedAmount);
  };

  const resetSimulation = () => {
    setMessages([{ id: 1, type: 'bot', content: 'Selamat datang di KriptoEcer!' }]);
    messageIdRef.current = 2;
  };

  const CryptoIcon = cryptoData[selectedCoin].icon;

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-[#1a1a2e] dark:bg-[#0f0f1a] border-primary/20" data-testid="card-bot-simulation">
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-3 flex items-center gap-3 border-b border-primary/20">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center" data-testid="bot-avatar">
          <img src="/favicon.png" alt="KriptoEcer" className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white text-sm" data-testid="text-bot-name">KriptoEcer Bot</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
        <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer" data-testid="link-open-telegram">
          <SiTelegram className="w-6 h-6 text-[#0088cc]" />
        </a>
      </div>

      <div className="h-72 overflow-y-auto p-4 space-y-3 bg-[#0d0d1a] dark:bg-[#050510]" data-testid="chat-messages">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              data-testid={`message-${msg.type}-${msg.id}`}
            >
              {msg.type === 'bot' ? (
                <div className={`
                  max-w-[80%] rounded-2xl px-4 py-2 text-sm
                  ${msg.status === 'success' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : msg.status === 'crypto'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-[#1e1e2e] text-white border border-white/10'
                  }
                `}>
                  {msg.status === 'success' && (
                    <CheckCircle2 className="w-4 h-4 inline mr-1.5" />
                  )}
                  {msg.status === 'crypto' && msg.cryptoSymbol && (
                    <span className="inline-flex items-center gap-1.5">
                      {(() => {
                        const Icon = cryptoData[msg.cryptoSymbol as CryptoKey]?.icon;
                        return Icon ? <Icon className="w-4 h-4" /> : null;
                      })()}
                      {msg.content}
                    </span>
                  )}
                  {!msg.status?.includes('crypto') && msg.content}
                </div>
              ) : (
                <div className="max-w-[80%] rounded-2xl px-4 py-2 text-sm bg-primary text-primary-foreground">
                  {msg.content}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-[#1a1a2e] dark:bg-[#0f0f1a] border-t border-primary/20 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {dominantCoins.map((coin) => {
            const Icon = cryptoData[coin].icon;
            return (
              <Button
                key={coin}
                size="sm"
                variant={selectedCoin === coin ? "default" : "outline"}
                className="flex-shrink-0 gap-1.5"
                onClick={() => setSelectedCoin(coin)}
                disabled={isProcessing}
                data-testid={`button-coin-${coin.toLowerCase()}`}
              >
                <span className="w-3.5 h-3.5" style={{ color: selectedCoin === coin ? undefined : cryptoData[coin].color }}>
                  <Icon className="w-full h-full" />
                </span>
                {coin}
              </Button>
            );
          })}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {presetAmounts.map((amount) => (
            <Button
              key={amount}
              size="sm"
              variant={selectedAmount === amount ? "secondary" : "ghost"}
              className="flex-shrink-0 text-xs"
              onClick={() => setSelectedAmount(amount)}
              disabled={isProcessing}
              data-testid={`button-amount-${amount}`}
            >
              Rp{formatRupiah(amount)}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder={`Beli ${selectedCoin} Rp${formatRupiah(selectedAmount)}`}
              className="w-full bg-[#0d0d1a] dark:bg-[#050510] border border-primary/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isProcessing}
              data-testid="input-command"
            />
          </div>
          <Button
            size="icon"
            onClick={handleSubmit}
            disabled={isProcessing}
            className="rounded-full"
            data-testid="button-send"
          >
            <Send className="w-4 h-4" />
          </Button>
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
        className="block p-3 bg-gradient-to-r from-primary/10 to-primary/5 text-center text-sm text-primary hover:text-primary/80 transition-colors border-t border-primary/20"
        data-testid="link-open-bot-cta"
      >
        Klik untuk membuka bot di Telegram
      </a>
    </Card>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Coins, Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiTelegram, SiSolana, SiBinance, SiTether } from "react-icons/si";
import { TrxIcon } from "@/components/icons/trx-icon";

const UsdcIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold">$</text>
  </svg>
);

type CryptoKey = 'SOL' | 'BNB' | 'USDC' | 'USDT' | 'TRX';

const cryptoData: Record<CryptoKey, {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  price: number;
  change: string;
  positive: boolean;
}> = {
  SOL:  { icon: SiSolana,  color: "#9945FF", price: 2800000,  change: "+1.24%", positive: true  },
  BNB:  { icon: SiBinance, color: "#F3BA2F", price: 10500000, change: "+0.87%", positive: true  },
  USDC: { icon: UsdcIcon,  color: "#2775CA", price: 16000,    change: "+0.01%", positive: true  },
  USDT: { icon: SiTether,  color: "#26A17B", price: 16000,    change: "+0.01%", positive: true  },
  TRX:  { icon: TrxIcon,   color: "#EF0027", price: 4000,     change: "-0.53%", positive: false },
};

const presetAmounts = [10000, 25000, 50000, 100000];
const coins: CryptoKey[] = ['SOL', 'BNB', 'USDC', 'USDT', 'TRX'];

const LIVE_FEED = [
  { user: "Andi R.",  coin: "SOL",  amount: "Rp50.000",  ago: "2d" },
  { user: "Sari W.",  coin: "BNB",  amount: "Rp100.000", ago: "5d" },
  { user: "Dika P.",  coin: "USDT", amount: "Rp25.000",  ago: "8d" },
  { user: "Rina M.",  coin: "TRX",  amount: "Rp75.000",  ago: "12d" },
  { user: "Budi H.",  coin: "SOL",  amount: "Rp200.000", ago: "1h" },
];

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
      <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1 border border-white/10">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/50"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}

/* Live transaction badge floating outside the phone */
function FloatingNotification() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % LIVE_FEED.length), 3200);
    return () => clearInterval(t);
  }, []);

  const tx = LIVE_FEED[idx];

  return (
    <motion.div
      className="absolute -top-5 -left-6 z-20 bg-card/95 backdrop-blur-md border border-green-500/25
        rounded-2xl px-3 py-2 shadow-xl shadow-black/20 min-w-[170px]"
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold leading-tight truncate">
              {tx.user} beli {tx.coin}
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              {tx.amount} · {tx.ago} lalu
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export function BotAnimation() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: 'Selamat datang di KriptoEcer! 👋', time: getTime() }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping]         = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CryptoKey>('SOL');
  const [selectedAmount, setSelectedAmount] = useState(100000);
  const [messageId, setMessageId]       = useState(2);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  const formatRupiah = (n: number) => new Intl.NumberFormat('id-ID').format(n);

  const calculateCrypto = (coin: CryptoKey, amount: number) => {
    const price = cryptoData[coin].price;
    const val   = amount / price;
    return val < 0.00001 ? val.toExponential(4) : val.toFixed(6);
  };

  const addBotMessage = async (text: string, id: { current: number }) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 900));
    setIsTyping(false);
    setMessages(prev => [...prev, { id: id.current++, type: 'bot', text, time: getTime() }]);
  };

  const simulateTransaction = async (coin: CryptoKey, amount: number) => {
    if (isProcessing) return;
    setIsProcessing(true);
    const id = { current: messageId };

    setMessages(prev => [...prev, {
      id: id.current++, type: 'user',
      text: `Beli ${coin} Rp${formatRupiah(amount)}`, time: getTime(),
    }]);

    await addBotMessage('Pesanan diterima, sedang memproses...', id);
    await new Promise(r => setTimeout(r, 600));

    setMessages(prev => [...prev, {
      id: id.current++, type: 'success', text: 'Transaksi berhasil!', time: getTime(),
    }]);

    await new Promise(r => setTimeout(r, 400));

    setMessages(prev => [...prev, {
      id: id.current++, type: 'crypto',
      text: `${calculateCrypto(coin, amount)} ${coin} → wallet kamu`, time: getTime(),
    }]);

    setMessageId(id.current);
    setIsProcessing(false);
  };

  const resetSimulation = () => {
    setMessages([{ id: 1, type: 'bot', text: 'Selamat datang di KriptoEcer! 👋', time: getTime() }]);
    setMessageId(2);
    setIsTyping(false);
  };

  const coin = cryptoData[selectedCoin];
  const CoinIcon = coin.icon;

  return (
    <div className="relative mx-auto max-w-[320px] lg:max-w-[340px]">

      {/* Live transaction badge */}
      <FloatingNotification />

      {/* Ambient glow blobs */}
      <motion.div
        className="absolute -top-6 -right-6 w-24 h-24 bg-primary/30 rounded-full blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-6 -left-6 w-28 h-28 bg-[#0088cc]/20 rounded-full blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity }}
      />

      {/* ── Phone frame ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative bg-gradient-to-b from-zinc-700 to-zinc-900
          rounded-[3rem] p-[3px]
          shadow-[0_32px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)]"
      >
        {/* Left buttons */}
        <div className="absolute -left-[3px] top-[88px]  w-[3px] h-8  bg-zinc-600 rounded-l-full" />
        <div className="absolute -left-[3px] top-[128px] w-[3px] h-12 bg-zinc-600 rounded-l-full" />
        <div className="absolute -left-[3px] top-[152px] w-[3px] h-12 bg-zinc-600 rounded-l-full" />
        {/* Right button */}
        <div className="absolute -right-[3px] top-[120px] w-[3px] h-16 bg-zinc-600 rounded-r-full" />

        {/* Screen */}
        <div className="bg-[#0d1117] rounded-[2.8rem] overflow-hidden">

          {/* Dynamic island */}
          <div className="flex justify-center pt-3 pb-0">
            <div className="w-28 h-7 bg-black rounded-full flex items-center justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-800 border border-zinc-700" />
            </div>
          </div>

          {/* Status bar */}
          <div className="flex justify-between items-center px-6 py-1.5 text-[11px] font-semibold text-white/80">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <rect x="1"  y="10" width="4" height="10" rx="1" opacity="0.4"/>
                <rect x="7"  y="7"  width="4" height="13" rx="1" opacity="0.6"/>
                <rect x="13" y="4"  width="4" height="16" rx="1" opacity="0.8"/>
                <rect x="19" y="1"  width="4" height="19" rx="1"/>
              </svg>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.5C5 5 9.3 3 12 3s7 2 10.5 5.5M5 12c1.8-1.8 4.3-3 7-3s5.2 1.2 7 3M8.5 15.5c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="12" cy="19" r="1.5"/>
              </svg>
              <div className="flex items-center gap-0.5">
                <div className="w-5 h-2.5 rounded-sm border border-white/60 flex items-center px-0.5">
                  <div className="h-1.5 bg-green-400 rounded-sm" style={{ width: '75%' }} />
                </div>
                <div className="w-0.5 h-1.5 bg-white/40 rounded-r-sm" />
              </div>
            </div>
          </div>

          {/* ── Chat header — Telegram blue gradient ── */}
          <div className="bg-gradient-to-r from-[#006faa] to-[#0099d4] px-4 py-3 flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
                <img src="/favicon.png" alt="KriptoEcer" className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#006faa]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm text-white leading-tight">KriptoEcer Bot</p>
                <svg className="w-3.5 h-3.5 text-white/80 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="text-[11px] text-white/70 leading-tight">
                {isTyping
                  ? <span className="text-white/90">mengetik...</span>
                  : "● Online · bot"
                }
              </p>
            </div>
            <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors">
              <SiTelegram className="w-5 h-5" />
            </a>
          </div>

          {/* ── Chat messages — glassmorphism ── */}
          <div
            ref={chatRef}
            className="px-3 py-3 space-y-2.5 h-48 overflow-y-auto scrollbar-gold"
            style={{ background: "linear-gradient(180deg, rgba(15,20,40,0.92) 0%, rgba(10,14,30,0.96) 100%)" }}
            data-testid="chat-messages"
          >
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22 }}
                  className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}
                  data-testid={`message-${msg.type}-${msg.id}`}
                >
                  {msg.type === "success" ? (
                    <div className="flex items-center gap-1.5 bg-green-500/15 text-green-400
                      px-3 py-1.5 rounded-2xl border border-green-500/25 backdrop-blur-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold">{msg.text}</span>
                    </div>
                  ) : msg.type === "crypto" ? (
                    <div className="flex items-center gap-1.5 bg-primary/15 text-primary
                      px-3 py-1.5 rounded-2xl border border-primary/25 backdrop-blur-sm">
                      <Coins className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold">{msg.text}</span>
                    </div>
                  ) : (
                    <div className={`max-w-[82%] px-3 py-2 text-xs leading-relaxed ${
                      msg.type === "user"
                        ? "bg-[#0088cc] text-white rounded-2xl rounded-tr-sm shadow-md"
                        : "bg-white/10 backdrop-blur-sm text-white/90 border border-white/10 rounded-2xl rounded-tl-sm"
                    }`}>
                      {msg.text}
                    </div>
                  )}
                  <div className={`flex items-center gap-1 mt-0.5 ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                    <span className="text-[9px] text-white/30">{msg.time}</span>
                    {msg.type === "user" && <Check className="w-2.5 h-2.5 text-[#0088cc]/60" />}
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

          {/* ── Controls ── */}
          <div className="p-3 space-y-2 bg-[#0d1220] border-t border-white/5">

            {/* Price ticker */}
            <div className="flex items-center justify-between px-2.5 py-1.5
              bg-white/5 rounded-xl border border-white/8">
              <div className="flex items-center gap-1.5">
                <CoinIcon className="w-3.5 h-3.5" style={{ color: coin.color }} />
                <span className="text-[11px] font-semibold text-white/80">{selectedCoin}</span>
              </div>
              <span className="text-[11px] font-mono text-white/60">
                Rp{formatRupiah(coin.price)}
              </span>
              <span className={`text-[11px] font-semibold flex items-center gap-0.5
                ${coin.positive ? "text-green-400" : "text-red-400"}`}>
                <ArrowUpRight className={`w-3 h-3 ${!coin.positive ? "rotate-180" : ""}`} />
                {coin.change}
              </span>
            </div>

            {/* Coin selector */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
              {coins.map((c) => {
                const Icon = cryptoData[c].icon;
                const active = selectedCoin === c;
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedCoin(c)}
                    disabled={isProcessing}
                    data-testid={`button-coin-${c.toLowerCase()}`}
                    className={`flex-shrink-0 flex items-center gap-1 px-2.5 h-7 rounded-lg text-[11px] font-semibold transition-all ${
                      active
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-white/8 text-white/60 border border-white/10 hover:bg-white/12"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {c}
                  </button>
                );
              })}
            </div>

            {/* Amount selector */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
              {presetAmounts.map((amount) => {
                const active = selectedAmount === amount;
                return (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    disabled={isProcessing}
                    data-testid={`button-amount-${amount}`}
                    className={`flex-shrink-0 px-2.5 h-7 rounded-lg text-[11px] font-semibold transition-all ${
                      active
                        ? "bg-white/15 text-white border border-white/25"
                        : "bg-white/5 text-white/50 border border-white/8 hover:bg-white/10"
                    }`}
                  >
                    {amount >= 1000 ? `${amount / 1000}rb` : amount}
                  </button>
                );
              })}
            </div>

            {/* Send bar */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full
                bg-white/8 border border-white/12 cursor-pointer
                hover:border-primary/50 transition-colors"
              onClick={() => !isProcessing && simulateTransaction(selectedCoin, selectedAmount)}
            >
              <span className="text-xs text-white/50 flex-1 truncate">
                {isProcessing ? 'Memproses...' : `Beli ${selectedCoin} Rp${formatRupiah(selectedAmount)}`}
              </span>
              <button
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center
                  flex-shrink-0 disabled:opacity-50 transition-opacity shadow-md"
                disabled={isProcessing}
                onClick={(e) => { e.stopPropagation(); simulateTransaction(selectedCoin, selectedAmount); }}
                data-testid="button-send"
              >
                <Send className="w-3 h-3 text-primary-foreground" />
              </button>
            </div>

            {messages.length > 3 && (
              <button
                onClick={resetSimulation}
                data-testid="button-reset"
                className="w-full text-[11px] text-white/30 hover:text-white/50 py-1 transition-colors"
              >
                Reset Demo
              </button>
            )}
          </div>

          {/* Open in Telegram */}
          <a
            href="https://t.me/kriptoecerbot"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-bot-chat"
            className="block px-4 py-2.5 bg-[#0088cc]/10 hover:bg-[#0088cc]/20
              border-t border-white/5 transition-colors text-center"
          >
            <p className="text-[11px] text-[#0088cc] font-semibold">
              Klik untuk membuka bot di Telegram →
            </p>
          </a>

          {/* Home indicator */}
          <div className="flex justify-center pb-2 pt-1">
            <div className="w-24 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

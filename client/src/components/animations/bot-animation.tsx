import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Coins, Check, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import { SiTelegram, SiSolana, SiBinance, SiTether, SiBitcoin, SiEthereum } from "react-icons/si";
import { TrxIcon } from "@/components/icons/trx-icon";

const UsdcIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold">$</text>
  </svg>
);

/* ── Coin config — IDs match CoinGecko ── */
const COINS = [
  { id: "solana",      symbol: "SOL",  Icon: SiSolana,   color: "#9945FF", fallback: 2_800_000     },
  { id: "binancecoin", symbol: "BNB",  Icon: SiBinance,  color: "#F3BA2F", fallback: 10_500_000    },
  { id: "usd-coin",    symbol: "USDC", Icon: UsdcIcon,   color: "#2775CA", fallback: 16_300         },
  { id: "tether",      symbol: "USDT", Icon: SiTether,   color: "#26A17B", fallback: 16_280         },
  { id: "tron",        symbol: "TRX",  Icon: TrxIcon,    color: "#EF0027", fallback: 5_800          },
  { id: "bitcoin",     symbol: "BTC",  Icon: SiBitcoin,  color: "#F7931A", fallback: 1_650_000_000  },
  { id: "ethereum",    symbol: "ETH",  Icon: SiEthereum, color: "#627EEA", fallback: 54_000_000     },
] as const;

type CoinId = typeof COINS[number]["id"];

interface Message {
  id:   number;
  type: "bot" | "user" | "success" | "crypto";
  text: string;
  time: string;
}

function getTime() {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

/* ── Typing indicator ── */
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1 border border-white/10">
        {[0, 1, 2].map(i => (
          <motion.span key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/50"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}


/* ── Scrollable row with right-fade hint ── */
const EDGE_ZONE = 36;   // px from edge that activates scroll
const MAX_SPEED = 7;    // px/frame at full edge
const LERP     = 0.12;  // smoothing factor (lower = smoother but slower response)

function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref       = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number | null>(null);
  const velRef    = useRef(0);
  const targetRef = useRef(0);

  /* drag state */
  const dragging      = useRef(false);
  const dragStartX    = useRef(0);
  const dragStartLeft = useRef(0);
  const dragMoved     = useRef(0);   // total px moved — used to cancel click if drag

  const [atStart, setAtStart] = useState(true);
  const [atEnd,   setAtEnd]   = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const checkEdges = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => { checkEdges(); }, [children]);

  /* Continuous rAF loop — smooth velocity lerp */
  useEffect(() => {
    const loop = () => {
      if (!dragging.current) {
        velRef.current += (targetRef.current - velRef.current) * LERP;
        const el = ref.current;
        if (el && Math.abs(velRef.current) > 0.15) {
          el.scrollLeft += velRef.current;
          checkEdges();
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, []);

  /* ── Mouse edge-hover (desktop) ── */
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging.current) {
      /* drag-scroll */
      const dx = e.clientX - dragStartX.current;
      dragMoved.current = Math.abs(dx);
      if (ref.current) { ref.current.scrollLeft = dragStartLeft.current - dx; checkEdges(); }
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const w = rect.width;
    if (x < EDGE_ZONE) {
      const t = 1 - x / EDGE_ZONE;
      targetRef.current = -(t * t * MAX_SPEED);
    } else if (x > w - EDGE_ZONE) {
      const t = 1 - (w - x) / EDGE_ZONE;
      targetRef.current = t * t * MAX_SPEED;
    } else {
      targetRef.current = 0;
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current    = true;
    dragStartX.current  = e.clientX;
    dragStartLeft.current = ref.current?.scrollLeft ?? 0;
    dragMoved.current   = 0;
    targetRef.current   = 0;
    setIsDragging(true);
  };

  const onMouseUp = () => {
    dragging.current = false;
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    dragging.current = false;
    setIsDragging(false);
    targetRef.current = 0;
  };

  /* Prevent click on child buttons if user dragged >4px */
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragMoved.current > 4) e.stopPropagation();
  };

  useEffect(() => () => { targetRef.current = 0; }, []);

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={checkEdges}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onClickCapture={onClickCapture}
        className={`flex gap-1.5 overflow-x-auto select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {children}
        <div className="w-2 flex-shrink-0" />
      </div>
      {/* Left fade — visible when scrolled past start */}
      <AnimatePresence>
        {!atStart && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute left-0 top-0 bottom-0 w-6 pointer-events-none
              bg-gradient-to-r from-[#0d1220] to-transparent"
          />
        )}
      </AnimatePresence>
      {/* Right fade — visible when more content to the right */}
      <AnimatePresence>
        {!atEnd && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none
              bg-gradient-to-l from-[#0d1220] to-transparent"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export function BotAnimation() {
  const [prices,   setPrices]   = useState<Record<string, number>>({});
  const [loading,  setLoading]  = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: "bot", text: "Selamat datang di KriptoEcer! 👋", time: getTime() },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping,     setIsTyping]     = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
  const [amountInput,  setAmountInput]  = useState("100.000");
  const [selectedAmount, setSelectedAmount] = useState(100_000);
  const [messageId, setMessageId] = useState(2);
  const chatDesktopRef = useRef<HTMLDivElement>(null);
  const chatMobileRef  = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  const scrollChats = () => {
    for (const ref of [chatDesktopRef, chatMobileRef]) {
      const el = ref.current;
      if (el) el.scrollTop = el.scrollHeight;
    }
  };

  /* ── Fetch live prices ── */
  const fetchPrices = useCallback(async (showSpin = false) => {
    if (showSpin) setRefreshing(true);
    try {
      const res = await fetch("/api/prices", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data: Record<string, { idr: number; idr_24h_change: number }> = await res.json();
      const map: Record<string, number> = {};
      COINS.forEach(c => { if (data[c.id]?.idr) map[c.id] = data[c.id].idr; });
      setPrices(map);
      setLastUpdated(new Date());
    } catch { /* use fallbacks */ }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => {
    fetchPrices();
    const t = setInterval(() => fetchPrices(), 60_000);
    return () => clearInterval(t);
  }, [fetchPrices]);

  useEffect(() => {
    const id = setTimeout(scrollChats, 60);
    return () => clearTimeout(id);
  }, [messages, isTyping]);

  /* ── Helpers ── */
  const livePrice   = (coin: typeof COINS[number]) => prices[coin.id] ?? coin.fallback;
  const formatIDR   = (n: number) => n.toLocaleString("id-ID");
  const formatShort = (p: number) => {
    if (p >= 1_000_000_000) return `Rp${(p / 1_000_000_000).toFixed(2)}M`;
    if (p >= 1_000_000)     return `Rp${(p / 1_000_000).toFixed(2)}Jt`;
    return `Rp${formatIDR(Math.round(p))}`;
  };
  const calcCrypto = (coin: typeof COINS[number], idr: number) => {
    const price = livePrice(coin);
    if (!price) return "0";
    const val = idr / price;
    if (val === 0) return "0";
    // Decimal places to show 4–5 significant digits, no scientific notation
    const mag      = Math.floor(Math.log10(Math.abs(val)));
    const decimals = Math.min(Math.max(0, 4 - mag - 1), 10);
    return val.toFixed(decimals).replace(/\.?0+$/, ""); // trim trailing zeros
  };

  /* ── Amount input ── */
  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const num = parseInt(raw) || 0;
    setSelectedAmount(num);
    setAmountInput(raw ? num.toLocaleString("id-ID") : "");
  };
  const handlePreset = (amount: number) => {
    setSelectedAmount(amount);
    setAmountInput(amount.toLocaleString("id-ID"));
  };

  /* ── Simulate transaction ── */
  const simulateTransaction = async () => {
    if (isProcessing || selectedAmount < 10_000) return;
    setIsProcessing(true);
    const id   = { current: messageId };
    const coin = selectedCoin;
    const amt  = selectedAmount;

    setMessages(prev => [...prev, {
      id: id.current++, type: "user",
      text: `Beli ${coin.symbol} Rp${formatIDR(amt)}`, time: getTime(),
    }]);

    setIsTyping(true);
    await new Promise(r => setTimeout(r, 900));
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: id.current++, type: "bot",
      text: "Pesanan diterima, sedang memproses...", time: getTime(),
    }]);

    await new Promise(r => setTimeout(r, 600));
    setMessages(prev => [...prev, {
      id: id.current++, type: "success", text: "Transaksi berhasil!", time: getTime(),
    }]);

    await new Promise(r => setTimeout(r, 400));
    setMessages(prev => [...prev, {
      id: id.current++, type: "crypto",
      text: `${calcCrypto(coin, amt)} ${coin.symbol} → wallet kamu`, time: getTime(),
    }]);

    setMessageId(id.current);
    setIsProcessing(false);
  };

  const resetSimulation = () => {
    setMessages([{ id: 1, type: "bot", text: "Selamat datang di KriptoEcer! 👋", time: getTime() }]);
    setMessageId(2);
    setIsTyping(false);
  };

  /* ── Price display for selected coin ── */
  const price       = livePrice(selectedCoin);
  const CoinIcon    = selectedCoin.Icon;
  const updatedStr  = lastUpdated
    ? lastUpdated.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    : null;

  /* ─── Chat content — menerima ref terpisah untuk desktop vs mobile ─── */
  const buildChat = (chatDivRef: React.RefObject<HTMLDivElement>) => (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#005f94] to-[#0094c8] px-4 py-3 flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
            <img src="/favicon.png" alt="KriptoEcer" className="w-6 h-6" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#005f94]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm text-white leading-tight">KriptoEcer Bot</p>
            <svg className="w-3.5 h-3.5 text-white/80 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p className="text-[11px] text-white/70">
            {isTyping ? <span className="text-white/95">mengetik...</span> : "● Online · bot"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {updatedStr && (
            <button onClick={() => fetchPrices(true)}
              className="text-white/50 hover:text-white/80 transition-colors"
              title={`Diperbarui ${updatedStr}`}>
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          )}
          <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors">
            <SiTelegram className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatDivRef}
        className="px-3 py-3 space-y-2.5 h-44 overflow-y-auto scrollbar-gold"
        style={{ background: "linear-gradient(180deg,rgba(12,17,35,0.95) 0%,rgba(8,12,28,0.97) 100%)" }}
        data-testid="chat-messages"
      >
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}
              data-testid={`message-${msg.type}-${msg.id}`}
            >
              {msg.type === "success" ? (
                <div className="flex items-center gap-1.5 bg-green-500/15 text-green-400 px-3 py-1.5 rounded-2xl border border-green-500/25">
                  <CheckCircle2 className="w-3.5 h-3.5" /><span className="text-xs font-semibold">{msg.text}</span>
                </div>
              ) : msg.type === "crypto" ? (
                <div className="flex items-center gap-1.5 bg-primary/15 text-primary px-3 py-1.5 rounded-2xl border border-primary/25">
                  <Coins className="w-3.5 h-3.5" /><span className="text-xs font-semibold">{msg.text}</span>
                </div>
              ) : (
                <div className={`max-w-[82%] px-3 py-2 text-xs leading-relaxed ${
                  msg.type === "user"
                    ? "bg-[#0088cc] text-white rounded-2xl rounded-tr-sm"
                    : "bg-white/10 text-white/90 border border-white/10 rounded-2xl rounded-tl-sm"
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
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="p-3 space-y-2 bg-[#0d1220] border-t border-white/5">

        {/* Price ticker — live */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/5 rounded-xl border border-white/[0.07]">
          <CoinIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: selectedCoin.color }} />
          <span className="text-[11px] font-semibold text-white/80">{selectedCoin.symbol}</span>
          <span className="text-[11px] font-mono text-white/50 flex-1 text-right">
            {loading ? "memuat..." : formatShort(price)}
          </span>
          {loading && <span className="text-[10px] text-white/30 animate-pulse">…</span>}
          {!loading && lastUpdated && (
            <span className="text-[10px] text-green-400/70 flex-shrink-0 font-semibold">live</span>
          )}
        </div>

        {/* Coin selector — horizontally scrollable with fade hint */}
        <ScrollRow>
          {COINS.map(c => {
            const Icon   = c.Icon;
            const active = selectedCoin.id === c.id;
            return (
              <button key={c.id}
                onClick={() => setSelectedCoin(c)}
                disabled={isProcessing}
                data-testid={`button-coin-${c.symbol.toLowerCase()}`}
                className={`flex-shrink-0 flex items-center gap-1 px-2.5 h-7 rounded-lg
                  text-[11px] font-semibold transition-all active:scale-95 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-white/8 text-white/60 border border-white/10 hover:bg-white/12"
                }`}
              >
                <Icon className="w-3 h-3" style={{ color: active ? undefined : c.color }} />
                {c.symbol}
              </button>
            );
          })}
        </ScrollRow>

        {/* Manual amount input */}
        <div className="flex items-center gap-1.5 bg-white/8 border border-white/12
          rounded-xl px-3 py-2 focus-within:border-primary/50 transition-colors">
          <span className="text-sm text-white/40 font-semibold flex-shrink-0">Rp</span>
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={amountInput}
            onChange={handleAmountInput}
            placeholder="10.000"
            disabled={isProcessing}
            data-testid="input-bot-amount"
            className="flex-1 bg-transparent text-white text-sm font-bold outline-none
              placeholder-white/20 min-w-0 caret-primary"
          />
          {/* Live result */}
          {selectedAmount >= 10_000 && !loading && (
            <span className="text-[10px] text-primary/80 font-semibold flex-shrink-0 max-w-[90px] truncate text-right">
              ≈{calcCrypto(selectedCoin, selectedAmount)} {selectedCoin.symbol}
            </span>
          )}
          {amountInput && (
            <button onClick={() => { setAmountInput(""); setSelectedAmount(0); }}
              className="text-white/25 hover:text-white/60 transition-colors text-xs flex-shrink-0 ml-0.5">
              ✕
            </button>
          )}
        </div>

        {/* Preset amounts — scrollable */}
        <ScrollRow>
          {[10_000, 25_000, 50_000, 100_000, 250_000, 500_000].map(amount => {
            const active = selectedAmount === amount;
            return (
              <button key={amount}
                onClick={() => handlePreset(amount)}
                disabled={isProcessing}
                data-testid={`button-amount-${amount}`}
                className={`flex-shrink-0 px-2.5 h-7 rounded-lg text-[11px] font-semibold
                  transition-all active:scale-95 ${
                  active
                    ? "bg-white/15 text-white border border-white/30"
                    : "bg-white/5 text-white/50 border border-white/8 hover:bg-white/10"
                }`}
              >
                {amount >= 1_000_000 ? `${amount / 1_000_000}jt` : `${amount / 1_000}rb`}
              </button>
            );
          })}
        </ScrollRow>

        {/* Send button */}
        <button
          onClick={simulateTransaction}
          disabled={isProcessing || selectedAmount < 10_000}
          data-testid="button-send"
          className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl
            bg-primary hover:bg-primary/90 disabled:opacity-40
            transition-all active:scale-[0.98] shadow-md"
        >
          <span className="text-sm font-semibold text-primary-foreground truncate">
            {isProcessing ? "Memproses..." : selectedAmount < 10_000
              ? "Min. Rp10.000"
              : `Beli ${selectedCoin.symbol} Rp${formatIDR(selectedAmount)}`}
          </span>
          <Send className="w-4 h-4 text-primary-foreground flex-shrink-0" />
        </button>

        {messages.length > 3 && (
          <button onClick={resetSimulation} data-testid="button-reset"
            className="w-full text-[11px] text-white/30 hover:text-white/50 py-0.5 transition-colors">
            Reset Demo
          </button>
        )}
      </div>

    </>
  );

  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      {/* Glows */}
      <motion.div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/25 rounded-full blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity }} />
      <motion.div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[#0088cc]/20 rounded-full blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 4.5, repeat: Infinity }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Desktop — phone frame */}
        <div className="hidden lg:block">
          <div className="relative bg-gradient-to-b from-zinc-700 to-zinc-900
            rounded-[3rem] p-[3px]
            shadow-[0_32px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)]">
            <div className="absolute -left-[3px] top-[86px]  w-[3px] h-8  bg-zinc-600 rounded-l-full" />
            <div className="absolute -left-[3px] top-[126px] w-[3px] h-12 bg-zinc-600 rounded-l-full" />
            <div className="absolute -left-[3px] top-[150px] w-[3px] h-12 bg-zinc-600 rounded-l-full" />
            <div className="absolute -right-[3px] top-[118px] w-[3px] h-16 bg-zinc-600 rounded-r-full" />
            <div className="bg-[#0d1117] rounded-[2.8rem] overflow-hidden">
              <div className="flex justify-center pt-3 pb-0">
                <div className="w-28 h-7 bg-black rounded-full flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-3.5 h-3.5 rounded-full bg-zinc-800 border border-zinc-700" />
                </div>
              </div>
              <div className="flex justify-between items-center px-6 py-1.5 text-[11px] font-semibold text-white/80">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="1" y="10" width="4" height="10" rx="1" opacity="0.4"/>
                    <rect x="7" y="7"  width="4" height="13" rx="1" opacity="0.6"/>
                    <rect x="13" y="4" width="4" height="16" rx="1" opacity="0.8"/>
                    <rect x="19" y="1" width="4" height="19" rx="1"/>
                  </svg>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 8.5C5 5 9.3 3 12 3s7 2 10.5 5.5M5 12c1.8-1.8 4.3-3 7-3s5.2 1.2 7 3M8.5 15.5c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5"
                      stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <circle cx="12" cy="19" r="1.5"/>
                  </svg>
                  <div className="flex items-center gap-0.5">
                    <div className="w-5 h-2.5 rounded-sm border border-white/60 flex items-center px-0.5">
                      <div className="h-1.5 bg-green-400 rounded-sm" style={{ width: "75%" }} />
                    </div>
                    <div className="w-0.5 h-1.5 bg-white/40 rounded-r-sm" />
                  </div>
                </div>
              </div>
              {buildChat(chatDesktopRef)}
              <div className="flex justify-center pb-2 pt-1">
                <div className="w-24 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — plain card */}
        <div className="lg:hidden bg-[#0d1117] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
          {buildChat(chatMobileRef)}
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { QrCode, Building2, CreditCard, Bot, CheckCircle2 } from "lucide-react";
import { SiPaypal } from "react-icons/si";

const QRISVisual = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative">
      <div className="w-40 h-40 bg-white dark:bg-gray-900 rounded-xl p-3 shadow-lg border border-border">
        <div className="grid grid-cols-7 grid-rows-7 gap-0.5 w-full h-full">
          {Array.from({ length: 49 }).map((_, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const isFinderTL = (row < 3 && col < 3);
            const isFinderTR = (row < 3 && col > 3);
            const isFinderBL = (row > 3 && col < 3);
            const isBorder = (row === 0 || row === 2 || col === 0 || col === 2) && (row < 3 && col < 3) ||
              (row === 0 || row === 2 || col === 4 || col === 6) && (row < 3 && col > 3) ||
              (row === 4 || row === 6 || col === 0 || col === 2) && (row > 3 && col < 3);
            const isFilled = isFinderTL || isFinderTR || isFinderBL || (Math.random() > 0.55 && !isBorder);
            return (
              <div
                key={i}
                className={`rounded-sm ${
                  isFinderTL && row === 1 && col === 1 ? "bg-primary" :
                  isFinderTR && row === 1 && col === 5 ? "bg-primary" :
                  isFinderBL && row === 5 && col === 1 ? "bg-primary" :
                  isBorder ? "bg-gray-900 dark:bg-white" :
                  isFilled ? "bg-gray-900 dark:bg-white" : "bg-transparent"
                }`}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
        <QrCode className="w-4 h-4 text-primary-foreground" />
      </div>
    </div>
    <div className="text-center">
      <p className="font-bold text-lg">Rp 25.000</p>
      <p className="text-xs text-muted-foreground mb-3">Scan & bayar dari app manapun</p>
      <div className="flex items-center gap-2 justify-center flex-wrap">
        {["GoPay", "OVO", "Dana", "ShopeePay", "BCA", "Mandiri"].map(b => (
          <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-muted border border-border font-medium">{b}</span>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
      <CheckCircle2 className="w-4 h-4" />
      Konfirmasi otomatis &lt; 10 detik
    </div>
  </div>
);

const VAVisual = () => (
  <div className="w-full max-w-xs mx-auto">
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <p className="text-xs opacity-80">Virtual Account</p>
        <p className="text-lg font-bold">KriptoEcer Payment</p>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">Nama Penerima</p>
          <p className="font-semibold">KriptoEcer Indonesia</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Nomor Virtual Account</p>
          <div className="flex items-center gap-2">
            <p className="font-mono font-bold text-lg tracking-wider">8277 •••• ••••</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-1 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Total Bayar</p>
            <p className="font-bold text-primary">Rp 50.000</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Berlaku</p>
            <p className="text-sm font-medium">24 Jam</p>
          </div>
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center mt-3">Transfer dari bank manapun · Konfirmasi otomatis</p>
  </div>
);

const PayPalVisual = () => (
  <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden w-full">
      <div className="bg-[#003087] p-4 flex items-center justify-center gap-2">
        <SiPaypal className="w-6 h-6 text-[#009CDE]" />
        <span className="text-white font-bold text-xl">PayPal</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Kamu membayar</p>
          <p className="font-bold text-xl">$3.20 USD</p>
          <p className="text-xs text-muted-foreground">(≈ Rp 50.000)</p>
        </div>
        <div className="text-sm text-muted-foreground text-center">
          <p>Kepada: <span className="text-foreground font-medium">kriptoecer@paypal.me</span></p>
        </div>
        <button className="w-full bg-[#FFB900] hover:bg-[#F5A900] text-black font-bold py-2.5 rounded-xl text-sm transition-colors">
          Bayar dengan PayPal
        </button>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center">Cocok untuk pengguna internasional · Kurs otomatis</p>
  </div>
);

const CryptoBotVisual = () => (
  <div className="w-full max-w-xs mx-auto">
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
      <div className="bg-[#0088cc]/20 p-3 flex items-center gap-2 border-b border-border">
        <div className="w-7 h-7 rounded-full bg-[#0088cc] flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold">CryptoBot</p>
          <p className="text-[10px] text-muted-foreground">@CryptoBot · Telegram</p>
        </div>
      </div>
      <div className="p-3 space-y-2 bg-muted/20 min-h-[120px]">
        <div className="flex justify-end">
          <div className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-xl rounded-tr-sm max-w-[70%]">
            /pay @kriptoecerbot 3 USDT
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-card border border-border text-xs px-3 py-1.5 rounded-xl rounded-tl-sm max-w-[75%]">
            ✅ Transfer berhasil!<br />
            <span className="text-green-500 font-medium">3 USDT → @kriptoecerbot</span>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-card border border-border text-xs px-3 py-1.5 rounded-xl rounded-tl-sm max-w-[75%] text-primary">
            Saldo kamu sudah aktif 🎉
          </div>
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center mt-3">Bayar pakai crypto · Transfer instan antar bot</p>
  </div>
);

const methods = [
  {
    id: "qris",
    label: "QRIS",
    icon: QrCode,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    activeBg: "bg-blue-500",
    title: "Scan QRIS, Bayar Instan",
    description: "Tersedia untuk semua bank & dompet digital. GoPay, OVO, Dana, ShopeePay, BCA, Mandiri, dan lainnya. Konfirmasi otomatis dalam hitungan detik.",
    visual: <QRISVisual />,
  },
  {
    id: "va",
    label: "Virtual Account",
    icon: Building2,
    color: "text-green-500",
    bg: "bg-green-500/10",
    activeBg: "bg-green-500",
    title: "Transfer Bank via VA",
    description: "Nomor Virtual Account digenerate otomatis untuk tiap transaksi. Transfer dari bank manapun tanpa perlu konfirmasi manual.",
    visual: <VAVisual />,
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: CreditCard,
    color: "text-[#009CDE]",
    bg: "bg-blue-400/10",
    activeBg: "bg-[#003087]",
    title: "Bayar via PayPal",
    description: "Untuk kamu yang lebih familiar dengan pembayaran internasional. Kurs USD ke IDR dikonversi otomatis.",
    visual: <PayPalVisual />,
  },
  {
    id: "cryptobot",
    label: "CryptoBot",
    icon: Bot,
    color: "text-[#0088cc]",
    bg: "bg-sky-500/10",
    activeBg: "bg-[#0088cc]",
    title: "Deposit via CryptoBot",
    description: "Punya saldo crypto di CryptoBot Telegram? Transfer langsung ke @kriptoecerbot tanpa keluar dari aplikasi.",
    visual: <CryptoBotVisual />,
  },
];

export function DepositSection() {
  const [active, setActive] = useState(0);
  const current = methods[active];

  return (
    <section id="deposit" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4">Metode Deposit</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            4 Cara Deposit, Semua Otomatis
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Pilih metode pembayaran yang paling nyaman. Semua dikonfirmasi otomatis — tidak perlu chat admin, tidak perlu tunggu.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {methods.map((m, i) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    active === i
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                      : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {m.label}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${current.bg}`}>
                  <current.icon className={`w-6 h-6 ${current.color}`} />
                </div>
                <h3 className="text-2xl font-bold">{current.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{current.description}</p>
                <div className="flex items-center gap-2 text-sm text-green-500 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Konfirmasi otomatis tanpa admin
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${active}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                {current.visual}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center gap-2"
          >
            {methods.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active === i ? "w-6 bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

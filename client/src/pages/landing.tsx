import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Zap,
  Shield,
  Wallet,
  Clock,
  ArrowRight,
  Bot,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  MessageCircle,
  Coins,
  Send,
  Users,
  Globe,
} from "lucide-react";
import { SiTelegram, SiBitcoin, SiEthereum, SiSolana, SiBinance, SiTether, SiLitecoin, SiDogecoin } from "react-icons/si";
import { motion } from "framer-motion";
const logoImage = "/favicon.png";
import { FloatingCoins } from "@/components/animations/floating-coins";
import { BlockchainGrid } from "@/components/animations/blockchain-grid";
import { TransactionFeed } from "@/components/animations/transaction-feed";
import { BotAnimation } from "@/components/animations/bot-animation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2" data-testid="link-header-logo">
          <img src={logoImage} alt="KriptoEcer" className="w-9 h-9 rounded-md" />
          <span className="text-lg font-bold tracking-tight">KriptoEcer</span>
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild data-testid="button-header-cta">
            <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
              <Bot className="w-4 h-4 mr-1.5" />
              Start Bot
            </a>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-28 pb-12 overflow-hidden min-h-[85vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <BlockchainGrid />
      <FloatingCoins />
      
      <motion.div
        className="absolute top-20 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6" data-testid="badge-hero">
                <Zap className="w-3 h-3 mr-1" />
                Bot Telegram Crypto #1 Indonesia
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              data-testid="text-hero-title"
            >
              Beli Crypto Eceran{" "}
              <span className="text-primary relative">
                dalam Hitungan Detik
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8"
            >
              Transaksi cryptocurrency dengan nominal kecil, proses otomatis, dan tanpa ribet.
              Langsung dari Telegram favorit Anda.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Button size="lg" asChild data-testid="button-hero-start">
                <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
                  <SiTelegram className="w-5 h-5 mr-2" />
                  Buka Bot Telegram
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-hero-learn">
                <a href="#cara-kerja">
                  Pelajari Lebih Lanjut
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-10 grid grid-cols-3 gap-4"
            >
              <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur border border-border">
                <motion.p
                  className="text-2xl sm:text-3xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  10K+
                </motion.p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Transaksi</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur border border-border">
                <motion.p
                  className="text-2xl sm:text-3xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  5K+
                </motion.p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Pengguna</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur border border-border">
                <motion.p
                  className="text-2xl sm:text-3xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  24/7
                </motion.p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Online</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <BotAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LiveTransactionsSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <BlockchainGrid />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4" data-testid="badge-live">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Live
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-live-title">Aktivitas Terbaru</h2>
              </div>
              
              <Card className="bg-card/90 backdrop-blur border-border shadow-lg">
                <CardContent className="p-4">
                  <TransactionFeed />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-3">Kenapa Ramai?</h3>
                <p className="text-base text-muted-foreground">
                  Ribuan pengguna sudah membuktikan kemudahan bertransaksi crypto di KriptoEcer.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-base">Proses Instan</p>
                    <p className="text-sm text-muted-foreground">Transaksi selesai dalam detik</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-base">Mulai Rp 10.000</p>
                    <p className="text-sm text-muted-foreground">Modal kecil, untung besar</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-base">Aman & Terpercaya</p>
                    <p className="text-sm text-muted-foreground">Sistem otomatis 24/7</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full" asChild data-testid="button-live-cta">
                <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
                  <SiTelegram className="w-5 h-5 mr-2" />
                  Mulai Trading Sekarang
                </a>
              </Button>

              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
                <a 
                  href="https://t.me/kriptoecerchannel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  data-testid="link-tx-log"
                >
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Log Transaksi Onchain
                </a>
                <a 
                  href="https://t.me/kriptoecerofficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  data-testid="link-join-channel"
                >
                  <SiTelegram className="w-4 h-4 text-[#0088cc]" />
                  Join Channel
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Zap,
    title: "Transaksi Instan",
    description: "Proses pembelian crypto selesai dalam hitungan detik. Tidak perlu menunggu lama.",
  },
  {
    icon: Wallet,
    title: "Nominal Kecil",
    description: "Mulai dari Rp10.000 saja. Cocok untuk beli coin untuk fee transfer atau coba-coba.",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Sistem otomatis yang terjamin keamanannya. Transaksi Anda dilindungi.",
  },
  {
    icon: Bot,
    title: "Full Otomatis",
    description: "Bot memberikan instruksi lengkap. Transaksi mandiri tanpa perlu interaksi admin.",
  },
  {
    icon: CreditCard,
    title: "Metode Pembayaran Lengkap",
    description: "Transfer bank, e-wallet, QRIS, dan berbagai metode pembayaran lainnya.",
  },
  {
    icon: TrendingUp,
    title: "Harga Real-Time",
    description: "Harga cryptocurrency selalu update mengikuti pasar secara real-time.",
  },
];

function FeaturesSection() {
  return (
    <section id="fitur" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4" data-testid="badge-features">Fitur Unggulan</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-features-title">
            Mengapa Memilih KriptoEcer?
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Solusi terbaik untuk membeli cryptocurrency dengan nominal kecil secara praktis dan aman.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Buka Bot Telegram",
    description: "Cari @kriptoecerbot di Telegram atau klik tombol di halaman ini untuk langsung membuka bot.",
  },
  {
    number: "02",
    icon: Send,
    title: "Klik Start",
    description: "Klik tombol Start untuk memulai dan ikuti instruksi yang diberikan oleh bot.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Top Up Saldo",
    description: "Pilih metode pembayaran dan top up saldo sesuai kebutuhan Anda.",
  },
  {
    number: "04",
    icon: Coins,
    title: "Beli Crypto",
    description: "Pilih crypto yang ingin dibeli dan transaksi akan diproses secara otomatis!",
  },
];

function StepNumber({ number, delay }: { number: string; delay: number }) {
  return (
    <motion.div
      className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
    >
      <span className="text-lg font-bold text-primary-foreground">{number}</span>
    </motion.div>
  );
}

function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4" data-testid="badge-how-it-works">Cara Kerja</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-how-it-works-title">
            4 Langkah Mudah untuk Memulai
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Proses yang simpel dan bisa dilakukan siapa saja, bahkan pemula sekalipun.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Card className="h-full overflow-visible hover-elevate">
                <CardContent className="p-6 pt-8 text-center relative">
                  <StepNumber number={step.number} delay={index * 0.1} />
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 border border-primary/20"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <ArrowRight className="w-6 h-6 text-primary/50" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "Apa itu KriptoEcer?",
    answer: "KriptoEcer adalah bot Telegram yang memungkinkan Anda membeli cryptocurrency dengan nominal kecil secara instan dan otomatis. Cocok untuk pemula maupun yang sudah berpengalaman.",
  },
  {
    question: "Berapa minimal transaksi?",
    answer: "Minimal transaksi di KriptoEcer mulai dari Rp10.000 saja. Sangat cocok untuk Anda yang ingin mencoba atau membeli coin untuk keperluan fee transfer.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menyediakan berbagai metode pembayaran termasuk transfer bank, e-wallet (OVO, GoPay, Dana), QRIS, virtual account, dan metode pembayaran lainnya.",
  },
  {
    question: "Berapa lama proses transaksi?",
    answer: "Transaksi diproses secara otomatis dan biasanya selesai dalam hitungan detik hingga beberapa menit, tergantung metode pembayaran yang Anda pilih.",
  },
  {
    question: "Cryptocurrency apa saja yang tersedia?",
    answer: "Kami menyediakan berbagai cryptocurrency populer termasuk Bitcoin, Ethereum, dan berbagai altcoin lainnya. Silakan cek bot untuk daftar lengkapnya.",
  },
  {
    question: "Apakah aman bertransaksi di KriptoEcer?",
    answer: "Ya, KriptoEcer menggunakan sistem otomatis yang aman dan terjamin. Semua transaksi tercatat dan dapat diverifikasi.",
  },
];

function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4" data-testid="badge-faq">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-faq-title">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar KriptoEcer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger
                  className="text-left"
                  data-testid={`accordion-trigger-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <SiSolana className="absolute top-4 left-[5%] w-5 md:w-6 h-5 md:h-6 text-black opacity-10" />
            <SiBinance className="absolute top-8 left-[15%] w-7 md:w-10 h-7 md:h-10 text-black opacity-10" />
            <SiBitcoin className="absolute bottom-6 left-[8%] w-10 md:w-14 h-10 md:h-14 text-black opacity-[0.06]" />
            <SiTether className="absolute top-12 left-[28%] w-6 md:w-8 h-6 md:h-8 text-black opacity-10" />
            <SiEthereum className="absolute bottom-10 left-[22%] w-4 md:w-5 h-4 md:h-5 text-black opacity-[0.12]" />
            <SiSolana className="absolute top-6 right-[5%] w-9 md:w-12 h-9 md:h-12 text-black opacity-[0.08]" />
            <SiLitecoin className="absolute top-16 right-[15%] w-5 md:w-7 h-5 md:h-7 text-black opacity-10" />
            <SiBinance className="absolute bottom-4 right-[8%] w-12 md:w-16 h-12 md:h-16 text-black opacity-[0.05]" />
            <SiDogecoin className="absolute bottom-12 right-[22%] w-7 md:w-9 h-7 md:h-9 text-black opacity-[0.08]" />
            <SiTether className="absolute top-4 right-[30%] w-4 md:w-5 h-4 md:h-5 text-black opacity-[0.12]" />
          </div>
          
          <div className="relative p-8 sm:p-12 md:p-16 text-center">
            <Clock className="w-12 h-12 text-primary-foreground/80 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4" data-testid="text-cta-title">
              Siap Memulai Perjalanan Crypto Anda?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
              Bergabung sekarang dan nikmati kemudahan beli crypto eceran langsung dari Telegram.
              Proses cepat, aman, dan tanpa ribet!
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-primary-foreground text-primary"
              asChild
              data-testid="button-cta-start"
            >
              <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
                <SiTelegram className="w-5 h-5 mr-2" />
                Buka KriptoEcer Bot
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="/" className="flex items-center gap-2 mb-4" data-testid="link-footer-logo">
              <img src={logoImage} alt="KriptoEcer" className="w-10 h-10 rounded-lg" />
              <span className="font-bold text-lg">KriptoEcer</span>
            </a>
            <p className="text-sm text-muted-foreground mb-4">
              Platform jual beli crypto eceran via Telegram. Mudah, cepat, dan aman untuk semua orang.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://t.me/kriptoecerbot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0088cc] flex items-center justify-center hover:opacity-80 transition-opacity"
                data-testid="link-footer-telegram"
              >
                <SiTelegram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#fitur" className="hover:text-foreground transition-colors">Fitur</a>
              </li>
              <li>
                <a href="#cara-kerja" className="hover:text-foreground transition-colors">Cara Kerja</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
              </li>
              <li>
                <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Buka Bot
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak & Channel</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <SiTelegram className="w-4 h-4 text-[#0088cc]" />
                <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  @kriptoecerbot
                </a>
              </li>
              <li className="flex items-center gap-2">
                <SiTelegram className="w-4 h-4 text-[#0088cc]" />
                <a href="https://t.me/kriptoecerofficial" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Channel Resmi
                </a>
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <a href="https://t.me/kriptoecerchannel" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Log Transaksi
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>24/7 Online</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            &copy; {new Date().getFullYear()} KriptoEcer. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Aman & Terpercaya
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Proses Instan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LiveTransactionsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

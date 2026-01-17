import { motion } from "framer-motion";
import { Bot, Send, CheckCircle2, Coins, ArrowRight } from "lucide-react";
import { SiTelegram } from "react-icons/si";

const messages = [
  { type: "bot", text: "Selamat datang di KriptoEcer!" },
  { type: "user", text: "Beli BTC Rp100.000" },
  { type: "bot", text: "Pesanan diterima..." },
  { type: "success", text: "Transaksi berhasil!" },
];

export function BotAnimation() {
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
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm">KriptoEcer Bot</p>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
          <SiTelegram className="w-5 h-5 text-[#0088cc] ml-auto" />
        </div>

        <div className="p-4 space-y-3 min-h-[200px]">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 1.5, duration: 0.4 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.type === "success" ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 bg-green-500/20 text-green-500 px-4 py-2 rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{msg.text}</span>
                </motion.div>
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6, duration: 0.5 }}
            className="flex items-center gap-2 pt-2"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
            >
              <Coins className="w-5 h-5 text-primary" />
            </motion.div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>0.0015 BTC</span>
              <ArrowRight className="w-3 h-3" />
              <span>Wallet Anda</span>
            </div>
          </motion.div>
        </div>

        <a
          href="https://t.me/kriptoecerbot"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 border-t border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
          data-testid="link-bot-chat"
        >
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background border border-border hover:border-primary/50 transition-colors">
            <span className="text-sm text-muted-foreground flex-1">Ketik pesan...</span>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-primary rounded-full p-1.5"
            >
              <Send className="w-3 h-3 text-primary-foreground" />
            </motion.div>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-2">
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

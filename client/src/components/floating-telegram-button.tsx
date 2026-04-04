import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiTelegram } from "react-icons/si";
import { X } from "lucide-react";

export function FloatingTelegramButton() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setExpanded(true), 600);
      return () => clearTimeout(timer);
    } else {
      setExpanded(false);
    }
  }, [visible]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="fixed bottom-6 right-5 z-50 flex items-center gap-2"
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative flex items-center"
              >
                <div className="bg-card border border-border rounded-xl shadow-xl shadow-black/10 px-4 py-3 pr-10 max-w-[200px]">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-xs font-semibold text-green-500">Bot Online</span>
                  </div>
                  <p className="text-sm font-bold leading-tight">Beli crypto mulai Rp10.000!</p>
                </div>

                <button
                  onClick={() => setDismissed(true)}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                  data-testid="button-floating-dismiss"
                  aria-label="Tutup"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            href="https://t.me/kriptoecerbot"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            className="relative w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/40 flex items-center justify-center"
            data-testid="button-floating-telegram"
            aria-label="Buka KriptoEcer Bot"
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-primary"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <SiTelegram className="w-7 h-7 text-primary-foreground relative z-10" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

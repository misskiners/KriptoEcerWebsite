import { Link } from "wouter";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";

interface LegalLayoutProps {
  title: string;
  description: string;
  lastUpdated?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function LegalLayout({ title, description, lastUpdated = "Maret 2026", icon, children }: LegalLayoutProps) {
  useEffect(() => {
    const pageTitle = `${title} | KriptoEcer`;
    document.title = pageTitle;
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", pageTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", pageTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    return () => {
      document.title = "KriptoEcer - Beli & Jual Crypto Eceran Mulai Rp10.000 via Telegram";
    };
  }, [title, description]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader />

      <main className="container mx-auto px-4 pt-28 pb-16 max-w-3xl flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-home">
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          <div className="mb-10">
            {icon && (
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-5">
                {icon}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-sm text-muted-foreground">Terakhir diperbarui: {lastUpdated}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-neutral dark:prose-invert max-w-none space-y-8"
        >
          {children}
        </motion.div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Halaman Legal KriptoEcer:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/terms" className="text-sm text-primary hover:underline">Syarat &amp; Ketentuan</Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/privacy" className="text-sm text-primary hover:underline">Kebijakan Privasi</Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/risk" className="text-sm text-primary hover:underline">Pengungkapan Risiko</Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/refund" className="text-sm text-primary hover:underline">Kebijakan Refund</Link>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-foreground">{title}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

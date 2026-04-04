import { Link } from "wouter";
import { useEffect } from "react";
const logoImage = "/favicon.png";

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
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src={logoImage} alt="KriptoEcer" className="w-8 h-8 rounded-md" />
            <span className="text-base font-bold tracking-tight">KriptoEcer</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <div className="mb-10">
          {icon && (
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-5">
              {icon}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h1>
          <p className="text-sm text-muted-foreground">Terakhir diperbarui: {lastUpdated}</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          {children}
        </div>

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

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KriptoEcer. Semua hak dilindungi.</p>
        </div>
      </footer>
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

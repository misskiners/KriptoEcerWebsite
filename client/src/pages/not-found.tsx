import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Search } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import { SEO } from "@/components/seo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Halaman Tidak Ditemukan"
        description="Halaman yang kamu cari tidak tersedia atau sudah dipindahkan."
        noindex
      />
      <PageHeader />

      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
              <Search className="w-9 h-9 text-primary" />
            </div>

            <h1 className="text-6xl font-bold text-primary mb-3" data-testid="text-404-title">404</h1>
            <h2 className="text-2xl font-bold mb-3">Halaman Tidak Ditemukan</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan. Coba kembali ke beranda atau jelajahi halaman lainnya.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild data-testid="button-404-home">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </Link>
              </Button>
              <Button variant="outline" asChild data-testid="button-404-blog">
                <Link href="/blog">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Baca Blog
                </Link>
              </Button>
              <Button variant="outline" asChild data-testid="button-404-bot">
                <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
                  <SiTelegram className="w-4 h-4 mr-2" />
                  Buka Bot
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

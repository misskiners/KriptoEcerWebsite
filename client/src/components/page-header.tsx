import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bot } from "lucide-react";

const logoImage = "/favicon.png";

interface PageHeaderProps {
  breadcrumb?: string;
}

export function PageHeader({ breadcrumb }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" data-testid="link-header-logo">
          <img src={logoImage} alt="KriptoEcer" className="w-8 h-8 rounded-md" />
          <span className="text-base font-bold tracking-tight">KriptoEcer</span>
          {breadcrumb && (
            <span className="hidden sm:inline text-muted-foreground text-sm font-normal ml-1">/ {breadcrumb}</span>
          )}
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted"
            data-testid="link-header-blog"
          >
            Blog
          </Link>
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

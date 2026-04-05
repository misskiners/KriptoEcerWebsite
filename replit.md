# KriptoEcer - Telegram Crypto Bot Landing Page

## Overview

KriptoEcer is a web application that serves as a landing page for a Telegram bot (@kriptoecerbot) enabling users to buy cryptocurrency in small amounts (eceran). The project consists of a React frontend with a Node.js/Express backend. The application is primarily in Indonesian language and targets Indonesian crypto enthusiasts looking for low-minimum crypto purchases.

## Recent Changes

- **April 2026 (Root Codebase Cleanup)**: Extracted shared modules `shared/prices.ts` (CoinGecko proxy + cache + retry) and `shared/sitemap.ts` (sitemap XML generation) — eliminating code duplication between `server/routes.ts` and `api/` (Vercel serverless). Fixed `api/sitemap.ts` that was missing 4 legal pages (terms, privacy, risk, refund) and XML escaping. Replaced `nanoid` import (not an explicit dependency) with `crypto.randomUUID()` in `server/vite.ts`. Removed dead code: `server/storage.ts` (unused MemStorage), unused Drizzle/user-auth definitions from `shared/schema.ts`. Removed 6 unused shadcn component files (command, chart, resizable, drawer, calendar, input-otp).
- **April 2026 (Animation Fixes)**: Fixed hero section `fadeInUp` transition placement (moved inside `animate` key), removed redundant double entry animation on BotAnimation phone mockup, capped FloatingCoins delays from 13s to 6.5s max with `prefers-reduced-motion` support. Fixed TransactionFeed: replaced React state cursor blink (530ms re-renders) with CSS animation, added unique IDs for regenerated transactions, added explicit `transition` to `whileInView` wrappers.
- **April 2026 (Bug Audit & Fixes)**: Comprehensive codebase audit. Fixed: AnimatedCounter memory leak (RAF not cancelled on unmount), article 4 slug inconsistency ("5-istilah" → "10-istilah"), added React Error Boundary in App.tsx, added try-catch to sitemap route, removed unused `createServer` import, fixed "Lihat Semua Artikel" link to use wouter Link, masked error messages in production.
- **April 2026 (Blog Expansion)**: Added 5 new SEO-optimized articles (1000+ words each) with AI-generated cover images: Cara Beli Solana, Apa Itu Blockchain, Deposit via Virtual Account, Crypto Halal/Haram, 5 Kesalahan Pemula. Total articles now 15. Internal links between articles. Sitemap auto-updated.
- **April 2026 (Particle Network Upgrade)**: Upgraded blockchain network animation with hub nodes (6 large glowing validators), data packets traveling along connections (3 colors), radial glow effects, and increased visibility.
- **April 2026 (UI Consistency)**: Extracted shared `PageHeader` (`client/src/components/page-header.tsx`) and `PageFooter` (`client/src/components/page-footer.tsx`) components used across all non-landing pages (legal, blog, article, 404). All pages now share consistent header (logo, Blog link, ThemeToggle, "Start Bot" CTA), dark-theme footer (4-column: brand/nav/legal/kontak, social links, disclaimer, copyright), and motion entrance animations. LegalLayout upgraded with breadcrumb navigation. 404 page fully redesigned in Indonesian with branded styling and helpful navigation links.
- **April 2026 (SEO Audit & Fixes)**: Removed duplicate JSON-LD Organization from `index.html` (Helmet in landing.tsx is authoritative); removed fake SearchAction from WebSite schema; added `<SEO noindex>` to 404 page; migrated legal pages from DOM manipulation to `<SEO>` component with canonical URLs and BreadcrumbList structured data; added server-side OG meta tag injection via `server/og.ts` (Express) and `api/render.ts` (Vercel serverless) for social sharing previews; centralized page metadata in `shared/seo-meta.ts`; Vercel conditional rewrites route bot user agents through `/api/render` for correct OG previews; trimmed font weights (10→5 files); added width/height to blog images to prevent CLS; added hreflang tags.
- **April 2026 (SEO)**: Full SEO implementation — `react-helmet-async` installed, `SEO` component (`client/src/components/seo.tsx`) with dynamic title/description/OG/Twitter Card per page; landing adds Organization + WebSite + FAQPage JSON-LD; blog adds CollectionPage + BreadcrumbList; articles add BlogPosting + BreadcrumbList + per-article OG image; `robots.txt` at `client/public/robots.txt`; `sitemap.xml` endpoint in `server/routes.ts` covering all URLs; OG image at `client/public/og-image.png` (1200×630px branded image)
- **April 2026 (Blog)**: Full blog system added — articles stored as static TypeScript data in `shared/articles.ts`, REST API (`GET /api/articles`, `GET /api/articles/:slug`), `/blog` listing page, `/blog/:slug` article detail page, Blog nav link in Header and Footer
- **April 2026**: Major UI upgrade — mouse parallax hero orbs, glassmorphism feature cards, canvas-confetti CTA button, ParticleNetwork replacing BlockchainGrid everywhere, interactive 4-tab DepositSection (QRIS/VA/PayPal/CryptoBot), upgraded BotAnimation with typing indicator (bouncing dots), timestamps, read receipts, coin+amount selectors, and Reset Demo
- **March 2026**: Legal pages audit — removed Instagram from all contact sections, added Lucide icons per legal page, per-page OG meta tags via LegalLayout, corrected "tanpa daftar" → "daftar cepat via Telegram" messaging
- **February 2026**: Added legal pages (Terms of Service, Privacy Policy, Risk Disclosure, Refund Policy) with footer links
- **January 2026**: Created landing page with Hero, Features, How It Works, FAQ, and CTA sections
- Added dark/light theme toggle with gold/amber color scheme
- Integrated custom KriptoEcer logo and favicon
- Responsive design with Framer Motion animations

## User Preferences

Preferred communication style: Simple, everyday language (Indonesian).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Animations**: Framer Motion for page transitions and effects

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful API endpoints prefixed with `/api`
- **Build**: Custom esbuild configuration for production bundling

### Data Layer
- **Articles**: Static TypeScript data in `shared/articles.ts` (not database-driven)
- **Prices**: CoinGecko API proxy with 60s cache in `shared/prices.ts`
- **Schema**: `shared/schema.ts` contains `Article` interface (shared between frontend and backend)

### Shared Modules
- `shared/prices.ts` — CoinGecko price proxy with cache, retry, and in-flight dedup
- `shared/sitemap.ts` — XML sitemap generation with all static + article URLs
- `shared/articles.ts` — Static article data (15 articles)
- `shared/schema.ts` — TypeScript interfaces (Article)

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── components/animations/  # Framer Motion animations
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions (uses shared modules)
│   ├── static.ts     # Production static file serving
│   └── vite.ts       # Vite dev server integration
├── api/              # Vercel serverless functions (uses shared modules)
│   ├── prices.ts     # CoinGecko proxy
│   ├── sitemap.ts    # Sitemap XML
│   ├── render.ts     # OG meta tag renderer for social bots
│   └── articles/     # Article endpoints
├── shared/           # Shared code between frontend/backend/api
│   ├── schema.ts     # TypeScript interfaces
│   ├── articles.ts   # Static article data
│   ├── prices.ts     # Price fetching logic
│   ├── sitemap.ts    # Sitemap generation
│   └── seo-meta.ts   # Centralized page metadata for OG tags
└── script/           # Build scripts
```

### Dual Deployment
- **Replit**: Express server (`server/`) serves both API and static frontend
- **Vercel**: Serverless functions (`api/`) + static frontend (`vercel.json`)
- Both paths share business logic via `shared/` modules

### Development vs Production
- **Development**: Vite dev server with HMR, served through Express middleware
- **Production**: Static files served from `dist/public`, server bundled to `dist/index.cjs`

## External Dependencies

### UI/Frontend Libraries
- **Radix UI**: Accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **react-icons**: Additional icons (Telegram, crypto logos)

### Backend Libraries
- **Express 5**: Web framework

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator

# KriptoEcer - Telegram Crypto Bot Landing Page

## Overview

KriptoEcer is a web application that serves as a landing page for a Telegram bot (@kriptoecerbot) enabling users to buy cryptocurrency in small amounts (eceran). The project consists of a React frontend with a Node.js/Express backend. The application is primarily in Indonesian language and targets Indonesian crypto enthusiasts looking for low-minimum crypto purchases.

## Recent Changes

- **April 2026 (Blog Expansion)**: Added 5 new SEO-optimized articles (1000+ words each) with AI-generated cover images: Cara Beli Solana, Apa Itu Blockchain, Deposit via Virtual Account, Crypto Halal/Haram, 5 Kesalahan Pemula. Total articles now 15. Internal links between articles. Sitemap auto-updated.
- **April 2026 (Particle Network Upgrade)**: Upgraded blockchain network animation with hub nodes (6 large glowing validators), data packets traveling along connections (3 colors), radial glow effects, and increased visibility.
- **April 2026 (UI Consistency)**: Extracted shared `PageHeader` (`client/src/components/page-header.tsx`) and `PageFooter` (`client/src/components/page-footer.tsx`) components used across all non-landing pages (legal, blog, article, 404). All pages now share consistent header (logo, Blog link, ThemeToggle, "Start Bot" CTA), dark-theme footer (4-column: brand/nav/legal/kontak, social links, disclaimer, copyright), and motion entrance animations. LegalLayout upgraded with breadcrumb navigation. 404 page fully redesigned in Indonesian with branded styling and helpful navigation links.
- **April 2026 (SEO)**: Full SEO implementation — `react-helmet-async` installed, `SEO` component (`client/src/components/seo.tsx`) with dynamic title/description/OG/Twitter Card per page; landing adds Organization + WebSite + FAQPage JSON-LD; blog adds CollectionPage + BreadcrumbList; articles add BlogPosting + BreadcrumbList + per-article OG image; `robots.txt` at `client/public/robots.txt`; `sitemap.xml` endpoint in `server/routes.ts` covering all URLs; OG image at `client/public/og-image.png` (1200×630px branded image)
- **April 2026 (Blog)**: Full blog system added — `articles` PostgreSQL table (Drizzle schema), `server/db.ts` drizzle connection, REST API (`GET /api/articles`, `GET /api/articles/:slug`, `POST /api/articles`), auto-seed with 5 Indonesian crypto articles on startup, `/blog` listing page, `/blog/:slug` article detail page, Blog nav link in Header and Footer
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
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Migrations**: Drizzle Kit for database migrations (`migrations/` directory)

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data access layer
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between frontend/backend
│   └── schema.ts     # Drizzle database schemas
└── script/           # Build scripts
```

### Development vs Production
- **Development**: Vite dev server with HMR, served through Express middleware
- **Production**: Static files served from `dist/public`, server bundled to `dist/index.cjs`

### Storage Pattern
The application uses a storage interface pattern (`IStorage`) allowing for different implementations:
- Currently uses `MemStorage` (in-memory) for development
- Database schema ready for PostgreSQL persistence

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **connect-pg-simple**: Session storage for PostgreSQL

### UI/Frontend Libraries
- **Radix UI**: Extensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **react-icons**: Additional icons (Telegram, Bitcoin, Ethereum)

### Backend Libraries
- **Express 5**: Web framework
- **Drizzle ORM**: Type-safe database toolkit
- **Zod**: Schema validation

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator
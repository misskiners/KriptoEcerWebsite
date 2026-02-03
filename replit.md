# KriptoEcer - Telegram Crypto Bot Landing Page

## Overview

KriptoEcer is a web application that serves as a landing page for a Telegram bot (@kriptoecerbot) enabling users to buy cryptocurrency in small amounts (eceran). The project consists of a React frontend with a Node.js/Express backend. The application is primarily in Indonesian language and targets Indonesian crypto enthusiasts looking for low-minimum crypto purchases.

## Recent Changes

- **February 2026**: Added legal pages (Terms of Service, Privacy Policy) with footer links
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
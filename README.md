# SignalSmith Website

The production website foundation for SignalSmith — a technical knowledge platform focused on solving real-world business problems through data, analysis, engineering, and systems thinking.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Manrope and Geist Mono

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Create `.env.local` when enabling analytics:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Google Analytics loads only after visitor consent. The implementation does not use browser fingerprinting or anonymous GA4 User-ID.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run start     # Serve production build
npx tsc --noEmit  # Type-check
```

## Routes

- `/` — Landing page
- `/casebook` — Casebook content destination
- `/privacy` — Analytics and privacy information
- `/gems`, `/blueprints`, `/craft`, `/foundry`, `/workshop`, `/advisory` — Branded future destinations

## Project structure

```text
app/         Routes, metadata, sitemap, and robots
components/  Reusable interface components
content/     Brand and website content
public/      Static assets and machine-readable resources
```

Core philosophy: **Start with the business problem, not the tool.**

Conceptual model: **RAW MATERIAL → CRAFT → SIGNAL → DECISION**

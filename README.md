# Cloud City Sluggers — Cloudflare Workers + Hono + Drizzle-ready (Phase 1)

This is a **barebone, deployable scaffold** for a customizable baseball team site on **Cloudflare Workers**.  
JS framework: **Hono** (edge-first, tiny) with **JSX server rendering**.  
ORM: **Drizzle ORM** (D1-ready) — schema/config included for Phase 2.

## Phase 1 Deliverables
- Minimal routes + HTML for all requested pages (placeholders).
- Static assets via `ASSETS` binding.
- Unopinionated CSS (black/white, no radii). Fluid container, responsive.
- Design tokens hook point (CSS variables injected at runtime; read from D1 in Phase 2).
- Drizzle schema & config scaffold (not used yet).
- Clean deploy with **no required external services**.

## Phase 2 (next)
- Tailwind or Bootstrap base stylesheet (local, no CDN) + keep `public/css/base.css` for overrides.
- D1 + Drizzle integration: pages (news, products, games, venue seats/pricing), Admin panel (auth, CRM, analytics), tokens manager.
- Queues for newsletters, Analytics Engine for events, Vectorize/AI optional helpers.

## Repo Structure
```
src/index.ts            # Single-file Worker (Hono + JSX views + routes)
public/css/base.css     # Minimal base CSS (overrides/tokens-friendly)
drizzle/config.ts       # Drizzle Kit config (Phase 2)
drizzle/schema.ts       # D1 schema (Phase 2)
wrangler.jsonc          # Worker config & bindings
package.json            # Scripts & deps
tsconfig.json           # TypeScript config
```

## Quickstart
```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev
# then open http://localhost:8787
```

## Deploy
```bash
pnpm deploy
```

> First deploy requires no D1/queues/etc. Those will be added in Phase 2.

## Test routes
```bash
curl -i http://localhost:8787/
curl -i http://localhost:8787/team
curl -i http://localhost:8787/news
curl -i http://localhost:8787/news/sample-post
curl -i http://localhost:8787/games
curl -i http://localhost:8787/games/1
curl -i http://localhost:8787/shop
curl -i http://localhost:8787/shop/1
```

## Notes
- **Security headers/CORS/rate limiting** intentionally omitted for Phase 1 minimalism; will be added in Phase 2.
- Base CSS is intentionally spartan. Tailwind/Bootstrap (local) will be wired up next, with tokens in D1 to theme from admin.

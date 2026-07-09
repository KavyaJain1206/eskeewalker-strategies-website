# Architecture

## Stack

- **Frontend**: React 18 + Vite, client-side routed with `react-router-dom`. No global state library — page-local `useState`/`useEffect`.
- **Backend**: FastAPI (Python), SQLite via SQLAlchemy, JWT auth for the admin CMS.
- **Dev proxy**: Vite dev server proxies `/api/*` → `http://localhost:8000` (see `frontend/vite.config.js`).

## Folder structure

```
frontend/src/
  App.jsx              route table
  main.jsx             React root mount
  components/          shared, cross-page components
  pages/                one file per route
  hooks/                shared hooks
  styles/globals.css    single global stylesheet (CSS variables + per-section rules)
backend/
  main.py               FastAPI app entry
  routes/                one router module per resource (admin, cms, contact, courses, work)
  models.py, schemas/    SQLAlchemy models / Pydantic schemas
  auth.py, config.py     JWT auth, settings (env-driven via pydantic-settings)
```

## Routing

Defined in `frontend/src/App.jsx`. `Home` is imported eagerly (it's the most likely landing route); every other route (`Work`, `AICreativeStudio`, `SustainabilityComm`, `AICourses`, `About`, `Contact`, `Admin`) is `React.lazy`-loaded and code-split into its own chunk, wrapped in a single `<Suspense fallback={null}>`. This keeps the `Admin` CMS dashboard (the largest page) out of the bundle every visitor downloads.

## Shared components

- `Navbar`, `Footer` / `FooterMinimal` — persistent chrome.
- `FadeUp` — scroll-triggered fade/slide wrapper (`useFadeUp` hook, IntersectionObserver-based).
- `CTASection` — reusable bottom-of-page call-to-action block.
- `DynamicSections` — renders CMS-authored page sections (text/image/video/grid) fetched from `/api/pages/:page`, used by the admin-editable pages.

## Styling

Single `frontend/src/styles/globals.css`, organized as one section per page/feature (marked with `── SECTION ──` comments). CSS custom properties in `:root` hold the color/spacing tokens (`--bg`, `--accent`, `--radius`, etc.). No CSS modules or CSS-in-JS — plain class selectors, low specificity, no `!important`. `Admin.jsx` uses inline `style={{}}` for its CMS-only dashboard UI rather than global classes, since that markup isn't part of the public site's visual language.

## Assets

Fonts are self-hosted `.ttf` files under `styles/fonts/`, loaded via `@font-face` with `font-display: swap`. Content images (portfolio, hero, avatars) are served from Unsplash URLs or the backend's `/api/admin/upload` endpoint — not committed to the repo.

## Conventions

- Function components only, no class components.
- Page components own their data fetching (`fetch('/api/...')` in `useEffect`); no shared data layer yet.
- Route-level code splitting via `React.lazy`; keep new top-level pages lazy unless there's a specific reason to bundle them eagerly.
- Below-the-fold `<img>` tags use `loading="lazy" decoding="async"`.

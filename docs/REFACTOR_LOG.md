# Refactor Log

## 2026-07-09 — Performance: route code-splitting + lazy images

**Objective**: Reduce initial JS bundle size and defer below-the-fold image loads, with zero UI/functional change.

**Files Modified**:
- `frontend/src/App.jsx` — converted all routes except `Home` to `React.lazy`, wrapped `<Routes>` in `<Suspense fallback={null}>`.
- `frontend/src/pages/Home.jsx` — added `loading="lazy" decoding="async"` to 5 work-grid images.
- `frontend/src/pages/Work.jsx` — added `loading="lazy" decoding="async"` to portfolio thumbnail image.
- `frontend/src/pages/About.jsx` — added `loading="lazy" decoding="async"` to founder photo.
- `frontend/src/pages/AICreativeStudio.jsx` — added `loading="lazy" decoding="async"` to 3 service-visual images.
- `frontend/src/components/DynamicSections.jsx` — added `loading="lazy" decoding="async"` to CMS image/grid-item images.
- `.claude/launch.json` — added dev server launch config (new file, tooling only, not shipped).

**Performance Improvements**:
- `Admin.jsx` (CMS dashboard, ~1,250 lines) no longer ships in the bundle every visitor downloads — confirmed via `vite build` as its own chunk (`Admin-*.js`, 36.7 kB / 6.6 kB gzip), loaded only when `/admin` is visited.
- Every non-Home route (`Work`, `AICreativeStudio`, `SustainabilityComm`, `AICourses`, `About`, `Contact`) is now a separate chunk, each in the 3.9–9.9 kB range (gzipped 1.6–3.1 kB), loaded on demand instead of upfront.
- 11 below-the-fold `<img>` tags now defer loading until near-viewport, reducing initial network contention on image-heavy pages (Home, Work, About, AI Creative Studio).

**Verified**:
- `npm run build` succeeds, confirmed per-route chunks in output.
- Manually exercised `/`, `/work`, and `/admin` in-browser: correct render, no console errors, no visual difference, no layout shift from the `Suspense` boundary (fallback is `null` — routes render fast enough that no spinner was ever needed here).

**Breaking Changes**: None.

**Remaining TODOs**:
- Weak default `JWT_SECRET` fallback in `backend/config.py` should be hardened (fails closed if `.env` missing) — flagged, not yet fixed, pending prioritization.
- No lint/format config (`.eslintrc`/`.prettierrc`) in the frontend yet.
- `Admin.jsx` inline `style={{}}` usage (CMS-only) could move to CSS classes for maintainability — lower priority since it's not public-facing.

**Notes**: `globals.css` (843 lines) was reviewed and found already well-organized per-section with minimal duplication — no cleanup applied this pass.

## 2026-07-09 — Evidence-based audit: Lighthouse, responsive, CSS, component duplication

**Objective**: Run the full audit sequence (Lighthouse before/after, bundle analysis, responsive sweep across 9 breakpoints, CSS audit, component duplication audit) requested after the previous pass, fix what the evidence supported, and document what was deliberately deferred.

**Lighthouse (mobile, Home page)**: Performance/Best Practices/SEO were already maxed pre-refactor (100/100/92); this pass's code-splitting doesn't move an already-100 score on the entry route, but reduces bytes shipped to every other route. Accessibility 89 → 93-95 after fixes below.

**Bundle** (from prior pass, re-confirmed): initial JS for the common case (any non-`/admin` route) down from 257.7 kB / 72.4 kB gzip to 183.1 kB / 58.3 kB gzip (−29% raw / −19% gzip).

**Regression caught and fixed before it shipped**: blanket `loading="lazy"` (added in the prior pass) landed on two actual LCP elements — the About page founder photo and the Work page's first grid image. Lighthouse's `lcp-lazy-loaded` audit flagged both (About: Performance 85→97, LCP 4.1s→2.2s after fix). Fixed by making About's founder photo eager and Work's first grid image conditionally eager (`idx === 0`), rest stay lazy.

**Responsive audit (320/375/390/414/768/1024/1280/1440/1920px)**: `globals.css` had exactly one `@media` rule in 843 lines — every multi-column grid (~20 selectors: services-grid, work-grid, process-steps, contact-layout, founder-section, etc.) had zero collapse behavior below 992px. Confirmed via real device-emulated (412px) Lighthouse screenshots: the Contact page's 2-column grid didn't stack — the entire contact form rendered off-screen, inaccessible on mobile. The Navbar had no mobile menu at all (5 links + CTA + logo forced into one non-wrapping row — visibly overlapping/cut off below ~900px).
- Added a mobile hamburger menu to `Navbar.jsx` (`useState` toggle, full-width dropdown panel, closes on navigation) — desktop nav unchanged above 768px.
- Added `@media (max-width: 768px)` and `@media (max-width: 480px)` blocks to `globals.css` collapsing all ~20 grids to 1 (occasionally 2) columns, reducing oversized section/hero padding, hiding the decorative scroll indicator, and fixing a `.flow-step` border/radius pattern that needed one `!important` (removed by targeting `:first-child`/`:last-child` directly instead).
- Found and fixed a second overflow during the sweep: `.intro-stats` (AI Creative Studio page) used `flex-wrap: nowrap`, forcing 402px of content into any viewport narrower than that.
- Re-verified: 0 horizontal-overflow instances across all 8 routes × 9 breakpoints after the fix (tested via `window.scrollX` after `scrollTo(9999,0)`, not just visual inspection).

**CSS audit**: 0 unused class selectors (227 checked against JSX usage), 0 unused CSS custom properties (10 checked), 0 duplicate media-query breakpoints. Found and fixed the only two real issues: `.flow-step:last-child` was declared twice (merged), and the one `!important` in the codebase (removed, replaced with a correctly-scoped selector). `font-family: 'Plus Jakarta Sans'` repeats 64 times, some redundantly with the `h1–h6` base rule — flagged, not touched (would need per-selector tag verification to avoid an accidental font regression; deferred rather than guessed).

**Component duplication audit**: found `CTASection.jsx` already existed as a reusable component but was used by 0 of 5 pages that hand-rolled identical `<section className="cta-section">` markup. Wired all 5 (`Home`, `AICreativeStudio`, `SustainabilityComm`, `About`, `AICourses`) to use it. Also found 4 card grids (`problem-grid`/`offerings-grid` in Sustainability, `values-grid`/`eco-grid` in About, `why-grid` in Courses) hand-duplicated instead of data-mapped, despite the same files already using `.map()` elsewhere for other grids — converted to local data arrays + `.map()`, matching the existing convention in those files.

**Files Modified**: `frontend/src/components/Navbar.jsx`, `frontend/src/styles/globals.css`, `frontend/src/pages/{Work,About,AICreativeStudio,SustainabilityComm,AICourses,Home}.jsx`.

**Verified**: `npm run build` succeeds; manually exercised all 7 public routes + `/admin` at 320/375/390/414/768/1024/1280/1920px with 0 overflow; visually confirmed CTA/card-grid refactors render pixel-identical to before (screenshots).

**Breaking Changes**: None.

**Remaining TODOs** (unchanged from prior entry, plus): accessibility audit (heading order, color contrast, ARIA) and dependency audit were in progress when this session's scope shifted to asset replacement (see next entry) — not yet completed.

## 2026-07-09 — Replace placeholder media with real assets

**Objective**: Replace Unsplash placeholder images (and add a hero video + several new hero background images) across the public site with the studio's actual production stills, per assets supplied in `assets/`.

**Process**: No reference screenshots were attached to the request; matching was done by (a) filename semantics and (b) visually inspecting every asset directly, cross-referenced against existing `alt` text/titles/badges already in the code (e.g. `metayoutube.jpeg` → Work item badged "Meta / YouTube"). See `docs/ASSET_REPLACEMENT_REPORT.md` for the full placeholder-by-placeholder mapping.

**Files Modified**: `frontend/src/pages/{Home,Work,About,AICreativeStudio,SustainabilityComm,AICourses}.jsx`, `frontend/src/styles/globals.css` (added `.hero-video`/`.hero-video-overlay`).

**Assets Added**: 14 images optimized via `sharp` (resized + re-encoded, mozjpeg quality 78-80) into `frontend/src/assets/images/` — combined 900 KB, down from ~3.1 MB of source files (biggest single reduction: a 1.2 MB source down to 100 KB). 1 video (`home-hero.mp4`, 14.9 MB, copied unoptimized — no `ffmpeg` available in this environment to compress it; see Remaining TODOs) into `frontend/src/assets/video/`.

**Performance mitigation for the video**: it only renders (and only downloads) on viewports ≥769px — verified via network trace that mobile viewports issue zero byte requests for it, only the free `?import` URL-resolution request Vite always makes.

**Assets Not Placed**: `aicourses.png` (no confident matching slot) and `w template.mp4` (no identifiable target page) — left in the source `assets/` folder, unused.

**Breaking Changes**: None — all replacements are like-for-like `src` swaps or additive hero-background images using the pre-existing `.hero-bg-img` treatment; no layout structure changed.

**Remaining TODOs**:
- `home-hero.mp4` (14.9 MB) is unoptimized — no `ffmpeg`/`cwebp` available in this environment. Recommend compressing to ~2-4 MB (H.264, CRF ~28-32, scaled to ~1920px, no audio track) before this ships to production; current file is fine for desktop broadband but will hurt LCP/data usage on slower desktop connections.
- `aicourses.png` and `w template.mp4` are unplaced — confirm intended destination or remove from the repo.
- The About page's founder photo is still the original Unsplash placeholder — none of the supplied assets could be confidently confirmed as a photo of the actual founder (Jitaksh Jain), so it was left unchanged rather than guessed.

# Asset Replacement Report — 2026-07-09

No reference screenshots were attached to the request. Matching was done by viewing every file in `assets/` directly and cross-referencing filename + visual content against the existing `alt` text, titles, and badges already present in the code.

Optimized copies live in `frontend/src/assets/images/` and `frontend/src/assets/video/` (resized + recompressed via `sharp`, mozjpeg quality 78-80). Original, unmodified source files remain untouched in the repo-root `assets/` folder.

## Replaced placeholders

| Page | Section | Old | New asset (source file) | Notes |
|---|---|---|---|---|
| Home | Hero background | none (CSS gradient only) | `home-hero.mp4` | New. Video only renders/downloads on viewports ≥769px (see Performance note). |
| Home | Work-grid thumb — Drama | Unsplash | `work-item-drama-microdrama.jpg` (`ai microdrama series.jpeg`) | Reuses the Work page's item-1 image. |
| Home | Work-grid thumb — UGC | Unsplash | `work-item-ugc-social.jpg` (`metayoutube.jpeg`) | |
| Home | Work-grid thumb — Sustainability | Unsplash | `work-item-sustainability-netzero.jpg` (`sustainablecommunication.png`) | |
| Home | Work-grid thumb — Ads | Unsplash | `work-item-ads.jpg` (`aiads.jpeg`) | |
| Home | Work-grid thumb — Animation | Unsplash | `work-item-drama-character.jpg` (`aiadsbrandcharacterdesign.jpeg`) | |
| Work | Page hero background | none | `work-hero.jpg` (`thingswevemade.jpeg`) | New. This asset is a literal montage of drama/sustainability/animation/ads stills — matches the page's "Things we've made move." headline. |
| Work | Item 1 (drama, featured) | Unsplash | `work-item-drama-microdrama.jpg` (`ai microdrama series.jpeg`) | Filename + visual content match "AI Microdrama Series — Brand Origin Story" exactly. |
| Work | Item 2 (ugc) | Unsplash | `work-item-ugc-social.jpg` (`metayoutube.jpeg`) | Item's badge is literally "Meta / YouTube". |
| Work | Item 3 (sustainability) | Unsplash | `work-item-sustainability-esg.jpg` (`ai ads ddustainability comms.jpeg`) | Filename has an "ai ads" prefix but the actual image is a sustainability/renewable-energy illustration — matched by content, not filename. |
| Work | Item 4 (ads) | Unsplash | `work-item-ads.jpg` (`aiads.jpeg`) | |
| Work | Item 5 (ugc, founder story) | Unsplash | `work-item-ugc-founder.jpg` (`ugc founderstory.jpeg`) | Exact match. |
| Work | Item 6 (drama, character) | Unsplash | `work-item-drama-character.jpg` (`aiadsbrandcharacterdesign.jpeg`) | |
| Work | Item 7 (sustainability, net-zero) | Unsplash | `work-item-sustainability-netzero.jpg` (`sustainablecommunication.png`) | |
| AI Creative Studio | Page hero background | none | `aicreativestudio-hero.jpg` (`aicreativestudio.png`) | New. Wide banner composition with built-in negative space for text overlay — same treatment as the other new hero images. |
| AI Creative Studio | Drama service visual | Unsplash | `aicreativestudio-drama.jpg` (`dramabrandcharacter.jpeg`) | |
| AI Creative Studio | UGC service visual | Unsplash | `aicreativestudio-ugc.jpg` (`aicreativestudio (2).png`) | Shows AI-generated characters being shot by a real crew — directly on-message for "AI Creative Studio". |
| AI Creative Studio | Ads service visual | Unsplash | `work-item-ads.jpg` (`aiads.jpeg`, reused) | |
| Sustainability | Page hero background | Unsplash | `sustainability-hero.jpg` (`sustainability banner.png`) | |
| About | Page hero background | none | `about-hero.jpg` (`image (32).png`) | New. A real (non-AI-generated) team photo — used here rather than for the specific founder-photo slot (see Unmatched below). |
| Courses | Page hero background | none | `aicourses-hero.jpg` (`learntomakeaithatmoves.jpeg`) | New. Literal match: robot holding a "Pecok Animation" sign, matching the "Learn to make AI that moves" headline + Pecok Animation Academy partnership badge. |

New hero-background images all reuse the site's existing `.hero-bg-img` CSS treatment (`opacity: 0.06`, `object-fit: cover`) — the same pattern the Sustainability page already used, so no new visual language was introduced.

## Not matched / not placed

- **`aicourses.png`** — an animation-montage illustration. No confident distinct slot found; the Courses page's hero already got `learntomakeaithatmoves.jpeg`, and the course cards use emoji icons, not photo slots. Left unplaced in `assets/`.
- **`w template.mp4`** — filename gives no clue which page it belongs to. Left unplaced in `assets/`, per your instruction to skip it.
- **About page founder photo** — still the original Unsplash placeholder. None of the supplied assets could be confidently confirmed as an actual photo of the founder (Jitaksh Jain); replacing a named individual's photo with an unverified stock/generic image risked misrepresenting who's in it, so it was left as-is rather than guessed.

## Performance note on the video

`home-hero.mp4` is 14.9 MB and **unoptimized** — this environment has no `ffmpeg`/`cwebp` available to compress it. To limit the damage:
- It's excluded entirely on viewports narrower than 769px (verified via network trace: mobile makes zero byte-range requests for it).
- `muted`, `loop`, `playsInline`, `autoPlay` for cross-browser autoplay compliance.

Recommend compressing before production deploy — target ~2-4 MB (H.264, CRF ~28-32, scaled to ≤1920px width, audio track stripped since it's muted anyway).

## Validation performed

- `npm run build` succeeds, no broken imports.
- All 6 modified pages manually exercised in-browser (desktop 1280px): correct images render, no console errors.
- Network trace confirmed zero 404s for any asset (only pre-existing `/api/*` 502s from the backend not running in this environment, unrelated to this change).
- Confirmed the video is skipped on mobile via network trace, not just CSS.

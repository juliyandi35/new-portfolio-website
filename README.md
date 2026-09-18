# Nusantara Data Observatory — Juli Yandi Rahman Portfolio

A statically-exported Next.js portfolio for Juli Yandi Rahman, S.Mat, positioned as a
**Data & Security Systems Practitioner**. Built fresh (separate from the prior
attempt in the parent folder), reusing only real content: CV/riwayat-hidup data
and the live `github.com/juliyandi35` repository catalog.

## Stack

Next.js 14 (App Router, static export) · TypeScript · Tailwind CSS ·
React Three Fiber / drei (hero scene) · Framer Motion (scroll reveals,
`prefers-reduced-motion` aware via `MotionConfig`) · Vitest · Playwright.

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build         # static export to /out (runs build:data first)
npm run typecheck
npm run lint
npm run test           # Vitest — manifest parsing + content integrity
npm run test:e2e       # Playwright smoke test (run `npx playwright install` first)
```

## Real data, not fabricated

- `scripts/build-manifest.mjs` fetches `github.com/juliyandi35`'s public repos
  and parses the `<method family>[ | <family2>] | <application(s)>` taxonomy
  each repository already carries in its own description, producing
  `data/manifest.json` (301 repos, 13 method families, 16 applications,
  verified live during this build). Falls back to the committed manifest if
  the GitHub API is unreachable or rate-limited, so a build never fails on a
  transient network issue.
- `lib/content.ts` holds bio, experience, education, certifications, skills,
  and the five flagship-project case studies — all sourced from `cv.pdf` and
  the government riwayat-hidup record. No metric, employer, or credential is
  invented. Internal HR identifiers (NIP/NIK/KTP/rank dates/unit codes) are
  deliberately excluded.
- The portrait in `public/images/portrait.jpg` is extracted from the source
  CV (same photo, no stock imagery).

## Design system

- **Palette**: `ink-900` (#0b0f1a) and `paper` (#f6f1e7) as the base duo, plus
  a 13-tone Nusantara dye palette (`lib/methodPalette.ts` — tarum indigo,
  kesumba red, kunyit ochre, soga brown, etc.) assigned to method families by
  real usage count, most-practiced first.
- **Type**: Fraunces (display, editorial serif) / Inter (body) / JetBrains
  Mono (technical labels) — self-hosted via `@fontsource-variable`, no
  runtime Google Fonts dependency.
- **Motifs**: `components/Motifs/ParangDivider.tsx` computes a batik-parang
  inspired diagonal-band texture as an SVG path, not a static image.
- **Hero**: `components/Hero/ObservatoryScene.tsx` — a restrained R3F point
  field (golden-angle distribution) with subtle cursor parallax, disabled
  under `prefers-reduced-motion`.

## Structural choices vs. the prior attempt

The parent folder's `REVIEW_WEBSITE.md` documented a failed production build,
horizontal-overflow from a full-page 3D depth-transform pattern, broken
anchor navigation, and an invisible closing graph (canvas behind an opaque
background). This build avoids that pattern entirely: ordinary vertical
scroll with contained per-element reveals (no section-wide 3D transforms),
`scroll-margin-top` on every anchor target, and the hero canvas rendered
inline (never behind a negative-z-index global layer). Verified via Lighthouse
(Accessibility/Best Practices/SEO/Agentic Browsing all 100) and a real
Chrome DevTools performance trace (LCP 510ms, CLS 0.00 on the dev server).

## Known follow-ups

- `metadataBase` in `app/layout.tsx` uses a placeholder domain
  (`juliyandirahman.dev`) — update to the real deployment domain.
- `public/images/portrait.jpg` is 302×303px (from the source CV). A
  higher-resolution portrait would sharpen the About section on large/retina
  displays.
- `npm run test:e2e` needs `npx playwright install` (browser binaries) before
  its first run — not installed in this session.
- npm audit reports transitive dev-dependency vulnerabilities (mostly from
  `eslint@8`'s dependency tree); none affect the static production output.

# Code style

## TypeScript / React
- 2-space indent, double quotes, semicolons, trailing commas (match existing files); ~120-char lines.
- Functions under ~50 lines, files under 800 lines (`constants.ts` is the largest; split by section if it grows).
- Function components as `export const Name = () => {}`; one feature section per folder under `src/features/<name>/`
  with an `index.ts` re-export.
- Server components by default; add `"use client"` only for state or browser APIs (the client islands listed in
  `docs/ARCHITECTURE.md`). Keep an island's logic in a pure function in `src/lib/<name>.ts` with a
  `<name>.test.ts` beside it; the component only wires events and state.
- Shared UI pieces go in `src/components/ui/` (e.g. `TiltCard`), page chrome in `src/components/layout/`.
- Types for content live next to the data in `src/lib/constants.ts` (`interface`, PascalCase).
- Names: components PascalCase, constants UPPER_SNAKE_CASE, props/vars camelCase.
- Errors: catch network failures and show the user a clear next step; log with `console.error` without secrets.
- Comments explain why (or cite the master-profile id), not what.
- No dead code, unused deps, placeholders or TODO stubs.

## Content
- All visible text goes in `src/lib/constants.ts` with a `// [id]` comment pointing to `master_profile.yaml`.
- Exception: the exact API strings copied from the voting service (paths, headers, error messages, status codes)
  live in `src/lib/voteDemo.ts`, not in constants, because the truth test reads every string in constants and only
  allows profile facts there.
- Sentence case for headings and buttons; plain verbs ("Send message", "Download CV"); one label per intent across the page.

## Tailwind CSS v4
- Use the tokens (`bg-paper`, `text-ink`, `text-muted`, `border-rule`, `text-accent`, `bg-plate`, `bg-tint`);
  no raw hex colours in components.
- Buttons and button-like links get `press` and at least `min-h-11`; hover cards get `lift`, tilting cards use
  `TiltCard` (`tilt`); inputs use `field`. Do not override what these classes own (transform, transition, outline)
  with utilities on the same element.
- `font-sans` (Archivo) for UI, default serif for body, `font-mono` (JetBrains Mono) for code blocks. Utility
  classes inline; shared shells go in components, not in custom CSS.
- `globals.css` holds only tokens, base styles and the small component classes (`.link`, `.navlink`, `.rowlink`,
  `.field`).

## Motion CSS (`src/app/motion.css`)
- All scroll-driven animation, pin rules and `.lift` / `.tilt` / `.press` live here, **unlayered**: a layered rule
  would lose to Tailwind utilities and a stray utility could cancel a pin.
- Every animation rule goes inside `@supports (animation-timeline: scroll())` and
  `@media (prefers-reduced-motion: no-preference)`; pins also need `(min-width: 1000px) and (min-height: 590px)`.
  Outside those blocks the element must already show its final state.
- `animation` resets the timeline and range, so a range class comes after its animation class.
- No class switch on `<html>` for motion, and no JS scroll listeners for effects CSS can do.
- Don't name keyframes or classes after Tailwind utilities (`grow`, `pulse`): hence `.grow-in` and `live-pulse`.

## Dependencies
Runtime deps: Next, React, React DOM, `@phosphor-icons/react` (icons) and `@vercel/analytics`. No animation or
scroll libraries (GSAP, Lenis, Motion). Dev deps: Vitest, jsdom, `@vitejs/plugin-react`, `yaml`. Ask before
adding any other.
In server components import icons from `@phosphor-icons/react/dist/ssr`; in client components from `@phosphor-icons/react`.
Icons are decorative next to text: pass `aria-hidden`.

## Commits
`<type>: <description>` subject (feat, fix, refactor, docs, test, chore, perf, ci; ≤ 72 chars), blank line, short
body with the why, wrapped at 72. Work on a branch; merge to `main`
only after review, since `main` deploys to production.

# Architecture

## Overview

```
Browser ──► Vercel (Next.js 16, static "/" page)
              ├─ /                       pre-rendered HTML from src/app/page.tsx
              ├─ /api/profile-photo      serverless proxy → Google Drive image (cached 1 day)
              └─ /Vaibhav_Jain_...CV.pdf  redirect → the CV in Google Drive (old links keep working)
Browser ──► api.web3forms.com            contact form submit (client-side, public access key)
Browser ──► Vercel Web Analytics          page-view beacon (no cookies)
Browser ──► drive.google.com           "Download CV" (public file, direct download)
```

The page is a scroll story: pinned hero with the focus chart, a statement that fills in as you scroll, numbers,
hiring cards, work timeline, the voting project (sideways cards, flow diagram, vote demo, proof), other projects,
skills, education and contact. All text is rendered on the server; motion is CSS; small client islands add the rest.

## Folder layout
```
src/
  app/            layout.tsx (fonts, metadata, theme head script, <Analytics />), page.tsx (section order, skip link),
                  globals.css (tokens, base, component classes), motion.css (scroll motion, pins, hover/press),
                  not-found.tsx, api/profile-photo/route.ts, icon.svg
  components/
    layout/       Navbar, ThemeToggle, useActiveSection (nav indicator hook), Footer
    ui/           TiltCard
  features/       one folder per area, each with components/ and an index.ts re-export
    profile/      ProfileSection (hero), LensChart
    about/        AboutSection (filling statement), NumbersBand + CountUp, WhyHire
    resume/       WorkSection, SkillsSection + SkillFilter, EducationSection
    projects/     VotingProject (cards, demo, proof, repos), VoteFlow, VoteDemo, OtherProjects
    contact/      ContactSection, ContactForm
  lib/            constants.ts (all text and data) plus pure helpers with unit tests:
                  theme.ts, sections.ts, motion.ts, lens.ts, skills.ts, voteDemo.ts
  test-utils/     truth.ts: parses career/master_profile.yaml for the content truth tests (test-only)
```

## Components
| Part | Owns |
|---|---|
| `src/lib/constants.ts` | All text and data, each block with a `[id]` comment pointing to `master_profile.yaml` |
| `src/app/layout.tsx` | Fonts (Archivo, Source Serif 4, JetBrains Mono), metadata/Open Graph (`PERSON.siteUrl`), the inline theme script, `<Analytics />` |
| `src/app/motion.css` | Every scroll-driven animation, the pin rules and the `.lift` / `.tilt` / `.press` feedback; imported by `globals.css`, unlayered |
| Server components | Every section; they render constants and add motion class names |
| `app/api/profile-photo/route.ts` | Fetches the Drive photo with `revalidate: 86400`, sends public cache headers |
| `src/app/not-found.tsx` | 404 page in the hero plate's look |

### Client islands (`"use client"`)
Only what CSS cannot do. Each keeps its logic in a pure, tested function in `src/lib/`.
| Island | Does | Logic |
|---|---|---|
| `ThemeToggle` | Light/dark switch, saves the choice | `theme.ts` |
| `Navbar` + `useActiveSection` | Phone menu, current-section underline (`aria-current`) | `sections.ts` |
| `LensChart` | Lens that shows the chart sharp under the pointer | `lens.ts` |
| `TiltCard` | Pointer tilt on the hiring and voting cards | `motion.ts` (`tiltAngles`) |
| `CountUp` | Numbers count up once on screen; the server renders the final value | `motion.ts` (`countValue`) |
| `VoteDemo` | Browser-only copy of the vote endpoint (200 replay, 409 refusal) | `voteDemo.ts` |
| `SkillFilter` | All / Used at work / Projects and training pills | `skills.ts` |
| `ContactForm` | Web3Forms submit, spam trap, sent/error states | — |

## Motion
- CSS scroll-driven animations (`animation-timeline: scroll()` / `view()`) in `src/app/motion.css`, only inside
  `@supports (animation-timeline: scroll())` and `prefers-reduced-motion: no-preference`. Without them (Firefox,
  reduced motion, no script) no rule applies and every section shows its final state.
- Pinning (hero 1600px, statement 1900px, gallery 2900px) only at `min-width: 1000px` and `min-height: 590px`;
  sticky boxes sit at `top: var(--nav-h)`.
- The rules are unlayered on purpose: Tailwind utilities are in `@layer utilities`, and any layered rule loses to
  them, so a stray utility could cancel a pin.
- The nav indicator's IntersectionObserver uses `root: document` and `rootMargin: '-45% 0px -50% 0px'`.

## Data flow
- Content: `master_profile.yaml` → (human/agent edit) → `constants.ts` → components → static HTML at build.
  `src/lib/constants.test.ts` checks every number and blocked phrase against the profile.
- Theme: inline head script (`THEME_SCRIPT`) sets the `dark` class before paint: stored choice, else system setting.
- Contact: form → `fetch` to Web3Forms with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` → email to the key's inbox.
- Analytics: `<Analytics />` sends anonymous page views to Vercel; read them in the project's Analytics tab.

## Stack
Next.js 16.2.6 (Turbopack), React 19.2.4, TypeScript 5, Tailwind CSS 4, ESLint 9, `@phosphor-icons/react` 2.1.10
(icons), `@vercel/analytics` 2 (page views). Dev only: Vitest 4, jsdom, `@vitejs/plugin-react`, `yaml`.

## Key decisions
- **One content file** so text changes never touch layout (and a future agent can edit only data).
- **No GSAP, Lenis, Motion or smooth-scroll library** (removed 2026-10-09, kept for the 2026-11-24 redesign):
  CSS scroll timelines do the motion with no runtime cost, and native scrolling is more accessible.
- **CSS-only motion with progressive fallback** (2026-11-24): no class switch on `<html>`, so a failed script can
  never leave content half-faded.
- **Form posts straight to Web3Forms** (its key is public by design); the old `/api/contact` relay was removed.
- **Photo stays on Google Drive behind a cached proxy** instead of being committed (keeps the repo free of personal
  images; can move to `public/` later).
- **CV in Google Drive** (2026-10-14): the PDF is replaced with Drive's "Upload new version", which keeps the
  link, so a new CV needs no code change or deploy. `next.config.ts` redirects the old `public/` path to it.
- **Vercel Web Analytics** (added 2026-10-14): cookie-free, so no consent banner; free plan covers page views,
  referrers, countries and devices. Custom events (e.g. CV clicks) need Vercel Pro, so none are sent.
- Rejected: CMS or MDX (overkill for one page); `next/image` for the photo (proxy already sets caching).

## Known limits
- No browser (end-to-end) tests; unit tests cover the helpers, three islands (CountUp, VoteDemo, ContactForm) and the content.
- The form depends on Web3Forms uptime; failures show an inline error with the email address.
- On phones the voting cards and the flow diagram scroll sideways inside their own boxes.

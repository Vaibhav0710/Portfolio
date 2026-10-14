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

## Components
| Part | Owns |
|---|---|
| `src/lib/constants.ts` | All text and data (person, chart lines, about, experience, projects, skills, education, certifications) |
| `src/app/layout.tsx` | Fonts (Archivo, Source Serif 4), metadata/Open Graph, Vercel `<Analytics />` |
| `src/app/page.tsx` | Section order, skip link |
| `src/components/layout/Section.tsx` | Shared section shell: title column + content column |
| `features/profile` | Eye-chart hero (server component, CSS animation) |
| `features/about`, `features/resume`, `features/projects` | Server components rendering constants |
| `features/projects/VotingDiagram.tsx` | Inline SVG of the voting system's services |
| `features/contact` | Connect section; `ContactForm` is the only client form; `Navbar` is the only other client component |
| `src/app/not-found.tsx` | Eye-chart 404 page |
| `app/api/profile-photo/route.ts` | Fetches the Drive photo with `revalidate: 86400`, sends public cache headers |

## Data flow
- Content: `master_profile.yaml` → (human/agent edit) → `constants.ts` → components → static HTML at build.
- Contact: form → `fetch` to Web3Forms with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` → email to the key's inbox.
- Analytics: `<Analytics />` sends anonymous page views to Vercel; read them in the project's Analytics tab.

## Stack
Next.js 16.2.6 (Turbopack), React 19.2.4, TypeScript 5, Tailwind CSS 4, ESLint 9, `@phosphor-icons/react` 2.1.10 (icons), `@vercel/analytics` 2 (page views).

## Key decisions
- **One content file** so text changes never touch layout (and a future agent can edit only data).
- **No GSAP/Lenis/smooth scroll** (removed 2026-10-09): one CSS animation is enough; native scrolling is more accessible.
- **Form posts straight to Web3Forms** (its key is public by design); the old `/api/contact` relay was removed.
- **Photo stays on Google Drive behind a cached proxy** instead of being committed (keeps the repo free of personal
  images; can move to `public/` later).
- **CV in Google Drive** (2026-10-14): the PDF is replaced with Drive's "Upload new version", which keeps the
  link, so a new CV needs no code change or deploy. `next.config.ts` redirects the old `public/` path to it.
- **Vercel Web Analytics** (added 2026-10-14): cookie-free, so no consent banner; free plan covers page views,
  referrers, countries and devices. Custom events (e.g. CV clicks) need Vercel Pro, so none are sent.
- Rejected: CMS or MDX (overkill for one page); `next/image` for the photo (proxy already sets caching).

## Known limits
- No automated tests. The form depends on Web3Forms uptime; failures show an inline error with the email address.
- The diagram scrolls sideways on phones.

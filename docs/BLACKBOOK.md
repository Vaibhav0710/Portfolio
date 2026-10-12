# Black book: Vaibhav Jain portfolio

## Part 1: report

**Title:** Truthful, recruiter-ready portfolio for a Java backend developer

**Abstract:** A single-page Next.js site that presents Vaibhav Jain's backend work, Java projects, education and
contact options to recruiters. Every statement is drawn from a verified master profile. The 2026-10 rewrite removed
unverified claims and replaced a template "neon terminal" design with an eye-test-chart identity tied to his
healthtech work.

**Problem:** The previous site showed numbers with no evidence (40% latency, 12k+, 99.9%), Kafka/Kubernetes at work,
wrong project descriptions and wrong education, which could fail a recruiter's or background check's scrutiny.

**Objectives:** truth-only content from one source; Java-first positioning without implying Java at work; fast,
accessible, mobile-friendly page; one-click contact and CV.

**Scope:** one page: hero, about, work, projects, skills, education/certifications, connect. Out of scope for now:
analytics, tracked links, SEO automation.

**Methodology:** read the brief and master profile → map every old claim → rewrite content into one data file
with source ids → redesign → verify (lint, types, build, truth grep, screenshots at 375/1280/1440 px, light/dark).

**System design:** see `docs/ARCHITECTURE.md`.

**Modules:** profile (hero), about, resume (work, skills, education), projects (+ diagram), contact (+ form).

**Implementation highlights:** container-unit chart typography; skills marked work vs. projects; architecture SVG
drawn from the voting-system README; cached photo proxy; removed GSAP, Lenis and four unused packages.

**Results:** lint, type check and production build pass; no page overflow at 375 px; truth grep clean.

**Challenges:** fitting the chart lines at every width; keeping the email on one line; the browser preview pane's
screenshots going stale (solved with headless Chrome captures).

**Future scope:** Playwright smoke tests; per-application tracked links; analytics; SEO; move the photo into the repo.

**References:** `career/briefs/PORTFOLIO_BRIEF.md`, `career/master_profile.yaml`, C-DAC PG-DAC page
(https://cdac.in/?id=DAC).

## Part 2: log (newest first)

### 2026-10-12
- Design audit (accessibility, performance, theming, responsive, motion, composition): 16/20 technical, 6/10 craft.
  Fixed every finding:
  - Input borders 1.9:1 to 5.5:1 and placeholder 3.0:1 to 5.5:1 (WCAG 1.4.11 / readability).
  - Hero animation 900 ms + 140 ms stagger + 10px blur to 560 ms + 60 ms + 4px; reduced motion now fades instead of nothing.
  - All controls at least 44 px tall: menu button, CV button, link lists, certificate links, footer.
  - Press feedback (`.pressable`), `--ease-out` token as the Tailwind default easing, shadow tokens.
  - One label per intent (Email me, Download CV); Phosphor icons replace hand-drawn ones; error callout without the side stripe.
  - Layout variety: stacked Projects (full-width diagram + side column), Skills as a full-width band, stacked Connect.
  - Eye-chart 404 page.
- Kept by decision: serif body text, en-dash date ranges, native scrolling (no Lenis), photo in About not the hero.
- Verified: lint, types, build, screenshots desktop light/dark, 375 px, 404. Not verified: Lighthouse,
  screen reader, real devices.

### 2026-10-10
- Recorded confirmed facts in the master profile: PG-DAC modules incl. Algorithms and Data Structures using Java;
  Apna College certificate title "Alpha (DSA with Java)"; LeetCode 100 Days Badge 2024 (achievement `ach_1`).
- Added recruiter availability (notice period 30 days, open-to locations) to Connect.
- Decision: degree title is **B.E.** (Vaibhav confirmed against the SPPU result sheet "B.E. (2019 PAT.)(MECHANICAL)").
  Corrected B.Tech to B.E. in the master profile, CV (recompiled, still one page), profile packs, brief, PLAN.md,
  the shared career notes and this site. LinkedIn and Naukri must be corrected by hand.
- Added the 10 project docs.

### 2026-10-09
- Truthful rewrite on branch `truthful-update`: removed every claim in `never_claim`; IntelligentDX shown once with
  two roles; voting system as lead project; fixed Pizza-Shop/Rent_A_Car; fixed education; job email; CV in `public/`.
- Redesign: eye-chart hero, light/dark tokens, Archivo + Source Serif 4; removed GSAP, Lenis, glass cards.
- Removed `/api/contact` (open relay, unused); rebuilt the form to post to Web3Forms with a honeypot and clear errors.
- Lesson: the Google Cloud Bootcamp certificate link was private (HTTP 401); link hidden until shared publicly.
- Incident: a `sed` replacement with `&` garbled a sentence; fixed with an exact edit. Prefer exact edits for prose.

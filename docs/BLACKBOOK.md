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
tracked links, SEO automation.

**Methodology:** read the brief and master profile → map every old claim → rewrite content into one data file
with source ids → redesign → verify (lint, types, build, truth grep, screenshots at 375/1280/1440 px, light/dark).

**System design:** see `docs/ARCHITECTURE.md`.

**Modules:** profile (hero), about, resume (work, skills, education), projects (+ diagram), contact (+ form).

**Implementation highlights:** container-unit chart typography; skills marked work vs. projects; architecture SVG
drawn from the voting-system README; cached photo proxy; removed GSAP, Lenis and four unused packages.

**Results:** lint, type check and production build pass; no page overflow at 375 px; truth grep clean.

**Challenges:** fitting the chart lines at every width; keeping the email on one line; the browser preview pane's
screenshots going stale (solved with headless Chrome captures).

**Future scope:** Playwright smoke tests for the scroll motion; per-application tracked links; SEO; move the photo into the repo.

**References:** `career/briefs/PORTFOLIO_BRIEF.md`, `career/master_profile.yaml`, C-DAC PG-DAC page
(https://cdac.in/?id=DAC).

## Part 2: log (newest first)

### 2026-11-27
- Removed the Apna College "Alpha: DSA with Java" certificate (`cert_2`) from the certifications list at Vaibhav's
  request (also removed from the master profile, the CV and the Naukri texts). DSA practice repos stay under projects.

### 2026-11-24
- Motion redesign shipped on the branch (not deployed): the page is now a scroll story. Pinned hero with the focus
  chart and lens, a statement that fills in, count-up numbers, hiring cards, work cards on a drawn timeline, the
  voting project as sideways cards plus a lit flow diagram and a browser-only "try to vote twice" demo, proof,
  skills filter, education cards and a new Contact section. Dark mode toggle in the nav. Vitest added (dev only)
  with truth tests that check every number and blocked phrase against the master profile.
- Decisions:
  - **CSS-only motion** (scroll-driven animations in `src/app/motion.css`, unlayered); still no GSAP, Lenis or
    Motion. Everything sits behind `@supports (animation-timeline: scroll())` and reduced-motion, so Firefox and
    reduced-motion visitors get the final, readable page.
  - **Pin limits**: pinning only at `min-width: 1000px` and `min-height: 590px`, sticky at `--nav-h: 61px`, and
    pinned type sized with `vh` so it fits one screen.
  - **Phone number shown** in Contact (decided 2026-11-22).
  - **Dimmed skill chips at 0.55** opacity (was 0.22, too hard to read).
  - Email label "Your email" (not "Work email"); the notice line is built from `PERSON` instead of repeating it;
    `PERSON.siteUrl` is now `https://vaibhav-jain.dev` for Open Graph.
- Truth fixes found while moving the content:
  - **Wrong database claim fixed**: the voting system uses one PostgreSQL database with a schema per service, never
    "a database per service".
  - **Tracing wording**: Prometheus metrics come from all 6 services, but Zipkin tracing is not on all 6 (Eureka has
    metrics and logs only), so the text no longer implies 6/6 tracing.
  - **Gateway wording**: the gateway validates the JWT without Spring Security (which lives in the user service),
    so "Spring Security (JWT)" was dropped from the gateway step.
- Lessons:
  - In a cross-origin preview (iframe) the IntersectionObserver ignores `rootMargin` with the default root, so the
    nav indicator band did not apply; `root: document` makes the margin work there too.
  - Pinned content must fit under the nav on short screens: hence the 590 px height limit, `top: var(--nav-h)` and
    `vh`-based type inside pinned boxes. Checked at 1536×695, 1000×600, 1280×650 and 375×812.
  - Layered motion rules lost to Tailwind utilities (a stray utility could cancel a pin); unlayered rules fixed it.
  - Two clicks in one tick on the vote demo reused the same request key; the key is now read from the latest state.
- Final check found the pinned voting cards about 7px past the bottom edge at 1000×600 (the heading wraps more
  there); screens up to 640px tall now trim the pinned gallery's padding and gap.
- Verified: `npm test` (89 tests), lint, types, build, truth grep; production build at 1536×695, 1000×600,
  1280×650 and 375×812 in light and dark (no sideways overflow, nothing under the nav, only the local Vercel
  analytics 404 in the console); reduced motion (nothing pins, numbers show 1.5 / 400+ / 180+ / 59); Firefox
  without scroll timelines (no pins, nothing faded or blurred). Not verified: real phones, screen readers,
  Lighthouse, a real form send.

### 2026-10-14
- Added Vercel Web Analytics (`@vercel/analytics`, `<Analytics />` in the root layout) to see visits and
  referrers (LinkedIn, Naukri, GitHub). Chosen because it sets no cookies, so no consent banner is needed. Custom
  events need Vercel Pro, so CV clicks are not tracked.
- Verified: lint, types, build. Analytics data appears only after the deploy.
- CV moved to Google Drive: "Download CV" points at a direct-download Drive link; the PDF left `public/`; the old
  path redirects. Updating the CV is now "Upload new version" in Drive (same link, no deploy). Shipped the 12 Oct CV
  (repo link per project); the Drive copy was checked byte for byte against `career/cv`.
- Incident caught: the Drive folder was shared as "Anyone with the link: Editor", which would let any visitor replace
  the CV. Vaibhav switched the folder and file to Viewer before the link went live.

### 2026-10-12
- Contact form: Web3Forms key replaced with one registered to the job email, set in Vercel and `.env`, site
  redeployed; Vaibhav sent a test message and it arrived in the job inbox.
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

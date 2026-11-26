# PRD: portfolio site

## Problem and audience
Recruiters and hiring engineers (India first, then UAE, Europe, Japan, Canada, USA) get a link to this site from
Vaibhav's CV and job applications. In under a minute they need to see who he is, what he has shipped, whether his
Java claims are real, and how to contact him. The old site had unverified numbers and wrong education, so trust is
the core requirement.

## Goals
- Position Vaibhav as a Java/Spring Boot backend developer with 1.5 years of production backend work.
- Every statement is true and traceable to `career/master_profile.yaml`.
- Make contact and the CV one click away.

## Non-goals
- Blog, CMS, a custom analytics dashboard, multiple pages (planned later, see roadmap).
- Showing salary or other form-only data.

## Use cases
1. A recruiter opens the link, reads the headline, downloads the CV.
2. A hiring engineer checks the work bullets and the voting-system architecture, opens the GitHub repos.
3. A recruiter sends a message through the form or emails directly; checks notice period and locations.

## Functional requirements
Sections, top to bottom (`src/app/page.tsx`):
1. **Hero**: photo, open-to-work badge, pitch, location chips, Email me / Download CV / LinkedIn / GitHub, and the
   focus chart (sharpens on scroll, lens on hover) ending in "If you can read this, we should talk."
2. **About**: a short first-person statement that fills in as you scroll, then a short story.
3. **In numbers**: 1.5 years, 400+ pull requests authored, 180+ reviewed, 59 documents written.
4. **Why hire me**: four cards.
5. **Work**: IntelligentDX once, two roles (intern Apr–Oct 2025, Junior Software Developer Nov 2025–present) as
   titled cards on a timeline.
6. **Voting system** (lead project): one vote's journey as sideways cards, the flow diagram, the "try to vote twice"
   demo (201 / 200 replay / 409), proof (tests, load run, near-simultaneous votes, chaos checks, Kubernetes on
   kind, observability) and per-service repo links.
7. **Other projects**: Courier, then earlier practice.
8. **Skills**: backend only, filterable by "Used at work" / "Projects and training".
9. **Education** (PG-DAC with modules; B.E. Mechanical, MESCOE/SPPU, 2019–2023) and certifications.
10. **Contact**: closing line, notice period and open-to locations, email, phone, LinkedIn and GitHub cards,
    Download CV and the message form.
11. CV PDF downloadable in one click (hosted in Google Drive, so it updates without a deploy).

## Non-functional requirements
- Truth: no number or claim that isn't in the master profile.
- Works from 320 px phones to wide desktops; no sideways page scroll.
- Light and dark mode (toggle, saved choice, no flash); visible keyboard focus; reduced motion respected.
- Motion is CSS only and optional: without scroll timelines or with reduced motion every section is fully readable.
- Static page (fast, cheap); only the photo proxy and form call out.

## Success measures
- Zero claims outside the master profile (grep check in `docs/TESTING.md`).
- `npm test`, lint, type check and build pass; no sideways scroll at 375, 1000, 1280 and 1536 px.
- Visits and referrers in Vercel Web Analytics (since 2026-10-14); recruiters reply via the form or email.

## Roadmap
- Done 2026-10: truthful rewrite + eye-chart redesign.
- Done 2026-11-24: motion redesign (scroll story, dark toggle, vote demo, skill filter).
- Done 2026-10-14: Vercel Web Analytics (page views, referrers).
- Next: per-application tracked links (`?r=code`), SEO (Job/PLAN.md section 9).

## Open questions
None right now.

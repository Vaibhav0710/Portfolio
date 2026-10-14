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
1. Hero states name, role, core stack, experience and location.
2. About: short first-person summary.
3. Work: IntelligentDX once, two roles (intern Apr–Oct 2025, Junior Software Developer Nov 2025–present).
4. Projects: voting system first (with architecture diagram and per-service repo links), Courier, smaller projects.
5. Skills: backend only, each marked "used at work" or "projects and training".
6. Education (PG-DAC with modules; B.E. Mechanical, MESCOE/SPPU, 2019–2023) and certifications/achievements.
7. Connect: message form, Send email / Open in Gmail, LinkedIn, GitHub, CV, notice period, open-to locations.
8. CV PDF downloadable in one click (hosted in Google Drive, so it updates without a deploy).

## Non-functional requirements
- Truth: no number or claim that isn't in the master profile.
- Works from 320 px phones to wide desktops; no sideways page scroll.
- Light and dark mode; visible keyboard focus; reduced motion respected.
- Static page (fast, cheap); only the photo proxy and form call out.

## Success measures
- Zero claims outside the master profile (grep check in `docs/TESTING.md`).
- Lint, type check and build pass; page fits at 375 px.
- Visits and referrers in Vercel Web Analytics (since 2026-10-14); recruiters reply via the form or email.

## Roadmap
- Now: truthful rewrite + redesign (branch `truthful-update`).
- Done 2026-10-14: Vercel Web Analytics (page views, referrers).
- Next: per-application tracked links (`?r=code`), SEO (Job/PLAN.md section 9).

## Open questions
None right now.

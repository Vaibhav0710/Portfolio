# Testing

## Current state
There are **no automated tests** yet. The site is a static page plus one form, so checks are static analysis, a
production build, a truth check and a manual visual pass. Adding Playwright smoke tests is listed in future scope
(`docs/BLACKBOOK.md`).

## Before every push
```bash
npm run lint
npx tsc --noEmit
npm run build
```

Truth check (must print nothing):
```bash
grep -rniE "40%|99\.9|12k|4,000|150\+|25\+|30%|3x|35%|kubernetes|entity framework|aes-256|vaibhavjain7171|b.?tech|2021 ?[-–] ?2025|millions|resilience4j|prometheus|hermes" src
```
Then read every changed line in `src/lib/constants.ts` against `career/master_profile.yaml`.

## Manual checks (`npm run dev`, http://localhost:3000)
- Light and dark mode; desktop (1280–1440 px) and phone (375 px): no sideways scroll
  (`document.documentElement.scrollWidth === innerWidth`).
- Hero chart lines fit the plate; diagram scrolls inside its box on phones.
- Links: CV PDF returns 200; GitHub repos and certificate links open publicly; Send email / Open in Gmail.
- Mobile menu opens and closes; keyboard focus visible.
- Contact form: only send a test message with Vaibhav's OK (it delivers a real email). Check the sent and error states.

## Rules
Tests and checks never send real messages or touch real accounts without asking.

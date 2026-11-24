# Testing

## Automated tests
`npm test` runs Vitest once (`vitest run`, jsdom, config in `vitest.config.mts`). Tests sit beside the code as
`*.test.ts` / `*.test.tsx`:

| Test | Covers |
|---|---|
| `src/lib/constants.test.ts` | **Truth tests**: no `never_claim` or confidential phrase appears; every number in the content appears in the master profile's public facts; the checks reject planted claims; content shapes the CSS expects (6 statement parts, 4 hiring cards, stats 1.5 / 400 / 180 / 59) |
| `src/lib/theme.test.ts` | Stored choice beats the system setting; the head script agrees with `resolveTheme`; storage errors |
| `src/lib/sections.test.ts` | Which nav link is current |
| `src/lib/motion.test.ts` | Count-up values (exact target at t=1), entrance classes, tilt angles, reduced-motion check |
| `src/lib/lens.test.ts`, `skills.test.ts` | Lens position, chip dimming |
| `src/lib/voteDemo.test.ts`, `VoteDemo.test.tsx` | Demo rules (201, 200 replay, 409), a second request mid-run resets the steps |
| `CountUp.test.tsx` | Final value rendered and spoken, kept without IntersectionObserver and with reduced motion |
| `ContactForm.test.tsx` | Focus moves to the sent heading after a successful send (fetch is stubbed) |

The truth tests read `career/master_profile.yaml` (and the notice period from `career/qa_bank.yaml`) by walking up
from the repo folder, with helpers in `src/test-utils/truth.ts`. Where the profile is not on disk (CI, Vercel) the
profile tests are skipped and a fallback blocked list still runs.

## Before every push
```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Truth grep over the app code (must print nothing; tests and test-utils hold the blocked phrases on purpose):
```bash
grep -rniE --include=*.ts --include=*.tsx --exclude=*.test.ts --exclude=*.test.tsx --exclude-dir=test-utils "40%|99\.9|12k|4,000|150\+|25\+|30%|3x|35%|entity framework|aes-256|vaibhavjain7171|b.?tech|2021 ?[-–] ?2025|millions|hermes|acuity" src
```
Kubernetes (local kind), Resilience4j and Prometheus are voting-project facts (`proj_1`) shown on the page, so they
are not in the grep; Kubernetes **at work** stays blocked by the truth tests. Then read every changed line in
`src/lib/constants.ts` against `career/master_profile.yaml`.

## Manual checks (`npm run build && npx next start`, or `npm run dev`)
At **1536×695, 1000×600, 1280×650 and 375×812**, in light and dark:
- No sideways page scroll: `document.documentElement.scrollWidth === innerWidth`.
- Nothing hides under the nav: the pinned hero, statement and voting cards fit below the 61 px bar (pins apply only
  at 1000 px wide and 590 px tall or more).
- Hero chart lines fit the plate; the lens follows the pointer; the statement fills while pinned; the voting cards
  slide while pinned and swipe on phones; the flow diagram lights up; numbers count up to 1.5, 400+, 180+, 59.
- Without scroll timelines (DevTools `@supports` toggle, or Firefox) every section is readable in its final state.
- With reduced motion emulated: nothing pins, numbers show final values, the vote demo answers without delays.
- Theme toggle switches and survives a reload; a dark reload does not flash light.
- Nav underline follows the section in view; the phone menu opens, closes (also on Escape); keyboard focus visible.
- Vote demo: "Cast vote (new request)" (201), "Retry same request" (200 replay), "Cast vote" again (409), Reset;
  double clicks never mix step states.
- Skills filter dims the other chips to 0.55.
- Links: CV link downloads the PDF signed out (and matches `career/cv`), the old
  `/Vaibhav_Jain_Java_Backend_Developer_CV.pdf` path redirects to it; GitHub repos and certificate links open
  publicly; email, phone, LinkedIn and GitHub cards.
- Tap targets: every visible link/button is at least 44 px tall at 375 px (inline links inside sentences are exempt).
- `/does-not-exist` shows the 404 plate.
- No console errors (the Vercel analytics script 404s locally; that is expected).
- Contact form: only send a test message with Vaibhav's OK (it delivers a real email). Check the error state by
  blocking `api.web3forms.com` in DevTools.

## Rules
Tests and checks never send real messages or touch real accounts without asking.

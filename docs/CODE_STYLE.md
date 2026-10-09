# Code style

## TypeScript / React
- 2-space indent, double quotes, semicolons, trailing commas (match existing files); ~120-char lines.
- Function components as `export const Name = () => {}`; one feature section per folder under `src/features/<name>/`
  with an `index.ts` re-export.
- Server components by default; add `"use client"` only for state or browser APIs (Navbar, ContactForm).
- Types for content live next to the data in `src/lib/constants.ts` (`interface`, PascalCase).
- Names: components PascalCase, constants UPPER_SNAKE_CASE, props/vars camelCase.
- Errors: catch network failures and show the user a clear next step; log with `console.error` without secrets.
- Comments explain why (or cite the master-profile id), not what.
- No dead code, unused deps, placeholders or TODO stubs.

## Content
- All visible text goes in `src/lib/constants.ts` with a `// [id]` comment pointing to `master_profile.yaml`.
- Sentence case for headings and buttons; plain verbs ("Send message", "Download CV (PDF)").

## Tailwind CSS v4
- Use the tokens (`bg-paper`, `text-ink`, `text-muted`, `border-rule`, `text-accent`, `bg-plate`, `bg-tint`);
  no raw hex colours in components.
- `font-sans` (Archivo) for UI, default serif for body. Utility classes inline; shared shells go in components,
  not in custom CSS. Global CSS only for tokens, base styles, `.link` and the chart animation.

## Dependencies
Keep runtime deps to Next, React and React DOM. Ask before adding any.

## Commits
Imperative subject (≤ 72 chars), blank line, short body with the why. End with the attribution line the session
asks for. Work on a branch; never push without Vaibhav's OK.

# Design system

## Idea
Vaibhav builds software for eye-care clinics, so the hero is a **focus chart**: big "Java" on top, smaller lines
below, a red rule and the closing line "If you can read this, we should talk." The chart sharpens as you scroll,
and a lens shows it sharp under the pointer. The rest of the page is a scroll story on paper background, navy ink
and one red accent, with serif body text that reads like a letter.

## Colour tokens (`src/app/globals.css`, `:root` and `:root.dark`)
| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | `#eef1f2` | `#0f141d` | Page background |
| `plate` | `#ffffff` | `#171e2a` | Chart plate, cards, form card, alternate section background |
| `ink` | `#14223a` | `#e6eaf0` | Text, primary buttons |
| `muted` | `rgb(86 97 115)` | `#9aa5b5` | Secondary text, labels, input borders |
| `rule` | `#d3d9df` | `#2b3445` | Borders, dividers |
| `accent` | `#b3262d` | `#f06b70` | Underlines, focus ring, chart rule, accent words; `--link` points to it |
| `tint` | `#e2e8ec` | `#1d2533` | Filter pill track, sent and error panels, row hover |
| `band` | `#14223a` | `#1d2533` | Numbers band background (dark in both themes) |
| `on-band` / `on-band-muted` | `#eef1f2` / `#c4cbd6` | same | Text on the band |
| `glass` | `rgb(238 241 242 / 0.8)` | `rgb(15 20 29 / 0.78)` | Sticky nav background |
| `ok` / `stop` / `info` | `#1f7a4d` / `#b3262d` / `#1f5fbf` | `#4cc78a` / `#f06b70` / `#7aa7ff` | Vote demo step and status colours |
| `code` | `#0f1a2c` | `#0b111b` | Vote demo request/response blocks |

Shadows: `shadow-plate` (chart plate, 404) and `shadow-card` (cards, hover), tinted with the ink hue in light mode
and near-black in dark; defined as `--plate-shadow` / `--card-shadow`. No raw hex in components.

## Dark mode
- A `dark` class on `<html>` (Tailwind `@custom-variant dark`), not the media query.
- Choice order: saved choice (`localStorage` key `theme`) > system setting. `ThemeToggle` in the nav switches it.
- An inline head script (`THEME_SCRIPT`, `src/lib/theme.ts`) sets the class and `color-scheme` before the first
  paint, so a dark page never flashes light. Storage errors mean "no saved choice".

## Typography
- **Archivo** (variable width, `--font-sans`): headings, labels, UI, chart. Headings use `font-stretch` 110–125%.
- **Source Serif 4** (`--font-serif`): body text, 17–19 px, line-height 1.6–1.75.
- **JetBrains Mono** (`--font-mono`, 400/600): vote demo request and response.
- Chart lines size in container units (`cqi`) so each fits the plate at any width (hero and 404).

## Layout
- Content width `max-w-[1180px]`; side padding `clamp(20px, 4vw, 48px)`; section padding about
  `clamp(80px, 10vw, 140px)`.
- Sticky glass nav, exactly 61 px tall at 1000 px and up (`--nav-h: 61px`), with a scroll progress bar.
- Alternate sections use `bg-plate`; the numbers band is `bg-band`.

## Components
- Buttons: pills (`rounded-full`, `min-h-[50px]` or `min-h-11`); primary = filled ink, secondary = ink outline.
  All use `.press` (scale 0.97 on press, dimmed when disabled).
- Cards: `.lift` (rise 6 px with the card shadow on hover) or `TiltCard` / `.tilt` (pointer tilt).
- Text links: `.link` (red underline that thickens on hover); row links `.rowlink` (tint on hover); nav links `.navlink`.
- Form fields: `.field` (1.5 px `muted` border, 3 px focus outline). Labels "Your name", "Your email", "Role or message".
- **SkillFilter**: All / Used at work / Projects and training pills; chips not in the filter drop to **0.55 opacity**
  (still read out by screen readers). Marker: filled dot = used at work, ring = projects and training.
- **VoteDemo**: step list with ok/stop/info pills, status badge, request and response blocks.
- **ContactForm**: states idle / sending / sent / error; after a send, focus moves to the "Message sent" heading.
- **404** (`src/app/not-found.tsx`): plate with "404" and "Page not found" in container units, red rule, pill back home.
- Labels: one per intent everywhere: **Email me**, **Download CV**.
- Tap targets: every control is at least 44 px tall (`min-h-11`).
- Icons: Phosphor (`@phosphor-icons/react`), decorative with `aria-hidden`.

## Motion (`src/app/motion.css`)
- Token `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`; Tailwind default transitions use it at 160 ms.
- Scroll-driven only: chart lines sharpen (`.cl .r2–.r7`), the hint fades, the statement fills (`.s1–.s7`),
  cards rise (`.rise`, `.pop .d2–.d4`), the work timeline draws (`.draw`), the voting cards slide (`.track`),
  the flow diagram lights node by node (`.n1–.n6`, `.dot`, `.railFill`), the contact heading grows (`.grow-in`).
- Every rule sits inside `@supports (animation-timeline: scroll())` and `prefers-reduced-motion: no-preference`.
- **Pins** (hero 1600 px, statement 1900 px, gallery 2900 px tall) only at `min-width: 1000px` and
  `min-height: 590px`. Sticky boxes: `top: var(--nav-h)`, `height: calc(min(100vh, 960px) - var(--nav-h))`, and
  their type shrinks with `vh` so pinned content always fits under the nav. Up to 640 px tall the pinned gallery
  also trims its padding and gap so the voting cards fit (checked at 1000×600).
- The statement fills only while pinned; unpinned it shows at full opacity.
- **Fallbacks:** without scroll timelines (Firefox) or with reduced motion, nothing animates or pins and every
  section shows its final state. With reduced motion the count-up shows final numbers, the vote demo skips its
  step delays, the live dot stops pulsing and cards keep their hover shadow but do not move or tilt.

## Accessibility
Skip link, labelled form fields, `aria-expanded` menu (closes on Escape), `aria-current` on the nav link in view,
visible `:focus-visible` outline (base layer, so round buttons keep a round ring), chart text also in a
screen-reader list, numbers read as final values, diagram with `role="img"` and a description, named landmarks
for every section.

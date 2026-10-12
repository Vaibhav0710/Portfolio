# Design system

## Idea
Vaibhav builds software for eye-care clinics, so the hero is an **eye-test chart**: name on the largest line, then
smaller lines with real `6/60 … 6/6` marks and a red rule. Everything else is quiet: paper background, navy ink,
one red accent, serif body text that reads like a letter. The chart's focus-in is the page's only automatic motion.

## Colour tokens (`src/app/globals.css`)
| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | `#eef1f2` | `#0f141d` | Page background |
| `plate` | `#ffffff` | `#171e2a` | Chart plate, form card, diagram |
| `ink` | `#14223a` | `#e6eaf0` | Text, primary buttons |
| `muted` | `#566173` | `#9aa5b5` | Secondary text, labels |
| `rule` | `#d3d9df` | `#2b3445` | Borders, dividers |
| `accent` | `#b3262d` | `#f06b70` | Link underlines, focus ring, chart rule, vote path |
| `tint` | `#e2e8ec` | `#1d2533` | "Stack at work" panel, error panel |

Dark mode follows `prefers-color-scheme`.

Shadows: `shadow-plate` (chart plate, 404) and `shadow-card` (form), tinted with the ink hue in light mode and near-black in dark; defined as `--plate-shadow` / `--card-shadow`.

## Typography
- **Archivo** (variable width, `--font-sans`): headings, labels, UI, chart (uppercase only in the chart).
  Headings use `font-stretch` 110–125%.
- **Source Serif 4** (`--font-serif`): body text, 17–18 px, line-height 1.7–1.75, max ~62–68ch.
- Chart lines size in container units (`cqi`) so each fits its column at any width.

## Spacing and layout
- Container `max-w-6xl`; side padding 20 px (phone) / 32 px.
- Section: `py-14` / `md:py-20`. Two layouts (`Section` prop `layout`):
  - **sidebar**: heading column 13rem + content column on `md+` (About, Work, Education).
  - **stacked**: heading above full-width content (Projects with the full-width diagram, Skills, Connect).
  - `band`: full-width `bg-plate` background (Skills) to break the rhythm.
- Projects: full-width diagram, then bullets beside a 17rem side column (built with, status, link list).
- Between projects: `mt-14 pt-10` with a rule.

## Components
- **Section** (title column + content), **Navbar** (sticky; menu button on phones), **Footer**.
- Buttons: primary = filled ink (one per area); secondary = ink outline. Both use `.pressable` (scale 0.97 on press). Text links = ink with red underline.
- Labels: one per intent everywhere: **Email me**, **Download CV**.
- Tap targets: every control is at least 44 px tall (`min-h-11`); the tiny 6/6 chart link keeps small text with padding.
- Link lists (project repos, certificates) are full-height rows with an arrow icon.
- Icons: Phosphor (`@phosphor-icons/react`, size 16–22, regular weight); the voting diagram is the only hand-drawn SVG.
- **ContactForm**: labelled inputs with `border-muted` (5.5:1), focus ring, states idle / sending / sent / error (error: warning icon on a tint panel, with the email address).
- **404** (`src/app/not-found.tsx`): a two-line eye chart with a link back home.
- Skills marker: filled dot = used at work; ring = projects and training.
- Timeline: left rule with ring markers for the two roles.

## Accessibility
Skip link, labelled form fields, `aria-expanded` menu, visible `:focus-visible` outline, `sr-only` h1 for the chart,
diagram has `role="img"` + description, reduced motion swaps the chart blur for a 200 ms fade.

## Motion
- Token `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`; Tailwind default transitions use it at 160 ms.
- Hero: `focus-in` 560 ms (blur 4px + opacity), 60 ms between lines, starting at 80 ms (done in about 1.1 s).
- Press: `.pressable` scales to 0.97 over 160 ms.

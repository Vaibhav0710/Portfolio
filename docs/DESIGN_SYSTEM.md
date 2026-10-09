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

## Typography
- **Archivo** (variable width, `--font-sans`): headings, labels, UI, chart (uppercase only in the chart).
  Headings use `font-stretch` 110–125%.
- **Source Serif 4** (`--font-serif`): body text, 17–18 px, line-height 1.7–1.75, max ~62–68ch.
- Chart lines size in container units (`cqi`) so each fits its column at any width.

## Spacing and layout
- Container `max-w-6xl`; side padding 20 px (phone) / 32 px.
- Section: `py-14` / `md:py-20`, heading column 13rem + content column on `md+`, stacked on phones.
- Between projects: `mt-12 pt-10` with a rule.

## Components
- **Section** (title column + content), **Navbar** (sticky; menu button on phones), **Footer**.
- Buttons: primary = filled ink (one per area); secondary = ink outline. Text links = ink with red underline.
- **ContactForm**: labelled inputs, focus ring, states idle / sending / sent / error (error shows the email address).
- Skills marker: filled dot = used at work; ring = projects and training.
- Timeline: left rule with ring markers for the two roles.

## Accessibility
Skip link, labelled form fields, `aria-expanded` menu, visible `:focus-visible` outline, `sr-only` h1 for the chart,
diagram has `role="img"` + description, reduced motion disables the chart animation.

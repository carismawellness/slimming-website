# Carisma Slimming — Design Guidelines

This document defines the visual system for the Carisma Slimming website: color
palette, typography, and logo usage.

---

## Color Palette (2026 Refresh)

### Brand Colors

| Color | Hex | Usage |
|---|---|---|
| Deep forest green | `#024C27` | **NEW PRIMARY** — text, icons, CTA fill. AAA on white. |
| Light sage | `#C9D8C1` | Background / tint, decorative. |
| Slate blue | `#6391AB` | Accent, decorative / large only. |
| Dark teal | `#124E59` | Accent text — AAA on white. |
| Bronze / taupe | `#978063` | Decorative accent. |
| Warm beige | `#EFE7D7` | Warm band. |
| White | `#FFFFFF` | Base / background. |

### Neutrals

| Role | Hex |
|---|---|
| Ink (headings) | `#1A1A1A` |
| Body text | `#333333` |
| Secondary text | `#595959` |
| Background | `#F5F5F5` |

### Gold Accent

| Variant | Hex | Usage |
|---|---|---|
| Gold (decorative) | `#D4AF37` | Decorative accents only. |
| Gold (accessible text) | `#8C6D18` | Small-text-safe gold. |

### Accessibility Notes

- **Small-text-safe greens / teals:** Deep forest `#024C27` and dark teal
  `#124E59` are the only greens/teals approved for small text (both AAA on white).
- **Decorative only — do NOT use as small text on white:** bright sage `#8EB093`,
  slate blue `#6391AB`, and bronze `#978063`.
- For gold text, use the accessible `#8C6D18`; reserve `#D4AF37` for decoration.

---

## Typography

| Family | CSS Family | Role |
|---|---|---|
| Novecento Wide | — | Display: headings, nav, CTAs — **uppercase, tracked**. |
| Trajan Pro | — | Elegant serif accents. |
| Roboto | — | Body text. |
| Helvetica | `"Helvetica Brand"` | Clean neutral UI / alternate body. |
| Ani Lazy Day | `"Carisma Script"` (`.font-script`) | Decorative script — large decorative accents **only**. |

**Notes:**
- Novecento Wide drives display copy and should be set uppercase with letter
  tracking for headings, navigation, and CTAs.
- Trajan Pro is for elegant serif accents.
- Roboto is the primary body typeface; Helvetica (CSS family `"Helvetica Brand"`)
  is the clean neutral alternate for UI and body text.
- "Ani Lazy Day" (CSS family `"Carisma Script"`, utility class `.font-script`) is
  a decorative script reserved for large decorative accents only — never body or
  small text.
- Font files live in `public/fonts/`.

---

## Logo

Three variations live in `public/logos/`:

| File | Description | Best For |
|---|---|---|
| `carisma-round.png` | Round rose emblem in a ring | Favicon / compact / avatar |
| `carisma-wordmark.svg` | Horizontal wordmark | **Primary logo**, scalable — header / large |
| `carisma-logo.pdf` | Print / vector master | Print |

**Guidance:**
- All variations are valid — pick by context and size.
- Use the **wordmark** for the header and large placements.
- Use the **round emblem** for tight or square placements.
- Use the **PDF** master for print.
- Always maintain clear space around the logo, and **never distort** it.

# Web Redesign Protocol

Used by web-redesign-page, web-redesign-app, and web-design-review fix mode.

## 1. Audit (before any edit)

Collect, per page in scope:
- **Tokens as-built:** where colors/type/spacing live (CSS variables, Tailwind theme,
  inline styles). Count distinct hex values, font sizes, radii, shadows, breakpoints.
- **Dial reading:** EXPRESSION / MOTION / DENSITY as the page currently reads.
- **Place in the IA:** URL, nav position, inbound links, anchors.
- **Signature interactions:** anything users have learned (shortcuts, drag, gestures,
  a distinctive hero). Keep by default.
- **Accessibility wins:** working focus styles, labels, landmarks, skip link. Never regress.
- **Responsive as-built:** screenshot or reason about 360 / 768 / 1440.
- **Hooks:** `id`s, `data-testid`, analytics attributes, form `name`s.

## 2. Mode

- **Preserve:** same visual language, cleaned up (tokens, states, spacing, a11y).
- **Overhaul:** new visual language on the same content and IA.
Ask once if the brief doesn't say.

## 3. Never change silently

URLs and routes · externally linked anchors · nav order · design token NAMES ·
form field `name`s, types, and validation semantics · `id` / `data-testid` / analytics
hooks · keyboard shortcuts · page `<title>`, meta, headings text (SEO) · learned
signature interactions. Any of these changing = an explicit, approved line item.

## 4. Modernization levers (apply in this order)

1. **Type + spacing** - one type scale, one spacing scale, consistent gutters, measure.
2. **Color onto tokens** - raw hex → semantic tokens; one accent; contrast fixed; dark mode if in scope.
3. **Semantics + accessibility** - landmarks, heading order, labels, buttons vs links, focus-visible, keyboard paths, alt text.
4. **Responsive layout** - breakpoint plan, no horizontal scroll, tables and nav strategies.
5. **States + feedback/motion** - hover/focus/active/disabled/loading, empty/error/skeleton, purposeful motion, reduced motion.
6. **Recomposition** - reorder/regroup sections, replace card grids and template patterns, the one signature element.

Earlier levers are cheaper and lower risk; never jump to recomposition while lever 1-3
findings are open on the same page.

## 5. Fix loop

For each finding, highest impact first:
1. State the finding ID and the planned change in one line.
2. Make the smallest change that closes it.
3. If in git: one atomic commit `style(design): FINDING-NNN <summary>`. If not in git,
   keep a running change log in the close-out report (file, lines, finding).
4. Before/after screenshot pair when a browser is reachable (mobile + desktop for layout changes).
5. Re-check the finding (re-run its grep or re-inspect); mark `fixed` only when verified.

## 6. Risk governor

Running risk score, starts at 0%:
- +2% per fix touching only page-local markup/styles
- +5% per file touched that other pages also use (shared component, global CSS)
- +5% per fix that changes layout at any breakpoint not screenshotted
- +10% per fix touching JS behavior (event handlers, state, routing)
- +15% per never-change-silently item touched (only with approval)

**Stop at > 20%** for page-scope runs, or at the hard cap (20 fixes page / 40 fixes
site). Stopping is a success state: report fixed, remaining, the risk math, and the next
recommended run. Also stop immediately if a fix breaks something that was working.

## 7. Close-out

- Findings closed vs remaining (by ID)
- Before/after pairs
- Change log (or commit list)
- What was explicitly NOT changed
- Refreshed `design-baseline.json` and `WEB-DESIGN.md` with deltas noted
- Unverified checks, named

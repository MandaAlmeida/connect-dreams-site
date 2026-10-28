---
name: web-design-system
description: Propose and generate a web app's or site's design system - semantic color tokens (light + dark), fluid type scale, spacing/radius/elevation scales, breakpoints, focus and motion posture - as a SAFE/RISK proposal, then write the actual token files (CSS custom properties, Tailwind theme, or both) and WEB-DESIGN.md. Use when starting a site's visual identity, when asked for a theme/palette/design tokens, or when a codebase has inline styles and hardcoded hex values and needs a token system. For building pages with the system use web-taste; for auditing an existing site use web-design-review.
---

# web-design-system: Tokens, Theme, and the SAFE/RISK Proposal

One coherent system, proposed honestly, then written as real files. No pages.

## Flow

### 1. Stack sniff + Site Read essentials
Read `package.json` / tailwind config / global CSS / existing `:root` variables /
`WEB-DESIGN.md`. Detect the styling system (Tailwind v3 config, Tailwind v4 `@theme`,
CSS Modules, vanilla CSS, CSS-in-JS, plain single HTML file) - the output format follows
it. Establish site kind, audience, device priority, posture, and dials (one line each;
inherit from WEB-DESIGN.md when present). Apply the category bias table
(web-taste SKILL.md 1.A2).

### 2. The SAFE/RISK proposal
Propose the ENTIRE system as one package, split explicitly:

**SAFE CHOICES** - the category baseline the user expects: a readable text face, a
restrained neutral ramp, conventional radii, accessible focus rings. Say plainly that
these are safe and why safe is right here (or isn't).

**RISKS (at least 2, at most 4)** - deliberate departures, each with:
```
RISK: <the move>            e.g. "serif display face on a SaaS dashboard"
gain: <what it buys>        "editorial calm, instantly distinct from competitors"
cost: <what it costs>       "needs a second family; tight headings need tuning"
```
A proposal with zero risks is a template; a proposal that is all risks is a costume.

**Coherence validation** - if two choices fight (dense cockpit density + playful rounded
type; app-shell posture + scroll-driven art direction), flag it in one sentence and
propose the resolution. Flag, never silently "fix".

The proposal covers:
- **Palette** as semantic tokens - `--bg`, `--surface`, `--surface-2`, `--text`,
  `--text-muted`, `--border`, `--accent`, `--accent-contrast`, `--focus`,
  `--success`, `--warning`, `--danger` - light AND dark values, each text/background
  pair with its contrast ratio (>= 4.5:1 text, >= 3:1 UI).
- **Type** - families + fallback stacks, fluid scale (`clamp()`) from caption to display,
  weights, line-heights, `font-variant-numeric` policy for data.
- **Spacing scale** (4/8 base), **page gutters**, **content widths** (prose ch, app max).
- **Breakpoints** (content-driven, 3-4 max) and container-query policy.
- **Radius scale + shape lock**, **elevation tokens** (2-3 shadows), **border widths**.
- **Focus style** (`:focus-visible` ring token), **motion tokens** (durations, easings,
  reduced-motion policy), **z-index scale**.
- **Icon family + size/stroke**, and the **signature element** budget.

Hard rules inherited from web-taste 6.2: one accent; one gray family; no indigo
pipeline; saturation < 80% default; both modes if dark mode is in scope; contrast
verified, not assumed.

### 3. Preview (optional, offer once)
Offer a self-contained HTML specimen - one file, no external requests except declared
fonts: palette swatches with contrast ratios (light/dark toggle), the type scale in the
real fonts, spacing and radius samples, buttons/inputs/cards in every state (hover,
focus-visible, disabled). Open it locally.

### 4. Write the real files
Per the sniffed stack:
- **Vanilla CSS / single HTML file:** `tokens.css` (or a `:root` block at the top of the
  existing stylesheet) with light values, `@media (prefers-color-scheme: dark)` and
  `[data-theme="dark"]` overrides, and `color-scheme`.
- **Tailwind v4:** `@theme` block mapping to the CSS variables, dark variant wiring.
- **Tailwind v3:** `tailwind.config` `theme.extend` referencing `var(--token)` + the
  `tokens.css` file; `darkMode` set to match the toggle strategy.
- **CSS-in-JS / TS:** typed `tokens.ts` that emits the same CSS variables.
- **Existing token file present:** EXTEND it; renaming existing token names is on the
  never-change-silently list (`../_web-shared/references/redesign-protocol.md`).

### 5. Persist to WEB-DESIGN.md
Write (or refresh, with a delta report) the `## Design System` section: the approved
proposal, the RISK register, contrast table, and where the token files live.

## Rules that bind this skill

* Propose once, coherently - not a menu of five palettes. One system with named risks
  beats a mood board.
* Every value in the written files traces to the approved proposal. No stowaway tokens.
* If the user rejects a RISK, replace it with the SAFE version and note the swap in
  WEB-DESIGN.md; do not quietly keep it.
* Do not refactor pages to use the tokens here - that is web-redesign-page /
  web-redesign-app work. This skill writes the system.

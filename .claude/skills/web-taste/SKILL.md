---
name: web-taste
description: Anti-slop design skill for BUILDING web apps and sites (React/Next.js, Vue, Svelte, Astro, or plain HTML/CSS/JS). Commits to a Site Read and Nav Read before writing code; ships pages, navigation, responsive layout, and motion that do not look AI-generated. Use when creating new pages, features, components, or whole web apps. For auditing an existing site use web-design-review; for upgrading existing pages use web-redesign-page or web-redesign-app; for navigation/IA planning alone use web-nav-plan; for tokens/theming use web-design-system.
---

# web-taste: Anti-Slop Web Skill

> Web apps and sites: pages, navigation, components, responsive layout, motion. Not
> native mobile apps (use mobile-taste), not games, not canvas/WebGL-as-the-app.
> Every rule below is **contextual**. None of it fires automatically. Read the brief,
> then pull only what fits.

**Sibling skills** (this suite splits by task): `web-design-review` (audit an existing
site), `web-redesign-page` / `web-redesign-app` (upgrade existing UI), `web-nav-plan`
(navigation / information architecture alone), `web-design-system` (tokens + theme).
This skill BUILDS.

Deeper references, load on demand:
- `../_web-shared/references/navigation.md` - IA decision tree, routing conventions, worked Nav Reads
- `../_web-shared/references/skeletons.md` - canonical code for the patterns LLMs botch (dialogs, menus, sticky headers, skeletons, forms)
- `../_web-shared/references/tells.md` - the full slop-tell catalog (append-only) + runnable grep checklist
- `../_web-shared/references/redesign-protocol.md` - audit, levers, fix loop, risk governor
- `../_web-shared/references/review-rubric.md` - findings format, ten categories, scoring

---

## 0. THE SITE READ (Read the Room Before Anything Else)

Before touching code, **infer what the user actually wants**. Most LLM web output is bad
because the model jumps to a default template (indigo gradient hero, three feature cards,
centered everything) instead of reading the room.

### 0.0 Stack sniff (before the read, in an existing project)
Read `package.json`, framework config (`next.config`, `vite.config`, `astro.config`,
`nuxt.config`, `svelte.config`), tailwind/theme config, global CSS, and whether
`WEB-DESIGN.md` exists (0.E) - if it does, read it and treat its commitments as
standing. Detect: framework + router, styling (Tailwind vs CSS Modules vs vanilla CSS vs
CSS-in-JS), component library (shadcn/ui, Radix, MUI, Chakra, none), icon family,
existing tokens (CSS custom properties, Tailwind theme). **No `package.json` and a single
`.html` file is a stack too** - plain HTML/CSS/JS, keep it that way unless asked. The
detected stack wins over every default in this skill.

### 0.A Read these signals first
1. **Site kind** - marketing/landing, SaaS app/dashboard, e-commerce, content/editorial,
   portfolio, community/social, internal tool, docs.
2. **Vibe words** - "clean", "playful", "premium", "editorial", "like Linear", "dense",
   "calm", "brandy".
3. **Reference sites** the user named. Real sites are the design language.
4. **Audience & context of use** - desk with mouse and keyboard vs. phone in a queue vs.
   a wall-mounted screen. Context picks density, target sizes, and breakpoint priority.
5. **Device priority** - mobile-first, desktop-first, or both first-class.
6. **Quiet constraints** - accessibility-first users, regulated (fintech/health
   disclosures), SEO-critical, low-bandwidth audience, i18n/RTL, no-JS requirement.

### 0.B Output the Site Read before generating
```
SITE READ: <site kind> for <audience>, <vibe> language, leaning <design language / stack>.
devices: mobile first-class · desktop first-class · tablet best-effort
posture: content-site | app-shell | hybrid
```
Example: *"SITE READ: booking SaaS dashboard for small studio owners, calm dense
language, leaning Next.js + Tailwind + shadcn/ui. devices: desktop first-class, mobile
first-class for the bookings view only. posture: app-shell."*

**Posture** is a commitment: `content-site` means document semantics, scrollable pages,
SEO, links everywhere; `app-shell` means persistent nav chrome, client state, URL-driven
views; `hybrid` declares which routes are which.

### 0.C If the brief is ambiguous, ask ONE question, do not guess
Only when the read genuinely diverges (e.g. *"Should this feel like a quiet tool like
Linear, or a branded experience like Duolingo's site?"*). If you can infer confidently,
declare the read and proceed.

### 0.D Anti-Default Discipline
Do not default to: indigo/violet gradients, hero with centered headline + two buttons +
floating dashboard screenshot, three icon-feature cards, glassmorphism everywhere, emoji
as icons, "Trusted by" logo strip of fake logos, every section `py-24 text-center`.
These are the LLM defaults. Reach past them deliberately.

### 0.E WEB-DESIGN.md (the durable artifact)
The Site Read, Nav Read, dial values, and design tokens are commitments, not chat
ephemera. Once settled, write them to `WEB-DESIGN.md` at the project root and treat it
as the design source of truth: later sessions read it before any UI decision; a re-run
REFRESHES it and reports what changed. Pages 3, 4, and 5 drifting into a different site
is what this file prevents. (`web-design-system` writes the token sections; this skill
writes the reads and dials.)

---

## 1. THE THREE DIALS

* **`DESIGN_EXPRESSION: 5`** - 1 = plain browser-native / system UI, 10 = fully art-directed
* **`MOTION_INTENSITY: 4`** - 1 = no motion beyond hover/focus, 10 = scroll-driven choreography
* **`VISUAL_DENSITY: 5`** - 1 = airy editorial, 10 = pro-tool cockpit

**Baseline `5 / 4 / 5`.** Marketing pages sit higher on expression; app screens sit
lower. A hybrid site sets dials per posture (e.g. marketing `7/5/3`, app `4/3/6`).

### 1.A Dial inference
| Signal | EXPRESSION | MOTION | DENSITY |
|---|---|---|---|
| "clean / minimal / like Linear, Vercel" | 3-5 | 3-4 | 4-6 |
| "utility / internal tool / just works" | 2-4 | 2-3 | 6-8 |
| "landing page / launch / marketing" | 6-8 | 5-7 | 2-4 |
| "brandy / playful / kids" | 7-9 | 6-8 | 2-4 |
| "premium / luxury / fashion commerce" | 7-9 | 4-6 | 2-3 |
| "editorial / magazine / blog" | 5-8 | 2-4 | 3-5 |
| "dashboard / analytics / admin / trading" | 3-5 | 2-3 | 7-9 |

### 1.A2 Category bias (per site kind: prefer / avoid)
| Site kind | Prefer | Avoid |
|---|---|---|
| SaaS app / dashboard | density over decoration, keyboard shortcuts, tables that sort and filter, URL-persisted filters | stat-card rows with fake +12% deltas, chart-for-every-number, onboarding tours |
| Marketing / landing | one clear claim, real product shown, specific proof, one primary CTA | three-feature-card grid, fake logo strip, "Unlock the power of" |
| E-commerce | product photography breathing room, sticky clear price + add-to-cart, honest urgency only | countdown timers, badge confetti, popups on load |
| Editorial / docs | measure 60-75ch, real type hierarchy, fast loads, anchor links | cards around every paragraph, sidebar ads, scroll-jacking |
| Fintech | tabular figures, explicit states for money-moving actions, trust neutrals | gradient balance cards, playful mascots |
| Portfolio | the work IS the UI, generous imagery, one signature interaction | skill bars, "Hi, I'm John 👋" hero, generic dev-portfolio template |

### 1.B DESIGN_EXPRESSION bands
* **1-3 Browser-native:** system font stack, native form controls (lightly styled),
  `<details>`, `<dialog>`, minimal color.
* **4-7 Branded:** custom tokens and type, custom components built on accessible
  primitives (Radix / native elements); navigation patterns stay conventional.
* **8-10 Art-directed:** custom layouts, editorial grids, brand fonts, signature motion.
  You now own every focus state, keyboard path, and responsive breakpoint the
  conventional patterns were giving you for free.

### 1.C CHROME LAGS CONTENT (mandatory)
Navigation chrome (header, sidebar, menus, footer) stays conventional until
`DESIGN_EXPRESSION >= 8`. A custom-painted nav with no keyboard support, no focus ring,
and a broken mobile menu is the most common failure of "expressive" AI sites. Brand the
content first; earn the chrome.

### 1.D The signature element
Each page gets AT MOST one bold move - a distinctive hero treatment, one signature
interaction, one expressive component. Everything else stays quiet. A page where
everything is expressive reads as noise.

### 1.E Hard floors (dials never override these)
* Pointer targets >= 24x24 CSS px (WCAG 2.5.8), >= 44x44 on touch-primary layouts.
* Text contrast >= 4.5:1 (3:1 for large text and UI boundaries).
* Visible focus on every interactive element (`:focus-visible`).
* `prefers-reduced-motion` honored above `MOTION_INTENSITY: 3`.
* Every page works by keyboard alone.

---

## 2. BRIEF → STACK MAP

Check the existing project FIRST - an existing stack wins over every default below.

| Brief reads as… | Reach for | Why |
|---|---|---|
| Web app / SaaS (default) | Next.js (App Router) or Vite + React, Tailwind, shadcn/ui on Radix | owned accessible components, token-driven styling |
| Content / marketing / docs | Astro (or Next.js static), Tailwind or vanilla CSS | ships HTML, little JS, great LCP |
| Single file / prototype / no build | Plain HTML + CSS custom properties + vanilla JS | zero tooling, opens anywhere |
| Vue / Svelte shop | Nuxt / SvelteKit + their native component ecosystems | match the team |
| Material / enterprise | MUI or the org's design system | consistency over taste |

**Honesty rules:**
* Before importing ANY 3rd-party library, check `package.json`. If missing, output the
  install command before the code. In a plain-HTML project, a CDN script with an exact
  pinned version, or nothing.
* One component system per app. Do not mix MUI with shadcn in the same tree.
* One icon family per app (Lucide, Phosphor, Heroicons, Material Symbols - pick one).
* If you approximate a pattern without a primitive (custom combobox, custom menu), label
  it in a comment and implement the WAI-ARIA APG keyboard model.

---

## 3. DEFAULT ARCHITECTURE & CONVENTIONS

* **Semantics first:** `<header> <nav> <main> <footer>`, one `<h1>` per page, heading
  levels in order. Links (`<a href>`) navigate; buttons (`<button>`) act. A `div` with
  `onClick` is a bug.
* **Styling:** tokens as CSS custom properties (exposed through Tailwind theme when
  Tailwind is used). **Zero raw hex in component/page files** - tokens only.
* **Layout:** CSS Grid for 2-D page layout, Flexbox for 1-D alignment, `gap` over margin
  chains. Container queries for components that live in different widths.
* **Responsive:** mobile-first media queries; content-driven breakpoints. Fluid type and
  spacing via `clamp()` where it helps. Never `width: 1200px` on a page wrapper -
  `max-width` + `margin-inline: auto`.
* **Images:** `width`/`height` (or `aspect-ratio`) always set, `loading="lazy"` below the
  fold, `srcset`/`sizes` or the framework image component, meaningful `alt` (empty
  `alt=""` for decorative).
* **Icons:** ONE family, inline SVG or the family's component, consistent size and stroke.
  **Never emoji as icons. Never hand-drawn SVG icon paths.**
* **Fonts:** see 6.1. Self-host or framework font loader, `font-display: swap`, preload
  the one critical weight.
* **Forms:** native inputs with `<label for>`, correct `type`, `autocomplete`,
  `inputmode`; validation messages linked with `aria-describedby`.
* **State in the URL:** tabs, filters, search, pagination, selected item - if a user
  would share it or hit Back to it, it lives in the URL.

---

## 4. NAVIGATION ARCHITECTURE

Navigation is designed BEFORE pages. Full decision tree and worked examples:
`../_web-shared/references/navigation.md`. The non-negotiables live here.

### 4.A The Nav Read (emit before any code)
```
NAV READ
devices: desktop + mobile first-class
primary nav (5): Bookings · Clients · Calendar · Reports · Settings(→ avatar menu)
pattern: desktop left sidebar (collapsible) · mobile bottom bar (4) + "More" sheet
routes:
  /                     marketing home (content-site)
  /login /signup        auth group, no app chrome
  /app                  → redirect /app/bookings
  /app/bookings         list  → /app/bookings/[id] (page, not modal)
  /app/bookings/new     dialog over list; also reachable as full page by URL
  /app/clients          list  → /app/clients/[id]
  /app/settings/*       nested, secondary tabs as routes
overlays: booking-filters (popover), delete-confirm (alertdialog)   ("overlays: none" if none)
url state: ?status=&date=&q= on lists
entry points: settings ← avatar menu · new booking ← primary button in list header
back behavior: every view reachable by Back; dialogs close on Back only if they own a URL
max clicks to any core view: 2
```

### 4.B Container decision tree (evaluate in order)
1. Top-level destination users return to repeatedly, peer of others? → **Primary nav item**.
2. Drill-down with a clear parent (list → detail)? → **Own route (page)**, with breadcrumb
   or back link when depth >= 2.
3. Peer views of the same object (Overview / Activity / Settings)? → **Tabs as routes**
   (`/project/1/activity`), not client-only tabs.
4. Self-contained create/edit task that returns when done? → **Dialog** (or side panel /
   sheet for wide forms), with a full-page fallback route if it is deep-linkable.
5. Lightweight choice, preview, or action menu anchored to a control? → **Popover / menu**.
6. Blocking confirmation of a destructive action? → **Alert dialog**.

### 4.C Navigation hard rules
* **Primary nav: 3-7 items.** More → group, or your IA is wrong.
* **The current location is always visible** (`aria-current="page"` + visual state).
* **Hamburger only below the breakpoint where nav genuinely doesn't fit.** Never a
  hamburger on desktop hiding 4 items that fit.
* **No nested sidebars, no double headers, no tabs inside tabs.**
* **Back button works.** Every distinct view is a URL; no client state that Back destroys.
* **Every dialog** has a visible close button, closes on Escape, traps focus, and returns
  focus to its trigger.
* **Links open in the same tab** unless leaving the product (and then say so).
* **Every detail view is deep-linkable** and lands with sane surrounding chrome.
* A page that opens more than 2 distinct dialogs/drawers is hiding IA in overlays.
* **Skip link** ("Skip to content") on every page with nav before `<main>`.

---

## 5. PAGE ANATOMY & LAYOUT DISCIPLINE

* **Content width:** prose 60-75ch; app content max-width per layout (e.g. 1280px) or
  full-bleed tables by intent. A phone layout stretched to 1440px is broken; a desktop
  table squeezed to 360px without a plan is broken.
* **Breakpoint plan:** declare it (e.g. 640 / 1024 / 1280) and test each: 360, 768, 1024,
  1440. No horizontal page scroll at any width.
* **Page gutters:** 16px mobile, 24-32px desktop - pick once, lock it.
* **Spacing scale:** 4/8 base (4, 8, 12, 16, 24, 32, 48, 64, 96). Section rhythm varies
  with content; identical `py-24` on every section is a tell.
* **Header ownership:** one page title. Do not repeat the nav label as a giant H1 and
  again as a card title.
* **Vertical composition:** content is top-aligned. Centering vertically is for empty
  states, auth, and error pages.
* **Sticky elements:** at most one sticky header + one sticky action bar. Account for
  them with `scroll-margin-top` on anchors.
* **Tables:** real `<table>` for tabular data, sticky header row, right-aligned numbers
  with `font-variant-numeric: tabular-nums`, a mobile strategy (scroll container with
  visible affordance, or row → card collapse).
* **Forms:** label above input, single column, error text below input, submit at the
  end and never disabled without saying why.

---

## 6. DESIGN ENGINEERING DIRECTIVES (Bias Correction)

### 6.1 Typography
* **The convergence trap:** Inter, Poppins, Space Grotesk, and generic geometric sans
  are the AI defaults. They are not banned, but they must be chosen, not defaulted.
  A system stack (`system-ui, ...`) is a respectable choice for apps.
* Max 2 families (display + text), or 1 with weights. Variable fonts preferred.
* **Type scale from tokens** (`--text-sm` ... `--text-4xl`), fluid at display sizes.
  Opening every section with a 48px bold headline + gray 18px subtitle is a template tell.
* `line-height` ~1.5 body, ~1.1-1.2 display; `text-wrap: balance` on headings,
  `text-wrap: pretty` on paragraphs.
* Respect user font size: `rem` for type, never `px` on `html`.

### 6.2 Color Calibration
* Max 1 accent, saturation < 80% default. One neutral ramp (never warm and cool grays
  together).
* **THE INDIGO PIPELINE BAN:** `#6366F1` / `#8B5CF6` / `#7C3AED` (Tailwind indigo/violet
  500-600) + gradient hero/CTA is THE AI-web signature. Banned as default; allowed only
  when the brand is genuinely purple, executed with intent.
* **Gradients: max 1 per page**, with a compositional reason. Gradient text: max 1 per site.
* **Dark mode** via semantic tokens + `prefers-color-scheme`, with a manual override
  (`[data-theme]`) if there is a toggle. Set `color-scheme` so native controls follow.
* No pure `#000` text on white; no pure `#fff` text on pure black for long reading.
* **Color Consistency Lock:** one accent, used identically everywhere.

### 6.3 Surfaces, Elevation, Cards
* **Cards are not the only grouping tool.** Group with whitespace, rules, and alignment.
  A card = a discrete, often clickable, self-contained object. A page that is a gray
  background with a grid of white rounded-2xl shadow-lg cards is the #1 AI layout.
* 2-3 elevation tokens defined once. Shadows subtle and consistent in direction.
* **Shape Consistency Lock:** one radius scale applied by role.
* **Glassmorphism / backdrop-blur** only over imagery or real layered content.
* A clickable card is one link (the whole card) with one accessible name, not five
  nested links.

### 6.4 Interactive States (full cycle, mandatory)
* **Every control:** default, hover, `:focus-visible`, active, disabled, loading.
  Hover is progressive enhancement - nothing may require it.
* **Data views:** skeleton that mirrors the layout (no CLS when data arrives), empty
  state with the action that populates it, error with retry, partial/stale state.
* **Mutations:** optimistic or pending state on the button; success = state change +
  optional toast; error = inline near the cause. `alert()` / `confirm()` are banned -
  use an alert dialog for destructive confirmation.
* **Offline / slow network:** declare in the Site Read if relevant; otherwise "N/A".
* Toasts use `role="status"` (polite) and never carry the only copy of an error.

### 6.5 Permission & Interruption Priming
Never request a browser permission on page load. Prime at the moment of intent:
| Permission / interruption | Ask when |
|---|---|
| Notifications | after the first value moment, behind an in-page explanation |
| Geolocation | when the user clicks a location feature |
| Camera / mic | when the user starts capture |
| Newsletter / signup popup | never on load; inline or exit-intent at most, dismissible |
| Cookie banner | required by law only, non-blocking, reject as easy as accept |

### 6.6 Copy & Content
* **Em-dash (`—`) banned** in visible strings. Hyphen or restructure.
* No "John Doe" / "Acme" / `99.99%` uptime / round fake metrics; realistic messy data.
* No filler verbs: "Elevate", "Seamless", "Unleash", "Supercharge", "Unlock the power".
* No "Welcome back, John! 👋" unless personalization IS the product.
* Button labels are verbs that describe the outcome ("Save booking", not "Submit").
* **Copy self-audit before ship:** re-read every visible string.

---

## 7. MOTION

Canonical code: `../_web-shared/references/skeletons.md`.

* **The web motion hierarchy:** (1) hover/focus/press feedback on every control;
  (2) state transitions - open/close of menus, dialogs, accordions; (3) list
  insert/remove/reorder; (4) page/route transitions (View Transitions API where
  supported); (5) scroll-linked effects. Ship in that order.
* **Motion must be motivated** - one sentence of justification or drop it.
* Animate `transform` and `opacity` only. Durations 120-250ms for UI, ease-out to enter,
  ease-in to exit. No `transition: all`.
* **No scroll-jacking.** Native scroll speed and direction are sacred.
* Fade-up-on-scroll for every section is a tell; reveal at most once, and never hide
  content until JS runs (no `opacity:0` without a no-JS fallback).
* **Reduced motion:** `@media (prefers-reduced-motion: reduce)` collapses decorative
  motion to instant; functional transitions become fades.

---

## 8. PERFORMANCE GUARDRAILS

* **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1 targets.
* LCP image: not lazy, `fetchpriority="high"`, correctly sized.
* Reserve space for everything that loads late (images, ads, embeds, fonts) - CLS is a
  design bug.
* Ship less JS: server-render content; hydrate only interactive islands where the stack
  allows.
* Virtualize lists > ~200 rows; debounce search inputs; never re-render a page per
  keystroke of a distant input.
* Fonts: subset, `woff2`, `font-display: swap`, matched fallback metrics.
* No layout-thrashing scroll handlers - `IntersectionObserver` or CSS scroll-driven
  animations.

---

## 9. PLATFORM CONVENTIONS (the browser is the platform)

* Keyboard: Tab order follows visual order; Enter/Space activate; Escape closes; arrow
  keys inside menus, tabs, listboxes, grids (WAI-ARIA APG).
* Respect native behaviors: text selection, right-click/middle-click to open links in a
  new tab, Cmd/Ctrl+F, browser zoom to 200%, autofill, password managers.
* Touch: no hover-only menus; `:hover` styles wrapped in `@media (hover: hover)` where
  they would stick on touch.
* `<meta name="viewport" content="width=device-width, initial-scale=1">` - never
  `maximum-scale=1` / `user-scalable=no`.
* `<title>` and meta description per page; Open Graph image for shareable pages.
* Respect `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`.

---

## 10. WEB AI TELLS (Forbidden Patterns)

**Full catalog + grep checklist: `../_web-shared/references/tells.md`.** The ten most
recognizable, always in force:

1. **THE INDIGO PIPELINE** - indigo/violet + gradient hero and CTAs (6.2).
2. **THE THREE-CARD FEATURE GRID** - three icon-chip cards with title + two lines.
3. **THE CARD-GRID PAGE** - every section a grid of white rounded shadowed cards (6.3).
4. **THE ICON CHIP** - 40x40 tinted rounded square with a colored icon leading every item.
5. **THE CENTERED EVERYTHING** - every section `text-center`, `max-w-2xl mx-auto`, `py-24`.
6. **THE EMOJI ICON** - 🚀✨📊 in headings, buttons, nav.
7. **THE FAKE PROOF** - logo strip of placeholder brands, "10,000+ happy customers",
   5-star testimonials from "Sarah J., CEO".
8. **THE DIV BUTTON** - `<div onClick>` / `<a>` without `href` acting as button.
9. **THE GLASS EVERYTHING** - `backdrop-blur` on cards that sit over flat color.
10. **THE FADE-UP EVERYTHING** - every section animates in on scroll.

---

## 11. REDESIGNING EXISTING SITES

Do not freelance redesign from here:
* **One page / one flow** → `web-redesign-page`.
* **Whole site/app** → `web-redesign-app` (the only skill allowed to propose IA / URL
  restructuring).
* **Audit without changes** → `web-design-review`.

The rule that also binds THIS skill when touching existing code: **never change
silently** - URLs/routes, nav order, token names, form field names/semantics,
analytics/test hooks (`id`, `data-testid`), keyboard shortcuts.

---

## 12. OUT OF SCOPE

* Native iOS/Android apps → mobile-taste.
* Games, 3D, canvas-as-the-app.
* Email templates (different rendering rules), browser extensions' native chrome.
* Backend, infra, deployment.

If the brief is one of these, say so and point at the right tool.

---

## 13. FINAL PRE-FLIGHT CHECK

### 13.A Grep-mechanical (ready-made block at the end of `../_web-shared/references/tells.md`)
- [ ] Zero em-dashes in visible strings
- [ ] Zero emoji in UI text (unless brief is explicitly playful - then sparse)
- [ ] Zero `#6366F1|#7C3AED|#8B5CF6|indigo-500|violet-500|purple-600` by default; gradient count <= 1 per page
- [ ] Zero raw hex outside the token file
- [ ] Zero `<div onClick` / `<span onClick`; zero `<a>` without `href`
- [ ] Zero `outline: none` / `outline-none` without a `:focus-visible` replacement
- [ ] Zero `transition: all`; zero `alert(` / `confirm(`
- [ ] Zero `user-scalable=no` / `maximum-scale=1`
- [ ] Every `<img>` has `alt` and dimensions; every input has a label + `autocomplete` where applicable

### 13.B Design-mechanical
- [ ] Site Read + Nav Read emitted, dials explicit and reasoned
- [ ] Primary nav 3-7; current location indicated; skip link present
- [ ] Every view is a URL; Back works; filters/tabs in the URL
- [ ] Dialogs: close button, Escape, focus trap, focus return
- [ ] Chrome lags content unless EXPRESSION >= 8
- [ ] One icon family; one accent; one radius scale; one gray ramp; one font plan
- [ ] Gutters and spacing scale constant
- [ ] Full state cycle on every control and data view
- [ ] No permission request or popup on load
- [ ] Dark mode tokens complete (if dark mode is in scope); both modes reviewed
- [ ] Copy self-audit done
- [ ] Reduced-motion styles present when motion exists

### 13.C Requires a browser (be honest)
- [ ] Responsive at 360 / 768 / 1024 / 1440, no horizontal scroll
- [ ] Keyboard-only walkthrough of the core flow
- [ ] Zoom 200% without loss of content
- [ ] Contrast checked in both themes
- [ ] Lighthouse / CWV on the heaviest page (LCP, CLS)

**If no browser tool is available, say exactly which 13.C checks were NOT verified.**
Claiming an unverified check is a worse failure than an unticked box.

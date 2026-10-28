# Web Navigation & Information Architecture

Used by web-taste (Section 4), web-nav-plan, web-redesign-app (IA audit).

## §1 The Nav Read (canonical format)

```
NAV READ
devices: <which are first-class>
primary nav (N): <Item> · <Item> · ...
pattern: <desktop pattern> · <mobile pattern>
routes:
  <url>                 <what it is> (<container>) → <drill-downs>
overlays: <name> (<dialog|drawer|popover|menu|alertdialog>), ...   or "overlays: none"
url state: <query params / path segments that hold view state>
entry points: <secondary destination> ← <where it is reached from>
back behavior: <rules, exceptions>
max clicks to any core view: <n>
```
Every line is mandatory. "none" is a valid value; omission is not.

## §2 Container decision tree (first match wins)

1. **Primary nav item** - top-level destination, visited repeatedly, peer of others,
   independent state.
2. **Page (own URL)** - drill-down with a clear parent (list → detail, docs section →
   article). Breadcrumb or back link at depth >= 2.
3. **Tabs as routes** - peer views of one object. Each tab is a path segment or query
   param so it survives refresh and Back. Client-only tabs are allowed only for trivial,
   non-shareable toggles (e.g. "code / preview" in one card).
4. **Dialog / drawer / side panel** - self-contained create/edit task that returns to the
   same context. If users will link to it, give it a URL (intercepting/parallel routes in
   Next.js, `?modal=` param, or a full-page fallback).
5. **Popover / menu** - lightweight choice, filter, or action list anchored to a trigger.
   No internal navigation. The moment it needs a back stack, it is a dialog or a page.
6. **Alert dialog** - blocking confirmation of a destructive or irreversible action.

Not on the tree: **toasts** (feedback, never navigation), **accordions** (progressive
disclosure inside a page, never a substitute for pages).

## §3 Responsive nav patterns

| Situation | Desktop | Mobile |
|---|---|---|
| Content site, <= 5 items | top bar, inline links | top bar + menu button opening a full-width panel |
| App, 4-7 sections | left sidebar (collapsible to icons + tooltips) | bottom bar (<= 5) or top bar + drawer |
| App, many sections / admin | grouped sidebar with section headings | drawer with the same grouping |
| Docs | left tree + right "on this page" | menu button → tree; "on this page" collapses into a `<details>` |
| Marketing + app hybrid | marketing top bar on content routes; app shell under `/app` | same split |

Rules: the mobile menu button has `aria-expanded` and `aria-controls`; the open panel
traps focus only if it is modal; Escape closes it; the current page is marked
`aria-current="page"`.

## §4 Mechanical checks (self-check list)

- [ ] Primary nav 3-7 items; labels are nouns the user would say, one or two words
- [ ] No "Home" item when the logo already links home (pick one)
- [ ] Settings / account / logout live behind an avatar or account menu, not primary nav
- [ ] Every view that a user would bookmark, share, or return to with Back has a URL
- [ ] Filters, sort, search query, pagination, active tab in the URL
- [ ] Every dialog: close button, Escape, focus trap, focus return; destructive confirm is an alertdialog
- [ ] No overlay opens another overlay (except a menu inside a dialog)
- [ ] No page opens more than 2 distinct dialogs/drawers
- [ ] Auth pages render without app chrome; logged-out access to an app URL redirects to login and returns to the original URL after login
- [ ] 404 page with a way back; empty route parents redirect to a sensible child
- [ ] Skip link on every page with nav before main
- [ ] Hamburger appears only below the breakpoint where nav does not fit
- [ ] Max clicks to any core view <= 3 (2 for daily-use apps)
- [ ] Renamed/moved public URLs have 301 redirects in the plan

## §5 Routing conventions by stack

- **Next.js App Router:** route groups `(marketing)`, `(app)`, `(auth)` with separate
  `layout.tsx`; dynamic `[id]`; modals via intercepting routes `(.)` + parallel `@modal`
  slot with a full-page fallback; `searchParams` for URL state.
- **Astro / static:** one file per page in `src/pages`; shared layout component; anchors
  for in-page sections with `scroll-margin-top`.
- **Vite + React Router / TanStack Router:** nested routes with `<Outlet>`, loaders for
  data, search params validated with a schema.
- **SvelteKit / Nuxt:** file-system routes with `+layout` / `layouts/`.
- **Single HTML file:** sections with `id`s and a nav of anchor links, or hash routes
  (`#/bookings/12`) handled by a small router; `history.pushState` only if the server
  serves the file on every path. Declare which in the Nav Read.

## §6 Worked examples

### A. Booking SaaS (app-shell)
```
NAV READ
devices: desktop first-class · mobile first-class (bookings, calendar)
primary nav (4): Bookings · Calendar · Clients · Reports
pattern: desktop left sidebar · mobile bottom bar (4)
routes:
  /login /signup              auth group, no chrome
  /app                        → redirect /app/bookings
  /app/bookings               list (page) → /app/bookings/[id] (page)
  /app/bookings/new           dialog over list; full page on direct load
  /app/calendar               page; ?view=week|month&date=
  /app/clients                list → /app/clients/[id] → tabs: /overview /history
  /app/reports                page; ?range=
  /app/settings/(profile|team|billing)   tabs as routes
overlays: booking-filters (popover), cancel-booking (alertdialog)
url state: ?status=&q=&page= on lists; calendar view/date
entry points: settings ← avatar menu · new booking ← primary button in Bookings header
back behavior: default everywhere; new-booking dialog has URL so Back closes it
max clicks to any core view: 2
```

### B. Marketing site (content-site)
```
NAV READ
devices: mobile first-class · desktop first-class
primary nav (4): Product · Pricing · Customers · Docs   + "Sign in" link, "Start free" button
pattern: desktop top bar · mobile top bar + full-width menu panel
routes:
  /               home
  /product        page → /product/[feature]
  /pricing        page; ?billing=yearly
  /customers      list → /customers/[slug]
  /docs/*         docs layout (own nav)
  /blog → /blog/[slug]   footer entry only
overlays: none
url state: pricing billing toggle
entry points: blog, careers, legal ← footer
back behavior: default
max clicks to any core view: 2
```

### C. Single-file community site
```
NAV READ
devices: mobile first-class · desktop first-class
primary nav (4): Sobre · Projetos · Agenda · Contato
pattern: top bar with anchor links · mobile menu button → panel
routes:
  index.html#sobre #projetos #agenda #contato   in-page sections
  index.html#/projeto/<slug>                      hash route, detail view
overlays: event-signup (dialog)
url state: hash
entry points: privacy ← footer
back behavior: hash changes create history entries; dialog closes on Escape, not on Back
max clicks to any core view: 1
```

---
name: web-redesign-page
description: Audit-first redesign of ONE web page or component-heavy view (or one flow of 2-3 pages) - extract its current tokens and patterns, produce rated findings, then modernize it lever by lever with atomic changes and before/after screenshots at mobile and desktop widths. Preserves URLs, nav position, form semantics, and test/analytics hooks. Use when asked to redesign, refresh, modernize, or "make nicer" a specific existing page, section, or view. For whole-site redesigns use web-redesign-app; for a report without changes use web-design-review; for brand-new pages use web-taste.
---

# web-redesign-page: One Page, Audit First

Scope: one page (or one major section of a single-page site), or one tight flow (2-3
pages sharing a job, e.g. checkout). More than that is web-redesign-app.

Method files, read in full first: `../_web-shared/references/redesign-protocol.md`
(audit, levers, fix loop, risk governor) and `../_web-shared/references/review-rubric.md`
(finding format). `../_web-shared/references/tells.md` supplies the findings vocabulary.

## Flow

1. **Stack sniff + audit** (redesign-protocol.md): the page's current tokens or inline
   styles, its dial reading, its place in the route tree, signature interactions,
   accessibility wins worth keeping, responsive behavior. Screenshot the BEFORE state at
   360 and 1440 wide if a browser is reachable.
2. **Mode.** Preserve vs overhaul - ask once if ambiguous.
3. **Findings** for this page only, rated high/medium/polish.
4. **Propose the pass.** Which levers (type/spacing → color-to-tokens → semantics/a11y →
   responsive → states/motion → recomposition), which findings each closes, what will
   NOT change. One short message; proceed on approval or if the user already said
   "just do it".
5. **Fix loop** (redesign-protocol.md): one finding per atomic change, before/after
   pair per visual change, risk governor (stop > 20%, cap 20 fixes).
6. **Close out.** Findings closed vs remaining, the before/after pairs, and - if
   `design-baseline.json` or `WEB-DESIGN.md` exist - refresh them (deltas noted).

## Hard boundaries

* **Never changes:** URL, anchors linked from elsewhere, position in the nav, form field
  `name`s and semantics, `id`/`data-testid` hooks, page `<title>`/meta, keyboard
  shortcuts. If a finding requires one of those, report it as OUT-OF-SCOPE with a
  pointer to web-redesign-app.
* **Shared components** (header, footer, button, card) change only when the change is
  invisible elsewhere or the user approves the blast radius; the risk governor's
  +5%/file makes this expensive on purpose.
* **In a single-file site**, edits stay inside the target section's markup and its
  scoped styles; global CSS changes count as shared-component changes.
* The page must still pass the web-taste Section 13 pre-flight when done - a redesigned
  page that fails pre-flight is not done.

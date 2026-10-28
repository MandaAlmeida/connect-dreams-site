---
name: web-design-review
description: Audit an existing web app or site's design - run the web AI-tells grep checklist, inspect pages against a ten-category rubric (including accessibility, responsive, and performance), Trunk Test each page, and produce impact-rated findings with a Design Score and an AI Slop Score plus a regression baseline. Report-only by default; opt-in fix mode. Use when asked to review, audit, critique, or QA a website's design or UI quality. For building new pages use web-taste; for actually redesigning use web-redesign-page or web-redesign-app.
---

# web-design-review: Audit, Score, Baseline

Report-only by default. `--fix` (or the user asking you to fix what you find) enables
the fix loop. Never both silently.

The method is `../_web-shared/references/review-rubric.md` (passes, narration, Trunk
Test, finding format, ten categories, scoring math, baseline file) and
`../_web-shared/references/tells.md` (grep checklist + tell catalog). Fix
recommendations cite `../_web-shared/references/redesign-protocol.md` (lever order) and
sections of `../web-taste/SKILL.md`. Read all four before starting.

## Flow

1. **Stack sniff.** `package.json` / framework config / theme + global CSS /
   `WEB-DESIGN.md` / `design-baseline.json`. If a baseline exists, this run is a
   REGRESSION run - deltas lead the report.
2. **Scope.** Whole site by default; a named page/flow if the user scoped it. List the
   pages (routes, `.html` files, or major sections of a single-page site) so coverage
   is explicit.
3. **Static pass** (always): the tells.md grep block, then code inspection per the ten
   rubric categories. Triage every hit.
4. **Live pass** (when reachable): a browser tool (built-in browser, Chrome extension,
   Playwright) on the dev server or the local file → user-provided screenshots, in that
   order. Per page at 360 / 768 / 1440 wide: screenshot, first-impression narration,
   Trunk Test, keyboard Tab walk, focus visibility, dark mode, 200% zoom when practical,
   Lighthouse if available. If nothing is reachable, say so and continue static-only.
5. **Findings.** review-rubric.md format: `FINDING-NNN [impact | category]`, evidence
   (file:line or screenshot), tell number when it maps, concrete fix.
6. **Scores.** Design Score + AI Slop Score per the mechanical letter math. Per-category
   letters in a table. No rounding up.
7. **Baseline.** Write/refresh `design-baseline.json`. On a regression run, the delta
   table (category changes, new, resolved) comes FIRST.
8. **Report.** Narrations, Trunk Test results, findings by impact, scores, the explicit
   unverified list ("no browser reachable: responsive, keyboard walk, zoom, contrast in
   dark mode, CWV NOT verified"), and - report-only mode - a recommended fix order (the
   lever order from redesign-protocol.md).

## Fix mode (opt-in only)

Runs the fix loop from redesign-protocol.md: one finding per atomic change (a commit
`style(design): FINDING-NNN ...` when the project is a git repo), before/after
screenshots when a live pass exists, re-check to close, **risk governor** (stop > 20%,
hard cap 20 fixes), findings marked `fixed` in the baseline. Constraints:
* Never touches IA, URLs/routes, nav order, token names, form field names, `id`s or
  `data-testid`s used by tests/analytics - redesign-skill territory, approval-gated there.
* High-impact findings first, then medium; polish only if the user asked for polish.
* Stopping at the governor is a success state: report fixed / remaining / risk math.

## Rules that bind this skill

* Report-only means ZERO site-file edits. The one sanctioned write is
  `design-baseline.json`; skip even that if the user asked for zero writes and inline
  the JSON in the report instead.
* Every score follows the math; every dismissed grep hit gets its one-line reason.
* If the project declares design commitments - `WEB-DESIGN.md` or an equivalent design
  doc - findings also flag DRIFT from them. Name the doc you used.
* Accessibility findings cite the WCAG 2.2 success criterion (e.g. 1.4.3, 2.4.7, 2.5.8).

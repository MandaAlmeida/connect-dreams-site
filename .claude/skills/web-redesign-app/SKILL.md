---
name: web-redesign-app
description: Whole-site redesign of an existing web app or website - full audit (tokens, IA/navigation vs the Nav Read rules, page archetypes, responsive behavior, dial reading), preserve-vs-overhaul decision, then a phased modernization plan executed lever by lever across pages with checkpoints and a risk governor. The only skill in this suite allowed to propose IA / URL restructuring (approval-gated). Use when asked to redesign, overhaul, rebrand, or modernize an entire site or web app. For one page use web-redesign-page; for an audit without changes use web-design-review.
---

# web-redesign-app: The Whole Site, In Phases

Method files, read in full first: `../_web-shared/references/redesign-protocol.md`,
`../_web-shared/references/review-rubric.md`, `../_web-shared/references/tells.md`, and
`../_web-shared/references/navigation.md` (for the IA audit).

## Flow

### 1. Full audit
Stack sniff, then the complete review-rubric pass (static + live when reachable) across
every page in the route tree, PLUS:
- **IA audit:** the current route tree and nav diffed against the navigation.md
  mechanical checks (nav count, container choices, URL state, Back behavior, deep links,
  responsive nav). Emit the current tree as a Nav Read so problems are visible in the
  same format the fix will use.
- **Token audit:** where the design system lives (CSS variables, Tailwind theme), or the
  finding that it doesn't (count raw hex values, distinct font sizes, distinct radii).
- **Responsive audit:** the breakpoint plan as-built and where it breaks.
- **Dial reading** of the site as-built; **posture** consistency per route.
- Write `design-baseline.json` - the redesign will be measured against it.

### 2. Mode + scope agreement
Preserve vs overhaul (ask once). Then present the plan as PHASES, each one lever from
redesign-protocol.md applied site-wide:

```
Phase 1  Tokens + type/spacing scale   (token file + every page mechanically)
Phase 2  Color onto semantic tokens; contrast; dark mode if in scope
Phase 3  Semantics + accessibility (landmarks, headings, labels, focus, keyboard)
Phase 4  Responsive layout (breakpoint plan, gutters, tables, nav pattern)
Phase 5  States (hover/focus/loading/empty/error) + motion layer
Phase 6  Page recomposition (worst pages first, from the findings)
Phase 7  IA / URL restructure          (ONLY if the IA audit demands it - see below)
```
Per phase: findings closed, files touched, what will not change. Get approval for the
plan once, then checkpoint (short summary + before/afters) at each phase boundary rather
than re-asking.

### 3. IA restructure (the gated phase)
This skill may PROPOSE IA changes - as a current-vs-proposed Nav Read diff with every
never-change-silently item flagged (URLs, nav order, externally-linked anchors,
keyboard shortcuts) and a migration note (301 redirects for every moved URL, sitemap
update, analytics events kept). It ships ONLY after explicit approval of that diff. If
the IA is fine, say so and skip the phase; most redesigns should.

### 4. Execution
The redesign-protocol fix loop, per phase: atomic changes (commits when in git),
before/after pairs, findings closed in the baseline, **risk governor at site scale**
(stop > 20%, hard cap 40 fixes per run - a large site takes multiple runs, by design).
Phase order is not negotiable mid-run; a tempting Phase-6 recomposition discovered
during Phase 2 becomes a finding, not a detour.

### 5. Close out
Regression run of the rubric → delta table against the starting baseline (the proof the
redesign worked), remaining findings, refreshed `WEB-DESIGN.md` (reads, dials, token
locations, Nav Read, breakpoint plan) so future sessions inherit the new system.

## Hard boundaries

* Overhaul mode changes visual language, never content or IA without the gated diff.
* SEO-bearing elements (titles, headings text, URLs, meta, structured data) change only
  with explicit approval.
* Accessibility wins from the audit are regression-tested, not assumed.
* Every phase's pages must pass the web-taste Section 13 pre-flight before the phase
  checkpoint counts as done.

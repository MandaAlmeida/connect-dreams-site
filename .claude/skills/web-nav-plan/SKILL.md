---
name: web-nav-plan
description: Turn a site idea or an existing web app into a Nav Read - information architecture, primary/secondary nav, URL/route tree, page vs dialog vs popover decisions, URL state, responsive nav pattern, back-button plan - without building any pages. Use when planning navigation or IA for a new site, restructuring an existing site's navigation or URLs, or deciding whether something is a page, a tab, a dialog, a drawer, or a popover. For building the pages afterward use web-taste; for full-site visual redesign use web-redesign-app.
---

# web-nav-plan: Information Architecture, Nothing Else

Navigation is information architecture. This skill produces a **Nav Read** - a committed
route tree that doubles as the router / file-system plan (`app/` in Next.js, `src/pages`
in Astro, the list of `.html` files or `#sections` in a static site) - and stops. No page
code.

The method lives in `../_web-shared/references/navigation.md` (container decision tree,
routing conventions, mechanical checks, worked examples). Tells cited by number live in
`../_web-shared/references/tells.md`. Read both in full before producing the Nav Read.

## Flow

1. **Stack sniff.** In an existing project, read `package.json`, the router tree
   (`app/`, `pages/`, `src/routes`, router config), the existing nav components, and
   `WEB-DESIGN.md` if present. For a single-file site, map its sections, anchors, and
   any JS-driven "pages". In a greenfield conversation, skip to 2.
2. **Site Read essentials.** Site kind, audience, device priority, posture
   (content-site / app-shell / hybrid) - one line. If genuinely ambiguous, ask ONE question.
3. **Enumerate the jobs-to-be-done.** List recurring destinations, the objects users
   manage, and create/edit tasks BEFORE picking containers. Nav items come from this
   list, never from a Home/Features/Pricing/About/Contact template.
4. **Run the decision tree** (navigation.md §2) over every view: primary nav → page →
   tabs-as-routes → dialog/drawer → popover/menu → alert dialog, first match wins.
5. **Emit the Nav Read** in the canonical format (navigation.md §1): devices, primary
   nav, responsive pattern, route tree with container annotations, overlays (or
   "none"), URL state, entry points, back behavior, max-clicks line.
6. **Justify the contentious calls** - one sentence each for: the nav item count, the
   responsive pattern (sidebar vs top bar vs bottom bar vs hamburger), every dialog that
   is not a page, every client-only state that is NOT in the URL, any route that skips
   the main chrome.
7. **Self-check** against the mechanical list (navigation.md §4). Report any rule the
   plan bends and why.
8. **Persist.** Offer to write the Nav Read into `WEB-DESIGN.md` (create or refresh the
   `## Nav Read` section, reporting the delta). For an existing site, also emit the DIFF
   between current and proposed trees, flagging every change that hits the
   never-change-silently list (`../_web-shared/references/redesign-protocol.md`): URLs,
   nav order, anchors that are linked externally - each with its redirect plan (301).

## Rules that bind this skill

* Restructuring an existing site's IA is a PROPOSAL - implementation belongs to
  web-redesign-app after approval.
* No mockups, no component code. The single artifact is the Nav Read (plus an optional
  empty route scaffold if asked: layout files and empty pages matching the tree).
* Cite the decision-tree step for every container choice. "It felt right" is not a
  rationale.
* Changing a public URL without a redirect is never acceptable in a plan.

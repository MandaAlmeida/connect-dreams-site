# Web Design Review Rubric

Used by web-design-review, web-redesign-page, web-redesign-app.

## 1. Passes

1. **Static pass** (always): tells.md grep block, then code inspection per category.
2. **Live pass** (when a browser is reachable): per page at 360 / 768 / 1440 wide, light
   and dark, plus a keyboard-only walk and 200% zoom when practical.

## 2. First-impression narration (live pass, per page)

Three sentences max, written before analysis: what the page is, what the eye hits first,
what it feels like. If the narration could describe a thousand other sites, that is a
finding (Identity).

## 3. The Trunk Test (per page)

Dropped onto this page from a search result, can a first-time user answer within ~5
seconds:
1. What site is this?
2. What page am I on?
3. What are the major sections?
4. What can I do here (primary action)?
5. Where am I in the hierarchy?
6. How do I search (if the site has search)?
Record pass/fail per question.

## 4. Finding format

```
FINDING-007 [high | Accessibility]
evidence: index.html:412 - <div class="btn" onclick="openMenu()">; screenshot 360px shows no focus ring
tell: #27, #28
wcag: 2.1.1 Keyboard, 2.4.7 Focus Visible
fix: replace with <button type="button" aria-expanded aria-controls="menu">; add :focus-visible ring token
```
Impact: **high** (blocks a task, fails WCAG A/AA, broken at a common width, obvious slop
at first glance) · **medium** (inconsistency, friction, weak hierarchy) · **polish**
(refinement).

## 5. The ten categories

1. **Identity** - does it look like this product, or like a template? Signature element present and singular.
2. **Hierarchy & layout** - clear primary content and action per page; grid; alignment; whitespace rhythm.
3. **Typography** - scale, measure, line-height, families, consistency.
4. **Color & contrast** - token use, accent discipline, contrast ratios, dark mode.
5. **Components & consistency** - one radius/shadow/icon system; states complete; buttons vs links.
6. **Navigation & IA** - Nav Read checks (navigation.md §4), Trunk Test, URL state, Back.
7. **Responsive** - 360/768/1024/1440, no horizontal scroll, tables, nav pattern, touch targets.
8. **Accessibility** - landmarks, headings, labels, alt, keyboard, focus, ARIA correctness, reduced motion, zoom.
9. **Motion & feedback** - motivated motion, durations, loading/empty/error states, no tells #35-#40.
10. **Performance & content** - LCP image, CLS reservations, font loading, JS weight; copy quality (tells #19-#26).

## 6. Scoring

Per category letter from findings in that category:
- **A** - zero high, <= 1 medium
- **B** - zero high, 2-3 medium
- **C** - 1 high, or 4+ medium
- **D** - 2 high
- **F** - 3+ high, or the category blocks a core task

Points: A=4, B=3, C=2, D=1, F=0. **Design Score** = mean of the ten, mapped back
(>= 3.5 A, >= 2.5 B, >= 1.5 C, >= 0.5 D, else F). No rounding up; a 3.49 is a B.

**AI Slop Score** = count of distinct tell numbers confirmed (after triage):
0-1 **A** (clean) · 2-3 **B** · 4-6 **C** · 7-9 **D** · 10+ **F**.

## 7. Baseline file

`design-baseline.json` at project root:
```json
{
  "version": 1,
  "date": "YYYY-MM-DD",
  "scope": ["index.html#home", "index.html#projetos"],
  "design_score": "C",
  "slop_score": "D",
  "categories": { "identity": "C", "hierarchy": "B", "typography": "C", "color": "D",
                  "components": "C", "navigation": "B", "responsive": "C",
                  "accessibility": "D", "motion": "B", "performance": "C" },
  "tells": [1, 2, 9, 19, 27, 28],
  "findings": [
    { "id": "FINDING-001", "impact": "high", "category": "accessibility",
      "summary": "...", "evidence": "file:line", "status": "open" }
  ],
  "unverified": ["dark mode contrast", "CWV"]
}
```
On a regression run: lead with a delta table (category before → after, findings new,
findings resolved, tells added/removed). Finding IDs are stable across runs.

# Web AI Tells - Catalog + Grep Checklist

Append-only. Numbers are stable: never renumber, never reuse. New tells go at the end.
Cited as "tell #N" across the web suite.

## Catalog

### Color & surface
1. **Indigo pipeline** - indigo/violet (`#6366F1`, `#7C3AED`, `#8B5CF6`, `indigo-500/600`, `violet-*`, `purple-600`) as the default accent, usually with a gradient.
2. **Gradient hero / gradient CTA** - more than one gradient per page, or gradient without compositional reason.
3. **Gradient text headline** - `bg-clip-text text-transparent bg-gradient-*` on the H1.
4. **Glass everything** - `backdrop-blur` on cards that sit over flat color.
5. **Card-grid page** - every section a grid of white `rounded-2xl shadow-lg` cards on gray.
6. **Mixed gray families** - `slate` + `gray` + `zinc` (or warm + cool hex grays) in one site.
7. **Glow blobs** - blurred colored circles behind the hero as decoration.
8. **Raw hex sprawl** - dozens of distinct hex values outside a token file.

### Layout & composition
9. **Three-card feature grid** - three icon + title + two-line cards under the hero.
10. **Centered everything** - every section `text-center`, `max-w-2xl mx-auto`.
11. **Identical section rhythm** - every section `py-24` / same padding, same heading + subtitle pattern.
12. **Floating dashboard screenshot** - tilted fake UI image with a glow under the hero.
13. **Icon chip** - 40x40 tinted rounded square with a colored icon leading every item.
14. **Stat-card row** - four KPI cards with fake `+12.5%` green deltas.
15. **Bento grid by default** - bento layout with no content reason for the size differences.
16. **Stretched phone layout** - single column with no max-width at 1440px.
17. **Fixed-width wrapper** - `width: 1200px` causing horizontal scroll on small screens.

### Type & copy
18. **Default font** - Inter / Poppins / Space Grotesk chosen by habit, not by brief.
19. **Em-dash copy** - `—` in visible strings.
20. **Filler verbs** - Elevate, Seamless, Unleash, Supercharge, Unlock the power, Revolutionize, Empower.
21. **Emoji icons** - 🚀✨📊🔥 in headings, buttons, nav, feature lists.
22. **Fake proof** - placeholder logo strip, "10,000+ happy customers", testimonials from "Sarah J., CEO at TechCorp".
23. **Placeholder people & data** - John Doe, Jane Smith, Acme, Lorem ipsum, `99.99%`, `$1,234.56`.
24. **Greeting header** - "Welcome back, John! 👋" as the dashboard H1.
25. **Exclamation voice** - "Let's get started! 🎉", "You're all set!".
26. **Generic CTA** - "Get Started" + "Learn More" as the only two buttons, everywhere.

### Semantics & accessibility
27. **Div button** - `<div onClick>` / `<span onClick>` / `<a>` without `href` acting as a button.
28. **Killed focus** - `outline: none` / `outline-none` with no `:focus-visible` replacement.
29. **Placeholder as label** - inputs with no `<label>`.
30. **Missing alt / dimensions** - `<img>` without `alt`, or without width/height/aspect-ratio (CLS).
31. **Heading soup** - multiple `<h1>`, skipped levels, headings used for size.
32. **Zoom lock** - `user-scalable=no` / `maximum-scale=1`.
33. **Hover-only affordance** - menus or actions that exist only on `:hover`.
34. **Icon button without name** - `<button><svg/></button>` with no `aria-label`.

### Interaction & motion
35. **Fade-up everything** - every section animates in on scroll; content hidden until JS.
36. **transition: all** - or `transition-all` on everything.
37. **alert()/confirm()** - native dialogs for feedback or confirmation.
38. **Scroll-jacking** - custom wheel handling, forced snap on long pages.
39. **Popup on load** - newsletter / notification permission / chat widget on first paint.
40. **Spinner page** - full-viewport spinner instead of a layout skeleton.
41. **Client-only state** - tabs/filters/modals that Back and refresh destroy.
42. **Hamburger on desktop** - menu button hiding nav that would fit.
43. **Infinite marquee** - auto-scrolling logo/testimonial ticker with no pause control.

## Grep checklist (run from project root)

Adjust the glob to the stack (`--include='*.{html,css,js,jsx,ts,tsx,vue,svelte,astro}'`).
Every hit gets triaged: fix, or dismiss with a one-line reason.

```bash
G='--include=*.html --include=*.css --include=*.scss --include=*.js --include=*.jsx --include=*.ts --include=*.tsx --include=*.vue --include=*.svelte --include=*.astro'
X='--exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist --exclude-dir=build --exclude-dir=.claude'

echo "#1 indigo";        grep -rnEi $G $X '#6366f1|#7c3aed|#8b5cf6|#4f46e5|indigo-[56]00|violet-[56]00|purple-600' . | wc -l
echo "#2 gradients";     grep -rnE  $G $X 'linear-gradient|radial-gradient|bg-gradient-' . | wc -l
echo "#3 gradient text"; grep -rnE  $G $X 'bg-clip-text|background-clip:\s*text' .
echo "#4 blur";          grep -rnE  $G $X 'backdrop-blur|backdrop-filter' . | wc -l
echo "#8 raw hex";       grep -rnoEi $G $X '#[0-9a-f]{6}\b|#[0-9a-f]{3}\b' . | sort -u -t: -k3 | wc -l
echo "#17 fixed width";  grep -rnE  $G $X 'width:\s*1[0-9]{3}px|w-\[1[0-9]{3}px\]' .
echo "#19 em-dash";      grep -rn   $G $X -- '—' .
echo "#20 filler";       grep -rnEi $G $X 'elevate|seamless|unleash|supercharge|unlock the power|revolutioni[sz]e|empower' .
echo "#21 emoji";        grep -rlE  $G $X '.' . | xargs perl -CSD -ne 'print "$ARGV:$.\n" if /[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]/; close ARGV if eof' | wc -l   # perl: BSD grep has no -P
echo "#23 placeholder";  grep -rnEi $G $X 'john doe|jane (doe|smith)|acme|lorem ipsum|99\.99%' .
echo "#27 div button";   grep -rnE  $G $X '<(div|span)[^>]*on[Cc]lick|<a(\s[^>]*)?>' . | grep -v 'href' | head -50
echo "#28 outline";      grep -rnE  $G $X 'outline:\s*(none|0)|outline-none' .
echo "#29 inputs";       grep -rnE  $G $X '<input' . | wc -l; grep -rnE $G $X '<label' . | wc -l
echo "#30 img";          grep -rnE  $G $X '<img' . | grep -vE 'alt=' | head -50
echo "#31 h1 count";     grep -rnoE $G $X '<h1' . | wc -l
echo "#32 zoom lock";    grep -rnE  $G $X 'user-scalable=no|maximum-scale=1' .
echo "#36 transition";   grep -rnE  $G $X 'transition:\s*all|transition-all' .
echo "#37 alert";        grep -rnE  $G $X '\b(alert|confirm)\(' .
echo "reduced motion";   grep -rn   $G $X 'prefers-reduced-motion' . | wc -l
echo "focus-visible";    grep -rn   $G $X 'focus-visible' . | wc -l
echo "dark scheme";      grep -rnE  $G $X 'prefers-color-scheme|data-theme|dark:' . | wc -l
```

For a single large HTML file, run the same patterns against that file and report counts
per pattern; inline `<style>` and `<script>` blocks count. If the file is bundled or
minified (very long lines), swap `-n` for `-o` and append `| wc -l` on every line, then
inspect hits with `grep -o '.\{0,80\}PATTERN.\{0,80\}'` so output stays readable.

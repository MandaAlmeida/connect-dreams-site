# Web Skeletons - Canonical Code for Patterns LLMs Botch

Framework-neutral HTML/CSS/JS first; adapt to the stack (in React use Radix/shadcn
primitives for dialog, menu, popover, tabs instead of hand-rolling).

## 1. Tokens skeleton

```css
:root {
  color-scheme: light dark;
  --bg: #fafaf9; --surface: #ffffff; --text: #1c1917; --text-muted: #57534e;
  --border: #e7e5e4; --accent: #0f766e; --accent-contrast: #ffffff; --focus: #0f766e;
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px;
  --shadow-1: 0 1px 2px rgb(0 0 0 / .06), 0 1px 1px rgb(0 0 0 / .04);
  --dur-fast: 120ms; --dur: 200ms; --ease-out: cubic-bezier(.2,.8,.2,1);
  --gutter: 16px;
}
@media (min-width: 1024px) { :root { --gutter: 32px; } }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { --bg: #0c0a09; --surface: #1c1917; --text: #f5f5f4;
    --text-muted: #a8a29e; --border: #292524; --accent: #2dd4bf; --accent-contrast: #042f2e; }
}
:root[data-theme="dark"] { /* same dark values */ }
body { background: var(--bg); color: var(--text); }
```

## 2. Focus ring

```css
:where(a, button, input, select, textarea, [tabindex]):focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
```
Never `outline: none` without this.

## 3. Skip link

```html
<a class="skip" href="#main">Pular para o conteúdo</a>
...
<main id="main" tabindex="-1">
```
```css
.skip { position: absolute; left: 8px; top: -40px; }
.skip:focus { top: 8px; }
```

## 4. Dialog (native)

```html
<button type="button" id="open-signup">Inscrever-se</button>
<dialog id="signup" aria-labelledby="signup-title">
  <form method="dialog">
    <h2 id="signup-title">Inscrição no evento</h2>
    ...
    <button value="cancel" aria-label="Fechar">×</button>
    <button value="ok">Confirmar inscrição</button>
  </form>
</dialog>
<script>
  const dlg = document.getElementById('signup');
  const trigger = document.getElementById('open-signup');
  trigger.addEventListener('click', () => dlg.showModal());   // focus trap + Escape for free
  dlg.addEventListener('close', () => trigger.focus());       // focus return
</script>
```
```css
dialog::backdrop { background: rgb(0 0 0 / .4); }
dialog[open] { animation: dlg-in var(--dur) var(--ease-out); }
@keyframes dlg-in { from { opacity: 0; transform: translateY(8px) scale(.98); } }
```

## 5. Mobile menu (disclosure, non-modal)

```html
<button type="button" class="menu-btn" aria-expanded="false" aria-controls="site-nav">Menu</button>
<nav id="site-nav" aria-label="Principal" hidden> ... </nav>
<script>
  const btn = document.querySelector('.menu-btn'), nav = document.getElementById('site-nav');
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open)); nav.hidden = open;
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !nav.hidden) { btn.click(); btn.focus(); } });
</script>
```
On desktop, show the nav and hide the button with a media query; do not rely on `hidden`.

## 6. Sticky header + anchors

```css
.site-header { position: sticky; top: 0; z-index: 10; background: var(--bg); border-bottom: 1px solid var(--border); }
[id] { scroll-margin-top: 72px; }   /* header height + breathing room */
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```

## 7. Loading skeleton (no CLS)

```html
<ul class="list" aria-busy="true">
  <li class="row skeleton"></li> <!-- same height as a real row -->
</ul>
```
```css
.skeleton { min-height: 56px; border-radius: var(--radius-sm);
  background: linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%);
  background-size: 200% 100%; animation: shimmer 1.2s infinite; }
@keyframes shimmer { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .skeleton { animation: none; } }
```
(This gradient is functional, not decorative; it does not count toward the gradient budget.)

## 8. Form field

```html
<div class="field">
  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" autocomplete="email" inputmode="email"
         required aria-describedby="email-err">
  <p id="email-err" class="field-error" role="alert" hidden>Digite um e-mail válido.</p>
</div>
```
Validate on blur and submit, not on every keystroke. Submit button says what happens.

## 9. Reveal once (if motion is justified)

```css
.reveal { opacity: 1; }
@media (prefers-reduced-motion: no-preference) {
  .js .reveal:not(.is-in) { opacity: 0; transform: translateY(12px); }
  .reveal { transition: opacity var(--dur) var(--ease-out), transform var(--dur) var(--ease-out); }
}
```
```js
document.documentElement.classList.add('js');
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
```
Content is visible without JS; use on at most one or two elements per page (tell #35).

## 10. Hover only where hover exists

```css
@media (hover: hover) { .card:hover { box-shadow: var(--shadow-2); } }
.card:active { transform: scale(.99); }
```

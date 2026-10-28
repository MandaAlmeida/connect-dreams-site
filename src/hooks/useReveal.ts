import type { CSSProperties } from 'react';

/*
 * Scroll reveal: pass `ref={reveal}` and `data-reveal` to an element; it fades up once when it
 * enters the viewport. Works for elements mounted later (e.g. after a filter change).
 * Reduced motion keeps everything visible (see base.css).
 */
let io: IntersectionObserver | null = null;

function observer() {
  io ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io!.unobserve(e.target);
        }
      }),
    { rootMargin: '0px 0px -6% 0px' },
  );
  return io;
}

export function reveal(el: Element | null) {
  if (!el || el.classList.contains('is-in')) return;
  if (!('IntersectionObserver' in window)) {
    el.classList.add('is-in');
    return;
  }
  observer().observe(el);
}

/** Stagger index for items in the same group. */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

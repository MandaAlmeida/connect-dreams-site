import { useCallback, useEffect, useRef, useState } from 'react';

const PREFIX = '#/projetos/';

export const projectHref = (id: string) => PREFIX + encodeURIComponent(id);

function readId(): string | null {
  const h = window.location.hash;
  return h.startsWith(PREFIX) ? decodeURIComponent(h.slice(PREFIX.length)) : null;
}

/**
 * The open project lives in the URL hash (#/projetos/<id>) so details can be shared
 * and the Back button closes them. Section anchors (#projetos, #contato…) are untouched.
 */
export function useProjectRoute() {
  const [openId, setOpenId] = useState<string | null>(readId);
  // True when the project was opened from inside the page, so closing can pop history.
  const openedInPage = useRef(false);

  useEffect(() => {
    let prev = readId();
    const onHash = () => {
      const next = readId();
      if (next && !prev) openedInPage.current = true;
      if (!next) openedInPage.current = false;
      prev = next;
      setOpenId(next);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  /** Close the dialog. `to` replaces the entry with a section anchor and scrolls there. */
  const close = useCallback((to?: string) => {
    if (to) {
      history.replaceState(null, '', window.location.pathname + window.location.search + '#' + to);
      openedInPage.current = false;
      setOpenId(null);
      requestAnimationFrame(() => document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' }));
      return;
    }
    if (openedInPage.current) {
      history.back();
      return;
    }
    // Landed directly on a project link: drop the project from the URL, show the list.
    history.replaceState(null, '', window.location.pathname + window.location.search + '#projetos');
    setOpenId(null);
    requestAnimationFrame(() => document.getElementById('projetos')?.scrollIntoView());
  }, []);

  return { openId, close };
}

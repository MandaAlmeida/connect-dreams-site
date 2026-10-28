import { useCallback, useState } from 'react';

const PARAM = 'categoria';

export const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Category filter persisted in ?categoria=<slug> so a filtered list can be shared. */
export function useCategoryFilter(categories: readonly string[]) {
  const read = () => {
    const slug = new URLSearchParams(window.location.search).get(PARAM);
    return categories.find((c) => slugify(c) === slug) ?? 'all';
  };
  const [filter, setFilterState] = useState<string>(read);

  const setFilter = useCallback((next: string) => {
    setFilterState(next);
    const url = new URL(window.location.href);
    if (next === 'all') url.searchParams.delete(PARAM);
    else url.searchParams.set(PARAM, slugify(next));
    history.replaceState(history.state, '', url);
  }, []);

  return [filter, setFilter] as const;
}

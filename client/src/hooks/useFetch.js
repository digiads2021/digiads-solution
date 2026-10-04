import { useCallback, useEffect, useRef, useState } from 'react';

// Small in-memory cache shared by all components (cleared on page reload).
const cache = new Map();

/**
 * useFetch(fetcher, deps, { cacheKey })
 * Runs an async function and returns { data, meta, loading, error, reload }.
 */
export default function useFetch(fetcher, deps = [], { cacheKey, skip = false } = {}) {
  const cached = cacheKey ? cache.get(cacheKey) : undefined;
  const [state, setState] = useState({ data: cached ?? null, loading: !cached && !skip, error: null });
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const run = useCallback(() => {
    if (skip) return undefined;
    let active = true;
    if (!(cacheKey && cache.has(cacheKey))) setState((s) => ({ ...s, loading: true, error: null }));
    fetcherRef.current()
      .then((data) => {
        if (cacheKey) cache.set(cacheKey, data);
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((error) => active && setState({ data: null, loading: false, error }));
    return () => { active = false; };
  }, [cacheKey, skip, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => run(), [run]);

  const reload = useCallback(() => {
    if (cacheKey) cache.delete(cacheKey);
    run();
  }, [run, cacheKey]);

  return { ...state, reload };
}

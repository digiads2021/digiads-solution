import { useEffect } from 'react';

// Pauses a section's CSS and SVG (SMIL) animations while it is scrolled out of view, so decorative
// motion never costs CPU/GPU time (or battery) when nobody can see it. CSS rule lives in base.css.
export default function useOffscreenPause(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      const hidden = !entry.isIntersecting;
      el.dataset.offscreen = hidden ? 'true' : 'false';
      el.querySelectorAll('svg').forEach((svg) => {
        if (typeof svg.pauseAnimations !== 'function') return;
        if (hidden) svg.pauseAnimations(); else svg.unpauseAnimations();
      });
    }, { rootMargin: '100px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

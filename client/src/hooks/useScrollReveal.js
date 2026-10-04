import { useEffect } from 'react';

// Fades matching sections in as they scroll into view (CSS: .fx / .fx-in in home.css).
// Without IntersectionObserver, or with reduced motion, nothing is hidden.
export default function useScrollReveal(selector, deps = []) {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const els = [...document.querySelectorAll(`${selector}:not(.fx-in)`)];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('fx-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach((el) => { el.classList.add('fx'); io.observe(el); });
    return () => io.disconnect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

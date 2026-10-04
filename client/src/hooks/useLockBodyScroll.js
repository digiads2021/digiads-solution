import { useEffect } from 'react';

// Prevents the page behind a modal or drawer from scrolling.
export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [locked]);
}

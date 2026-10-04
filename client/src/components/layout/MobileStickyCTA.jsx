import { useEffect, useState } from 'react';
import { useConsultation } from '../forms/ConsultationProvider.jsx';

// Subtle bottom bar on mobile. Hides when an on-page form is visible (elements with data-hide-sticky).
export default function MobileStickyCTA({ service }) {
  const { openConsultation } = useConsultation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-hide-sticky]');
    if (!targets.length || !('IntersectionObserver' in window)) return undefined;
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  });

  useEffect(() => {
    document.body.classList.add('has-sticky-cta');
    return () => document.body.classList.remove('has-sticky-cta');
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById('get-started');
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else openConsultation(service);
  };

  return (
    <div className={`sticky-cta ${hidden ? 'sticky-cta--hidden' : ''}`} aria-hidden={hidden}>
      <button type="button" className="btn btn--secondary" onClick={() => openConsultation(service)} tabIndex={hidden ? -1 : 0}>Talk to Expert</button>
      <button type="button" className="btn btn--primary" onClick={scrollToForm} tabIndex={hidden ? -1 : 0}>Get Started</button>
    </div>
  );
}

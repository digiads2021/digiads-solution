import { useEffect, useState } from 'react';

// Sticky table of contents with scroll-spy (highlights the section in view).
export default function TableOfContents({ sections, onTalk }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [sections]);

  return (
    <aside className="toc" aria-label="On this page">
      <h2>On this page</h2>
      <ol>
        {sections.map((s) => (
          <li key={s.id}><a href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>{s.label}</a></li>
        ))}
      </ol>
      <div className="toc__cta card" style={{ padding: 16 }}>
        <strong className="small">Have a question?</strong>
        <p className="small muted" style={{ margin: '4px 0 12px' }}>Speak with an expert about this service.</p>
        <button type="button" className="btn btn--secondary btn--sm btn--block" onClick={onTalk}>Talk to an Expert</button>
      </div>
    </aside>
  );
}

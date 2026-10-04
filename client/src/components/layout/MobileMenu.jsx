import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, X, Phone, Mail } from 'lucide-react';
import Logo from './Logo.jsx';
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js';
import { PLACEHOLDER } from '../../utils/siteContent.js';

export default function MobileMenu({ open, onClose, navigation, settings, onSearch, onTalk }) {
  const [expanded, setExpanded] = useState(null);
  useLockBodyScroll(open);
  if (!open) return null;

  return createPortal(
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer" role="dialog" aria-modal="true" aria-label="Main menu" onKeyDown={(e) => e.key === 'Escape' && onClose()}>
        <div className="drawer__head">
          <Logo />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu" autoFocus><X size={22} /></button>
        </div>
        <div className="drawer__body">
          <button type="button" className="search-trigger drawer__search" style={{ width: '100%', minWidth: 0 }} onClick={() => { onClose(); onSearch(); }}>
            <Search size={18} aria-hidden="true" /> What service are you looking for?
          </button>
          {navigation.map((p) => (!p.columns?.length ? (
            <Link key={p.key} className="m-link" to={`/services?pillar=${p.key}`} onClick={onClose}>{p.name}</Link>
          ) : (
            <div className="m-acc" key={p.key}>
              <button type="button" className="m-acc__btn" aria-expanded={expanded === p.key} aria-controls={`m-${p.key}`} onClick={() => setExpanded(expanded === p.key ? null : p.key)}>
                {p.name} <ChevronDown size={18} aria-hidden="true" />
              </button>
              {expanded === p.key && (
                <div className="m-acc__panel" id={`m-${p.key}`}>
                  {p.columns.map((col) => (
                    <div className="m-acc__group" key={col.key}>
                      <h3>{col.title}</h3>
                      <ul>
                        {col.links.slice(0, 6).map((l) => <li key={l.url}><Link to={l.url} onClick={onClose}>{l.name}</Link></li>)}
                        <li><Link to={`/services/${col.category.slug}`} onClick={onClose} style={{ color: 'var(--primary)', fontWeight: 600 }}>View all →</Link></li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )))}
          <Link className="m-link" to="/services" onClick={onClose}>All Services</Link>
          <Link className="m-link" to="/blog" onClick={onClose}>Blog</Link>
          <Link className="m-link" to="/faq" onClick={onClose}>FAQ</Link>
          <Link className="m-link" to="/about" onClick={onClose}>About</Link>
          <Link className="m-link" to="/contact" onClick={onClose}>Contact</Link>
        </div>
        <div className="drawer__foot">
          <button type="button" className="btn btn--primary btn--lg btn--block" onClick={() => { onClose(); onTalk(); }}>Talk to an Expert</button>
          <div className="small muted" style={{ display: 'grid', gap: 4 }}>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Phone size={14} /> {settings?.contact?.phone || PLACEHOLDER.phone}</span>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Mail size={14} /> {settings?.contact?.email || PLACEHOLDER.email}</span>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

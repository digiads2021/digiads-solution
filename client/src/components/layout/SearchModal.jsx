import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchServices } from '../../api/index.js';
import useDebounce from '../../hooks/useDebounce.js';
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js';
import { Spinner } from '../ui/States.jsx';

const popular = [
  { name: 'GST Registration', url: '/services/gst-income-tax/gst-registration' },
  { name: 'Private Limited Company Registration', url: '/services/business-registration/private-limited-company-registration' },
  { name: 'Trademark Registration', url: '/services/trademark-fssai-import-export/trademark-registration' },
  { name: 'Business Website Development', url: '/services/website-app-development/business-website-development' },
  { name: 'UAE Company Formation', url: '/services/global-business/uae-company-formation' },
];

// Global service search (Ctrl/Cmd + K). Debounced API search with keyboard navigation.
export default function SearchModal({ open, onClose, onTalk }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const debounced = useDebounce(q, 250);
  const navigate = useNavigate();
  useLockBodyScroll(open);

  useEffect(() => { if (!open) { setQ(''); setResults([]); } }, [open]);

  useEffect(() => {
    if (debounced.trim().length < 2) { setResults([]); setLoading(false); return undefined; }
    const controller = new AbortController();
    setLoading(true);
    searchServices(debounced, controller.signal)
      .then((r) => { setResults(r); setActive(0); })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [debounced]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const list = q.trim().length >= 2 ? results : popular;

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, list.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === 'Enter' && list[active]) { e.preventDefault(); navigate(list[active].url); onClose(); }
  };

  return createPortal(
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal search-modal" role="dialog" aria-modal="true" aria-label="Search services">
        <div className="search-box">
          <Search size={20} aria-hidden="true" />
          <input
            autoFocus type="search" placeholder="What service are you looking for?" value={q}
            onChange={(e) => setQ(e.target.value)} onKeyDown={onKeyDown}
            role="combobox" aria-expanded="true" aria-controls="search-listbox" aria-autocomplete="list"
            aria-activedescendant={list[active] ? `sr-${active}` : undefined}
          />
          {loading && <Spinner />}
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search"><X size={20} /></button>
        </div>
        <div className="search-results">
          <div className="search-results__label">{q.trim().length >= 2 ? `Results for “${q.trim()}”` : 'Popular searches'}</div>
          <div id="search-listbox" role="listbox">
            {list.map((r, i) => (
              <Link key={r.url} id={`sr-${i}`} to={r.url} className="search-result" role="option" aria-selected={i === active} onClick={onClose} onMouseEnter={() => setActive(i)}>
                <ArrowRight size={16} style={{ marginTop: 3, color: 'var(--text-muted)', flexShrink: 0 }} aria-hidden="true" />
                <div>
                  <div className="search-result__name">{r.name}</div>
                  {r.category && <div className="search-result__meta">{r.category.name}{r.subcategory ? ` · ${r.subcategory}` : ''}</div>}
                  {r.shortDescription && <div className="search-result__desc">{r.shortDescription}</div>}
                </div>
              </Link>
            ))}
          </div>
          {q.trim().length >= 2 && !loading && results.length === 0 && (
            <div className="state" style={{ padding: '32px 16px' }}>
              <h3>No matching service found</h3>
              <p>Tell us what you need and we’ll point you to the right service.</p>
              <button type="button" className="btn btn--primary" onClick={() => { onClose(); onTalk(); }}>Talk to an Expert</button>
            </div>
          )}
        </div>
        <div className="search-foot">
          <span>↑ ↓ to navigate · Enter to open · Esc to close</span>
          <Link to="/services" onClick={onClose}>Browse all services →</Link>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Reusable admin building blocks: page header, pager, status badge, confirm dialog, list hook, field helpers.
import { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal.jsx';
import useDebounce from '../../hooks/useDebounce.js';

export function PageHead({ crumbs, title, actions }) {
  return (
    <div className="admin-page-head">
      <div>
        {crumbs && <div className="admin-crumbs">{crumbs}</div>}
        <h1>{title}</h1>
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{actions}</div>}
    </div>
  );
}

const statusStyle = {
  published: 'success', draft: 'muted', new: '', contacted: 'muted', in_progress: 'warning', converted: 'success', closed: 'muted',
  subscribed: 'success', unsubscribed: 'muted', lead: '', contact: 'accent', consultation: 'warning',
};
export const StatusBadge = ({ value }) => (
  <span className={`badge ${statusStyle[value] ? `badge--${statusStyle[value]}` : ''}`}>{String(value || '').replace('_', ' ')}</span>
);

export function Pager({ meta, onPage }) {
  if (!meta) return null;
  const from = meta.total ? (meta.page - 1) * meta.limit + 1 : 0;
  const to = Math.min(meta.page * meta.limit, meta.total);
  return (
    <div className="a-pager">
      <span>{from}–{to} of {meta.total}</span>
      <div>
        <button type="button" className="btn btn--secondary btn--sm" disabled={meta.page <= 1} onClick={() => onPage(meta.page - 1)}>Previous</button>
        <button type="button" className="btn btn--secondary btn--sm" disabled={meta.page >= meta.pages} onClick={() => onPage(meta.page + 1)}>Next</button>
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, title = 'Are you sure?', message, confirmLabel = 'Delete', onConfirm, onClose, busy }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="muted">{message}</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn--secondary" onClick={onClose}>Cancel</button>
        <button type="button" className="btn btn--danger" onClick={onConfirm} disabled={busy}>{busy ? 'Working…' : confirmLabel}</button>
      </div>
    </Modal>
  );
}

/**
 * useAdminList(fetcher, initialFilters)
 * Handles filters, debounced search, pagination, loading and reload for admin tables.
 */
export function useAdminList(fetcher, initialFilters = {}) {
  const [filters, setFilters] = useState({ page: 1, q: '', ...initialFilters });
  const [state, setState] = useState({ items: [], meta: null, loading: true, error: '' });
  const q = useDebounce(filters.q, 300);

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    const params = Object.fromEntries(Object.entries({ ...filters, q }).filter(([, v]) => v !== '' && v !== undefined && v !== null));
    fetcher(params)
      .then((r) => setState({ items: r.data, meta: r.meta, loading: false, error: '' }))
      .catch((e) => setState({ items: [], meta: null, loading: false, error: e.message }));
  }, [JSON.stringify({ ...filters, q })]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load(); }, [load]);

  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value, page: key === 'page' ? value : 1 }));
  return { ...state, filters, setFilter, reload: load };
}

// ----- Field helpers for array content (one item per line) -----
export const linesToArray = (text) => text.split('\n').map((s) => s.trim()).filter(Boolean);
export const arrayToLines = (arr) => (arr || []).join('\n');

// "Title :: Description" per line <-> [{ title, description }]
export const pairsToArray = (text) => linesToArray(text).map((l) => {
  const [title, ...rest] = l.split('::');
  return { title: title.trim(), description: rest.join('::').trim() };
});
export const arrayToPairs = (arr) => (arr || []).map((p) => (p.description ? `${p.title} :: ${p.description}` : p.title)).join('\n');

// "## Group title" followed by items <-> [{ title, items }]
export const groupsToArray = (text) => {
  const groups = [];
  linesToArray(text).forEach((l) => {
    if (l.startsWith('##')) groups.push({ title: l.replace(/^#+/, '').trim(), items: [] });
    else if (groups.length) groups[groups.length - 1].items.push(l.replace(/^[-*]\s*/, ''));
    else groups.push({ title: 'Documents', items: [l.replace(/^[-*]\s*/, '')] });
  });
  return groups;
};
export const arrayToGroups = (arr) => (arr || []).map((g) => [`## ${g.title}`, ...g.items].join('\n')).join('\n\n');

// "Col A | Col B" header line, then rows <-> { columns, rows }
export const tableToObject = (text) => {
  const lines = linesToArray(text);
  if (!lines.length) return { columns: [], rows: [] };
  const split = (l) => l.split('|').map((c) => c.trim());
  return { columns: split(lines[0]), rows: lines.slice(1).map(split) };
};
export const objectToTable = (t) => (t?.columns?.length ? [t.columns.join(' | '), ...t.rows.map((r) => r.join(' | '))].join('\n') : '');

export const Toggle = ({ label, checked, onChange, id }) => (
  <label className="checkbox" htmlFor={id}>
    <input id={id} type="checkbox" checked={Boolean(checked)} onChange={(e) => onChange(e.target.checked)} />
    <span>{label}</span>
  </label>
);

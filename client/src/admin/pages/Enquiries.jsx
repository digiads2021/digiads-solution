import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, Eye, X, Archive, Trash2 } from 'lucide-react';
import { admin } from '../../api/index.js';
import { PageHead, StatusBadge, Pager, ConfirmDialog, useAdminList } from '../components/AdminUI.jsx';
import { CardSkeletons } from '../../components/ui/States.jsx';
import { formatDateTime, downloadBlob } from '../../utils/format.js';
import { useAuth } from '../../context/AuthContext.jsx';

const TITLES = { lead: 'Leads', contact: 'Contact messages', consultation: 'Consultation requests' };
const STATUSES = ['new', 'contacted', 'in_progress', 'converted', 'closed'];

// One page component for all three enquiry types (lead / contact / consultation).
export default function Enquiries({ type }) {
  const { admin: me } = useAuth();
  const list = useAdminList(admin.enquiries, { type, status: '', archived: '', sort: '-createdAt' });
  const [selected, setSelected] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => { list.setFilter('type', type); setSelected(null); }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = async (id, body) => {
    const updated = await admin.updateEnquiry(id, body);
    setSelected((s) => (s && s._id === id ? updated : s));
    list.reload();
  };
  const exportCsv = async () => downloadBlob(await admin.exportEnquiries({ type, status: list.filters.status || undefined }), `digiads-${type}s.csv`);

  return (
    <>
      <PageHead crumbs="Admin / Enquiries" title={TITLES[type]} actions={<button type="button" className="btn btn--secondary" onClick={exportCsv}><Download size={16} /> Export CSV</button>} />
      <div className="panel">
        <div className="toolbar">
          <input className="input" placeholder="Search name, phone, email, service…" value={list.filters.q} onChange={(e) => list.setFilter('q', e.target.value)} aria-label="Search" />
          <select className="select" value={list.filters.status} onChange={(e) => list.setFilter('status', e.target.value)} aria-label="Status">
            <option value="">All statuses</option>{STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </select>
          <select className="select" value={list.filters.sort} onChange={(e) => list.setFilter('sort', e.target.value)} aria-label="Sort">
            <option value="-createdAt">Newest first</option><option value="createdAt">Oldest first</option><option value="name">Name A–Z</option>
          </select>
          <select className="select" value={list.filters.archived} onChange={(e) => list.setFilter('archived', e.target.value)} aria-label="Archive">
            <option value="">Active</option><option value="true">Archived</option>
          </select>
        </div>
        {list.loading ? <div style={{ padding: 20 }}><CardSkeletons count={5} className="grid" height={44} /></div> : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr><th>Name</th><th>Contact</th><th>{type === 'contact' ? 'Subject' : 'Service'}</th><th>Status</th><th>Received</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
              <tbody>
                {list.items.length === 0 && <tr><td colSpan={6} className="muted">No {TITLES[type].toLowerCase()} found.</td></tr>}
                {list.items.map((e) => (
                  <tr key={e._id}>
                    <td><button type="button" className="btn btn--ghost btn--sm" style={{ padding: 0 }} onClick={() => setSelected(e)}><strong>{e.name}</strong></button></td>
                    <td className="small">{e.phone}<div className="muted">{e.email}</div></td>
                    <td className="small">{(type === 'contact' ? e.subject : e.serviceName) || '—'}</td>
                    <td>
                      <select className="select" style={{ minHeight: 34, width: 'auto', fontSize: 13 }} value={e.status} onChange={(ev) => update(e._id, { status: ev.target.value })} aria-label={`Status for ${e.name}`}>
                        {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                      </select>
                    </td>
                    <td className="small">{formatDateTime(e.createdAt)}</td>
                    <td><div className="actions"><button type="button" className="icon-btn" onClick={() => setSelected(e)} aria-label="View details"><Eye size={16} /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pager meta={list.meta} onPage={(p) => list.setFilter('page', p)} />
      </div>
      {selected && <EnquiryDrawer enquiry={selected} onClose={() => setSelected(null)} onUpdate={update} canDelete={me?.role === 'superadmin'} onDelete={() => setToDelete(selected)} />}
      <ConfirmDialog open={Boolean(toDelete)} onClose={() => setToDelete(null)} message="Permanently delete this enquiry? Archiving keeps a record instead."
        onConfirm={async () => { await admin.deleteEnquiry(toDelete._id); setToDelete(null); setSelected(null); list.reload(); }} />
    </>
  );
}

function EnquiryDrawer({ enquiry: e, onClose, onUpdate, canDelete, onDelete }) {
  const [note, setNote] = useState('');
  const rows = [
    ['Type', <StatusBadge value={e.type} key="t" />], ['Status', <StatusBadge value={e.status} key="s" />], ['Name', e.name],
    ['Phone', <a href={`tel:${e.phone}`} key="p">{e.phone}</a>], ['Email', e.email ? <a href={`mailto:${e.email}`} key="m">{e.email}</a> : '—'],
    ['City', e.city || '—'], ['Service', e.serviceName || '—'], ['Subject', e.subject || '—'], ['Preferred contact', e.preferredContact || '—'],
    ['Message', e.message || '—'], ['Submitted from', e.sourcePage || '—'], ['Received', formatDateTime(e.createdAt)],
  ];
  return createPortal(
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="side-drawer" role="dialog" aria-modal="true" aria-label="Enquiry details">
        <div className="drawer__head"><strong>Enquiry details</strong><button type="button" className="icon-btn" onClick={onClose} aria-label="Close"><X size={20} /></button></div>
        <div className="side-drawer__body">
          <dl className="dl">{rows.map(([k, v]) => <div key={k} style={{ display: 'contents' }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <h3 style={{ marginTop: 24, fontSize: '1rem' }}>Notes</h3>
          <ul className="note-list">
            {(e.notes || []).length === 0 && <li className="muted">No notes yet.</li>}
            {(e.notes || []).map((n, i) => <li key={i}>{n.text}<div className="small muted">{n.by} · {formatDateTime(n.at)}</div></li>)}
          </ul>
          <form onSubmit={async (ev) => { ev.preventDefault(); if (!note.trim()) return; await onUpdate(e._id, { note }); setNote(''); }} style={{ display: 'grid', gap: 8 }}>
            <label htmlFor="note" className="small" style={{ fontWeight: 600 }}>Add a note</label>
            <textarea id="note" className="textarea" rows={3} value={note} onChange={(ev) => setNote(ev.target.value)} placeholder="e.g. Called, sent document checklist." />
            <button type="submit" className="btn btn--primary btn--sm" style={{ justifySelf: 'start' }}>Add note</button>
          </form>
        </div>
        <div className="drawer__foot" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn--secondary btn--sm" onClick={() => onUpdate(e._id, { isArchived: !e.isArchived })}><Archive size={14} /> {e.isArchived ? 'Unarchive' : 'Archive'}</button>
          {canDelete && <button type="button" className="btn btn--danger btn--sm" onClick={onDelete}><Trash2 size={14} /> Delete</button>}
        </div>
      </aside>
    </>,
    document.body
  );
}

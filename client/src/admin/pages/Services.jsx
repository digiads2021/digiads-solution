import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, Pencil, Trash2, ExternalLink, Star } from 'lucide-react';
import { admin } from '../../api/index.js';
import useFetch from '../../hooks/useFetch.js';
import { PageHead, StatusBadge, Pager, ConfirmDialog, useAdminList } from '../components/AdminUI.jsx';
import { CardSkeletons } from '../../components/ui/States.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { formatDate } from '../../utils/format.js';

export default function Services() {
  const [params] = useSearchParams();
  const { admin: me } = useAuth();
  const cats = useFetch(() => admin.categories(), [], { cacheKey: 'admin-cats' });
  const list = useAdminList(admin.services, { status: params.get('status') || '', category: '', contentReviewed: params.get('contentReviewed') || '', sort: 'menuOrder' });
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  const toggle = async (s, key) => {
    const value = key === 'status' ? (s.status === 'published' ? 'draft' : 'published') : !s[key];
    await admin.patchService(s._id, { [key]: value });
    list.reload();
  };
  const remove = async () => {
    setBusy(true);
    try { await admin.deleteService(toDelete._id); setToDelete(null); list.reload(); } finally { setBusy(false); }
  };

  return (
    <>
      <PageHead crumbs="Admin / Catalogue" title="Services" actions={<Link to="/admin/services/new" className="btn btn--primary"><Plus size={16} /> New service</Link>} />
      <div className="panel">
        <div className="toolbar">
          <input className="input" placeholder="Search services…" value={list.filters.q} onChange={(e) => list.setFilter('q', e.target.value)} aria-label="Search services" />
          <select className="select" value={list.filters.category} onChange={(e) => list.setFilter('category', e.target.value)} aria-label="Category">
            <option value="">All categories</option>
            {(cats.data || []).map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select className="select" value={list.filters.status} onChange={(e) => list.setFilter('status', e.target.value)} aria-label="Status">
            <option value="">Any status</option><option value="published">Published</option><option value="draft">Draft</option>
          </select>
          <select className="select" value={list.filters.contentReviewed} onChange={(e) => list.setFilter('contentReviewed', e.target.value)} aria-label="Review">
            <option value="">Reviewed or not</option><option value="false">Awaiting review</option><option value="true">Reviewed</option>
          </select>
          <select className="select" value={list.filters.sort} onChange={(e) => list.setFilter('sort', e.target.value)} aria-label="Sort">
            <option value="menuOrder">Catalogue order</option><option value="name">Name A–Z</option><option value="-updatedAt">Recently updated</option>
          </select>
        </div>
        {list.error && <div className="form-alert form-alert--error" style={{ margin: 16 }}>{list.error}</div>}
        {list.loading ? <div style={{ padding: 20 }}><CardSkeletons count={6} className="grid" height={44} /></div> : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr><th>Service</th><th>Category</th><th>Status</th><th>Popular</th><th>Reviewed</th><th>Updated</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
              <tbody>
                {list.items.length === 0 && <tr><td colSpan={7} className="muted">No services found.</td></tr>}
                {list.items.map((s) => (
                  <tr key={s._id}>
                    <td><Link to={`/admin/services/${s._id}/edit`}><strong>{s.name}</strong></Link><div className="small muted">/{s.slug}</div></td>
                    <td className="small">{s.category?.name}</td>
                    <td><button type="button" className="btn btn--ghost btn--sm" onClick={() => toggle(s, 'status')} title="Toggle publish"><StatusBadge value={s.status} /></button></td>
                    <td><button type="button" className="icon-btn" onClick={() => toggle(s, 'popular')} aria-label={s.popular ? 'Unmark popular' : 'Mark popular'}><Star size={18} fill={s.popular ? '#f59e0b' : 'none'} color={s.popular ? '#f59e0b' : 'currentColor'} /></button></td>
                    <td>{s.contentReviewed ? <span className="badge badge--success">Yes</span> : <span className="badge badge--warning">Pending</span>}</td>
                    <td className="small">{formatDate(s.updatedAt)}</td>
                    <td>
                      <div className="actions">
                        {s.status === 'published' && s.category && <a className="icon-btn" href={`/services/${s.category.slug}/${s.slug}`} target="_blank" rel="noreferrer" aria-label="View on website"><ExternalLink size={16} /></a>}
                        <Link className="icon-btn" to={`/admin/services/${s._id}/edit`} aria-label="Edit"><Pencil size={16} /></Link>
                        {me?.role === 'superadmin' && <button type="button" className="icon-btn" onClick={() => setToDelete(s)} aria-label="Delete"><Trash2 size={16} /></button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pager meta={list.meta} onPage={(p) => list.setFilter('page', p)} />
      </div>
      <ConfirmDialog open={Boolean(toDelete)} onClose={() => setToDelete(null)} onConfirm={remove} busy={busy}
        message={`Delete “${toDelete?.name}”? Its FAQs will also be deleted. Consider unpublishing instead.`} />
    </>
  );
}

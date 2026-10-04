import { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { admin } from '../../api/index.js';
import { PageHead, StatusBadge, Pager, ConfirmDialog, useAdminList } from '../components/AdminUI.jsx';
import { CardSkeletons } from '../../components/ui/States.jsx';
import { formatDateTime, downloadBlob } from '../../utils/format.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Newsletter() {
  const { admin: me } = useAuth();
  const list = useAdminList(admin.subscribers, { status: '' });
  const [toDelete, setToDelete] = useState(null);
  const toggle = async (s) => { await admin.updateSubscriber(s._id, { status: s.status === 'subscribed' ? 'unsubscribed' : 'subscribed' }); list.reload(); };

  return (
    <>
      <PageHead crumbs="Admin / Content" title="Newsletter subscribers"
        actions={<button type="button" className="btn btn--secondary" onClick={async () => downloadBlob(await admin.exportSubscribers(), 'digiads-subscribers.csv')}><Download size={16} /> Export CSV</button>} />
      <div className="panel">
        <div className="toolbar">
          <input className="input" placeholder="Search email…" value={list.filters.q} onChange={(e) => list.setFilter('q', e.target.value)} aria-label="Search" />
          <select className="select" value={list.filters.status} onChange={(e) => list.setFilter('status', e.target.value)} aria-label="Status">
            <option value="">All</option><option value="subscribed">Subscribed</option><option value="unsubscribed">Unsubscribed</option>
          </select>
        </div>
        {list.loading ? <div style={{ padding: 20 }}><CardSkeletons count={4} className="grid" height={44} /></div> : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr><th>Email</th><th>Status</th><th>Subscribed</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
              <tbody>
                {list.items.length === 0 && <tr><td colSpan={4} className="muted">No subscribers yet.</td></tr>}
                {list.items.map((s) => (
                  <tr key={s._id}>
                    <td>{s.email}</td>
                    <td><button type="button" className="btn btn--ghost btn--sm" onClick={() => toggle(s)} title="Toggle status"><StatusBadge value={s.status} /></button></td>
                    <td className="small">{formatDateTime(s.createdAt)}</td>
                    <td><div className="actions">{me?.role === 'superadmin' && <button type="button" className="icon-btn" onClick={() => setToDelete(s)} aria-label="Delete"><Trash2 size={16} /></button>}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pager meta={list.meta} onPage={(p) => list.setFilter('page', p)} />
      </div>
      <ConfirmDialog open={Boolean(toDelete)} onClose={() => setToDelete(null)} message={`Remove ${toDelete?.email}?`}
        onConfirm={async () => { await admin.deleteSubscriber(toDelete._id); setToDelete(null); list.reload(); }} />
    </>
  );
}

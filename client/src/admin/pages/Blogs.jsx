import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { admin } from '../../api/index.js';
import { PageHead, StatusBadge, Pager, ConfirmDialog, useAdminList } from '../components/AdminUI.jsx';
import { CardSkeletons } from '../../components/ui/States.jsx';
import { formatDate } from '../../utils/format.js';
import { BLOG_CATEGORIES } from '../../utils/siteContent.js';

export default function Blogs() {
  const list = useAdminList(admin.blogs, { status: '', category: '' });
  const [toDelete, setToDelete] = useState(null);
  return (
    <>
      <PageHead crumbs="Admin / Content" title="Blog posts" actions={<Link to="/admin/blogs/new" className="btn btn--primary"><Plus size={16} /> New post</Link>} />
      <div className="panel">
        <div className="toolbar">
          <input className="input" placeholder="Search titles…" value={list.filters.q} onChange={(e) => list.setFilter('q', e.target.value)} aria-label="Search" />
          <select className="select" value={list.filters.category} onChange={(e) => list.setFilter('category', e.target.value)} aria-label="Category">
            <option value="">All categories</option>{BLOG_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className="select" value={list.filters.status} onChange={(e) => list.setFilter('status', e.target.value)} aria-label="Status">
            <option value="">Any status</option><option value="published">Published</option><option value="draft">Draft</option>
          </select>
        </div>
        {list.loading ? <div style={{ padding: 20 }}><CardSkeletons count={4} className="grid" height={44} /></div> : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Published</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
              <tbody>
                {list.items.length === 0 && <tr><td colSpan={5} className="muted">No posts yet.</td></tr>}
                {list.items.map((b) => (
                  <tr key={b._id}>
                    <td><Link to={`/admin/blogs/${b._id}/edit`}><strong>{b.title}</strong></Link><div className="small muted">/blog/{b.slug}</div></td>
                    <td className="small">{b.category}</td>
                    <td><StatusBadge value={b.status} /></td>
                    <td className="small">{formatDate(b.publishedAt) || '—'}</td>
                    <td><div className="actions">
                      {b.status === 'published' && <a className="icon-btn" href={`/blog/${b.slug}`} target="_blank" rel="noreferrer" aria-label="View"><ExternalLink size={16} /></a>}
                      <Link className="icon-btn" to={`/admin/blogs/${b._id}/edit`} aria-label="Edit"><Pencil size={16} /></Link>
                      <button type="button" className="icon-btn" onClick={() => setToDelete(b)} aria-label="Delete"><Trash2 size={16} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pager meta={list.meta} onPage={(p) => list.setFilter('page', p)} />
      </div>
      <ConfirmDialog open={Boolean(toDelete)} onClose={() => setToDelete(null)} message={`Delete “${toDelete?.title}”?`}
        onConfirm={async () => { await admin.deleteBlog(toDelete._id); setToDelete(null); list.reload(); }} />
    </>
  );
}

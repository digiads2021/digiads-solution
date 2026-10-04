import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { admin } from '../../api/index.js';
import useFetch from '../../hooks/useFetch.js';
import Modal from '../../components/ui/Modal.jsx';
import { Input, Textarea, Select } from '../../components/ui/Field.jsx';
import { PageHead, StatusBadge, ConfirmDialog, pairsToArray, arrayToPairs } from '../components/AdminUI.jsx';
import { PageLoader, ErrorState } from '../../components/ui/States.jsx';
import { iconNames } from '../../utils/icons.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const empty = { name: '', slug: '', shortDescription: '', overview: '', icon: 'Briefcase', order: 0, status: 'published', benefits: '', process: '', seoTitle: '', seoDescription: '' };

export default function Categories() {
  const { data, loading, error, reload } = useFetch(() => admin.categories(), []);
  const { admin: me } = useAuth();
  const [editing, setEditing] = useState(null); // null | 'new' | category
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const open = (c) => {
    setMsg('');
    setEditing(c || 'new');
    setForm(c ? { ...empty, ...c, benefits: arrayToPairs(c.benefits), process: arrayToPairs(c.process), seoTitle: c.seo?.title || '', seoDescription: c.seo?.description || '' } : empty);
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setMsg('');
    const body = {
      name: form.name, slug: form.slug || undefined, shortDescription: form.shortDescription, overview: form.overview, icon: form.icon,
      order: Number(form.order) || 0, status: form.status, benefits: pairsToArray(form.benefits), process: pairsToArray(form.process),
      seo: { title: form.seoTitle, description: form.seoDescription },
    };
    try {
      if (editing === 'new') await admin.createCategory(body); else await admin.updateCategory(editing._id, body);
      setEditing(null); reload();
    } catch (err) { setMsg(err.message); } finally { setSaving(false); }
  };

  const remove = async () => {
    try { await admin.deleteCategory(toDelete._id); setToDelete(null); reload(); } catch (err) { setMsg(err.message); setToDelete(null); }
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error.message} onRetry={reload} />;

  return (
    <>
      <PageHead crumbs="Admin / Catalogue" title="Categories" actions={<button type="button" className="btn btn--primary" onClick={() => open()}><Plus size={16} /> New category</button>} />
      {msg && !editing && <div className="form-alert form-alert--error" style={{ marginBottom: 16 }}>{msg}</div>}
      <div className="panel a-table-wrap">
        <table className="a-table">
          <thead><tr><th>Order</th><th>Name</th><th>Slug</th><th>Status</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
          <tbody>
            {data.map((c) => (
              <tr key={c._id}>
                <td>{c.order}</td>
                <td><strong>{c.name}</strong><div className="small muted">{c.shortDescription}</div></td>
                <td className="small">/services/{c.slug}</td>
                <td><StatusBadge value={c.status} /></td>
                <td><div className="actions">
                  <button type="button" className="icon-btn" onClick={() => open(c)} aria-label="Edit"><Pencil size={16} /></button>
                  {me?.role === 'superadmin' && <button type="button" className="icon-btn" onClick={() => setToDelete(c)} aria-label="Delete"><Trash2 size={16} /></button>}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title={editing === 'new' ? 'New category' : 'Edit category'} size="lg">
        <form className="form" onSubmit={save}>
          {msg && <div className="form-alert form-alert--error">{msg}</div>}
          <div className="form-row">
            <Input label="Name" name="c-name" id="c-name" required value={form.name} onChange={set('name')} />
            <Input label="Slug" name="c-slug" id="c-slug" hint="Auto from name if empty" value={form.slug} onChange={set('slug')} />
          </div>
          <div className="form-row">
            <Select label="Icon" name="c-icon" id="c-icon" options={iconNames} value={form.icon} onChange={set('icon')} />
            <Input label="Order" name="c-order" id="c-order" type="number" value={form.order} onChange={set('order')} />
          </div>
          <Select label="Status" name="c-status" id="c-status" options={['published', 'draft']} value={form.status} onChange={set('status')} />
          <Textarea label="Short description" name="c-short" id="c-short" rows={2} value={form.shortDescription} onChange={set('shortDescription')} />
          <Textarea label="Overview" name="c-ov" id="c-ov" rows={4} value={form.overview} onChange={set('overview')} />
          <Textarea label="Benefits" name="c-ben" id="c-ben" hint="One per line: Title :: Description" rows={4} value={form.benefits} onChange={set('benefits')} />
          <Textarea label="Process" name="c-proc" id="c-proc" hint="One per line: Step :: Description" rows={4} value={form.process} onChange={set('process')} />
          <div className="form-row">
            <Input label="SEO title" name="c-seot" id="c-seot" value={form.seoTitle} onChange={set('seoTitle')} />
            <Input label="SEO description" name="c-seod" id="c-seod" value={form.seoDescription} onChange={set('seoDescription')} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" className="btn btn--secondary" onClick={() => setEditing(null)}>Cancel</button>
            <button type="submit" className="btn btn--primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog open={Boolean(toDelete)} onClose={() => setToDelete(null)} onConfirm={remove} message={`Delete category “${toDelete?.name}”? This only works when it has no services.`} />
    </>
  );
}

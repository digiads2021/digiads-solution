import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { admin } from '../../api/index.js';
import useFetch from '../../hooks/useFetch.js';
import Modal from '../../components/ui/Modal.jsx';
import { Input, Textarea, Select } from '../../components/ui/Field.jsx';
import { PageHead, StatusBadge, Pager, ConfirmDialog, useAdminList } from '../components/AdminUI.jsx';
import { CardSkeletons } from '../../components/ui/States.jsx';

const empty = { question: '', answer: '', scope: 'home', category: '', service: '', order: 0, status: 'published' };

export default function Faqs() {
  const list = useAdminList(admin.faqs, { scope: '', status: '' });
  const cats = useFetch(() => admin.categories(), [], { cacheKey: 'admin-cats' });
  const services = useFetch(() => admin.serviceOptions(), []);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState('');
  const [toDelete, setToDelete] = useState(null);

  const open = (q) => {
    setMsg('');
    setEditing(q || 'new');
    setForm(q ? { ...empty, ...q, category: q.category?._id || q.category || '', service: q.service?._id || q.service || '' } : empty);
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const save = async (e) => {
    e.preventDefault();
    const body = { question: form.question, answer: form.answer, scope: form.scope, order: Number(form.order) || 0, status: form.status,
      category: form.scope === 'category' ? form.category : null, service: form.scope === 'service' ? form.service : null };
    try {
      if (editing === 'new') await admin.createFaq(body); else await admin.updateFaq(editing._id, body);
      setEditing(null); list.reload();
    } catch (err) { setMsg(err.message); }
  };

  return (
    <>
      <PageHead crumbs="Admin / Content" title="FAQs" actions={<button type="button" className="btn btn--primary" onClick={() => open()}><Plus size={16} /> New FAQ</button>} />
      <div className="panel">
        <div className="toolbar">
          <input className="input" placeholder="Search questions…" value={list.filters.q} onChange={(e) => list.setFilter('q', e.target.value)} aria-label="Search" />
          <select className="select" value={list.filters.scope} onChange={(e) => list.setFilter('scope', e.target.value)} aria-label="Shown on">
            <option value="">Everywhere</option><option value="home">Homepage</option><option value="general">FAQ page</option><option value="category">Category</option><option value="service">Service</option>
          </select>
          <select className="select" value={list.filters.status} onChange={(e) => list.setFilter('status', e.target.value)} aria-label="Status">
            <option value="">Any status</option><option value="published">Published</option><option value="draft">Draft</option>
          </select>
        </div>
        {list.loading ? <div style={{ padding: 20 }}><CardSkeletons count={5} className="grid" height={44} /></div> : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr><th>Question</th><th>Shown on</th><th>Status</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
              <tbody>
                {list.items.length === 0 && <tr><td colSpan={4} className="muted">No FAQs found.</td></tr>}
                {list.items.map((q) => (
                  <tr key={q._id}>
                    <td><strong>{q.question}</strong></td>
                    <td className="small">{q.scope}{q.service?.name ? `: ${q.service.name}` : ''}{q.category?.name ? `: ${q.category.name}` : ''}</td>
                    <td><StatusBadge value={q.status} /></td>
                    <td><div className="actions">
                      <button type="button" className="icon-btn" onClick={() => open(q)} aria-label="Edit"><Pencil size={16} /></button>
                      <button type="button" className="icon-btn" onClick={() => setToDelete(q)} aria-label="Delete"><Trash2 size={16} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pager meta={list.meta} onPage={(p) => list.setFilter('page', p)} />
      </div>
      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title={editing === 'new' ? 'New FAQ' : 'Edit FAQ'} size="lg">
        <form className="form" onSubmit={save}>
          {msg && <div className="form-alert form-alert--error">{msg}</div>}
          <Input label="Question" name="f-q" id="f-q" required value={form.question} onChange={set('question')} />
          <Textarea label="Answer" name="f-a" id="f-a" required rows={5} value={form.answer} onChange={set('answer')} />
          <div className="form-row">
            <Select label="Show on" name="f-scope" id="f-scope" value={form.scope} onChange={set('scope')}
              options={[{ value: 'home', label: 'Homepage' }, { value: 'general', label: 'FAQ page' }, { value: 'category', label: 'A category page' }, { value: 'service', label: 'A service page' }]} />
            <Select label="Status" name="f-status" id="f-status" options={['published', 'draft']} value={form.status} onChange={set('status')} />
          </div>
          {form.scope === 'category' && <Select label="Category" name="f-cat" id="f-cat" required placeholder="Choose…" value={form.category} onChange={set('category')} options={(cats.data || []).map((c) => ({ value: c._id, label: c.name }))} />}
          {form.scope === 'service' && <Select label="Service" name="f-svc" id="f-svc" required placeholder="Choose…" value={form.service} onChange={set('service')} options={(services.data || []).map((s) => ({ value: s._id, label: s.name }))} />}
          <Input label="Order" name="f-order" id="f-order" type="number" value={form.order} onChange={set('order')} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" className="btn btn--secondary" onClick={() => setEditing(null)}>Cancel</button>
            <button type="submit" className="btn btn--primary">Save</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog open={Boolean(toDelete)} onClose={() => setToDelete(null)} message="Delete this FAQ?"
        onConfirm={async () => { await admin.deleteFaq(toDelete._id); setToDelete(null); list.reload(); }} />
    </>
  );
}

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { admin } from '../../api/index.js';
import Modal from '../../components/ui/Modal.jsx';
import { Input, Textarea, Select } from '../../components/ui/Field.jsx';
import { PageHead, StatusBadge, Pager, ConfirmDialog, Toggle, useAdminList } from '../components/AdminUI.jsx';
import { CardSkeletons, EmptyState } from '../../components/ui/States.jsx';
import { assetUrl } from '../../utils/format.js';

const empty = { name: '', company: '', serviceName: '', text: '', photo: '', rating: '', consentGiven: false, status: 'draft', featured: true, order: 0 };

export default function Testimonials() {
  const list = useAdminList(admin.testimonials);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState('');
  const [toDelete, setToDelete] = useState(null);

  const open = (t) => { setMsg(''); setEditing(t || 'new'); setForm(t ? { ...empty, ...t, rating: t.rating || '' } : empty); };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const upload = async (file) => { if (!file) return; try { const r = await admin.uploadImage(file); setForm((x) => ({ ...x, photo: r.url })); } catch (e) { setMsg(e.message); } };
  const save = async (e) => {
    e.preventDefault();
    const body = { name: form.name, company: form.company, serviceName: form.serviceName, text: form.text, photo: form.photo,
      rating: form.rating ? Number(form.rating) : null, consentGiven: form.consentGiven, status: form.status, featured: form.featured, order: Number(form.order) || 0 };
    try {
      if (editing === 'new') await admin.createTestimonial(body); else await admin.updateTestimonial(editing._id, body);
      setEditing(null); list.reload();
    } catch (err) { setMsg(err.message); }
  };

  return (
    <>
      <PageHead crumbs="Admin / Content" title="Testimonials" actions={<button type="button" className="btn btn--primary" onClick={() => open()}><Plus size={16} /> New testimonial</button>} />
      <div className="notice" style={{ marginBottom: 16 }}>Add only real testimonials from real clients, with their permission. The homepage section stays hidden until at least one testimonial is published.</div>
      <div className="panel">
        {list.loading ? <div style={{ padding: 20 }}><CardSkeletons count={3} className="grid" height={44} /></div> : list.items.length === 0 ? (
          <EmptyState title="No testimonials yet" text="When clients share feedback, add it here with their consent." />
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr><th>Client</th><th>Testimonial</th><th>Consent</th><th>Status</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
              <tbody>
                {list.items.map((t) => (
                  <tr key={t._id}>
                    <td><strong>{t.name}</strong><div className="small muted">{t.company}</div></td>
                    <td className="small" style={{ maxWidth: 420 }}>{t.text.slice(0, 120)}{t.text.length > 120 ? '…' : ''}</td>
                    <td>{t.consentGiven ? <span className="badge badge--success">Yes</span> : <span className="badge badge--warning">No</span>}</td>
                    <td><StatusBadge value={t.status} /></td>
                    <td><div className="actions">
                      <button type="button" className="icon-btn" onClick={() => open(t)} aria-label="Edit"><Pencil size={16} /></button>
                      <button type="button" className="icon-btn" onClick={() => setToDelete(t)} aria-label="Delete"><Trash2 size={16} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pager meta={list.meta} onPage={(p) => list.setFilter('page', p)} />
      </div>
      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title={editing === 'new' ? 'New testimonial' : 'Edit testimonial'} size="lg">
        <form className="form" onSubmit={save}>
          {msg && <div className="form-alert form-alert--error">{msg}</div>}
          <div className="form-row">
            <Input label="Client name" name="t-name" id="t-name" required value={form.name} onChange={set('name')} />
            <Input label="Company" name="t-co" id="t-co" value={form.company} onChange={set('company')} />
          </div>
          <Input label="Service used" name="t-svc" id="t-svc" value={form.serviceName} onChange={set('serviceName')} />
          <Textarea label="Testimonial (client’s own words)" name="t-text" id="t-text" required rows={4} value={form.text} onChange={set('text')} />
          <div className="form-row">
            <Select label="Rating (only if the client gave one)" name="t-rating" id="t-rating" placeholder="No rating" value={form.rating} onChange={set('rating')} options={['5', '4', '3', '2', '1']} />
            <Select label="Status" name="t-status" id="t-status" options={['draft', 'published']} value={form.status} onChange={set('status')} />
          </div>
          <div>
            <strong className="small">Photo (optional, with permission)</strong>
            {form.photo && <img src={assetUrl(form.photo)} alt="" width="64" height="64" style={{ borderRadius: '50%', margin: '8px 0', objectFit: 'cover' }} />}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => upload(e.target.files?.[0])} aria-label="Upload photo" />
          </div>
          <Toggle id="t-consent" label="The client has given written consent to publish this testimonial" checked={form.consentGiven} onChange={(v) => setForm({ ...form, consentGiven: v })} />
          <Toggle id="t-feat" label="Show on homepage" checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" className="btn btn--secondary" onClick={() => setEditing(null)}>Cancel</button>
            <button type="submit" className="btn btn--primary">Save</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog open={Boolean(toDelete)} onClose={() => setToDelete(null)} message="Delete this testimonial?"
        onConfirm={async () => { await admin.deleteTestimonial(toDelete._id); setToDelete(null); list.reload(); }} />
    </>
  );
}

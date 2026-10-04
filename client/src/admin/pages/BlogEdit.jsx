import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { admin } from '../../api/index.js';
import useFetch from '../../hooks/useFetch.js';
import { Input, Textarea, Select } from '../../components/ui/Field.jsx';
import { PageLoader, Spinner } from '../../components/ui/States.jsx';
import { PageHead, Toggle } from '../components/AdminUI.jsx';
import { BLOG_CATEGORIES } from '../../utils/siteContent.js';
import { assetUrl } from '../../utils/format.js';

const empty = { title: '', slug: '', excerpt: '', content: '', category: 'Business', tags: '', author: 'DigiAds Team', imageUrl: '', imageAlt: '', relatedServices: [], seoTitle: '', seoDescription: '', canonical: '', status: 'draft' };

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(id ? null : empty);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const options = useFetch(() => admin.serviceOptions(), []);

  useEffect(() => {
    if (!id) return;
    admin.blog(id).then((b) => setForm({
      ...empty, ...b, tags: (b.tags || []).join(', '), imageUrl: b.featuredImage?.url || '', imageAlt: b.featuredImage?.alt || '',
      relatedServices: (b.relatedServices || []).map(String), seoTitle: b.seo?.title || '', seoDescription: b.seo?.description || '', canonical: b.seo?.canonical || '',
    })).catch((e) => setMsg({ type: 'error', text: e.message }));
  }, [id]);

  if (!form) return msg.text ? <div className="form-alert form-alert--error">{msg.text}</div> : <PageLoader />;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const f = (k) => ({ name: `b-${k}`, id: `b-${k}`, value: form[k], onChange: set(k), error: errors[k] });

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    try { const r = await admin.uploadImage(file); setForm((x) => ({ ...x, imageUrl: r.url })); }
    catch (e) { setMsg({ type: 'error', text: e.message }); }
    finally { setUploading(false); }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setMsg({ type: '', text: '' }); setErrors({});
    const body = {
      title: form.title, slug: form.slug || undefined, excerpt: form.excerpt, content: form.content, category: form.category,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean), author: form.author,
      featuredImage: { url: form.imageUrl, alt: form.imageAlt }, relatedServices: form.relatedServices,
      seo: { title: form.seoTitle, description: form.seoDescription, canonical: form.canonical }, status: form.status,
    };
    try {
      if (id) await admin.updateBlog(id, body);
      else { const c = await admin.createBlog(body); navigate(`/admin/blogs/${c._id}/edit`, { replace: true }); }
      setMsg({ type: 'success', text: 'Saved.' });
    } catch (err) { setErrors(err.errors || {}); setMsg({ type: 'error', text: err.message }); }
    finally { setSaving(false); }
  };

  return (
    <form onSubmit={save}>
      <PageHead crumbs={<><Link to="/admin/blogs">Blog posts</Link> / {id ? 'Edit' : 'New'}</>} title={id ? form.title : 'New post'}
        actions={<button type="submit" className="btn btn--primary" disabled={saving}>{saving ? <><Spinner /> Saving…</> : 'Save'}</button>} />
      {msg.text && <div className={`form-alert form-alert--${msg.type}`} style={{ marginBottom: 16 }}>{msg.text}</div>}
      <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 20, alignItems: 'start' }}>
        <div className="panel"><div className="panel__body form">
          <Input label="Title" required {...f('title')} />
          <Input label="Slug" hint="Auto from title if empty" {...f('slug')} />
          <Textarea label="Excerpt" rows={2} maxLength={400} {...f('excerpt')} />
          <Textarea label="Content" hint="Use simple HTML: <h2>, <p>, <ul><li>, <strong>, <a href>. Scripts are removed automatically." rows={20} {...f('content')} style={{ fontFamily: 'ui-monospace, monospace', fontSize: 14 }} />
        </div></div>
        <div style={{ display: 'grid', gap: 20 }}>
          <div className="panel"><div className="panel__body form">
            <Toggle id="b-pub" label="Published" checked={form.status === 'published'} onChange={(v) => setForm({ ...form, status: v ? 'published' : 'draft' })} />
            <Select label="Category" options={BLOG_CATEGORIES} {...f('category')} />
            <Input label="Tags (comma-separated)" {...f('tags')} />
            <Input label="Author" {...f('author')} />
          </div></div>
          <div className="panel"><div className="panel__body form">
            <strong className="small">Featured image</strong>
            {form.imageUrl && <img src={assetUrl(form.imageUrl)} alt="" style={{ borderRadius: 8 }} />}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => upload(e.target.files?.[0])} aria-label="Upload featured image" />
            {uploading && <span className="hint">Uploading…</span>}
            <Input label="Image alt text" {...f('imageAlt')} />
          </div></div>
          <div className="panel"><div className="panel__body form">
            <label htmlFor="b-related" className="small" style={{ fontWeight: 600 }}>Related services</label>
            <select id="b-related" multiple className="select" style={{ minHeight: 160 }} value={form.relatedServices} onChange={(e) => setForm({ ...form, relatedServices: Array.from(e.target.selectedOptions).map((o) => o.value) })}>
              {(options.data || []).map((o) => <option key={o._id} value={o._id}>{o.name}</option>)}
            </select>
            <Input label="SEO title" {...f('seoTitle')} />
            <Textarea label="SEO description" rows={2} {...f('seoDescription')} />
            <Input label="Canonical URL (optional)" {...f('canonical')} />
          </div></div>
        </div>
      </div>
      <style>{'@media (max-width: 1023px){ .admin-content form > .grid[style] { grid-template-columns: 1fr !important; } }'}</style>
    </form>
  );
}

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { admin } from '../../api/index.js';
import useFetch from '../../hooks/useFetch.js';
import { Input, Textarea, Select } from '../../components/ui/Field.jsx';
import { PageLoader, Spinner } from '../../components/ui/States.jsx';
import {
  PageHead, Toggle, linesToArray, arrayToLines, pairsToArray, arrayToPairs, groupsToArray, arrayToGroups, tableToObject, objectToTable,
} from '../components/AdminUI.jsx';
import { iconNames } from '../../utils/icons.jsx';

const PILLARS = [
  { value: 'registration', label: 'Registration' }, { value: 'tax-compliance', label: 'Tax & Compliance' }, { value: 'legal-ip', label: 'Legal & IP' },
  { value: 'licences-iso', label: 'Licences & ISO' }, { value: 'technology', label: 'Technology' }, { value: 'global', label: 'Global' },
];
const STAGES = ['idea', 'register', 'comply', 'protect', 'build', 'grow', 'expand'];
const TABS = ['Basics', 'Page content', 'Documents & process', 'Pricing & timeline', 'Related & SEO', 'FAQs'];

// Converts the API record into simple text fields that are easy to edit, and back.
const toForm = (s = {}) => ({
  name: s.name || '', slug: s.slug || '', category: s.category || '', subcategory: s.subcategory || '', pillar: s.pillar || 'registration',
  lifecycleStage: s.lifecycleStage || '', icon: s.icon || 'FileText', shortDescription: s.shortDescription || '', heroSummary: s.heroSummary || '',
  highlights: arrayToLines(s.highlights), overview: s.overview || '', eligibility: arrayToLines(s.eligibility), requirements: arrayToLines(s.requirements),
  benefits: arrayToPairs(s.benefits), comparisonTable: objectToTable(s.comparisonTable), documentGroups: arrayToGroups(s.documentGroups),
  process: arrayToPairs(s.process), deliverables: arrayToLines(s.deliverables), afterService: arrayToLines(s.afterService), pitfalls: arrayToLines(s.pitfalls),
  jurisdictions: arrayToLines(s.jurisdictions), keywords: (s.keywords || []).join(', '),
  pricingShow: Boolean(s.pricing?.show), startingFrom: s.pricing?.startingFrom ?? '', govtFeeNote: s.pricing?.govtFeeNote || '',
  plans: (s.pricing?.plans || []).map((p) => `${p.name} | ${p.price} | ${(p.includes || []).join('; ')}`).join('\n'),
  timelineShow: Boolean(s.timeline?.show), timelineText: s.timeline?.text || '',
  relatedServices: (s.relatedServices || []).map(String), popular: Boolean(s.popular), featured: Boolean(s.featured), showInMenu: s.showInMenu !== false,
  menuOrder: s.menuOrder ?? 0, status: s.status || 'draft', contentReviewed: Boolean(s.contentReviewed),
  seoTitle: s.seo?.title || '', seoDescription: s.seo?.description || '',
});

const fromForm = (f) => ({
  name: f.name, slug: f.slug || undefined, category: f.category, subcategory: f.subcategory, pillar: f.pillar, lifecycleStage: f.lifecycleStage, icon: f.icon,
  shortDescription: f.shortDescription, heroSummary: f.heroSummary, highlights: linesToArray(f.highlights), overview: f.overview,
  eligibility: linesToArray(f.eligibility), requirements: linesToArray(f.requirements), benefits: pairsToArray(f.benefits),
  comparisonTable: tableToObject(f.comparisonTable), documentGroups: groupsToArray(f.documentGroups), process: pairsToArray(f.process),
  deliverables: linesToArray(f.deliverables), afterService: linesToArray(f.afterService), pitfalls: linesToArray(f.pitfalls),
  jurisdictions: linesToArray(f.jurisdictions), keywords: f.keywords.split(',').map((k) => k.trim()).filter(Boolean),
  pricing: {
    show: f.pricingShow, startingFrom: f.startingFrom === '' ? null : Number(f.startingFrom), govtFeeNote: f.govtFeeNote,
    plans: linesToArray(f.plans).map((l) => { const [name, price, inc = ''] = l.split('|').map((x) => x.trim()); return { name, price: Number(price) || 0, includes: inc.split(';').map((x) => x.trim()).filter(Boolean) }; }),
  },
  timeline: { show: f.timelineShow, text: f.timelineText },
  relatedServices: f.relatedServices, popular: f.popular, featured: f.featured, showInMenu: f.showInMenu, menuOrder: Number(f.menuOrder) || 0,
  status: f.status, contentReviewed: f.contentReviewed, seo: { title: f.seoTitle, description: f.seoDescription },
});

export default function ServiceEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const [form, setForm] = useState(null);
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});
  const cats = useFetch(() => admin.categories(), [], { cacheKey: 'admin-cats' });
  const options = useFetch(() => admin.serviceOptions(), []);
  const faqs = useFetch(() => (id ? admin.faqs({ scope: 'service', service: id, limit: 100 }) : Promise.resolve({ data: [] })), [id]);

  useEffect(() => {
    if (isNew) { setForm(toForm()); return; }
    admin.service(id).then((s) => setForm(toForm(s))).catch((e) => setMsg({ type: 'error', text: e.message }));
  }, [id, isNew]);

  if (!form) return msg.text ? <div className="form-alert form-alert--error">{msg.text}</div> : <PageLoader />;
  const set = (k) => (e) => setForm({ ...form, [k]: e?.target ? e.target.value : e });
  const f = (k, extra = {}) => ({ name: k, id: k, value: form[k], onChange: set(k), error: errors[k], ...extra });

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setMsg({ type: '', text: '' }); setErrors({});
    try {
      const body = fromForm(form);
      if (isNew) {
        const created = await admin.createService(body);
        navigate(`/admin/services/${created._id}/edit`, { replace: true });
      } else {
        await admin.updateService(id, body);
      }
      setMsg({ type: 'success', text: 'Saved.' });
    } catch (err) {
      setErrors(err.errors || {});
      setMsg({ type: 'error', text: err.message });
    } finally { setSaving(false); }
  };

  const serviceFaqs = (faqs.data?.data || []).filter((q) => String(q.service?._id || q.service) === id);

  return (
    <form onSubmit={save}>
      <PageHead crumbs={<><Link to="/admin/services">Services</Link> / {isNew ? 'New' : 'Edit'}</>} title={isNew ? 'New service' : form.name}
        actions={<button type="submit" className="btn btn--primary" disabled={saving}>{saving ? <><Spinner /> Saving…</> : 'Save'}</button>} />
      {msg.text && <div className={`form-alert form-alert--${msg.type}`} role="status" style={{ marginBottom: 16 }}>{msg.text}</div>}
      <div className="panel">
        <div className="tabs-admin" role="tablist">
          {TABS.map((t, i) => <button key={t} type="button" role="tab" aria-selected={tab === i} onClick={() => setTab(i)}>{t}</button>)}
        </div>
        <div className="panel__body">
          {tab === 0 && (
            <div className="form-grid">
              <Input label="Service name" required {...f('name')} />
              <Input label="Slug (URL)" hint="Leave empty to generate from the name" {...f('slug')} />
              <Select label="Category" required placeholder="Choose…" options={(cats.data || []).map((c) => ({ value: c._id, label: c.name }))} {...f('category')} />
              <Input label="Subcategory (group heading)" {...f('subcategory')} />
              <Select label="Menu group (pillar)" options={PILLARS} {...f('pillar')} />
              <Select label="Business lifecycle stage" placeholder="None" options={STAGES} {...f('lifecycleStage')} />
              <Select label="Icon" options={iconNames} {...f('icon')} />
              <Input label="Menu order" type="number" {...f('menuOrder')} />
              <div className="full"><Textarea label="Short description (cards, search, meta)" rows={2} maxLength={300} {...f('shortDescription')} /></div>
              <div className="full"><Textarea label="Hero summary" rows={2} {...f('heroSummary')} /></div>
              <div className="full toggle-row">
                <Toggle id="t-pub" label="Published" checked={form.status === 'published'} onChange={(v) => setForm({ ...form, status: v ? 'published' : 'draft' })} />
                <Toggle id="t-pop" label="Popular" checked={form.popular} onChange={(v) => setForm({ ...form, popular: v })} />
                <Toggle id="t-feat" label="Featured" checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} />
                <Toggle id="t-menu" label="Show in mega menu" checked={form.showInMenu} onChange={(v) => setForm({ ...form, showInMenu: v })} />
                <Toggle id="t-rev" label="Content reviewed by CA/CS" checked={form.contentReviewed} onChange={(v) => setForm({ ...form, contentReviewed: v })} />
              </div>
            </div>
          )}
          {tab === 1 && (
            <div className="form-grid">
              <div className="full"><Textarea label="Highlights (one per line)" rows={4} {...f('highlights')} /></div>
              <div className="full"><Textarea label="Overview" hint="Plain paragraphs separated by a blank line, or simple HTML (<p>, <ul>, <strong>)." rows={8} {...f('overview')} /></div>
              <Textarea label="Who needs it (one per line)" rows={6} {...f('eligibility')} />
              <Textarea label="Requirements (one per line)" rows={6} {...f('requirements')} />
              <div className="full"><Textarea label="Benefits" hint="One per line: Title :: Description" rows={7} {...f('benefits')} /></div>
              <div className="full"><Textarea label="Comparison table (optional)" hint="First line = column headings separated by |, then one row per line" rows={5} {...f('comparisonTable')} /></div>
              <Textarea label="After this service (one per line)" rows={5} {...f('afterService')} />
              <Textarea label="Common mistakes (one per line)" rows={5} {...f('pitfalls')} />
              <div className="full"><Textarea label="Locations / jurisdictions (one per line, optional)" rows={3} {...f('jurisdictions')} /></div>
            </div>
          )}
          {tab === 2 && (
            <div className="form-grid">
              <div className="full"><Textarea label="Documents required" hint="Start each group with ## Group title, then one document per line" rows={12} {...f('documentGroups')} /></div>
              <div className="full"><Textarea label="Process steps" hint="One per line: Step title :: Description" rows={8} {...f('process')} /></div>
              <div className="full"><Textarea label="Deliverables (one per line)" rows={5} {...f('deliverables')} /></div>
            </div>
          )}
          {tab === 3 && (
            <div className="form-grid">
              <div className="full notice">Only show fees and timelines that DigiAds has verified. Government fees and processing times change — keep them up to date.</div>
              <div className="full"><Toggle id="t-price" label="Show fees on the website" checked={form.pricingShow} onChange={(v) => setForm({ ...form, pricingShow: v })} /></div>
              <Input label="Starting from (₹)" type="number" min="0" {...f('startingFrom')} />
              <Input label="Government fee note" {...f('govtFeeNote')} />
              <div className="full"><Textarea label="Plans (optional)" hint="One per line: Plan name | Price | item one; item two" rows={4} {...f('plans')} /></div>
              <div className="full"><Toggle id="t-time" label="Show timeline on the website" checked={form.timelineShow} onChange={(v) => setForm({ ...form, timelineShow: v })} /></div>
              <div className="full"><Input label="Timeline text" hint='e.g. "Typically 7–10 working days after documents are received."' {...f('timelineText')} /></div>
            </div>
          )}
          {tab === 4 && (
            <div className="form-grid">
              <div className="full">
                <label className="field" htmlFor="related"><span style={{ fontWeight: 600, fontSize: 14 }}>Related services</span></label>
                <select id="related" multiple className="select" style={{ minHeight: 220 }} value={form.relatedServices}
                  onChange={(e) => setForm({ ...form, relatedServices: Array.from(e.target.selectedOptions).map((o) => o.value) })}>
                  {(options.data || []).filter((o) => o._id !== id).map((o) => <option key={o._id} value={o._id}>{o.name}</option>)}
                </select>
                <span className="hint">Hold Ctrl (Cmd on Mac) to select several. 4–6 recommended.</span>
              </div>
              <div className="full"><Input label="Search keywords (comma-separated)" hint="Synonyms people search for, e.g. pvt ltd, company incorporation" {...f('keywords')} /></div>
              <Input label="SEO title" hint={`${form.seoTitle.length}/60 characters`} {...f('seoTitle')} />
              <Input label="SEO description" hint={`${form.seoDescription.length}/155 characters`} {...f('seoDescription')} />
            </div>
          )}
          {tab === 5 && (
            <div>
              {isNew ? <p className="muted">Save the service first, then add FAQs.</p> : (
                <>
                  <p className="muted small">This service has {serviceFaqs.length} FAQs. Manage them in <Link to="/admin/faqs">FAQs</Link> (filter by “Service”).</p>
                  <ol style={{ paddingLeft: 20, display: 'grid', gap: 8 }}>{serviceFaqs.map((q) => <li key={q._id}><strong>{q.question}</strong> <span className="small muted">({q.status})</span></li>)}</ol>
                </>
              )}
            </div>
          )}
        </div>
        <div className="sticky-save">
          <Link to="/admin/services" className="btn btn--secondary">Back</Link>
          <button type="submit" className="btn btn--primary" disabled={saving}>{saving ? 'Saving…' : 'Save service'}</button>
        </div>
      </div>
    </form>
  );
}

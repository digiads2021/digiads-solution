import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, ShieldCheck, CalendarCheck } from 'lucide-react';
import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import ServiceCard from '../components/shared/ServiceCard.jsx';
import BlogCard from '../components/shared/BlogCard.jsx';
import CTABanner from '../components/shared/CTABanner.jsx';
import Accordion from '../components/ui/Accordion.jsx';
import LeadForm from '../components/forms/LeadForm.jsx';
import MobileStickyCTA from '../components/layout/MobileStickyCTA.jsx';
import TableOfContents from '../components/service/TableOfContents.jsx';
import { Section, CheckList, Benefits, ComparisonTable, DocumentGroups, Process, Pricing, Overview } from '../components/service/ServiceBlocks.jsx';
import { PageLoader, ErrorState } from '../components/ui/States.jsx';
import { useConsultation } from '../components/forms/ConsultationProvider.jsx';
import useFetch from '../hooks/useFetch.js';
import { getService } from '../api/index.js';
import { formatDate, formatINR } from '../utils/format.js';
import { breadcrumbSchema, serviceSchema, faqSchema } from '../utils/schema.js';
import NotFound from './NotFound.jsx';

const nonEmpty = (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v));

export default function Service() {
  const { categorySlug, serviceSlug } = useParams();
  const { openConsultation } = useConsultation();
  const { data: s, loading, error, reload } = useFetch(() => getService(serviceSlug), [serviceSlug], { cacheKey: `svc-${serviceSlug}` });

  // Build the table of contents from the blocks that actually have content.
  const sections = useMemo(() => {
    if (!s) return [];
    return [
      ['overview', 'Overview', s.overview],
      ['who-needs-it', 'Who needs it', s.eligibility],
      ['benefits', 'Benefits', s.benefits],
      ['comparison', 'Comparison', s.comparisonTable?.columns?.length ? s.comparisonTable : null],
      ['requirements', 'Requirements', s.requirements],
      ['documents', 'Documents required', s.documentGroups],
      ['process', 'Process', s.process],
      ['deliverables', 'What you get', s.deliverables],
      ['fees', 'Fees', s.pricing?.show ? s.pricing : null],
      ['timeline', 'Timeline', s.timeline?.show && s.timeline?.text ? s.timeline : null],
      ['after', 'After this service', s.afterService],
      ['mistakes', 'Common mistakes', s.pitfalls],
      ['faqs', 'FAQs', s.faqs],
    ].filter(([, , v]) => nonEmpty(v)).map(([id, label]) => ({ id, label }));
  }, [s]);

  if (loading) return <PageLoader />;
  if (error?.status === 404) return <NotFound />;
  if (error) return <div className="container"><ErrorState message={error.message} onRetry={reload} /></div>;

  const cat = s.category;
  const path = `/services/${cat?.slug || categorySlug}/${s.slug}`;
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: cat?.name, to: `/services/${cat?.slug}` }, { label: s.name, to: path }];
  const serviceRef = { slug: s.slug, name: s.name };
  const talk = () => openConsultation(serviceRef);

  return (
    <>
      <Seo title={s.seo?.title || s.name} description={s.seo?.description || s.shortDescription} path={path}
        schema={[breadcrumbSchema(crumbs), serviceSchema(s, path), s.faqs?.length ? faqSchema(s.faqs) : null]} />

      {/* ---------- Hero + lead form ---------- */}
      <section className="svc-hero">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <div className="svc-hero__grid">
            <div>
              <div className="eyebrow">{s.subcategory}</div>
              <h1>{s.name}</h1>
              <p className="lead">{s.heroSummary || s.shortDescription}</p>
              {s.highlights?.length > 0 && (
                <ul className="svc-hero__highlights">
                  {s.highlights.map((h) => <li key={h}><Check size={18} aria-hidden="true" />{h}</li>)}
                </ul>
              )}
              <div className="svc-hero__ctas">
                <a href="#get-started" className="btn btn--primary btn--lg">Get Started</a>
                <button type="button" className="btn btn--secondary btn--lg" onClick={talk}>Talk to an Expert</button>
              </div>
              {s.jurisdictions?.length > 0 && (
                <div className="chip-row" style={{ marginTop: 20 }} aria-label="Locations covered">
                  {s.jurisdictions.map((j) => <span key={j} className="badge badge--muted">{j}</span>)}
                </div>
              )}
            </div>
            <div className="lead-card" id="get-started" data-hide-sticky style={{ scrollMarginTop: 96 }}>
              <h2>Get started with {s.name.length > 40 ? 'this service' : s.name}</h2>
              <p>Share your details and an expert will call you.</p>
              {s.pricing?.show && s.pricing?.startingFrom ? (
                <div className="lead-card__price"><span className="small muted">From</span><strong>{formatINR(s.pricing.startingFrom)}</strong><span className="small muted">+ govt. fees, if any</span></div>
              ) : null}
              <LeadForm service={serviceRef} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Content with sticky TOC ---------- */}
      <div className="container svc-layout">
        <TableOfContents sections={sections} onTalk={talk} />
        <div>
          {s.overview && <Section id="overview" title={`What is ${s.name}?`}><Overview html={s.overview} /></Section>}
          {nonEmpty(s.eligibility) && <Section id="who-needs-it" title="Who needs it?"><CheckList items={s.eligibility} /></Section>}
          {nonEmpty(s.benefits) && <Section id="benefits" title={`Benefits of ${s.name}`}><Benefits items={s.benefits} /></Section>}
          {s.comparisonTable?.columns?.length > 0 && <Section id="comparison" title="Comparison at a glance"><ComparisonTable table={s.comparisonTable} /></Section>}
          {nonEmpty(s.requirements) && <Section id="requirements" title="Requirements"><CheckList items={s.requirements} /></Section>}
          {nonEmpty(s.documentGroups) && (
            <Section id="documents" title="Documents required">
              <DocumentGroups groups={s.documentGroups} />
              <p className="small muted" style={{ marginTop: 16 }}>The exact list can vary with your situation. We share a personalised checklist after a quick call.</p>
            </Section>
          )}
          {nonEmpty(s.process) && <Section id="process" title={`How ${s.name} works with DigiAds`}><Process steps={s.process} /></Section>}
          {nonEmpty(s.deliverables) && <Section id="deliverables" title="What you get"><CheckList items={s.deliverables} two /></Section>}
          {s.pricing?.show && <Section id="fees" title="Fees"><Pricing pricing={s.pricing} /></Section>}
          {s.timeline?.show && s.timeline?.text && (
            <Section id="timeline" title="Timeline">
              <div className="notice notice--info"><CalendarCheck size={18} aria-hidden="true" /><span>{s.timeline.text} Actual time depends on government processing and document readiness.</span></div>
            </Section>
          )}
          {nonEmpty(s.afterService) && <Section id="after" title="After this service"><CheckList items={s.afterService} /></Section>}
          {nonEmpty(s.pitfalls) && <Section id="mistakes" title="Common mistakes to avoid"><CheckList items={s.pitfalls} /></Section>}

          <section className="svc-section" aria-labelledby="why-h">
            <h2 id="why-h">Why choose DigiAds for {s.name}?</h2>
            <CheckList two items={['Handled by professionals who do this work every day', 'Clear document checklist before you start', 'Updates at every stage of the process', 'Guidance on related registrations and compliance', 'Online process — share documents digitally', 'One partner for legal, tax, technology and global needs']} />
          </section>

          {nonEmpty(s.faqs) && <Section id="faqs" title={`${s.name} – FAQs`}><Accordion items={s.faqs} /></Section>}

          <p className="reviewed">
            <ShieldCheck size={14} aria-hidden="true" />
            {s.contentReviewed && s.contentReviewedAt ? `Content reviewed on ${formatDate(s.contentReviewedAt)}` : `Last updated on ${formatDate(s.updatedAt)}`}
            {' · '}Information is general guidance and not legal or tax advice.
          </p>
        </div>
      </div>

      {/* ---------- Related ---------- */}
      {s.relatedServices?.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2>Related services</h2>
            <div className="grid grid-3" style={{ marginTop: 24 }}>
              {s.relatedServices.map((r) => <ServiceCard key={r._id} service={r} />)}
            </div>
          </div>
        </section>
      )}
      {s.articles?.length > 0 && (
        <section className="section">
          <div className="container">
            <h2>Related guides</h2>
            <div className="grid grid-3" style={{ marginTop: 24 }}>{s.articles.map((p) => <BlogCard key={p._id} post={p} />)}</div>
          </div>
        </section>
      )}
      <section className="section" style={{ paddingTop: s.articles?.length ? 0 : undefined }}>
        <div className="container">
          <CTABanner title={`Ready to start your ${s.name.replace(/ Registration$/, '')}?`} service={serviceRef} />
          <p className="small muted center" style={{ marginTop: 24 }}>
            Browse more in <Link to={`/services/${cat?.slug}`}>{cat?.name}</Link> or see <Link to="/services">all services</Link>.
          </p>
        </div>
      </section>
      <MobileStickyCTA service={serviceRef} />
    </>
  );
}

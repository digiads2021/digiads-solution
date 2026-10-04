import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import ServiceCard from '../components/shared/ServiceCard.jsx';
import FAQSection from '../components/shared/FAQSection.jsx';
import CTABanner from '../components/shared/CTABanner.jsx';
import MobileStickyCTA from '../components/layout/MobileStickyCTA.jsx';
import { PageLoader, ErrorState } from '../components/ui/States.jsx';
import { useConsultation } from '../components/forms/ConsultationProvider.jsx';
import useFetch from '../hooks/useFetch.js';
import { getCategory, getFaqs } from '../api/index.js';
import Icon from '../utils/icons.jsx';
import { breadcrumbSchema, faqSchema } from '../utils/schema.js';
import NotFound from './NotFound.jsx';

export default function Category() {
  const { categorySlug } = useParams();
  const { openConsultation } = useConsultation();
  const { data, loading, error, reload } = useFetch(() => getCategory(categorySlug), [categorySlug], { cacheKey: `cat-${categorySlug}` });
  const faqs = useFetch(() => getFaqs({ category: categorySlug }), [categorySlug]);
  const [q, setQ] = useState('');

  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (data?.groups || []).map((g) => ({ ...g, services: g.services.filter((s) => !term || s.name.toLowerCase().includes(term) || (s.shortDescription || '').toLowerCase().includes(term)) })).filter((g) => g.services.length);
  }, [data, q]);

  if (loading) return <PageLoader />;
  if (error?.status === 404) return <NotFound />;
  if (error) return <div className="container"><ErrorState message={error.message} onRetry={reload} /></div>;

  const { category, services, relatedCategories } = data;
  const popular = services.filter((s) => s.popular).slice(0, 4);
  const path = `/services/${category.slug}`;
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: category.name, to: path }];

  return (
    <>
      <Seo title={category.seo?.title || `${category.name} Services`} description={category.seo?.description || category.shortDescription} path={path}
        schema={[breadcrumbSchema(crumbs), faqs.data?.length ? faqSchema(faqs.data) : null]} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 16 }}>
            <span className="icon-tile" style={{ width: 56, height: 56 }}><Icon name={category.icon} size={28} /></span>
            <div className="eyebrow" style={{ margin: 0 }}>{services.length} services</div>
          </div>
          <h1>{category.name}</h1>
          <p className="lead">{category.shortDescription}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <a href="#all-services" className="btn btn--primary btn--lg">View services</a>
            <button type="button" className="btn btn--secondary btn--lg" onClick={() => openConsultation()}>Talk to an Expert</button>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'start', marginBottom: 64 }}>
            <div>
              <h2>Overview</h2>
              <p className="muted" style={{ fontSize: '1.0625rem' }}>{category.overview}</p>
            </div>
            {popular.length > 0 && (
              <div className="card">
                <h3>Popular in {category.name}</h3>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 8 }}>
                  {popular.map((s) => <li key={s.slug}><Link to={`${path}/${s.slug}`} className="link-arrow">{s.name} <ArrowRight size={14} /></Link></li>)}
                </ul>
              </div>
            )}
          </div>

          <div id="all-services" style={{ scrollMarginTop: 100 }}>
            <div className="svc-group__head" style={{ flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0 }}>All {category.name} services</h2>
              <div style={{ position: 'relative', width: 'min(320px, 100%)' }}>
                <label htmlFor="cat-filter" className="visually-hidden">Filter services</label>
                <Search size={18} style={{ position: 'absolute', left: 14, top: 15, color: 'var(--text-muted)' }} aria-hidden="true" />
                <input id="cat-filter" className="input" style={{ paddingLeft: 40 }} placeholder="Filter…" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
            </div>
            {groups.map((g) => (
              <div className="svc-group" key={g.title} style={{ marginTop: 24 }}>
                {data.groups.length > 1 && <h3 className="eyebrow" style={{ fontSize: '0.8125rem' }}>{g.title}</h3>}
                <div className="grid grid-3">{g.services.map((s) => <ServiceCard key={s._id} service={s} categorySlug={category.slug} />)}</div>
              </div>
            ))}
            {!groups.length && <p className="muted">No services match “{q}”.</p>}
          </div>
        </div>
      </section>

      {category.benefits?.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2>Why handle {category.name.toLowerCase()} with DigiAds</h2>
            <div className="grid grid-3" style={{ marginTop: 24 }}>
              {category.benefits.map((b) => <div className="card" key={b.title}><h3 style={{ fontSize: '1rem' }}>{b.title}</h3><p className="small muted" style={{ margin: 0 }}>{b.description}</p></div>)}
            </div>
            {category.process?.length > 0 && (
              <>
                <h2 style={{ marginTop: 64 }}>How it works</h2>
                <ol className="steps" style={{ listStyle: 'none', marginTop: 24 }}>
                  {category.process.map((s, i) => <li className="step" key={s.title}><div className="step__num">{String(i + 1).padStart(2, '0')}</div><h3>{s.title}</h3><p>{s.description}</p></li>)}
                </ol>
              </>
            )}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 64 }}>
          {faqs.data?.length > 0 && <FAQSection faqs={faqs.data} title={`${category.name} FAQs`} />}
          <div>
            <h2>Related categories</h2>
            <div className="chip-row" style={{ marginTop: 16 }}>
              {relatedCategories.map((c) => <Link key={c.slug} to={`/services/${c.slug}`} className="chip"><Icon name={c.icon} size={16} />{c.name}</Link>)}
            </div>
          </div>
          <CTABanner />
        </div>
      </section>
      <MobileStickyCTA />
    </>
  );
}

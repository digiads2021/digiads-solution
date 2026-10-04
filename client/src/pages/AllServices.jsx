import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import CTABanner from '../components/shared/CTABanner.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { CardSkeletons, EmptyState, ErrorState } from '../components/ui/States.jsx';
import Icon from '../utils/icons.jsx';

// All services, grouped by navigation pillar, with pillar chips and an instant filter.
export default function AllServices() {
  const { navigation, loading, error, reload } = useSite();
  const [params, setParams] = useSearchParams();
  const pillar = params.get('pillar') || 'all';
  const [q, setQ] = useState(params.get('q') || '');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return navigation
      .filter((p) => pillar === 'all' || p.key === pillar)
      .map((p) => ({
        ...p,
        columns: p.columns
          .map((c) => ({ ...c, links: c.links.filter((l) => !term || l.name.toLowerCase().includes(term) || c.title.toLowerCase().includes(term)) }))
          .filter((c) => c.links.length),
      }))
      .filter((p) => p.columns.length);
  }, [navigation, pillar, q]);

  const setPillar = (key) => {
    const next = new URLSearchParams(params);
    if (key === 'all') next.delete('pillar'); else next.set('pillar', key);
    setParams(next, { replace: true });
  };

  return (
    <>
      <Seo title="All Business Services – Registration, Tax, Legal, Technology & UAE" description="Browse every DigiAds service: business registration, GST and income tax, MCA compliance, trademark, FSSAI, ISO, legal documents, website and app development, and UAE company formation." path="/services" />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
          <h1>All services</h1>
          <p className="lead">Everything DigiAds offers, organised by what you’re trying to do.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="filter-bar">
            <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 360 }}>
              <label htmlFor="svc-filter" className="visually-hidden">Filter services</label>
              <Search size={18} style={{ position: 'absolute', left: 14, top: 15, color: 'var(--text-muted)' }} aria-hidden="true" />
              <input id="svc-filter" className="input" style={{ paddingLeft: 40 }} placeholder="Filter services…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="chip-row" role="group" aria-label="Filter by area">
              <button type="button" className="chip" aria-pressed={pillar === 'all'} onClick={() => setPillar('all')}>All</button>
              {navigation.map((p) => <button key={p.key} type="button" className="chip" aria-pressed={pillar === p.key} onClick={() => setPillar(p.key)}>{p.name}</button>)}
            </div>
          </div>
          {loading && <CardSkeletons count={6} />}
          {!loading && error && <ErrorState message="We couldn’t load the service list right now. Please try again in a moment." onRetry={reload} />}
          {!loading && !error && !filtered.length && <EmptyState title="No services match your filter" text="Try a different word, or talk to an expert." />}
          {filtered.map((p) => (
            <div key={p.key} className="svc-group">
              <div className="svc-group__head">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span className="icon-tile"><Icon name={p.icon} size={22} /></span>{p.name}</h2>
              </div>
              <div className="grid grid-3">
                {p.columns.map((c) => (
                  <div className="card" key={c.key}>
                    <h3 style={{ fontSize: '1rem' }}><Link to={`/services/${c.category.slug}`} style={{ color: 'var(--text-primary)' }}>{c.title}</Link></h3>
                    <ul style={{ listStyle: 'none', display: 'grid', gap: 6 }}>
                      {c.links.map((l) => <li key={l.url}><Link to={l.url} className="small">{l.name}</Link></li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 48 }}><CTABanner title="Can’t find what you need?" text="Describe your requirement and we’ll tell you which service fits." /></div>
        </div>
      </section>
    </>
  );
}

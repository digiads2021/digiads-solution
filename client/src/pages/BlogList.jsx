import { useSearchParams } from 'react-router-dom';
import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import BlogCard from '../components/shared/BlogCard.jsx';
import Pagination from '../components/ui/Pagination.jsx';
import { CardSkeletons, ErrorState, EmptyState } from '../components/ui/States.jsx';
import useFetch from '../hooks/useFetch.js';
import { getBlogs } from '../api/index.js';
import { BLOG_CATEGORIES } from '../utils/siteContent.js';

export default function BlogList() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const page = Number(params.get('page')) || 1;
  const { data, loading, error, reload } = useFetch(() => getBlogs({ category: category || undefined, page, limit: 9 }), [category, page]);

  const update = (next) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    setParams(p);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Seo title={category ? `${category} Articles – Knowledge Centre` : 'Knowledge Centre – Business, Tax & Compliance Guides'} description="Practical guides on starting a business, GST, income tax, MCA compliance, trademarks, legal documents, technology and UAE business setup." path={category ? `/blog?category=${encodeURIComponent(category)}` : '/blog'} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
          <h1>Knowledge centre</h1>
          <p className="lead">Plain-language guides on registration, tax, compliance, legal and technology topics.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="chip-row" role="group" aria-label="Filter by category" style={{ marginBottom: 32 }}>
            <button type="button" className="chip" aria-pressed={!category} onClick={() => update({ category: '', page: '' })}>All</button>
            {BLOG_CATEGORIES.map((c) => <button key={c} type="button" className="chip" aria-pressed={category === c} onClick={() => update({ category: c, page: '' })}>{c}</button>)}
          </div>
          {loading && <CardSkeletons count={6} height={220} />}
          {error && <ErrorState message={error.message} onRetry={reload} />}
          {data && !data.data.length && <EmptyState title="No articles yet" text="New guides are on the way. Check back soon." />}
          {data?.data?.length > 0 && (
            <>
              <div className="grid grid-3">{data.data.map((p) => <BlogCard key={p._id} post={p} />)}</div>
              <Pagination page={data.meta.page} pages={data.meta.pages} onChange={(n) => update({ page: String(n) })} />
            </>
          )}
        </div>
      </section>
    </>
  );
}

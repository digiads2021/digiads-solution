import { Link, useParams } from 'react-router-dom';
import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import BlogCard from '../components/shared/BlogCard.jsx';
import ServiceCard from '../components/shared/ServiceCard.jsx';
import CTABanner from '../components/shared/CTABanner.jsx';
import { PageLoader, ErrorState } from '../components/ui/States.jsx';
import useFetch from '../hooks/useFetch.js';
import { getBlog } from '../api/index.js';
import { formatDate, assetUrl } from '../utils/format.js';
import { articleSchema, breadcrumbSchema } from '../utils/schema.js';
import NotFound from './NotFound.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, loading, error, reload } = useFetch(() => getBlog(slug), [slug]);
  if (loading) return <PageLoader />;
  if (error?.status === 404) return <NotFound />;
  if (error) return <div className="container"><ErrorState message={error.message} onRetry={reload} /></div>;

  const path = `/blog/${post.slug}`;
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.title, to: path }];
  return (
    <>
      <Seo title={post.seo?.title || post.title} description={post.seo?.description || post.excerpt} path={post.seo?.canonical || path} type="article"
        image={post.featuredImage?.url ? assetUrl(post.featuredImage.url) : undefined} schema={[articleSchema(post, path), breadcrumbSchema(crumbs)]} />
      <article>
        <header className="page-hero">
          <div className="container" style={{ maxWidth: 860 }}>
            <Breadcrumbs items={crumbs} />
            <div style={{ display: 'flex', gap: 10, marginTop: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="badge">{post.category}</Link>
              <span className="small muted">{formatDate(post.publishedAt)} · {post.author}</span>
            </div>
            <h1>{post.title}</h1>
            {post.excerpt && <p className="lead">{post.excerpt}</p>}
          </div>
        </header>
        <div className="section" style={{ paddingTop: 40 }}>
          <div className="container" style={{ maxWidth: 860 }}>
            {post.featuredImage?.url && <img src={assetUrl(post.featuredImage.url)} alt={post.featuredImage.alt || ''} style={{ borderRadius: 12, marginBottom: 32, width: '100%' }} />}
            {/* Content is sanitized on the server before it is saved */}
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
            {post.tags?.length > 0 && <div className="chip-row" style={{ marginTop: 32 }}>{post.tags.map((t) => <span key={t} className="badge badge--muted">#{t}</span>)}</div>}
          </div>
        </div>
      </article>
      {post.relatedServices?.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2>Services mentioned in this article</h2>
            <div className="grid grid-3" style={{ marginTop: 24 }}>{post.relatedServices.map((s) => <ServiceCard key={s._id} service={s} />)}</div>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 56 }}>
          {post.more?.length > 0 && (
            <div>
              <h2>More in {post.category}</h2>
              <div className="grid grid-3" style={{ marginTop: 24 }}>{post.more.map((p) => <BlogCard key={p._id} post={p} />)}</div>
            </div>
          )}
          <CTABanner />
        </div>
      </section>
    </>
  );
}

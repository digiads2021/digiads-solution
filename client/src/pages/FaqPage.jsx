import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import Accordion from '../components/ui/Accordion.jsx';
import CTABanner from '../components/shared/CTABanner.jsx';
import { CardSkeletons, ErrorState, EmptyState } from '../components/ui/States.jsx';
import useFetch from '../hooks/useFetch.js';
import { getFaqs } from '../api/index.js';
import { faqSchema } from '../utils/schema.js';

export default function FaqPage() {
  const { data, loading, error, reload } = useFetch(() => getFaqs({ scope: 'home,general' }), [], { cacheKey: 'faq-page' });
  return (
    <>
      <Seo title="Frequently Asked Questions" description="Answers to common questions about DigiAds services, process and support." path="/faq" schema={[data?.length ? faqSchema(data) : null]} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />
          <h1>Frequently asked questions</h1>
          <p className="lead">General questions about working with DigiAds. Each service page also has its own FAQs.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          {loading && <CardSkeletons count={5} className="grid" height={64} />}
          {error && <ErrorState message={error.message} onRetry={reload} />}
          {data && (data.length ? <Accordion items={data} /> : <EmptyState title="No FAQs yet" />)}
          <div style={{ marginTop: 56 }}><CTABanner title="Still have a question?" /></div>
        </div>
      </section>
    </>
  );
}

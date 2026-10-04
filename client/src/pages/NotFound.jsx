import { Link } from 'react-router-dom';
import Seo from '../components/shared/Seo.jsx';

export default function NotFound() {
  return (
    <section className="section">
      <Seo title="Page not found" noindex />
      <div className="container center" style={{ maxWidth: 640 }}>
        <div className="eyebrow">Error 404</div>
        <h1>We couldn’t find that page</h1>
        <p className="lead" style={{ margin: '0 auto 24px' }}>The page may have moved. Try searching for a service or start from our services list.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn--primary btn--lg">Go to homepage</Link>
          <Link to="/services" className="btn btn--secondary btn--lg">Browse services</Link>
        </div>
      </div>
    </section>
  );
}

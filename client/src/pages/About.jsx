import { Link } from 'react-router-dom';
import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import CTABanner from '../components/shared/CTABanner.jsx';
import Icon from '../utils/icons.jsx';
import { values, journey } from '../utils/siteContent.js';

export default function About() {
  return (
    <>
      <Seo title="About DigiAds Business Solutions" description="DigiAds is a business solutions partner for registration, compliance, taxation, legal documents, certifications, technology and UAE business setup." path="/about" />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
          <h1>Everything your business needs, under one roof</h1>
          <p className="lead">DigiAds Business Solutions helps entrepreneurs and companies start, comply, protect, build and grow — in India and the UAE.</p>
        </div>
      </section>
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: 'start', gap: 48 }}>
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>Who we are</h2>
            <p>Running a business means dealing with registrations, tax filings, annual compliance, contracts, licences and technology — often with a different vendor for each. DigiAds brings these services together so you can work with one team that understands your business.</p>
            <p>We support founders, small businesses, NGOs and growing companies with business registration, GST and income tax, MCA/ROC compliance, trademarks, FSSAI and import–export licences, ISO certification, legal documents, professional consultation, website and app development, and UAE company formation.</p>
            {/* [ADD VERIFIED COMPANY STORY: founding year, founders, office locations — only verified facts] */}
          </div>
          <div className="card">
            <h3>Our approach</h3>
            <ul className="check-list" style={{ marginTop: 12 }}>
              {['Understand your goal before recommending a service', 'Share a clear document checklist and quote upfront', 'Prepare and review everything before filing', 'Keep you informed at every stage', 'Guide you on what comes next'].map((t) => <li key={t}><Icon name="BadgeCheck" size={18} /><span>{t}</span></li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <h2 className="center">What we value</h2>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {values.map((v) => (
              <div className="card value-card" key={v.title}>
                <span className="icon-tile icon-tile--accent"><Icon name={v.icon} size={22} /></span>
                <div><h3>{v.title}</h3><p>{v.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="center">How we support every stage</h2>
          <div className="grid grid-4" style={{ marginTop: 32 }}>
            {journey.map((j) => (
              <div className="card" key={j.key}>
                <span className="icon-tile"><Icon name={j.icon} size={20} /></span>
                <h3 style={{ fontSize: '1rem', marginTop: 12 }}>{j.title}</h3>
                <p className="small muted" style={{ margin: 0 }}>{j.text}</p>
              </div>
            ))}
          </div>
          <p className="center" style={{ marginTop: 32 }}><Link to="/services" className="btn btn--primary btn--lg">Explore our services</Link></p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}><div className="container"><CTABanner /></div></section>
    </>
  );
}

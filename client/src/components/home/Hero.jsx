import { Link } from 'react-router-dom';
import { Search, Check, Building2, Receipt, ShieldCheck, Earth, CircleCheck } from 'lucide-react';
import { useConsultation } from '../forms/ConsultationProvider.jsx';

// Coded visual (no stock photos): a workflow dashboard with floating service cards.
function HeroVisual() {
  const steps = [
    { icon: Building2, label: 'Company registration', sub: 'Documents · Filing · Certificate', w: '100%' },
    { icon: Receipt, label: 'GST & tax compliance', sub: 'Registration · Monthly returns', w: '72%' },
    { icon: ShieldCheck, label: 'Trademark protection', sub: 'Search · Application · Tracking', w: '48%' },
  ];
  return (
    <div className="hero__visual" aria-hidden="true">
      <div className="hv-card hv-main">
        <div className="hv-main__head">
          <span className="hv-main__title">Your business journey</span>
          <span className="hv-dots"><i /><i /><i /></span>
        </div>
        <div className="hv-steps">
          {steps.map(({ icon: I, label, sub, w }) => (
            <div className="hv-step" key={label}>
              <span className="icon-tile icon-tile--sm"><I size={18} /></span>
              <span className="hv-step__label">{label}<span className="hv-step__sub">{sub}</span></span>
              <div style={{ width: 70 }} className="hv-bar"><i style={{ width: w }} /></div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
          {['Website', 'Mobile App', 'ISO', 'FSSAI', 'IEC'].map((t) => <span key={t} className="badge badge--muted">{t}</span>)}
        </div>
      </div>
      <div className="hv-card hv-float hv-float--1"><span className="icon-tile icon-tile--sm icon-tile--accent"><CircleCheck size={18} /></span> Expert-reviewed filings</div>
      <div className="hv-card hv-float hv-float--2"><span className="icon-tile icon-tile--sm"><Earth size={18} /></span> UAE Free Zone setup</div>
      <div className="hv-card hv-float hv-float--3"><span className="icon-tile icon-tile--sm icon-tile--accent"><Receipt size={18} /></span> GST Registration</div>
    </div>
  );
}

export default function Hero({ onSearch }) {
  const { openConsultation } = useConsultation();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="reveal">
          <div className="eyebrow">Start · Comply · Protect · Build · Go Global</div>
          <h1 id="hero-title">Everything your business needs to <span>start, manage &amp; grow.</span></h1>
          <p className="lead">DigiAds Business Solutions brings business registration, compliance, taxation, legal services, certifications, technology solutions and global business services together in one platform.</p>
          <button type="button" className="hero__search" onClick={onSearch}>
            <Search size={20} aria-hidden="true" />
            <span>What service are you looking for?</span>
            <span className="btn btn--primary btn--sm" style={{ flex: 'none' }}>Search</span>
          </button>
          <div className="hero__ctas">
            <Link to="/services" className="btn btn--primary btn--lg">Explore Services</Link>
            <button type="button" className="btn btn--secondary btn--lg" onClick={() => openConsultation()}>Talk to an Expert</button>
          </div>
          <div className="hero__note">
            <span><Check size={16} aria-hidden="true" /> 150+ services in one place</span>
            <span><Check size={16} aria-hidden="true" /> India &amp; UAE</span>
            <span><Check size={16} aria-hidden="true" /> Online process</span>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

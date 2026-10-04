import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, Receipt, ShieldCheck, Earth, CircleCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useConsultation } from '../forms/ConsultationProvider.jsx';

const WORDS = ['start.', 'comply.', 'protect.', 'build.', 'go global.'];
const STATS = [
  { value: '150+', label: 'Services' },
  { value: '10', label: 'Service areas' },
  { value: 'India & UAE', label: 'Coverage' },
  { value: '100%', label: 'Online process' },
];

// Cycles the highlighted word in the headline (static when the user prefers reduced motion).
function useRotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return WORDS[i];
}

// Coded visual (no stock photos): a workflow dashboard with floating service cards.
function HeroVisual() {
  const steps = [
    { icon: Building2, label: 'Company registration', sub: 'Documents · Filing · Certificate', w: '100%', state: 'Done' },
    { icon: Receipt, label: 'GST & tax compliance', sub: 'Registration · Monthly returns', w: '72%', state: 'In progress' },
    { icon: ShieldCheck, label: 'Trademark protection', sub: 'Search · Application · Tracking', w: '48%', state: 'In progress' },
  ];
  return (
    <div className="hero__visual" aria-hidden="true">
      <div className="hv-orb" />
      <div className="hv-card hv-main">
        <div className="hv-main__head">
          <span className="hv-main__title"><Sparkles size={16} /> Your business journey</span>
          <span className="hv-live"><i /> Live</span>
        </div>
        <div className="hv-steps">
          {steps.map(({ icon: I, label, sub, w, state }) => (
            <div className="hv-step" key={label}>
              <span className="hv-step__icon"><I size={18} /></span>
              <span className="hv-step__label">{label}<span className="hv-step__sub">{sub}</span></span>
              <span className="hv-step__meta">
                <span className={`hv-state ${state === 'Done' ? 'hv-state--done' : ''}`}>{state}</span>
                <span className="hv-bar"><i style={{ '--w': w }} /></span>
              </span>
            </div>
          ))}
        </div>
        <div className="hv-tags">
          {['Website', 'Mobile App', 'ISO', 'FSSAI', 'IEC'].map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
      <div className="hv-card hv-float hv-float--1"><span className="hv-float__icon hv-float__icon--teal"><CircleCheck size={18} /></span> Expert-reviewed filings</div>
      <div className="hv-card hv-float hv-float--2"><span className="hv-float__icon hv-float__icon--blue"><Earth size={18} /></span> UAE Free Zone setup</div>
      <div className="hv-card hv-float hv-float--3"><span className="hv-float__icon hv-float__icon--amber"><Receipt size={18} /></span> GST Registration</div>
    </div>
  );
}

export default function Hero({ onSearch }) {
  const { openConsultation } = useConsultation();
  const word = useRotatingWord();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="container hero__grid">
        <div className="hero__copy reveal">
          <div className="hero__pill"><span className="hero__pill-dot" /> Business services for India &amp; the UAE</div>
          <h1 id="hero-title">
            Everything your business needs to
            <span className="hero__rot" aria-hidden="true"><span key={word}>{word}</span></span>
            <span className="visually-hidden">start, comply, protect, build and go global.</span>
          </h1>
          <p className="lead">DigiAds Business Solutions brings business registration, compliance, taxation, legal services, certifications, technology solutions and global business services together in one platform.</p>
          <button type="button" className="hero__search" onClick={onSearch}>
            <Search size={20} aria-hidden="true" />
            <span>What service are you looking for?</span>
            <span className="hero__search-btn">Search</span>
          </button>
          <div className="hero__ctas">
            <Link to="/services" className="btn btn--glow btn--lg">Explore Services <ArrowRight size={18} aria-hidden="true" /></Link>
            <button type="button" className="btn btn--outline-white btn--lg" onClick={() => openConsultation()}>Talk to an Expert</button>
          </div>
        </div>
        <HeroVisual />
      </div>
      <div className="container">
        <dl className="hero__stats">
          {STATS.map((s) => (
            <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

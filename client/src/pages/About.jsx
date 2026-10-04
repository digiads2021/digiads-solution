import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import Icon from '../utils/icons.jsx';
import { values, journey } from '../utils/siteContent.js';
import { useConsultation } from '../components/forms/ConsultationProvider.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import useOffscreenPause from '../hooks/useOffscreenPause.js';

const STATS = [
  { value: '150+', label: 'Services' },
  { value: '10', label: 'Service areas' },
  { value: 'India & UAE', label: 'Coverage' },
  { value: '100%', label: 'Online process' },
];

// The five things DigiAds helps with, each linked to its service pillar.
const PILLARS = [
  { word: 'Start', text: 'Register your company, firm, NGO or startup.', icon: 'Building2', pillar: 'registration', tone: 'blue' },
  { word: 'Comply', text: 'GST, income tax, MCA filings and payroll.', icon: 'Receipt', pillar: 'tax-compliance', tone: 'teal' },
  { word: 'Protect', text: 'Trademarks, agreements and legal notices.', icon: 'ShieldCheck', pillar: 'legal-ip', tone: 'violet' },
  { word: 'Build', text: 'Websites, web apps and mobile apps.', icon: 'MonitorSmartphone', pillar: 'technology', tone: 'amber' },
  { word: 'Go Global', text: 'UAE company formation, licences and PRO services.', icon: 'Globe2', pillar: 'global', tone: 'rose' },
];

const APPROACH = [
  { title: 'Understand your goal', text: 'We listen first, then recommend the service that actually fits.' },
  { title: 'Clear checklist and quote', text: 'You get the document checklist and the fee upfront.' },
  { title: 'Prepare and review', text: 'Everything is prepared and checked before it is filed.' },
  { title: 'Keep you informed', text: 'Updates at every stage, without visiting an office.' },
  { title: 'Guide what comes next', text: 'Renewals, filings and the next step for your business.' },
];

const AUDIENCE = [
  { label: 'Founders & startups', icon: 'Rocket' },
  { label: 'Small businesses', icon: 'Briefcase' },
  { label: 'NGOs, societies & trusts', icon: 'HeartHandshake' },
  { label: 'Growing companies', icon: 'Building2' },
  { label: 'Businesses expanding to the UAE', icon: 'Globe2' },
];

function HeroBoard() {
  return (
    <div className="ab-board" aria-hidden="true">
      <div className="ab-board__glow" />
      <div className="ab-board__card">
        <div className="ab-board__head"><Sparkles size={16} /> One partner, five ways we help</div>
        <ol className="ab-board__list">
          {PILLARS.map((p, i) => (
            <li key={p.word} className={`ab-tone--${p.tone}`} style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
              <span className="ab-board__icon"><Icon name={p.icon} size={18} /></span>
              <span className="ab-board__text"><strong>{p.word}</strong><small>{p.text}</small></span>
            </li>
          ))}
        </ol>
      </div>
      <span className="ab-chip ab-chip--1"><i /> India</span>
      <span className="ab-chip ab-chip--2"><i /> UAE</span>
    </div>
  );
}

export default function About() {
  const { openConsultation } = useConsultation();
  useScrollReveal('.about > .section');
  const heroRef = useRef(null);
  useOffscreenPause(heroRef);

  return (
    <div className="about">
      <Seo title="About DigiAds Business Solutions" description="DigiAds is a business solutions partner for registration, compliance, taxation, legal documents, certifications, technology and UAE business setup." path="/about" />

      {/* ---------- Hero ---------- */}
      <section ref={heroRef} className="ab-hero" aria-labelledby="about-title">
        <div className="hero__bg" aria-hidden="true"><i /><i /><i /></div>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
          <div className="ab-hero__grid">
            <div className="reveal">
              <div className="hero__pill"><span className="hero__pill-dot" /> About DigiAds Business Solutions</div>
              <h1 id="about-title">Everything your business needs, <span className="ab-hero__grad">under one roof</span></h1>
              <p className="lead">DigiAds Business Solutions helps entrepreneurs and companies start, comply, protect, build and grow — in India and the UAE.</p>
              <div className="hero__ctas">
                <Link to="/services" className="btn btn--glow btn--lg">Explore our services <ArrowRight size={18} aria-hidden="true" /></Link>
                <button type="button" className="btn btn--outline-white btn--lg" onClick={() => openConsultation()}>Talk to an Expert</button>
              </div>
            </div>
            <HeroBoard />
          </div>
          <dl className="hero__stats">
            {STATS.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}
          </dl>
        </div>
      </section>

      {/* ---------- Who we are + approach ---------- */}
      <section className="section" aria-labelledby="who-title">
        <div className="container ab-who">
          <div>
            <div className="eyebrow">Who we are</div>
            <h2 id="who-title">One team that <span className="text-gradient">understands your business</span></h2>
            <div className="prose">
              <p>Running a business means dealing with registrations, tax filings, annual compliance, contracts, licences and technology — often with a different vendor for each. DigiAds brings these services together so you can work with one team that understands your business.</p>
              <p>We support founders, small businesses, NGOs and growing companies with business registration, GST and income tax, MCA/ROC compliance, trademarks, FSSAI and import–export licences, ISO certification, legal documents, professional consultation, website and app development, and UAE company formation.</p>
            </div>
            {/* [ADD VERIFIED COMPANY STORY: founding year, founders, office locations — only verified facts] */}
          </div>
          <div className="ab-approach">
            <h3>Our approach</h3>
            <ol>
              {APPROACH.map((a, i) => (
                <li key={a.title}>
                  <span className="ab-approach__num">{String(i + 1).padStart(2, '0')}</span>
                  <div><strong>{a.title}</strong><p>{a.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- What we do ---------- */}
      <section className="section section--alt" aria-labelledby="do-title">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">What we do</div>
            <h2 id="do-title">Five ways we help your business</h2>
            <p className="lead">From your first registration to your first international office — each area handled by people who do it every day.</p>
          </div>
          <div className="ab-pillars">
            {PILLARS.map((p) => (
              <Link key={p.word} to={`/services?pillar=${p.pillar}`} className={`ab-pillar ab-tone--${p.tone}`}>
                <span className="ab-pillar__icon"><Icon name={p.icon} size={22} /></span>
                <strong>{p.word}</strong>
                <p>{p.text}</p>
                <span className="ab-pillar__link">Explore <ArrowRight size={14} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">What we value</div>
            <h2 id="values-title">How we work with every client</h2>
          </div>
          <div className="grid grid-3">
            {values.map((v) => (
              <div className="card value-card" key={v.title}>
                <span className="icon-tile icon-tile--accent"><Icon name={v.icon} size={22} /></span>
                <div><h3>{v.title}</h3><p>{v.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Journey ---------- */}
      <section className="section section--dark ab-journey" aria-labelledby="journey-title">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">Business lifecycle</div>
            <h2 id="journey-title">Your partner at every stage</h2>
            <p className="lead">The same team stays with you as your business moves from an idea to a company operating across borders.</p>
          </div>
          <ol className="ab-timeline">
            {journey.map((j, i) => (
              <li key={j.key}>
                <span className="ab-timeline__dot"><Icon name={j.icon} size={18} /></span>
                <span className="ab-timeline__step">Step {i + 1} · {j.label}</span>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Who we work with ---------- */}
      <section className="section" aria-labelledby="aud-title">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">Who we work with</div>
            <h2 id="aud-title">Built for businesses of every size</h2>
          </div>
          <ul className="ab-audience">
            {AUDIENCE.map((a) => (
              <li key={a.label}><span className="icon-tile icon-tile--sm"><Icon name={a.icon} size={18} /></span>{a.label}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="ab-cta-title">
        <div className="container">
          <div className="ab-cta">
            <div>
              <div className="eyebrow">Free guidance</div>
              <h2 id="ab-cta-title">Let’s talk about your business</h2>
              <p>Tell us what you’re trying to achieve. We’ll suggest the right service and explain the next steps — before you commit to anything.</p>
            </div>
            <div className="ab-cta__actions">
              <button type="button" className="btn btn--white btn--lg" onClick={() => openConsultation()}>Talk to an Expert</button>
              <Link to="/contact" className="btn btn--outline-white btn--lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

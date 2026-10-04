// Smaller homepage sections grouped in one file for easy navigation.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import Icon from '../../utils/icons.jsx';
import SectionHead from '../shared/SectionHead.jsx';
import CategoryCard from '../shared/CategoryCard.jsx';
import ServiceCard from '../shared/ServiceCard.jsx';
import BlogCard from '../shared/BlogCard.jsx';
import FAQSection from '../shared/FAQSection.jsx';
import ConsultationForm from '../forms/ConsultationForm.jsx';
import { CardSkeletons, ErrorState } from '../ui/States.jsx';
import { quickActions, pillarWords, values, intents, journey, howItWorks } from '../../utils/siteContent.js';
import { assetUrl } from '../../utils/format.js';
import useFetch from '../../hooks/useFetch.js';
import { getServices } from '../../api/index.js';

export function QuickActions() {
  return (
    <section className="quick" aria-label="Quick actions">
      <div className="container quick__grid">
        {quickActions.map((q) => (
          <Link key={q.label} to={q.to} className="quick__item">
            <span className="icon-tile icon-tile--sm"><Icon name={q.icon} size={18} /></span>
            {q.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PillarStrip() {
  return (
    <section className="section" style={{ paddingBottom: 0 }} aria-label="What we help with">
      <div className="container">
        <div className="pillars">
          {pillarWords.map((p) => (
            <div className="pillar" key={p.word}>
              <div className="pillar__word"><i aria-hidden="true" />{p.word}</div>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyDigiAds() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <SectionHead id="why-title" eyebrow="Why DigiAds" title="Why businesses choose DigiAds" lead="One accountable team for legal, tax, compliance, technology and global setup — so you never have to re-explain your business to a new vendor." center />
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
  );
}

export function CategoryGrid({ categories, loading, error, onRetry }) {
  return (
    <section className="section section--alt" aria-labelledby="cat-title" id="solutions">
      <div className="container">
        <SectionHead id="cat-title" eyebrow="Our services" title="Solutions for every stage of your business" lead="Ten service areas covering everything from your first registration to your UAE expansion." action={<Link to="/services" className="btn btn--secondary">View all services</Link>} />
        {loading && <CardSkeletons count={10} className="cat-grid" height={260} />}
        {error && <ErrorState message={error.message} onRetry={onRetry} />}
        {categories && <div className="cat-grid">{categories.map((c) => <CategoryCard key={c._id} category={c} />)}</div>}
      </div>
    </section>
  );
}

export function PopularServices({ services, loading }) {
  const pillars = [
    { key: 'all', label: 'All' }, { key: 'registration', label: 'Registration' }, { key: 'tax-compliance', label: 'Tax & Compliance' },
    { key: 'legal-ip', label: 'Legal & IP' }, { key: 'licences-iso', label: 'Licences & ISO' }, { key: 'technology', label: 'Technology' }, { key: 'global', label: 'Global' },
  ];
  const [tab, setTab] = useState('all');
  const shown = (services || []).filter((s) => tab === 'all' || s.pillar === tab).slice(0, 12);
  return (
    <section className="section" aria-labelledby="popular-title">
      <div className="container">
        <SectionHead id="popular-title" eyebrow="Most requested" title="Most requested services" />
        <div className="tabs" role="group" aria-label="Filter popular services">
          {pillars.map((p) => <button key={p.key} type="button" className="chip" aria-pressed={tab === p.key} onClick={() => setTab(p.key)}>{p.label}</button>)}
        </div>
        {loading ? <CardSkeletons count={8} className="grid grid-4" /> : (
          <div className="grid grid-4">{shown.map((s) => <ServiceCard key={s._id} service={s} />)}</div>
        )}
      </div>
    </section>
  );
}

export function IntentTiles() {
  return (
    <section className="section section--alt" aria-labelledby="intent-title">
      <div className="container">
        <SectionHead id="intent-title" eyebrow="Start here" title="I need help with…" center />
        <div className="grid grid-3">
          {intents.map((i) => (
            <Link key={i.label} to={i.to} className="card card--hover intent">
              <span className="icon-tile"><Icon name={i.icon} size={22} /></span>
              <span className="intent__label">{i.label}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BusinessJourney() {
  const [active, setActive] = useState('register');
  const stage = journey.find((j) => j.key === active);
  // Services for the selected stage are fetched on demand (and cached per stage).
  const { data, loading } = useFetch(() => getServices({ lifecycleStage: active, limit: 8 }), [active], { cacheKey: `stage-${active}` });
  const links = data?.data || [];
  return (
    <section className="section" aria-labelledby="journey-title">
      <div className="container">
        <SectionHead id="journey-title" eyebrow="Business lifecycle" title="One partner from idea to expansion" lead="Pick a stage to see how DigiAds helps." center />
        <div className="journey__track" role="tablist" aria-label="Business stages">
          {journey.map((j) => (
            <button key={j.key} type="button" role="tab" id={`tab-${j.key}`} aria-controls="journey-panel" aria-selected={active === j.key} className="journey__stage" onClick={() => setActive(j.key)}>
              <span className="journey__dot"><Icon name={j.icon} size={20} /></span>
              {j.label}
            </button>
          ))}
        </div>
        <div className="journey__panel" id="journey-panel" role="tabpanel" aria-labelledby={`tab-${active}`} key={active}>
          <div>
            <div className="eyebrow">Stage: {stage.label}</div>
            <h3>{stage.title}</h3>
            <p className="muted">{stage.text}</p>
          </div>
          <div className="journey__links" aria-busy={loading}>
            {loading && !links.length && <CardSkeletons count={4} className="journey__links" height={46} />}
            {links.map((s) => <Link key={s.slug} to={`/services/${s.category?.slug}/${s.slug}`}>{s.name}<ArrowRight size={16} aria-hidden="true" /></Link>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="section section--alt" aria-labelledby="how-title">
      <div className="container">
        <SectionHead id="how-title" eyebrow="How it works" title="Simple, guided and online" center />
        <ol className="steps" style={{ listStyle: 'none' }}>
          {howItWorks.map((s, i) => (
            <li className="step" key={s.title}>
              <div className="step__num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TechnologySection({ services }) {
  const featured = ['business-website-development', 'corporate-website-development', 'e-commerce-website-development', 'crm-development', 'custom-web-application', 'android-ios-app-development', 'ui-ux-design', 'api-integration', 'payment-gateway-integration', 'whatsapp-integration'];
  const list = featured.map((slug) => services?.find((s) => s.slug === slug)).filter(Boolean);
  return (
    <section className="section section--dark tech" aria-labelledby="tech-title">
      <div className="container tech__grid">
        <div>
          <div className="eyebrow">Technology</div>
          <h2 id="tech-title">Build the digital future of your business</h2>
          <p className="lead">Websites, web applications and mobile apps designed around how your business works — plus the integrations that connect them.</p>
          <Link to="/services/website-app-development" className="btn btn--white btn--lg" style={{ marginTop: 8 }}>Build Your Digital Product</Link>
        </div>
        <div className="tech__tiles">
          {list.map((s) => (
            <Link key={s.slug} to={`/services/website-app-development/${s.slug}`} className="tech__tile">
              <Icon name={s.icon} size={20} />{s.name.replace(' Development', '')}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GlobalSection() {
  const cards = [
    { title: 'UAE Mainland', slug: 'uae-mainland-company-formation', text: 'Trade directly across the UAE market.', places: ['Dubai', 'Abu Dhabi', 'Ajman', 'Sharjah'] },
    { title: 'UAE Free Zone', slug: 'uae-free-zone-company-formation', text: 'Full foreign ownership in a free zone.', places: ['Dubai', 'IFZA', 'Abu Dhabi', 'RAK', 'Sharjah', 'Ajman'] },
    { title: 'UAE Offshore', slug: 'uae-offshore-company-formation', text: 'For holding and international business.', places: ['Dubai', 'Jebel Ali', 'RAK', 'Ajman'] },
  ];
  const extra = [
    ['Trade Licences', 'commercial-trade-license'], ['Branch Office', 'branch-office-establishment'], ['Golden Visa', 'golden-visa'],
    ['Investor Visa', 'investor-visa'], ['PRO Services', 'pro-government-services'], ['Virtual Office', 'virtual-office'],
  ];
  return (
    <section className="section" aria-labelledby="global-title">
      <div className="container">
        <SectionHead id="global-title" eyebrow="Global business" title="Take your business beyond borders" lead="Company formation, trade licences, visas and office solutions in the UAE." action={<Link to="/services/global-business" className="btn btn--primary">Explore Global Business</Link>} />
        <div className="grid grid-3">
          {cards.map((c) => (
            <Link key={c.slug} to={`/services/global-business/${c.slug}`} className="card card--hover global-card" style={{ color: 'inherit', textDecoration: 'none' }}>
              <span className="icon-tile"><Icon name="Landmark" size={22} /></span>
              <h3 style={{ margin: 0 }}>{c.title}</h3>
              <p className="small muted" style={{ margin: 0 }}>{c.text}</p>
              <ul aria-label="Locations">{c.places.map((p) => <li key={p}>{p}</li>)}</ul>
            </Link>
          ))}
        </div>
        <div className="global-extra">
          {extra.map(([label, slug]) => <Link key={slug} className="chip" to={`/services/global-business/${slug}`}>{label}</Link>)}
        </div>
      </div>
    </section>
  );
}

// Hidden entirely when there are no real, published testimonials.
export function Testimonials({ items }) {
  if (!items?.length) return null;
  return (
    <section className="section section--alt" aria-labelledby="t-title">
      <div className="container">
        <SectionHead id="t-title" eyebrow="Client stories" title="What our clients say" center />
        <div className="grid grid-3">
          {items.map((t) => (
            <figure className="card testimonial" key={t._id} style={{ margin: 0 }}>
              {t.rating ? <div className="testimonial__stars" aria-label={`${t.rating} out of 5`}>{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div> : null}
              <blockquote>“{t.text}”</blockquote>
              <figcaption className="testimonial__who">
                {t.photo && <img src={assetUrl(t.photo)} alt="" loading="lazy" width="44" height="44" />}
                <div><strong>{t.name}</strong><div className="muted small">{[t.company, t.serviceName].filter(Boolean).join(' · ')}</div></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConsultationCTA() {
  return (
    <section className="section" aria-labelledby="consult-title">
      <div className="container">
        <div className="consult">
          <div>
            <div className="eyebrow">Free guidance</div>
            <h2 id="consult-title">Not sure which service you need?</h2>
            <p className="lead">Tell DigiAds what you’re trying to achieve. We’ll help you identify the right service and explain the next steps — before you commit to anything.</p>
          </div>
          <div className="card" data-hide-sticky><ConsultationForm compact /></div>
        </div>
      </div>
    </section>
  );
}

export function FaqAndArticles({ faqs, posts }) {
  return (
    <section className="section section--alt" aria-label="FAQs and guides">
      <div className="container home-split">
        <div>
          <FAQSection faqs={faqs} title="Common questions" id="home-faq" />
          <Link to="/faq" className="link-arrow" style={{ marginTop: 16 }}>See all FAQs <ArrowRight size={16} /></Link>
        </div>
        {posts?.length > 0 && (
          <div>
            <h2>Guides &amp; insights</h2>
            <div className="blog-mini">{posts.map((p) => <BlogCard key={p._id} post={p} compact />)}</div>
            <Link to="/blog" className="link-arrow" style={{ marginTop: 16 }}>Visit the knowledge centre <ArrowRight size={16} /></Link>
          </div>
        )}
      </div>
    </section>
  );
}

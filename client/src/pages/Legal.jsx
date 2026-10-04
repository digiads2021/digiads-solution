import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import Seo from '../components/shared/Seo.jsx';
import PageHeroDark from '../components/shared/PageHeroDark.jsx';
import Icon from '../utils/icons.jsx';
import { useConsultation } from '../components/forms/ConsultationProvider.jsx';

// Template legal pages. IMPORTANT: have these reviewed by a lawyer before going live.
const pages = {
  'privacy-policy': {
    title: 'Privacy Policy',
    icon: 'ShieldCheck',
    summary: 'How DigiAds collects, uses and protects the information you share with us.',
    body: [
      ['Information we collect', 'When you submit a form on this website we collect the details you provide, such as your name, phone number, email address, city and message, along with the page you submitted it from.'],
      ['How we use it', 'We use this information to respond to your enquiry, provide the services you request, and send updates you have subscribed to. We do not sell your personal information.'],
      ['Sharing', 'We may share information with government portals, authorities or professionals only as required to deliver the service you have asked for, or where required by law.'],
      ['Data security', 'We take reasonable technical and organisational measures to protect your information.'],
      ['Your choices', 'You can ask us to update or delete your information, or unsubscribe from emails at any time, by contacting us at [ADD VERIFIED EMAIL].'],
      ['Updates', 'We may update this policy from time to time. The latest version will always be available on this page.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    icon: 'ScrollText',
    summary: 'The terms that apply when you use this website and the services of DigiAds.',
    body: [
      ['Use of the website', 'The content on this website is for general information. It is not legal, tax or financial advice for your specific situation.'],
      ['Services', 'The scope, fees and timelines for any service are confirmed with you before work begins. Government fees and approvals are decided by the respective authorities.'],
      ['No guarantee of approval', 'DigiAds prepares and submits applications on your behalf but cannot guarantee approval by any government authority or third party.'],
      ['Your responsibilities', 'You agree to provide accurate and complete information and documents.'],
      ['Intellectual property', 'Website content, design and logos belong to DigiAds Business Solutions unless stated otherwise.'],
      ['Governing law', '[ADD GOVERNING LAW AND JURISDICTION – to be confirmed by your lawyer]'],
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    icon: 'RefreshCw',
    summary: 'When refunds apply and how to request one.',
    body: [
      ['Overview', '[ADD VERIFIED REFUND POLICY] Describe when refunds are available, for example before work has started, and how government fees already paid are handled.'],
      ['Government fees', 'Government fees and third-party charges paid on your behalf are generally not refundable once paid.'],
      ['How to request', 'Write to [ADD VERIFIED EMAIL] with your order details.'],
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    icon: 'Scale',
    summary: 'Important information about the nature of our services and the content on this website.',
    body: [
      ['Not a government body', 'DigiAds Business Solutions is a private professional services provider. We are not affiliated with or endorsed by any government department.'],
      ['General information', 'Information on this website is general guidance and may change with new laws and notifications. Please consult a professional for advice on your specific situation.'],
      ['No guarantee', 'Approvals, registrations and timelines depend on the respective authorities and the documents provided.'],
    ],
  },
};

const ORDER = [
  ['privacy-policy', 'Privacy Policy'], ['terms', 'Terms of Use'], ['refund-policy', 'Refund Policy'], ['disclaimer', 'Disclaimer'],
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Highlights the section currently in view.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    setActive(ids[0]);
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-110px 0px -60% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

export default function Legal({ page }) {
  const p = pages[page];
  const { openConsultation } = useConsultation();
  const sections = p.body.map(([h]) => ({ id: `sec-${slug(h)}`, label: h }));
  const active = useActiveSection(sections.map((s) => s.id));

  return (
    <div className="legal-page">
      <Seo title={p.title} path={`/${page}`} />
      <PageHeroDark
        narrow
        crumbs={[{ label: 'Home', to: '/' }, { label: p.title }]}
        icon={p.icon}
        title={p.title}
        lead={p.summary}
      >
        <nav className="lg-tabs" aria-label="Policies">
          {ORDER.map(([key, label]) => (
            <Link key={key} to={`/${key}`} aria-current={key === page ? 'page' : undefined}>{label}</Link>
          ))}
        </nav>
      </PageHeroDark>

      <section className="section lg-main">
        <div className="container lg-grid">
          <aside className="lg-toc" aria-label="On this page">
            <h2>On this page</h2>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>
                    <span>{String(i + 1).padStart(2, '0')}</span>{s.label}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="lg-doc">
            {p.body.map(([h, t], i) => (
              <section key={h} id={sections[i].id} className="lg-sec">
                <span className="lg-sec__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{h}</h2>
                  <p>{t}</p>
                </div>
              </section>
            ))}

            <div className="lg-help">
              <div>
                <h2>Questions about this policy?</h2>
                <p>Our team is happy to explain how it applies to you.</p>
              </div>
              <div className="lg-help__actions">
                <Link to="/contact" className="btn btn--white"><Mail size={16} aria-hidden="true" /> Contact us</Link>
                <button type="button" className="btn btn--outline-white" onClick={() => openConsultation()}><MessageCircle size={16} aria-hidden="true" /> Talk to an Expert</button>
              </div>
            </div>

            <div className="lg-more">
              <h3>Other policies</h3>
              <div className="lg-more__grid">
                {ORDER.filter(([key]) => key !== page).map(([key, label]) => (
                  <Link key={key} to={`/${key}`} className="lg-more__card">
                    <span className="icon-tile icon-tile--sm"><Icon name={pages[key].icon} size={18} /></span>
                    <span>{label}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

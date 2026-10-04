import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, HelpCircle, Share2 } from 'lucide-react';
import Seo from '../components/shared/Seo.jsx';
import PageHeroDark from '../components/shared/PageHeroDark.jsx';
import ContactForm from '../components/forms/ContactForm.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { useConsultation } from '../components/forms/ConsultationProvider.jsx';
import { telHref } from '../utils/siteContent.js';
import SocialLinks from '../components/shared/SocialLinks.jsx';

const NEXT_STEPS = [
  { title: 'We review your message', text: 'Your enquiry reaches the right person on our team.' },
  { title: 'An expert gets in touch', text: 'We understand your goal before recommending anything.' },
  { title: 'Clear checklist and quote', text: 'You know the documents and fees before work begins.' },
];

export default function Contact() {
  const { settings } = useSite();
  const { openConsultation } = useConsultation();
  const c = settings?.contact || {};

  // Only details that exist are shown; working hours and offices appear once added in Admin > Settings.
  const quick = [
    c.phone && { icon: Phone, label: 'Call us', value: c.phone, href: telHref(c.phone), tone: 'blue' },
    c.email && { icon: Mail, label: 'Email us', value: c.email, href: `mailto:${c.email}`, tone: 'teal' },
    c.hours && { icon: Clock, label: 'Working hours', value: c.hours, tone: 'violet' },
  ].filter(Boolean);
  const offices = [
    { label: 'India office', value: c.addressIndia },
    { label: 'UAE office', value: c.addressUAE },
  ].filter((o) => o.value);

  return (
    <div className="contact-page">
      <Seo title="Contact DigiAds" description="Contact DigiAds Business Solutions for registration, compliance, legal, technology and UAE business services." path="/contact" />

      <PageHeroDark
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        pill="We’re here to help"
        title={<>Let’s talk about <span className="dk-hero__grad">your business</span></>}
        lead="Send us a message and we’ll get back to you. For a quick callback about a specific service, use “Talk to an Expert”."
      >
        <div className="hero__ctas">
          <button type="button" className="btn btn--glow btn--lg" onClick={() => openConsultation()}>
            <MessageCircle size={18} aria-hidden="true" /> Talk to an Expert
          </button>
          <a href="#contact-form" className="btn btn--outline-white btn--lg">Send a message</a>
        </div>
      </PageHeroDark>

      {/* Quick contact tiles overlapping the hero */}
      <section className="ct-quick" aria-label="Contact details">
        <div className="container ct-quick__grid">
          {quick.map(({ icon: I, label, value, href, tone }) => {
            const body = (
              <>
                <span className="ct-quick__icon"><I size={20} aria-hidden="true" /></span>
                <span className="ct-quick__text">
                  <small>{label}</small>
                  <strong>{value}</strong>
                </span>
                {href && <ArrowRight size={16} className="ct-quick__arrow" aria-hidden="true" />}
              </>
            );
            return href
              ? <a key={label} href={href} className={`ct-quick__item ab-tone--${tone}`}>{body}</a>
              : <div key={label} className={`ct-quick__item ab-tone--${tone}`}>{body}</div>;
          })}
          {!c.hours && (
            <div className="ct-quick__item ab-tone--violet">
              <span className="ct-quick__icon"><Share2 size={20} aria-hidden="true" /></span>
              <span className="ct-quick__text"><small>Follow us</small><SocialLinks size={15} className="ct-quick__social" /></span>
            </div>
          )}
        </div>
      </section>

      <section className="section ct-main">
        <div className="container ct-grid">
          <div className="ct-form" id="contact-form" data-hide-sticky>
            <h2>Send a message</h2>
            <p className="muted">Fill in the form and our team will get back to you.</p>
            <ContactForm />
          </div>

          <aside className="ct-side">
            <div className="ct-card ct-callback">
              <span className="ct-callback__icon"><MessageCircle size={22} aria-hidden="true" /></span>
              <h3>Prefer a callback?</h3>
              <p>Tell us which service you need and an expert will call you.</p>
              <button type="button" className="btn btn--white btn--block" onClick={() => openConsultation()}>Talk to an Expert</button>
            </div>

            <div className="ct-card">
              <h3>What happens next</h3>
              <ol className="ct-steps">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s.title}>
                    <span>{i + 1}</span>
                    <div><strong>{s.title}</strong><p>{s.text}</p></div>
                  </li>
                ))}
              </ol>
            </div>

            {offices.length > 0 && (
              <div className="ct-card">
                <h3>Our offices</h3>
                <ul className="ct-offices">
                  {offices.map((o) => (
                    <li key={o.label}>
                      <span className="icon-tile icon-tile--sm"><MapPin size={18} aria-hidden="true" /></span>
                      <div><small>{o.label}</small><span>{o.value}</span></div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="ct-card">
              <h3>Follow DigiAds</h3>
              <p className="small muted" style={{ margin: '0 0 12px' }}>Business tips, compliance reminders and updates.</p>
              <SocialLinks />
            </div>

            <Link to="/faq" className="ct-faq">
              <HelpCircle size={20} aria-hidden="true" />
              <span><strong>Have a quick question?</strong><small>Browse answers to common questions</small></span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

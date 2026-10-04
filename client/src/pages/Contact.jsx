import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import ContactForm from '../components/forms/ContactForm.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { PLACEHOLDER } from '../utils/siteContent.js';

export default function Contact() {
  const { settings } = useSite();
  const c = settings?.contact || {};
  const rows = [
    { icon: Phone, label: 'Phone', value: c.phone, href: c.phone && `tel:${c.phone}`, ph: PLACEHOLDER.phone },
    { icon: Mail, label: 'Email', value: c.email, href: c.email && `mailto:${c.email}`, ph: PLACEHOLDER.email },
    { icon: MapPin, label: 'Office (India)', value: c.addressIndia, ph: PLACEHOLDER.address },
    { icon: MapPin, label: 'Office (UAE)', value: c.addressUAE, ph: '[ADD VERIFIED UAE ADDRESS]' },
    { icon: Clock, label: 'Working hours', value: c.hours, ph: '[ADD WORKING HOURS]' },
  ];
  return (
    <>
      <Seo title="Contact DigiAds" description="Contact DigiAds Business Solutions for registration, compliance, legal, technology and UAE business services." path="/contact" />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
          <h1>Contact us</h1>
          <p className="lead">Send us a message and we’ll get back to you. For a quick callback about a specific service, use “Talk to an Expert”.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container contact-grid">
          <div className="card" style={{ padding: 32 }} data-hide-sticky>
            <h2 style={{ fontSize: '1.375rem' }}>Send a message</h2>
            <ContactForm />
          </div>
          <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
            {rows.map(({ icon: I, label, value, href, ph }) => (
              <div className="card" key={label} style={{ display: 'flex', gap: 16 }}>
                <span className="icon-tile"><I size={20} aria-hidden="true" /></span>
                <div>
                  <div className="small muted" style={{ fontWeight: 600 }}>{label}</div>
                  {value ? (href ? <a href={href}>{value}</a> : <span>{value}</span>) : <span className="muted">{ph}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo.jsx';
import NewsletterForm from '../forms/NewsletterForm.jsx';
import { useSite } from '../../context/SiteContext.jsx';
import { telHref, waLink, TAGLINE } from '../../utils/siteContent.js';
import WhatsAppIcon from '../shared/WhatsAppIcon.jsx';
import SocialLinks from '../shared/SocialLinks.jsx';
import DownloadApp from './DownloadApp.jsx';

export default function Footer() {
  const { navigation, settings } = useSite();
  const c = settings?.contact || {};
  const year = new Date().getFullYear();
  // Footer service columns come from the navigation API (no hard-coded lists).
  const pillarsToShow = navigation.slice(0, 3);
  const morePillars = navigation.slice(3);

  return (
    <footer className="footer">
      <div className="footer__news">
        <div className="container">
          <div>
            <h2>Stay updated on compliance and business tips</h2>
            <p>Occasional emails on deadlines, new rules and guides. Unsubscribe anytime.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <Logo light />
            <p className="footer__tagline">{settings?.tagline || TAGLINE}</p>
            <p>Registration, compliance, legal, technology and UAE business services under one roof.</p>
            <ul className="footer__contact">
              {c.phone && <li><Phone size={16} aria-hidden="true" /> <a href={telHref(c.phone)}>{c.phone}</a></li>}
              {c.whatsapp && <li><WhatsAppIcon size={16} /> <a href={waLink(c.whatsapp, 'Hi DigiAds, I would like to know more about your services.')} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>}
              {c.email && <li><Mail size={16} aria-hidden="true" /> <a href={`mailto:${c.email}`}>{c.email}</a></li>}
              {c.addressIndia && <li><MapPin size={16} aria-hidden="true" /> {c.addressIndia}</li>}
            </ul>
            <SocialLinks variant="dark" className="footer__social" />
          </div>
          {pillarsToShow.map((p) => (
            <div key={p.key}>
              <h3>{p.name}</h3>
              <ul>
                {p.columns.flatMap((col) => col.links.filter((l) => l.popular).slice(0, 2)).slice(0, 6).map((l) => (
                  <li key={l.url}><Link to={l.url}>{l.name.replace(' Registration', '')}</Link></li>
                ))}
                <li><Link to={`/services?pillar=${p.key}`}>View all →</Link></li>
              </ul>
            </div>
          ))}
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About DigiAds</Link></li>
              <li><Link to="/services">All Services</Link></li>
              {morePillars.map((p) => <li key={p.key}><Link to={`/services?pillar=${p.key}`}>{p.name}</Link></li>)}
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <DownloadApp />
        <p className="footer__disclaimer">
          DigiAds Business Solutions is a private professional services provider and is not a government body. Government fees, processing times and approvals are decided by the respective authorities.
        </p>
        <div className="footer__bottom">
          <span>© {year} DigiAds Business Solutions. All rights reserved.</span>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/refund-policy">Refund Policy</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

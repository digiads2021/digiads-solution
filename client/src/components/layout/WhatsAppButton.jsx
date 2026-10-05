import { useLocation } from 'react-router-dom';
import { useSite } from '../../context/SiteContext.jsx';
import { waLink } from '../../utils/siteContent.js';
import WhatsAppIcon from '../shared/WhatsAppIcon.jsx';

// Floating "Chat on WhatsApp" button on every public page. Opens WhatsApp Business with a ready-made
// message; on service pages the message names the service the visitor is reading about.
export default function WhatsAppButton() {
  const { settings } = useSite();
  const { pathname } = useLocation();
  const number = settings?.contact?.whatsapp;
  if (!number) return null;

  const message = () => {
    const onService = /^\/services\/[^/]+\/[^/]+/.test(pathname);
    const h1 = document.querySelector('main h1')?.textContent?.trim();
    return onService && h1
      ? `Hi DigiAds, I'm interested in ${h1}. Please share the details.`
      : 'Hi DigiAds, I would like to know more about your services.';
  };

  // Build the link at click time so the message always matches the current page.
  const open = (e) => { e.currentTarget.href = waLink(number, message()); };

  return (
    <a
      href={waLink(number)}
      onClick={open}
      className="wa-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DigiAds on WhatsApp (opens in a new tab)"
    >
      <span className="wa-fab__icon"><WhatsAppIcon size={28} /></span>
      <span className="wa-fab__label">
        <strong>Chat on WhatsApp</strong>
        <small>Open 24 hours</small>
      </span>
    </a>
  );
}

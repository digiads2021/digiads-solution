import { useState } from 'react';
import { BadgeCheck, Check, Copy, ExternalLink, FileBadge2, Landmark, MapPin } from 'lucide-react';
import { BRAND } from '../../utils/siteContent.js';
import { useSite } from '../../context/SiteContext.jsx';

const UDYAM_VERIFY_URL = 'https://udyamregistration.gov.in/Udyam_Verify.aspx';

function CopyButton({ value, label }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch { /* clipboard blocked: the number is still visible to select */ }
  };
  return (
    <button type="button" className="cred__copy" onClick={copy} aria-label={done ? `${label} copied` : `Copy ${label}`}>
      {done ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
      <span>{done ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

// Company registration certificates: MSME (Udyam), trade licence and registered office.
export default function Credentials() {
  const { settings } = useSite();
  const { udyam, tradeLicence } = BRAND.registrations;
  const address = settings?.contact?.addressIndia;

  return (
    <section className="section cred" aria-labelledby="cred-title">
      <div className="container">
        <div className="section-head section-head--center">
          <div className="eyebrow">Registered &amp; certified</div>
          <h2 id="cred-title">A government-registered business you can trust</h2>
          <p className="lead">DigiAds Business Solutions is a registered MSME with a valid trade licence. Our registration details are public and can be verified.</p>
        </div>

        <div className="cred__grid">
          <article className="cred__card">
            <div className="cred__top">
              <span className="cred__icon cred__icon--msme"><FileBadge2 size={24} aria-hidden="true" /></span>
              <span className="cred__badge"><BadgeCheck size={14} aria-hidden="true" /> Registered</span>
            </div>
            <h3>MSME Certified Business</h3>
            <p className="cred__issuer">Udyam Registration · Ministry of MSME, Government of India</p>
            <div className="cred__number">
              <span><small>Udyam Registration No.</small><strong>{udyam}</strong></span>
              <CopyButton value={udyam} label="Udyam number" />
            </div>
            <a className="cred__link" href={UDYAM_VERIFY_URL} target="_blank" rel="noopener noreferrer">
              Verify on the Udyam portal <ExternalLink size={14} aria-hidden="true" />
            </a>
          </article>

          <article className="cred__card">
            <div className="cred__top">
              <span className="cred__icon cred__icon--trade"><Landmark size={24} aria-hidden="true" /></span>
              <span className="cred__badge"><BadgeCheck size={14} aria-hidden="true" /> Licensed</span>
            </div>
            <h3>Trade Licence</h3>
            <p className="cred__issuer">Licence to carry on trade and business</p>
            <div className="cred__number">
              <span><small>Trade Licence No.</small><strong>{tradeLicence}</strong></span>
              <CopyButton value={tradeLicence} label="trade licence number" />
            </div>
          </article>

          {address && (
            <article className="cred__card">
              <div className="cred__top">
                <span className="cred__icon cred__icon--office"><MapPin size={24} aria-hidden="true" /></span>
              </div>
              <h3>Registered Office</h3>
              <p className="cred__issuer">Head office, India</p>
              <address className="cred__address">{address}</address>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

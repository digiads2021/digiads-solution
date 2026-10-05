import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Building2 } from 'lucide-react';
import useOffscreenPause from '../../hooks/useOffscreenPause.js';
import funnele from '../../assets/clients/funnele.webp';
import didar from '../../assets/clients/didar-exports.webp';
import lowerAssam from '../../assets/clients/lower-assam-micro-finance.webp';
import annafresh from '../../assets/clients/annafresh.webp';
import weshoppe from '../../assets/clients/weshoppe.webp';
import museMediaa from '../../assets/clients/the-muse-mediaa.webp';
import cameraHaven from '../../assets/clients/camera-haven.webp';
import riznova from '../../assets/clients/riznova-pharma.webp';
import edukracy from '../../assets/clients/edukracy.webp';
import dFoundation from '../../assets/clients/d-foundation.webp';
import sigmacare from '../../assets/clients/sigmacare-pharma.webp';

// Businesses whose registration DigiAds completed. Add new clients here (logo in assets/clients).
const CLIENTS = [
  { name: 'Sigmacare Pharma (P) Ltd.', logo: sigmacare },
  { name: 'Didar Exports Pvt. Ltd.', logo: didar },
  { name: 'Lower Assam Micro Finance Pvt. Ltd.', logo: lowerAssam },
  { name: 'Riznova Pharma Pvt. Ltd.', logo: riznova },
  { name: 'Funnele', logo: funnele },
  { name: 'Weshoppe', logo: weshoppe },
  { name: 'Edukracy', logo: edukracy },
  { name: 'Camera Haven', logo: cameraHaven },
  { name: 'The Muse Mediaa', logo: museMediaa },
  { name: 'Annafresh', logo: annafresh },
  { name: 'D Foundation', logo: dFoundation },
];

const half = Math.ceil(CLIENTS.length / 2);
const ROWS = [CLIENTS.slice(0, half), CLIENTS.slice(half)];

function ClientCard({ client, hidden }) {
  return (
    <li className="rc-card" aria-hidden={hidden || undefined}>
      <div className="rc-card__logo">
        <img src={client.logo} alt={hidden ? '' : `${client.name} logo`} loading="eager" fetchpriority="low" decoding="async" width="200" height="88" />
      </div>
      <div className="rc-card__foot">
        <BadgeCheck size={14} aria-hidden="true" />
        <span>Registered with DigiAds</span>
      </div>
      {!hidden && <span className="visually-hidden">{client.name}</span>}
    </li>
  );
}

export default function RegisteredClients() {
  const ref = useRef(null);
  useOffscreenPause(ref);
  return (
    <section ref={ref} className="section rc" aria-labelledby="rc-title">
      <div className="container">
        <div className="rc__head">
          <div>
            <div className="eyebrow">Our clients</div>
            <h2 id="rc-title">Businesses we’ve <span className="text-gradient">registered</span></h2>
            <p className="lead">From pharma and export companies to finance firms, media, retail, education and NGOs — these businesses started their journey with a DigiAds registration.</p>
          </div>
          <div className="rc__stat" aria-label={`${CLIENTS.length} featured client registrations`}>
            <span className="rc__stat-icon"><Building2 size={22} aria-hidden="true" /></span>
            <span><strong>{CLIENTS.length}</strong><small>Featured client<br />registrations</small></span>
          </div>
        </div>
      </div>

      {/* Two rows gliding in opposite directions; each list is repeated once for a seamless loop. */}
      <div className="rc__marquee">
        {ROWS.map((row, i) => (
          <div className={`rc__track ${i % 2 ? 'rc__track--reverse' : ''}`} key={i}>
            <ul className="rc__list">
              {row.map((c) => <ClientCard key={c.name} client={c} />)}
            </ul>
            <ul className="rc__list rc__list--clone" aria-hidden="true">
              {row.map((c) => <ClientCard key={c.name} client={c} hidden />)}
            </ul>
          </div>
        ))}
      </div>

      <div className="container">
        <div className="rc__cta">
          <p><strong>Your business could be next.</strong> Private limited, LLP, OPC, partnership, NGO and more — registered the right way.</p>
          <div className="rc__cta-actions">
            <Link to="/services/business-registration" className="btn btn--primary">Register your company <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

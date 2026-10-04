import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Icon from '../../utils/icons.jsx';
import logoMark from '../../assets/logo-mark.svg';

// Hub-and-spoke diagram: one DigiAds hub wired to six service areas.
// Coordinates live in a 640×480 SVG; the node cards are positioned in % of the same box.
const HUB = { x: 320, y: 240 };
const NODE_W = 0.3; // node card width as a fraction of the map
const ROWS = [84, 240, 396];

const NODES = [
  { side: 'l', row: 0, name: 'Business Registration', sub: 'Pvt Ltd · LLP · OPC', icon: 'Building2', to: '/services/business-registration', tone: 'blue' },
  { side: 'l', row: 1, name: 'GST & Income Tax', sub: 'GST · ITR · TDS', icon: 'Receipt', to: '/services/gst-income-tax', tone: 'teal' },
  { side: 'l', row: 2, name: 'MCA / ROC Compliance', sub: 'Annual filings · Changes', icon: 'ClipboardCheck', to: '/services/mca-roc-compliance', tone: 'violet' },
  { side: 'r', row: 0, name: 'Trademark & IP', sub: 'Search · File · Protect', icon: 'ShieldCheck', to: '/services/trademark-fssai-import-export', tone: 'amber' },
  { side: 'r', row: 1, name: 'Website & Apps', sub: 'Web · Mobile · CRM', icon: 'MonitorSmartphone', to: '/services/website-app-development', tone: 'rose' },
  { side: 'r', row: 2, name: 'UAE Business Setup', sub: 'Mainland · Free Zone', icon: 'Globe2', to: '/services/global-business', tone: 'cyan' },
];

// Curve fanning out from the hub's centre (hidden under the hub) to the inner edge of a node card.
function pathFor({ side, row }) {
  const ex = side === 'l' ? 640 * NODE_W : 640 * (1 - NODE_W);
  const ey = ROWS[row];
  const mx = (HUB.x + ex) / 2;
  return `M ${HUB.x} ${HUB.y} C ${mx} ${HUB.y}, ${mx} ${ey}, ${ex} ${ey}`;
}

function Diagram() {
  return (
    <div className="cs-map">
      <div className="cs-map__glow" aria-hidden="true" />
      <svg className="cs-lines" viewBox="0 0 640 480" preserveAspectRatio="none" aria-hidden="true">
        {NODES.map((n, i) => {
          const d = pathFor(n);
          return (
            <g key={n.name} className={`cs-line cs-line--${n.tone}`}>
              <path d={d} className="cs-line__base" />
              <path d={d} className="cs-line__flow" style={{ animationDelay: `${i * -0.4}s` }} />
              <circle r="3.5" className="cs-line__dot">
                <animateMotion dur={`${2.8 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={d} keyPoints={n.side === 'l' ? '1;0' : '0;1'} keyTimes="0;1" calcMode="linear" />
              </circle>
            </g>
          );
        })}
      </svg>

      <div className="cs-hub">
        <span className="cs-hub__ring" aria-hidden="true" />
        <span className="cs-hub__ring cs-hub__ring--2" aria-hidden="true" />
        <div className="cs-hub__core">
          <img src={logoMark} alt="" width="44" height="44" />
          <strong>DigiAds</strong>
          <span>One platform</span>
        </div>
      </div>

      {NODES.map((n) => (
        <Link
          key={n.name} to={n.to} className={`cs-node cs-node--${n.side} cs-node--${n.tone}`}
          style={{ top: `${(ROWS[n.row] / 480) * 100}%` }}
        >
          <span className="cs-node__icon"><Icon name={n.icon} size={18} /></span>
          <span className="cs-node__text"><strong>{n.name}</strong><small>{n.sub}</small></span>
          <ArrowRight size={14} className="cs-node__arrow" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

export default function ConnectedServices() {
  return (
    <section className="section cs" aria-labelledby="cs-title">
      <div className="container cs__grid">
        <div className="cs__copy">
          <div className="eyebrow">One connected platform</div>
          <h2 id="cs-title">Every business service, <span className="text-gradient">connected in one place</span></h2>
          <p className="lead">One accountable team for registration, tax, compliance, trademarks, technology and UAE setup — so you never have to re-explain your business to a new vendor.</p>
          <ul className="cs__points">
            <li><Check size={16} aria-hidden="true" /> Many services, one partner</li>
            <li><Check size={16} aria-hidden="true" /> End-to-end support, from the first question to the final certificate</li>
            <li><Check size={16} aria-hidden="true" /> Share documents online and get updates without visiting an office</li>
          </ul>
          <Link to="/services" className="btn btn--primary btn--lg">Explore all services <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <Diagram />
      </div>
    </section>
  );
}

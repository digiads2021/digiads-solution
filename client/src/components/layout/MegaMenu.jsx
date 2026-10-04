import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, MessageCircle, Phone } from 'lucide-react';
import Icon from '../../utils/icons.jsx';
import { telHref } from '../../utils/siteContent.js';

const MAX_LINKS = 7;

// Decorative art for the right-hand panel: a filed document, a verified shield and a coin stack.
function MegaArt() {
  return (
    <svg className="mega__art" viewBox="0 0 200 170" aria-hidden="true">
      <defs>
        <linearGradient id="ma-doc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#fff7ea" /></linearGradient>
        <linearGradient id="ma-head" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffbd59" /><stop offset="1" stopColor="#f59e0b" /></linearGradient>
        <linearGradient id="ma-shield" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e8590c" /><stop offset="1" stopColor="#ffbd59" /></linearGradient>
        <linearGradient id="ma-coin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fcd34d" /><stop offset="1" stopColor="#f59e0b" /></linearGradient>
      </defs>
      <ellipse cx="100" cy="158" rx="78" ry="8" fill="#141414" opacity=".12" />
      <g className="mega__art-doc">
        <rect x="58" y="18" width="86" height="112" rx="10" fill="url(#ma-doc)" stroke="#efe6d8" />
        <rect x="58" y="18" width="86" height="20" rx="10" fill="url(#ma-head)" />
        <rect x="58" y="30" width="86" height="8" fill="url(#ma-head)" />
        <rect x="70" y="50" width="50" height="6" rx="3" fill="#efe6d8" />
        <rect x="70" y="63" width="62" height="6" rx="3" fill="#efe6d8" />
        <rect x="70" y="76" width="40" height="6" rx="3" fill="#efe6d8" />
        <rect x="70" y="95" width="36" height="20" rx="5" fill="#fff3df" />
        <path d="M78 105l5 5 9-10" fill="none" stroke="#9a5800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="mega__art-coins">
        <ellipse cx="42" cy="146" rx="20" ry="6" fill="#d97706" />
        <rect x="22" y="128" width="40" height="18" fill="url(#ma-coin)" />
        <ellipse cx="42" cy="128" rx="20" ry="6" fill="#fde68a" />
        <rect x="22" y="116" width="40" height="12" fill="url(#ma-coin)" />
        <ellipse cx="42" cy="116" rx="20" ry="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      </g>
      <g className="mega__art-shield">
        <path d="M152 86l26 9v18c0 17-11 29-26 35-15-6-26-18-26-35V95z" fill="url(#ma-shield)" />
        <path d="M141 116l8 8 14-15" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g fill="#f59e0b" className="mega__art-spark">
        <path d="M34 52l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        <path d="M170 40l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" opacity=".7" />
      </g>
    </svg>
  );
}

// One full-width panel for a navigation pillar: brand rail + subcategory columns + help strip.
export default function MegaMenu({ pillar, id, phone, onNavigate, onTalk }) {
  return (
    <div className="mega" id={id} role="region" aria-label={`${pillar.name} services`}>
      <div className="mega__bg" aria-hidden="true" />
      <div className="container mega__inner">
        <aside className="mega__intro">
          <span className="mega__intro-icon"><Icon name={pillar.icon} size={24} /></span>
          <h2>{pillar.name}</h2>
          <p>{pillar.description}</p>
          <Link to={`/services?pillar=${pillar.key}`} className="mega__intro-link" onClick={onNavigate}>
            View all {pillar.name} services <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <div className="mega__help">
            <strong>Not sure what you need?</strong>
            <p>Tell us your goal and we’ll suggest the right service.</p>
            <button type="button" className="mega__help-btn" onClick={onTalk}>
              <MessageCircle size={16} aria-hidden="true" /> Talk to an Expert
            </button>
          </div>
        </aside>

        <div className="mega__main">
          <div className="mega__cols">
            {pillar.columns.map((col) => (
              <div className="mega__col" key={col.key}>
                <h3>
                  <span className="mega__col-icon"><Icon name={col.category.icon} size={16} /></span>
                  {col.title}
                </h3>
                <ul>
                  {col.links.slice(0, MAX_LINKS).map((l) => (
                    <li key={l.url}>
                      <Link to={l.url} onClick={onNavigate}>
                        <span>{l.name}{l.popular && <em className="mega__tag">Popular</em>}</span>
                        <ChevronRight size={14} className="mega__chev" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${col.category.slug}`} className="mega__all" onClick={onNavigate}>
                  {col.total > MAX_LINKS ? `View all ${col.total}` : `View ${col.category.name}`} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mega__strip">
            <span>Can’t find what you’re looking for? <Link to="/services" onClick={onNavigate}>Browse all services</Link></span>
            {phone && (
              <a href={telHref(phone)} className="mega__strip-phone"><Phone size={14} aria-hidden="true" /> {phone}</a>
            )}
          </div>
        </div>

        <div className="mega__visual" aria-hidden="true">
          <svg className="mega__wave" viewBox="0 0 220 520" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mw-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffd08a" /><stop offset=".55" stopColor="#ffd08a" /><stop offset="1" stopColor="#ffd9a0" />
              </linearGradient>
              <linearGradient id="mw-grad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffbd59" /><stop offset="1" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <path d="M220 0V150C150 190 170 260 110 320S20 440 50 520H220Z" fill="url(#mw-grad)" opacity=".75" />
            <path d="M220 120C190 200 210 270 160 340S120 470 150 520H220Z" fill="url(#mw-grad2)" opacity=".55" />
          </svg>
          <div className="mega__visual-text">
            <strong>{pillar.name}</strong>
            <span>made simple, online</span>
          </div>
          <MegaArt />
        </div>
      </div>
    </div>
  );
}

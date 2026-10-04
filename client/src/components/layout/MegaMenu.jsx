import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, MessageCircle, Phone } from 'lucide-react';
import Icon from '../../utils/icons.jsx';

const MAX_LINKS = 7;

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
              <a href={`tel:${phone}`} className="mega__strip-phone"><Phone size={14} aria-hidden="true" /> {phone}</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

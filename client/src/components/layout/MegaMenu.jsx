import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Icon from '../../utils/icons.jsx';

const MAX_LINKS = 7;

// One full-width panel for a navigation pillar: intro rail + subcategory columns.
export default function MegaMenu({ pillar, id, onNavigate, onTalk }) {
  return (
    <div className="mega" id={id} role="region" aria-label={`${pillar.name} services`}>
      <div className="container mega__inner">
        <div className="mega__intro">
          <span className="icon-tile"><Icon name={pillar.icon} size={22} /></span>
          <h2>{pillar.name}</h2>
          <p>{pillar.description}</p>
          <Link to={`/services?pillar=${pillar.key}`} className="link-arrow" onClick={onNavigate}>View all {pillar.name} services <ArrowRight size={16} /></Link>
          <div className="mega__help">
            <strong>Not sure what you need?</strong>
            <p style={{ margin: '4px 0 8px' }}>Tell us your goal and we’ll suggest the right service.</p>
            <button type="button" className="btn btn--secondary btn--sm" onClick={onTalk}>Talk to an Expert</button>
          </div>
        </div>
        <div className="mega__cols">
          {pillar.columns.map((col) => (
            <div className="mega__col" key={col.key}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.slice(0, MAX_LINKS).map((l) => (
                  <li key={l.url}><Link to={l.url} onClick={onNavigate}>{l.name}</Link></li>
                ))}
                <li><Link to={`/services/${col.category.slug}`} className="mega__all" onClick={onNavigate}>{col.total > MAX_LINKS ? `View all ${col.total} →` : `View ${col.category.name} →`}</Link></li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

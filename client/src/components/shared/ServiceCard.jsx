import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Icon from '../../utils/icons.jsx';
import { serviceUrl } from '../../utils/format.js';

export default function ServiceCard({ service, categorySlug }) {
  const url = categorySlug ? `/services/${categorySlug}/${service.slug}` : serviceUrl(service);
  return (
    <Link to={url} className="card card--hover service-card">
      <div className="service-card__top">
        <span className="icon-tile icon-tile--sm"><Icon name={service.icon} size={18} /></span>
        {service.popular && <span className="badge badge--accent">Popular</span>}
      </div>
      <h3>{service.name}</h3>
      <p>{service.shortDescription}</p>
      <span className="link-arrow">View details <ArrowRight size={16} aria-hidden="true" /></span>
    </Link>
  );
}

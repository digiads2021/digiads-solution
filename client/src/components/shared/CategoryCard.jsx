import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Icon from '../../utils/icons.jsx';

export default function CategoryCard({ category }) {
  return (
    <article className="card card--hover cat-card">
      <span className="icon-tile"><Icon name={category.icon} size={22} /></span>
      <h3><Link to={`/services/${category.slug}`}>{category.name}</Link></h3>
      <p>{category.shortDescription}</p>
      {category.popularServices?.length > 0 && (
        <ul aria-label={`Popular ${category.name} services`}>
          {category.popularServices.map((s) => <li key={s.slug}>{s.name}</li>)}
        </ul>
      )}
      <span className="link-arrow">Explore services <ArrowRight size={16} aria-hidden="true" /></span>
    </article>
  );
}

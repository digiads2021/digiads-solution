import { useRef } from 'react';
import Breadcrumbs from '../layout/Breadcrumbs.jsx';
import useOffscreenPause from '../../hooks/useOffscreenPause.js';
import Icon from '../../utils/icons.jsx';

// Dark, animated page header shared by Contact and the legal pages (styles in pages.css).
export default function PageHeroDark({ crumbs, pill, icon, title, lead, children, narrow = false, id = 'page-title' }) {
  const ref = useRef(null);
  useOffscreenPause(ref);
  return (
    <section ref={ref} className={`dk-hero ${narrow ? 'dk-hero--narrow' : ''}`} aria-labelledby={id}>
      <div className="hero__bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <div className="dk-hero__body reveal">
          {icon && <span className="dk-hero__icon" aria-hidden="true"><Icon name={icon} size={26} /></span>}
          {pill && <div className="hero__pill"><span className="hero__pill-dot" /> {pill}</div>}
          <h1 id={id}>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

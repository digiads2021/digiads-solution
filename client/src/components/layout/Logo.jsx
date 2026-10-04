import { Link } from 'react-router-dom';
import logoDark from '../../assets/logo-digiads.svg';
import logoLight from '../../assets/logo-digiads-light.svg';

// Official "digiads" wordmark. `light` = white lettering for dark backgrounds (footer, admin sidebar).
export default function Logo({ to = '/', sub = 'Business Solutions', light = false }) {
  return (
    <Link to={to} className={`logo ${light ? 'logo--light' : ''}`} aria-label="DigiAds Business Solutions – Home">
      <img className="logo__img" src={light ? logoLight : logoDark} alt="digiads" width="112" height="36" />
      {sub && <span className="logo__sub">{sub}</span>}
    </Link>
  );
}

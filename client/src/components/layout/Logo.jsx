import { Link } from 'react-router-dom';
import logoMark from '../../assets/logo-mark.svg';

// Replace src/assets/logo-mark.svg with the official DigiAds logo when available.
export default function Logo({ to = '/', sub = 'Business Solutions' }) {
  return (
    <Link to={to} className="logo" aria-label="DigiAds Business Solutions – Home">
      <img src={logoMark} alt="" width="36" height="36" />
      <span className="logo__text">
        <span className="logo__name">DigiAds</span>
        <span className="logo__sub">{sub}</span>
      </span>
    </Link>
  );
}

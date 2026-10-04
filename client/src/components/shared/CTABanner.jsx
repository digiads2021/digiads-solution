import { Link } from 'react-router-dom';
import { useConsultation } from '../forms/ConsultationProvider.jsx';

export default function CTABanner({ title = 'Ready to get started?', text = 'Tell us what you need and a DigiAds expert will guide you through the next steps.', service }) {
  const { openConsultation } = useConsultation();
  return (
    <div className="cta-banner">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta-banner__actions">
        <button type="button" className="btn btn--white btn--lg" onClick={() => openConsultation(service)}>Talk to an Expert</button>
        <Link to="/contact" className="btn btn--outline-white btn--lg">Contact Us</Link>
      </div>
    </div>
  );
}

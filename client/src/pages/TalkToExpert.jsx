import { useSearchParams } from 'react-router-dom';
import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import ConsultationForm from '../components/forms/ConsultationForm.jsx';
import { howItWorks } from '../utils/siteContent.js';

export default function TalkToExpert() {
  const [params] = useSearchParams();
  const service = params.get('service') ? { slug: params.get('service'), name: params.get('name') || '' } : null;
  return (
    <>
      <Seo title="Talk to an Expert" description="Not sure which service you need? Tell DigiAds what you’re trying to achieve and an expert will call you." path="/talk-to-an-expert" />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Talk to an Expert' }]} />
          <h1>Talk to an expert</h1>
          <p className="lead">Tell us what you’re trying to achieve. We’ll help you identify the right service and explain the next steps.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container grid grid-2" style={{ alignItems: 'start', gap: 48 }}>
          <div className="card" style={{ padding: 32 }}><ConsultationForm service={service} /></div>
          <div>
            <h2 style={{ fontSize: '1.375rem' }}>What happens next</h2>
            <ol className="process" style={{ marginTop: 16 }}>
              {howItWorks.map((s, i) => <li key={s.title}><span className="process__num">{i + 1}</span><div><h3>{s.title}</h3><p>{s.text}</p></div></li>)}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

import Seo from '../components/shared/Seo.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';

// Template legal pages. IMPORTANT: have these reviewed by a lawyer before going live.
const pages = {
  'privacy-policy': {
    title: 'Privacy Policy',
    body: [
      ['Information we collect', 'When you submit a form on this website we collect the details you provide, such as your name, phone number, email address, city and message, along with the page you submitted it from.'],
      ['How we use it', 'We use this information to respond to your enquiry, provide the services you request, and send updates you have subscribed to. We do not sell your personal information.'],
      ['Sharing', 'We may share information with government portals, authorities or professionals only as required to deliver the service you have asked for, or where required by law.'],
      ['Data security', 'We take reasonable technical and organisational measures to protect your information.'],
      ['Your choices', 'You can ask us to update or delete your information, or unsubscribe from emails at any time, by contacting us at [ADD VERIFIED EMAIL].'],
      ['Updates', 'We may update this policy from time to time. The latest version will always be available on this page.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    body: [
      ['Use of the website', 'The content on this website is for general information. It is not legal, tax or financial advice for your specific situation.'],
      ['Services', 'The scope, fees and timelines for any service are confirmed with you before work begins. Government fees and approvals are decided by the respective authorities.'],
      ['No guarantee of approval', 'DigiAds prepares and submits applications on your behalf but cannot guarantee approval by any government authority or third party.'],
      ['Your responsibilities', 'You agree to provide accurate and complete information and documents.'],
      ['Intellectual property', 'Website content, design and logos belong to DigiAds Business Solutions unless stated otherwise.'],
      ['Governing law', '[ADD GOVERNING LAW AND JURISDICTION – to be confirmed by your lawyer]'],
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    body: [
      ['Overview', '[ADD VERIFIED REFUND POLICY] Describe when refunds are available, for example before work has started, and how government fees already paid are handled.'],
      ['Government fees', 'Government fees and third-party charges paid on your behalf are generally not refundable once paid.'],
      ['How to request', 'Write to [ADD VERIFIED EMAIL] with your order details.'],
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    body: [
      ['Not a government body', 'DigiAds Business Solutions is a private professional services provider. We are not affiliated with or endorsed by any government department.'],
      ['General information', 'Information on this website is general guidance and may change with new laws and notifications. Please consult a professional for advice on your specific situation.'],
      ['No guarantee', 'Approvals, registrations and timelines depend on the respective authorities and the documents provided.'],
    ],
  },
};

export default function Legal({ page }) {
  const p = pages[page];
  return (
    <>
      <Seo title={p.title} path={`/${page}`} />
      <section className="page-hero">
        <div className="container" style={{ maxWidth: 860 }}>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: p.title }]} />
          <h1>{p.title}</h1>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container prose" style={{ maxWidth: 860 }}>
          {p.body.map(([h, t]) => <div key={h}><h2>{h}</h2><p>{t}</p></div>)}
        </div>
      </section>
    </>
  );
}

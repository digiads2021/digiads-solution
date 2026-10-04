import Accordion from '../ui/Accordion.jsx';

export default function FAQSection({ faqs, title = 'Frequently asked questions', id = 'faqs', headingLevel = 'h2' }) {
  if (!faqs?.length) return null;
  const H = headingLevel;
  return (
    <section aria-labelledby={`${id}-title`}>
      <H id={`${id}-title`}>{title}</H>
      <Accordion items={faqs} />
    </section>
  );
}

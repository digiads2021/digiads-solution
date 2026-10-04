export default function SectionHead({ eyebrow, title, lead, center = false, action, id }) {
  return (
    <div className={`section-head ${center ? 'section-head--center' : ''} ${action ? 'section-head--split' : ''}`}>
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 id={id}>{title}</h2>
        {lead && <p className="lead" style={{ marginBottom: 0 }}>{lead}</p>}
      </div>
      {action}
    </div>
  );
}

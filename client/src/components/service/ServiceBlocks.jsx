// Content blocks of the service page. Each renders nothing when its data is empty.
import { Check, FileText, Info } from 'lucide-react';
import { formatINR } from '../../utils/format.js';

export const Section = ({ id, title, children }) => (
  <section id={id} className="svc-section" aria-labelledby={`${id}-h`}>
    <h2 id={`${id}-h`}>{title}</h2>
    {children}
  </section>
);

export const CheckList = ({ items, two = false }) => (
  <ul className={`check-list ${two ? 'check-list--2' : ''}`}>
    {items.map((it) => <li key={it}><Check size={18} aria-hidden="true" /><span>{it}</span></li>)}
  </ul>
);

export const Benefits = ({ items }) => (
  <div className="grid grid-2">
    {items.map((b) => (
      <div className="card benefit" key={b.title}>
        <span className="icon-tile icon-tile--accent icon-tile--sm"><Check size={18} /></span>
        <div><h3>{b.title}</h3><p>{b.description}</p></div>
      </div>
    ))}
  </div>
);

export const ComparisonTable = ({ table }) => (
  <div className="table-wrap">
    <table className="data-table">
      <thead><tr>{table.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
      <tbody>{table.rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

export const DocumentGroups = ({ groups }) => (
  <div className="doc-groups">
    {groups.map((g) => (
      <div className="card doc-group" key={g.title}>
        <h3><FileText size={18} color="var(--primary)" aria-hidden="true" />{g.title}</h3>
        <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
      </div>
    ))}
  </div>
);

export const Process = ({ steps }) => (
  <ol className="process">
    {steps.map((s, i) => (
      <li key={s.title}>
        <span className="process__num" aria-hidden="true">{i + 1}</span>
        <div><h3>{s.title}</h3><p>{s.description}</p></div>
      </li>
    ))}
  </ol>
);

export const Pricing = ({ pricing }) => (
  <>
    {pricing.plans?.length > 0 ? (
      <div className="grid grid-3">
        {pricing.plans.map((p) => (
          <div className="card" key={p.name}>
            <h3>{p.name}</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '4px 0 12px' }}>{formatINR(p.price)}</p>
            <CheckList items={p.includes || []} />
          </div>
        ))}
      </div>
    ) : pricing.startingFrom ? (
      <p>Professional fees start from <strong>{formatINR(pricing.startingFrom)}</strong>.</p>
    ) : null}
    {pricing.govtFeeNote && <div className="notice notice--info" style={{ marginTop: 16 }}><Info size={18} aria-hidden="true" /><span>{pricing.govtFeeNote}</span></div>}
  </>
);

export const Overview = ({ html }) =>
  /<[a-z][\s\S]*>/i.test(html)
    ? <div className="prose" dangerouslySetInnerHTML={{ __html: html }} /> // sanitized on the server before saving
    : <div className="prose">{html.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}</div>;

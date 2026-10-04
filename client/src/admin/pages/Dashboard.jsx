import { Link } from 'react-router-dom';
import { Layers, CircleCheck, Inbox, Bell, MessagesSquare, Mail, Newspaper, Users } from 'lucide-react';
import useFetch from '../../hooks/useFetch.js';
import { admin } from '../../api/index.js';
import { PageHead, StatusBadge } from '../components/AdminUI.jsx';
import { PageLoader, ErrorState } from '../../components/ui/States.jsx';
import { formatDateTime } from '../../utils/format.js';

const typeLink = { lead: '/admin/leads', contact: '/admin/contacts', consultation: '/admin/consultations' };

export default function Dashboard() {
  const { data, loading, error, reload } = useFetch(() => admin.dashboard(), []);
  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error.message} onRetry={reload} />;
  const c = data.counts;
  const cards = [
    { label: 'Total services', value: c.totalServices, icon: Layers, to: '/admin/services' },
    { label: 'Published services', value: c.publishedServices, icon: CircleCheck, to: '/admin/services?status=published' },
    { label: 'Total leads', value: c.totalLeads, icon: Inbox, to: '/admin/leads' },
    { label: 'New leads', value: c.newLeads, icon: Bell, to: '/admin/leads' },
    { label: 'Consultation requests', value: c.consultations, icon: MessagesSquare, to: '/admin/consultations' },
    { label: 'Contact messages', value: c.contacts, icon: Mail, to: '/admin/contacts' },
    { label: 'Published blog posts', value: c.blogPosts, icon: Newspaper, to: '/admin/blogs' },
    { label: 'Newsletter subscribers', value: c.subscribers, icon: Users, to: '/admin/newsletter' },
  ];
  const max = Math.max(1, ...data.weekly.map((w) => w.count));

  return (
    <>
      <PageHead title="Dashboard" crumbs="Admin / Dashboard" />
      <div className="stat-grid">
        {cards.map(({ label, value, icon: I, to }) => (
          <Link key={label} to={to} className="stat">
            <span className="icon-tile"><I size={20} /></span>
            <div><div className="stat__value">{value}</div><div className="stat__label">{label}</div></div>
          </Link>
        ))}
      </div>
      {c.awaitingReview > 0 && (
        <div className="notice" style={{ marginBottom: 20 }}>
          <span><strong>{c.awaitingReview} services</strong> are waiting for content review. Ask a CA/CS to check fees, timelines and details, then tick “Content reviewed”. <Link to="/admin/services?contentReviewed=false">Review now →</Link></span>
        </div>
      )}
      <div className="grid" style={{ gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: 20 }}>
        <div className="panel">
          <div className="panel__head"><h2>Latest enquiries</h2></div>
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr><th>Type</th><th>Name</th><th>Service / subject</th><th>Status</th><th>Received</th></tr></thead>
              <tbody>
                {data.latest.length === 0 && <tr><td colSpan={5} className="muted">No enquiries yet. They will appear here when visitors submit forms.</td></tr>}
                {data.latest.map((e) => (
                  <tr key={e._id}>
                    <td><StatusBadge value={e.type} /></td>
                    <td><Link to={typeLink[e.type]}>{e.name}</Link><div className="small muted">{e.phone}</div></td>
                    <td>{e.serviceName || e.subject || '—'}</td>
                    <td><StatusBadge value={e.status} /></td>
                    <td className="small">{formatDateTime(e.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel">
          <div className="panel__head"><h2>Enquiries per week</h2></div>
          <div className="panel__body">
            {data.weekly.length === 0 ? <p className="muted small">The chart appears once enquiries are received.</p> : (
              <div className="bar-chart" role="img" aria-label="Enquiries per week">
                {data.weekly.map((w) => (
                  <div className="bar-chart__col" key={w.week} title={`${w.week}: ${w.count}`}>
                    <span>{w.count}</span>
                    <div className="bar-chart__bar" style={{ height: `${(w.count / max) * 100}%` }} />
                    <span>{w.week.split('-W')[1] ? `W${w.week.split('-W')[1]}` : w.week}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{'@media (max-width: 1023px){ .admin-content .grid[style] { grid-template-columns: 1fr !important; } }'}</style>
    </>
  );
}

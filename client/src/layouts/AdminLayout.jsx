import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Layers, FolderTree, Inbox, Mail, MessagesSquare, Newspaper, CircleHelp, Quote, Users, Settings, LogOut, Menu, ExternalLink } from 'lucide-react';
import Logo from '../components/layout/Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const groups = [
  { label: 'Overview', items: [{ to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  { label: 'Catalogue', items: [{ to: '/admin/services', label: 'Services', icon: Layers }, { to: '/admin/categories', label: 'Categories', icon: FolderTree }] },
  { label: 'Enquiries', items: [{ to: '/admin/leads', label: 'Leads', icon: Inbox }, { to: '/admin/consultations', label: 'Consultations', icon: MessagesSquare }, { to: '/admin/contacts', label: 'Contact messages', icon: Mail }] },
  { label: 'Content', items: [{ to: '/admin/blogs', label: 'Blog posts', icon: Newspaper }, { to: '/admin/faqs', label: 'FAQs', icon: CircleHelp }, { to: '/admin/testimonials', label: 'Testimonials', icon: Quote }, { to: '/admin/newsletter', label: 'Newsletter', icon: Users }] },
  { label: 'System', items: [{ to: '/admin/settings', label: 'Settings', icon: Settings }] },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.title = 'Admin | DigiAds';
    let m = document.head.querySelector('meta[name="robots"]');
    if (!m) { m = document.createElement('meta'); m.name = 'robots'; document.head.appendChild(m); }
    m.content = 'noindex, nofollow';
  }, []);

  const doLogout = async () => { await logout(); navigate('/admin/login'); };

  return (
    <div className="admin">
      <aside className={`admin-side ${open ? 'admin-side--open' : ''}`} aria-label="Admin navigation">
        <Logo to="/admin/dashboard" sub="Admin Panel" light />
        <nav>
          {groups.map((g) => (
            <ul className="admin-nav" key={g.label}>
              <li className="admin-nav__label">{g.label}</li>
              {g.items.map(({ to, label, icon: I }) => (
                <li key={to}><NavLink to={to} className={({ isActive }) => (isActive ? 'active' : '')}><I size={18} aria-hidden="true" />{label}</NavLink></li>
              ))}
            </ul>
          ))}
        </nav>
        <div className="admin-side__foot">
          <a href="/" target="_blank" rel="noreferrer" style={{ color: '#d6d3ce', display: 'inline-flex', gap: 6, alignItems: 'center' }}><ExternalLink size={14} /> View website</a>
        </div>
      </aside>
      {open && <div className="drawer-backdrop" style={{ zIndex: 40 }} onClick={() => setOpen(false)} />}
      <div className="admin-main">
        <header className="admin-top">
          <button type="button" className="icon-btn admin-menu-btn" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={22} /></button>
          <span className="small muted">DigiAds Business Solutions</span>
          <div className="admin-top__user">
            <span><strong>{admin?.name}</strong> <span className="badge badge--muted">{admin?.role}</span></span>
            <button type="button" className="btn btn--secondary btn--sm" onClick={doLogout}><LogOut size={14} /> Log out</button>
          </div>
        </header>
        <main className="admin-content"><Outlet /></main>
      </div>
    </div>
  );
}

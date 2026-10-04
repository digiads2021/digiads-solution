import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Search, Phone, Mail } from 'lucide-react';
import Logo from './Logo.jsx';
import MegaMenu from './MegaMenu.jsx';
import MobileMenu from './MobileMenu.jsx';
import SearchModal from './SearchModal.jsx';
import { useSite } from '../../context/SiteContext.jsx';
import { useConsultation } from '../forms/ConsultationProvider.jsx';
import { PLACEHOLDER } from '../../utils/siteContent.js';

export default function Header() {
  const { navigation, settings } = useSite();
  const { openConsultation } = useConsultation();
  const [openKey, setOpenKey] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hoverTimer = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => { setOpenKey(null); setMobileOpen(false); }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ctrl/Cmd + K opens search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') setOpenKey(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Click outside closes the mega menu
  useEffect(() => {
    if (!openKey) return undefined;
    const onDown = (e) => { if (!headerRef.current?.contains(e.target)) setOpenKey(null); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [openKey]);

  const hoverOpen = (key) => { clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => setOpenKey(key), 150); };
  const hoverClose = () => { clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => setOpenKey(null), 200); };
  const openPillar = navigation.find((p) => p.key === openKey);
  const talk = () => { setOpenKey(null); openConsultation(); };

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="utility-bar">
        <div className="container">
          <span>Business services for India &amp; the UAE</span>
          <div className="utility-bar__group">
            <span className="utility-bar__item"><Phone size={13} aria-hidden="true" /> {settings?.contact?.phone ? <a href={`tel:${settings.contact.phone}`}>{settings.contact.phone}</a> : PLACEHOLDER.phone}</span>
            <span className="utility-bar__item"><Mail size={13} aria-hidden="true" /> {settings?.contact?.email ? <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a> : PLACEHOLDER.email}</span>
            <Link to="/blog">Blog</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>

      <header ref={headerRef} className={`header ${scrolled ? 'header--scrolled' : ''}`} onMouseLeave={hoverClose}>
        <div className="container header__inner">
          <Logo />
          <nav className="nav" aria-label="Main">
            <ul className="nav__list">
              {navigation.map((p) => (
                <li key={p.key} onMouseEnter={() => hoverOpen(p.key)}>
                  <button
                    type="button" className="nav__trigger" aria-expanded={openKey === p.key} aria-controls={`mega-${p.key}`}
                    onClick={() => setOpenKey(openKey === p.key ? null : p.key)}
                  >
                    {p.name} <ChevronDown size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
              <li className="nav__item--secondary" onMouseEnter={() => hoverOpen(null)}><Link className="nav__link" to="/blog">Resources</Link></li>
              <li onMouseEnter={() => hoverOpen(null)}><Link className="nav__link" to="/about">About</Link></li>
            </ul>
          </nav>
          <div className="header__actions">
            <button type="button" className="search-trigger" onClick={() => setSearchOpen(true)} aria-label="Search services">
              <Search size={18} aria-hidden="true" /><span>Search services</span><kbd>Ctrl K</kbd>
            </button>
            <button type="button" className="btn btn--primary header__cta" onClick={talk}>Talk to an Expert</button>
            <button type="button" className="icon-btn header__mobile-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu" aria-expanded={mobileOpen}>
              <Menu size={24} />
            </button>
          </div>
        </div>
        {openPillar && (
          <div onMouseEnter={() => clearTimeout(hoverTimer.current)}>
            <MegaMenu pillar={openPillar} id={`mega-${openPillar.key}`} onNavigate={() => setOpenKey(null)} onTalk={talk} />
          </div>
        )}
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} navigation={navigation} settings={settings} onSearch={() => setSearchOpen(true)} onTalk={talk} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onTalk={talk} />
    </>
  );
}

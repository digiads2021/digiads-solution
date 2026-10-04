import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getNavigation, getSettings } from '../api/index.js';
import { BRAND } from '../utils/siteContent.js';

// Loads the mega-menu navigation and public site settings once for the whole app.
// Used when the navigation API is unreachable, so the header still links to every service area.
const FALLBACK_NAV = [
  { key: 'registration', name: 'Registration' }, { key: 'tax-compliance', name: 'Tax & Compliance' },
  { key: 'legal-ip', name: 'Legal & IP' }, { key: 'licences-iso', name: 'Licences & ISO' },
  { key: 'technology', name: 'Technology' }, { key: 'global', name: 'Global' },
].map((p) => ({ ...p, columns: [] }));

// Admin settings win when filled in; empty fields fall back to the official BRAND details.
const filled = (obj = {}) => Object.fromEntries(Object.entries(obj || {}).filter(([, v]) => typeof v === 'string' && v.trim()));
const withBrand = (settings) => ({
  ...(settings || {}),
  contact: { ...BRAND.contact, ...filled(settings?.contact) },
  social: { ...BRAND.social, ...filled(settings?.social) },
});

const SiteContext = createContext({ navigation: [], settings: withBrand(null), loading: true });

export function SiteProvider({ children }) {
  const [state, setState] = useState({ navigation: [], settings: withBrand(null), loading: true, error: null });
  const [attempt, setAttempt] = useState(0);
  const reload = useCallback(() => { setState((s) => ({ ...s, loading: true })); setAttempt((n) => n + 1); }, []);

  useEffect(() => {
    let active = true;
    Promise.allSettled([getNavigation(), getSettings()]).then(([nav, settings]) => {
      if (!active) return;
      const navOk = nav.status === 'fulfilled' && nav.value?.length > 0;
      setState({
        navigation: navOk ? nav.value : FALLBACK_NAV,
        settings: withBrand(settings.status === 'fulfilled' ? settings.value : null),
        loading: false,
        error: navOk ? null : (nav.reason?.message || 'Services are temporarily unavailable.'),
      });
    });
    return () => { active = false; };
  }, [attempt]);

  return <SiteContext.Provider value={{ ...state, reload }}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);

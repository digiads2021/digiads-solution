import { createContext, useContext, useEffect, useState } from 'react';
import { getNavigation, getSettings } from '../api/index.js';

// Loads the mega-menu navigation and public site settings once for the whole app.
const SiteContext = createContext({ navigation: [], settings: null, loading: true });

export function SiteProvider({ children }) {
  const [state, setState] = useState({ navigation: [], settings: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    Promise.allSettled([getNavigation(), getSettings()]).then(([nav, settings]) => {
      if (!active) return;
      setState({
        navigation: nav.status === 'fulfilled' ? nav.value : [],
        settings: settings.status === 'fulfilled' ? settings.value : null,
        loading: false,
        error: nav.status === 'rejected' ? nav.reason?.message : null,
      });
    });
    return () => { active = false; };
  }, []);

  return <SiteContext.Provider value={state}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);

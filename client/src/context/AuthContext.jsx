import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMe, login as apiLogin, logout as apiLogout } from '../api/index.js';

// Admin session state. The token itself lives in an HTTP-only cookie (never in localStorage);
// here we only keep the logged-in admin's public profile.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);
  const location = useLocation();
  const inAdmin = location.pathname.startsWith('/admin');

  // Check the session only when the admin area is opened.
  useEffect(() => {
    if (!inAdmin || admin) { setChecking(false); return; }
    setChecking(true);
    getMe()
      .then((d) => setAdmin(d.admin))
      .catch(() => setAdmin(null))
      .finally(() => setChecking(false));
  }, [inAdmin]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onExpired = () => setAdmin(null);
    window.addEventListener('auth:expired', onExpired);
    return () => window.removeEventListener('auth:expired', onExpired);
  }, []);

  const login = useCallback(async (email, password) => {
    const d = await apiLogin({ email, password });
    setAdmin(d.admin);
    return d.admin;
  }, []);

  const logout = useCallback(async () => {
    try { await apiLogout(); } finally { setAdmin(null); }
  }, []);

  return <AuthContext.Provider value={{ admin, checking, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

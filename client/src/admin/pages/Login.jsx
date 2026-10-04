import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Logo from '../../components/layout/Logo.jsx';
import { Input } from '../../components/ui/Field.jsx';
import { Spinner, PageLoader } from '../../components/ui/States.jsx';

export default function Login() {
  const { admin, checking, login } = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (checking) return <PageLoader />;
  if (admin) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) return setError('Enter your email and password.');
    setBusy(true);
    setError('');
    try {
      await login(values.email, values.password);
      navigate(location.state?.from || '/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <Logo to="/" sub="Admin Panel" />
        <h1 style={{ fontSize: '1.5rem', margin: '24px 0 4px' }}>Sign in</h1>
        <p className="small muted">Authorised DigiAds staff only.</p>
        <form className="form" onSubmit={submit} noValidate>
          {error && <div className="form-alert form-alert--error" role="alert">{error}</div>}
          <Input label="Email" name="email" id="email" type="email" autoComplete="username" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} required />
          <Input label="Password" name="password" id="password" type="password" autoComplete="current-password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} required />
          <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={busy}>{busy ? <><Spinner /> Signing in…</> : 'Sign in'}</button>
        </form>
      </div>
    </div>
  );
}

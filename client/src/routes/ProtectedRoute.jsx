import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { PageLoader } from '../components/ui/States.jsx';

// Blocks admin pages until the session is confirmed by GET /api/auth/me.
export default function ProtectedRoute({ children }) {
  const { admin, checking } = useAuth();
  const location = useLocation();
  if (checking) return <PageLoader />;
  if (!admin) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return children;
}

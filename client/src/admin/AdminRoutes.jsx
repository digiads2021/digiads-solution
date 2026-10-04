import { Routes, Route, Navigate } from 'react-router-dom';
import '../styles/admin.css';
import ProtectedRoute from '../routes/ProtectedRoute.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Services from './pages/Services.jsx';
import ServiceEdit from './pages/ServiceEdit.jsx';
import Categories from './pages/Categories.jsx';
import Enquiries from './pages/Enquiries.jsx';
import Blogs from './pages/Blogs.jsx';
import BlogEdit from './pages/BlogEdit.jsx';
import Faqs from './pages/Faqs.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Newsletter from './pages/Newsletter.jsx';
import Settings from './pages/Settings.jsx';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="services/new" element={<ServiceEdit />} />
        <Route path="services/:id/edit" element={<ServiceEdit />} />
        <Route path="categories" element={<Categories />} />
        <Route path="leads" element={<Enquiries type="lead" />} />
        <Route path="contacts" element={<Enquiries type="contact" />} />
        <Route path="consultations" element={<Enquiries type="consultation" />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/new" element={<BlogEdit />} />
        <Route path="blogs/:id/edit" element={<BlogEdit />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}

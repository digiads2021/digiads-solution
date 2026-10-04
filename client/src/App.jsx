import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import { PageLoader } from './components/ui/States.jsx';
import Home from './pages/Home.jsx';
import AllServices from './pages/AllServices.jsx';
import Category from './pages/Category.jsx';
import Service from './pages/Service.jsx';
import NotFound from './pages/NotFound.jsx';

// Less-visited pages and the whole admin area are code-split (loaded only when opened).
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const TalkToExpert = lazy(() => import('./pages/TalkToExpert.jsx'));
const FaqPage = lazy(() => import('./pages/FaqPage.jsx'));
const BlogList = lazy(() => import('./pages/BlogList.jsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const AdminRoutes = lazy(() => import('./admin/AdminRoutes.jsx'));

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<AllServices />} />
          <Route path="services/:categorySlug" element={<Category />} />
          <Route path="services/:categorySlug/:serviceSlug" element={<Service />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="talk-to-an-expert" element={<TalkToExpert />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="privacy-policy" element={<Legal page="privacy-policy" />} />
          <Route path="terms" element={<Legal page="terms" />} />
          <Route path="refund-policy" element={<Legal page="refund-policy" />} />
          <Route path="disclaimer" element={<Legal page="disclaimer" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Suspense>
  );
}

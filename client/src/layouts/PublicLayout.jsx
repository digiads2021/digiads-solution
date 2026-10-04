import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import ScrollToTop from '../components/layout/ScrollToTop.jsx';
import { ConsultationProvider } from '../components/forms/ConsultationProvider.jsx';

export default function PublicLayout() {
  return (
    <ConsultationProvider>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <Outlet />
      </main>
      <Footer />
    </ConsultationProvider>
  );
}

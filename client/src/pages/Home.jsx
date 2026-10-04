import { useEffect, useState } from 'react';
import Seo from '../components/shared/Seo.jsx';
import Hero from '../components/home/Hero.jsx';
import ConnectedServices from '../components/home/ConnectedServices.jsx';
import SearchModal from '../components/layout/SearchModal.jsx';
import {
  QuickActions, PillarStrip, WhyDigiAds, CategoryGrid, PopularServices, IntentTiles, BusinessJourney,
  HowItWorks, TechnologySection, GlobalSection, Testimonials, ConsultationCTA, FaqAndArticles,
} from '../components/home/HomeSections.jsx';
import MobileStickyCTA from '../components/layout/MobileStickyCTA.jsx';
import useFetch from '../hooks/useFetch.js';
import { getCategories, getServices, getFaqs, getBlogs, getTestimonials } from '../api/index.js';
import { useConsultation } from '../components/forms/ConsultationProvider.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { organizationSchema, websiteSchema, faqSchema } from '../utils/schema.js';

// Fades each section in as it scrolls into view. Without IntersectionObserver nothing is hidden.
function useScrollReveal(deps) {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const els = [...document.querySelectorAll('.home > .section:not(.fx-in)')];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('fx-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach((el) => { el.classList.add('fx'); io.observe(el); });
    return () => io.disconnect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { openConsultation } = useConsultation();
  const { settings } = useSite();

  const categories = useFetch(() => getCategories({ withPopular: 3 }), [], { cacheKey: 'home-categories' });
  const popular = useFetch(() => getServices({ popular: true, limit: 24 }), [], { cacheKey: 'home-popular' });
  const tech = useFetch(() => getServices({ pillar: 'technology', limit: 60 }), [], { cacheKey: 'home-tech' });
  const faqs = useFetch(() => getFaqs({ scope: 'home' }), [], { cacheKey: 'home-faqs' });
  const blogs = useFetch(() => getBlogs({ limit: 3 }), [], { cacheKey: 'home-blogs' });
  const testimonials = useFetch(() => getTestimonials({ featured: true }), [], { cacheKey: 'home-testimonials' });
  const homeFaqs = (faqs.data || []).slice(0, 6);
  useScrollReveal([testimonials.data, blogs.data]);

  return (
    <div className="home">
      <Seo
        title="DigiAds Business Solutions – Registration, Compliance, Legal, Technology & UAE Setup"
        path="/"
        schema={[organizationSchema(settings), websiteSchema(), homeFaqs.length ? faqSchema(homeFaqs) : null]}
      />
      <Hero onSearch={() => setSearchOpen(true)} />
      <QuickActions />
      <ConnectedServices />
      <PillarStrip />
      <WhyDigiAds />
      <CategoryGrid categories={categories.data} loading={categories.loading} error={categories.error} onRetry={categories.reload} />
      <PopularServices services={popular.data?.data} loading={popular.loading} />
      <IntentTiles />
      <BusinessJourney />
      <HowItWorks />
      <TechnologySection services={tech.data?.data} />
      <GlobalSection />
      <Testimonials items={testimonials.data} />
      <ConsultationCTA />
      <FaqAndArticles faqs={homeFaqs} posts={blogs.data?.data} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onTalk={() => openConsultation()} />
      <MobileStickyCTA />
    </div>
  );
}

import { useState } from 'react';
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
import useScrollReveal from '../hooks/useScrollReveal.js';
import { getCategories, getServices, getFaqs, getBlogs, getTestimonials } from '../api/index.js';
import { useConsultation } from '../components/forms/ConsultationProvider.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { organizationSchema, websiteSchema, faqSchema } from '../utils/schema.js';

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
  useScrollReveal('.home > .section', [testimonials.data, blogs.data]);

  return (
    <div className="home">
      <Seo
        title="DigiAds Business Solutions – Registration, Compliance, Legal, Technology & UAE Setup"
        description="DigiAds Business Solutions: business registration, GST and income tax, MCA compliance, trademarks, licences, ISO, legal documents, websites and apps, and UAE company formation — in one place."
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

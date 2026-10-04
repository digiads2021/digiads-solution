// JSON-LD structured data builders (Organization, Breadcrumb, Service, FAQ, Article).
export const SITE_URL = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');

export const organizationSchema = (settings) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: settings?.siteName || 'DigiAds Business Solutions',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  ...(settings?.contact?.phone ? { telephone: settings.contact.phone } : {}),
  ...(settings?.contact?.email ? { email: settings.contact.email } : {}),
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DigiAds Business Solutions',
  url: SITE_URL,
  potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/services?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.label, item: `${SITE_URL}${it.to || ''}` })),
});

export const serviceSchema = (s, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description: s.shortDescription,
  url: `${SITE_URL}${url}`,
  serviceType: s.subcategory,
  provider: { '@type': 'Organization', name: 'DigiAds Business Solutions', url: SITE_URL },
  areaServed: s.pillar === 'global' ? { '@type': 'Country', name: 'United Arab Emirates' } : { '@type': 'Country', name: 'India' },
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
});

export const articleSchema = (post, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt || post.publishedAt,
  author: { '@type': 'Organization', name: post.author || 'DigiAds Team' },
  mainEntityOfPage: `${SITE_URL}${url}`,
});

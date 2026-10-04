import { useEffect } from 'react';
import { useSite } from '../../context/SiteContext.jsx';
import { SITE_URL } from '../../utils/schema.js';

// Used when neither the page nor the admin settings provide a description, so the tag is never removed.
const DEFAULT_DESCRIPTION = 'Business registration, GST and income tax, MCA compliance, trademark, licences, ISO, legal documents, website and app development, and UAE company formation — in one place.';

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) { el?.remove(); return; }
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
};

/**
 * Sets the page title, meta description, canonical URL, Open Graph / Twitter tags and JSON-LD.
 * Usage: <Seo title="..." description="..." path="/services/..." schema={[...]} />
 */
export default function Seo({ title, description, path, image, type = 'website', noindex = false, schema = [] }) {
  const { settings } = useSite();
  const defaults = settings?.seoDefaults || {};
  const fullTitle = title ? (title.includes('DigiAds') ? title : `${title} | DigiAds`) : defaults.title || 'DigiAds Business Solutions';
  const desc = description || defaults.description || DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${path ?? window.location.pathname}`;
  const schemaJson = JSON.stringify(schema.filter(Boolean));

  useEffect(() => {
    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'DigiAds Business Solutions');
    setMeta('property', 'og:image', image || defaults.ogImage || `${SITE_URL}/favicon.svg`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = url;

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
    JSON.parse(schemaJson).forEach((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seoJsonld = 'true';
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [fullTitle, desc, url, type, image, noindex, schemaJson, defaults.ogImage]);

  return null;
}

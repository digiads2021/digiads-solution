import Service from '../models/Service.js';
import ServiceCategory from '../models/ServiceCategory.js';
import Blog from '../models/Blog.js';
import env from '../config/env.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /sitemap.xml - generated from published content
export const sitemap = asyncHandler(async (req, res) => {
  const base = env.siteUrl.replace(/\/$/, '');
  const [cats, services, posts] = await Promise.all([
    ServiceCategory.find({ status: 'published' }).select('slug updatedAt').lean(),
    Service.find({ status: 'published' }).select('slug category updatedAt').populate('category', 'slug').lean(),
    Blog.find({ status: 'published' }).select('slug updatedAt').lean(),
  ]);
  const staticPaths = ['/', '/services', '/about', '/contact', '/talk-to-an-expert', '/faq', '/blog', '/privacy-policy', '/terms', '/refund-policy', '/disclaimer'];
  const url = (loc, lastmod) => `<url><loc>${base}${loc}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString().slice(0, 10)}</lastmod>` : ''}</url>`;
  const urls = [
    ...staticPaths.map((p) => url(p)),
    ...cats.map((c) => url(`/services/${c.slug}`, c.updatedAt)),
    ...services.filter((s) => s.category).map((s) => url(`/services/${s.category.slug}/${s.slug}`, s.updatedAt)),
    ...posts.map((p) => url(`/blog/${p.slug}`, p.updatedAt)),
  ];
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`);
});

// GET /robots.txt - points crawlers at the sitemap on whichever domain the site is served from.
export const robots = (req, res) => {
  const base = env.siteUrl.replace(/\/$/, '');
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${base}/sitemap.xml\n`);
};

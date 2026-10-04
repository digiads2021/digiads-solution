/**
 * Seeds MongoDB with the complete DigiAds service catalogue.
 *
 * Usage (from the server folder):
 *   npm run seed            -> replaces categories, services, FAQs, starter blog posts
 *
 * Enquiries, subscribers, testimonials and admins are NOT touched.
 */
import mongoose from 'mongoose';
import env from '../config/env.js';
import ServiceCategory from '../models/ServiceCategory.js';
import Service from '../models/Service.js';
import FAQ from '../models/FAQ.js';
import Blog from '../models/Blog.js';
import WebsiteSetting from '../models/WebsiteSetting.js';
import categories from './data/categories.js';
import catalogue from './data/services.js';
import { buildContent } from './data/content.js';
import { homeFaqs } from './data/faqs.js';
import blogs from './data/blogs.js';

const shortName = (name) => name.replace(/\s*\(.*?\)\s*/g, ' ').replace(/ Registration$/, '').replace(/\s+/g, ' ').trim();

async function run() {
  await mongoose.connect(env.mongoUri);
  console.log('Connected. Seeding DigiAds catalogue...');

  await Promise.all([ServiceCategory.deleteMany({}), Service.deleteMany({}), FAQ.deleteMany({}), Blog.deleteMany({ slug: { $in: blogs.map((b) => b.slug) } })]);

  // 1. Categories
  const catDocs = await ServiceCategory.insertMany(
    categories.map((c) => ({ ...c, status: 'published', seo: { title: `${c.name} Services – DigiAds Business Solutions`, description: c.shortDescription } }))
  );
  const catBySlug = Object.fromEntries(catDocs.map((c) => [c.slug, c]));

  // 2. Services with full page content
  const relatedMap = {};
  const faqQueue = [];
  const serviceDocs = [];
  let order = 0;

  for (const block of catalogue) {
    const category = catBySlug[block.category];
    if (!category) throw new Error(`Unknown category ${block.category}`);

    for (const [name, slug, desc, opts = {}] of block.services) {
      order += 1;
      const entry = { name, slug, desc, short: shortName(name), jurisdictions: opts.jurisdictions || [] };
      const content = buildContent(entry, block.group);
      const { faqs, related, ...pageContent } = content;

      serviceDocs.push({
        name,
        slug,
        category: category._id,
        subcategory: block.subcategory,
        pillar: block.pillar,
        lifecycleStage: block.lifecycle,
        icon: block.icon,
        shortDescription: desc,
        heroSummary: desc,
        ...pageContent,
        jurisdictions: entry.jurisdictions,
        keywords: [...(opts.kw || []), block.subcategory.toLowerCase(), category.name.toLowerCase()],
        popular: Boolean(opts.popular),
        featured: Boolean(opts.featured),
        showInMenu: true,
        menuOrder: order,
        status: 'published',
        contentReviewed: false,
        pricing: { show: false, plans: [] },
        timeline: { show: false },
        seo: {
          title: `${name} – Online in India | DigiAds`.replace('in India | DigiAds', block.pillar === 'global' ? 'in the UAE | DigiAds' : 'in India | DigiAds'),
          description: desc,
          keywords: opts.kw || [],
        },
      });
      relatedMap[slug] = (opts.related || related || []).filter((s) => s !== slug);
      faqQueue.push({ slug, faqs });
    }
  }

  const inserted = await Service.insertMany(serviceDocs);
  const idBySlug = Object.fromEntries(inserted.map((s) => [s.slug, s._id]));

  // 3. Related services (by slug -> ObjectId)
  const missing = new Set();
  await Service.bulkWrite(
    inserted.map((s) => ({
      updateOne: {
        filter: { _id: s._id },
        update: {
          relatedServices: (relatedMap[s.slug] || [])
            .map((r) => { if (!idBySlug[r]) missing.add(r); return idBySlug[r]; })
            .filter(Boolean)
            .slice(0, 6),
        },
      },
    }))
  );
  if (missing.size) console.warn('Unknown related slugs (skipped):', [...missing].join(', '));

  // 4. FAQs: per service + homepage
  const faqDocs = [];
  for (const { slug, faqs } of faqQueue) {
    faqs.forEach(([question, answer], i) => faqDocs.push({ question, answer, scope: 'service', service: idBySlug[slug], order: i, status: 'published' }));
  }
  homeFaqs.forEach(([question, answer], i) => faqDocs.push({ question, answer, scope: 'home', order: i, status: 'published' }));
  await FAQ.insertMany(faqDocs);

  // 5. Starter guides
  for (const b of blogs) {
    const { related, ...data } = b;
    await Blog.create({ ...data, status: 'published', publishedAt: new Date(), relatedServices: related.map((r) => idBySlug[r]).filter(Boolean) });
  }

  // 6. Settings document
  await WebsiteSetting.getSingleton();

  console.log(`Seeded ${catDocs.length} categories, ${inserted.length} services, ${faqDocs.length} FAQs, ${blogs.length} articles.`);
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error('Seed failed:', err);
  await mongoose.disconnect();
  process.exit(1);
});

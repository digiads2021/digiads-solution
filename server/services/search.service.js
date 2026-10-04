import Service from '../models/Service.js';
import { escapeRegex } from '../utils/paginate.js';

// Searches published services by name, keywords, subcategory, category and description.
// The catalogue is small (~160 docs), so a regex scan + JS ranking gives good partial matching ("trad" -> Trademark).
export async function searchServices(q, limit = 10) {
  const term = q.trim().slice(0, 60);
  if (term.length < 2) return [];
  const words = term.split(/\s+/).filter(Boolean).map(escapeRegex);
  const rx = new RegExp(words.join('|'), 'i');

  const docs = await Service.find({
    status: 'published',
    $or: [{ name: rx }, { keywords: rx }, { subcategory: rx }, { shortDescription: rx }],
  })
    .select('name slug shortDescription subcategory keywords category popular')
    .populate('category', 'name slug')
    .limit(80)
    .lean();

  const lower = term.toLowerCase();
  const score = (d) => {
    const n = d.name.toLowerCase();
    let s = 0;
    if (n.startsWith(lower)) s += 100;
    if (n.includes(lower)) s += 60;
    words.forEach((w) => {
      const wr = new RegExp(w, 'i');
      if (wr.test(d.name)) s += 20;
      if ((d.keywords || []).some((k) => wr.test(k))) s += 12;
      if (wr.test(d.subcategory || '')) s += 8;
      if (wr.test(d.category?.name || '')) s += 6;
      if (wr.test(d.shortDescription || '')) s += 2;
    });
    if (d.popular) s += 3;
    return s;
  };

  return docs
    .map((d) => ({ d, s: score(d) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ d }) => ({
      name: d.name,
      slug: d.slug,
      shortDescription: d.shortDescription,
      subcategory: d.subcategory,
      category: d.category ? { name: d.category.name, slug: d.category.slug } : null,
      url: d.category ? `/services/${d.category.slug}/${d.slug}` : `/services`,
    }));
}

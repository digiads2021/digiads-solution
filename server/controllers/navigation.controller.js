import Service from '../models/Service.js';
import ServiceCategory from '../models/ServiceCategory.js';
import pillars from '../config/pillars.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/respond.js';

let cache = { at: 0, data: null };
const TTL = 5 * 60 * 1000;
export const clearNavigationCache = () => { cache = { at: 0, data: null }; };

// GET /api/navigation -> pillars -> columns (subcategories) -> links. Drives the mega menu and mobile menu.
export const getNavigation = asyncHandler(async (req, res) => {
  if (cache.data && Date.now() - cache.at < TTL) return ok(res, cache.data);

  const [categories, services] = await Promise.all([
    ServiceCategory.find({ status: 'published' }).select('name slug order icon').sort('order').lean(),
    Service.find({ status: 'published', showInMenu: true }).select('name slug category subcategory pillar menuOrder popular').sort('menuOrder').lean(),
  ]);
  const catById = Object.fromEntries(categories.map((c) => [String(c._id), c]));

  const data = pillars.map((p) => {
    const columns = [];
    for (const s of services.filter((x) => x.pillar === p.key)) {
      const cat = catById[String(s.category)];
      if (!cat) continue;
      const title = s.subcategory || cat.name;
      const key = `${cat.slug}|${title}`;
      let col = columns.find((c) => c.key === key);
      if (!col) columns.push((col = { key, title, category: { name: cat.name, slug: cat.slug }, order: cat.order, links: [], total: 0 }));
      col.total += 1;
      col.links.push({ name: s.name, url: `/services/${cat.slug}/${s.slug}`, popular: s.popular });
    }
    columns.sort((a, b) => a.order - b.order);
    return { ...p, columns };
  });

  cache = { at: Date.now(), data };
  ok(res, data);
});

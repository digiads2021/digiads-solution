import ServiceCategory from '../models/ServiceCategory.js';
import Service from '../models/Service.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import slugify from '../utils/slugify.js';
import { ok, created } from '../utils/respond.js';

const CARD_FIELDS = 'name slug shortDescription icon subcategory popular featured pillar';

// GET /api/categories?withPopular=3
export const listCategories = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { status: 'published' };
  const categories = await ServiceCategory.find(filter).sort('order').lean();
  const n = Math.min(8, parseInt(req.query.withPopular, 10) || 0);

  if (n > 0) {
    const services = await Service.find({ status: 'published' })
      .select('name slug category popular menuOrder')
      .sort({ popular: -1, menuOrder: 1 })
      .lean();
    const counts = {};
    for (const c of categories) {
      const own = services.filter((s) => String(s.category) === String(c._id));
      c.serviceCount = own.length;
      c.popularServices = own.slice(0, n).map((s) => ({ name: s.name, slug: s.slug }));
      counts[c._id] = own.length;
    }
  }
  ok(res, categories);
});

// GET /api/categories/:slug  -> category + services grouped by subcategory
export const getCategory = asyncHandler(async (req, res) => {
  const category = await ServiceCategory.findOne({ slug: req.params.slug, status: 'published' }).lean();
  if (!category) throw ApiError.notFound('Category not found');

  const services = await Service.find({ category: category._id, status: 'published' })
    .select(CARD_FIELDS)
    .sort('menuOrder')
    .lean();

  const groups = [];
  for (const s of services) {
    const title = s.subcategory || 'Services';
    let g = groups.find((x) => x.title === title);
    if (!g) groups.push((g = { title, services: [] }));
    g.services.push(s);
  }

  const related = await ServiceCategory.find({ _id: { $ne: category._id }, status: 'published' })
    .select('name slug icon shortDescription order')
    .sort('order')
    .lean();

  ok(res, { category, groups, services, relatedCategories: related });
});

// POST /api/categories (admin)
export const createCategory = asyncHandler(async (req, res) => {
  const data = { ...req.body, slug: slugify(req.body.slug || req.body.name) };
  created(res, await ServiceCategory.create(data));
});

// PUT /api/categories/:id (admin)
export const updateCategory = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.slug) data.slug = slugify(data.slug);
  const category = await ServiceCategory.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!category) throw ApiError.notFound('Category not found');
  ok(res, category);
});

// DELETE /api/categories/:id (admin) - blocked while services use it
export const deleteCategory = asyncHandler(async (req, res) => {
  const inUse = await Service.countDocuments({ category: req.params.id });
  if (inUse) throw ApiError.badRequest(`This category has ${inUse} services. Move or delete them first.`);
  const category = await ServiceCategory.findByIdAndDelete(req.params.id);
  if (!category) throw ApiError.notFound('Category not found');
  ok(res, { message: 'Category deleted' });
});

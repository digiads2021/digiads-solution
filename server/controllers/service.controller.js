import Service from '../models/Service.js';
import ServiceCategory from '../models/ServiceCategory.js';
import FAQ from '../models/FAQ.js';
import Blog from '../models/Blog.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import slugify from '../utils/slugify.js';
import getPagination, { getSort, escapeRegex } from '../utils/paginate.js';
import { cleanHtml } from '../utils/sanitize.js';
import { ok, created } from '../utils/respond.js';
import { searchServices } from '../services/search.service.js';

const CARD_FIELDS = 'name slug shortDescription icon subcategory pillar popular featured category';

// GET /api/services?category=&pillar=&popular=&featured=&page=&limit=
export const listServices = asyncHandler(async (req, res) => {
  const { page, limit, skip, meta } = getPagination(req.query, 12, 200);
  const filter = { status: 'published' };
  if (req.query.pillar) filter.pillar = String(req.query.pillar);
  if (req.query.popular === 'true') filter.popular = true;
  if (req.query.featured === 'true') filter.featured = true;
  if (req.query.lifecycleStage) filter.lifecycleStage = String(req.query.lifecycleStage);
  if (req.query.category) {
    const cat = await ServiceCategory.findOne({ slug: String(req.query.category) }).select('_id').lean();
    filter.category = cat ? cat._id : null;
  }

  const [items, total] = await Promise.all([
    Service.find(filter).select(CARD_FIELDS).populate('category', 'name slug').sort('menuOrder').skip(skip).limit(limit).lean(),
    Service.countDocuments(filter),
  ]);
  ok(res, items, meta(total));
  void page;
});

// GET /api/services/search?q=gst
export const search = asyncHandler(async (req, res) => {
  ok(res, await searchServices(String(req.query.q || '')));
});

// GET /api/services/:slug -> full page data, related services, FAQs, related articles
export const getService = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug, status: 'published' })
    .populate('category', 'name slug icon')
    .populate({ path: 'relatedServices', match: { status: 'published' }, select: CARD_FIELDS, populate: { path: 'category', select: 'slug name' } })
    .lean();
  if (!service) throw ApiError.notFound('Service not found');

  const [faqs, articles] = await Promise.all([
    FAQ.find({ scope: 'service', service: service._id, status: 'published' }).sort('order').select('question answer').lean(),
    Blog.find({ relatedServices: service._id, status: 'published' }).sort('-publishedAt').limit(3).select('title slug excerpt category publishedAt featuredImage').lean(),
  ]);

  ok(res, { ...service, faqs, articles });
});

// ---------- Admin ----------

// GET /api/admin/services?q=&status=&category=&pillar=&contentReviewed=&page=&sort=
export const adminListServices = asyncHandler(async (req, res) => {
  const { skip, limit, meta } = getPagination(req.query, 20, 100);
  const filter = {};
  if (req.query.status) filter.status = String(req.query.status);
  if (req.query.pillar) filter.pillar = String(req.query.pillar);
  if (req.query.category) filter.category = String(req.query.category);
  if (req.query.contentReviewed) filter.contentReviewed = req.query.contentReviewed === 'true';
  if (req.query.q) filter.name = new RegExp(escapeRegex(String(req.query.q)), 'i');
  const sort = getSort(req.query.sort, ['name', 'createdAt', 'updatedAt', 'menuOrder', 'status'], 'menuOrder');

  const [items, total] = await Promise.all([
    Service.find(filter).select('name slug status popular featured pillar contentReviewed category updatedAt menuOrder').populate('category', 'name slug').sort(sort).skip(skip).limit(limit).lean(),
    Service.countDocuments(filter),
  ]);
  ok(res, items, meta(total));
});

// GET /api/admin/services/options -> lightweight list for "related services" pickers
export const adminServiceOptions = asyncHandler(async (req, res) => {
  ok(res, await Service.find().select('name slug').sort('name').lean());
});

// GET /api/admin/services/:id
export const adminGetService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id).lean();
  if (!service) throw ApiError.notFound('Service not found');
  ok(res, service);
});

const prepare = (body) => {
  const data = { ...body };
  if (data.name && !data.slug) data.slug = slugify(data.name);
  if (data.slug) data.slug = slugify(data.slug);
  if (typeof data.overview === 'string') data.overview = cleanHtml(data.overview);
  if (data.lifecycleStage === '') data.lifecycleStage = undefined;
  if (data.contentReviewed === true) data.contentReviewedAt = new Date();
  return data;
};

// POST /api/services
export const createService = asyncHandler(async (req, res) => {
  created(res, await Service.create(prepare(req.body)));
});

// PUT /api/services/:id
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw ApiError.notFound('Service not found');
  service.set(prepare(req.body));
  await service.save();
  ok(res, service);
});

// PATCH /api/services/:id/status  { status?, popular?, featured? }
export const patchServiceFlags = asyncHandler(async (req, res) => {
  const allowed = {};
  for (const key of ['status', 'popular', 'featured', 'showInMenu']) if (key in req.body) allowed[key] = req.body[key];
  if (allowed.status && !['draft', 'published'].includes(allowed.status)) throw ApiError.badRequest('Invalid status');
  const service = await Service.findByIdAndUpdate(req.params.id, allowed, { new: true, runValidators: true });
  if (!service) throw ApiError.notFound('Service not found');
  ok(res, service);
});

// DELETE /api/services/:id
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) throw ApiError.notFound('Service not found');
  await Promise.all([
    FAQ.deleteMany({ service: service._id }),
    Service.updateMany({ relatedServices: service._id }, { $pull: { relatedServices: service._id } }),
  ]);
  ok(res, { message: 'Service deleted' });
});

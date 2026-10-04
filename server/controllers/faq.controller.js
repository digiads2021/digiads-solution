import FAQ from '../models/FAQ.js';
import Service from '../models/Service.js';
import ServiceCategory from '../models/ServiceCategory.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import getPagination, { escapeRegex } from '../utils/paginate.js';
import { ok, created } from '../utils/respond.js';

// GET /api/faqs?scope=home | ?service=<slug> | ?category=<slug>
export const listFaqs = asyncHandler(async (req, res) => {
  const filter = { status: 'published' };
  if (req.query.service) {
    const s = await Service.findOne({ slug: String(req.query.service) }).select('_id').lean();
    Object.assign(filter, { scope: 'service', service: s?._id || null });
  } else if (req.query.category) {
    const c = await ServiceCategory.findOne({ slug: String(req.query.category) }).select('_id').lean();
    Object.assign(filter, { scope: 'category', category: c?._id || null });
  } else if (req.query.scope) {
    filter.scope = { $in: String(req.query.scope).split(',') };
  }
  ok(res, await FAQ.find(filter).sort('order').select('question answer scope').limit(100).lean());
});

// GET /api/admin/faqs?q=&scope=&status=&page=
export const adminListFaqs = asyncHandler(async (req, res) => {
  const { skip, limit, meta } = getPagination(req.query, 20, 100);
  const filter = {};
  if (req.query.scope) filter.scope = String(req.query.scope);
  if (req.query.status) filter.status = String(req.query.status);
  if (req.query.service) filter.service = String(req.query.service);
  if (req.query.q) filter.question = new RegExp(escapeRegex(String(req.query.q)), 'i');
  const [items, total] = await Promise.all([
    FAQ.find(filter).populate('service', 'name').populate('category', 'name').sort({ scope: 1, order: 1 }).skip(skip).limit(limit).lean(),
    FAQ.countDocuments(filter),
  ]);
  ok(res, items, meta(total));
});

const clean = (b) => ({
  ...b,
  service: b.scope === 'service' ? b.service || null : null,
  category: b.scope === 'category' ? b.category || null : null,
});

export const createFaq = asyncHandler(async (req, res) => created(res, await FAQ.create(clean(req.body))));

export const updateFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, clean(req.body), { new: true, runValidators: true });
  if (!faq) throw ApiError.notFound('FAQ not found');
  ok(res, faq);
});

export const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) throw ApiError.notFound('FAQ not found');
  ok(res, { message: 'FAQ deleted' });
});

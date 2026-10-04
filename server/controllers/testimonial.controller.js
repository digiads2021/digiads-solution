import Testimonial from '../models/Testimonial.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import getPagination from '../utils/paginate.js';
import { ok, created } from '../utils/respond.js';

// GET /api/testimonials (published only)
export const listTestimonials = asyncHandler(async (req, res) => {
  const filter = { status: 'published', consentGiven: true };
  if (req.query.featured === 'true') filter.featured = true;
  ok(res, await Testimonial.find(filter).sort('order').limit(12).select('-consentGiven').lean());
});

export const adminListTestimonials = asyncHandler(async (req, res) => {
  const { skip, limit, meta } = getPagination(req.query, 20, 100);
  const [items, total] = await Promise.all([
    Testimonial.find().sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    Testimonial.countDocuments(),
  ]);
  ok(res, items, meta(total));
});

export const createTestimonial = asyncHandler(async (req, res) => {
  try {
    created(res, await Testimonial.create(req.body));
  } catch (e) {
    if (e.message.includes('consent')) throw ApiError.badRequest(e.message);
    throw e;
  }
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const t = await Testimonial.findById(req.params.id);
  if (!t) throw ApiError.notFound('Testimonial not found');
  t.set(req.body);
  try {
    await t.save();
  } catch (e) {
    if (e.message.includes('consent')) throw ApiError.badRequest(e.message);
    throw e;
  }
  ok(res, t);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const t = await Testimonial.findByIdAndDelete(req.params.id);
  if (!t) throw ApiError.notFound('Testimonial not found');
  ok(res, { message: 'Testimonial deleted' });
});

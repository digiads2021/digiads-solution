import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import getPagination, { escapeRegex } from '../utils/paginate.js';
import { ok } from '../utils/respond.js';

// POST /api/newsletter/subscribe - duplicates are handled gracefully
export const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const existing = await NewsletterSubscriber.findOne({ email });
  if (existing && existing.status === 'subscribed') {
    return ok(res, { message: 'You are already subscribed. Thank you!' });
  }
  if (existing) {
    existing.status = 'subscribed';
    await existing.save();
  } else {
    await NewsletterSubscriber.create({ email });
  }
  ok(res, { message: 'Subscribed! You will receive DigiAds updates by email.' }, undefined, 201);
});

export const listSubscribers = asyncHandler(async (req, res) => {
  const { skip, limit, meta } = getPagination(req.query, 25, 100);
  const filter = {};
  if (req.query.status) filter.status = String(req.query.status);
  if (req.query.q) filter.email = new RegExp(escapeRegex(String(req.query.q)), 'i');
  const [items, total] = await Promise.all([
    NewsletterSubscriber.find(filter).sort('-createdAt').skip(skip).limit(limit).lean(),
    NewsletterSubscriber.countDocuments(filter),
  ]);
  ok(res, items, meta(total));
});

export const exportSubscribers = asyncHandler(async (req, res) => {
  const items = await NewsletterSubscriber.find({ status: 'subscribed' }).sort('-createdAt').lean();
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="digiads-subscribers.csv"');
  res.send(['email,subscribedAt', ...items.map((i) => `${i.email},${new Date(i.createdAt).toISOString()}`)].join('\n'));
});

export const updateSubscriber = asyncHandler(async (req, res) => {
  const status = req.body.status === 'unsubscribed' ? 'unsubscribed' : 'subscribed';
  const sub = await NewsletterSubscriber.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!sub) throw ApiError.notFound('Subscriber not found');
  ok(res, sub);
});

export const deleteSubscriber = asyncHandler(async (req, res) => {
  const sub = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
  if (!sub) throw ApiError.notFound('Subscriber not found');
  ok(res, { message: 'Subscriber removed' });
});

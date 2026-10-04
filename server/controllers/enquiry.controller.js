import Enquiry from '../models/Enquiry.js';
import Service from '../models/Service.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import getPagination, { getSort, escapeRegex } from '../utils/paginate.js';
import { ok, created } from '../utils/respond.js';
import { notifyNewEnquiry } from '../services/email.service.js';

// Builds a create handler for one enquiry type (lead / contact / consultation).
const createFor = (type, successMessage) =>
  asyncHandler(async (req, res) => {
    const { website, service: serviceSlug, ...body } = req.body; // "website" is the honeypot
    const data = { ...body, type };
    if (serviceSlug) {
      const s = await Service.findOne({ slug: serviceSlug }).select('_id name').lean();
      if (s) { data.service = s._id; data.serviceName = s.name; }
    }
    const enquiry = await Enquiry.create(data);
    // Awaited (with a time limit) because a serverless function may be frozen as soon as it responds,
    // which would silently drop a fire-and-forget email. Email failures never fail the submission.
    await notifyNewEnquiry(enquiry);
    created(res, { id: enquiry._id, message: successMessage });
  });

export const createLead = createFor('lead', 'Thank you! A DigiAds expert will contact you shortly.');
export const createContact = createFor('contact', 'Thank you for writing to us. We will get back to you soon.');
export const createConsultation = createFor('consultation', 'Your consultation request has been received. We will call you to schedule it.');

const buildFilter = (q) => {
  const filter = { isArchived: q.archived === 'true' };
  if (typeof q.type === 'string' && q.type) filter.type = q.type;
  if (typeof q.status === 'string' && q.status) filter.status = q.status;
  // Dates come from <input type="date"> (YYYY-MM-DD) and are interpreted in India time (IST).
  const isDate = (d) => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d);
  if (isDate(q.from) || isDate(q.to)) {
    filter.createdAt = {};
    if (isDate(q.from)) filter.createdAt.$gte = new Date(`${q.from}T00:00:00+05:30`);
    if (isDate(q.to)) filter.createdAt.$lte = new Date(`${q.to}T23:59:59.999+05:30`);
  }
  if (q.q) {
    const rx = new RegExp(escapeRegex(String(q.q)), 'i');
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { serviceName: rx }, { subject: rx }];
  }
  return filter;
};

// GET /api/enquiries?type=&status=&q=&from=&to=&sort=&page=
export const listEnquiries = asyncHandler(async (req, res) => {
  const { skip, limit, meta } = getPagination(req.query, 20, 100);
  const filter = buildFilter(req.query);
  const sort = getSort(req.query.sort, ['createdAt', 'name', 'status'], '-createdAt');
  const [items, total] = await Promise.all([
    Enquiry.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Enquiry.countDocuments(filter),
  ]);
  ok(res, items, meta(total));
});

// GET /api/enquiries/export?type=... -> CSV download
export const exportEnquiries = asyncHandler(async (req, res) => {
  const items = await Enquiry.find(buildFilter(req.query)).sort('-createdAt').limit(5000).lean();
  const cols = ['createdAt', 'type', 'status', 'name', 'phone', 'email', 'city', 'serviceName', 'subject', 'preferredContact', 'message', 'sourcePage'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
  const csv = [cols.join(','), ...items.map((i) => cols.map((c) => esc(c === 'createdAt' ? new Date(i[c]).toISOString() : i[c])).join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="digiads-${String(req.query.type || 'enquiries').replace(/[^a-z_-]/gi, '')}.csv"`);
  res.send(csv);
});

export const getEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id).lean();
  if (!enquiry) throw ApiError.notFound('Enquiry not found');
  ok(res, enquiry);
});

// PATCH /api/enquiries/:id { status?, note?, isArchived? }
export const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) throw ApiError.notFound('Enquiry not found');
  const { status, note, isArchived } = req.body;
  if (status) enquiry.status = status;
  if (typeof isArchived === 'boolean') enquiry.isArchived = isArchived;
  if (note) enquiry.notes.push({ text: note, by: req.admin.name });
  await enquiry.save();
  ok(res, enquiry);
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) throw ApiError.notFound('Enquiry not found');
  ok(res, { message: 'Enquiry deleted' });
});

import Service from '../models/Service.js';
import Enquiry from '../models/Enquiry.js';
import Blog from '../models/Blog.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/respond.js';

// GET /api/admin/dashboard - real counts only
export const getDashboard = asyncHandler(async (req, res) => {
  const since = new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000);
  const [
    totalServices, publishedServices, awaitingReview,
    totalLeads, newLeads, consultations, newConsultations, contacts, newContacts,
    blogPosts, subscribers, latest, weekly,
  ] = await Promise.all([
    Service.countDocuments(),
    Service.countDocuments({ status: 'published' }),
    Service.countDocuments({ contentReviewed: false }),
    Enquiry.countDocuments({ type: 'lead' }),
    Enquiry.countDocuments({ type: 'lead', status: 'new' }),
    Enquiry.countDocuments({ type: 'consultation' }),
    Enquiry.countDocuments({ type: 'consultation', status: 'new' }),
    Enquiry.countDocuments({ type: 'contact' }),
    Enquiry.countDocuments({ type: 'contact', status: 'new' }),
    Blog.countDocuments({ status: 'published' }),
    NewsletterSubscriber.countDocuments({ status: 'subscribed' }),
    Enquiry.find({ isArchived: false }).sort('-createdAt').limit(8).select('type name phone serviceName subject status createdAt').lean(),
    Enquiry.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%G-W%V', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
  ]);

  ok(res, {
    counts: { totalServices, publishedServices, awaitingReview, totalLeads, newLeads, consultations, newConsultations, contacts, newContacts, blogPosts, subscribers },
    latest,
    weekly: weekly.map((w) => ({ week: w._id, count: w.count })),
  });
});

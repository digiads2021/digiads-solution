import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

import validate from '../middleware/validate.js';
import { authenticateAdmin, requireRole } from '../middleware/auth.js';
import { loginLimiter, formLimiter, newsletterLimiter, searchLimiter } from '../middleware/rateLimiters.js';
import * as v from '../validators/index.js';
import ApiError from '../utils/ApiError.js';
import { usesMemoryStorage } from '../services/storage.service.js';

import * as auth from '../controllers/auth.controller.js';
import * as categories from '../controllers/category.controller.js';
import * as services from '../controllers/service.controller.js';
import * as nav from '../controllers/navigation.controller.js';
import * as faqs from '../controllers/faq.controller.js';
import * as enquiries from '../controllers/enquiry.controller.js';
import * as newsletter from '../controllers/newsletter.controller.js';
import * as blogs from '../controllers/blog.controller.js';
import * as testimonials from '../controllers/testimonial.controller.js';
import * as settings from '../controllers/setting.controller.js';
import * as dashboard from '../controllers/dashboard.controller.js';
import * as upload from '../controllers/upload.controller.js';

const router = Router();
const admin = authenticateAdmin;
const superadmin = [authenticateAdmin, requireRole('superadmin')];
// Clears the cached mega-menu whenever services or categories change.
const bustNav = (req, res, next) => { nav.clearNavigationCache(); next(); };

// ---------- Image uploads (admin) ----------
// Cloud storage (Cloudinary / Vercel Blob) receives the file from memory; local development writes to server/uploads.
// The choice is made per request so it always reflects the loaded environment variables.
const uploadOptions = {
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const okType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
    const okExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file.originalname).toLowerCase());
    cb(okType && okExt ? null : ApiError.badRequest('Only JPG, PNG or WebP images are allowed'), okType && okExt);
  },
};
const memoryUpload = multer({ ...uploadOptions, storage: multer.memoryStorage() });
// Built on first use only: multer creates the destination folder when disk storage is constructed,
// which crashes on read-only serverless filesystems such as Vercel's.
let diskUpload;
const getDiskUpload = () =>
  (diskUpload ||= multer({
    ...uploadOptions,
    storage: multer.diskStorage({
      destination: 'uploads/',
      filename: (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname).toLowerCase()}`),
    }),
  }));
const imageUpload = (field) => (req, res, next) => (usesMemoryStorage() ? memoryUpload : getDiskUpload()).single(field)(req, res, next);

// ---------- Health ----------
router.get('/health', (req, res) => res.json({ success: true, data: { status: 'ok', time: new Date().toISOString() } }));

// ---------- Auth ----------
router.post('/auth/login', loginLimiter, validate(v.loginSchema), auth.login);
router.post('/auth/logout', auth.logout);
router.get('/auth/me', admin, auth.me);
router.post('/auth/change-password', admin, validate(v.changePasswordSchema), auth.changePassword);

// ---------- Navigation ----------
router.get('/navigation', nav.getNavigation);

// ---------- Categories ----------
router.get('/categories', categories.listCategories);
router.get('/categories/:slug', categories.getCategory);
router.get('/admin/categories', admin, categories.listCategories);
router.post('/categories', admin, bustNav, validate(v.categorySchema), categories.createCategory);
router.put('/categories/:id', admin, bustNav, validate(v.categorySchema), categories.updateCategory);
router.delete('/categories/:id', ...superadmin, bustNav, categories.deleteCategory);

// ---------- Services ----------
router.get('/services', services.listServices);
router.get('/services/search', searchLimiter, services.search);
router.get('/services/:slug', services.getService);
router.get('/admin/services', admin, services.adminListServices);
router.get('/admin/services/options', admin, services.adminServiceOptions);
router.get('/admin/services/:id', admin, services.adminGetService);
router.post('/services', admin, bustNav, validate(v.serviceSchema), services.createService);
router.put('/services/:id', admin, bustNav, validate(v.serviceSchema), services.updateService);
router.patch('/services/:id/status', admin, bustNav, services.patchServiceFlags);
router.delete('/services/:id', ...superadmin, bustNav, services.deleteService);

// ---------- FAQs ----------
router.get('/faqs', faqs.listFaqs);
router.get('/admin/faqs', admin, faqs.adminListFaqs);
router.post('/faqs', admin, validate(v.faqSchema), faqs.createFaq);
router.put('/faqs/:id', admin, validate(v.faqSchema), faqs.updateFaq);
router.delete('/faqs/:id', admin, faqs.deleteFaq);

// ---------- Enquiries: public forms ----------
router.post('/leads', formLimiter, validate(v.leadSchema), enquiries.createLead);
router.post('/contact', formLimiter, validate(v.contactSchema), enquiries.createContact);
router.post('/consultations', formLimiter, validate(v.consultationSchema), enquiries.createConsultation);

// ---------- Enquiries: admin ----------
router.get('/enquiries', admin, enquiries.listEnquiries);
router.get('/enquiries/export', admin, enquiries.exportEnquiries);
router.get('/enquiries/:id', admin, enquiries.getEnquiry);
router.patch('/enquiries/:id', admin, validate(v.enquiryUpdateSchema), enquiries.updateEnquiry);
router.delete('/enquiries/:id', ...superadmin, enquiries.deleteEnquiry);

// ---------- Newsletter ----------
router.post('/newsletter/subscribe', newsletterLimiter, validate(v.newsletterSchema), newsletter.subscribe);
router.get('/newsletter', admin, newsletter.listSubscribers);
router.get('/newsletter/export', admin, newsletter.exportSubscribers);
router.patch('/newsletter/:id', admin, newsletter.updateSubscriber);
router.delete('/newsletter/:id', ...superadmin, newsletter.deleteSubscriber);

// ---------- Blog ----------
router.get('/blogs', blogs.listBlogs);
router.get('/blogs/categories', blogs.blogCategories);
router.get('/blogs/:slug', blogs.getBlog);
router.get('/admin/blogs', admin, blogs.adminListBlogs);
router.get('/admin/blogs/:id', admin, blogs.adminGetBlog);
router.post('/blogs', admin, validate(v.blogSchema), blogs.createBlog);
router.put('/blogs/:id', admin, validate(v.blogSchema), blogs.updateBlog);
router.delete('/blogs/:id', admin, blogs.deleteBlog);

// ---------- Testimonials ----------
router.get('/testimonials', testimonials.listTestimonials);
router.get('/admin/testimonials', admin, testimonials.adminListTestimonials);
router.post('/testimonials', admin, validate(v.testimonialSchema), testimonials.createTestimonial);
router.put('/testimonials/:id', admin, validate(v.testimonialSchema), testimonials.updateTestimonial);
router.delete('/testimonials/:id', admin, testimonials.deleteTestimonial);

// ---------- Settings, dashboard, uploads ----------
router.get('/settings', settings.getSettings);
router.put('/settings', ...superadmin, validate(v.settingsSchema), settings.updateSettings);
router.get('/admin/dashboard', admin, dashboard.getDashboard);
router.post('/uploads/image', admin, imageUpload('image'), upload.uploadImage);

export default router;

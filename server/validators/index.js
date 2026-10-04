import { z } from 'zod';

const phone = z
  .string({ required_error: 'Phone number is required' })
  .trim()
  .regex(/^[+]?[\d\s-]{7,16}$/, 'Enter a valid phone number');
const email = z.string().trim().toLowerCase().email('Enter a valid email address');
const optionalEmail = z.union([email, z.literal('')]).optional();
const name = z.string({ required_error: 'Name is required' }).trim().min(2, 'Name is too short').max(80);
const honeypot = z.string().max(0, 'Spam detected').optional(); // hidden "website" field must stay empty

// ---------- Auth ----------
export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(10, 'Use at least 10 characters'),
});

// ---------- Public forms ----------
export const leadSchema = z.object({
  name,
  email: optionalEmail,
  phone,
  city: z.string().trim().max(60).optional(),
  service: z.string().trim().max(60).optional(), // service slug
  serviceName: z.string().trim().max(160).optional(),
  message: z.string().trim().max(2000).optional(),
  sourcePage: z.string().trim().max(300).optional(),
  website: honeypot,
});
export const contactSchema = z.object({
  name,
  email,
  phone,
  subject: z.string().trim().min(2, 'Subject is required').max(150),
  message: z.string().trim().min(5, 'Please write a short message').max(3000),
  website: honeypot,
});
export const consultationSchema = z.object({
  name,
  email: optionalEmail,
  phone,
  service: z.string().trim().max(60).optional(),
  serviceName: z.string().trim().max(160).optional(),
  preferredContact: z.enum(['phone', 'whatsapp', 'email', '']).optional(),
  message: z.string().trim().max(2000).optional(),
  sourcePage: z.string().trim().max(300).optional(),
  website: honeypot,
});
export const newsletterSchema = z.object({ email, website: honeypot });

// ---------- Admin ----------
export const enquiryUpdateSchema = z.object({
  status: z.enum(['new', 'contacted', 'in_progress', 'converted', 'closed']).optional(),
  note: z.string().trim().max(1000).optional(),
  isArchived: z.boolean().optional(),
});

const titled = z.object({ title: z.string().trim().min(1), description: z.string().trim().optional().default('') });
const str = z.string().trim();

export const categorySchema = z.object({
  name: str.min(2),
  slug: str.optional(),
  shortDescription: str.max(300).optional(),
  overview: str.optional(),
  icon: str.optional(),
  order: z.coerce.number().optional(),
  status: z.enum(['draft', 'published']).optional(),
  benefits: z.array(titled).optional(),
  process: z.array(titled).optional(),
  seo: z.object({ title: str.optional(), description: str.optional() }).optional(),
});

export const serviceSchema = z.object({
  name: str.min(2, 'Name is required'),
  slug: str.optional(),
  category: str.min(1, 'Category is required'),
  subcategory: str.optional(),
  pillar: z.enum(['registration', 'tax-compliance', 'legal-ip', 'licences-iso', 'technology', 'global']),
  lifecycleStage: z.enum(['idea', 'register', 'comply', 'protect', 'build', 'grow', 'expand']).optional().or(z.literal('')),
  icon: str.optional(),
  shortDescription: str.max(300).optional(),
  heroSummary: str.optional(),
  highlights: z.array(str).optional(),
  overview: z.string().optional(),
  eligibility: z.array(str).optional(),
  requirements: z.array(str).optional(),
  benefits: z.array(titled).optional(),
  comparisonTable: z.object({ columns: z.array(str), rows: z.array(z.array(str)) }).optional(),
  documentGroups: z.array(z.object({ title: str, items: z.array(str) })).optional(),
  process: z.array(titled).optional(),
  deliverables: z.array(str).optional(),
  afterService: z.array(str).optional(),
  pitfalls: z.array(str).optional(),
  jurisdictions: z.array(str).optional(),
  pricing: z
    .object({
      show: z.boolean().optional(),
      startingFrom: z.coerce.number().optional().nullable(),
      plans: z.array(z.object({ name: str, price: z.coerce.number(), includes: z.array(str) })).optional(),
      govtFeeNote: str.optional(),
    })
    .optional(),
  timeline: z.object({ show: z.boolean().optional(), text: str.optional() }).optional(),
  keywords: z.array(str).optional(),
  relatedServices: z.array(str).optional(),
  popular: z.boolean().optional(),
  featured: z.boolean().optional(),
  showInMenu: z.boolean().optional(),
  menuOrder: z.coerce.number().optional(),
  status: z.enum(['draft', 'published']).optional(),
  contentReviewed: z.boolean().optional(),
  seo: z.object({ title: str.optional(), description: str.optional(), keywords: z.array(str).optional() }).optional(),
});

export const faqSchema = z.object({
  question: str.min(5),
  answer: str.min(2),
  scope: z.enum(['home', 'general', 'category', 'service']),
  category: str.optional().nullable(),
  service: str.optional().nullable(),
  order: z.coerce.number().optional(),
  status: z.enum(['draft', 'published']).optional(),
});

export const blogSchema = z.object({
  title: str.min(3),
  slug: str.optional(),
  excerpt: str.max(400).optional(),
  content: z.string().optional(),
  featuredImage: z.object({ url: str.optional(), alt: str.optional() }).optional(),
  category: str.optional(),
  tags: z.array(str).optional(),
  author: str.optional(),
  relatedServices: z.array(str).optional(),
  seo: z.object({ title: str.optional(), description: str.optional(), canonical: str.optional() }).optional(),
  status: z.enum(['draft', 'published']).optional(),
});

export const testimonialSchema = z.object({
  name: str.min(2),
  company: str.optional(),
  serviceName: str.optional(),
  text: str.min(10).max(1000),
  photo: str.optional(),
  rating: z.coerce.number().min(1).max(5).optional().nullable(),
  consentGiven: z.boolean().optional(),
  status: z.enum(['draft', 'published']).optional(),
  featured: z.boolean().optional(),
  order: z.coerce.number().optional(),
});

export const settingsSchema = z.object({
  siteName: str.optional(),
  tagline: str.optional(),
  contact: z
    .object({
      phone: str.optional(), email: str.optional(), whatsapp: str.optional(),
      addressIndia: str.optional(), addressUAE: str.optional(), hours: str.optional(),
    })
    .optional(),
  social: z
    .object({ facebook: str.optional(), instagram: str.optional(), linkedin: str.optional(), youtube: str.optional(), x: str.optional() })
    .optional(),
  seoDefaults: z.object({ title: str.optional(), description: str.optional(), ogImage: str.optional() }).optional(),
});

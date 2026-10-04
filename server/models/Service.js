import mongoose from 'mongoose';
import { pillarKeys, lifecycleStages } from '../config/pillars.js';

const titled = new mongoose.Schema({ title: String, description: String }, { _id: false });
const docGroup = new mongoose.Schema({ title: String, items: [String] }, { _id: false });
const table = new mongoose.Schema({ columns: [String], rows: [[String]] }, { _id: false });
const plan = new mongoose.Schema({ name: String, price: Number, includes: [String] }, { _id: false });

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
    subcategory: { type: String, trim: true },
    pillar: { type: String, enum: pillarKeys, required: true },
    lifecycleStage: { type: String, enum: lifecycleStages },
    icon: { type: String, default: 'FileText' },

    shortDescription: { type: String, trim: true, maxlength: 300 },
    heroSummary: String,
    highlights: [String],
    overview: String, // sanitized HTML or plain paragraphs
    eligibility: [String],
    requirements: [String],
    benefits: [titled],
    comparisonTable: table,
    documentGroups: [docGroup],
    process: [titled],
    deliverables: [String],
    afterService: [String],
    pitfalls: [String],
    jurisdictions: [String],

    pricing: {
      show: { type: Boolean, default: false },
      startingFrom: Number,
      plans: [plan],
      govtFeeNote: String,
    },
    timeline: { show: { type: Boolean, default: false }, text: String },

    keywords: [String],
    relatedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],

    popular: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    showInMenu: { type: Boolean, default: true },
    menuOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    contentReviewed: { type: Boolean, default: false },
    contentReviewedAt: Date,

    seo: { title: String, description: String, keywords: [String] },
  },
  { timestamps: true }
);

serviceSchema.index({ category: 1, status: 1, menuOrder: 1 });
serviceSchema.index({ pillar: 1, showInMenu: 1, menuOrder: 1 });
serviceSchema.index({ popular: 1, status: 1 });
serviceSchema.index({ featured: 1, status: 1 });
serviceSchema.index(
  { name: 'text', keywords: 'text', subcategory: 'text', shortDescription: 'text' },
  { weights: { name: 10, keywords: 6, subcategory: 4, shortDescription: 2 }, name: 'service_text' }
);

export default mongoose.model('Service', serviceSchema);

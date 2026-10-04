import mongoose from 'mongoose';

export const ENQUIRY_TYPES = ['lead', 'contact', 'consultation'];
export const ENQUIRY_STATUSES = ['new', 'contacted', 'in_progress', 'converted', 'closed'];

const noteSchema = new mongoose.Schema(
  { text: String, by: String, at: { type: Date, default: Date.now } },
  { _id: false }
);

// One model for leads, contact messages and consultation requests (field: type).
const enquirySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ENQUIRY_TYPES, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, trim: true },
    subject: { type: String, trim: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    serviceName: { type: String, trim: true },
    preferredContact: { type: String, enum: ['phone', 'whatsapp', 'email', ''], default: '' },
    message: { type: String, trim: true },
    sourcePage: { type: String, trim: true },
    status: { type: String, enum: ENQUIRY_STATUSES, default: 'new' },
    notes: [noteSchema],
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

enquirySchema.index({ type: 1, status: 1, createdAt: -1 });
enquirySchema.index({ email: 1 });
enquirySchema.index({ phone: 1 });

export default mongoose.model('Enquiry', enquirySchema);

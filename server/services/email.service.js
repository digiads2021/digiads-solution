import nodemailer from 'nodemailer';
import env from '../config/env.js';
import logger from '../utils/logger.js';

let transporter = null;
if (env.smtp.host && env.smtp.user && env.smtp.pass) {
  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: { user: env.smtp.user, pass: env.smtp.pass },
  });
}

// Sends a short alert to DigiAds for every new enquiry. Silently skipped when SMTP is not configured.
export async function notifyNewEnquiry(enquiry) {
  if (!transporter || !env.smtp.notifyEmail) return;
  const label = { lead: 'Service lead', contact: 'Contact message', consultation: 'Consultation request' }[enquiry.type];
  try {
    await transporter.sendMail({
      from: env.smtp.user,
      to: env.smtp.notifyEmail,
      subject: `New ${label}: ${enquiry.name}${enquiry.serviceName ? ` – ${enquiry.serviceName}` : ''}`,
      text: [
        `Type: ${label}`,
        `Name: ${enquiry.name}`,
        `Phone: ${enquiry.phone}`,
        `Email: ${enquiry.email || '-'}`,
        `Service: ${enquiry.serviceName || '-'}`,
        `Subject: ${enquiry.subject || '-'}`,
        `Message: ${enquiry.message || '-'}`,
        `Page: ${enquiry.sourcePage || '-'}`,
      ].join('\n'),
    });
  } catch (err) {
    logger.warn('Enquiry email failed:', err.message);
  }
}

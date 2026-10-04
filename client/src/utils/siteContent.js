// Static homepage content (copy + links). Services themselves always come from the API.
export const quickActions = [
  { label: 'Start a Business', to: '/services/business-registration', icon: 'Rocket' },
  { label: 'Register GST', to: '/services/gst-income-tax/gst-registration', icon: 'Receipt' },
  { label: 'Protect Your Brand', to: '/services/trademark-fssai-import-export/trademark-registration', icon: 'ShieldCheck' },
  { label: 'File Your Taxes', to: '/services/gst-income-tax/individual-itr-filing', icon: 'Calculator' },
  { label: 'Build Your Website', to: '/services/website-app-development/business-website-development', icon: 'MonitorSmartphone' },
  { label: 'Go Global', to: '/services/global-business', icon: 'Globe2' },
];

export const pillarWords = [
  { word: 'Start', text: 'Register your company, firm, NGO or startup.' },
  { word: 'Comply', text: 'GST, income tax, MCA filings and payroll.' },
  { word: 'Protect', text: 'Trademarks, agreements and legal notices.' },
  { word: 'Build', text: 'Websites, web apps and mobile apps.' },
  { word: 'Go Global', text: 'UAE company formation, licences and visas.' },
];

export const values = [
  { title: 'Professional assistance', text: 'Your work is handled by people who deal with registrations, tax and compliance every day.', icon: 'BadgeCheck' },
  { title: 'End-to-end support', text: 'From the first question to the final certificate — and the compliance that follows.', icon: 'ClipboardCheck' },
  { title: 'Many services, one partner', text: 'Registration, tax, legal, licences, technology and global setup under one roof.', icon: 'Building2' },
  { title: 'Digital-first experience', text: 'Share documents online and get updates without visiting an office.', icon: 'MonitorSmartphone' },
  { title: 'Transparent communication', text: 'Clear checklists, honest guidance and a quote before we start.', icon: 'MessagesSquare' },
  { title: 'India + global services', text: 'Support for businesses in India and founders expanding to the UAE.', icon: 'Globe2' },
];

export const intents = [
  { label: 'I want to start a business', to: '/services/business-registration', icon: 'Rocket' },
  { label: 'I need tax or GST help', to: '/services/gst-income-tax', icon: 'Receipt' },
  { label: 'I want to protect my brand', to: '/services/trademark-fssai-import-export/trademark-registration', icon: 'ShieldCheck' },
  { label: 'I need legal documents', to: '/services/legal-documents', icon: 'FileSignature' },
  { label: 'I want to build a website or app', to: '/services/website-app-development', icon: 'MonitorSmartphone' },
  { label: 'I want to expand internationally', to: '/services/global-business', icon: 'Globe2' },
];

export const journey = [
  { key: 'idea', label: 'Idea', icon: 'Lightbulb', title: 'Shape your idea', text: 'Plan the business, choose the right structure and prepare for funding.' },
  { key: 'register', label: 'Register', icon: 'Building2', title: 'Register the right way', text: 'Incorporate your company, LLP, firm, NGO or trust with correct documents.' },
  { key: 'comply', label: 'Comply', icon: 'ClipboardCheck', title: 'Stay compliant', text: 'GST, income tax, MCA annual filings and payroll registrations.' },
  { key: 'protect', label: 'Protect', icon: 'ShieldCheck', title: 'Protect what you build', text: 'Trademarks, agreements and legal notices that keep your business safe.' },
  { key: 'build', label: 'Build', icon: 'MonitorSmartphone', title: 'Build digitally', text: 'Websites, web applications, mobile apps and integrations.' },
  { key: 'grow', label: 'Grow', icon: 'Rocket', title: 'Grow with recognition', text: 'Startup India, Udyam, FSSAI, IEC and ISO certifications.' },
  { key: 'expand', label: 'Expand', icon: 'Globe2', title: 'Expand beyond borders', text: 'UAE company formation, trade licences, visas and office solutions.' },
];

export const howItWorks = [
  { title: 'Choose a service', text: 'Search or browse to find the service you need, or ask us to suggest one.' },
  { title: 'Tell us your requirement', text: 'Share a few details. An expert reviews your case and sends a document checklist.' },
  { title: 'Get expert assistance', text: 'We prepare, review and file on your behalf, keeping you updated.' },
  { title: 'Complete the process', text: 'Receive your deliverables and guidance on what comes next.' },
];

export const BLOG_CATEGORIES = ['Business', 'Startup', 'GST', 'Income Tax', 'MCA', 'Trademark', 'Legal', 'Compliance', 'Technology', 'UAE / Global Business'];

// Contact placeholders: replaced automatically once verified details are saved in Admin > Settings.
export const PLACEHOLDER = { phone: '[ADD VERIFIED PHONE]', email: '[ADD VERIFIED EMAIL]', address: '[ADD VERIFIED ADDRESS]' };

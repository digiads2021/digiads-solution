// The 10 service categories from the DigiAds service catalogue (source of truth).
const genericProcess = [
  { title: 'Choose a service', description: 'Pick the service you need, or tell us your goal and we will suggest the right one.' },
  { title: 'Share your requirement', description: 'A DigiAds expert understands your situation and shares the document checklist.' },
  { title: 'Expert preparation', description: 'We prepare, review and file the application or deliver the work on your behalf.' },
  { title: 'Completion and next steps', description: 'You receive the deliverables and guidance on the compliance or steps that follow.' },
];

const categories = [
  {
    name: 'Business Registration',
    slug: 'business-registration',
    icon: 'Building2',
    order: 1,
    shortDescription: 'Register a private limited company, LLP, OPC, partnership, proprietorship and more.',
    overview:
      'Choosing the right legal structure decides how your business is taxed, how much liability you carry and how easily you can raise money later. DigiAds helps you compare structures, prepares the incorporation documents and handles the filings with the relevant authority so you can start operating with confidence.',
    benefits: [
      { title: 'Right structure from day one', description: 'Compare company, LLP, OPC, partnership and proprietorship before you commit.' },
      { title: 'Documents prepared for you', description: 'MoA, AoA, partnership deeds and forms drafted and checked by professionals.' },
      { title: 'Post-registration guidance', description: 'Know which registrations and annual filings follow incorporation.' },
    ],
    process: genericProcess,
  },
  {
    name: 'NGO, Society & Trust',
    slug: 'ngo-society-trust',
    icon: 'HeartHandshake',
    order: 2,
    shortDescription: 'Section 8 company, trust and society registration, 12A, 80G, CSR-1 and renewals.',
    overview:
      'Non-profit organisations need the right registration and the right tax approvals to receive donations and CSR funds. DigiAds supports founders of NGOs, trusts, societies and associations from registration through 12A/12AB, 80G, NGO Darpan and CSR-1, and with ongoing renewals and reports.',
    benefits: [
      { title: 'Registration and approvals together', description: 'Plan your registration with 12A, 80G and CSR-1 in mind from the start.' },
      { title: 'Donor-ready compliance', description: 'Keep audit reports, activity reports and renewals up to date.' },
      { title: 'One team throughout', description: 'The same experts support registration and yearly compliance.' },
    ],
    process: genericProcess,
  },
  {
    name: 'MCA / ROC Compliance',
    slug: 'mca-roc-compliance',
    icon: 'ClipboardCheck',
    order: 3,
    shortDescription: 'Annual filings for companies, LLPs and OPCs, plus changes, conversions and closure.',
    overview:
      'Every company and LLP registered with the Ministry of Corporate Affairs must file annual returns and report changes such as new directors, a new registered office or a change in capital. Missing these filings leads to additional fees and can result in the entity or its directors being marked as defaulting. DigiAds manages annual compliance and event-based filings for you.',
    benefits: [
      { title: 'Never miss a due date', description: 'We track your filing calendar and remind you before deadlines.' },
      { title: 'Event-based filings handled', description: 'Director changes, office shifts, name changes, share transfers and more.' },
      { title: 'Clean records', description: 'Board resolutions, minutes and forms prepared consistently.' },
    ],
    process: genericProcess,
  },
  {
    name: 'GST & Income Tax',
    slug: 'gst-income-tax',
    icon: 'Receipt',
    order: 4,
    shortDescription: 'GST registration and returns, ITR filing for individuals and businesses, notice replies.',
    overview:
      'Tax compliance is continuous: GST returns are due every month or quarter and income tax returns every year. DigiAds handles GST registration, return filing, reconciliation and amendments, and prepares income tax returns for individuals, firms, LLPs and companies, including replies to tax notices.',
    benefits: [
      { title: 'Accurate, timely filing', description: 'Returns prepared from your records and filed before the due date.' },
      { title: 'Input tax credit protected', description: 'Reconciliation helps you claim the credit you are entitled to.' },
      { title: 'Help with notices', description: 'Professional replies to GST and income tax notices.' },
    ],
    process: genericProcess,
  },
  {
    name: 'Trademark, FSSAI & Import/Export',
    slug: 'trademark-fssai-import-export',
    icon: 'ShieldCheck',
    order: 5,
    shortDescription: 'Trademark registration and objections, FSSAI licences, IEC and export documentation.',
    overview:
      'Protect your brand name and logo with trademark registration, obtain the FSSAI registration or licence your food business needs, and get the Import Export Code required to trade internationally. DigiAds handles applications, objection replies, renewals and modifications.',
    benefits: [
      { title: 'Brand protection', description: 'Search, file and defend your trademark.' },
      { title: 'Right food licence', description: 'Basic registration, State or Central licence based on your business.' },
      { title: 'Ready to trade globally', description: 'IEC, annual updates and export documentation.' },
    ],
    process: genericProcess,
  },
  {
    name: 'Startup, MSME & ISO',
    slug: 'startup-msme-iso',
    icon: 'Rocket',
    order: 6,
    shortDescription: 'Startup India recognition, Udyam/MSME, DSC, DIN, shop licence and ISO certification.',
    overview:
      'Government recognitions such as Startup India (DPIIT) and Udyam (MSME) registration unlock schemes and benefits, while ISO certification shows customers that your processes meet international standards. DigiAds prepares applications and supports you through the certification process.',
    benefits: [
      { title: 'Access to schemes', description: 'Recognitions that make you eligible for government benefits.' },
      { title: 'Essential registrations', description: 'DSC, DIN, Shop & Establishment and trade licence handled together.' },
      { title: 'ISO readiness', description: 'Gap analysis, documentation and audit coordination.' },
    ],
    process: genericProcess,
  },
  {
    name: 'Legal Documents',
    slug: 'legal-documents',
    icon: 'FileSignature',
    order: 7,
    shortDescription: 'Partnership deeds, LLP and shareholder agreements, contracts, legal notices and affidavits.',
    overview:
      'Clear written agreements prevent disputes. DigiAds drafts and reviews partnership deeds, LLP agreements, shareholder agreements, employment and freelancer contracts, vendor, consultancy and franchise agreements, rent agreements, legal notices and affidavits tailored to your situation.',
    benefits: [
      { title: 'Drafted for your situation', description: 'Not a generic template: clauses reflect your actual arrangement.' },
      { title: 'Reviewed by professionals', description: 'Checked for clarity, enforceability and missing protections.' },
      { title: 'Execution guidance', description: 'Help with stamp duty, signing and notarisation where required.' },
    ],
    process: genericProcess,
  },
  {
    name: 'Professional Services',
    slug: 'professional-services',
    icon: 'Briefcase',
    order: 8,
    shortDescription: 'Business plans, project reports, CA, CS and lawyer consultation, PF and ESI registration.',
    overview:
      'Sometimes you need advice before you need a filing. DigiAds connects you with CA, CS and legal professionals, prepares business plans and project reports for funding, and handles PF and ESI registration for growing teams.',
    benefits: [
      { title: 'Expert advice on demand', description: 'Talk to a CA, CS or lawyer about your specific question.' },
      { title: 'Funding-ready documents', description: 'Business plans and project reports for banks and investors.' },
      { title: 'Employer registrations', description: 'PF and ESI registration as your team grows.' },
    ],
    process: genericProcess,
  },
  {
    name: 'Website & App Development',
    slug: 'website-app-development',
    icon: 'MonitorSmartphone',
    order: 9,
    shortDescription: 'Business websites, e-commerce, CRM and custom web apps, Android and iOS apps, integrations.',
    overview:
      'DigiAds designs and builds websites, web applications and mobile apps for businesses of every size — from a fast business website or landing page to CRM, inventory and billing software, booking platforms and Android/iOS apps — plus hosting, security, maintenance and integrations with payment gateways, WhatsApp and third-party APIs.',
    benefits: [
      { title: 'Built around your business', description: 'Requirements first, then design and development.' },
      { title: 'Modern, responsive, secure', description: 'Mobile-first builds with security best practices.' },
      { title: 'Support after launch', description: 'Maintenance, updates and integrations as you grow.' },
    ],
    process: [
      { title: 'Discovery', description: 'We understand your goals, users, features and budget.' },
      { title: 'Design', description: 'Wireframes and UI designs for your approval.' },
      { title: 'Development', description: 'Build, integrate and test across devices.' },
      { title: 'Launch and support', description: 'Deployment, handover, training and ongoing maintenance.' },
    ],
  },
  {
    name: 'Global Business Services',
    slug: 'global-business',
    icon: 'Globe2',
    order: 10,
    shortDescription: 'UAE mainland, free zone and offshore company formation, trade licences and PRO services.',
    overview:
      'Expand to the UAE with support for mainland, free zone and offshore company formation, the right trade licence for your activity, and PRO and government services. DigiAds guides you through activity selection, jurisdiction choice and documentation.',
    benefits: [
      { title: 'Right jurisdiction', description: 'Compare mainland, free zone and offshore for your activity.' },
      { title: 'End-to-end setup', description: 'Licence, approvals and documentation coordinated together.' },
      { title: 'India + UAE under one roof', description: 'Keep your Indian and UAE compliance with one partner.' },
    ],
    process: genericProcess,
  },
];

export default categories;

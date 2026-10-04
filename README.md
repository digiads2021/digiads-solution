# DigiAds Business Solutions — MERN Website

A business-services platform for DigiAds: **157 service pages** in 10 categories, a mega menu, global search, lead and consultation forms, a blog, FAQs, and an admin panel to manage everything.

- **Frontend:** React 18 + Vite, JavaScript, React Router, Axios, Lucide icons, plain CSS (design tokens in `client/src/styles/tokens.css`)
- **Backend:** Node.js + Express REST API
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** JWT in an HTTP-only cookie, bcrypt password hashing

---

## 1. What you need installed

| Tool | Version | Check with |
| --- | --- | --- |
| Node.js | 18.18 or newer (20 LTS recommended) | `node -v` |
| npm | comes with Node | `npm -v` |
| VS Code | any recent version | — |
| A MongoDB Atlas account | free tier is fine | https://www.mongodb.com/atlas |

---

## 2. Run it in VS Code (step by step)

### Step 1 — Open the project
Unzip the folder, then in VS Code: **File → Open Folder… → `digiads`**.
Open a terminal: **Terminal → New Terminal**.

### Step 2 — Install packages (once)
```bash
npm run install-all
```
This installs packages for the root, `server/` and `client/`.

### Step 3 — Create a MongoDB Atlas database
1. Create a free cluster in MongoDB Atlas.
2. **Database Access** → add a database user (username + password).
3. **Network Access** → add your IP address (for local testing you may use `0.0.0.0/0`, but restrict it in production).
4. **Connect → Drivers** → copy the connection string. It looks like:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/digiads?retryWrites=true&w=majority`
   (Put `digiads` after `.net/` — that is the database name.)

### Step 4 — Create the server `.env` file
Copy `server/.env.example` to a new file named `server/.env` and fill in:
```env
MONGODB_URI=your-atlas-connection-string
JWT_SECRET=a-long-random-string
ADMIN_EMAIL=you@yourdomain.com
ADMIN_PASSWORD=AStrongPassword123
```
Generate a JWT secret with:
```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```
The client needs no `.env` for local development (Vite forwards `/api` to the server).

### Step 5 — Load the service catalogue and create your admin
```bash
npm run seed
npm run create-admin
```
`seed` loads all 10 categories, 157 services (with full page content), 670+ FAQs and 2 starter articles.
You can re-run `seed` any time; it replaces categories/services/FAQs but **never touches enquiries, subscribers or admins**.

### Step 6 — Start the website
```bash
npm run dev
```
- Website: http://localhost:5173
- API: http://localhost:5000/api/health
- Admin panel: http://localhost:5173/admin/login (use ADMIN_EMAIL / ADMIN_PASSWORD, then change the password in **Settings**)

Stop with `Ctrl + C`.

---

## 3. After the first run — please do these

1. **Admin → Settings:** add your verified phone, email, WhatsApp and office addresses. Until then the site shows placeholders such as `[ADD VERIFIED PHONE]`.
2. **Service content review:** every service page has detailed draft content, but **fees and timelines are hidden** (government fees and timelines change). Have a CA/CS review each service in **Admin → Services**, add verified fees/timelines if you want them shown, and tick **Content reviewed**. The dashboard shows how many are waiting.
3. **Logo:** replace `client/src/assets/logo-mark.svg` and `client/public/favicon.svg` with the official DigiAds logo.
4. **Legal pages:** `client/src/pages/Legal.jsx` contains template text. Have a lawyer review the Privacy Policy, Terms, Refund Policy and Disclaimer.
5. **Testimonials:** add only real testimonials with client consent. The homepage section stays hidden until one is published.

---

## 4. Project structure

```
digiads/
├── package.json              # root scripts: install-all, seed, create-admin, dev
├── server/                   # Node + Express API
│   ├── app.js                # middleware (helmet, cors, rate limit, json, cookies) + routes
│   ├── server.js             # connects to MongoDB and starts the server
│   ├── config/               # env.js, db.js, cors.js, pillars.js (6 menu groups)
│   ├── models/               # Admin, ServiceCategory, Service, FAQ, Enquiry, NewsletterSubscriber, Blog, Testimonial, WebsiteSetting
│   ├── controllers/          # request handlers, one file per resource
│   ├── routes/index.js       # every API route in one place (public vs admin is visible at a glance)
│   ├── middleware/           # auth (JWT cookie), validate (Zod), rate limiters, error handler, input sanitizer
│   ├── validators/           # Zod schemas for every request body
│   ├── services/             # email alerts, service search
│   ├── utils/                # ApiError, asyncHandler, pagination, slugify, sanitize
│   ├── seed/                 # seed.js, createAdmin.js, data/ (categories, services, content templates, FAQs, blogs)
│   └── uploads/              # images uploaded from admin (development only)
└── client/                   # React + Vite
    ├── index.html
    ├── vite.config.js        # dev proxy /api -> localhost:5000
    └── src/
        ├── main.jsx, App.jsx # app entry + routes
        ├── api/              # axios.js (single instance) + index.js (all API calls)
        ├── context/          # SiteContext (menu + settings), AuthContext (admin session)
        ├── hooks/            # useFetch, useForm, useDebounce, useLockBodyScroll
        ├── components/
        │   ├── layout/       # Header, MegaMenu, MobileMenu, SearchModal, Footer, MobileStickyCTA, Breadcrumbs
        │   ├── home/         # Hero + all homepage sections
        │   ├── service/      # service page blocks + table of contents
        │   ├── forms/        # Lead, Consultation, Contact, Newsletter forms
        │   ├── shared/       # Seo, ServiceCard, CategoryCard, BlogCard, FAQSection, CTABanner
        │   └── ui/           # Accordion, Modal, Field, States (loading/empty/error), Pagination
        ├── pages/            # Home, AllServices, Category, Service, About, Contact, TalkToExpert, FaqPage, BlogList, BlogPost, Legal, NotFound
        ├── admin/            # admin pages (lazy-loaded) + AdminUI helpers
        ├── layouts/          # PublicLayout, AdminLayout
        ├── utils/            # icons, schema (JSON-LD), format, siteContent (homepage copy)
        └── styles/           # tokens, base, components, layout, home, service, admin
```

---

## 5. Main URLs

| Public | Admin |
| --- | --- |
| `/` Home | `/admin/login` |
| `/services` all services (filter by area) | `/admin/dashboard` |
| `/services/:category` e.g. `/services/gst-income-tax` | `/admin/services`, `/admin/services/:id/edit` |
| `/services/:category/:service` e.g. `/services/business-registration/private-limited-company-registration` | `/admin/categories` |
| `/talk-to-an-expert`, `/contact`, `/about`, `/faq` | `/admin/leads`, `/admin/consultations`, `/admin/contacts` |
| `/blog`, `/blog/:slug` | `/admin/blogs`, `/admin/faqs`, `/admin/testimonials`, `/admin/newsletter` |
| `/privacy-policy`, `/terms`, `/refund-policy`, `/disclaimer` | `/admin/settings` |

## 6. API overview

All responses use `{ success: true, data, meta? }` or `{ success: false, message, errors? }`.

| Method | Path | Access |
| --- | --- | --- |
| POST | `/api/auth/login` · `/api/auth/logout` · `/api/auth/change-password` | public (rate-limited) / admin |
| GET | `/api/auth/me` | admin |
| GET | `/api/navigation` | public (mega menu) |
| GET | `/api/categories` · `/api/categories/:slug` | public |
| GET | `/api/services?category=&pillar=&popular=&page=&limit=` | public |
| GET | `/api/services/search?q=gst` | public |
| GET | `/api/services/:slug` | public (page + related + FAQs) |
| POST/PUT/PATCH/DELETE | `/api/services…`, `/api/categories…`, `/api/faqs…`, `/api/blogs…`, `/api/testimonials…` | admin |
| POST | `/api/leads` · `/api/contact` · `/api/consultations` · `/api/newsletter/subscribe` | public (rate-limited, validated) |
| GET/PATCH/DELETE | `/api/enquiries…` (+ `/export` CSV) | admin |
| GET | `/api/admin/dashboard` | admin |
| GET | `/sitemap.xml` | public (generated from published content) |

Leads, contact messages and consultations are stored in one `Enquiry` collection with a `type` field, and each has its own admin page.

---

## 7. Security built in

- Passwords hashed with bcrypt (cost 12). No public sign-up route; admins are created with `npm run create-admin`.
- JWT stored in an **HTTP-only** cookie (`secure` in production). Never in localStorage.
- Tokens issued before a password change stop working.
- `helmet` security headers, CORS restricted to `CLIENT_URL` (never `*`), rate limits on login, forms and search.
- Every request body validated with **Zod** on the server; MongoDB operator injection stripped; blog/service HTML sanitized.
- Honeypot field on public forms; JSON-only requests on state-changing routes.
- Stack traces hidden in production.
- Roles: `superadmin` (everything) and `editor` (cannot delete or change site settings).

---

## 8. Deployment

**Recommended:** frontend on **Vercel**, API on **Render** (or Railway/VPS), database on **MongoDB Atlas**.

### API (Render)
1. Push the project to GitHub.
2. Render → New → **Web Service** → choose the repo → **Root directory:** `server`.
3. Build command: `npm install` · Start command: `npm start`.
4. Environment variables (from `server/.env.example`):
   `NODE_ENV=production`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL=https://digiadssolution.in,https://www.digiadssolution.in`, `SITE_URL=https://digiadssolution.in`, `COOKIE_SAMESITE=lax`, plus SMTP values if you want email alerts.
5. Add a custom domain: `api.digiadssolution.in`. Health check path: `/api/health`.
6. Use a paid instance for production (free instances sleep, so the first form submission after idle is slow).
7. **Images:** Render's disk is temporary. Before going live, move admin uploads to cloud storage (e.g. Cloudinary) — change `server/controllers/upload.controller.js` and the multer setup in `server/routes/index.js`.

### Frontend (Vercel)
1. Vercel → New Project → same repo → **Root directory:** `client`. Framework: Vite.
2. Environment variables:
   `VITE_API_URL=https://api.digiadssolution.in/api`, `VITE_SITE_URL=https://digiadssolution.in`, `VITE_ASSET_URL=https://api.digiadssolution.in`
3. Add domains `digiadssolution.in` and `www.digiadssolution.in`. `client/vercel.json` already handles page refreshes on deep links.
4. Update the `Sitemap:` line in `client/public/robots.txt`. To serve the sitemap from the main domain, add a Vercel rewrite from `/sitemap.xml` to `https://api.digiadssolution.in/sitemap.xml`.

Because the site (`digiadssolution.in`) and the API (`api.digiadssolution.in`) share one domain, the login cookie works with `SameSite=Lax`.

### SEO note
This is a single-page React app. Each page sets its own title, description, canonical URL, Open Graph tags and JSON-LD (Organization, Breadcrumb, Service, FAQ, Article). Google can render it, but for the strongest results on service pages, add **build-time prerendering** later (for example `vite-react-ssg` or a prerender script). It keeps the MERN stack and needs no Next.js.

---

## 9. Common problems

| Problem | Fix |
| --- | --- |
| `Missing required environment variables` | Create `server/.env` from `.env.example`. |
| `MongoServerError: bad auth` | Check the username/password in `MONGODB_URI` (URL-encode special characters such as `@`). |
| `querySrv ENOTFOUND` / timeout | Add your IP in Atlas **Network Access**. |
| Website loads but menus are empty | The API isn't running or the database isn't seeded: run `npm run seed`, then `npm run dev`. |
| Admin login works then logs out | In production, make sure `CLIENT_URL` exactly matches the site URL and both use HTTPS. |
| Port 5000 already in use (macOS AirPlay) | Set `PORT=5050` in `server/.env` and change the proxy target in `client/vite.config.js`. |

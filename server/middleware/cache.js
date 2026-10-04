// Edge caching for public, read-only API responses.
// Browsers keep a response for a minute; Vercel's CDN serves it for `seconds` and then refreshes it in
// the background (stale-while-revalidate), so visitors rarely wait for the function or the database.
// Admin changes therefore appear on the public site within a few minutes.
export const publicCache = (seconds = 120) => (req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', `public, max-age=60, s-maxage=${seconds}, stale-while-revalidate=86400`);
    res.set('Vercel-CDN-Cache-Control', `max-age=${seconds}, stale-while-revalidate=86400`);
  }
  next();
};

// Admin and personalised responses must never be stored by browsers or the CDN.
export const noStore = (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
};

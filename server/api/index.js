// Vercel serverless entry: every request is rewritten here (see vercel.json).
// App and DB are loaded lazily so configuration errors return a clear JSON 503
// instead of crashing the function ("This page is unavailable").
let appPromise;
const loadApp = () =>
  (appPromise ||= Promise.all([import('../app.js'), import('../config/db.js')]).catch((err) => {
    appPromise = undefined;
    throw err;
  }));

const fail = (res, message) => {
  res.statusCode = 503;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify({ success: false, message }));
};

export default async function handler(req, res) {
  let app, connectDB;
  try {
    const [appMod, dbMod] = await loadApp();
    app = appMod.default;
    connectDB = dbMod.default;
  } catch (err) {
    // Details (e.g. which env vars are missing) go to the Vercel logs only — never to visitors.
    console.error('Startup failed:', err.message);
    return fail(res, 'Service temporarily unavailable. Please try again shortly.');
  }
  try {
    await connectDB();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    return fail(res, 'Service temporarily unavailable. Please try again shortly.');
  }
  return app(req, res);
}

import { stripMongoOperators } from '../utils/sanitize.js';

// Removes $-prefixed keys from body and params to block NoSQL operator injection.
export default function sanitizeInput(req, res, next) {
  if (req.body) req.body = stripMongoOperators(req.body);
  if (req.params) req.params = stripMongoOperators(req.params);
  next();
}

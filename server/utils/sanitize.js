import sanitizeHtml from 'sanitize-html';

// Allows simple formatting from the admin editor; strips scripts, styles, event handlers.
export const cleanHtml = (dirty = '') =>
  sanitizeHtml(dirty, {
    allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'code', 'pre', 'hr'],
    allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt', 'width', 'height', 'loading'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }) },
  });

// Removes keys that start with "$" or contain "." (MongoDB operator injection).
export function stripMongoOperators(value) {
  if (Array.isArray(value)) return value.map(stripMongoOperators);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (k.startsWith('$') || k.includes('.')) continue;
      out[k] = stripMongoOperators(v);
    }
    return out;
  }
  return value;
}

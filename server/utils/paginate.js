// Reads ?page & ?limit safely and returns skip/limit + a meta builder.
export default function getPagination(query, defaultLimit = 12, maxLimit = 50) {
  const page = Math.min(10000, Math.max(1, parseInt(query.page, 10) || 1));
  const limit = Math.min(maxLimit, Math.max(1, parseInt(query.limit, 10) || defaultLimit));
  const skip = (page - 1) * limit;
  const meta = (total) => ({ page, limit, total, pages: Math.ceil(total / limit) || 1 });
  return { page, limit, skip, meta };
}

// Allows sorting only on whitelisted fields, e.g. ?sort=-createdAt
export function getSort(sortParam, allowed, fallback = '-createdAt') {
  const value = typeof sortParam === 'string' && sortParam ? sortParam : fallback;
  const field = value.replace(/^-/, '');
  if (!allowed.includes(field)) return fallback;
  return value;
}

export const escapeRegex = (s = '') => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

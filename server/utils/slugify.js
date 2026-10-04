export default function slugify(text = '') {
  return String(text)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-and-/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

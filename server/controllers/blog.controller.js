import Blog, { BLOG_CATEGORIES } from '../models/Blog.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import slugify from '../utils/slugify.js';
import getPagination, { escapeRegex } from '../utils/paginate.js';
import { cleanHtml } from '../utils/sanitize.js';
import { ok, created } from '../utils/respond.js';

const LIST_FIELDS = 'title slug excerpt category tags author featuredImage publishedAt';

// GET /api/blogs?category=&tag=&q=&page=&limit=
export const listBlogs = asyncHandler(async (req, res) => {
  const { skip, limit, meta } = getPagination(req.query, 9, 30);
  const filter = { status: 'published' };
  if (req.query.category) filter.category = String(req.query.category);
  if (req.query.tag) filter.tags = String(req.query.tag);
  if (req.query.q) filter.title = new RegExp(escapeRegex(String(req.query.q)), 'i');
  const [items, total] = await Promise.all([
    Blog.find(filter).select(LIST_FIELDS).sort('-publishedAt').skip(skip).limit(limit).lean(),
    Blog.countDocuments(filter),
  ]);
  ok(res, items, meta(total));
});

export const blogCategories = (req, res) => ok(res, BLOG_CATEGORIES);

// GET /api/blogs/:slug
export const getBlog = asyncHandler(async (req, res) => {
  const post = await Blog.findOne({ slug: req.params.slug, status: 'published' })
    .populate({ path: 'relatedServices', select: 'name slug shortDescription icon category', populate: { path: 'category', select: 'slug' } })
    .lean();
  if (!post) throw ApiError.notFound('Article not found');
  const more = await Blog.find({ _id: { $ne: post._id }, status: 'published', category: post.category })
    .select(LIST_FIELDS).sort('-publishedAt').limit(3).lean();
  ok(res, { ...post, more });
});

// ---------- Admin ----------
export const adminListBlogs = asyncHandler(async (req, res) => {
  const { skip, limit, meta } = getPagination(req.query, 20, 100);
  const filter = {};
  if (req.query.status) filter.status = String(req.query.status);
  if (req.query.category) filter.category = String(req.query.category);
  if (req.query.q) filter.title = new RegExp(escapeRegex(String(req.query.q)), 'i');
  const [items, total] = await Promise.all([
    Blog.find(filter).select('title slug status category publishedAt updatedAt').sort('-updatedAt').skip(skip).limit(limit).lean(),
    Blog.countDocuments(filter),
  ]);
  ok(res, items, meta(total));
});

export const adminGetBlog = asyncHandler(async (req, res) => {
  const post = await Blog.findById(req.params.id).lean();
  if (!post) throw ApiError.notFound('Article not found');
  ok(res, post);
});

const prepare = (b) => {
  const data = { ...b };
  data.slug = slugify(data.slug || data.title);
  if (typeof data.content === 'string') data.content = cleanHtml(data.content);
  return data;
};

export const createBlog = asyncHandler(async (req, res) => created(res, await Blog.create(prepare(req.body))));

export const updateBlog = asyncHandler(async (req, res) => {
  const post = await Blog.findById(req.params.id);
  if (!post) throw ApiError.notFound('Article not found');
  post.set(prepare(req.body));
  await post.save();
  ok(res, post);
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const post = await Blog.findByIdAndDelete(req.params.id);
  if (!post) throw ApiError.notFound('Article not found');
  ok(res, { message: 'Article deleted' });
});

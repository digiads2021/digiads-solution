// All API calls live here. Each function returns the "data" part of the response
// (or { data, meta } for paginated lists).
import api from './axios.js';

const unwrap = (res) => res.data.data;
const unwrapList = (res) => ({ data: res.data.data, meta: res.data.meta });

// ---------- Public ----------
export const getNavigation = () => api.get('/navigation').then(unwrap);
export const getSettings = () => api.get('/settings').then(unwrap);
export const getCategories = (params) => api.get('/categories', { params }).then(unwrap);
export const getCategory = (slug) => api.get(`/categories/${slug}`).then(unwrap);
export const getServices = (params) => api.get('/services', { params }).then(unwrapList);
export const getService = (slug) => api.get(`/services/${slug}`).then(unwrap);
export const searchServices = (q, signal) => api.get('/services/search', { params: { q }, signal }).then(unwrap);
export const getFaqs = (params) => api.get('/faqs', { params }).then(unwrap);
export const getTestimonials = (params) => api.get('/testimonials', { params }).then(unwrap);
export const getBlogs = (params) => api.get('/blogs', { params }).then(unwrapList);
export const getBlog = (slug) => api.get(`/blogs/${slug}`).then(unwrap);
export const getBlogCategories = () => api.get('/blogs/categories').then(unwrap);

export const submitLead = (body) => api.post('/leads', body).then(unwrap);
export const submitContact = (body) => api.post('/contact', body).then(unwrap);
export const submitConsultation = (body) => api.post('/consultations', body).then(unwrap);
export const subscribeNewsletter = (body) => api.post('/newsletter/subscribe', body).then(unwrap);

// ---------- Auth ----------
export const login = (body) => api.post('/auth/login', body).then(unwrap);
export const logout = () => api.post('/auth/logout', {}).then(unwrap);
export const getMe = () => api.get('/auth/me').then(unwrap);
export const changePassword = (body) => api.post('/auth/change-password', body).then(unwrap);

// ---------- Admin ----------
export const admin = {
  dashboard: () => api.get('/admin/dashboard').then(unwrap),

  services: (params) => api.get('/admin/services', { params }).then(unwrapList),
  serviceOptions: () => api.get('/admin/services/options').then(unwrap),
  service: (id) => api.get(`/admin/services/${id}`).then(unwrap),
  createService: (body) => api.post('/services', body).then(unwrap),
  updateService: (id, body) => api.put(`/services/${id}`, body).then(unwrap),
  patchService: (id, body) => api.patch(`/services/${id}/status`, body).then(unwrap),
  deleteService: (id) => api.delete(`/services/${id}`).then(unwrap),

  categories: () => api.get('/admin/categories').then(unwrap),
  createCategory: (body) => api.post('/categories', body).then(unwrap),
  updateCategory: (id, body) => api.put(`/categories/${id}`, body).then(unwrap),
  deleteCategory: (id) => api.delete(`/categories/${id}`).then(unwrap),

  enquiries: (params) => api.get('/enquiries', { params }).then(unwrapList),
  enquiry: (id) => api.get(`/enquiries/${id}`).then(unwrap),
  updateEnquiry: (id, body) => api.patch(`/enquiries/${id}`, body).then(unwrap),
  deleteEnquiry: (id) => api.delete(`/enquiries/${id}`).then(unwrap),
  exportEnquiries: (params) => api.get('/enquiries/export', { params, responseType: 'blob' }),

  faqs: (params) => api.get('/admin/faqs', { params }).then(unwrapList),
  createFaq: (body) => api.post('/faqs', body).then(unwrap),
  updateFaq: (id, body) => api.put(`/faqs/${id}`, body).then(unwrap),
  deleteFaq: (id) => api.delete(`/faqs/${id}`).then(unwrap),

  blogs: (params) => api.get('/admin/blogs', { params }).then(unwrapList),
  blog: (id) => api.get(`/admin/blogs/${id}`).then(unwrap),
  createBlog: (body) => api.post('/blogs', body).then(unwrap),
  updateBlog: (id, body) => api.put(`/blogs/${id}`, body).then(unwrap),
  deleteBlog: (id) => api.delete(`/blogs/${id}`).then(unwrap),

  testimonials: (params) => api.get('/admin/testimonials', { params }).then(unwrapList),
  createTestimonial: (body) => api.post('/testimonials', body).then(unwrap),
  updateTestimonial: (id, body) => api.put(`/testimonials/${id}`, body).then(unwrap),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`).then(unwrap),

  subscribers: (params) => api.get('/newsletter', { params }).then(unwrapList),
  updateSubscriber: (id, body) => api.patch(`/newsletter/${id}`, body).then(unwrap),
  deleteSubscriber: (id) => api.delete(`/newsletter/${id}`).then(unwrap),
  exportSubscribers: () => api.get('/newsletter/export', { responseType: 'blob' }),

  settings: () => api.get('/admin/settings').then(unwrap),
  updateSettings: (body) => api.put('/settings', body).then(unwrap),

  uploadImage: (file) => {
    const form = new FormData();
    form.append('image', file);
    return api.post('/uploads/image', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(unwrap);
  },
};

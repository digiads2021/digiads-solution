import axios from 'axios';

// One Axios instance for the whole app. Never hard-code API URLs in components.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // send the HTTP-only auth cookie
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

// Normalises every error into { message, errors, status } so components stay simple.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data || {};
    const normalized = {
      status,
      message: data.message || (error.code === 'ECONNABORTED' ? 'The request took too long. Please try again.' : 'Could not reach the server. Please check your connection.'),
      errors: data.errors || {},
    };
    // If an admin session expires, send the user to login (except on the login call itself).
    if (status === 401 && window.location.pathname.startsWith('/admin') && !error.config?.url?.includes('/auth/')) {
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }
    return Promise.reject(normalized);
  }
);

export default api;

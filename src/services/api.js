import axios from 'axios';

// Base API URL with fallback to relative /api for local proxy or same-domain production
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true, // Necessary for HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request Interceptor: Attach bearer token if present in localStorage (fallback for mobile/headers)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('mp_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Standardize error formatting and handle auth expirations
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = error.response?.data?.message;

    // Handle Edge Case: Network connection error / backend offline
    if (!error.response || error.code === 'ERR_NETWORK') {
      message = 'Unable to connect to the server. Please check your internet connection or try again later.';
    }
    // Handle Edge Case: Request timeout
    else if (error.code === 'ECONNABORTED') {
      message = 'Request timed out. The server is taking longer than expected to respond.';
    } else if (!message) {
      message = error.message || 'An unexpected error occurred. Please try again.';
    }

    // If unauthorized and on an admin page, clear stale credentials and redirect with reason
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('mp_admin_token');
      localStorage.removeItem('mp_admin_user');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login?expired=true';
      }
    }

    return Promise.reject({
      status: error.response?.status,
      message,
      errors: error.response?.data?.errors,
      originalError: error,
    });
  }
);

export default api;

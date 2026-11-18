import api from './api';

export const serviceService = {
  // Public list with pagination, search, category
  getServices: async (params = {}) => {
    const response = await api.get('/services', { params });
    return response.data;
  },

  // Public detail by slug or ID
  getServiceBySlug: async (slug) => {
    const response = await api.get(`/services/${slug}`);
    return response.data;
  },

  // Admin create (supports FormData or JSON)
  createService: async (data) => {
    const isFormData = data instanceof FormData;
    const response = await api.post('/services', data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  // Admin update
  updateService: async (id, data) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(`/services/${id}`, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  // Admin delete
  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};

export default serviceService;

import api from './api';

export const galleryService = {
  getGallery: async (params = {}) => {
    const response = await api.get('/gallery', { params });
    return response.data;
  },

  getGalleryItem: async (id) => {
    const response = await api.get(`/gallery/${id}`);
    return response.data;
  },

  createGallery: async (data) => {
    const isFormData = data instanceof FormData;
    const response = await api.post('/gallery', data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  updateGallery: async (id, data) => {
    const isFormData = data instanceof FormData;
    const response = await api.put(`/gallery/${id}`, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  deleteGallery: async (id) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  },
};

export default galleryService;

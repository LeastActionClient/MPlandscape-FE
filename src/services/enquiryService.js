import api from './api';

export const enquiryService = {
  // Public enquiry submission
  createEnquiry: async (data) => {
    const response = await api.post('/enquiries', data);
    return response.data;
  },

  // Admin list
  getEnquiries: async (params = {}) => {
    const response = await api.get('/enquiries', { params });
    return response.data;
  },

  // Admin get single
  getEnquiryById: async (id) => {
    const response = await api.get(`/enquiries/${id}`);
    return response.data;
  },

  // Admin update status
  updateStatus: async (id, status) => {
    const response = await api.patch(`/enquiries/${id}/status`, { status });
    return response.data;
  },

  // Admin update notes
  updateNotes: async (id, adminNotes) => {
    const response = await api.patch(`/enquiries/${id}/notes`, { adminNotes });
    return response.data;
  },

  // Admin delete
  deleteEnquiry: async (id) => {
    const response = await api.delete(`/enquiries/${id}`);
    return response.data;
  },

  // Admin export CSV
  exportCSV: async (params = {}) => {
    const response = await api.get('/enquiries/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default enquiryService;

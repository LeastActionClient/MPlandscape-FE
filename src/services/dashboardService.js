import api from './api';

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  getRecentEnquiries: async (limit = 5) => {
    const response = await api.get('/dashboard/recent-enquiries', {
      params: { limit },
    });
    return response.data;
  },

  getEnquiryTrends: async () => {
    const response = await api.get('/dashboard/enquiry-trends');
    return response.data;
  },
};

export default dashboardService;

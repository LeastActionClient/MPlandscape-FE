import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '../context/AuthContext';
import Dashboard from '../pages/admin/Dashboard';
import ServicesManagement from '../pages/admin/ServicesManagement';
import GalleryManagement from '../pages/admin/GalleryManagement';
import EnquiriesManagement from '../pages/admin/EnquiriesManagement';
import ContactManagement from '../pages/admin/ContactManagement';
import Profile from '../pages/admin/Profile';
import dashboardService from '../services/dashboardService';
import serviceService from '../services/serviceService';
import galleryService from '../services/galleryService';
import enquiryService from '../services/enquiryService';
import settingsService from '../services/settingsService';

window.scrollTo = vi.fn();

vi.mock('../services/dashboardService', () => ({
  default: {
    getStats: vi.fn().mockResolvedValue({
      data: {
        totalEnquiries: 12,
        statusCounts: { NEW: 4, CONTACTED: 3, IN_PROGRESS: 2, CONVERTED: 2, CLOSED: 1 },
        activeServices: 7,
        activeGallery: 21,
        conversionRate: 16.7,
      },
    }),
    getRecentEnquiries: vi.fn().mockResolvedValue({
      data: [
        {
          _id: 'e1',
          customerName: 'Aravind Swamy',
          phone: '+91 98765 43210',
          email: 'aravind@example.com',
          status: 'NEW',
          createdAt: new Date().toISOString(),
          serviceId: { title: 'Estate Landscaping' },
        },
      ],
    }),
    getEnquiryTrends: vi.fn().mockResolvedValue({
      data: {
        monthlyTrends: [{ month: 11, year: 2026, count: 5, converted: 2 }],
        serviceDistribution: [{ serviceTitle: 'Horticulture', count: 4 }],
      },
    }),
  },
}));

vi.mock('../services/serviceService', () => ({
  default: {
    getServices: vi.fn().mockResolvedValue({
      data: [
        {
          _id: 's1',
          title: 'Precision Horticultural Development',
          slug: 'precision-horticultural-development',
          features: ['Native Flora', 'Soil Condition'],
          isActive: true,
          displayOrder: 1,
        },
      ],
    }),
  },
}));

vi.mock('../services/galleryService', () => ({
  default: {
    getGallery: vi.fn().mockResolvedValue({
      data: [
        {
          _id: 'g1',
          title: 'Luxury Villa Garden',
          category: 'Residential',
          isActive: true,
          imageUrl: 'https://example.com/g1.jpg',
        },
      ],
      categories: ['Residential', 'Commercial'],
    }),
  },
}));

vi.mock('../services/enquiryService', () => ({
  default: {
    getEnquiries: vi.fn().mockResolvedValue({
      data: [
        {
          _id: 'enq1',
          customerName: 'Karthik Raja',
          phone: '+91 99887 76655',
          email: 'karthik@example.com',
          status: 'NEW',
          createdAt: new Date().toISOString(),
          message: 'Interested in drip irrigation for commercial site.',
        },
      ],
      total: 1,
      page: 1,
      pages: 1,
    }),
  },
}));

vi.mock('../services/settingsService', () => ({
  default: {
    getSettings: vi.fn().mockResolvedValue({
      data: {
        companyName: 'MP Landscape Services',
        tagline: 'Premier Landscaping, Agriculture & Horticultural Solutions',
        phoneNumbers: ['+91 98765 43210'],
        emailAddresses: ['info@mplandscape.com'],
        whatsappNumber: '+91 98765 43210',
        address: 'Coimbatore, Tamil Nadu, India',
        workingHours: 'Mon - Sat: 8:00 AM - 6:30 PM',
        vision: 'Excellence in horticultural solutions',
        mission: 'Sustainable landscape development',
        socialLinks: { facebook: 'https://facebook.com' },
      },
    }),
  },
}));

vi.mock('../context/AuthContext', async () => {
  const actual = await vi.importActual('../context/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      user: {
        id: 'adm1',
        name: 'Chief Admin',
        email: 'admin@mplandscape.com',
        role: 'superadmin',
      },
      logout: vi.fn(),
      isAuthenticated: true,
      loading: false,
    }),
  };
});

describe('Admin Modules & Management Pages (Task 8.2)', () => {
  beforeEach(() => {
    localStorage.setItem(
      'mp_admin_user',
      JSON.stringify({
        id: 'adm1',
        name: 'Chief Admin',
        email: 'admin@mplandscape.com',
        role: 'superadmin',
      })
    );
  });

  it('renders Dashboard with KPI metrics and recent enquiries', async () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <Dashboard />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Operational Overview/i)).toBeInTheDocument();
      expect(screen.getAllByText('Total Enquiries')[0]).toBeInTheDocument();
      expect(screen.getByText('Aravind Swamy')).toBeInTheDocument();
    });
  });

  it('renders ServicesManagement with service list and add button', async () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <ServicesManagement />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Precision Horticultural Development')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Add Service/i })).toBeInTheDocument();
  });

  it('renders GalleryManagement with upload button and items', async () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <GalleryManagement />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Luxury Villa Garden')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Upload Images/i })).toBeInTheDocument();
  });

  it('renders EnquiriesManagement with filter controls and export CSV button', async () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <EnquiriesManagement />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Karthik Raja')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Export to CSV/i })).toBeInTheDocument();
  });

  it('renders ContactManagement with loaded phone and email fields', async () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <ContactManagement />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByDisplayValue('+91 98765 43210')[0]).toBeInTheDocument();
      expect(screen.getByDisplayValue('info@mplandscape.com')).toBeInTheDocument();
    });
  });

  it('renders Profile page with administrator information', () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );

    expect(screen.getByText(/Administrator Profile/i)).toBeInTheDocument();
    expect(screen.getByText('Chief Admin')).toBeInTheDocument();
    expect(screen.getByText('admin@mplandscape.com')).toBeInTheDocument();
  });
});

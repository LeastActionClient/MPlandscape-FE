import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '../context/AuthContext';
import ServicesManagement from '../pages/admin/ServicesManagement';
import ServiceCard from '../components/common/ServiceCard';
import serviceService from '../services/serviceService';

window.scrollTo = vi.fn();
global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost:5173/mock-preview');

vi.mock('../services/serviceService', () => ({
  default: {
    getServices: vi.fn(),
    createService: vi.fn(),
    updateService: vi.fn(),
    deleteService: vi.fn(),
  },
}));

vi.mock('../context/AuthContext', async () => {
  const actual = await vi.importActual('../context/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      user: {
        id: 'adm1',
        name: 'Super Admin',
        email: 'admin@mplandscape.com',
        role: 'superadmin',
      },
      logout: vi.fn(),
      isAuthenticated: true,
      loading: false,
    }),
  };
});

describe('Services Management & Image Validation (Frontend)', () => {
  const mockServices = [
    {
      _id: 's1',
      title: 'Landscape Design & Development',
      slug: 'landscape-design-development',
      subtitle: 'Turnkey outdoor living spaces',
      description: 'Comprehensive botanical planting and architectural construction.',
      imageUrl: 'https://images.example.com/landscape.jpg',
      features: ['3D Visualizations', 'Custom Water Features'],
      isActive: true,
      displayOrder: 1,
    },
    {
      _id: 's2',
      title: 'Water Management & Micro Irrigation',
      slug: 'water-management-micro-irrigation',
      subtitle: 'Smart irrigation systems',
      description: 'Automated drip irrigation and smart weather controllers.',
      imageUrl: 'https://images.example.com/irrigation.jpg',
      features: ['Drip lines'],
      isActive: true,
      displayOrder: 2,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    serviceService.getServices.mockResolvedValue({ data: mockServices });
    serviceService.createService.mockResolvedValue({ success: true });
    serviceService.updateService.mockResolvedValue({ success: true });
  });

  const renderServicesManagement = () =>
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <ServicesManagement />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );

  it('renders services list in admin table', async () => {
    renderServicesManagement();

    await waitFor(() => {
      expect(screen.getByText('Landscape Design & Development')).toBeInTheDocument();
      expect(screen.getByText('Water Management & Micro Irrigation')).toBeInTheDocument();
    });
  });

  it('Service banner image is mandatory: displays asterisk and blocks empty submission', async () => {
    renderServicesManagement();

    await waitFor(() => {
      expect(screen.getByText('Add Service')).toBeInTheDocument();
    });

    // Open Add Service Modal
    fireEvent.click(screen.getByText('Add Service'));

    expect(screen.getByText('Add New Service')).toBeInTheDocument();
    // Mandatory asterisk must be present on Service Banner Image label
    expect(screen.getByText(/Service Banner Image/i)).toBeInTheDocument();
    expect(screen.queryByText(/\(Optional\)/i)).toBeNull();

    // Fill required text fields only
    const titleInput = screen.getByPlaceholderText(/e\.g\. Precision Horticultural Development/i);
    const descInput = screen.getByPlaceholderText(/Comprehensive service description/i);

    fireEvent.change(titleInput, { target: { value: 'Eco-Friendly Rooftop Gardens' } });
    fireEvent.change(descInput, {
      target: { value: 'Structural lightweight soil and drought-tolerant succulent varieties.' },
    });

    // Submit form without providing any image file or URL
    const submitBtn = screen.getByRole('button', { name: /Create Service/i });
    fireEvent.submit(submitBtn.closest('form'));

    // Verify submission is blocked and mandatory image error is displayed
    await waitFor(() => {
      expect(
        screen.getByText('Please upload a service image or provide a valid image URL.')
      ).toBeInTheDocument();
    });
    expect(serviceService.createService).not.toHaveBeenCalled();
  });

  it('allows service creation when a valid image file is uploaded', async () => {
    renderServicesManagement();

    await waitFor(() => {
      expect(screen.getByText('Add Service')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Add Service'));

    const titleInput = screen.getByPlaceholderText(/e\.g\. Precision Horticultural Development/i);
    const descInput = screen.getByPlaceholderText(/Comprehensive service description/i);
    const fileInput = document.querySelector('input[type="file"]');

    fireEvent.change(titleInput, { target: { value: 'Arboricultural Care' } });
    fireEvent.change(descInput, {
      target: { value: 'Tree preservation, crown thinning, and root protection.' },
    });

    const validFile = new File(['image-bytes'], 'trees.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [validFile] } });

    await waitFor(() => {
      expect(screen.getByAltText('Preview')).toBeInTheDocument();
    });

    const submitBtn = screen.getByRole('button', { name: /Create Service/i });
    fireEvent.submit(submitBtn.closest('form'));

    await waitFor(() => {
      expect(serviceService.createService).toHaveBeenCalledTimes(1);
    });
  });

  it('allows service creation when a valid image URL is provided', async () => {
    renderServicesManagement();

    await waitFor(() => {
      expect(screen.getByText('Add Service')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Add Service'));

    const titleInput = screen.getByPlaceholderText(/e\.g\. Precision Horticultural Development/i);
    const descInput = screen.getByPlaceholderText(/Comprehensive service description/i);
    const urlInput = screen.getByPlaceholderText('https://...');

    fireEvent.change(titleInput, { target: { value: 'Subsurface Drainage Networks' } });
    fireEvent.change(descInput, {
      target: { value: 'High-capacity stormwater filtration and subsoil drainage.' },
    });
    fireEvent.change(urlInput, {
      target: { value: 'https://images.example.com/drainage.jpg' },
    });

    const submitBtn = screen.getByRole('button', { name: /Create Service/i });
    fireEvent.submit(submitBtn.closest('form'));

    await waitFor(() => {
      expect(serviceService.createService).toHaveBeenCalledTimes(1);
    });
  });

  it('preserves existing image when editing text fields and blocks save if image is cleared', async () => {
    renderServicesManagement();

    await waitFor(() => {
      expect(screen.getByText('Landscape Design & Development')).toBeInTheDocument();
    });

    // Open Edit Service Modal for first service
    const editButtons = screen.getAllByTitle('Edit Service');
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Edit Service')).toBeInTheDocument();
      // Preview should show existing saved image
      const previewImg = screen.getByAltText('Preview');
      expect(previewImg).toBeInTheDocument();
      expect(previewImg.getAttribute('src')).toBe('https://images.example.com/landscape.jpg');
    });

    // Update title only
    const titleInput = screen.getByPlaceholderText(/e\.g\. Precision Horticultural Development/i);
    fireEvent.change(titleInput, { target: { value: 'Landscape Design & Masterplanning' } });

    // Submit edit without re-uploading an image
    const submitBtn = screen.getByRole('button', { name: /Update Service/i });
    fireEvent.submit(submitBtn.closest('form'));

    await waitFor(() => {
      expect(serviceService.updateService).toHaveBeenCalledTimes(1);
    });

    // Now test clearing the image requires replacement
    fireEvent.click(editButtons[0]);
    await waitFor(() => {
      expect(screen.getByText('Clear Image')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Clear Image'));

    // Try saving without replacement
    const updateSubmitBtn = screen.getByRole('button', { name: /Update Service/i });
    fireEvent.submit(updateSubmitBtn.closest('form'));

    await waitFor(() => {
      expect(
        screen.getByText('Please upload a service image or provide a valid image URL.')
      ).toBeInTheDocument();
    });
  });

  it('ServiceCard displays complete service heading without truncation', () => {
    const serviceWithLongTitle = {
      _id: 's_long',
      title: 'Landscape Design & Development',
      slug: 'landscape-design-development',
      description: 'Turnkey landscape architecture, hardscaping, and botanical curation.',
      imageUrl: 'https://images.example.com/landscape.jpg',
      subtitle: 'Masterplanned outdoor spaces',
    };

    render(
      <BrowserRouter>
        <ServiceCard service={serviceWithLongTitle} />
      </BrowserRouter>
    );

    // Verify complete title is rendered
    const headingLink = screen.getByRole('link', { name: 'Landscape Design & Development' });
    expect(headingLink).toBeInTheDocument();

    // Verify heading container does not have line-clamp-1
    const heading = headingLink.closest('h3');
    expect(heading.className).not.toContain('line-clamp-1');
    expect(heading.className).toContain('break-words');
  });
});

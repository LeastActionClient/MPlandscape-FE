import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import About from '../pages/About';
import Services from '../pages/Services';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import EnquiryForm from '../components/common/EnquiryForm';
import serviceService from '../services/serviceService';
import galleryService from '../services/galleryService';
import settingsService from '../services/settingsService';
import enquiryService from '../services/enquiryService';

window.scrollTo = vi.fn();

// Mock service responses
vi.mock('../services/serviceService', () => ({
  default: {
    getServices: vi.fn().mockResolvedValue({
      data: [
        {
          _id: '1',
          title: 'Commercial Landscape Maintenance',
          slug: 'commercial-landscape-maintenance',
          description: 'Groundskeeping for business parks.',
          features: ['Lawn mowing', 'Weed control'],
          imageUrl: 'https://example.com/srv1.jpg',
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
          _id: '1',
          title: 'Estate Garden Showcase',
          category: 'Residential',
          imageUrl: 'https://example.com/gal1.jpg',
        },
      ],
      categories: ['Residential', 'Commercial'],
    }),
  },
}));

vi.mock('../services/settingsService', () => ({
  default: {
    getSettings: vi.fn().mockResolvedValue({
      data: {
        companyName: 'MP Landscape Services',
        phoneNumbers: ['+91 8838548402'],
        emailAddresses: ['info@mplandscape.com'],
        whatsappNumber: '+91 8838548402',
        address: 'Coimbatore, Tamil Nadu, India',
        workingHours: 'Mon - Sat: 8:00 AM - 6:30 PM',
      },
    }),
  },
}));

vi.mock('../services/enquiryService', () => ({
  default: {
    createEnquiry: vi.fn().mockResolvedValue({
      success: true,
      message: 'Enquiry submitted successfully',
    }),
  },
}));

describe('Public Website Pages & Forms (Task 8.2)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders About Us page with legacy and core pillars', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByText(/About Our Organization/i)).toBeInTheDocument();
    expect(screen.getByText(/A Legacy of Sustainable Landscape Engineering/i)).toBeInTheDocument();
  });

  it('renders Services page with loaded service cards', async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Services />
        </BrowserRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Commercial Landscape Maintenance')).toBeInTheDocument();
    });
  });

  it('renders Gallery page with project showcase and images', async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Gallery />
        </BrowserRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('Estate Garden Showcase')[0]).toBeInTheDocument();
    });
  });

  it('renders Contact page with contact details and enquiry form', async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByText(/Get in Touch with Our Team/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Ramesh Kumar/i)).toBeInTheDocument();
  });

  it('validates required fields on EnquiryForm when submitted empty', async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <EnquiryForm />
        </BrowserRouter>
      </HelmetProvider>
    );

    const submitBtn = screen.getByRole('button', { name: /Submit Service Enquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid name using letters only/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid 10-digit mobile number/i)).toBeInTheDocument();
      expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Please select an interested service/i)).toBeInTheDocument();
      expect(screen.getByText(/Project details must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('submits enquiry form successfully and displays Thank You state', async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <EnquiryForm />
        </BrowserRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Commercial Landscape Maintenance')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/e.g. Ramesh Kumar/i), {
      target: { value: 'Suresh Raina' },
    });
    fireEvent.change(screen.getByPlaceholderText(/9876543210/i), {
      target: { value: '9876543210' },
    });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. ramesh@example\.com/i), {
      target: { value: 'suresh@example.com' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '1' },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Describe your site dimensions/i),
      {
        target: { value: 'Need comprehensive lawn installation for residential property.' },
      }
    );

    const submitBtn = screen.getByRole('button', { name: /Submit Service Enquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Thank You!/i)).toBeInTheDocument();
    });
  });

  it('converts user Google Maps place links to embeddable map URLs', () => {
    const rawPlaceUrl =
      "https://www.google.com/maps/place/13%C2%B002'45.6%22N+80%C2%B007'51.5%22E/@13.04601,80.1284065,680m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d13.04601!4d80.1309814?hl=en&entry=ttu";
    const { formatGoogleMapsEmbedUrl } = require('../utils/mapHelper');
    const embedUrl = formatGoogleMapsEmbedUrl(rawPlaceUrl);

    expect(embedUrl).toContain('maps.google.com/maps?q=13.04601,80.1309814');
    expect(embedUrl).toContain('output=embed');
  });
});

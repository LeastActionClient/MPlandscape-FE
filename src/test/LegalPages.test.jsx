import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';
import Footer from '../components/layout/Footer';

window.scrollTo = vi.fn();

describe('Legal Pages and Footer (Privacy Policy & Terms and Conditions)', () => {
  it('renders Footer with dedicated Legal section and copyright', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    // Copyright
    expect(
      screen.getByText(/© 2026 MP Landscape Services\. All Rights Reserved\./i)
    ).toBeInTheDocument();

    // Legal section label and links
    expect(screen.getByText('Legal')).toBeInTheDocument();
    const privacyLink = screen.getByRole('link', { name: /Privacy Policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');

    const termsLink = screen.getByRole('link', { name: /Terms & Conditions/i });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms-and-conditions');

    // GST Certificate link
    const gstLink = screen.getByRole('link', { name: /GST Certificate/i });
    expect(gstLink).toBeInTheDocument();
    expect(gstLink).toHaveAttribute('href', '/documents/gst-certificate.pdf');
    expect(gstLink).toHaveAttribute('target', '_blank');
    expect(gstLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Powered by Least Action Company branding link
    expect(screen.getByText(/Powered by/i)).toBeInTheDocument();
    const leastActionLink = screen.getByRole('link', { name: /Powered by Least Action Company/i });
    expect(leastActionLink).toBeInTheDocument();
    expect(leastActionLink).toHaveAttribute('href', 'https://www.leastactioncompany.com/');
    expect(leastActionLink).toHaveAttribute('target', '_blank');
    expect(leastActionLink).toHaveAttribute('rel', 'noopener noreferrer');
    const leastActionImg = screen.getByAltText('Least Action Company');
    expect(leastActionImg).toBeInTheDocument();
  });

  it('renders Privacy Policy page with all 9 numbered sections and metadata', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <PrivacyPolicy />
        </BrowserRouter>
      </HelmetProvider>
    );

    // Title and Company metadata
    expect(screen.getByRole('heading', { level: 1, name: /Privacy Policy/i })).toBeInTheDocument();
    expect(screen.getByText('MP LANDSCAPE SERVICES')).toBeInTheDocument();
    expect(screen.getByText(/Effective Date: 19 November 2026/i)).toBeInTheDocument();

    // Verify all 9 sections
    expect(screen.getByRole('heading', { name: /1\.\s*Introduction/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /2\.\s*Information We Collect/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /3\.\s*How We Use Your Information/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /4\.\s*Information Sharing/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /5\.\s*Data Security/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /6\.\s*Cookies and Website Usage/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /7\.\s*Third-Party Websites/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /8\.\s*Your Privacy Rights/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /9\.\s*Changes to This Privacy Policy/i })).toBeInTheDocument();

    // Verify key text content
    expect(screen.getByText(/Welcome to MP Landscape Services\. We respect your privacy/i)).toBeInTheDocument();
    expect(screen.getByText(/MP Landscape Services does not sell, rent, or trade customers’ personal information/i)).toBeInTheDocument();

    // Verify breadcrumbs and label badges are removed
    expect(screen.queryByLabelText(/Breadcrumb/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Legal Documentation/i)).not.toBeInTheDocument();

    // Return to home links
    const homeLinks = screen.getAllByRole('link', { name: /Home/i });
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it('renders Terms & Conditions page with all 9 numbered sections and metadata', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <TermsAndConditions />
        </BrowserRouter>
      </HelmetProvider>
    );

    // Title and Company metadata
    expect(screen.getByRole('heading', { level: 1, name: /Terms & Conditions/i })).toBeInTheDocument();
    expect(screen.getByText('MP LANDSCAPE SERVICES')).toBeInTheDocument();
    expect(screen.getByText(/Effective Date: 19 November 2026/i)).toBeInTheDocument();

    // Verify all 9 numbered sections
    expect(screen.getByRole('heading', { name: /1\.\s*Labour & Service Charges/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /2\.\s*Garden Maintenance/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /3\.\s*Existing Garden Layout/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /4\.\s*Weekly Supervisor Visit/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /5\.\s*Fertilizers/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /6\.\s*Machinery/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /7\.\s*GST & Billing/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /8\.\s*Natural Calamities/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /9\.\s*Pest & Disease Management/i })).toBeInTheDocument();

    // Verify exact content details
    expect(
      screen.getByText(/Labour, transportation, food expenses, and work charges are included in the quoted amount\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A supervisor from MP Landscape Services will visit the site once a week to inspect/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/MP Landscape Services shall not be held responsible for damage to plants, lawns, or landscaping caused by natural calamities/i)
    ).toBeInTheDocument();

    // Verify breadcrumbs and label badges are removed
    expect(screen.queryByLabelText(/Breadcrumb/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Service Agreement & Terms/i)).not.toBeInTheDocument();

    // Return to home links
    const homeLinks = screen.getAllByRole('link', { name: /Home/i });
    expect(homeLinks.length).toBeGreaterThan(0);
  });
});

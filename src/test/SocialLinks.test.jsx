import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactDetails } from '../components/common/ContactDetails';
import { FloatingSocialButtons } from '../components/common/FloatingSocialButtons';
import {
  CANONICAL_INSTAGRAM_URL,
  CANONICAL_WHATSAPP_URL,
} from '../utils/socialConfig';

describe('Social Media Links & Floating Icons', () => {
  const mockSettings = {
    companyName: 'MP Landscape Services',
    phoneNumbers: ['+91 8838548402'],
    emailAddresses: ['info@mplandscape.com'],
    whatsappNumber: '+91 8838548402',
    address: 'No.94, Sri Krishna Nagar, Mosque Street, Noombal, Thiruverkadu, Chennai, Tamil Nadu, 600077',
    workingHours: 'Mon - Sat: 8:00 AM - 6:30 PM',
    socialLinks: {
      facebook: 'https://facebook.com/mplandscape',
      linkedin: 'https://linkedin.com/company/mplandscape',
      youtube: 'https://youtube.com/mplandscape',
      instagram: '',
    },
  };

  it('renders only the Instagram link under Connect With Us on the Contact section', () => {
    render(<ContactDetails settings={mockSettings} />);

    expect(screen.getByText('Connect With Us')).toBeInTheDocument();

    // Instagram link exists and opens in a new tab
    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', CANONICAL_INSTAGRAM_URL);
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Facebook, LinkedIn, YouTube links must NOT be present
    expect(screen.queryByRole('link', { name: /facebook/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /linkedin/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /youtube/i })).not.toBeInTheDocument();
  });

  it('renders floating Instagram and WhatsApp buttons with correct URLs and accessible labels', () => {
    render(<FloatingSocialButtons settings={mockSettings} />);

    // Instagram button
    const floatingInstagram = screen.getByRole('link', { name: /instagram/i });
    expect(floatingInstagram).toBeInTheDocument();
    expect(floatingInstagram).toHaveAttribute('href', CANONICAL_INSTAGRAM_URL);
    expect(floatingInstagram).toHaveAttribute('target', '_blank');
    expect(floatingInstagram).toHaveAttribute('rel', 'noopener noreferrer');

    // WhatsApp button
    const floatingWhatsApp = screen.getByRole('link', { name: /whatsapp/i });
    expect(floatingWhatsApp).toBeInTheDocument();
    expect(floatingWhatsApp).toHaveAttribute('href', CANONICAL_WHATSAPP_URL);
    expect(floatingWhatsApp).toHaveAttribute('target', '_blank');
    expect(floatingWhatsApp).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Instagram above WhatsApp in DOM order inside FloatingSocialButtons', () => {
    const { container } = render(<FloatingSocialButtons settings={mockSettings} />);
    const links = container.querySelectorAll('a');
    expect(links.length).toBe(2);
    expect(links[0]).toHaveAttribute('href', CANONICAL_INSTAGRAM_URL);
    expect(links[1]).toHaveAttribute('href', CANONICAL_WHATSAPP_URL);
  });
});

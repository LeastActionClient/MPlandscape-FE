import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';

// Mock window.scrollTo since JSDOM does not implement it
window.scrollTo = vi.fn();

describe('Frontend App & Routing', () => {
  it('renders official MP Landscape heading and hero title', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Creating Beautiful Landscapes');
  });

  it('renders navigation links and official logo', () => {
    render(<App />);
    const logoImg = screen.getAllByAltText(/MP Landscape Services/i);
    expect(logoImg.length).toBeGreaterThan(0);
    const aboutLinks = screen.getAllByText('About Us');
    expect(aboutLinks.length).toBeGreaterThan(0);
    const galleryLinks = screen.getAllByText('Projects Gallery');
    expect(galleryLinks.length).toBeGreaterThan(0);
  });

  it('renders consultation request call-to-action buttons', () => {
    render(<App />);
    const ctas = screen.getAllByText(/Request (Enquiry|Consultation)|Enquiry/i);
    expect(ctas.length).toBeGreaterThan(0);
  });
});

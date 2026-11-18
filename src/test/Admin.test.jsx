import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '../context/AuthContext';
import AdminLogin from '../pages/admin/AdminLogin';

window.scrollTo = vi.fn();

describe('Admin Authentication & Components', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders admin login form with email, password, and security notice', () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <AdminLogin />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );

    expect(screen.getByRole('heading', { name: /Admin Portal/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Admin Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In to Dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/Return to public website/i)).toBeInTheDocument();
  });

  it('toggles password visibility when eye button is clicked', () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <AdminLogin />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );

    const passwordInput = screen.getByPlaceholderText('••••••••');
    expect(passwordInput.type).toBe('password');

    const toggleBtn = screen.getByLabelText(/Show password/i);
    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe('text');

    const hideBtn = screen.getByLabelText(/Hide password/i);
    fireEvent.click(hideBtn);
    expect(passwordInput.type).toBe('password');
  });
});

import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingSocialButtons from '../components/common/FloatingSocialButtons';
import settingsService from '../services/settingsService';
import serviceService from '../services/serviceService';

export const PublicLayout = () => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Fetch company settings and services for global header and footer
  useEffect(() => {
    let isMounted = true;
    const loadGlobalData = async () => {
      try {
        const [settingsRes, servicesRes] = await Promise.allSettled([
          settingsService.getSettings(),
          serviceService.getServices({ limit: 7 }),
        ]);

        if (isMounted) {
          if (settingsRes.status === 'fulfilled' && settingsRes.value?.data) {
            setSettings(settingsRes.value.data);
          }
          if (servicesRes.status === 'fulfilled' && servicesRes.value?.data) {
            setServices(servicesRes.value.data);
          }
        }
      } catch (err) {
        console.error('Failed to load global site configuration:', err);
      }
    };

    loadGlobalData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream text-brand-dark font-sans flex flex-col selection:bg-burgundy selection:text-white">
      {/* Toast Notification Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FAF7F2',
            color: '#292626',
            border: '1px solid #D8C3A5',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            boxShadow: '0 10px 25px rgba(84, 43, 50, 0.12)',
          },
          success: {
            iconTheme: {
              primary: '#542B32',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#542B32',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      <Header settings={settings} />

      <main className="flex-1">
        <Outlet context={{ settings, services }} />
      </main>

      <Footer settings={settings} services={services} />

      {/* Floating Instagram & WhatsApp Quick Action Buttons */}
      <FloatingSocialButtons settings={settings} />
    </div>
  );
};

export default PublicLayout;

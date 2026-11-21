import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Share2,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import settingsService from '../../services/settingsService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import Button from '../../components/common/Button';
import { formatGoogleMapsEmbedUrl } from '../../utils/mapHelper';

const ContactManagement = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [phoneNumbers, setPhoneNumbers] = useState(['']);
  const [emailAddresses, setEmailAddresses] = useState(['']);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    twitter: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [reloadToast, setReloadToast] = useState(null);
  const [showReloadConfirm, setShowReloadConfirm] = useState(false);

  const fetchSettings = async () => {
    try {
      setError(null);
      const res = await settingsService.getSettings();
      const data = res.data || {};
      setSettings(data);
      setPhoneNumbers(
        Array.isArray(data.phoneNumbers) && data.phoneNumbers.length > 0
          ? [...data.phoneNumbers]
          : ['']
      );
      setEmailAddresses(
        Array.isArray(data.emailAddresses) && data.emailAddresses.length > 0
          ? [...data.emailAddresses]
          : ['']
      );
      setWhatsappNumber(data.whatsappNumber || '');
      setAddress(data.address || '');
      setWorkingHours(data.workingHours || '');
      setMapUrl(data.mapUrl || '');
      setSocialLinks({
        facebook: data.socialLinks?.facebook || '',
        instagram: data.socialLinks?.instagram || '',
        linkedin: data.socialLinks?.linkedin || '',
        youtube: data.socialLinks?.youtube || '',
        twitter: data.socialLinks?.twitter || '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load contact settings');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const isFormDirty = () => {
    if (!settings) return false;
    const initialPhones = Array.isArray(settings.phoneNumbers) && settings.phoneNumbers.length > 0 ? settings.phoneNumbers : [''];
    const initialEmails = Array.isArray(settings.emailAddresses) && settings.emailAddresses.length > 0 ? settings.emailAddresses : [''];
    if (JSON.stringify(phoneNumbers) !== JSON.stringify(initialPhones)) return true;
    if (JSON.stringify(emailAddresses) !== JSON.stringify(initialEmails)) return true;
    if (whatsappNumber !== (settings.whatsappNumber || '')) return true;
    if (address !== (settings.address || '')) return true;
    if (workingHours !== (settings.workingHours || '')) return true;
    if (mapUrl !== (settings.mapUrl || '')) return true;
    const initialSocial = {
      facebook: settings.socialLinks?.facebook || '',
      instagram: settings.socialLinks?.instagram || '',
      linkedin: settings.socialLinks?.linkedin || '',
      youtube: settings.socialLinks?.youtube || '',
      twitter: settings.socialLinks?.twitter || '',
    };
    if (JSON.stringify(socialLinks) !== JSON.stringify(initialSocial)) return true;
    return false;
  };

  const handleReloadClick = () => {
    if (refreshing) return;
    if (isFormDirty()) {
      setShowReloadConfirm(true);
    } else {
      performReload();
    }
  };

  const performReload = async () => {
    setShowReloadConfirm(false);
    if (refreshing) return;
    try {
      setRefreshing(true);
      await fetchSettings();
      setReloadToast({ type: 'success', message: 'Contact information reloaded successfully.' });
      setTimeout(() => setReloadToast(null), 3000);
    } catch (err) {
      setReloadToast({ type: 'error', message: 'Failed to reload contact settings.' });
      setTimeout(() => setReloadToast(null), 4000);
    } finally {
      setRefreshing(false);
    }
  };

  const handlePhoneChange = (index, value) => {
    const updated = [...phoneNumbers];
    updated[index] = value;
    setPhoneNumbers(updated);
  };

  const addPhoneField = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const removePhoneField = (index) => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
    }
  };

  const handleEmailChange = (index, value) => {
    const updated = [...emailAddresses];
    updated[index] = value;
    setEmailAddresses(updated);
  };

  const addEmailField = () => {
    setEmailAddresses([...emailAddresses, '']);
  };

  const removeEmailField = (index) => {
    if (emailAddresses.length > 1) {
      setEmailAddresses(emailAddresses.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError('');
    setSaveSuccess(false);

    const cleanPhones = phoneNumbers.map((p) => p.trim()).filter(Boolean);
    const cleanEmails = emailAddresses.map((em) => em.trim()).filter(Boolean);

    if (cleanPhones.length === 0) {
      setSaveError('Please provide at least one valid contact telephone number');
      return;
    }
    if (cleanEmails.length === 0) {
      setSaveError('Please provide at least one valid email address');
      return;
    }

    try {
      setIsSaving(true);
      await settingsService.updateSettings({
        phoneNumbers: cleanPhones,
        emailAddresses: cleanEmails,
        whatsappNumber: whatsappNumber.trim(),
        address: address.trim(),
        workingHours: workingHours.trim(),
        mapUrl: mapUrl.trim(),
        socialLinks,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
      await fetchSettings();
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Failed to update contact settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <LoadingSpinner text="Retrieving contact information..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <ErrorMessage
          title="Error Loading Contact Information"
          message={error}
          onRetry={fetchSettings}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact Information | MP Landscape Services Admin</title>
      </Helmet>

      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-sand-300">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-900">
              Contact Information Management
            </h1>
            <p className="text-sm text-charcoal/70 mt-1">
              Update company customer service phone numbers, WhatsApp, emails, address, working hours, and social media.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReloadClick}
            disabled={refreshing}
            className="gap-2 self-start sm:self-auto shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${refreshing ? 'animate-spin text-burgundy-900' : ''}`} />
            <span>Reload</span>
          </Button>
        </div>

        {/* Reload Toast Notification */}
        {reloadToast && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in shadow-xs ${
              reloadToast.type === 'success'
                ? 'bg-sand-100 border-sand-300 text-burgundy-950'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-bronze shrink-0" />
              <span>{reloadToast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setReloadToast(null)}
              className="p-1 hover:opacity-75 text-charcoal/60"
            >
              &times;
            </button>
          </div>
        )}

        {/* Notifications */}
        {saveSuccess && (
          <div className="p-4 rounded-xl bg-sand-100 border border-sand-300 text-burgundy-950 text-sm font-semibold flex items-center gap-3 animate-fade-in shadow-xs">
            <CheckCircle className="w-5 h-5 text-bronze flex-shrink-0" />
            <span>Contact details updated successfully across public website and footer!</span>
          </div>
        )}


        {saveError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-3 animate-fade-in shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Phone & WhatsApp */}
          <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-5">
            <h2 className="text-base font-serif font-bold text-burgundy-900 flex items-center gap-2 pb-3 border-b border-sand-200">
              <Phone className="w-4 h-4 text-burgundy-700" />
              Direct Phone Numbers & WhatsApp
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dynamic Phone Numbers */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-2">
                  Contact Phone Numbers *
                </label>
                <div className="space-y-2.5">
                  {phoneNumbers.map((phone, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => handlePhoneChange(idx, e.target.value)}
                        placeholder="+91 8838548402"
                        className="flex-1 px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                      />
                      {phoneNumbers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePhoneField(idx)}
                          className="p-2 text-charcoal/40 hover:text-red-600 rounded-lg transition-colors"
                          title="Remove phone"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addPhoneField}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy-800 hover:text-burgundy-950 mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Another Phone Number
                  </button>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-2">
                  WhatsApp Business Number
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+91 8838548402"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
                <p className="text-[11px] text-charcoal/60 mt-1.5">
                  Used for the floating WhatsApp button and header chat links.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Email & Address */}
          <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-5">
            <h2 className="text-base font-serif font-bold text-burgundy-900 flex items-center gap-2 pb-3 border-b border-sand-200">
              <Mail className="w-4 h-4 text-burgundy-700" />
              Emails & Physical Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dynamic Email Addresses */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-2">
                  Official Email Addresses *
                </label>
                <div className="space-y-2.5">
                  {emailAddresses.map((email, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(idx, e.target.value)}
                        placeholder="info@mplandscape.com"
                        className="flex-1 px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                      />
                      {emailAddresses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEmailField(idx)}
                          className="p-2 text-charcoal/40 hover:text-red-600 rounded-lg transition-colors"
                          title="Remove email"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEmailField}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy-800 hover:text-burgundy-950 mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Another Email Address
                  </button>
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-2">
                  Working Hours / Operational Schedule
                </label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  placeholder="Mon - Sat: 8:00 AM - 6:30 PM (Sunday Closed)"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
                <p className="text-[11px] text-charcoal/60 mt-1.5">
                  Displayed in website header, footer, and contact section.
                </p>
              </div>

              {/* Physical Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-2">
                  Physical Office / Nursery Address
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Green Valley Horticultural Park, Coimbatore, Tamil Nadu, India"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              {/* Google Maps URL */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-2">
                  Google Maps URL / Coordinates / Embed Code
                </label>
                <input
                  type="text"
                  value={mapUrl}
                  onChange={(e) => setMapUrl(e.target.value)}
                  placeholder="https://maps.google.com/maps/place/... or coordinates or iframe embed code"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
                <p className="text-[11px] text-charcoal/60 mt-1">
                  Accepts Google Maps place links, share URLs, coordinates, or iframe embed codes. Automatically converted for embedding.
                </p>

                {mapUrl && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-sand-300 h-44 bg-sand-50 relative">
                    <iframe
                      src={formatGoogleMapsEmbedUrl(mapUrl, physicalOfficeAddress)}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      title="Google Maps Location Preview"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Social Media Profiles */}
          <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-5">
            <h2 className="text-base font-serif font-bold text-burgundy-900 flex items-center gap-2 pb-3 border-b border-sand-200">
              <Share2 className="w-4 h-4 text-burgundy-700" />
              Social Media Channels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={socialLinks.facebook}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, facebook: e.target.value })
                  }
                  placeholder="https://facebook.com/mplandscape"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={socialLinks.instagram}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, instagram: e.target.value })
                  }
                  placeholder="https://instagram.com/mplandscape"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={socialLinks.linkedin}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                  }
                  placeholder="https://linkedin.com/company/mplandscape"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={socialLinks.youtube}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, youtube: e.target.value })
                  }
                  placeholder="https://youtube.com/@mplandscape"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Twitter / X URL
                </label>
                <input
                  type="url"
                  value={socialLinks.twitter}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, twitter: e.target.value })
                  }
                  placeholder="https://twitter.com/mplandscape"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSaving}
              className="gap-2 shadow-sm w-full sm:w-auto justify-center"
            >
              <Save className="w-4 h-4 shrink-0" />
              <span>{isSaving ? 'Saving Changes...' : 'Save Contact Information'}</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Reload Confirmation Dialog for Dirty Form */}
      <ConfirmationDialog
        isOpen={showReloadConfirm}
        onClose={() => setShowReloadConfirm(false)}
        onConfirm={performReload}
        title="Discard Unsaved Changes?"
        message="You have unsaved changes in the contact information form. Reloading from the database will overwrite your current changes. Are you sure you want to proceed?"
        confirmText="Reload & Discard"
        confirmVariant="danger"
      />
    </>
  );
};

export default ContactManagement;

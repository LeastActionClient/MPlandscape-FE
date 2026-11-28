import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Building2,
  Target,
  Compass,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';
import settingsService from '../../services/settingsService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button from '../../components/common/Button';
import MPLogo from '../../assets/logo/MPLogo';

const CompanySettings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [companyName, setCompanyName] = useState('');
  const [tagline, setTagline] = useState('');
  const [aboutDescription, setAboutDescription] = useState('');
  const [vision, setVision] = useState('');
  const [mission, setMission] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [reloadToast, setReloadToast] = useState(null);

  const fetchSettings = async () => {
    try {
      setError(null);
      const res = await settingsService.getSettings();
      const data = res.data || {};
      setCompanyName(data.companyName || 'MP Landscape Services');
      setTagline(data.tagline || '');
      setAboutDescription(data.aboutDescription || '');
      setVision(data.vision || '');
      setMission(data.mission || '');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load company settings');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleReload = async () => {
    if (refreshing) return;
    try {
      setRefreshing(true);
      await fetchSettings();
      setReloadToast({ type: 'success', message: 'Company settings reloaded successfully.' });
      setTimeout(() => setReloadToast(null), 3000);
    } catch (err) {
      setReloadToast({ type: 'error', message: 'Failed to reload company settings.' });
      setTimeout(() => setReloadToast(null), 4000);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError('');
    setSaveSuccess(false);

    if (!companyName.trim()) {
      setSaveError('Company Name is required');
      return;
    }

    try {
      setIsSaving(true);
      await settingsService.updateSettings({
        companyName: companyName.trim(),
        tagline: tagline.trim(),
        aboutDescription: aboutDescription.trim(),
        vision: vision.trim(),
        mission: mission.trim(),
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
      await fetchSettings();
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Failed to update company settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <LoadingSpinner text="Retrieving company profile settings..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <ErrorMessage
          title="Error Loading Settings"
          message={error}
          onRetry={fetchSettings}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Company Settings | MP Landscape Services Admin</title>
      </Helmet>

      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-sand-300">
          <div>
            <h1 className="text-[23px] min-[360px]:text-[25px] min-[390px]:text-[27px] sm:text-3xl font-serif font-semibold sm:font-bold text-burgundy-900 leading-tight">
              Company Settings
            </h1>
            <p className="text-[13px] min-[360px]:text-[13.5px] min-[390px]:text-[14px] sm:text-sm text-charcoal/70 mt-1">
              Configure brand identity, company mission, vision statement, and public about narratives.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReload}
            disabled={refreshing}
            className="gap-2 self-start sm:self-auto shrink-0 text-xs sm:text-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${refreshing ? 'animate-spin text-burgundy-900' : ''}`} />
            <span>Reload</span>
          </Button>
        </div>

        {/* Reload Toast Alert */}
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
            <span>Company settings updated successfully! Changes reflect on the public website.</span>
          </div>
        )}


        {saveError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-3 animate-fade-in shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Brand Identity Card */}
          <div className="bg-white p-4 min-[360px]:p-5 sm:p-6 rounded-2xl border border-sand-300 shadow-xs space-y-4 sm:space-y-5">
            <h2 className="text-[15px] min-[360px]:text-[16px] sm:text-base font-serif font-semibold sm:font-bold text-burgundy-900 flex items-center gap-2 pb-2.5 sm:pb-3 border-b border-sand-200">
              <Building2 className="w-4 h-4 text-burgundy-700" />
              Brand & Company Identity
            </h2>

            {/* Official Logo Display */}
            <div className="flex items-center gap-5 p-4 rounded-xl bg-sand-50 border border-sand-200">
              <div className="w-16 h-16 bg-white p-2 rounded-xl border border-sand-300 shadow-2xs flex items-center justify-center shrink-0">
                <MPLogo imgClassName="h-12 w-12 object-contain" />
              </div>
              <div>
                <p className="text-xs font-bold text-burgundy-900 uppercase tracking-wider">
                  Official Brand Emblem
                </p>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  High-resolution brand vector emblem with original tree artwork and foliage colors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Company Official Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="MP Landscape Services"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Company Tagline / Slogan
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Premier Landscaping, Agriculture & Horticultural Solutions"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Narrative & Philosophy Card */}
          <div className="bg-white p-4 min-[360px]:p-5 sm:p-6 rounded-2xl border border-sand-300 shadow-xs space-y-4 sm:space-y-5">
            <h2 className="text-[15px] min-[360px]:text-[16px] sm:text-base font-serif font-semibold sm:font-bold text-burgundy-900 flex items-center gap-2 pb-2.5 sm:pb-3 border-b border-sand-200">
              <FileText className="w-4 h-4 text-burgundy-700" />
              About Story, Vision & Mission
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  About Us Public Summary
                </label>
                <textarea
                  rows={4}
                  value={aboutDescription}
                  onChange={(e) => setAboutDescription(e.target.value)}
                  placeholder="Detailed background of the company's horticultural legacy and landscaping capabilities..."
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-burgundy-700" />
                  Corporate Vision Statement
                </label>
                <textarea
                  rows={2}
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  placeholder="The aspirational long-term future and ecological benchmark envisioned..."
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-burgundy-700" />
                  Corporate Mission Statement
                </label>
                <textarea
                  rows={2}
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  placeholder="The immediate core objectives, craftsmanship standards, and client deliverables..."
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSaving}
              className="gap-2 shadow-sm w-full sm:w-auto justify-center"
            >
              <Save className="w-4 h-4 shrink-0" />
              <span>{isSaving ? 'Saving Settings...' : 'Save Company Settings'}</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanySettings;

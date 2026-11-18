import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Check,
  X,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Tag,
} from 'lucide-react';
import serviceService from '../../services/serviceService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import Button from '../../components/common/Button';

const INITIAL_FORM = {
  title: '',
  slug: '',
  subtitle: '',
  description: '',
  imageUrl: '',
  features: [],
  displayOrder: 0,
  isActive: true,
  seoTitle: '',
  seoDescription: '',
};

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchServices = async () => {
    try {
      setError(null);
      const res = await serviceService.getServices({ all: 'true', limit: 100 });
      setServices(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load services list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(INITIAL_FORM);
    setImageFile(null);
    setImagePreview('');
    setTagInput('');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingId(service._id);
    setFormData({
      title: service.title || '',
      slug: service.slug || '',
      subtitle: service.subtitle || '',
      description: service.description || '',
      imageUrl: service.imageUrl || '',
      features: Array.isArray(service.features) ? [...service.features] : [],
      displayOrder: service.displayOrder ?? 0,
      isActive: service.isActive ?? true,
      seoTitle: service.seoTitle || '',
      seoDescription: service.seoDescription || '',
    });
    setImageFile(null);
    setImagePreview(service.imageUrl || '');
    setTagInput('');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmed = tagInput.trim();
    if (trimmed && !formData.features.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, trimmed],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim()) {
      setFormError('Service title is required');
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Service description is required');
      return;
    }
    if (!editingId && !imageFile && !formData.imageUrl) {
      setFormError('Please select an image file or provide an image URL');
      return;
    }

    try {
      setIsSaving(true);
      const dataPayload = new FormData();
      dataPayload.append('title', formData.title.trim());
      if (formData.slug) dataPayload.append('slug', formData.slug.trim());
      dataPayload.append('subtitle', formData.subtitle.trim());
      dataPayload.append('description', formData.description.trim());
      dataPayload.append('displayOrder', String(formData.displayOrder));
      dataPayload.append('isActive', String(formData.isActive));
      dataPayload.append('seoTitle', formData.seoTitle.trim());
      dataPayload.append('seoDescription', formData.seoDescription.trim());
      dataPayload.append('features', JSON.stringify(formData.features));

      if (imageFile) {
        dataPayload.append('image', imageFile);
      } else if (formData.imageUrl) {
        dataPayload.append('imageUrl', formData.imageUrl);
      }

      if (editingId) {
        await serviceService.updateService(editingId, dataPayload);
      } else {
        await serviceService.createService(dataPayload);
      }

      setIsModalOpen(false);
      await fetchServices();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save service');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (service) => {
    try {
      const updatedStatus = !service.isActive;
      // Optimistic UI update
      setServices((prev) =>
        prev.map((s) => (s._id === service._id ? { ...s, isActive: updatedStatus } : s))
      );
      await serviceService.updateService(service._id, { isActive: updatedStatus });
    } catch (err) {
      // Revert if failed
      fetchServices();
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await serviceService.deleteService(deleteTarget._id);
      setDeleteTarget(null);
      await fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete service');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredServices = services.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.title?.toLowerCase().includes(term) ||
      s.subtitle?.toLowerCase().includes(term) ||
      s.description?.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <Helmet>
        <title>Services Management | MP Landscape Services Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-sand-300">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-900">
              Services Management
            </h1>
            <p className="text-sm text-charcoal/70 mt-1">
              Create, update, reorder, and configure company service offerings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fetchServices}
              className="gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={openAddModal}
              className="gap-2 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="bg-white p-4 rounded-xl border border-sand-300 shadow-xs flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services by title or description..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-sand-50/50 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:bg-white transition-colors"
            />
          </div>
          <span className="text-xs text-charcoal/60 font-medium hidden sm:inline">
            Showing {filteredServices.length} of {services.length} services
          </span>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner text="Loading services..." size="lg" />
          </div>
        ) : error ? (
          <ErrorMessage title="Error loading services" message={error} onRetry={fetchServices} />
        ) : filteredServices.length === 0 ? (
          <EmptyState
            title="No services found"
            message={
              search
                ? `No services match your search term "${search}". Try adjusting your filters.`
                : 'Get started by creating your first landscaping service.'
            }
            actionText={search ? 'Clear Search' : 'Add First Service'}
            onAction={search ? () => setSearch('') : openAddModal}
          />
        ) : (
          <div className="bg-white rounded-2xl border border-sand-300 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-charcoal">
                <thead className="bg-sand-50/70 text-xs font-semibold text-charcoal/70 uppercase tracking-wider border-b border-sand-200">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">Service</th>
                    <th scope="col" className="px-5 py-3.5">Order</th>
                    <th scope="col" className="px-5 py-3.5">Features</th>
                    <th scope="col" className="px-5 py-3.5">Status</th>
                    <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {filteredServices.map((service) => (
                    <tr key={service._id} className="hover:bg-sand-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={service.imageUrl || '/mp-logo.png'}
                            alt={service.title}
                            className="w-14 h-12 object-cover rounded-lg border border-sand-300 bg-sand-100 flex-shrink-0"
                            onError={(e) => {
                              e.target.src = '/mp-logo.png';
                            }}
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-burgundy-950 truncate max-w-xs sm:max-w-md">
                              {service.title}
                            </p>
                            <p className="text-xs text-charcoal/60 truncate max-w-xs">
                              {service.subtitle || service.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-xs font-semibold text-charcoal/70">
                        #{service.displayOrder ?? 0}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {service.features && service.features.length > 0 ? (
                            service.features.slice(0, 3).map((f, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-xs bg-sand-100 text-charcoal/80 text-[11px] font-medium border border-sand-200"
                              >
                                {f}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-charcoal/40 italic">None</span>
                          )}
                          {service.features && service.features.length > 3 && (
                            <span className="text-[10px] text-charcoal/60 font-semibold self-center">
                              +{service.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(service)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors border ${
                            service.isActive
                              ? 'bg-sand-200 text-burgundy-950 border-sand-300 hover:bg-sand-300'
                              : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${service.isActive ? 'bg-bronze' : 'bg-gray-400'}`} />
                          {service.isActive ? 'Active' : 'Inactive'}
                        </button>

                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right text-xs">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/services/${service.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-charcoal/60 hover:text-burgundy-900 hover:bg-sand-100 transition-colors"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => openEditModal(service)}
                            className="p-1.5 rounded-lg text-burgundy-700 hover:text-burgundy-950 hover:bg-sand-100 transition-colors"
                            title="Edit Service"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(service)}
                            className="p-1.5 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingId ? 'Edit Service' : 'Add New Service'}
          size="xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            {formError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Precision Horticultural Development"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  URL Slug (Optional - auto-generated from title)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. precision-horticultural-development"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Tailored plant species selection and soil conditioning"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive service description detailing methodology, applications, and value delivered..."
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              {/* Image Upload & Preview */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Service Banner Image
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-full sm:w-1/2">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-sand-300 hover:border-burgundy-600 rounded-xl p-4 cursor-pointer bg-sand-50/50 hover:bg-sand-50 transition-colors">
                      <Upload className="w-6 h-6 text-burgundy-700 mb-1" />
                      <span className="text-xs font-semibold text-charcoal">
                        Upload Image File
                      </span>
                      <span className="text-[10px] text-charcoal/50">PNG, JPG, WEBP up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <div className="mt-2">
                      <span className="text-[11px] text-charcoal/60">Or provide image URL:</span>
                      <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => {
                          setFormData({ ...formData, imageUrl: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 mt-0.5 border border-sand-300 rounded-lg text-xs focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2 flex flex-col items-center justify-center p-2 border border-sand-200 rounded-xl bg-sand-50 h-36">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-charcoal/40 text-xs flex flex-col items-center gap-1">
                        <ImageIcon className="w-6 h-6" />
                        <span>No image selected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Dynamic Feature Tags */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Key Features / Deliverables
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(e);
                      }
                    }}
                    placeholder="e.g. Native Flora Integration (Press Enter)"
                    className="flex-1 px-3 py-1.5 border border-sand-300 rounded-lg text-xs focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddTag}
                    className="text-xs px-3"
                  >
                    Add Tag
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-sand-50 border border-sand-200 rounded-lg">
                  {formData.features.length === 0 ? (
                    <span className="text-xs text-charcoal/40 italic">
                      No feature tags added yet. Type a feature above and click Add Tag.
                    </span>
                  ) : (
                    formData.features.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-sand-300 text-burgundy-900 text-xs font-medium shadow-2xs"
                      >
                        <Tag className="w-3 h-3 text-burgundy-700" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(idx)}
                          className="text-charcoal/40 hover:text-red-600 ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 0 })
                  }
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-burgundy-700 rounded-sm border-sand-300 focus:ring-burgundy-600"
                />
                <label htmlFor="isActive" className="text-xs font-semibold text-charcoal cursor-pointer">
                  Active (visible on public website)
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Optional custom title for search engines"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-xs focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  SEO Description
                </label>
                <input
                  type="text"
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Optional meta description for search engines"
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-xs focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-sand-200">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setIsModalOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSaving}
              >
                {isSaving ? 'Saving Service...' : editingId ? 'Update Service' : 'Create Service'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete Service"
          message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? All associated data and imagery will be removed.`}
          confirmText={isDeleting ? 'Deleting...' : 'Delete Service'}
          confirmVariant="danger"
        />
      </div>
    </>
  );
};

export default ServicesManagement;

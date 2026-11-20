import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Upload,
  Image as ImageIcon,
  Edit,
  Trash2,
  Filter,
  RefreshCw,
  AlertCircle,
  X,
  ExternalLink,
  Layers,
  Check,
  CheckCircle,
} from 'lucide-react';
import galleryService from '../../services/galleryService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/common/Button';

const GalleryManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Upload Modal State (Supports multi-file)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadOrder, setUploadOrder] = useState(0);
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadActive, setUploadActive] = useState(true);
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Edit Single Item Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState('');
  const [editError, setEditError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchGallery = async () => {
    try {
      setError(null);
      const params = { all: 'true', limit: 100 };
      const res = await galleryService.getGallery(params);
      setItems(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch gallery items');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleRefresh = async () => {
    if (refreshing) return;
    try {
      setRefreshing(true);
      await fetchGallery();
      setRefreshToast({ type: 'success', message: 'Gallery records refreshed successfully.' });
      setTimeout(() => setRefreshToast(null), 3000);
    } catch (err) {
      setRefreshToast({ type: 'error', message: 'Failed to refresh gallery records.' });
      setTimeout(() => setRefreshToast(null), 4000);
    } finally {
      setRefreshing(false);
    }
  };

  const handleFilesSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploadFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((f) => URL.createObjectURL(f));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeSelectedFile = (index) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const openUploadModal = () => {
    setUploadFiles([]);
    setPreviewUrls([]);
    setUploadTitle('');
    setUploadDescription('');
    setUploadOrder(0);
    setUploadUrl('');
    setUploadActive(true);
    setUploadError('');
    setIsUploadModalOpen(true);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');

    if (!uploadTitle.trim()) {
      setUploadError('Title is required');
      return;
    }

    if (uploadFiles.length === 0 && !uploadUrl.trim()) {
      setUploadError('Please select at least one image file or provide an image URL');
      return;
    }

    try {
      setIsUploading(true);
      const payload = new FormData();
      payload.append('title', uploadTitle.trim());
      payload.append('description', uploadDescription.trim());
      payload.append('displayOrder', String(uploadOrder));
      payload.append('isActive', String(uploadActive));

      if (uploadFiles.length > 0) {
        uploadFiles.forEach((f) => {
          payload.append('images', f);
        });
      } else if (uploadUrl.trim()) {
        payload.append('imageUrl', uploadUrl.trim());
      }

      await galleryService.createGallery(payload);
      setIsUploadModalOpen(false);
      await fetchGallery();
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Failed to upload gallery images');
    } finally {
      setIsUploading(false);
    }
  };

  const openEditModal = (item) => {
    setEditingItem({ ...item });
    setEditFile(null);
    setEditPreview(item.imageUrl || '');
    setEditError('');
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setEditError('');

    if (!editingItem.title?.trim()) {
      setEditError('Title is required');
      return;
    }

    try {
      setIsEditing(true);
      const payload = new FormData();
      payload.append('title', editingItem.title.trim());
      payload.append('description', editingItem.description || '');
      payload.append('displayOrder', String(editingItem.displayOrder ?? 0));
      payload.append('isActive', String(editingItem.isActive));

      if (editFile) {
        payload.append('image', editFile);
      } else if (editingItem.imageUrl) {
        payload.append('imageUrl', editingItem.imageUrl);
      }

      await galleryService.updateGallery(editingItem._id, payload);
      setIsEditModalOpen(false);
      await fetchGallery();
    } catch (err) {
      setEditError(err.response?.data?.message || 'Failed to update gallery item');
    } finally {
      setIsEditing(false);
    }
  };

  const handleToggleActive = async (item) => {
    try {
      const nextStatus = !item.isActive;
      setItems((prev) =>
        prev.map((i) => (i._id === item._id ? { ...i, isActive: nextStatus } : i))
      );
      await galleryService.updateGallery(item._id, { isActive: nextStatus });
    } catch (err) {
      fetchGallery();
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await galleryService.deleteGallery(deleteTarget._id);
      setDeleteTarget(null);
      await fetchGallery();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete gallery item');
    } finally {
      setIsDeleting(false);
    }
  };

  const totalPages = Math.ceil(items.length / pageSize) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedItems = items.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  return (
    <>
      <Helmet>
        <title>Gallery Management | MP Landscape Services Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-sand-300">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-900">
              Gallery Management
            </h1>
            <p className="text-sm text-charcoal/70 mt-1">
              Upload, organize, preview, and maintain portfolio showcase imagery.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="gap-2 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${refreshing ? 'animate-spin text-burgundy-900' : ''}`} />
              <span>Refresh</span>
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={openUploadModal}
              className="gap-2 shadow-xs shrink-0"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Upload Images</span>
            </Button>
          </div>
        </div>

        {/* Refresh Toast Banner */}
        {refreshToast && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in shadow-xs ${
              refreshToast.type === 'success'
                ? 'bg-sand-100 border-sand-300 text-burgundy-950'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-bronze shrink-0" />
              <span>{refreshToast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setRefreshToast(null)}
              className="p-1 hover:opacity-75 text-charcoal/60"
            >
              &times;
            </button>
          </div>
        )}

        {/* Gallery Content */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner text="Loading gallery..." size="lg" />
          </div>
        ) : error ? (
          <ErrorMessage title="Error loading gallery" message={error} onRetry={fetchGallery} />
        ) : items.length === 0 ? (
          <EmptyState
            title="No gallery items found"
            message="There are no items currently in the gallery."
            actionText="Upload Images"
            onAction={openUploadModal}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {paginatedItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-sand-300 shadow-xs overflow-hidden flex flex-col group hover:shadow-md transition-all duration-200"
                >
                  <div className="relative aspect-4/3 bg-sand-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/mp-logo.png';
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(item)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs transition-colors ${
                          item.isActive
                            ? 'bg-bronze text-white'
                            : 'bg-gray-700/80 text-gray-200'
                        }`}
                      >
                        {item.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-burgundy-950 truncate">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-charcoal/60 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-sand-100 flex items-center justify-between text-xs text-charcoal/60">
                      <span>Order: #{item.displayOrder ?? 0}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="p-1 rounded-md text-burgundy-700 hover:text-burgundy-950 hover:bg-sand-100 transition-colors"
                          title="Edit metadata"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="p-1 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                          title="Delete image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="bg-white p-4 rounded-2xl border border-sand-300 shadow-xs">
              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                totalRecords={items.length}
                pageSize={pageSize}
                pageSizeOptions={[12, 24, 48]}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setCurrentPage(1);
                }}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </div>
          </div>
        )}

        {/* Upload Modal (Single / Multi-file) */}
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="Upload Gallery Images"
          size="lg"
        >
          <form onSubmit={handleUploadSubmit} className="space-y-5 text-sm">
            {uploadError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Project Title / Image Caption *
              </label>
              <input
                type="text"
                required
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="e.g. Luxury Estate Manicured Lawns & Native Flora"
                className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Display Order
              </label>
              <input
                type="number"
                min="0"
                value={uploadOrder}
                onChange={(e) => setUploadOrder(parseInt(e.target.value, 10) || 0)}
                placeholder="0"
                className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Description (Optional)
              </label>
              <textarea
                rows={2}
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                placeholder="Brief project details, species used, or client requirements..."
                className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
              />
            </div>

            {/* Drag & Drop File Picker with Multiple Previews */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Select Photo(s) (Single or Multi-select)
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-sand-300 hover:border-burgundy-600 rounded-xl p-5 cursor-pointer bg-sand-50/50 hover:bg-sand-50 transition-colors">
                <Upload className="w-8 h-8 text-burgundy-700 mb-1" />
                <span className="text-xs font-semibold text-charcoal">
                  Click to select images or drag and drop
                </span>
                <span className="text-[10px] text-charcoal/50 mt-0.5">
                  Supports multiple JPG, PNG, WEBP files
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFilesSelect}
                  className="hidden"
                />
              </label>

              {/* Previews */}
              {previewUrls.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-charcoal mb-2">
                    Selected Images ({previewUrls.length}):
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-2 bg-sand-50 rounded-xl border border-sand-200">
                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-sand-300">
                        <img src={url} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeSelectedFile(idx)}
                          className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alternative Image URL */}
              <div className="mt-3">
                <span className="text-[11px] text-charcoal/60">Or provide image URL:</span>
                <input
                  type="url"
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-2.5 py-1.5 mt-0.5 border border-sand-300 rounded-lg text-xs focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="uploadActive"
                checked={uploadActive}
                onChange={(e) => setUploadActive(e.target.checked)}
                className="w-4 h-4 text-burgundy-700 rounded-sm border-sand-300 focus:ring-burgundy-600"
              />
              <label htmlFor="uploadActive" className="text-xs font-semibold text-charcoal cursor-pointer">
                Publish immediately to public gallery
              </label>
            </div>

            <div className="flex flex-col-reverse xs:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-sand-200">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setIsUploadModalOpen(false)}
                disabled={isUploading}
                className="w-full xs:w-auto justify-center"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isUploading}
                className="w-full xs:w-auto justify-center"
              >
                {isUploading ? 'Uploading...' : `Upload ${uploadFiles.length > 1 ? `${uploadFiles.length} Photos` : 'Image'}`}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit Single Item Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Gallery Item"
          size="md"
        >
          {editingItem && (
            <form onSubmit={handleEditSubmit} className="space-y-4 text-sm">
              {editError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{editError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Display Order</label>
                <input
                  type="number"
                  min="0"
                  value={editingItem.displayOrder ?? 0}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      displayOrder: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Image</label>
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-sand-300 flex-shrink-0 bg-sand-100">
                    <img src={editPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setEditFile(file);
                          setEditPreview(URL.createObjectURL(file));
                        }
                      }}
                      className="text-xs text-charcoal"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="editActive"
                  checked={editingItem.isActive}
                  onChange={(e) => setEditingItem({ ...editingItem, isActive: e.target.checked })}
                  className="w-4 h-4 text-burgundy-700 rounded-sm border-sand-300 focus:ring-burgundy-600"
                />
                <label htmlFor="editActive" className="text-xs font-semibold text-charcoal cursor-pointer">
                  Active (visible on website)
                </label>
              </div>

              <div className="flex flex-col-reverse xs:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-sand-200">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isEditing}
                  className="w-full xs:w-auto justify-center"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isEditing}
                  className="w-full xs:w-auto justify-center"
                >
                  {isEditing ? 'Updating...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          )}
        </Modal>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete Gallery Photo"
          message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
          confirmText={isDeleting ? 'Deleting...' : 'Delete Photo'}
          confirmVariant="danger"
        />
      </div>
    </>
  );
};

export default GalleryManagement;

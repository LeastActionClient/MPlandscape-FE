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
  Video,
  Play,
  Film,
} from 'lucide-react';
import galleryService from '../../services/galleryService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/common/Button';
import compressImageFile from '../../utils/imageCompressor';

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
  const [uploadProgress, setUploadProgress] = useState('');
  const [isDragging, setIsDragging] = useState(false);

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

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const isVideoFile = (file) => {
    if (!file) return false;
    if (file.type && file.type.startsWith('video/')) return true;
    return /\.(mp4|webm|mov|m4v)$/i.test(file.name || '');
  };

  const isImageFile = (file) => {
    if (!file) return false;
    if (file.type && file.type.startsWith('image/')) return true;
    return /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(file.name || '');
  };

  const processFiles = async (fileList) => {
    setUploadError('');
    const newFiles = [];
    const newPreviews = [];

    for (const file of fileList) {
      if (!file) continue;

      const isVideo = isVideoFile(file);
      const isImage = isImageFile(file);

      if (!isVideo && !isImage) {
        setUploadError(
          `File "${file.name}" has an unsupported format. Supported formats: JPG, PNG, WEBP, GIF, AVIF for images; MP4, WEBM, MOV, M4V for videos.`
        );
        return;
      }

      if (isVideo && file.size > 100 * 1024 * 1024) {
        setUploadError(
          `Video "${file.name}" exceeds the 100 MB limit (${formatFileSize(file.size)}).`
        );
        return;
      }

      if (isImage && file.size > 15 * 1024 * 1024) {
        setUploadError(
          `Image "${file.name}" exceeds the 15 MB limit (${formatFileSize(file.size)}).`
        );
        return;
      }

      if (isImage) {
        try {
          const optimized = await compressImageFile(file);
          newFiles.push(optimized);
          newPreviews.push({
            url: URL.createObjectURL(optimized),
            isVideo: false,
            name: file.name,
            size: optimized.size || file.size,
          });
        } catch {
          newFiles.push(file);
          newPreviews.push({
            url: URL.createObjectURL(file),
            isVideo: false,
            name: file.name,
            size: file.size,
          });
        }
      } else {
        // Videos are kept without image compression
        newFiles.push(file);
        newPreviews.push({
          url: URL.createObjectURL(file),
          isVideo: true,
          name: file.name,
          size: file.size,
        });
      }
    }

    setUploadFiles((prev) => [...prev, ...newFiles]);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const handleFilesSelect = async (e) => {
    if (e.target.files) {
      await processFiles(Array.from(e.target.files));
      e.target.value = ''; // Reset input to allow selecting same file again if desired
    }
  };

  const removeSelectedFile = (index) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      const removed = prev[index];
      if (removed?.url) {
        URL.revokeObjectURL(removed.url);
      }
      return prev.filter((_, i) => i !== index);
    });
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
    setUploadProgress('');
    setIsDragging(false);
    setIsUploadModalOpen(true);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');
    setUploadProgress('');

    if (!uploadTitle.trim()) {
      setUploadError('Title is required');
      return;
    }

    if (uploadFiles.length === 0 && !uploadUrl.trim()) {
      setUploadError('Please select at least one image or video file, or provide an image URL');
      return;
    }

    if (uploadUrl.trim() && /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(uploadUrl.trim())) {
      setUploadError('The URL option is strictly for images. Please upload videos via the file selector.');
      return;
    }

    try {
      setIsUploading(true);

      if (uploadFiles.length > 0) {
        // Upload media one-by-one to support multiple uploads and progress tracking
        for (let i = 0; i < uploadFiles.length; i++) {
          const file = uploadFiles[i];
          const isVideo = isVideoFile(file);
          const mediaLabel = isVideo ? 'video' : 'image';
          setUploadProgress(
            uploadFiles.length > 1
              ? `Uploading ${mediaLabel} ${i + 1} of ${uploadFiles.length}: ${file.name || ''}...`
              : `Uploading ${mediaLabel}: ${file.name || ''}...`
          );

          const payload = new FormData();
          const itemTitle =
            uploadFiles.length === 1
              ? uploadTitle.trim()
              : `${uploadTitle.trim()} - Part ${i + 1}`;
          payload.append('title', itemTitle);
          payload.append('description', uploadDescription.trim());
          payload.append('displayOrder', String(Number(uploadOrder) + i));
          payload.append('isActive', String(uploadActive));
          payload.append('mediaType', isVideo ? 'VIDEO' : 'IMAGE');
          payload.append('media', file);

          await galleryService.createGallery(payload);
        }
      } else if (uploadUrl.trim()) {
        setUploadProgress('Saving image URL...');
        const payload = new FormData();
        payload.append('title', uploadTitle.trim());
        payload.append('description', uploadDescription.trim());
        payload.append('displayOrder', String(uploadOrder));
        payload.append('isActive', String(uploadActive));
        payload.append('mediaType', 'IMAGE');
        payload.append('imageUrl', uploadUrl.trim());

        await galleryService.createGallery(payload);
      }

      setIsUploadModalOpen(false);
      await fetchGallery();
    } catch (err) {
      setUploadError(
        err.response?.data?.message ||
          'Failed to upload gallery media. Please verify your connection or try uploading fewer items at a time.'
      );
    } finally {
      setIsUploading(false);
      setUploadProgress('');
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
        const isVideo = isVideoFile(editFile);
        if (isVideo && editFile.size > 100 * 1024 * 1024) {
          setEditError(`Video exceeds the 100 MB limit (${formatFileSize(editFile.size)}).`);
          setIsEditing(false);
          return;
        }
        if (!isVideo && editFile.size > 15 * 1024 * 1024) {
          setEditError(`Image exceeds the 15 MB limit (${formatFileSize(editFile.size)}).`);
          setIsEditing(false);
          return;
        }
        payload.append('mediaType', isVideo ? 'VIDEO' : 'IMAGE');
        payload.append('media', editFile);
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
              aria-label="Upload Images & Media"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Upload Media</span>
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
            actionText="Upload Media"
            onAction={openUploadModal}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {paginatedItems.map((item) => {
                const isVideo =
                  item.mediaType === 'VIDEO' ||
                  item.resourceType === 'video' ||
                  /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(item.imageUrl || '');

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl border border-sand-300 shadow-xs overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-burgundy/5 hover:border-sand-400 hover:-translate-y-1 transition-all duration-300 relative"
                  >
                    {/* Sliding Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                    <div className="relative aspect-4/3 bg-sand-100 overflow-hidden">
                      {isVideo ? (
                        <div className="relative w-full h-full bg-brand-charcoal flex items-center justify-center">
                          {item.videoThumbnail ? (
                            <img
                              src={item.videoThumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                            />
                          ) : (
                            <video
                              src={item.imageUrl}
                              preload="metadata"
                              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out pointer-events-none"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/20 transition-colors pointer-events-none">
                            <div className="w-10 h-10 rounded-full bg-black/60 border border-bronze/60 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-burgundy transition-all">
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[10px] font-bold text-sand-100 border border-white/20 flex items-center gap-1 shadow-xs">
                            <Film className="w-3 h-3 text-bronze" />
                            <span>VIDEO</span>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                          onError={(e) => {
                            e.target.src = '/mp-logo.png';
                          }}
                        />
                      )}
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
                            title="Delete media"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
          title="Upload Gallery Media"
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
                Project Title / Caption *
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

            {/* Drag & Drop Media Picker with Separate Image & Video Previews */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Select Media File(s) (Images & Videos Supported)
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                }}
                onDrop={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    await processFiles(Array.from(e.dataTransfer.files));
                  }
                }}
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-5 cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-burgundy-600 bg-sand-100 ring-2 ring-burgundy-600/20'
                    : 'border-sand-300 hover:border-burgundy-600 bg-sand-50/50 hover:bg-sand-50'
                }`}
              >
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <Upload className="w-8 h-8 text-burgundy-700 mb-1" />
                  <span className="text-xs font-semibold text-charcoal">
                    Click to select images or videos, or drag &amp; drop
                  </span>
                  <span className="text-[10px] text-charcoal/60 mt-0.5 text-center">
                    Images: JPG, PNG, WEBP, GIF, AVIF (max 15MB) &bull; Videos: MP4, WEBM, MOV, M4V (max 100MB)
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm,video/quicktime,video/x-m4v"
                    onChange={handleFilesSelect}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Previews with Distinct Image & Video Indicators and Playback Controls */}
              {previewUrls.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-charcoal mb-2">
                    Selected Media ({previewUrls.length}):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-2.5 bg-sand-50 rounded-xl border border-sand-200">
                    {previewUrls.map((preview, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-xl overflow-hidden group border border-sand-300 bg-white flex flex-col shadow-2xs"
                      >
                        {preview.isVideo ? (
                          <div className="relative aspect-video bg-black flex items-center justify-center">
                            <video
                              src={preview.url}
                              controls
                              className="w-full h-full object-contain"
                            />
                            <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[9px] font-bold text-sand-200 border border-white/20 flex items-center gap-1 shadow-xs pointer-events-none">
                              <Film className="w-2.5 h-2.5 text-bronze" />
                              <span>VIDEO</span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative aspect-video bg-sand-100 overflow-hidden flex items-center justify-center">
                            <img
                              src={preview.url}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[9px] font-bold text-sand-200 border border-white/20 flex items-center gap-1 shadow-xs pointer-events-none">
                              <ImageIcon className="w-2.5 h-2.5 text-bronze" />
                              <span>IMAGE</span>
                            </div>
                          </div>
                        )}
                        <div className="p-2 bg-white flex items-center justify-between gap-1.5 text-[11px] text-charcoal border-t border-sand-200">
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-burgundy-950" title={preview.name}>
                              {preview.name}
                            </p>
                            <p className="text-[10px] text-charcoal/60">
                              {formatFileSize(preview.size)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSelectedFile(idx)}
                            className="p-1 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors shrink-0"
                            title="Remove file"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alternative Image URL (For images only) */}
              <div className="mt-3">
                <span className="text-[11px] text-charcoal/60">Or provide image URL (images only):</span>
                <input
                  type="url"
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
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
                {isUploading
                  ? uploadProgress || 'Uploading...'
                  : `Upload ${
                      uploadFiles.length > 1
                        ? `${uploadFiles.length} Media Files`
                        : uploadFiles.length === 1 && isVideoFile(uploadFiles[0])
                        ? 'Video'
                        : 'Media'
                    }`}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit Single Item Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Gallery Media"
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
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Media File (Image or Video)
                </label>
                <div className="flex gap-3 items-center">
                  <div className="w-20 h-16 rounded-lg overflow-hidden border border-sand-300 flex-shrink-0 bg-sand-100 flex items-center justify-center">
                    {editFile ? (
                      isVideoFile(editFile) ? (
                        <video src={editPreview} className="w-full h-full object-cover" controls />
                      ) : (
                        <img src={editPreview} alt="Preview" className="w-full h-full object-cover" />
                      )
                    ) : editingItem.mediaType === 'VIDEO' ||
                      editingItem.resourceType === 'video' ||
                      /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(editingItem.imageUrl || '') ? (
                      <video src={editingItem.imageUrl} className="w-full h-full object-cover" controls />
                    ) : (
                      <img src={editPreview} alt="Preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm,video/quicktime,video/x-m4v"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const isVideo = isVideoFile(file);
                          if (isVideo) {
                            if (file.size > 100 * 1024 * 1024) {
                              setEditError(`Video exceeds the 100 MB limit (${formatFileSize(file.size)}).`);
                              return;
                            }
                            setEditFile(file);
                            setEditPreview(URL.createObjectURL(file));
                          } else {
                            if (file.size > 15 * 1024 * 1024) {
                              setEditError(`Image exceeds the 15 MB limit (${formatFileSize(file.size)}).`);
                              return;
                            }
                            try {
                              const optimized = await compressImageFile(file);
                              setEditFile(optimized);
                              setEditPreview(URL.createObjectURL(optimized));
                            } catch {
                              setEditFile(file);
                              setEditPreview(URL.createObjectURL(file));
                            }
                          }
                        }
                      }}
                      className="text-xs text-charcoal"
                    />
                    <p className="text-[10px] text-charcoal/50 mt-1">
                      Choose an image (max 15MB) or video (max 100MB) to replace current media.
                    </p>
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
          title="Delete Gallery Media"
          message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
          confirmText={isDeleting ? 'Deleting...' : 'Delete Media'}
          confirmVariant="danger"
        />
      </div>
    </>
  );
};

export default GalleryManagement;

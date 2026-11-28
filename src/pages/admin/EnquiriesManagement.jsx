import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Briefcase,
  AlertCircle,
  FileText,
  RefreshCw,
  X,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';
import enquiryService from '../../services/enquiryService';
import serviceService from '../../services/serviceService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/common/Button';

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'];

const STATUS_BADGE_CLASSES = {
  NEW: 'bg-blue-100 text-blue-800 border-blue-200',
  CONTACTED: 'bg-purple-100 text-purple-800 border-purple-200',
  IN_PROGRESS: 'bg-amber-100 text-amber-800 border-amber-200',
  CONVERTED: 'bg-sand-200 text-burgundy-950 border-sand-300',
  CLOSED: 'bg-gray-100 text-gray-800 border-gray-200',

};

const EnquiriesManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [enquiries, setEnquiries] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState(null);

  // Filters from URL or local
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'All');
  const [serviceFilter, setServiceFilter] = useState(searchParams.get('service') || 'All');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');

  // Detail Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSuccess, setNotesSuccess] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Export State
  const [isExporting, setIsExporting] = useState(false);

  // Fetch Services for filter dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceService.getServices({ all: 'true', limit: 100 });
        setServicesList(res.data || []);
      } catch (err) {
        console.error('Failed to load services for filter', err);
      }
    };
    fetchServices();
  }, []);

  // Fetch Enquiries
  const fetchEnquiries = async (page = currentPage, limit = pageSize) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit,
      };

      if (search.trim()) params.search = search.trim();
      if (statusFilter !== 'All') params.status = statusFilter;
      if (serviceFilter !== 'All') params.serviceId = serviceFilter;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await enquiryService.getEnquiries(params);
      setEnquiries(res.data || []);
      setCurrentPage(res.page || 1);
      setTotalPages(res.pages || 1);
      setTotalCount(res.total || 0);

      // If an 'id' query param was passed, automatically open that enquiry modal
      const queryId = searchParams.get('id');
      if (queryId && res.data) {
        const found = res.data.find((e) => e._id === queryId);
        if (found) {
          openDetailModal(found);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch enquiries');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(1, pageSize);
  }, [statusFilter, serviceFilter, startDate, endDate]);

  const handleRefresh = async () => {
    if (refreshing) return;
    try {
      setRefreshing(true);
      await fetchEnquiries(currentPage, pageSize);
      setRefreshToast({ type: 'success', message: 'Enquiries refreshed successfully.' });
      setTimeout(() => setRefreshToast(null), 3000);
    } catch (err) {
      setRefreshToast({ type: 'error', message: 'Failed to refresh enquiries.' });
      setTimeout(() => setRefreshToast(null), 4000);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries(1);
  };

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setServiceFilter('All');
    setStartDate('');
    setEndDate('');
    setSearchParams({});
    fetchEnquiries(1);
  };

  const openDetailModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setAdminNotes(enquiry.adminNotes || '');
    setNotesSuccess(false);
    setDetailModalOpen(true);
  };

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      // Optimistic update
      setEnquiries((prev) =>
        prev.map((e) => (e._id === enquiryId ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
      await enquiryService.updateStatus(enquiryId, newStatus);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update enquiry status');
      fetchEnquiries(currentPage);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      setIsSavingNotes(true);
      setNotesSuccess(false);
      await enquiryService.updateNotes(selectedEnquiry._id, adminNotes);
      setSelectedEnquiry((prev) => ({ ...prev, adminNotes }));
      setEnquiries((prev) =>
        prev.map((e) =>
          e._id === selectedEnquiry._id ? { ...e, adminNotes } : e
        )
      );
      setNotesSuccess(true);
      setTimeout(() => setNotesSuccess(false), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save notes');
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await enquiryService.deleteEnquiry(deleteTarget._id);
      setDeleteTarget(null);
      if (selectedEnquiry?._id === deleteTarget._id) {
        setDetailModalOpen(false);
      }
      await fetchEnquiries(currentPage);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete enquiry');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter !== 'All') params.status = statusFilter;
      if (serviceFilter !== 'All') params.serviceId = serviceFilter;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const blobData = await enquiryService.exportCSV(params);
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `mp_landscape_enquiries_${new Date().toISOString().split('T')[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to export enquiries CSV');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Enquiries Management | MP Landscape Services Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header & Export */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-sand-300">
          <div>
            <h1 className="text-[23px] min-[360px]:text-[25px] min-[390px]:text-[27px] sm:text-3xl font-serif font-semibold sm:font-bold text-burgundy-900">
              Enquiries Management
            </h1>
            <p className="text-[13.5px] min-[360px]:text-[14px] text-charcoal/70 mt-0.5 sm:mt-1">
              Track customer prospect pipelines, change stages, record internal notes, and export reports.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="gap-1.5 sm:gap-2 shrink-0 text-xs font-medium sm:font-semibold py-1.5 sm:py-2 px-2.5 sm:px-3"
            >
              <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${refreshing ? 'animate-spin text-burgundy-900' : ''}`} />
              <span>Refresh</span>
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleExportCSV}
              disabled={isExporting}
              className="gap-1.5 sm:gap-2 shadow-xs shrink-0 text-xs font-medium sm:font-semibold py-1.5 sm:py-2 px-2.5 sm:px-3"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>{isExporting ? 'Exporting...' : 'Export to CSV'}</span>
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

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-sand-300 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, phone, email, location..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-sand-50/50 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:bg-white transition-colors"
              />
            </form>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-sand-50/50 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:bg-white"
              >
                <option value="All">All Statuses</option>
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Filter */}
            <div>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-sand-50/50 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:bg-white truncate"
              >
                <option value="All">All Services</option>
                {servicesList.map((srv) => (
                  <option key={srv._id} value={srv._id}>
                    {srv.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filter Button */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="w-full text-xs"
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Date range filters */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 border-t border-sand-200 text-xs">
            <span className="font-semibold text-charcoal/70 flex items-center gap-1.5 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-burgundy-800" />
              Date Range:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2.5 py-1 bg-sand-50 border border-sand-300 rounded-md text-xs focus:ring-1 focus:ring-burgundy-600 focus:outline-none"
              />
              <span className="text-charcoal/40">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2.5 py-1 bg-sand-50 border border-sand-300 rounded-md text-xs focus:ring-1 focus:ring-burgundy-600 focus:outline-none"
              />
            </div>
            <span className="text-charcoal/50 w-full sm:w-auto sm:ml-auto font-medium text-xs mt-1 sm:mt-0">
              Showing {enquiries.length} of {totalCount} total enquiries
            </span>
          </div>
        </div>

        {/* Data Presentation (Mobile Card List + Desktop Table) */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner text="Retrieving enquiry records..." size="lg" />
          </div>
        ) : error ? (
          <ErrorMessage
            title="Error loading enquiries"
            message={error}
            onRetry={() => fetchEnquiries(currentPage)}
          />
        ) : enquiries.length === 0 ? (
          <EmptyState
            title="No enquiries match your criteria"
            message="No records found with current search filters. Try clearing or expanding your filter parameters."
            actionText="Reset All Filters"
            onAction={resetFilters}
          />
        ) : (
          <div className="bg-white rounded-2xl border border-sand-300 shadow-xs overflow-hidden">
            <div className="overflow-x-auto w-full min-w-0">
              <table className="w-full min-w-[640px] text-left text-sm text-charcoal">
                <thead className="bg-sand-50/70 text-xs font-semibold text-charcoal/70 uppercase tracking-wider border-b border-sand-200">
                  <tr>
                    <th scope="col" className="px-3 sm:px-5 py-3.5">Customer</th>
                    <th scope="col" className="px-3 sm:px-5 py-3.5">Contact</th>
                    <th scope="col" className="px-3 sm:px-5 py-3.5">Service Requested</th>
                    <th scope="col" className="px-3 sm:px-5 py-3.5">Status</th>
                    <th scope="col" className="px-3 sm:px-5 py-3.5">Submitted</th>
                    <th scope="col" className="px-3 sm:px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {enquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="hover:bg-sand-50/60 transition-colors"
                    >
                      <td className="px-3 sm:px-5 py-4">
                        <div className="font-semibold text-burgundy-950 text-xs sm:text-sm">
                          {enquiry.customerName}
                        </div>
                        {enquiry.location && (
                          <div className="text-[11px] sm:text-xs text-charcoal/60 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-burgundy-700 flex-shrink-0" />
                            <span className="truncate max-w-[140px] sm:max-w-[180px]">{enquiry.location}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-3 sm:px-5 py-4 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-medium text-charcoal">
                          <Phone className="w-3.5 h-3.5 text-burgundy-700 shrink-0" />
                          <a href={`tel:${enquiry.phone}`} className="hover:underline">
                            {enquiry.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-charcoal/70">
                          <Mail className="w-3.5 h-3.5 text-sand-500 shrink-0" />
                          <a
                            href={`mailto:${enquiry.email}`}
                            className="hover:underline truncate max-w-[130px] sm:max-w-[160px]"
                          >
                            {enquiry.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-3 sm:px-5 py-4 text-xs font-medium text-charcoal max-w-[160px] sm:max-w-[200px]">
                        <span className="truncate block font-semibold text-burgundy-900">
                          {enquiry.serviceId?.title || 'General Consultation'}
                        </span>
                        <p className="text-[11px] text-charcoal/60 line-clamp-1 mt-0.5">
                          {enquiry.message}
                        </p>
                      </td>
                      <td className="px-3 sm:px-5 py-4 whitespace-nowrap">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                          className={`text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-burgundy-600 ${
                            STATUS_BADGE_CLASSES[enquiry.status] || STATUS_BADGE_CLASSES.NEW
                          }`}
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st} className="bg-white text-charcoal">
                              {st.replace('_', ' ')}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 sm:px-5 py-4 whitespace-nowrap text-xs text-charcoal/70">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-charcoal/40 shrink-0" />
                          {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </td>
                      <td className="px-3 sm:px-5 py-4 whitespace-nowrap text-right text-xs">
                        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                          <button
                            type="button"
                            onClick={() => openDetailModal(enquiry)}
                            className="p-1.5 rounded-lg text-burgundy-700 hover:text-burgundy-950 hover:bg-sand-100 transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(enquiry)}
                            className="p-1.5 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                            title="Delete Enquiry"
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

            {/* Pagination Controls */}
            <div className="p-4 border-t border-sand-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalRecords={totalCount}
                pageSize={pageSize}
                pageSizeOptions={[10, 15, 25, 50]}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  fetchEnquiries(1, newSize);
                }}
                onPageChange={(p) => fetchEnquiries(p, pageSize)}
              />
            </div>
          </div>
        )}

        {/* View / Detail Modal */}
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title="Enquiry Prospect Details"
          size="lg"
        >
          {selectedEnquiry && (
            <div className="space-y-6 text-sm text-charcoal">
              {/* Customer Profile Banner */}
              <div className="bg-sand-50 p-4 rounded-xl border border-sand-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-burgundy-950">
                    {selectedEnquiry.customerName}
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-0.5">
                    Submitted on{' '}
                    {new Date(selectedEnquiry.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-charcoal/70">Stage:</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) =>
                      handleStatusChange(selectedEnquiry._id, e.target.value)
                    }
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer ${
                      STATUS_BADGE_CLASSES[selectedEnquiry.status] || STATUS_BADGE_CLASSES.NEW
                    }`}
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st} className="bg-white text-charcoal">
                        {st.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-sand-200">
                  <span className="block text-[11px] font-semibold text-charcoal/50 uppercase">
                    Phone Number
                  </span>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="mt-1 font-semibold text-burgundy-900 hover:underline flex items-center gap-1.5 text-xs sm:text-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-burgundy-700" />
                    {selectedEnquiry.phone}
                  </a>
                </div>

                <div className="p-3 bg-white rounded-lg border border-sand-200">
                  <span className="block text-[11px] font-semibold text-charcoal/50 uppercase">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="mt-1 font-semibold text-burgundy-900 hover:underline flex items-center gap-1.5 text-xs sm:text-sm truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-sand-500" />
                    <span className="truncate">{selectedEnquiry.email}</span>
                  </a>
                </div>

                <div className="p-3 bg-white rounded-lg border border-sand-200">
                  <span className="block text-[11px] font-semibold text-charcoal/50 uppercase">
                    Project Location
                  </span>
                  <div className="mt-1 font-semibold text-charcoal flex items-center gap-1.5 text-xs sm:text-sm truncate">
                    <MapPin className="w-3.5 h-3.5 text-burgundy-700" />
                    <span className="truncate">
                      {selectedEnquiry.location || 'Not Specified'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Requested */}
              <div className="p-4 bg-white rounded-xl border border-sand-200 space-y-1">
                <span className="text-[11px] font-semibold text-charcoal/50 uppercase tracking-wider block">
                  Service Requested
                </span>
                <p className="font-semibold text-burgundy-950">
                  {selectedEnquiry.serviceId?.title || 'General Horticultural & Landscape Consultation'}
                </p>
              </div>

              {/* Customer Enquiry Message */}
              <div className="p-4 bg-white rounded-xl border border-sand-200 space-y-2">
                <span className="text-[11px] font-semibold text-charcoal/50 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-burgundy-700" />
                  Customer Message / Requirements
                </span>
                <p className="text-sm text-charcoal leading-relaxed whitespace-pre-wrap bg-sand-50/50 p-3 rounded-lg border border-sand-200">
                  {selectedEnquiry.message}
                </p>
              </div>

              {/* Internal Admin Notes */}
              <div className="p-4 bg-white rounded-xl border border-sand-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-charcoal/50 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-burgundy-700" />
                    Internal Admin Notes & Follow-up Log
                  </span>
                  {notesSuccess && (
                    <span className="text-xs text-bronze font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Notes saved successfully!
                    </span>
                  )}

                </div>

                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record customer discussion history, site inspection dates, quotation details, or project scope agreements..."
                  className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:ring-2 focus:ring-burgundy-600 focus:outline-none"
                />

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                  >
                    {isSavingNotes ? 'Saving Notes...' : 'Save Internal Notes'}
                  </Button>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-sand-200">
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => setDeleteTarget(selectedEnquiry)}
                >
                  Delete Enquiry
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDetailModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete Enquiry Record"
          message={`Are you sure you want to permanently delete the enquiry from "${deleteTarget?.customerName}"? This action cannot be reversed.`}
          confirmText={isDeleting ? 'Deleting...' : 'Delete Enquiry'}
          confirmVariant="danger"
        />
      </div>
    </>
  );
};

export default EnquiriesManagement;

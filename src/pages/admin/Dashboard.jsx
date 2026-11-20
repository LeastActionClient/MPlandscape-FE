import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Inbox,
  AlertCircle,
  Clock,
  CheckCircle2,
  Briefcase,
  Image,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import dashboardService from '../../services/dashboardService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';

const STATUS_BADGE_CLASSES = {
  NEW: 'bg-blue-100 text-blue-800 border-blue-200',
  CONTACTED: 'bg-purple-100 text-purple-800 border-purple-200',
  IN_PROGRESS: 'bg-amber-100 text-amber-800 border-amber-200',
  CONVERTED: 'bg-sand-200 text-burgundy-950 border-sand-300',
  CLOSED: 'bg-gray-100 text-gray-800 border-gray-200',

};

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [trends, setTrends] = useState({ monthlyTrends: [], serviceDistribution: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState(null);

  const fetchData = async () => {
    try {
      setError(null);
      const [statsRes, recentRes, trendsRes] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentEnquiries(6),
        dashboardService.getEnquiryTrends(),
      ]);

      setStats(statsRes.data);
      setRecentEnquiries(recentRes.data || []);
      setTrends(trendsRes.data || { monthlyTrends: [], serviceDistribution: [] });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    if (refreshing) return;
    try {
      setRefreshing(true);
      await fetchData();
      setRefreshToast({ type: 'success', message: 'Dashboard analytics refreshed successfully.' });
      setTimeout(() => setRefreshToast(null), 3000);
    } catch (err) {
      setRefreshToast({ type: 'error', message: 'Failed to refresh dashboard metrics.' });
      setTimeout(() => setRefreshToast(null), 4000);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <LoadingSpinner text="Compiling dashboard analytics..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <ErrorMessage
          title="Dashboard Error"
          message={error}
          onRetry={fetchData}
        />
      </div>
    );
  }

  const kpis = [
    {
      title: 'Total Enquiries',
      value: stats?.totalEnquiries ?? 0,
      icon: Inbox,
      bg: 'bg-burgundy-900',
      iconColor: 'text-sand-100',
      subtext: `${stats?.conversionRate ?? 0}% overall conversion`,
      path: '/admin/enquiries',
    },
    {
      title: 'New Enquiries',
      value: stats?.statusCounts?.NEW ?? 0,
      icon: AlertCircle,
      bg: 'bg-blue-600',
      iconColor: 'text-white',
      subtext: 'Requires immediate attention',
      path: '/admin/enquiries?status=NEW',
    },
    {
      title: 'In Progress',
      value: stats?.statusCounts?.IN_PROGRESS ?? 0,
      icon: Clock,
      bg: 'bg-amber-600',
      iconColor: 'text-white',
      subtext: 'Active client discussions',
      path: '/admin/enquiries?status=IN_PROGRESS',
    },
    {
      title: 'Converted',
      value: stats?.statusCounts?.CONVERTED ?? 0,
      icon: CheckCircle2,
      bg: 'bg-sand-700',
      iconColor: 'text-white',
      subtext: 'Won projects & contracts',

      path: '/admin/enquiries?status=CONVERTED',
    },
    {
      title: 'Total Services',
      value: stats?.activeServices ?? 0,
      icon: Briefcase,
      bg: 'bg-burgundy-800',
      iconColor: 'text-sand-200',
      subtext: 'Active service offerings',
      path: '/admin/services',
    },
    {
      title: 'Gallery Images',
      value: stats?.activeGallery ?? 0,
      icon: Image,
      bg: 'bg-sand-700',
      iconColor: 'text-white',
      subtext: 'Portfolio showcase items',
      path: '/admin/gallery',
    },
  ];

  // Calculate highest monthly count for SVG trend chart scaling
  const maxMonthlyCount = Math.max(
    ...(trends.monthlyTrends?.map((m) => m.count) || [1]),
    5
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | MP Landscape Services</title>
      </Helmet>

      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-sand-300">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-900">
              Operational Overview
            </h1>
            <p className="text-sm text-charcoal/70 mt-1">
              Live statistics, customer enquiry pipelines, and portfolio activities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex flex-row items-center justify-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-lg bg-white border border-sand-300 text-charcoal hover:bg-sand-100 transition-colors shadow-xs whitespace-nowrap shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${refreshing ? 'animate-spin text-burgundy-900' : ''}`} />
              <span>Refresh</span>
            </button>
            <Link
              to="/admin/enquiries"
              className="inline-flex flex-row items-center justify-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-lg bg-burgundy-900 text-white hover:bg-burgundy-800 transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              <span>Manage Enquiries</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </div>

        {/* Toast Alert Banner */}
        {refreshToast && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in shadow-xs ${
              refreshToast.type === 'success'
                ? 'bg-sand-100 border-sand-300 text-burgundy-950'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-bronze shrink-0" />
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

        {/* Dynamic KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.title}
                onClick={() => navigate(kpi.path)}
                className="bg-white rounded-2xl border border-sand-300 p-5 shadow-xs hover:shadow-md hover:border-sand-400 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">
                      {kpi.title}
                    </p>
                    <p className="text-3xl font-bold font-serif text-burgundy-950 mt-2">
                      {kpi.value}
                    </p>
                  </div>
                  <div className={`w-11 h-11 rounded-xl ${kpi.bg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-sand-100 flex items-center justify-between text-xs">
                  <span className="text-charcoal/70">{kpi.subtext}</span>
                  <span className="text-burgundy-800 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    View
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts & Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Enquiry Trends (SVG Bar Chart) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-sand-300 p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-serif font-bold text-burgundy-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-burgundy-700" />
                  Monthly Enquiry Volume
                </h2>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Submission trend and confirmed conversions over recent months
                </p>
              </div>
            </div>

            {trends.monthlyTrends && trends.monthlyTrends.length > 0 ? (
              <div className="space-y-4">
                <div className="h-56 flex items-end gap-3 sm:gap-6 pt-6 px-2 border-b border-sand-200">
                  {trends.monthlyTrends.map((item, idx) => {
                    const heightPercent = Math.max(8, Math.round((item.count / maxMonthlyCount) * 100));
                    const convertedPercent = item.count > 0
                      ? Math.round((item.converted / item.count) * 100)
                      : 0;

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                        <div className="text-[11px] font-bold text-burgundy-900 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                          {item.count}
                        </div>
                        <div className="w-full max-w-[42px] bg-sand-200 rounded-t-lg overflow-hidden flex flex-col justify-end transition-all duration-300" style={{ height: `${heightPercent}%` }}>
                          <div
                            className="w-full bg-sand-600 transition-all"
                            style={{ height: `${convertedPercent}%` }}
                            title={`${item.converted} Converted`}
                          />
                          <div
                            className="w-full bg-burgundy-800"
                            style={{ height: `${100 - convertedPercent}%` }}
                            title={`${item.count - item.converted} Other`}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-charcoal/70 mt-2">
                          {MONTH_NAMES[item.month - 1] || `M${item.month}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end gap-5 text-xs text-charcoal/70 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-burgundy-800" />
                    <span>Total Enquiries</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-sand-600" />
                    <span>Converted</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-12 text-center text-charcoal/50 text-xs">
                No historical monthly data recorded yet.
              </div>
            )}
          </div>

          {/* Service-wise Breakdown */}
          <div className="bg-white rounded-2xl border border-sand-300 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-burgundy-900 flex items-center gap-2 mb-1">
                <Briefcase className="w-5 h-5 text-burgundy-700" />
                Service Interest
              </h2>
              <p className="text-xs text-charcoal/60 mb-5">
                Distribution of client inquiries by service category
              </p>

              {trends.serviceDistribution && trends.serviceDistribution.length > 0 ? (
                <div className="space-y-3.5">
                  {trends.serviceDistribution.slice(0, 5).map((srv, idx) => {
                    const totalSrv = stats?.totalEnquiries || 1;
                    const pct = Math.round((srv.count / totalSrv) * 100);

                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-charcoal truncate pr-2 max-w-[180px]">
                            {srv.serviceTitle}
                          </span>
                          <span className="text-burgundy-900 font-bold">{srv.count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-burgundy-800 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-10 text-center text-charcoal/50 text-xs">
                  No service inquiries categorized yet.
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-sand-200">
              <Link
                to="/admin/services"
                className="text-xs font-semibold text-burgundy-800 hover:text-burgundy-950 flex items-center justify-between"
              >
                <span>Manage all {stats?.activeServices || 0} active services</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Enquiries Table */}
        <div className="bg-white rounded-2xl border border-sand-300 shadow-xs overflow-hidden">
          <div className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-sand-200">
            <div>
              <h2 className="text-lg font-serif font-bold text-burgundy-900">
                Recent Customer Enquiries
              </h2>
              <p className="text-xs text-charcoal/60 mt-0.5">
                The latest prospects submitted through the website
              </p>
            </div>
            <Link
              to="/admin/enquiries"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy-800 hover:text-burgundy-950"
            >
              <span>View all enquiries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="No enquiries received yet"
                message="Incoming customer inquiries submitted through contact forms will appear here."
              />
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="min-w-full text-left text-sm text-charcoal">
                <thead className="bg-sand-50/70 text-xs font-semibold text-charcoal/70 uppercase tracking-wider border-b border-sand-200">
                  <tr>
                    <th scope="col" className="px-6 py-3.5">Customer</th>
                    <th scope="col" className="px-6 py-3.5">Contact</th>
                    <th scope="col" className="px-6 py-3.5">Service Requested</th>
                    <th scope="col" className="px-6 py-3.5">Date</th>
                    <th scope="col" className="px-6 py-3.5">Status</th>
                    <th scope="col" className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {recentEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="hover:bg-sand-50/60 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-charcoal">
                          {enquiry.customerName}
                        </div>
                        {enquiry.location && (
                          <div className="text-xs text-charcoal/60">
                            {enquiry.location}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-charcoal">
                          <Phone className="w-3.5 h-3.5 text-burgundy-700" />
                          <a href={`tel:${enquiry.phone}`} className="hover:underline">
                            {enquiry.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-charcoal/70">
                          <Mail className="w-3.5 h-3.5 text-sand-500" />
                          <a href={`mailto:${enquiry.email}`} className="hover:underline truncate max-w-[150px]">
                            {enquiry.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-burgundy-900">
                        {enquiry.serviceId?.title || 'General Enquiry'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-charcoal/70">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-charcoal/40" />
                          {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                            STATUS_BADGE_CLASSES[enquiry.status] || STATUS_BADGE_CLASSES.NEW
                          }`}
                        >
                          {enquiry.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/enquiries?id=${enquiry._id}`)}
                          className="font-semibold text-burgundy-800 hover:text-burgundy-950 underline"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  </>
);
};

export default Dashboard;

import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Image,
  Inbox,
  Phone,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MPLogo from '../assets/logo/MPLogo';
import ConfirmationDialog from '../components/common/ConfirmationDialog';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Contact Info', path: '/admin/contact', icon: Phone },
    { name: 'Profile', path: '/admin/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col md:flex-row">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop fixed + Mobile slide-over) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-burgundy-900 text-white flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-burgundy-800 bg-burgundy-950/40 shrink-0">
          <Link
            to="/admin/dashboard"
            onClick={() => setMobileSidebarOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 bg-white rounded-xl shadow-xs p-1.5 flex items-center justify-center shrink-0">
              <MPLogo imgClassName="h-9 w-9 object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="block font-serif text-sm font-bold text-sand-100 tracking-wide leading-tight">
                MP LANDSCAPE
              </span>
              <span className="block text-[10px] uppercase font-semibold text-sand-300 tracking-wider leading-tight mt-0.5">
                Admin Console
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden text-sand-300 hover:text-white p-1 rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-burgundy-700 text-white shadow-sm shadow-burgundy-950/20'
                      : 'text-sand-200 hover:bg-burgundy-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{item.name}</span>
                <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100" />
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout in Sidebar Footer */}
        <div className="p-4 border-t border-burgundy-800 bg-burgundy-950/50 shrink-0">
          <div className="flex items-center gap-3 mb-3 px-2 py-1.5">
            <div className="w-9 h-9 rounded-full bg-sand-300 text-burgundy-950 font-bold flex items-center justify-center flex-shrink-0 text-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sand-100 truncate">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-xs text-sand-300 truncate">
                {user?.email || 'admin@mplandscape.com'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-sand-200 hover:text-white bg-burgundy-800/80 hover:bg-burgundy-700 rounded-lg transition-colors border border-burgundy-700/60"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-sand-300 px-3 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-charcoal hover:bg-sand-100 transition-colors shrink-0"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-charcoal/70 min-w-0">
              <Shield className="w-4 h-4 text-burgundy-800 hidden sm:inline shrink-0" />
              <span className="font-semibold text-charcoal truncate">
                <span className="hidden xs:inline">MP Landscape </span>Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-burgundy-900 bg-sand-100 hover:bg-sand-200 rounded-lg transition-colors border border-sand-300"
              title="Open public website in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Website</span>
            </a>

            <div className="h-5 sm:h-6 w-px bg-sand-300" />

            <Link
              to="/admin/profile"
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-sand-100 transition-colors group"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-burgundy-900 text-sand-100 flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-charcoal group-hover:text-burgundy-900 truncate max-w-[120px]">
                {user?.name || 'Admin'}
              </span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out of the administrator console? You will need to re-enter your credentials to access admin functions."
        confirmText="Sign Out"
        confirmVariant="danger"
      />
    </div>
  );
};

export default AdminLayout;

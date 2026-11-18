import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  User,
  Mail,
  Shield,
  Clock,
  KeyRound,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <>
      <Helmet>
        <title>Admin Profile | MP Landscape Services</title>
      </Helmet>

      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="pb-4 border-b border-sand-300">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-900">
            Administrator Profile
          </h1>
          <p className="text-sm text-charcoal/70 mt-1">
            Account identity, authentication role, and security credentials.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-sand-300 shadow-xs overflow-hidden">
          {/* Header Banner */}
          <div className="h-28 bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-burgundy-950 p-6 flex items-end relative">
            <div className="absolute -bottom-10 left-6">
              <div className="w-20 h-20 rounded-2xl bg-sand-300 border-4 border-white shadow-md flex items-center justify-center text-burgundy-950 font-bold text-3xl font-serif">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="pt-14 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-serif font-bold text-burgundy-950">
                    {user?.name || 'Administrator'}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sand-200 text-burgundy-950 border border-sand-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-bronze" />
                    Active Account
                  </span>

                </div>
                <p className="text-sm text-charcoal/60 mt-0.5">{user?.email}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="gap-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Account Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-sand-200">
              <div className="p-4 rounded-xl bg-sand-50/70 border border-sand-200 space-y-1">
                <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-burgundy-700" />
                  Assigned Role
                </span>
                <p className="font-semibold text-burgundy-950 text-sm capitalize">
                  {user?.role || 'Super Administrator'}
                </p>
                <p className="text-[11px] text-charcoal/60">
                  Full administrative permissions over website services, gallery, and enquiries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sand-50/70 border border-sand-200 space-y-1">
                <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-burgundy-700" />
                  Last Login Session
                </span>
                <p className="font-semibold text-burgundy-950 text-sm">
                  {user?.lastLogin
                    ? new Date(user.lastLogin).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Current Active Session'}
                </p>
                <p className="text-[11px] text-charcoal/60">
                  Secured with JWT HTTP-only cookie and bearer token authorization.
                </p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-4 rounded-xl bg-burgundy-900/5 border border-burgundy-900/15 flex items-start gap-3">
              <KeyRound className="w-5 h-5 text-burgundy-800 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-burgundy-950">Security & Access Control</p>
                <p className="text-charcoal/70 leading-relaxed">
                  Administrator credentials are encrypted with salted bcrypt hashing and verified against strict rate limiting. For account updates or password resets, contact system engineering.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Confirmation */}
        <ConfirmationDialog
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
          title="Sign Out of Admin Console"
          message="Are you sure you want to end your current administrative session?"
          confirmText="Sign Out"
          confirmVariant="danger"
        />
      </div>
    </>
  );
};

export default Profile;

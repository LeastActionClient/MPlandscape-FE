import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MPLogo from '../../assets/logo/MPLogo';
import Button from '../../components/common/Button';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath = location.state?.from?.pathname || '/admin/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('expired') === 'true') {
      setAuthError('Your administrative session has expired. Please sign in again.');
    }
  }, [location.search]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setAuthError('');
      setIsSubmitting(true);
      await login(data.email, data.password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Invalid credentials. Please verify your email and password.';
      setAuthError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | MP Landscape Services</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-sand-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-burgundy-900/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sand-400/20 blur-3xl pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
          <div className="flex justify-center mb-6">
            <Link to="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-burgundy-600 rounded-lg p-1">
              <MPLogo imgClassName="h-16 w-auto object-contain" showText={true} />
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-900">
              Admin Portal
            </h1>
            <p className="mt-2 text-sm text-charcoal/70">
              Secure authentication for MP Landscape Services administrators
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-sand-300">
            {authError && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm animate-fade-in"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                <span className="font-medium">{authError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-charcoal mb-1"
                >
                  Admin Email
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/40">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                    className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm rounded-lg border transition-colors bg-sand-50/40 text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:bg-white ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-sand-300 focus:border-burgundy-600'
                    }`}
                    placeholder="admin@mplandscape.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-charcoal mb-1"
                >
                  Password
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/40">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...register('password')}
                    className={`block w-full pl-10 pr-10 py-2.5 sm:text-sm rounded-lg border transition-colors bg-sand-50/40 text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:bg-white ${
                      errors.password
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-sand-300 focus:border-burgundy-600'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal/40 hover:text-burgundy-700 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full flex justify-center shadow-md shadow-burgundy-900/10"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    'Sign In to Dashboard'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-sand-200 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-burgundy-800 hover:text-burgundy-950 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to public website
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-charcoal/50">
            &copy; {new Date().getFullYear()} MP Landscape Services. Unauthorized access is strictly prohibited.
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

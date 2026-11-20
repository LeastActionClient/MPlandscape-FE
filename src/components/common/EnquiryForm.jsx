import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Send, CheckCircle2 } from 'lucide-react';
import enquiryService from '../../services/enquiryService';
import serviceService from '../../services/serviceService';
import Button from './Button';
import { enquiryValidationSchema } from '../../validators/enquirySchema';

export const EnquiryForm = ({
  preselectedServiceId = '',
  onSuccess,
  className = '',
  title = 'Send Us an Enquiry',
  subtitle = 'Get a professional consultation and custom quotation for your landscape or agricultural project.',
}) => {
  const [services, setServices] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquiryValidationSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      customerName: '',
      phone: '',
      email: '',
      serviceId: preselectedServiceId || '',
      location: '',
      message: '',
      website_hp: '',
    },
  });

  const messageValue = watch('message') || '';

  // Input-level restrictions for Full Name
  const handleNameKeyDown = (e) => {
    // Allow keyboard navigation & editing shortcuts (Ctrl+A, Ctrl+C, Ctrl+V, Backspace, Delete, Arrows, etc.)
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key)) return;
    // Explicitly prevent numeric characters, symbols, or special characters
    if (!/^[a-zA-Z\s]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleNameChange = (e) => {
    // Sanitize on paste / autofill to strictly alphabetic letters and spaces
    const sanitized = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    e.target.value = sanitized;
  };

  // Input-level restrictions for Phone Number (strictly 10 digits for Indian mobile)
  const handlePhoneKeyDown = (e) => {
    // Allow keyboard navigation & editing shortcuts
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key)) return;
    // Disallow alphabets, spaces, and special characters
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      return;
    }
    // Restrict input to a maximum of 10 digits
    const target = e.target;
    const selectedLength = (target.selectionEnd || 0) - (target.selectionStart || 0);
    if (target.value.length >= 10 && selectedLength === 0) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e) => {
    // Strip non-digits and cap strictly at 10 digits
    const sanitized = e.target.value.replace(/\D/g, '').slice(0, 10);
    e.target.value = sanitized;
  };

  // Load available active services dynamically from the API for dropdown
  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const res = await serviceService.getServices({ limit: 50 });
        if (isMounted && res.data) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Failed to load services for enquiry dropdown:', err);
      }
    };
    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  // Update default value if preselectedServiceId changes
  useEffect(() => {
    if (preselectedServiceId) {
      const match = services.find(
        (s) => s._id === preselectedServiceId || s.slug === preselectedServiceId
      );
      if (match) {
        setValue('serviceId', match._id, { shouldValidate: true });
      } else {
        setValue('serviceId', preselectedServiceId, { shouldValidate: true });
      }
    }
  }, [preselectedServiceId, services, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        serviceId: data.serviceId || null,
        location: data.location || '',
        message: data.message,
        website_hp: data.website_hp || '',
      };

      await enquiryService.createEnquiry(payload);
      toast.success('Your enquiry has been submitted successfully! Our specialists will reach out shortly.');
      setSubmitted(true);
      reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.message || 'Failed to submit enquiry. Please check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`card-luxury p-8 text-center bg-cream-light border border-sand ${className}`}>
        <div className="w-16 h-16 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9 text-bronze" />
        </div>
        <h3 className="text-2xl font-bold text-burgundy mb-2">Thank You!</h3>
        <p className="text-sm text-brand-muted max-w-md mx-auto mb-6 leading-relaxed">
          Your enquiry has been received. Our horticultural and landscape specialists will review your requirements and get in touch within 24 hours.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSubmitted(false)}
        >
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <div className={`card-luxury p-6 sm:p-8 border border-sand bg-cream-light ${className}`}>
      {title && (
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-burgundy">{title}</h3>
          {subtitle && <p className="text-xs sm:text-sm text-brand-muted mt-1">{subtitle}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Hidden Honeypot Field */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('website_hp')}
          />
        </div>

        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm sm:text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
              Full Name <span className="text-burgundy">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh Kumar"
              disabled={submitting}
              maxLength={60}
              autoComplete="name"
              {...register('customerName', {
                onChange: handleNameChange,
              })}
              onKeyDown={handleNameKeyDown}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-base sm:text-sm text-brand-dark bg-white focus:outline-hidden transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                errors.customerName
                  ? 'border-burgundy focus:ring-1 focus:ring-burgundy'
                  : 'border-sand focus:border-bronze focus:ring-1 focus:ring-bronze'
              }`}
            />
            {errors.customerName && (
              <p className="text-sm sm:text-xs text-burgundy mt-1 font-medium">{errors.customerName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-burgundy">*</span>
            </label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              pattern="[0-9]{10}"
              placeholder="e.g. 9876543210"
              disabled={submitting}
              autoComplete="tel-national"
              {...register('phone', {
                onChange: handlePhoneChange,
              })}
              onKeyDown={handlePhoneKeyDown}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-base sm:text-sm text-brand-dark bg-white focus:outline-hidden transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                errors.phone
                  ? 'border-burgundy focus:ring-1 focus:ring-burgundy'
                  : 'border-sand focus:border-bronze focus:ring-1 focus:ring-bronze'
              }`}
            />
            {errors.phone && (
              <p className="text-sm sm:text-xs text-burgundy mt-1 font-medium">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Email & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm sm:text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
              Email Address <span className="text-burgundy">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. ramesh@example.com"
              disabled={submitting}
              {...register('email')}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-base sm:text-sm text-brand-dark bg-white focus:outline-hidden transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                errors.email
                  ? 'border-burgundy focus:ring-1 focus:ring-burgundy'
                  : 'border-sand focus:border-bronze focus:ring-1 focus:ring-bronze'
              }`}
            />
            {errors.email && (
              <p className="text-sm sm:text-xs text-burgundy mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
              Project Location
            </label>
            <input
              type="text"
              placeholder="e.g. Coimbatore, Tamil Nadu"
              disabled={submitting}
              {...register('location')}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-base sm:text-sm text-brand-dark bg-white focus:outline-hidden transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                errors.location
                  ? 'border-burgundy focus:ring-1 focus:ring-burgundy'
                  : 'border-sand focus:border-bronze focus:ring-1 focus:ring-bronze'
              }`}
            />
            {errors.location && (
              <p className="text-sm sm:text-xs text-burgundy mt-1 font-medium">{errors.location.message}</p>
            )}
          </div>
        </div>

        {/* Service Selector Dropdown */}
        <div>
          <label className="block text-sm sm:text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
            Interested Service <span className="text-burgundy">*</span>
          </label>
          <select
            disabled={submitting}
            {...register('serviceId')}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-base sm:text-sm text-brand-dark bg-white focus:outline-hidden transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.serviceId
                ? 'border-burgundy focus:ring-1 focus:ring-burgundy'
                : 'border-sand focus:border-bronze focus:ring-1 focus:ring-bronze'
            }`}
          >
            <option value="">-- Select an Interested Service --</option>
            {services.map((svc) => (
              <option key={svc._id} value={svc._id}>
                {svc.title}
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <p className="text-sm sm:text-xs text-burgundy mt-1 font-medium">{errors.serviceId.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm sm:text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
            Project Details & Requirements <span className="text-burgundy">*</span>
          </label>
          <textarea
            rows="4"
            placeholder="Describe your site dimensions, property type, intended landscape features, or farming goals (min 10 characters)..."
            disabled={submitting}
            {...register('message')}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-base sm:text-sm text-brand-dark bg-white focus:outline-hidden transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.message
                ? 'border-burgundy focus:ring-1 focus:ring-burgundy'
                : 'border-sand focus:border-bronze focus:ring-1 focus:ring-bronze'
            }`}
          />
          <div className="flex items-center justify-between mt-1">
            {errors.message ? (
              <p className="text-sm sm:text-xs text-burgundy font-medium">{errors.message.message}</p>
            ) : (
              <span className="text-xs sm:text-[11px] text-brand-muted font-medium">Min 10 meaningful characters</span>
            )}
            <span
              className={`text-xs sm:text-[11px] tabular-nums font-medium ${
                messageValue.length > 1000 ? 'text-burgundy font-semibold' : 'text-brand-muted'
              }`}
            >
              {messageValue.length} / 1,000 characters
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={submitting}
            icon={Send}
            iconPosition="right"
            className="w-full"
          >
            {submitting ? 'Submitting Enquiry...' : 'Submit Service Enquiry'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Send, CheckCircle2 } from 'lucide-react';
import enquiryService from '../../services/enquiryService';
import serviceService from '../../services/serviceService';
import Button from './Button';

const enquirySchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().min(7, 'Please enter a valid phone number').max(20),
  email: z.string().email('Please enter a valid email address'),
  serviceId: z.string().optional(),
  location: z.string().max(200).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      customerName: '',
      phone: '',
      email: '',
      serviceId: preselectedServiceId || '',
      location: '',
      message: '',
    },
  });

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
        setValue('serviceId', match._id);
      } else {
        setValue('serviceId', preselectedServiceId);
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
        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
              Full Name <span className="text-burgundy">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh Kumar"
              {...register('customerName')}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-brand-dark bg-white focus:outline-hidden transition-all ${
                errors.customerName
                  ? 'border-burgundy focus:ring-1 focus:ring-burgundy'
                  : 'border-sand focus:border-bronze focus:ring-1 focus:ring-bronze'
              }`}
            />
            {errors.customerName && (
              <p className="text-xs text-burgundy mt-1">{errors.customerName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-burgundy">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. +91 98765 43210"
              {...register('phone')}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-brand-dark bg-white focus:outline-hidden transition-all ${
                errors.phone
                  ? 'border-burgundy focus:ring-1 focus:ring-burgundy'
                  : 'border-sand focus:border-bronze focus:ring-1 focus:ring-bronze'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-burgundy mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Email & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
              Email Address <span className="text-burgundy">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. ramesh@example.com"
              {...register('email')}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-brand-dark bg-white focus:outline-hidden transition-all ${
                errors.email
                  ? 'border-burgundy focus:ring-1 focus:ring-burgundy'
                  : 'border-sand focus:border-bronze focus:ring-1 focus:ring-bronze'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-burgundy mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
              Project Location
            </label>
            <input
              type="text"
              placeholder="e.g. Coimbatore, Tamil Nadu"
              {...register('location')}
              className="w-full px-3.5 py-2.5 rounded-lg border border-sand text-sm text-brand-dark bg-white focus:outline-hidden focus:border-bronze focus:ring-1 focus:ring-bronze transition-all"
            />
          </div>
        </div>

        {/* Service Selector Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
            Interested Service
          </label>
          <select
            {...register('serviceId')}
            className="w-full px-3.5 py-2.5 rounded-lg border border-sand text-sm text-brand-dark bg-white focus:outline-hidden focus:border-bronze focus:ring-1 focus:ring-bronze transition-all cursor-pointer"
          >
            <option value="">General Landscaping & Consultation</option>
            {services.map((svc) => (
              <option key={svc._id} value={svc._id}>
                {svc.title}
              </option>
            ))}
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
            Project Details & Requirements <span className="text-burgundy">*</span>
          </label>
          <textarea
            rows="4"
            placeholder="Describe your site dimensions, property type, intended landscape features, or farming goals..."
            {...register('message')}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-brand-dark bg-white focus:outline-hidden transition-all ${
              errors.message
                ? 'border-burgundy focus:ring-1 focus:ring-burgundy'
                : 'border-sand focus:border-bronze focus:ring-1 focus:ring-bronze'
            }`}
          />
          {errors.message && (
            <p className="text-xs text-burgundy mt-1">{errors.message.message}</p>
          )}
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

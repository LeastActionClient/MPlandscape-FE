import { z } from 'zod';

export const enquiryValidationSchema = z
  .object({
    customerName: z
      .string({ required_error: 'Please enter a valid name using letters only.' })
      .trim()
      .refine((val) => val.length > 0, {
        message: 'Please enter a valid name using letters only.',
      })
      .refine((val) => /^[a-zA-Z\s]+$/.test(val), {
        message: 'Please enter a valid name using letters only.',
      })
      .refine((val) => val.trim().length >= 2, {
        message: 'Please enter a valid name using letters only.',
      })
      .refine((val) => val.trim().length <= 60, {
        message: 'Name cannot exceed 60 characters',
      })
      .transform((val) => val.trim().replace(/\s+/g, ' ')),

    phone: z
      .string({ required_error: 'Please enter a valid 10-digit mobile number.' })
      .trim()
      .refine((val) => /^[0-9]{10}$/.test(val), {
        message: 'Please enter a valid 10-digit mobile number.',
      })
      .refine((val) => !/^(\d)\1{9}$/.test(val), {
        message: 'Please enter a valid 10-digit mobile number.',
      }),

    email: z
      .string({ required_error: 'Email address is required' })
      .trim()
      .toLowerCase()
      .min(1, 'Email address is required')
      .refine((val) => !/\s/.test(val), {
        message: 'Email address cannot contain spaces',
      })
      .refine((val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val), {
        message: 'Please enter a valid email address (e.g. customer@example.com)',
      }),

    serviceId: z
      .string({ required_error: 'Please select an interested service' })
      .trim()
      .min(1, 'Please select an interested service'),

    location: z
      .string()
      .trim()
      .max(150, 'Project location cannot exceed 150 characters')
      .optional()
      .default('')
      .refine((val) => !val || /^[\p{L}\p{M}\p{N}\s,.\-\/#&'()]+$/u.test(val), {
        message: 'Location contains invalid characters',
      })
      .refine((val) => !val || /[\p{L}\p{M}\p{N}]/u.test(val), {
        message: 'Please enter a valid location or address',
      })
      .refine((val) => !val || !/(.)\1{4,}/i.test(val), {
        message: 'Please enter a valid location without repeated characters',
      }),

    message: z
      .string({ required_error: 'Project details are required' })
      .trim()
      .min(10, 'Project details must be at least 10 characters')
      .max(1000, 'Project details cannot exceed 1,000 characters')
      .refine((val) => !/(.)\1{4,}/i.test(val), {
        message: 'Please provide a meaningful description without repeated characters',
      })
      .refine(
        (val) => {
          const unique = new Set(val.replace(/\s/g, '').split('')).size;
          return unique >= 3;
        },
        {
          message: 'Please provide meaningful project requirements',
        }
      ),

    website_hp: z.string().optional().default(''),
  });

export default enquiryValidationSchema;

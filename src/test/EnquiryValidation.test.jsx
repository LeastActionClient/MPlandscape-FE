import { describe, it, expect } from 'vitest';
import { enquiryValidationSchema } from '../validators/enquirySchema';

describe('Enquiry Form Validation Schema', () => {
  const validData = {
    customerName: 'Aarav Patel',
    phone: '9876543210',
    email: 'aarav@example.com',
    serviceId: '65f1a2b3c4d5e6f7a8b9c0d1',
    location: 'Coimbatore, Tamil Nadu',
    message: 'We require a residential landscape consultation for our 2,400 sq ft property.',
  };

  it('validates correct and complete enquiry data successfully', () => {
    const result = enquiryValidationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('Full Name Validation', () => {
    it('accepts valid names containing multiple words (e.g. Sneha Balaji, Ramesh Kumar)', () => {
      const snehaResult = enquiryValidationSchema.safeParse({
        ...validData,
        customerName: 'Sneha Balaji',
      });
      expect(snehaResult.success).toBe(true);

      const rameshResult = enquiryValidationSchema.safeParse({
        ...validData,
        customerName: 'Ramesh Kumar',
      });
      expect(rameshResult.success).toBe(true);
    });

    it('rejects numbers and special characters with clear validation message', () => {
      // Sneha123 – Reject
      const snehaNumbers = enquiryValidationSchema.safeParse({
        ...validData,
        customerName: 'Sneha123',
      });
      expect(snehaNumbers.success).toBe(false);
      expect(snehaNumbers.error.issues[0].message).toBe('Please enter a valid name using letters only.');

      // 12345 – Reject
      const allNumbers = enquiryValidationSchema.safeParse({
        ...validData,
        customerName: '12345',
      });
      expect(allNumbers.success).toBe(false);
      expect(allNumbers.error.issues[0].message).toBe('Please enter a valid name using letters only.');

      // Sneha@ – Reject
      const snehaSymbol = enquiryValidationSchema.safeParse({
        ...validData,
        customerName: 'Sneha@',
      });
      expect(snehaSymbol.success).toBe(false);
      expect(snehaSymbol.error.issues[0].message).toBe('Please enter a valid name using letters only.');
    });

    it('trims leading and trailing spaces', () => {
      const result = enquiryValidationSchema.safeParse({
        ...validData,
        customerName: '   Sneha Balaji   ',
      });
      expect(result.success).toBe(true);
      expect(result.data.customerName).toBe('Sneha Balaji');
    });

    it('rejects empty or single character names', () => {
      const empty = enquiryValidationSchema.safeParse({
        ...validData,
        customerName: '',
      });
      expect(empty.success).toBe(false);
      expect(empty.error.issues[0].message).toBe('Please enter a valid name using letters only.');

      const singleChar = enquiryValidationSchema.safeParse({
        ...validData,
        customerName: 'A',
      });
      expect(singleChar.success).toBe(false);
      expect(singleChar.error.issues[0].message).toBe('Please enter a valid name using letters only.');
    });
  });

  describe('Phone Number Validation', () => {
    it('accepts exactly 10 digits for mobile number (e.g. 9876543210)', () => {
      const valid = enquiryValidationSchema.safeParse({
        ...validData,
        phone: '9876543210',
      });
      expect(valid.success).toBe(true);
    });

    it('rejects numbers containing fewer than 10 digits (e.g. 987654321)', () => {
      const nineDigits = enquiryValidationSchema.safeParse({
        ...validData,
        phone: '987654321',
      });
      expect(nineDigits.success).toBe(false);
      expect(nineDigits.error.issues[0].message).toBe('Please enter a valid 10-digit mobile number.');
    });

    it('rejects numbers containing more than 10 digits (e.g. 98765432100)', () => {
      const elevenDigits = enquiryValidationSchema.safeParse({
        ...validData,
        phone: '98765432100',
      });
      expect(elevenDigits.success).toBe(false);
      expect(elevenDigits.error.issues[0].message).toBe('Please enter a valid 10-digit mobile number.');
    });

    it('rejects non-numeric characters and alphabets (e.g. abcdefghij, 98765abc10)', () => {
      const letters = enquiryValidationSchema.safeParse({
        ...validData,
        phone: 'abcdefghij',
      });
      expect(letters.success).toBe(false);
      expect(letters.error.issues[0].message).toBe('Please enter a valid 10-digit mobile number.');

      const alphaNumeric = enquiryValidationSchema.safeParse({
        ...validData,
        phone: '98765abc10',
      });
      expect(alphaNumeric.success).toBe(false);
      expect(alphaNumeric.error.issues[0].message).toBe('Please enter a valid 10-digit mobile number.');
    });

    it('rejects dummy repeated numbers (e.g. 0000000000, 1111111111)', () => {
      const zeroes = enquiryValidationSchema.safeParse({
        ...validData,
        phone: '0000000000',
      });
      expect(zeroes.success).toBe(false);
      expect(zeroes.error.issues[0].message).toBe('Please enter a valid 10-digit mobile number.');

      const ones = enquiryValidationSchema.safeParse({
        ...validData,
        phone: '1111111111',
      });
      expect(ones.success).toBe(false);
      expect(ones.error.issues[0].message).toBe('Please enter a valid 10-digit mobile number.');
    });
  });

  describe('Email Validation', () => {
    it('accepts valid email format', () => {
      const res = enquiryValidationSchema.safeParse({
        ...validData,
        email: 'customer.test@mplandscape.com',
      });
      expect(res.success).toBe(true);
    });

    it('rejects spaces, missing TLD, or malformed email', () => {
      const spaces = enquiryValidationSchema.safeParse({
        ...validData,
        email: 'user @example.com',
      });
      expect(spaces.success).toBe(false);

      const missingTld = enquiryValidationSchema.safeParse({
        ...validData,
        email: 'user@domain',
      });
      expect(missingTld.success).toBe(false);
    });
  });

  describe('Service Selection Validation', () => {
    it('requires an interested service', () => {
      const emptyService = enquiryValidationSchema.safeParse({
        ...validData,
        serviceId: '',
      });
      expect(emptyService.success).toBe(false);
    });
  });

  describe('Project Details Validation', () => {
    it('rejects very short descriptions (<10 chars)', () => {
      const shortDesc = enquiryValidationSchema.safeParse({
        ...validData,
        message: 'Hello',
      });
      expect(shortDesc.success).toBe(false);
    });

    it('rejects repeated character spam (e.g. mmmmmmmmmm)', () => {
      const spam = enquiryValidationSchema.safeParse({
        ...validData,
        message: 'mmmmmmmmmmmmmm',
      });
      expect(spam.success).toBe(false);
    });

    it('rejects input with fewer than 3 unique characters', () => {
      const lowDiversity = enquiryValidationSchema.safeParse({
        ...validData,
        message: 'abababababab',
      });
      expect(lowDiversity.success).toBe(false);
    });

    it('rejects descriptions over 1000 characters', () => {
      const longDesc = enquiryValidationSchema.safeParse({
        ...validData,
        message: 'a'.repeat(1001),
      });
      expect(longDesc.success).toBe(false);
    });
  });
});

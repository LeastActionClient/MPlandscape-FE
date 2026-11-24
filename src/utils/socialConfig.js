/**
 * Centralized Social & Messaging Links Configuration
 * Keeps official social and instant messaging channels consistent across all components.
 */

export const CANONICAL_INSTAGRAM_URL =
  'https://www.instagram.com/mp_gardening_services?bqrl=MWs1NGF0dGFmMDNhNw==';

export const CANONICAL_WHATSAPP_NUMBER = '918838548402';
export const CANONICAL_WHATSAPP_URL = `https://wa.me/${CANONICAL_WHATSAPP_NUMBER}`;

/**
 * Returns the resolved Instagram URL from company settings or canonical default.
 * @param {Object} settings - Company settings object from backend/context
 * @returns {string} Instagram profile URL
 */
export const getInstagramUrl = (settings) => {
  return settings?.socialLinks?.instagram?.trim() || CANONICAL_INSTAGRAM_URL;
};

/**
 * Returns the resolved WhatsApp URL from company settings or canonical default.
 * @param {Object} settings - Company settings object from backend/context
 * @returns {string} WhatsApp direct chat URL
 */
export const getWhatsAppUrl = (settings) => {
  const number = settings?.whatsappNumber;
  if (number) {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    if (cleanNumber) {
      return `https://wa.me/${cleanNumber}`;
    }
  }
  return CANONICAL_WHATSAPP_URL;
};

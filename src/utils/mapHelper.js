/**
 * Converts any Google Maps link, iframe embed, coordinate pair, or address into a valid <iframe> embed URL.
 * Google Maps place/web URLs (like https://www.google.com/maps/place/...) block embedding via X-Frame-Options: SAMEORIGIN.
 * Converting to https://maps.google.com/maps?q=...&output=embed allows free, seamless iframe embedding without any API key or billing required.
 *
 * @param {string} input - Raw input from admin settings (URL, iframe snippet, coordinates, or address)
 * @param {string} [fallbackAddress] - Optional physical address to fall back to if input is invalid
 * @returns {string} Fully formatted embeddable URL
 */
export const formatGoogleMapsEmbedUrl = (input, fallbackAddress = '') => {
  if (!input && !fallbackAddress) return '';

  let str = (input || '').trim();

  // 1. If user pasted an entire <iframe> embed code snippet, extract the src URL
  const iframeMatch = str.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    str = iframeMatch[1].trim();
  }

  // 2. If it is already a valid Google Maps embed URL
  if (
    str.includes('/maps/embed') ||
    (str.includes('output=embed') && (str.includes('google.com/maps') || str.includes('maps.google.com')))
  ) {
    return str;
  }

  // 3. Extract exact pin coordinates from Google Maps data string (!3d<lat>!4d<lng>)
  const dataCoordMatch = str.match(/!3d(-?\d+(?:\.\d+)?)(?:.*?)!4d(-?\d+(?:\.\d+)?)/);
  if (dataCoordMatch) {
    const lat = dataCoordMatch[1];
    const lng = dataCoordMatch[2];
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=16&output=embed`;
  }

  // 4. Extract view coordinates from @<lat>,<lng>
  const atCoordMatch = str.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (atCoordMatch) {
    const lat = atCoordMatch[1];
    const lng = atCoordMatch[2];
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=16&output=embed`;
  }

  // 5. Extract place query from /maps/place/<query>
  const placeMatch = str.match(/\/maps\/place\/([^/@?]+)/);
  if (placeMatch) {
    const query = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=16&output=embed`;
  }

  // 6. Extract query parameter ?q=<query>
  const qMatch = str.match(/[?&]q=([^&]+)/);
  if (qMatch) {
    const query = decodeURIComponent(qMatch[1].replace(/\+/g, ' '));
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=16&output=embed`;
  }

  // 7. Check if input is a comma-separated latitude, longitude string (e.g. "13.04601, 80.1309814")
  const directCoordMatch = str.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  if (directCoordMatch) {
    return `https://maps.google.com/maps?q=${directCoordMatch[1]},${directCoordMatch[2]}&hl=en&z=16&output=embed`;
  }

  // 8. If str is a valid non-empty string but doesn't have an embed endpoint, treat it as query text
  if (str && !str.startsWith('http://') && !str.startsWith('https://')) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(str)}&hl=en&z=16&output=embed`;
  }

  // 9. If all else fails and a fallback physical address is provided, embed that address
  if (fallbackAddress && fallbackAddress.trim()) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(fallbackAddress.trim())}&hl=en&z=16&output=embed`;
  }

  // 10. Default fallback if nothing provided
  return `https://maps.google.com/maps?q=${encodeURIComponent(str || 'Noombal, Thiruverkadu, Chennai, Tamil Nadu, 600077')}&hl=en&z=16&output=embed`;
};

/**
 * Returns a direct clickable external link to Google Maps for directions.
 */
export const getDirectGoogleMapsUrl = (input, fallbackAddress = '') => {
  if (input && input.startsWith('http')) {
    // If it's an embed URL, convert to public place/search link
    if (input.includes('/maps/embed') || input.includes('output=embed')) {
      const qMatch = input.match(/[?&]q=([^&]+)/);
      if (qMatch) {
        return `https://www.google.com/maps/search/?api=1&query=${qMatch[1]}`;
      }
    }
    return input;
  }

  const query = (input || fallbackAddress || 'Noombal, Thiruverkadu, Chennai, Tamil Nadu, 600077').trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

export default formatGoogleMapsEmbedUrl;

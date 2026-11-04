/**
 * OWASP Security & Sanitization Utilities for Memorijal d.o.o.
 */

/**
 * Safely serializes an object into a JSON string suitable for injection inside
 * <script type="application/ld+json"> without risking DOM XSS or </script> breakout.
 */
export function safeJsonLdSerialize(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/'/g, '\\u0027')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/**
 * Strips HTML tags, ASCII control characters, bidi/zero-width spoofing characters,
 * and dangerous URI schemes from user-supplied form inputs, bounding length to maxLen.
 */
export function sanitizeUserText(input: string, maxLen = 200): string {
  if (!input || typeof input !== 'string') return '';
  return input
    // Strip HTML/XML tags
    .replace(/<[^>]*>/g, '')
    // Strip control characters (except standard newline \n in notes) and zero-width chars
    .replace(/[\x00-\x09\x0B-\x1F\x7F\u200B-\u200F\u202A-\u202E\uFEFF]/g, '')
    // Neutralize script/protocol injection patterns
    .replace(/\b(javascript|vbscript|data):/gi, '')
    .slice(0, maxLen);
}

/**
 * Validates that a navigation path is a safe internal path on memorijal.me
 * (prevents Open Redirect via //evil.com or external scheme injection).
 */
export function sanitizeInternalPath(rawPath: string): string {
  if (!rawPath || typeof rawPath !== 'string') return '/en/';
  const trimmed = rawPath.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return '/en/';
  }
  // Strip any query string or control chars
  const cleanPath = trimmed.split('?')[0].split('#')[0].replace(/[\x00-\x1F\x7F<>"]/g, '');
  return cleanPath || '/en/';
}


// src/utils/getFileUrl.js

// VITE_API_BASE_URL includes "/api" (e.g. https://campus-developer-api.onrender.com/api),
// but uploaded files (images, avatars, etc.) are served from the storage root,
// not under /api. This strips a trailing /api so file URLs resolve correctly.
const STORAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, '')

/**
 * Builds a full URL for a file stored on the backend (images, avatars, etc.)
 * from the relative path returned by the API.
 *
 * @param {string | null | undefined} path - relative path from the API, e.g. "images/cart.png"
 * @returns {string | null} full URL, or null if no path was provided
 */
export function getFileUrl(path) {
  if (!path) return null

  // Guard against a path that's already a full URL (some endpoints may
  // already return an absolute URL) so we don't double-prefix it.
  if (/^https?:\/\//i.test(path)) return path

  // Normalize leading slash so we don't end up with "base//images/..."
  const cleanPath = path.replace(/^\/+/, '')

  return `${STORAGE_BASE_URL}/${cleanPath}`
}

export default getFileUrl
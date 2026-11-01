/**
 * Image Helpers
 * Utilities for image handling and fallbacks
 */

// Default fallback image from public/assets/images/ui/
export const DEFAULT_IMAGE = '/assets/images/ui/default.webp'

/**
 * Handle image loading errors by setting a default fallback image
 * Usage: <img src={src} onError={handleImageError} />
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement
  if (target.src !== DEFAULT_IMAGE) {
    target.src = DEFAULT_IMAGE
  }
}

/**
 * Get image source with fallback
 * Returns the provided src or default image if src is empty/null
 */
export const getImageSrc = (src?: string | null): string => {
  return src || DEFAULT_IMAGE
}

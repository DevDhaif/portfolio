// src/utils/image-utils.ts
import { EDITOR_CONFIG } from '@/config/editor.config';

interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate an image file before upload
 */
export function validateImage(file: File): ValidationResult {
  // Check file type
  if (!EDITOR_CONFIG.images.allowedTypes.includes(file.type as any)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${EDITOR_CONFIG.images.allowedTypes.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > EDITOR_CONFIG.images.maxSize) {
    const maxSizeMB = EDITOR_CONFIG.images.maxSize / (1024 * 1024);
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
}

/**
 * Compress an image to reduce file size
 */
export async function compressImage(
  file: File,
  maxWidth = EDITOR_CONFIG.images.maxWidth,
  quality = EDITOR_CONFIG.images.quality
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      // Clean up object URL
      URL.revokeObjectURL(img.src);

      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Scale down if needed
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Use better quality settings
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        file.type === 'image/png' ? 'image/png' : 'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * Get image dimensions without loading full image
 */
export async function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * Convert a blob URL to a File object (for re-uploading temp files)
 */
export async function blobUrlToFile(
  blobUrl: string,
  fileName: string
): Promise<File> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}

/**
 * Generate a unique filename for uploads
 */
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop() || 'jpg';
  const baseName = originalName
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[^a-zA-Z0-9]/g, '-') // Replace special chars
    .substring(0, 30); // Limit length

  return `${baseName}-${timestamp}-${randomStr}.${extension}`;
}

/**
 * Check if a URL is a blob URL
 */
export function isBlobUrl(url: string): boolean {
  return url.startsWith('blob:');
}

/**
 * Check if a URL is a data URL
 */
export function isDataUrl(url: string): boolean {
  return url.startsWith('data:');
}

/**
 * Check if a URL is a remote URL
 */
export function isRemoteUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

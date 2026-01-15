// src/hooks/useTempFiles.ts
import { useState, useCallback, useRef, useEffect } from 'react';

interface UseTempFilesReturn {
  tempFiles: Map<string, File>;
  addTempFile: (url: string, file: File) => string;
  removeTempFile: (url: string) => void;
  getTempFile: (url: string) => File | undefined;
  cleanup: () => void;
  hasFiles: boolean;
}

/**
 * Hook for managing temporary file URLs (blob URLs)
 * Handles cleanup to prevent memory leaks
 */
export const useTempFiles = (
  onTempFileChange?: (files: Map<string, File>) => void
): UseTempFilesReturn => {
  const [tempFiles, setTempFiles] = useState<Map<string, File>>(new Map());

  // Track URLs for cleanup
  const urlsRef = useRef<Set<string>>(new Set());

  // Update callback ref to avoid stale closures
  const onChangeRef = useRef(onTempFileChange);
  useEffect(() => {
    onChangeRef.current = onTempFileChange;
  }, [onTempFileChange]);

  // Call the callback when tempFiles changes (after state update)
  useEffect(() => {
    onChangeRef.current?.(tempFiles);
  }, [tempFiles]);

  /**
   * Add a temporary file
   */
  const addTempFile = useCallback((url: string, file: File): string => {
    urlsRef.current.add(url);

    setTempFiles((prev) => {
      const newFiles = new Map(prev).set(url, file);
      // Don't call callback here - causes setState during render
      // Will be handled by useEffect below
      return newFiles;
    });

    return url;
  }, []);

  /**
   * Remove a temporary file and revoke its URL
   */
  const removeTempFile = useCallback((url: string): void => {
    // Revoke the blob URL to free memory
    URL.revokeObjectURL(url);
    urlsRef.current.delete(url);

    setTempFiles((prev) => {
      const newFiles = new Map(prev);
      newFiles.delete(url);
      onChangeRef.current?.(newFiles);
      return newFiles;
    });
  }, []);

  /**
   * Get a temporary file by URL
   */
  const getTempFile = useCallback(
    (url: string): File | undefined => {
      return tempFiles.get(url);
    },
    [tempFiles]
  );

  /**
   * Cleanup all temporary files
   */
  const cleanup = useCallback((): void => {
    // Revoke all blob URLs
    urlsRef.current.forEach((url) => {
      URL.revokeObjectURL(url);
    });
    urlsRef.current.clear();

    setTempFiles(new Map());
    onChangeRef.current?.(new Map());
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      urlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  return {
    tempFiles,
    addTempFile,
    removeTempFile,
    getTempFile,
    cleanup,
    hasFiles: tempFiles.size > 0,
  };
};

// src/hooks/useAutosave.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { JSONContent } from '@tiptap/react';
import { EDITOR_CONFIG } from '@/config/editor.config';

interface UseAutosaveOptions {
  /** Content to autosave */
  content: JSONContent | null;
  /** Unique key for this content (e.g., post ID or 'new') */
  key: string;
  /** Delay before saving (ms) */
  delay?: number;
  /** Whether autosave is enabled */
  enabled?: boolean;
  /** Callback when saving to server */
  onSave?: (content: JSONContent) => Promise<void>;
}

interface UseAutosaveReturn {
  /** Last saved timestamp */
  lastSaved: Date | null;
  /** Whether currently saving */
  isSaving: boolean;
  /** Any save error */
  error: Error | null;
  /** Manually save now */
  saveNow: () => Promise<void>;
  /** Clear saved draft */
  clearDraft: () => void;
  /** Whether there's a saved draft */
  hasDraft: boolean;
  /** Load saved draft */
  loadDraft: () => JSONContent | null;
  /** Status message */
  statusMessage: string;
}

const STORAGE_PREFIX = 'editor_draft_';

/**
 * Hook for autosaving editor content
 * Saves to localStorage and optionally to a server
 */
export function useAutosave({
  content,
  key,
  delay = EDITOR_CONFIG.autosave.interval,
  enabled = EDITOR_CONFIG.autosave.enabled,
  onSave,
}: UseAutosaveOptions): UseAutosaveReturn {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasDraft, setHasDraft] = useState(false);

  const contentRef = useRef(content);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const storageKey = `${STORAGE_PREFIX}${key}`;

  // Update content ref
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  // Check for existing draft on mount
  useEffect(() => {
    const draft = localStorage.getItem(storageKey);
    setHasDraft(!!draft);
  }, [storageKey]);

  /**
   * Save to localStorage
   */
  const saveToLocal = useCallback(() => {
    if (!contentRef.current) return;

    try {
      const data = {
        content: contentRef.current,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
      setHasDraft(true);
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, [storageKey]);

  /**
   * Save to server (if callback provided)
   */
  const saveToServer = useCallback(async () => {
    if (!contentRef.current || !onSave) return;

    setIsSaving(true);
    setError(null);

    try {
      await onSave(contentRef.current);
      setLastSaved(new Date());
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Save failed');
      setError(error);
      console.error('Failed to save to server:', err);
    } finally {
      setIsSaving(false);
    }
  }, [onSave]);

  /**
   * Perform save operation
   */
  const performSave = useCallback(async () => {
    saveToLocal();

    if (onSave) {
      await saveToServer();
    } else {
      setLastSaved(new Date());
    }
  }, [saveToLocal, saveToServer, onSave]);

  /**
   * Manual save
   */
  const saveNow = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    await performSave();
  }, [performSave]);

  /**
   * Clear saved draft
   */
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      setHasDraft(false);
    } catch (err) {
      console.error('Failed to clear draft:', err);
    }
  }, [storageKey]);

  /**
   * Load saved draft
   */
  const loadDraft = useCallback((): JSONContent | null => {
    try {
      const data = localStorage.getItem(storageKey);
      if (!data) return null;

      const parsed = JSON.parse(data);
      return parsed.content || null;
    } catch (err) {
      console.error('Failed to load draft:', err);
      return null;
    }
  }, [storageKey]);

  // Autosave effect
  useEffect(() => {
    if (!enabled || !content) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(performSave, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content, enabled, delay, performSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Generate status message
  const statusMessage = (() => {
    if (isSaving) return 'Saving...';
    if (error) return 'Save failed';
    if (lastSaved) {
      const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
      if (seconds < 5) return 'Saved';
      if (seconds < 60) return `Saved ${seconds}s ago`;
      const minutes = Math.floor(seconds / 60);
      return `Saved ${minutes}m ago`;
    }
    return hasDraft ? 'Draft available' : '';
  })();

  return {
    lastSaved,
    isSaving,
    error,
    saveNow,
    clearDraft,
    hasDraft,
    loadDraft,
    statusMessage,
  };
}

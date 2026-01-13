// src/types/editor.types.ts
import { JSONContent, Editor } from '@tiptap/react';

/* ============================================
   Editor Component Props
   ============================================ */

export interface EditorProps {
  /** Initial content (empty string or JSON) */
  content: string | JSONContent;
  /** Callback when content changes */
  onChange: (content: JSONContent) => void;
  /** Callback when temp files change (for image handling) */
  onTempFileChange?: (tempFiles: Map<string, File>) => void;
  /** Optional placeholder text */
  placeholder?: string;
  /** Optional minimum height */
  minHeight?: number;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Optional autosave callback */
  onAutoSave?: (content: JSONContent) => Promise<void>;
}

/* ============================================
   Toolbar Props
   ============================================ */

export interface EditorToolbarProps {
  editor: Editor;
  onInsertImage: () => void;
  onInsertCodeBlock: (language?: string) => void;
}

export interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  shortcut?: string;
}

export interface ToolbarDividerProps {
  className?: string;
}

export interface CodeBlockWithLanguageProps {
  editor: Editor;
}

/* ============================================
   Content Renderer Props
   ============================================ */

export interface ContentRendererProps {
  /** Content to render (JSON string or object) */
  content: string | JSONContent | null;
  /** Optional CSS class */
  className?: string;
}

/* ============================================
   Editor Stats
   ============================================ */

export interface EditorStats {
  words: number;
  characters: number;
  charactersWithSpaces: number;
  paragraphs: number;
  sentences: number;
  readingTime: number;
}

export interface EditorFooterProps {
  stats: EditorStats;
}

/* ============================================
   TipTap Content Types
   ============================================ */

export interface TiptapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  marks?: TiptapMark[];
  text?: string;
}

export interface TiptapDocument {
  type: 'doc';
  content: TiptapNode[];
}

/* ============================================
   Image Types
   ============================================ */

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

/* ============================================
   Temp Files Hook Types
   ============================================ */

export interface UseTempFilesReturn {
  tempFiles: Map<string, File>;
  addTempFile: (url: string, file: File) => string;
  removeTempFile: (url: string) => void;
  getTempFile: (url: string) => File | undefined;
  cleanup: () => void;
  hasFiles: boolean;
}

/* ============================================
   Autosave Types
   ============================================ */

export interface AutosaveState {
  lastSaved: Date | null;
  isSaving: boolean;
  error: Error | null;
}

export interface UseAutosaveOptions {
  /** Delay in milliseconds before autosaving */
  delay?: number;
  /** Storage key for local backup */
  storageKey?: string;
  /** Callback to save content */
  onSave?: (content: JSONContent) => Promise<void>;
}

export interface UseAutosaveReturn extends AutosaveState {
  /** Manually trigger a save */
  saveNow: () => Promise<void>;
  /** Clear any saved drafts */
  clearDraft: () => void;
  /** Check if there's a saved draft */
  hasDraft: boolean;
  /** Load saved draft */
  loadDraft: () => JSONContent | null;
}

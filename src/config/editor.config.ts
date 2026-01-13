// src/config/editor.config.ts

export const EDITOR_CONFIG = {
  // Image settings
  images: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxWidth: 1200,
    quality: 0.85,
    compressionThreshold: 1 * 1024 * 1024, // Compress if > 1MB
  },

  // Code block settings
  codeBlock: {
    languages: [
      'javascript',
      'typescript',
      'html',
      'css',
      'python',
      'php',
      'sql',
      'bash',
      'json',
      'yaml',
      'markdown',
      'jsx',
      'tsx',
    ],
    defaultLanguage: 'javascript',
  },

  // List settings
  lists: {
    maxNestingLevel: 4,
  },

  // History settings
  history: {
    depth: 100,
    newGroupDelay: 500,
  },

  // Heading levels
  headings: {
    levels: [1, 2, 3] as const,
  },

  // Autosave settings
  autosave: {
    enabled: true,
    interval: 30000, // 30 seconds
    storageKey: 'editor_autosave',
  },

  // Placeholder text
  placeholder: 'Start writing your content...',

  // Min height for editor
  minHeight: 400,
} as const;

// Type exports for type safety
export type AllowedImageType =
  (typeof EDITOR_CONFIG.images.allowedTypes)[number];
export type CodeLanguage = (typeof EDITOR_CONFIG.codeBlock.languages)[number];
export type HeadingLevel = (typeof EDITOR_CONFIG.headings.levels)[number];

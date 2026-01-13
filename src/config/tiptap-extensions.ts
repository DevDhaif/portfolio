// src/config/tiptap-extensions.ts

import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { createLowlight } from 'lowlight';
import { TextDirection } from '@/extensions/direction';
import { EDITOR_CONFIG } from './editor.config';

// Language imports
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';

/**
 * Creates and configures the lowlight instance for syntax highlighting
 * Memoized to prevent recreation
 */
export const createEditorLowlight = () => {
  const lowlight = createLowlight({
    javascript,
    typescript,
    python,
    css,
    xml,
    php,
    sql,
    bash,
    json,
    yaml,
    markdown,
  });

  // Register language aliases
  lowlight.registerAlias({
    xml: ['html'],
    javascript: ['js', 'jsx', 'mjs', 'cjs'],
    typescript: ['ts', 'tsx'],
    python: ['py'],
    bash: ['sh', 'zsh', 'shell'],
    json: ['jsonc'],
    yaml: ['yml'],
    markdown: ['md', 'mkd'],
  });

  return lowlight;
};

/**
 * Get editor extensions with shared configuration
 * @param lowlight - Lowlight instance for code highlighting
 * @param editable - Whether the editor is editable (false for reader)
 */
export const getEditorExtensions = (
  lowlight: ReturnType<typeof createLowlight>,
  editable = true
) => {
  const extensions = [
    StarterKit.configure({
      // Disable default code block (we use lowlight version)
      codeBlock: false,

      // Configure bullet list with proper nesting
      bulletList: {
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: 'tiptap-bullet-list',
        },
      },

      // Configure ordered list with proper nesting
      orderedList: {
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: 'tiptap-ordered-list',
        },
      },

      // Configure list items
      listItem: {
        HTMLAttributes: {
          class: 'tiptap-list-item',
        },
      },

      // Configure headings
      heading: {
        levels: [...EDITOR_CONFIG.headings.levels],
      },

      // Configure history (undo/redo) only for editable
      history: editable
        ? {
            depth: EDITOR_CONFIG.history.depth,
            newGroupDelay: EDITOR_CONFIG.history.newGroupDelay,
          }
        : false,

      // Configure other StarterKit options
      paragraph: {
        HTMLAttributes: {
          class: 'tiptap-paragraph',
        },
      },

      blockquote: {
        HTMLAttributes: {
          class: 'tiptap-blockquote',
        },
      },

      horizontalRule: {
        HTMLAttributes: {
          class: 'tiptap-hr',
        },
      },
    }),

    // Code block with syntax highlighting
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: EDITOR_CONFIG.codeBlock.defaultLanguage,
      HTMLAttributes: {
        class: 'tiptap-code-block not-prose',
        spellcheck: 'false',
      },
      languageClassPrefix: 'language-',
    }),

    // Text direction support (RTL/LTR)
    TextDirection,

    // Image support
    Image.configure({
      inline: false,
      allowBase64: true,
      HTMLAttributes: {
        class: 'tiptap-image',
        loading: 'lazy',
      },
    }),

    // Link support
    Link.configure({
      openOnClick: !editable, // Only open on click in reader mode
      autolink: true,
      linkOnPaste: true,
      HTMLAttributes: {
        class: 'tiptap-link',
        rel: 'noopener noreferrer',
      },
      validate: (href) => /^https?:\/\//.test(href),
    }),
  ];

  // Add placeholder only for editable mode
  if (editable) {
    extensions.push(
      Placeholder.configure({
        placeholder: EDITOR_CONFIG.placeholder,
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
      })
    );
  }

  return extensions;
};

/**
 * Hook to detect code language from content
 */
export const detectLanguage = (code: string): string => {
  if (!code.trim()) return EDITOR_CONFIG.codeBlock.defaultLanguage;

  const patterns: { pattern: RegExp; lang: string }[] = [
    // TypeScript patterns (check before JS)
    {
      pattern:
        /:\s*(string|number|boolean|any|void|never)\b|interface\s+\w+|type\s+\w+\s*=/m,
      lang: 'typescript',
    },
    {
      pattern:
        /^import\s+.*from\s+['"]|^export\s+(default\s+)?(function|class|const|let|var|interface|type)/m,
      lang: 'typescript',
    },

    // JavaScript patterns
    {
      pattern:
        /^(const|let|var)\s+\w+\s*=|function\s+\w+\s*\(|=>\s*[{(]|\$\(|document\.|window\./m,
      lang: 'javascript',
    },

    // HTML patterns
    { pattern: /^<!DOCTYPE|<html|<head|<body|<div|<span|<p\s/im, lang: 'html' },
    { pattern: /<[a-z][\s\S]*>/i, lang: 'html' },

    // CSS patterns
    {
      pattern: /^[.#@]?\w+\s*{[\s\S]*}|@media|@keyframes|@import/m,
      lang: 'css',
    },

    // Python patterns
    {
      pattern: /^(def|class|import|from|if __name__|print\(|async def)/m,
      lang: 'python',
    },

    // PHP patterns
    { pattern: /<\?php|^namespace\s+\w|^\$\w+\s*=|->|::/m, lang: 'php' },

    // SQL patterns
    {
      pattern:
        /^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FROM|WHERE)\s/im,
      lang: 'sql',
    },

    // Bash patterns
    {
      pattern:
        /^#!\/bin\/(bash|sh)|^\s*(if|for|while)\s+\[|echo\s+|export\s+\w+=/m,
      lang: 'bash',
    },

    // JSON patterns
    { pattern: /^\s*[{[][\s\S]*[}\]]\s*$/m, lang: 'json' },

    // YAML patterns
    { pattern: /^[\w-]+:\s*.+$/m, lang: 'yaml' },
  ];

  for (const { pattern, lang } of patterns) {
    if (pattern.test(code)) {
      return lang;
    }
  }

  return EDITOR_CONFIG.codeBlock.defaultLanguage;
};

// src/components/Editor/Editor.tsx
'use client';

import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import { useCallback, useMemo, useEffect } from 'react';
import 'highlight.js/styles/github-dark.css';
import '../../styles/tiptap-styles.css';
import { EditorToolbar } from './EditorToolbar';
import { EditorFooter } from './EditorFooter';
import {
  createEditorLowlight,
  getEditorExtensions,
} from '@/config/tiptap-extensions';
import { useTextDirection } from '@/hooks/useTextDirection';
import { useTempFiles } from '@/hooks/useTempFiles';
import { useEditorStats } from '@/hooks/useEditorStats';
import { validateImage, compressImage } from '@/utils/image-utils';
import { EditorProps } from '@/types';
import { EDITOR_CONFIG } from '@/config/editor.config';

export function Editor({ content, onChange, onTempFileChange }: EditorProps) {
  // Memoize lowlight to prevent recreation on every render
  const lowlight = useMemo(() => createEditorLowlight(), []);
  const extensions = useMemo(
    () => getEditorExtensions(lowlight, true),
    [lowlight]
  );

  const { addTempFile, cleanup } = useTempFiles(onTempFileChange);

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg prose-invert focus:outline-none',
        'aria-label': 'Rich text editor',
        role: 'textbox',
        'aria-multiline': 'true',
      },
      // Handle paste for images
      handlePaste(view, event) {
        const items = event.clipboardData?.items;
        if (!items) return false;

        for (const item of items) {
          if (item.type.startsWith('image/')) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file) handleImageFile(file);
            return true;
          }
        }
        return false;
      },
      // Handle drop for images
      handleDrop(view, event, slice, moved) {
        if (moved) return false;

        const files = event.dataTransfer?.files;
        if (!files?.length) return false;

        const images = Array.from(files).filter((f) =>
          f.type.startsWith('image/')
        );
        if (!images.length) return false;

        event.preventDefault();
        images.forEach(handleImageFile);
        return true;
      },
      // Clean up pasted HTML
      transformPastedHTML(html) {
        return html.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '</p><p>');
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  // Apply text direction detection
  useTextDirection(editor);

  // Get editor statistics
  const stats = useEditorStats(editor);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  // Handle image file upload with validation and compression
  const handleImageFile = useCallback(
    async (file: File) => {
      if (!editor) return;

      // Validate image
      const validation = validateImage(file);
      if (!validation.valid) {
        alert(validation.error);
        return;
      }

      try {
        // Compress if needed
        let processedFile: File | Blob = file;
        if (file.size > EDITOR_CONFIG.images.compressionThreshold) {
          processedFile = await compressImage(
            file,
            EDITOR_CONFIG.images.maxWidth,
            EDITOR_CONFIG.images.quality
          );
        }

        const tempUrl = URL.createObjectURL(processedFile);
        addTempFile(tempUrl, file);

        editor
          .chain()
          .focus()
          .insertContent({
            type: 'image',
            attrs: {
              src: tempUrl,
              alt: file.name.replace(/\.[^/.]+$/, ''), // Remove extension for alt
              'data-temp-file': 'true',
            },
          })
          .run();
      } catch (error) {
        console.error('Failed to process image:', error);
        alert('Failed to process image. Please try again.');
      }
    },
    [editor, addTempFile]
  );

  // Handle image button click
  const handleInsertImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = EDITOR_CONFIG.images.allowedTypes.join(',');
    input.multiple = true;

    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      for (const file of Array.from(files)) {
        await handleImageFile(file);
      }
    };

    input.click();
  }, [handleImageFile]);

  // Handle code block insertion
  const insertCodeBlock = useCallback(
    (language = 'javascript') => {
      if (!editor) return;

      editor
        .chain()
        .focus()
        .insertContent({
          type: 'codeBlock',
          attrs: { language },
        })
        .run();
    },
    [editor]
  );

  if (!editor) {
    return <EditorSkeleton />;
  }

  return (
    <div className="editor-container rounded-lg border border-border overflow-hidden">
      <EditorToolbar
        editor={editor}
        onInsertCodeBlock={insertCodeBlock}
        onInsertImage={handleInsertImage}
      />
      <EditorContent
        editor={editor}
        className="tiptap-editor tiptap-content min-h-[400px] p-4"
      />
      <EditorFooter stats={stats} />
    </div>
  );
}

// Loading skeleton
function EditorSkeleton() {
  return (
    <div className="editor-container rounded-lg border border-border overflow-hidden animate-pulse">
      <div className="h-12 bg-gray-800 border-b border-border" />
      <div className="min-h-[400px] bg-gray-900 p-4">
        <div className="h-4 bg-gray-800 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-800 rounded w-1/2 mb-3" />
        <div className="h-4 bg-gray-800 rounded w-5/6" />
      </div>
    </div>
  );
}

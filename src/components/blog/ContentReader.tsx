// src/components/blog/ContentReader.tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import 'highlight.js/styles/tokyo-night-dark.css';
import '../../styles/tiptap-styles.css';
import {
  createEditorLowlight,
  getEditorExtensions,
} from '@/config/tiptap-extensions';
import { ContentRendererProps } from '@/types';

/**
 * Transform image sources in content to full URLs
 * Recursively processes the content JSON and converts relative image paths to full Supabase URLs
 */
function transformImageSources(node: any): any {
  if (!node) return node;

  // If it's an image node, transform the src
  if (node.type === 'image' && node.attrs?.src) {
    const src = node.attrs.src;

    // Only transform if it's not already a full URL (http/https) or blob URL
    if (
      !src.startsWith('http://') &&
      !src.startsWith('https://') &&
      !src.startsWith('blob:')
    ) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      return {
        ...node,
        attrs: {
          ...node.attrs,
          src: `${supabaseUrl}/storage/v1/object/public/blog-content/${src}`,
        },
      };
    }
  }

  // Recursively process child nodes
  if (node.content && Array.isArray(node.content)) {
    return {
      ...node,
      content: node.content.map(transformImageSources),
    };
  }

  return node;
}

/**
 * ContentRenderer - Read-only TipTap editor for displaying blog content
 * Synced with Editor component for consistent rendering
 */
export function ContentRenderer({ content }: ContentRendererProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Memoize lowlight instance
  const lowlight = useMemo(() => createEditorLowlight(), []);

  // Get extensions configured for read-only mode
  const extensions = useMemo(
    () => getEditorExtensions(lowlight, false),
    [lowlight]
  );

  // Parse content safely and transform image URLs
  const parsedContent = useMemo(() => {
    if (!content) {
      return { type: 'doc', content: [] };
    }

    try {
      const parsed =
        typeof content === 'string' ? JSON.parse(content) : content;
      // Transform relative image paths to full URLs
      return transformImageSources(parsed);
    } catch (error) {
      console.error('Failed to parse content:', error);
      return {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Error loading content. Please refresh the page.',
              },
            ],
          },
        ],
      };
    }
  }, [content]);

  // Initialize editor in read-only mode
  const editor = useEditor({
    extensions,
    content: parsedContent,
    editable: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none prose-slate prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-900 prose-p:leading-relaxed prose-p:text-lg prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-strong:font-bold prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-semibold prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-blockquote:border-l-4 prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:text-slate-900 prose-blockquote:font-medium prose-img:rounded-xl prose-img:shadow-lg prose-hr:border-slate-300 prose-ul:text-slate-900 prose-ol:text-slate-900 prose-li:text-slate-900 prose-li:text-lg',
        'aria-label': 'Blog post content',
      },
    },
  });

  // Add copy buttons to code blocks
  const addCopyButtons = useCallback(() => {
    if (!editorRef.current) return;

    const preElements = editorRef.current.querySelectorAll(
      'pre:not([data-copy-added])'
    );

    preElements.forEach((preElement) => {
      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'relative group';
      preElement.parentNode?.insertBefore(wrapper, preElement);
      wrapper.appendChild(preElement);

      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = `
                absolute right-3 top-3 p-2.5 rounded-lg
                bg-slate-700 hover:bg-slate-600
                opacity-0 group-hover:opacity-100
                transition-all duration-200 size-8
                focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                shadow-lg
            `;
      copyButton.setAttribute('aria-label', 'Copy code');
      copyButton.setAttribute('title', 'Copy code');
      copyButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-slate-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
            `;

      copyButton.onclick = async () => {
        const codeElement = preElement.querySelector('code');
        const text = codeElement?.textContent || '';

        try {
          await navigator.clipboard.writeText(text);

          // Show success state
          copyButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-300">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    `;

          // Show toast
          const toast = document.createElement('div');
          toast.textContent = 'Copied!';
          toast.className = `
                        absolute top-14 right-3
                        bg-green-600 text-white 
                        px-3 py-2 rounded-lg
                        text-sm font-semibold
                        shadow-xl 
                        animate-fade-in
                    `;
          wrapper.appendChild(toast);

          // Remove toast after delay
          setTimeout(() => {
            toast.classList.add('animate-fade-out');
            setTimeout(() => toast.remove(), 200);
          }, 1500);

          // Reset button after delay
          setTimeout(() => {
            copyButton.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-slate-200">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                            </svg>
                        `;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);

          // Show error state
          copyButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-300">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    `;
        }
      };

      wrapper.appendChild(copyButton);
      preElement.setAttribute('data-copy-added', 'true');
    });
  }, []);

  // Set content when editor is ready
  useEffect(() => {
    if (editor && parsedContent) {
      editor.commands.setContent(parsedContent);
      setIsReady(true);

      // Add copy buttons after content is rendered
      requestAnimationFrame(() => {
        setTimeout(addCopyButtons, 100);
      });
    }
  }, [editor, parsedContent, addCopyButtons]);

  // Show loading skeleton while editor initializes
  if (!editor || !isReady) {
    return <ContentSkeleton />;
  }

  return (
    <div
      ref={editorRef}
      className="content-reader tiptap-content"
      role="article"
    >
      <EditorContent editor={editor} />
    </div>
  );
}

/**
 * Loading skeleton for content
 */
function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-label="Loading content...">
      <div className="h-8 bg-slate-200 rounded-lg w-3/4" />
      <div className="space-y-3">
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-5/6" />
      </div>
      <div className="h-4 bg-slate-100 rounded w-4/6" />
      <div className="h-64 bg-slate-200 rounded-xl w-full mt-8" />
      <div className="space-y-3 mt-6">
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-3/4" />
      </div>
    </div>
  );
}

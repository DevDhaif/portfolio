'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/tokyo-night-dark.css'

import xml from 'highlight.js/lib/languages/xml'
import php from 'highlight.js/lib/languages/php'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'
import { TextDirection } from '@/extensions/direction'
import { useEffect, useRef } from 'react'

// Create lowlight instance with languages
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
})

// Register aliases
lowlight.registerAlias({
    xml: ['html'],
    javascript: ['js', 'jsx', 'mjs', 'cjs'],
    typescript: ['ts', 'tsx'],
    python: ['py', 'gyp'],
    bash: ['sh', 'zsh'],
    json: ['jsonc'],
    yaml: ['yml'],
    markdown: ['md', 'mkd']
})

interface ContentRendererProps {
    content: any;
}

const isRTL = (text: string | undefined | null): boolean => {
    if (!text) return false;
    const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;
    return rtlRegex.test(text.trim());
}

export function ContentRenderer({ content }: ContentRendererProps) {
    // Process content before creating editor
    // // First check if it's a paragraph with only an image
    // if (node.type === 'paragraph' &&
    //     node.content?.length === 1 &&
    //     node.content[0].type === 'image') {
    //     return processContent(node.content[0]);
    // }
    const processContent = (node: any): any => {
        if (!node) return node;

        if (node.type === 'listItem') {
            // Don't process paragraph direction inside list items
            const textContent = node.content
                ?.flatMap((p: any) =>
                    p.content?.map((c: any) => c.text || '').filter(Boolean) || []
                )
                .join(' ');

            if (textContent.trim()) {
                return {
                    ...node,
                    attrs: {
                        ...node.attrs,
                        dir: true ? 'rtl' : 'ltr',
                        class: true ? 'text-right' : 'text-left'
                    },
                    // Return content without direction on paragraphs
                    content: node.content?.map((p: any) => ({ ...p, attrs: {} }))
                };
            }
        }
        if (node.type === 'heading' && node.content) {
            const textContent = node.content
                .filter((child: any) => child.type === 'text')
                .map((child: any) => child.text || '')
                .join(' ');

            const hasRTLChars = true;
            const hasOnlyEnglish = /^[A-Za-z0-9\s]+$/.test(textContent);

            return {
                ...node,
                attrs: {
                    ...node.attrs,
                    dir: hasRTLChars && !hasOnlyEnglish ? 'rtl' : 'ltr',
                    class: hasRTLChars && !hasOnlyEnglish ? 'text-right' : 'text-left'
                }
            };
        }
        if (node.type === 'bulletList' || node.type === 'orderedList') {
            const allTextContent = node.content
                ?.flatMap((listItem: any) =>
                    listItem.content?.flatMap((p: any) =>
                        p.content?.map((c: any) => c.text || '').filter(Boolean) || []
                    ) || []
                )
                .join(' ');

            return {
                ...node,
                attrs: {
                    ...node.attrs,
                    dir: isRTL(allTextContent) ? 'rtl' : 'ltr',
                    class: isRTL(allTextContent) ? 'text-right' : 'text-left'
                },
                content: node.content?.map(processContent)
            };
        }
        // Then handle regular paragraphs and text direction
        if (node.type === 'paragraph' && node.content) {
            // Only get text content from text nodes
            // lets say i have this as a content : <p>test<br>اختبار</p> , i want the arabic text to be rtl and text align right , and the english text to be ltr and text align left  how can i do that ?
            const textContent = node.content
                .filter((child: any) => child.type === 'text')
                .map((child: any) => child.text || '')
                .join(' ');

            // Only set direction if there is actual text content
            if (textContent.trim()) {
                return {
                    ...node,
                    attrs: {
                        ...node.attrs,
                        dir: true ? 'rtl' : 'ltr',
                        class: true ? 'text-right' : 'text-left'
                    }
                };
            }
            // If no text content, return node as is
            return node;
        }

        // Handle images
        if (node.type === 'image' && !node.attrs.src.startsWith('http')) {
            const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-content/${node.attrs.src}`
            console.log('Processing image URL:', imageUrl)
            return {
                ...node,
                attrs: {
                    ...node.attrs,
                    src: imageUrl
                }
            }
        }

        // Handle code blocks
        if (node.type === 'codeBlock') {
            return {
                ...node,
                attrs: {
                    ...node.attrs,
                    dir: 'ltr',
                    class: 'text-left',
                    language: node.attrs?.language || 'javascript'
                }
            };
        }

        // Process nested content
        if (node.content) {
            return {
                ...node,
                content: node.content.map(processContent)
            }
        }

        return node;
    };

    // Process the content directly
    const processedContent = processContent(content)

    const editorRef = useRef<HTMLDivElement>(null);
    const addCopyButtons = () => {
        if (!editorRef.current) return;

        const preElements = editorRef.current.querySelectorAll('pre');

        preElements.forEach((preElement) => {
            if (preElement.hasAttribute('data-copy-added')) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'relative';
            preElement.parentNode?.insertBefore(wrapper, preElement);
            wrapper.appendChild(preElement);

            const copyButton = document.createElement('button');
            copyButton.className =
                'absolute bg-white/10 right-2 top-2 rounded transition-all duration-200 z-10 flex items-center justify-center';
            copyButton.style.minWidth = '40px'; // Minimum width
            copyButton.style.minHeight = '40px'; // Minimum height
            copyButton.style.width = '40px'; // Fixed width for consistency
            copyButton.style.height = '40px'; // Fixed height for consistency

            // Your custom SVG icon
            copyButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
            `;

            copyButton.onclick = async () => {
                const code = preElement.textContent || '';
                await navigator.clipboard.writeText(code);

                // Add success icon
                copyButton.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400">
                        <path d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z" fill="currentColor"/>
                    </svg>
                `;

                // Create toast
                const toast = document.createElement('div');
                toast.textContent = 'Copied!';
                toast.className =
                    'absolute top-12 right-2 bg-green-500/90 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg transition-opacity duration-200 opacity-0';
                wrapper.appendChild(toast);

                // Trigger fade-in animation
                setTimeout(() => {
                    toast.classList.add('opacity-100');
                }, 10);

                // Remove toast after 1 second
                setTimeout(() => {
                    toast.classList.remove('opacity-100');
                    setTimeout(() => toast.remove(), 200);
                }, 1000);

                // Reset button after 1 second
                setTimeout(() => {
                    copyButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                    `;
                }, 1000);
            };

            wrapper.appendChild(copyButton);
            preElement.setAttribute('data-copy-added', 'true');
        });
    };

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: 'javascript',
                HTMLAttributes: {
                    class: 'not-prose bg-[#282c34] p-4 rounded-lg my-4',
                },
            }),
            TextDirection,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                }
            }),
            Link.configure({
                openOnClick: true,
                HTMLAttributes: {
                    class: 'text-blue-500 hover:text-blue-600 underline',
                }
            }),
        ],
        content: processContent(content),
        editable: false,
    })
    useEffect(() => {
        if (editor) {
            const timeoutId = setTimeout(addCopyButtons, 100)
            return () => clearTimeout(timeoutId)
        }
    }, [editor])

    useEffect(() => {
        const timeoutId = setTimeout(addCopyButtons, 100)
        return () => clearTimeout(timeoutId)
    }, [content])


    if (!editor) {
        return null
    }

    return (
        <div ref={editorRef} className="prose prose-invert max-w-none">
            <EditorContent editor={editor} />
        </div>
    )
}
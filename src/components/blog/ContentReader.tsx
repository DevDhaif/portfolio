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
                        dir: isRTL(textContent) ? 'rtl' : 'ltr',
                        class: isRTL(textContent) ? 'text-right' : 'text-left'
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
        content: processedContent,
        editable: false,
    })

    if (!editor) {
        return null
    }

    return (
        <div className="prose prose-lg max-w-none">
            <EditorContent editor={editor} />
        </div>
    )
}
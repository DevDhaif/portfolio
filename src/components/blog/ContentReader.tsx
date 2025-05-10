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
import '../../styles/tiptap-styles.css';
import { ContentRendererProps } from '@/types'
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


export function ContentRenderer({ content }: ContentRendererProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    const parsedContent = typeof content === 'string'
        ? JSON.parse(content)
        : content;

    const addCopyButtons = () => {
        if (!editorRef.current) return;

        const preElements = editorRef.current.querySelectorAll('pre');

        preElements.forEach((preElement) => {
            if (preElement.hasAttribute('data-copy-added')) return;

            const languageClass = Array.from(preElement.classList)
                .find(c => c.startsWith('language-'));

            if (languageClass) {
                const language = languageClass.replace('language-', '');
                preElement.setAttribute('data-language', language);
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'relative';
            preElement.parentNode?.insertBefore(wrapper, preElement);
            wrapper.appendChild(preElement);

            const copyButton = document.createElement('button');
            copyButton.className =
                'absolute bg-white/10 right-2 top-2 rounded transition-all duration-200 z-10 flex items-center justify-center';
            copyButton.style.minWidth = '40px'
            copyButton.style.minHeight = '40px'
            copyButton.style.width = '40px'
            copyButton.style.height = '40px'
            copyButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
            `;

            copyButton.onclick = async () => {
                const code = preElement.textContent || '';
                await navigator.clipboard.writeText(code);

                copyButton.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400">
                        <path d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z" fill="currentColor"/>
                    </svg>
                `;

                const toast = document.createElement('div');
                toast.textContent = 'Copied!';
                toast.className =
                    'absolute top-12 right-2 bg-green-500/90 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg transition-opacity duration-200 opacity-0';
                wrapper.appendChild(toast);

                setTimeout(() => {
                    toast.classList.add('opacity-100');
                }, 10);

                setTimeout(() => {
                    toast.classList.remove('opacity-100');
                    setTimeout(() => toast.remove(), 200);
                }, 1000);

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
        editable: false,
    })
    useEffect(() => {
        if (editor && parsedContent) {
            console.log('Setting editor content:', parsedContent);
            editor.commands.setContent(parsedContent);

            setTimeout(addCopyButtons, 200);
        }
    }, [editor, parsedContent]);
    useEffect(() => {
        if (editor) {
            const timeoutId = setTimeout(addCopyButtons, 100)
            return () => clearTimeout(timeoutId)
        }
    }, [editor])

    if (!editor) {
        return null
    }

    return (
        <div ref={editorRef} className="content-reader tiptap-content">
            <EditorContent editor={editor} />
        </div>
    )
}
// src/hooks/useEditorConfig.ts
import { useCallback } from 'react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { createLowlight } from 'lowlight';
import { TextDirection } from '@/extensions/direction';
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

// Create and configure lowlight instance
export const createEditorLowlight = () => {
    const lowlight = createLowlight({
        javascript, typescript, python, css, xml,
        php, sql, bash, json, yaml, markdown,
    });

    lowlight.registerAlias({ xml: ['html'] });

    return lowlight;
};

export const useEditorExtensions = (lowlight: ReturnType<typeof createLowlight>) => {
    return [
        StarterKit.configure({
            codeBlock: false,
            bulletList: {},
            orderedList: {},
            heading: {
                levels: [1, 2]
            }
        }),
        CodeBlockLowlight.configure({
            lowlight,
            HTMLAttributes: {
                class: 'not-prose bg-[#282c34] p-4 rounded-lg my-4',
            },
            languageClassPrefix: 'language-'
        }),
        TextDirection,
        Image.configure({
            inline: false,
            HTMLAttributes: {
                class: 'max-w-full h-auto rounded-lg my-4',
            },
        }),
        Link.configure({
            openOnClick: false,
            HTMLAttributes: {
                class: 'text-blue-500 hover:text-blue-600 underline',
            },
        }),
    ];
};

export const useDetectLanguage = (lowlight: ReturnType<typeof createLowlight>) => {
    return useCallback((code: string): string => {
        // Check for code fence language
        const fenceMatch = code.match(/^```(\w+)/)
        if (fenceMatch && lowlight.registered(fenceMatch[1])) {
            return fenceMatch[1]
        }

        try {
            const languageSubset = [
                'javascript', 'typescript', 'python', 'css', 'html',
                'php', 'sql', 'bash', 'json', 'yaml', 'markdown'
            ]
            const result = lowlight.highlightAuto(code, { subset: languageSubset })
            return result.data?.language || 'javascript'
        } catch (error) {
            console.error('Language detection error:', error)
            return 'javascript'
        }
    }, [lowlight]);
};
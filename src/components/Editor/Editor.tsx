'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Button } from '@/components/ui/button'
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Code,
    Link as LinkIcon,
    Image as ImageIcon,
} from 'lucide-react'
import 'highlight.js/styles/tokyo-night-dark.css'
import { useState, useCallback } from 'react'

import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import php from 'highlight.js/lib/languages/php'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'

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

// Register HTML as alias for XML
lowlight.registerAlias({ xml: ['html'] })

interface EditorProps {
    content: string;
    onChange: (content: any) => void;
    onTempFileChange?: (tempFiles: Map<string, File>) => void;
}

export function Editor({ content, onChange, onTempFileChange }: EditorProps) {
    const [tempFiles, setTempFiles] = useState<Map<string, File>>(new Map())


    const handleTempFilesUpdate = (newTempFiles: Map<string, File>) => {
        setTempFiles(newTempFiles);
        onTempFileChange?.(newTempFiles);
    }

    const detectLanguage = useCallback((code: string): string => {
        // First check for code fence
        const fenceMatch = code.match(/^```(\w+)/)
        if (fenceMatch && lowlight.registered(fenceMatch[1])) {
            return fenceMatch[1]
        }

        // Try to detect language
        try {
            const languageSubset = [
                'javascript', 'typescript', 'python', 'css', 'html',
                'php', 'sql', 'bash', 'json', 'yaml', 'markdown'
            ]
            const result = lowlight.highlightAuto(code, { subset: languageSubset })
            return result.data?.language || 'javascript'
        } catch (error) {
            console.error('Language detection error:', error)
            return 'javascript' // Default to javascript instead of plaintext
        }
    }, [])

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'not-prose bg-[#282c34] p-4 rounded-lg my-4',
                },
                languageClassPrefix: 'language-'
            }),
            Image.configure({
                inline: false,
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 hover:text-blue-600 underline',
                },
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON())
        }
    })

    const insertImage = (file: File) => {
        if (!editor) return;

        const tempUrl = URL.createObjectURL(file);
        const filename = `content-${Date.now()}-${file.name}`;

        handleTempFilesUpdate(new Map(tempFiles).set(tempUrl, file));

        editor.chain().focus().insertContent({
            type: 'image',
            attrs: {
                src: filename, // Just store the filename
                alt: file.name,
                'data-temp-file': 'true'
            }
        }).run();
    }
    const insertCodeBlock = useCallback(() => {
        if (!editor) return

        const selection = editor.state.selection
        if (!selection) return

        const { from, to } = selection
        const text = editor.state.doc.textBetween(from, to, ' ')

        // Clean the text and detect language
        const cleanText = text.replace(/^```(\w+)?\n?/, '').replace(/```$/, '')
        const language = detectLanguage(cleanText)

        editor.chain()
            .focus()
            .insertContent({
                type: 'codeBlock',
                attrs: { language },
                content: [{
                    type: 'text',
                    text: cleanText || ''
                }],
            })
            .run()
    }, [editor, detectLanguage])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        // Handle `Ctrl + \`` for inserting a code block
        if (e.key === '`' && e.ctrlKey) {
            e.preventDefault();
            insertCodeBlock();
            return; // Exit after handling
        }

        // Handle `Enter` for splitting blocks
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            editor?.chain().focus().splitBlock().run();
            return; // Exit after handling
        }

        // Let other keys behave normally
    }, [editor, insertCodeBlock]);


    if (!editor) return null

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="border-b bg-muted p-2 flex gap-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-white/20' : ''}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-white/20' : ''}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-white/20' : ''}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-white/20' : ''}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={insertCodeBlock}
                    className={editor.isActive('codeBlock') ? 'bg-white/20' : ''}
                >
                    <Code className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) {
                                const tempUrl = URL.createObjectURL(file)
                                handleTempFilesUpdate(new Map(tempFiles).set(tempUrl, file))
                                editor.chain().focus().insertContent({
                                    type: 'image',
                                    attrs: {
                                        src: tempUrl,
                                        alt: file.name,
                                        'data-temp-file': 'true'
                                    }
                                }).run()
                            }
                        }
                        input.click()
                    }}
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        const url = window.prompt('Enter link URL')
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run()
                        }
                    }}
                >
                    <LinkIcon className="h-4 w-4" />
                </Button>
            </div>
            <EditorContent
                onKeyDown={handleKeyDown}
                editor={editor}
                className="prose max-w-none p-4 min-h-60"
            />
        </div>
    )
}
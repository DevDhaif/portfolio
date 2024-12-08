
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
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
import { useState } from 'react'


const lowlight = createLowlight(all)

interface EditorProps {
    content: string;
    onChange: (content: any) => void;
}

export function Editor({ content, onChange }: EditorProps) {
    const [tempFiles, setTempFiles] = useState<Map<string, File>>(new Map())

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'not-prose bg-gray-900 text-white p-4 rounded-lg',
                },
            }),
            Image.configure({
                inline: true,
            }),
            Link.configure({
                openOnClick: false,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON())
        }
    })


    const insertCodeBlock = () => {
        if (!editor) return;
        const selection = editor.state.selection;

        if (!selection) {
            console.error('Selection is undefined');
            return;
        }

        const { from, to } = selection;
        const text = editor.state.doc.textBetween(from, to, ' ');

        const languageMatch = text?.match(/^```(\w+)\n/);
        const language = languageMatch ? languageMatch[1] : 'plaintext';
        const cleanText = text?.replace(/^```\w+\n/, '');

        if (!editor.isActive('paragraph')) {
            editor.chain().focus().insertContent({ type: 'paragraph' }).run();
        }

        editor.chain()
            .focus()
            .insertContent({
                type: 'codeBlock',
                attrs: { language },
                content: cleanText ? [{ type: 'text', text: cleanText }] : [],
            })
            .run();

        editor.chain().focus().insertContent({ type: 'paragraph' }).run();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {

        if (e.key === '`' && e.ctrlKey) {
            e.preventDefault()
            insertCodeBlock()
        }
    }

    if (!editor) return null

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="border-b bg-muted p-2 flex gap-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={insertCodeBlock}
                    className={editor.isActive('codeBlock') ? 'bg-muted-foreground/20' : ''}
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
                                setTempFiles(prev => {
                                    const newMap = new Map(prev)
                                    newMap.set(tempUrl, file)
                                    return newMap
                                })
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
            <EditorContent onKeyDown={handleKeyDown} editor={editor} className="prose max-w-none p-4 min-h-60" />
        </div>
    )
}
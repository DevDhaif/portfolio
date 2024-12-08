
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/tokyo-night-dark.css'



const lowlight = createLowlight(all)


lowlight.register('js', javascript)
lowlight.register('javascript', javascript)
lowlight.register('ts', typescript)
lowlight.register('typescript', typescript)
lowlight.register('css', css)
lowlight.register('html', html)
lowlight.register('python', python)

interface ContentRendererProps {
    content: any;
}
export function ContentRenderer({ content }: ContentRendererProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: 'javascript',
                HTMLAttributes: {
                    class: 'not-prose bg-gray-900 text-white p-4 rounded-lg my-4',
                },
            }),
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
        content,
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
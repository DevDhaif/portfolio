// src/components/Editor/Editor.tsx
import { useEditor, EditorContent } from '@tiptap/react';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useCallback } from 'react';
import '../../styles/tiptap-styles.css';
import { EditorToolbar } from './EditorToolbar';
import {
    createEditorLowlight,
    useEditorExtensions,
    useDetectLanguage
} from '@/hooks/useEditorConfig';
import { useTextDirection } from '@/hooks/useTextDirection';
import { useTempFiles } from '@/hooks/useTempFiles';

interface EditorProps {
    content: string;
    onChange: (content: any) => void;
    onTempFileChange?: (tempFiles: Map<string, File>) => void;
}

export function Editor({ content, onChange, onTempFileChange }: EditorProps) {
    // Initialize hooks
    const lowlight = createEditorLowlight();
    const extensions = useEditorExtensions(lowlight);
    const detectLanguage = useDetectLanguage(lowlight);
    const { tempFiles, addTempFile } = useTempFiles(onTempFileChange);

    // Editor initialization
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg prose-invert focus:outline-none rtl-support'
            },
            handleKeyDown(view, event) {
                if (event.key === '`' && event.ctrlKey) {
                    event.preventDefault();
                    insertCodeBlock();
                    return true;
                }

                if (event.key === 'Enter' && !event.shiftKey) {
                    const { $from } = view.state.selection;
                    const node = $from.parent;

                    if (node.type.name === 'paragraph' && !node.textContent) {
                        event.preventDefault();
                        return true;
                    }

                    if (editor?.isActive('bulletList') || editor?.isActive('orderedList')) {
                        return false;
                    }
                }

                return false;
            },
            transformPastedHTML(html) {
                return html.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '</p><p>');
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        }
    });

    // Apply text direction detection
    useTextDirection(editor);

    // Code block insertion
    const insertCodeBlock = useCallback(() => {
        if (!editor) return;

        const selection = editor.state.selection;
        if (!selection) return;

        const { from, to } = selection;
        const text = editor.state.doc.textBetween(from, to, ' ');
        const cleanText = text.replace(/^```(\w+)?\n?/, '').replace(/```$/, '');
        const language = detectLanguage(cleanText);

        editor.chain()
            .focus()
            .insertContent({
                type: 'codeBlock',
                attrs: { language },
                content: [{ type: 'text', text: cleanText || '' }],
            })
            .run();
    }, [editor, detectLanguage]);

    // Key event handler
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === '`' && e.ctrlKey) {
            e.preventDefault();
            insertCodeBlock();
            return;
        }

        if (e.key === 'Enter' && !e.shiftKey && editor?.state?.selection) {
            const { $from } = editor.state.selection;
            const node = $from.parent;

            if (node.type.name === 'paragraph' && !node.textContent) {
                e.preventDefault();
                return;
            }
        }
    }, [editor, insertCodeBlock]);

    // Image insertion
    const handleInsertImage = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file || !editor) return;

            const tempUrl = URL.createObjectURL(file);
            const filename = `content-${Date.now()}-${file.name}`;

            addTempFile(tempUrl, file);

            editor.chain().focus().insertContent({
                type: 'image',
                attrs: {
                    src: tempUrl,
                    alt: file.name,
                    'data-temp-file': 'true'
                }
            }).run();
        };
        input.click();
    }, [editor, addTempFile]);

    if (!editor) return null;

    return (
        <div className="editor-container">
            <EditorToolbar
                editor={editor}
                onInsertCodeBlock={insertCodeBlock}
                onInsertImage={handleInsertImage}
            />
            <EditorContent
                onKeyDown={handleKeyDown}
                editor={editor}
                className="tiptap-editor tiptap-content rounded-md !text-white border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
}
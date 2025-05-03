// src/components/Editor/EditorToolbar.tsx
import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
    Bold, Italic, List, ListOrdered, Code,
    Link as LinkIcon, Image as ImageIcon,
    Heading1, Heading2, Quote,
} from 'lucide-react';

interface ToolbarButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
}

const ToolbarButton = ({ icon, onClick, isActive }: ToolbarButtonProps) => (
    <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={`editor-toolbar-button ${isActive ? 'is-active' : ''}`}
    >
        {icon}
    </Button>
);

interface ToolbarDividerProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    
 }

const ToolbarDivider = ({ }: ToolbarDividerProps) => (
    <div className="w-px h-6 bg-white/20" />
);

interface EditorToolbarProps {
    editor: Editor;
    onInsertImage: () => void;
    onInsertCodeBlock: () => void;
}

export const EditorToolbar = ({ editor, onInsertImage, onInsertCodeBlock }: EditorToolbarProps) => {
    if (!editor) return null;

    return (
        <div className="editor-toolbar">
            <div className="flex items-center gap-2">
                <ToolbarButton
                    icon={<Bold className="h-4 w-4" />}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                />
                <ToolbarButton
                    icon={<Italic className="h-4 w-4" />}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                />
            </div>

            <ToolbarDivider />

            <div className="flex items-center gap-2">
                <ToolbarButton
                    icon={<Heading1 className="h-4 w-4" />}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                />
                <ToolbarButton
                    icon={<Heading2 className="h-4 w-4" />}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                />
            </div>

            <ToolbarDivider />

            <div className="flex items-center gap-2">
                <ToolbarButton
                    icon={<List className="h-4 w-4" />}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                />
                <ToolbarButton
                    icon={<ListOrdered className="h-4 w-4" />}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                />
                <ToolbarButton
                    icon={<Quote className="h-4 w-4" />}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                />
            </div>

            <ToolbarDivider />

            <div className="flex items-center gap-2">
                <ToolbarButton
                    icon={<Code className="h-4 w-4" />}
                    onClick={onInsertCodeBlock}
                    isActive={editor.isActive('codeBlock')}
                />
                <ToolbarButton
                    icon={<ImageIcon className="h-4 w-4" />}
                    onClick={onInsertImage}
                />
                <ToolbarButton
                    icon={<LinkIcon className="h-4 w-4" />}
                    onClick={() => {
                        const url = window.prompt('Enter link URL')
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run()
                        }
                    }}
                />
            </div>
        </div>
    );
};
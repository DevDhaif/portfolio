import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, ListOrdered, Code, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, Quote, AlignLeft, AlignRight } from 'lucide-react';
import { useState } from 'react';
interface ToolbarButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
}
const ToolbarButton = ({ icon, onClick, isActive }: ToolbarButtonProps) => (
    <Button type="button" variant="ghost" size="sm" onClick={onClick} className={`editor-toolbar-button ${isActive ? 'is-active' : ''}`} > {icon} </Button>
);
interface ToolbarDividerProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;

}
const ToolbarDivider = ({ }: ToolbarDividerProps) => (
    <div className="w-px h-6 bg-white/20" />
);
interface CodeBlockWithLanguageProps {
    editor: Editor;
}
const CodeBlockWithLanguage = ({ editor }: CodeBlockWithLanguageProps) => {
    const [showLanguages, setShowLanguages] = useState(false);
    const languages = ['javascript', 'typescript', 'html', 'css', 'python', 'php', 'sql', 'bash', 'json', 'yaml', 'markdown'];
    const isCodeBlockActive = editor.isActive('codeBlock');
    const selectLanguage = (language: string) => {
        if (isCodeBlockActive) { editor.chain().focus().updateAttributes('codeBlock', { language }).run(); }
        else { editor.chain().focus().toggleCodeBlock({ language }).run(); }
        setShowLanguages(false);
    };
    return (
        <div className="relative">
            <ToolbarButton icon={<Code className="h-4 w-4" />} onClick={() => setShowLanguages(!showLanguages)} isActive={isCodeBlockActive} />
            {showLanguages && (
                <div className="absolute top-full left-0 mt-1 bg-gray-800 rounded shadow-lg z-20 w-40">
                    {languages.map(lang => (
                        <button key={lang} onClick={() => selectLanguage(lang)} className="block w-full text-left px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700"> {lang} </button>
                    ))}
                </div>
            )}
        </div>
    );
};
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
                <ToolbarButton icon={<Bold className="h-4 w-4" />} onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} />
                <ToolbarButton icon={<Italic className="h-4 w-4" />} onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} />
            </div>
            <ToolbarDivider />
            <div className="flex items-center gap-2">
                <ToolbarButton icon={<Heading1 className="h-4 w-4" />} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} />
                <ToolbarButton icon={<Heading2 className="h-4 w-4" />} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} />
            </div>
            <ToolbarDivider />
            <div className="flex items-center gap-2">
                <ToolbarButton icon={<AlignLeft className="h-4 w-4" />} onClick={() => editor.chain().focus().updateAttributes('paragraph', { dir: 'ltr' }).run()} isActive={editor.isActive('paragraph', { dir: 'ltr' })} />
                <ToolbarButton icon={<AlignRight className="h-4 w-4" />} onClick={() => editor.chain().focus().updateAttributes('paragraph', { dir: 'rtl' }).run()} isActive={editor.isActive('paragraph', { dir: 'rtl' })} />
            </div>
            <div className="flex items-center gap-2">
                <ToolbarButton icon={<List className="h-4 w-4" />} onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} />
                <ToolbarButton icon={<ListOrdered className="h-4 w-4" />} onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} />
                <ToolbarButton icon={<Quote className="h-4 w-4" />} onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} />
            </div>
            <ToolbarDivider />
            <div className="flex items-center gap-2">
                <CodeBlockWithLanguage editor={editor} />
                <ToolbarButton icon={<ImageIcon className="h-4 w-4" />} onClick={onInsertImage} />
                <ToolbarButton icon={<LinkIcon className="h-4 w-4" />} onClick={() => { const url = window.prompt('Enter link URL'); if (url) { editor.chain().focus().setLink({ href: url }).run() } }} />
            </div>
        </div>
    );
};
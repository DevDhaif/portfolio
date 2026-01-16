// src/components/Editor/EditorToolbar.tsx
'use client';

import { memo, useState, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  AlignLeft,
  AlignRight,
  Undo,
  Redo,
  Indent,
  Outdent,
  Minus,
  RemoveFormatting,
} from 'lucide-react';
import { EDITOR_CONFIG } from '@/config/editor.config';

interface EditorToolbarProps {
  editor: Editor;
  onInsertImage: () => void;
  onInsertCodeBlock: (language?: string) => void;
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  shortcut?: string;
}

// Memoized toolbar button
const ToolbarButton = memo(
  ({
    icon,
    onClick,
    isActive,
    disabled,
    title,
    shortcut,
  }: ToolbarButtonProps) => {
    const label = shortcut ? `${title} (${shortcut})` : title;

    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        aria-pressed={isActive}
        title={label}
        className={`
                p-2 rounded-md transition-colors
                ${
                  isActive
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                }
                ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
            `}
      >
        {icon}
      </Button>
    );
  }
);
ToolbarButton.displayName = 'ToolbarButton';

// Divider component
const ToolbarDivider = memo(() => (
  <div className="w-px h-6 bg-gray-700 mx-1" aria-hidden="true" />
));
ToolbarDivider.displayName = 'ToolbarDivider';

// Code block language selector
const CodeBlockButton = memo(({ editor }: { editor: Editor }) => {
  const [showLanguages, setShowLanguages] = useState(false);
  const isActive = editor.isActive('codeBlock');

  const selectLanguage = useCallback(
    (language: string) => {
      if (isActive) {
        editor
          .chain()
          .focus()
          .updateAttributes('codeBlock', { language })
          .run();
      } else {
        editor.chain().focus().toggleCodeBlock({ language }).run();
      }
      setShowLanguages(false);
    },
    [editor, isActive]
  );

  return (
    <div className="relative">
      <ToolbarButton
        icon={<Code className="h-4 w-4" />}
        onClick={() => setShowLanguages(!showLanguages)}
        isActive={isActive}
        title="Code Block"
        shortcut="Ctrl+`"
      />
      {showLanguages && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowLanguages(false)}
          />
          <div
            className="absolute top-full left-0 mt-1 bg-gray-800 rounded-lg shadow-xl z-20 w-40 max-h-60 overflow-y-auto border border-gray-700"
            role="listbox"
            aria-label="Select programming language"
          >
            {EDITOR_CONFIG.codeBlock.languages.map((lang) => (
              <button
                key={lang}
                onClick={() => selectLanguage(lang)}
                role="option"
                className="block w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
              >
                {lang}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
});
CodeBlockButton.displayName = 'CodeBlockButton';

// Main toolbar component
export const EditorToolbar = memo(
  ({ editor, onInsertImage }: EditorToolbarProps) => {
    const isInList =
      editor.isActive('bulletList') || editor.isActive('orderedList');

    // List indentation handlers
    const handleIndent = useCallback(() => {
      editor.chain().focus().sinkListItem('listItem').run();
    }, [editor]);

    const handleOutdent = useCallback(() => {
      editor.chain().focus().liftListItem('listItem').run();
    }, [editor]);

    // Link handler
    const handleLink = useCallback(() => {
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('Enter URL:', previousUrl);

      if (url === null) return;

      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      // Add https if no protocol
      const finalUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: finalUrl })
        .run();
    }, [editor]);

    // Clear formatting
    const handleClearFormatting = useCallback(() => {
      editor.chain().focus().clearNodes().unsetAllMarks().run();
    }, [editor]);

    return (
      <div
        className="editor-toolbar flex flex-wrap items-center gap-1 p-2 bg-gray-900 border-b border-gray-800 sticky top-0 z-10"
        role="toolbar"
        aria-label="Text formatting options"
      >
        {/* History */}
        <div className="flex items-center" role="group" aria-label="History">
          <ToolbarButton
            icon={<Undo className="h-4 w-4" />}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
            shortcut="Ctrl+Z"
          />
          <ToolbarButton
            icon={<Redo className="h-4 w-4" />}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
            shortcut="Ctrl+Y"
          />
        </div>

        <ToolbarDivider />

        {/* Text Formatting */}
        <div
          className="flex items-center"
          role="group"
          aria-label="Text formatting"
        >
          <ToolbarButton
            icon={<Bold className="h-4 w-4" />}
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
            shortcut="Ctrl+B"
          />
          <ToolbarButton
            icon={<Italic className="h-4 w-4" />}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
            shortcut="Ctrl+I"
          />
          <ToolbarButton
            icon={<Strikethrough className="h-4 w-4" />}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          />
        </div>

        <ToolbarDivider />

        {/* Headings */}
        <div className="flex items-center" role="group" aria-label="Headings">
          <ToolbarButton
            icon={<Heading1 className="h-4 w-4" />}
            onClick={() => {
              if (editor.isActive('listItem')) {
                // Apply heading style to list item
                const currentLevel = editor.getAttributes('listItem').headingLevel;
                if (currentLevel === 1) {
                  editor.chain().focus().updateAttributes('listItem', { headingLevel: null }).run();
                } else {
                  editor.chain().focus().updateAttributes('listItem', { headingLevel: 1 }).run();
                }
              } else {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }
            }}
            isActive={editor.isActive('heading', { level: 1 }) || (editor.isActive('listItem') && editor.getAttributes('listItem').headingLevel === 1)}
            title="Heading 1 (works with lists)"
          />
          <ToolbarButton
            icon={<Heading2 className="h-4 w-4" />}
            onClick={() => {
              if (editor.isActive('listItem')) {
                const currentLevel = editor.getAttributes('listItem').headingLevel;
                if (currentLevel === 2) {
                  editor.chain().focus().updateAttributes('listItem', { headingLevel: null }).run();
                } else {
                  editor.chain().focus().updateAttributes('listItem', { headingLevel: 2 }).run();
                }
              } else {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }
            }}
            isActive={editor.isActive('heading', { level: 2 }) || (editor.isActive('listItem') && editor.getAttributes('listItem').headingLevel === 2)}
            title="Heading 2 (works with lists)"
          />
          <ToolbarButton
            icon={<Heading3 className="h-4 w-4" />}
            onClick={() => {
              if (editor.isActive('listItem')) {
                const currentLevel = editor.getAttributes('listItem').headingLevel;
                if (currentLevel === 3) {
                  editor.chain().focus().updateAttributes('listItem', { headingLevel: null }).run();
                } else {
                  editor.chain().focus().updateAttributes('listItem', { headingLevel: 3 }).run();
                }
              } else {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }
            }}
            isActive={editor.isActive('heading', { level: 3 }) || (editor.isActive('listItem') && editor.getAttributes('listItem').headingLevel === 3)}
            title="Heading 3 (works with lists)"
          />
        </div>

        <ToolbarDivider />

        {/* Text Direction */}
        <div
          className="flex items-center"
          role="group"
          aria-label="Text direction"
        >
          <ToolbarButton
            icon={<AlignLeft className="h-4 w-4" />}
            onClick={() => editor.chain().focus().setTextDirection('ltr').run()}
            isActive={editor.getAttributes('paragraph').dir === 'ltr' || editor.getAttributes('listItem').dir === 'ltr' || editor.getAttributes('heading').dir === 'ltr'}
            title="Left to Right"
          />
          <ToolbarButton
            icon={<AlignRight className="h-4 w-4" />}
            onClick={() => editor.chain().focus().setTextDirection('rtl').run()}
            isActive={editor.getAttributes('paragraph').dir === 'rtl' || editor.getAttributes('listItem').dir === 'rtl' || editor.getAttributes('heading').dir === 'rtl'}
            title="Right to Left"
          />
        </div>

        <ToolbarDivider />

        {/* Lists */}
        <div className="flex items-center" role="group" aria-label="Lists">
          <ToolbarButton
            icon={<List className="h-4 w-4" />}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          />
          <ToolbarButton
            icon={<ListOrdered className="h-4 w-4" />}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          />
          <ToolbarButton
            icon={<Outdent className="h-4 w-4" />}
            onClick={handleOutdent}
            disabled={!isInList}
            title="Decrease Indent"
            shortcut="Shift+Tab"
          />
          <ToolbarButton
            icon={<Indent className="h-4 w-4" />}
            onClick={handleIndent}
            disabled={!isInList}
            title="Increase Indent"
            shortcut="Tab"
          />
        </div>

        <ToolbarDivider />

        {/* Block Elements */}
        <div
          className="flex items-center"
          role="group"
          aria-label="Block elements"
        >
          <ToolbarButton
            icon={<Quote className="h-4 w-4" />}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Quote"
          />
          <CodeBlockButton editor={editor} />
          <ToolbarButton
            icon={<Minus className="h-4 w-4" />}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          />
        </div>

        <ToolbarDivider />

        {/* Media */}
        <div className="flex items-center" role="group" aria-label="Media">
          <ToolbarButton
            icon={<ImageIcon className="h-4 w-4" />}
            onClick={onInsertImage}
            title="Insert Image"
          />
          <ToolbarButton
            icon={<LinkIcon className="h-4 w-4" />}
            onClick={handleLink}
            isActive={editor.isActive('link')}
            title="Insert Link"
            shortcut="Ctrl+K"
          />
        </div>

        <ToolbarDivider />

        {/* Utilities */}
        <div className="flex items-center" role="group" aria-label="Utilities">
          <ToolbarButton
            icon={<RemoveFormatting className="h-4 w-4" />}
            onClick={handleClearFormatting}
            title="Clear Formatting"
          />
        </div>
      </div>
    );
  }
);

EditorToolbar.displayName = 'EditorToolbar';

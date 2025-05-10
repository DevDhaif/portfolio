import React from "react";
import { Editor } from '@tiptap/react';

export interface EditorProps {
    content: string;
    onChange: (content: any) => void;
    onTempFileChange?: (tempFiles: Map<string, File>) => void;
}
export interface ToolbarButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
}
export interface ToolbarDividerProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;

}
export interface EditorToolbarProps {
    editor: Editor;
    onInsertImage: () => void;
    onInsertCodeBlock: () => void;
}
export interface ContentRendererProps {
    content: any;
}
export interface CodeBlockWithLanguageProps {
    editor: Editor;
}
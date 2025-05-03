export interface EditorProps {
    content: string;
    onChange: (content: any) => void;
    onTempFileChange?: (tempFiles: Map<string, File>) => void;
}
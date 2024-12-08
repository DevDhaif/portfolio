
export interface EditorProps {
    content: any;
    onChange: (content: any, tempFiles: Map<string, File>) => void;
}
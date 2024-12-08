export interface EditorProps {
    content: any
    onChange: (content: any, getTempFiles?: () => Map<string, File>) => void
}
import { Editor } from '@tiptap/core'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        uploadImage: {
            /**
             * Upload an image
             */
            uploadImage: (file: File) => ReturnType
        }
    }
}
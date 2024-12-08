
import Image from '@tiptap/extension-image'
import { Node } from '@tiptap/core'

export const ImageUpload = Node.create({
    name: 'image',

    group: 'block',

    addAttributes() {
        return {
            src: {
                default: null
            },
            alt: {
                default: null
            },
            'data-temp-file': {
                default: null
            }
        }
    },

    parseHTML() {
        return [{
            tag: 'img[src]',
        }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['img', HTMLAttributes]
    },
})
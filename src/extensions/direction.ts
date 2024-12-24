// extensions/direction.ts
import { Extension } from '@tiptap/core'

// Improved RTL detection for mixed content
const isArabicOrHebrew = (text: string): boolean => {
    // Match any Arabic or Hebrew character
    const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;
    return rtlRegex.test(text);
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        direction: {
            setTextDirection: (direction: 'rtl' | 'ltr') => ReturnType
            unsetTextDirection: () => ReturnType
        }
    }
}

export const TextDirection = Extension.create({
    name: 'textDirection',

    addGlobalAttributes() {
        return [
            {
                types: ['paragraph', 'heading'],
                attributes: {
                    dir: {
                        default: 'rtl',
                        parseHTML: element => {
                            // If content contains Arabic/Hebrew, force RTL
                            const content = element.textContent || '';
                            return isArabicOrHebrew(content) ? 'rtl' : 'ltr';
                        },
                        renderHTML: attributes => {
                            return { 
                                dir: attributes.dir || 'rtl',
                                class: 'text-right' // Force text alignment right for Arabic content
                            }
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setTextDirection: (direction: 'rtl' | 'ltr') => ({ commands }) => {
                return commands.updateAttributes('paragraph', { 
                    dir: direction,
                })
            },
            unsetTextDirection: () => ({ commands }) => {
                return commands.resetAttributes('paragraph', 'dir')
            },
        }
    },
})
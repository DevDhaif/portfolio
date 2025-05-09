import { Extension } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { Plugin, PluginKey } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

const isRTL = (text: string): boolean => {
    if (!text?.trim()) return false;

    const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;

    const rtlChars = (text.match(rtlRegex) || []).length;
    const latinChars = (text.match(/[A-Za-z]/) || []).length;
    const startsWithRTL = rtlRegex.test(text.trim()[0]);

    return startsWithRTL || rtlChars > latinChars;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        textDirection: {
            setTextDirection: (direction: 'rtl' | 'ltr') => ReturnType,
            unsetTextDirection: () => ReturnType,
        }
    }
}

export const TextDirection = Extension.create({
    name: 'textDirection',

    addGlobalAttributes() {
        return [
            {
                types: ['paragraph', 'heading', 'bulletList', 'orderedList', 'listItem'],
                attributes: {
                    dir: {
                        default: null,
                        parseHTML: element => {
                            const content = element.textContent || '';
                            return isRTL(content) ? 'rtl' : 'ltr';
                        },
                        renderHTML: attributes => {
                            return {
                                dir: attributes.dir || 'ltr',
                                class: attributes.dir === 'rtl' ? 'text-right' : 'text-left'
                            }
                        },
                    },
                },
            },
        ]
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey(this.name),
                update: (view: EditorView) => {
                    // First pass: process paragraphs and headings
                    view.state.doc.descendants((node: ProseMirrorNode, pos: number) => {
                        if (node.type.name === 'paragraph' || node.type.name === 'heading') {
                            const content = node.textContent;
                            const shouldBeRTL = isRTL(content);
                            const currentDir = node.attrs.dir;

                            if ((shouldBeRTL && currentDir !== 'rtl') ||
                                (!shouldBeRTL && currentDir !== 'ltr')) {
                                view.dispatch(
                                    view.state.tr.setNodeMarkup(pos, undefined, {
                                        ...node.attrs,
                                        dir: shouldBeRTL ? 'rtl' : 'ltr'
                                    })
                                );
                            }
                        }
                        return true;
                    });

                    view.state.doc.descendants((node: ProseMirrorNode, pos: number) => {
                        if (node.type.name === 'bulletList' || node.type.name === 'orderedList') {
                            let allListText = '';
                            node.descendants(child => {
                                if (child.isText) {
                                    allListText += child.text || '';
                                }
                                return true;
                            });

                            const shouldBeRTL = isRTL(allListText);
                            const currentDir = node.attrs.dir;

                            if ((shouldBeRTL && currentDir !== 'rtl') ||
                                (!shouldBeRTL && currentDir !== 'ltr')) {
                                view.dispatch(
                                    view.state.tr.setNodeMarkup(pos, undefined, {
                                        ...node.attrs,
                                        dir: shouldBeRTL ? 'rtl' : 'ltr'
                                    })
                                );
                            }
                        }

                        if (node.type.name === 'listItem') {
                            let itemText = '';
                            node.descendants(child => {
                                if (child.isText) {
                                    itemText += child.text || '';
                                }
                                return true;
                            });

                            const shouldBeRTL = isRTL(itemText);
                            const currentDir = node.attrs.dir;

                            if ((shouldBeRTL && currentDir !== 'rtl') ||
                                (!shouldBeRTL && currentDir !== 'ltr')) {
                                view.dispatch(
                                    view.state.tr.setNodeMarkup(pos, undefined, {
                                        ...node.attrs,
                                        dir: shouldBeRTL ? 'rtl' : 'ltr'
                                    })
                                );
                            }
                        }
                        return true;
                    });
                }
            })
        ]
    },

    addCommands() {
        return {
            setTextDirection: (direction: 'rtl' | 'ltr') => ({ commands }) => {
                const nodeTypes = ['paragraph', 'heading', 'bulletList', 'orderedList', 'listItem'];
                return nodeTypes.every(type => commands.updateAttributes(type, { dir: direction }));
            },
            unsetTextDirection: () => ({ commands }) => {
                const nodeTypes = ['paragraph', 'heading', 'bulletList', 'orderedList', 'listItem'];
                return nodeTypes.every(type => commands.resetAttributes(type, 'dir'));
            },
        }
    },
})
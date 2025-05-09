import { useEffect } from 'react';
import { Editor } from '@tiptap/react';

export const useTextDirection = (editor: Editor | null) => {
    useEffect(() => {
        if (!editor) return;

        const detectAndUpdateDirection = () => {
            editor.view.state.doc.descendants((node, pos) => {
                if (node.type.name === 'paragraph' || node.type.name === 'heading') {
                    const content = node.textContent || '';
                    if (content.trim()) {
                        const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;
                        const hasRTL = rtlRegex.test(content);
                        const startsWithRTL = rtlRegex.test(content.trim()[0]);
                        const shouldBeRTL = hasRTL && startsWithRTL;

                        const currentDir = node.attrs.dir;
                        if ((shouldBeRTL && currentDir !== 'rtl') ||
                            (!shouldBeRTL && currentDir !== 'ltr')) {

                            editor.view.dispatch(
                                editor.view.state.tr.setNodeMarkup(pos, undefined, {
                                    ...node.attrs,
                                    dir: shouldBeRTL ? 'rtl' : 'ltr'
                                })
                            );
                        }
                    }
                }
                return true;
            });

            editor.view.state.doc.descendants((node, pos) => {
                if (node.type.name === 'bulletList' || node.type.name === 'orderedList') {
                    let allListText = '';
                    node.descendants(child => {
                        if (child.isText) {
                            allListText += child.text || '';
                        }
                        return true;
                    });

                    const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;
                    const hasRTL = rtlRegex.test(allListText);
                    const shouldBeRTL = hasRTL;
                    const currentDir = node.attrs.dir;

                    if ((shouldBeRTL && currentDir !== 'rtl') ||
                        (!shouldBeRTL && currentDir !== 'ltr')) {
                        editor.view.dispatch(
                            editor.view.state.tr.setNodeMarkup(pos, undefined, {
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

                    const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;
                    const hasRTL = rtlRegex.test(itemText);
                    const shouldBeRTL = hasRTL;
                    const currentDir = node.attrs.dir;

                    if ((shouldBeRTL && currentDir !== 'rtl') ||
                        (!shouldBeRTL && currentDir !== 'ltr')) {
                        editor.view.dispatch(
                            editor.view.state.tr.setNodeMarkup(pos, undefined, {
                                ...node.attrs,
                                dir: shouldBeRTL ? 'rtl' : 'ltr'
                            })
                        );
                    }
                }
                return true;
            });
        };

        const handler = () => {
            requestAnimationFrame(detectAndUpdateDirection);
        };

        editor.on('update', handler);

        return () => {
            editor.off('update', handler);
        };
    }, [editor]);
};
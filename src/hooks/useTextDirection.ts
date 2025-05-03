// src/hooks/useTextDirection.ts
import { useEffect } from 'react';
import { Editor } from '@tiptap/react';

export const useTextDirection = (editor: Editor | null) => {
    useEffect(() => {
        if (!editor) return;

        // Helper function to detect RTL text
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

                            // Update the node's direction
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
        };

        // Set up event listener for content changes
        const handler = () => {
            requestAnimationFrame(detectAndUpdateDirection);
        };

        editor.on('update', handler);

        return () => {
            editor.off('update', handler);
        };
    }, [editor]);
};
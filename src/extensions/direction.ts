// src/extensions/direction.ts
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';

/**
 * Regex to detect RTL characters (Arabic, Hebrew, Persian, etc.)
 */
const RTL_REGEX =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;

/**
 * Check if text should be rendered RTL
 */
const isRTL = (text: string): boolean => {
  if (!text?.trim()) return false;

  const trimmedText = text.trim();
  const firstChar = trimmedText[0];

  // Check if first character is RTL
  if (RTL_REGEX.test(firstChar)) {
    return true;
  }

  // Count RTL vs LTR characters for mixed content
  const rtlChars = (text.match(RTL_REGEX) || []).length;
  const latinChars = (text.match(/[A-Za-z]/g) || []).length;

  // If mostly RTL characters, treat as RTL
  return rtlChars > latinChars && rtlChars > 0;
};

/**
 * Node types that support text direction
 */
const DIRECTION_TYPES = [
  'paragraph',
  'heading',
  'bulletList',
  'orderedList',
  'listItem',
  'blockquote',
];

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textDirection: {
      /**
       * Set text direction for current selection
       */
      setTextDirection: (direction: 'rtl' | 'ltr') => ReturnType;
      /**
       * Remove text direction attribute
       */
      unsetTextDirection: () => ReturnType;
      /**
       * Toggle text direction
       */
      toggleTextDirection: () => ReturnType;
    };
  }
}

export const TextDirection = Extension.create({
  name: 'textDirection',

  addGlobalAttributes() {
    return [
      {
        types: DIRECTION_TYPES,
        attributes: {
          dir: {
            default: null,
            parseHTML: (element) => {
              // Get direction from element or detect from content
              const explicitDir = element.getAttribute('dir');
              if (explicitDir) return explicitDir;

              const content = element.textContent || '';
              return isRTL(content) ? 'rtl' : 'ltr';
            },
            renderHTML: (attributes) => {
              const dir = attributes.dir || 'ltr';
              return {
                dir,
                class: dir === 'rtl' ? 'text-right' : 'text-left',
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextDirection:
        (direction: 'rtl' | 'ltr') =>
        ({ state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          if (dispatch) {
            const tr = state.tr;

            state.doc.nodesBetween(from, to, (node, pos) => {
              if (DIRECTION_TYPES.includes(node.type.name)) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  dir: direction,
                });
              }
            });

            // If no nodes found in selection, update the parent paragraph
            if (!tr.docChanged) {
              const $from = selection.$from;
              for (let depth = $from.depth; depth >= 0; depth--) {
                const node = $from.node(depth);
                if (DIRECTION_TYPES.includes(node.type.name)) {
                  const pos = $from.before(depth);
                  tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    dir: direction,
                  });
                  break;
                }
              }
            }

            dispatch(tr);
          }

          return true;
        },

      unsetTextDirection:
        () =>
        ({ state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          if (dispatch) {
            const tr = state.tr;

            state.doc.nodesBetween(from, to, (node, pos) => {
              if (DIRECTION_TYPES.includes(node.type.name) && node.attrs.dir) {
                const { dir, ...restAttrs } = node.attrs;
                tr.setNodeMarkup(pos, undefined, restAttrs);
              }
            });

            dispatch(tr);
          }

          return true;
        },

      toggleTextDirection:
        () =>
        ({ state, dispatch, commands }) => {
          const { selection } = state;
          const { $from } = selection;

          // Find current direction
          let currentDir = 'ltr';
          for (let depth = $from.depth; depth >= 0; depth--) {
            const node = $from.node(depth);
            if (DIRECTION_TYPES.includes(node.type.name)) {
              currentDir = node.attrs.dir || 'ltr';
              break;
            }
          }

          const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
          return commands.setTextDirection(newDir);
        },
    };
  },

  addProseMirrorPlugins() {
    // Auto-detection disabled to allow manual direction control
    // If you want auto-detection back, uncomment the plugin below
    return [];

    /*
    return [
      new Plugin({
        key: new PluginKey('textDirectionAutoDetect'),

        appendTransaction: (transactions, oldState, newState) => {
          // Only process if content changed
          const docChanged = transactions.some((tr) => tr.docChanged);
          if (!docChanged) return null;

          const { tr } = newState;
          let modified = false;

          newState.doc.descendants((node, pos) => {
            // Skip non-text nodes
            if (!DIRECTION_TYPES.includes(node.type.name)) {
              return true;
            }

            // Get text content
            let textContent = '';
            node.descendants((child) => {
              if (child.isText) {
                textContent += child.text || '';
              }
              return true;
            });

            // Skip if no text
            if (!textContent.trim()) {
              return true;
            }

            // Detect direction
            const shouldBeRTL = isRTL(textContent);
            const currentDir = node.attrs.dir;
            const targetDir = shouldBeRTL ? 'rtl' : 'ltr';

            // Update if direction changed
            if (currentDir !== targetDir) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                dir: targetDir,
              });
              modified = true;
            }

            return true;
          });

          return modified ? tr : null;
        },
      }),
    ];
    */
  },

  addKeyboardShortcuts() {
    return {
      // Ctrl/Cmd + Shift + L for LTR
      'Mod-Shift-l': () => this.editor.commands.setTextDirection('ltr'),
      // Ctrl/Cmd + Shift + R for RTL
      'Mod-Shift-r': () => this.editor.commands.setTextDirection('rtl'),
    };
  },
});

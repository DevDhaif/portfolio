// src/extensions/list-item-heading.ts
import ListItem from '@tiptap/extension-list-item';

export const ListItemHeading = ListItem.extend({
  name: 'listItem',

  addAttributes() {
    return {
      headingLevel: {
        default: null,
        parseHTML: element => {
          const level = element.getAttribute('data-heading-level');
          return level ? parseInt(level, 10) : null;
        },
        renderHTML: attributes => {
          if (!attributes.headingLevel) {
            return {
              class: 'tiptap-list-item',
            };
          }
          
          const level = attributes.headingLevel;
          return {
            'data-heading-level': String(level),
            class: `tiptap-list-item list-heading list-heading-${level}`,
          };
        },
      },
    };
  },
});

import { NodeSpec } from '@edybara/pm/model';

export const edybaraFlatOrderedListNodes = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    parseDOM: [
      {
        tag: 'ol',
        getAttrs() {
          return {};
        },
      },
    ],
    content: 'list_item*',
    group: 'block list',
    toDOM() {
      return [
        'ol',
        {
          class: 'edybara-ordered-list',
        },
        0,
      ];
    },
  };

  return {
    ordered_list: nodeSpec,
  };
};

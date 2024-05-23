import { NodeSpec } from '@edybara/pm/model';
import { isQuillTaskList } from '@edybara/core';

export const edybaraFlatBulletListNodes = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    parseDOM: [
      {
        tag: 'ul',
        getAttrs: (node) => {
          const dom = node;
          if (isQuillTaskList(dom)) {
            return false;
          }
          return {};
        },
      },
    ],
    content: 'list_item*',
    group: 'block list',
    toDOM() {
      return [
        'ul',
        {
          class: 'edybara-bullet-list',
        },
        0,
      ];
    },
  };

  return {
    bullet_list: nodeSpec,
  };
};

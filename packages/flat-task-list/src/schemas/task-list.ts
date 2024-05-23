import { NodeSpec } from '@edybara/pm/model';
import { isQuillTaskList } from '@edybara/core';

export const edybaraFlatTaskListNodes = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    parseDOM: [
      {
        tag: 'ul.edybara-task-list',
        getAttrs: (node) => {
          const dom = node;
          if (isQuillTaskList(dom)) {
            return {};
          }
          if (dom.classList.contains('edybara-task-list')) {
            return {};
          }
          return false;
        },
      },
    ],
    content: 'task_list_item*',
    group: 'block list',
    toDOM() {
      return [
        'ul',
        {
          class: 'edybara-task-list',
        },
        0,
      ];
    },
  };

  return {
    task_list: nodeSpec,
  };
};

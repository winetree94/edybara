import { NodeSpec } from 'prosemirror-model';
import { isQuillTaskList } from '@edybara/core';

export const EDIM_DEFAULT_FLAT_TASK_LIST_NODE_NAME = 'task_list';

export interface EdybaraFlatTaskListNodeConfigs {
  nodeName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraFlatTaskListNodeConfigs> = {
  nodeName: EDIM_DEFAULT_FLAT_TASK_LIST_NODE_NAME,
};

export const edybaraFlatTaskListNodes = (
  configs?: EdybaraFlatTaskListNodeConfigs,
): Record<string, NodeSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const nodeSpec: NodeSpec = {
    parseDOM: [
      {
        tag: 'ul.edybara-task-list',
        getAttrs: (node) => {
          const dom = node as HTMLElement;
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
    [mergedConfigs.nodeName]: nodeSpec,
  };
};

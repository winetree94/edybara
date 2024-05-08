import { NodeType } from '@edybara/pm/model';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { edybaraMergeAdjacentNodePlugins } from '@edybara/core';

export interface EdybaraFlatTaskListMergePluginConfigs {
  taskListNodeType: NodeType;
}

export const edybaraFlatTaskListMergePlugins = (
  configs: EdybaraFlatTaskListMergePluginConfigs,
): PMPlugin[] => {
  return [
    ...edybaraMergeAdjacentNodePlugins({
      specs: [
        {
          nodeType: configs.taskListNodeType,
        },
      ],
    }),
  ];
};

import { NodeType } from '@edybara/pm/model';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { edybaraTaskListInputRulePlugins } from './input-rules';
import { edybaraFlatTaskListKeymapPlugins } from './keymaps';
import { edybaraFlatTaskListMergePlugins } from './merge';
import { edybaraTaskListItemNodeViewPlugins } from './task-list-item';

export interface EdybaraFlatTaskListPluginConfigs {
  taskListNodeType: NodeType;
  taskListItemNodeType: NodeType;
}

export const edybaraFlatTaskListPlugins = (
  configs: EdybaraFlatTaskListPluginConfigs,
): PMPlugin[] => {
  return [
    ...edybaraTaskListItemNodeViewPlugins({
      taskListItemNodeType: configs.taskListItemNodeType,
    }),
    ...edybaraTaskListInputRulePlugins({
      taskListNodeType: configs.taskListNodeType,
    }),
    ...edybaraFlatTaskListKeymapPlugins({
      taskListNodeType: configs.taskListNodeType,
      taskListItemNodeType: configs.taskListItemNodeType,
    }),
    ...edybaraFlatTaskListMergePlugins({
      taskListNodeType: configs.taskListNodeType,
    }),
  ];
};

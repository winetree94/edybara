import { keymap } from '@edybara/pm/keymap';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { NodeType } from '@edybara/pm/model';
import { splitListItem } from '@edybara/flat-list';

export interface EdybaraFlatTaskListKeymapPluginConfigs {
  taskListNodeType: NodeType;
  taskListItemNodeType: NodeType;
}

export const edybaraFlatTaskListKeymapPlugins = (
  configs: EdybaraFlatTaskListKeymapPluginConfigs,
): PMPlugin[] => {
  return [
    keymap({
      Enter: splitListItem(configs.taskListItemNodeType),
      'Shift-Enter': splitListItem(configs.taskListItemNodeType),
    }),
  ];
};

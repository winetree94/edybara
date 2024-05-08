import { keymap } from 'prosemirror-keymap';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { NodeType } from '@edybara/pm/model';
import {
  splitListItem,
  indentListItem,
  listItemBackspace,
} from '@edybara/flat-list';

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
      Tab: indentListItem({
        listNodeTypes: [configs.taskListNodeType],
        listItemNodeType: configs.taskListItemNodeType,
        reduce: 1,
      }),
      'Shift-Tab': indentListItem({
        listNodeTypes: [configs.taskListNodeType],
        listItemNodeType: configs.taskListItemNodeType,
        reduce: -1,
      }),
      Backspace: listItemBackspace({
        listNodeTypes: [configs.taskListNodeType],
        listItemNodeType: configs.taskListItemNodeType,
      }),
    }),
  ];
};

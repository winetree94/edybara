import { keymap } from '@edybara/pm/keymap';
import { splitListItem } from '../commands';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { NodeType } from '@edybara/pm/model';

export interface EdybaraFlatListKeymapPluginConfigs {
  orderListNodeType?: NodeType;
  bulletListNodeType?: NodeType;
  listItemNodeType: NodeType;
}

export const edybaraFlatListKeymapPlugins = (
  configs: EdybaraFlatListKeymapPluginConfigs,
): PMPlugin[] => {
  const listTypes = [];
  if (configs.bulletListNodeType) {
    listTypes.push(configs.bulletListNodeType);
  }
  if (configs.orderListNodeType) {
    listTypes.push(configs.orderListNodeType);
  }

  return [
    keymap({
      Enter: splitListItem(configs.listItemNodeType),
      'Shift-Enter': splitListItem(configs.listItemNodeType),
    }),
  ];
};

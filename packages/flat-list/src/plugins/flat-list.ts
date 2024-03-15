import { NodeType } from 'prosemirror-model';
import { Plugin as PMPlugin } from 'prosemirror-state';
import { edybaraFlatListInputRulePlugins } from './input-rules';
import { edybaraFlatListKeymapPlugins } from './keymaps';
import { edybaraFlatListMergePlugins } from './merge';

export interface EdybaraFlatListPluginConfigs {
  orderedListNodeType?: NodeType;
  bulletListNodeType?: NodeType;
  listItemNodeType: NodeType;
}

export const edybaraFlatListPlugins = (
  configs: EdybaraFlatListPluginConfigs,
): PMPlugin[] => {
  return [
    ...edybaraFlatListKeymapPlugins({
      bulletListNodeType: configs.bulletListNodeType,
      orderListNodeType: configs.orderedListNodeType,
      listItemNodeType: configs.listItemNodeType,
    }),
    ...edybaraFlatListInputRulePlugins({
      bulletListNodeType: configs.bulletListNodeType,
      orderListNodeType: configs.orderedListNodeType,
    }),
    ...edybaraFlatListMergePlugins(configs),
  ];
};

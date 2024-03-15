import { NodeType } from 'prosemirror-model';
import { edybaraHorizontalKeymapPlugins } from './keymap';

export interface EdybaraHorizontalRulePluginConfigs {
  nodeType: NodeType;
}

export const edybaraHorizontalRulePlugins = (
  configs: EdybaraHorizontalRulePluginConfigs,
) => {
  return [...edybaraHorizontalKeymapPlugins(configs)];
};

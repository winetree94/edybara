import { NodeType } from '@edybara/pm/model';
import { keymap } from 'prosemirror-keymap';
import { setBlockType } from '@edybara/pm/commands';

export interface EdybaraCodeBlockKeymapPluginConfigs {
  nodeType: NodeType;
}

export const edybaraCodeBlockKeymapPlugins = (
  configs: EdybaraCodeBlockKeymapPluginConfigs,
) => {
  return [
    keymap({
      'Shift-Ctrl-\\': setBlockType(configs.nodeType),
    }),
  ];
};

import { NodeType } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { setBlockType } from 'prosemirror-commands';

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

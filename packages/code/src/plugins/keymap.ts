import { MarkType } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';

export interface EdybaraCodeKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraCodeKeymapPlugins = (configs: EdybaraCodeKeymapPluginConfigs) => {
  return [
    keymap({
      'Mod-Shift-M': toggleMark(configs.markType),
    }),
  ];
};

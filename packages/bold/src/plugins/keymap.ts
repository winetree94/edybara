import { MarkType } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';

export interface EdybaraBoldKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraBoldKeymapPlugins = (configs: EdybaraBoldKeymapPluginConfigs) => {
  return [
    keymap({
      'Mod-b': toggleMark(configs.markType),
      'Mod-B': toggleMark(configs.markType),
    }),
  ];
};

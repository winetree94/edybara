import { Plugin as PMPlugin } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { MarkType } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';

export interface EdybaraUnderlineKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraUnderlineKeymapPlugins = (
  configs: EdybaraUnderlineKeymapPluginConfigs,
): PMPlugin[] => {
  return [
    keymap({
      'Mod-u': toggleMark(configs.markType),
      'Mod-U': toggleMark(configs.markType),
    }),
  ];
};

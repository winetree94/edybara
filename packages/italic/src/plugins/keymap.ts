import { MarkType } from '@edybara/pm/model';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from '@edybara/pm/commands';

export interface EdybaraItalicKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraItalicKeymapPlugins = (
  configs: EdybaraItalicKeymapPluginConfigs,
) => {
  return [
    keymap({
      'Mod-i': toggleMark(configs.markType),
      'Mod-I': toggleMark(configs.markType),
    }),
  ];
};

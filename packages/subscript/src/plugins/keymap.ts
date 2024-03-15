import { MarkType } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';

export interface EdybaraSubscriptKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraSubscriptKeymapPlugins = (
  configs: EdybaraSubscriptKeymapPluginConfigs,
) => {
  return [
    keymap({
      'Mod-Shift-,': toggleMark(configs.markType),
      'Mod-Shift-<': toggleMark(configs.markType),
    }),
  ];
};

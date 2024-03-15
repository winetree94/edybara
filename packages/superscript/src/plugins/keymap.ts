import { MarkType } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';

export interface EdybaraSuperscriptKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraSuperscriptKeymapPlugins = (
  configs: EdybaraSuperscriptKeymapPluginConfigs,
) => {
  return [
    keymap({
      'Mod-Shift-.': toggleMark(configs.markType),
      'Mod-Shift->': toggleMark(configs.markType),
    }),
  ];
};

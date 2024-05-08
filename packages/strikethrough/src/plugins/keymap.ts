import { MarkType } from '@edybara/pm/model';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from '@edybara/pm/commands';

export interface EdybaraStrikethroughKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraStrikethroughKeymapPlugins = (
  configs: EdybaraStrikethroughKeymapPluginConfigs,
) => {
  return [
    keymap({
      'Mod-Shift-s': toggleMark(configs.markType),
      'Mod-Shift-S': toggleMark(configs.markType),
    }),
  ];
};

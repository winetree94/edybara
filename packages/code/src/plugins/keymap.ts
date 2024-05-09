import { MarkType } from '@edybara/pm/model';
import { keymap } from '@edybara/pm/keymap';
import { toggleMark } from '@edybara/pm/commands';

export interface EdybaraCodeKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraCodeKeymapPlugins = (
  configs: EdybaraCodeKeymapPluginConfigs,
) => {
  return [
    keymap({
      'Mod-Shift-M': toggleMark(configs.markType),
    }),
  ];
};

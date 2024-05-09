import { Plugin as PMPlugin } from '@edybara/pm/state';
import { keymap } from '@edybara/pm/keymap';
import { MarkType } from '@edybara/pm/model';
import { toggleMark } from '@edybara/pm/commands';

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

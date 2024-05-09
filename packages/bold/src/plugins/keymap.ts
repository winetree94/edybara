import { MarkType } from '@edybara/pm/model';
import { keymap } from '@edybara/pm/keymap';
import { toggleMark } from '@edybara/pm/commands';

export interface EdybaraBoldKeymapPluginConfigs {
  markType: MarkType;
}

export const edybaraBoldKeymapPlugins = (
  configs: EdybaraBoldKeymapPluginConfigs,
) => {
  return [
    keymap({
      'Mod-b': toggleMark(configs.markType),
      'Mod-B': toggleMark(configs.markType),
    }),
  ];
};

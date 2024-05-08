import { MarkType } from '@edybara/pm/model';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { edybaraUnderlineKeymapPlugins } from './keymap';

export interface EdybaraUnderlinePluginConfigs {
  markType: MarkType;
}

export const edybaraUnderlinePlugins = (
  configs: EdybaraUnderlinePluginConfigs,
): PMPlugin[] => {
  return [...edybaraUnderlineKeymapPlugins(configs)];
};

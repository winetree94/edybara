import { MarkType } from '@edybara/pm/model';
import { edybaraStrikethroughKeymapPlugins } from './keymap';

export interface EdybaraStrikethroughPluginConfigs {
  markType: MarkType;
}

export const edybaraStrikethroughPlugins = (
  configs: EdybaraStrikethroughPluginConfigs,
) => {
  return [...edybaraStrikethroughKeymapPlugins(configs)];
};

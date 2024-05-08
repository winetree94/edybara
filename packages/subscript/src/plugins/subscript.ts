import { MarkType } from '@edybara/pm/model';
import { edybaraSubscriptKeymapPlugins } from './keymap';

export interface EdybaraSubscriptPluginConfigs {
  markType: MarkType;
}

export const edybaraSubscriptPlugins = (configs: EdybaraSubscriptPluginConfigs) => {
  return [...edybaraSubscriptKeymapPlugins(configs)];
};

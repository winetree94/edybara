import { MarkType } from '@edybara/pm/model';
import { edybaraItalicKeymapPlugins } from './keymap';

export interface EdybaraItalicPluginConfigs {
  markType: MarkType;
}

export const edybaraItalicPlugins = (configs: EdybaraItalicPluginConfigs) => {
  return [...edybaraItalicKeymapPlugins(configs)];
};

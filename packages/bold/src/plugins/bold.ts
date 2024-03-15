import { MarkType } from 'prosemirror-model';
import { edybaraBoldKeymapPlugins } from './keymap';

export interface EdybaraBoldPluginConfigs {
  markType: MarkType;
}

export const edybaraBoldPlugins = (configs: EdybaraBoldPluginConfigs) => {
  return [...edybaraBoldKeymapPlugins(configs)];
};

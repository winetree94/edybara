import { MarkType } from 'prosemirror-model';
import { Plugin as PMPlugin } from 'prosemirror-state';
import { edybaraUnderlineKeymapPlugins } from './keymap';

export interface EdybaraUnderlinePluginConfigs {
  markType: MarkType;
}

export const edybaraUnderlinePlugins = (
  configs: EdybaraUnderlinePluginConfigs,
): PMPlugin[] => {
  return [...edybaraUnderlineKeymapPlugins(configs)];
};

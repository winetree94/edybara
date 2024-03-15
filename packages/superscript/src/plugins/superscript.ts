import { MarkType } from 'prosemirror-model';
import { edybaraSuperscriptKeymapPlugins } from './keymap';

export interface EdybaraSuperscriptPluginConfigs {
  markType: MarkType;
}

export const edybaraSuperscriptPlugins = (
  configs: EdybaraSuperscriptPluginConfigs,
) => {
  return [...edybaraSuperscriptKeymapPlugins(configs)];
};

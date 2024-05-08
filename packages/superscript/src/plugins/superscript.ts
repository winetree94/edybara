import { MarkType } from '@edybara/pm/model';
import { edybaraSuperscriptKeymapPlugins } from './keymap';

export interface EdybaraSuperscriptPluginConfigs {
  markType: MarkType;
}

export const edybaraSuperscriptPlugins = (
  configs: EdybaraSuperscriptPluginConfigs,
) => {
  return [...edybaraSuperscriptKeymapPlugins(configs)];
};

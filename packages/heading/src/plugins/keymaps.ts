import { setBlockType } from '@edybara/pm/commands';
import { keymap } from '@edybara/pm/keymap';
import { NodeType } from '@edybara/pm/model';
import { Plugin as PMPlugin, Command } from '@edybara/pm/state';
import { EdybaraHeadingNodeSpec } from '../schemas';

export interface EdybaraHeadingKeymapPluginConfigs {
  nodeType: NodeType;
}

export const edybaraHeadingKeymapPlugins = (
  configs: EdybaraHeadingKeymapPluginConfigs,
): PMPlugin[] => {
  const levels = (configs.nodeType.spec as EdybaraHeadingNodeSpec).meta.levels;
  const headingKeymaps: Record<string, Command> = {};

  levels.forEach((level) => {
    headingKeymaps['Alt-Mod-' + level] = setBlockType(configs.nodeType, {
      level: level,
    });
  });

  return [keymap(headingKeymaps)];
};

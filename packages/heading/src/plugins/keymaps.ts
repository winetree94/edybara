import { setBlockType } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { NodeType } from 'prosemirror-model';
import { Plugin as PMPlugin, Command } from 'prosemirror-state';
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

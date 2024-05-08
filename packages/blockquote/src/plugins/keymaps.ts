import { Plugin as PMPlugin } from '@edybara/pm/state';
import { NodeType } from '@edybara/pm/model';
import { wrapIn } from '@edybara/pm/commands';
import { keymap } from 'prosemirror-keymap';

export interface EdybaraBlockquoteKeymapPluginConfigs {
  nodeType: NodeType;
}

export const edybaraBlockquoteKeymapPlugins = (
  configs: EdybaraBlockquoteKeymapPluginConfigs,
): PMPlugin[] => [
  keymap({
    'Ctrl->': wrapIn(configs.nodeType),
  }),
];

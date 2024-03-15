import { NodeType } from 'prosemirror-model';
import { Plugin as PMPlugin } from 'prosemirror-state';
import { edybaraParagraphKeymapPlugins } from './keymaps';

export interface EdybaraParagraphPluginConfigs {
  nodeType: NodeType;
}

export const edybaraParagraphPlugins = (
  configs: EdybaraParagraphPluginConfigs,
): PMPlugin[] => {
  const plugins: PMPlugin[] = [];

  plugins.push(
    ...edybaraParagraphKeymapPlugins({
      nodeType: configs.nodeType,
    }),
  );

  return plugins;
};

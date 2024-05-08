import { NodeType } from '@edybara/pm/model';
import { Plugin as PMPlugin } from '@edybara/pm/state';
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

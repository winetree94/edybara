import { NodeType } from '@edybara/pm/model';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { edybaraMergeAdjacentNodePlugins } from '@edybara/core';

export interface EdybaraBlockQuoteMergePluginConfigs {
  nodeType: NodeType;
}

export const edybaraBlockQuoteMergePlugins = (
  configs: EdybaraBlockQuoteMergePluginConfigs,
): PMPlugin[] => {
  const plugins: PMPlugin[] = [];

  plugins.push(
    ...edybaraMergeAdjacentNodePlugins({
      specs: [
        {
          nodeType: configs.nodeType,
        },
      ],
    }),
  );

  return plugins;
};

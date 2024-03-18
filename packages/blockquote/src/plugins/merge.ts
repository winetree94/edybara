import { NodeType } from 'prosemirror-model';
import { Plugin as PMPlugin } from 'prosemirror-state';
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

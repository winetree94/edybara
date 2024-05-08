import { NodeType } from '@edybara/pm/model';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { edybaraMergeAdjacentNodePlugins } from '@edybara/core';
import { EdybaraMergeAdjacentNodePluginConfigs } from '@edybara/core';

export interface EdybaraFlatListMergePluginConfigs {
  orderedListNodeType?: NodeType;
  bulletListNodeType?: NodeType;
}

export const edybaraFlatListMergePlugins = (
  configs: EdybaraFlatListMergePluginConfigs,
): PMPlugin[] => {
  const mergeConfigs: EdybaraMergeAdjacentNodePluginConfigs = {
    specs: [],
  };

  if (configs.bulletListNodeType) {
    mergeConfigs.specs.push({
      nodeType: configs.bulletListNodeType,
    });
  }

  if (configs.orderedListNodeType) {
    mergeConfigs.specs.push({
      nodeType: configs.orderedListNodeType,
    });
  }

  return [...edybaraMergeAdjacentNodePlugins(mergeConfigs)];
};

import { NodeType } from 'prosemirror-model';
import { Plugin as PMPlugin } from 'prosemirror-state';
import { edybaraMergeAdjacentNodePlugins } from '@edybara-editor/core';
import { EdybaraMergeAdjacentNodePluginConfigs } from '@edybara-editor/core';

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

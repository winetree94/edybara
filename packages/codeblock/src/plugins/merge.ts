import { NodeType } from 'prosemirror-model';
import { edybaraMergeAdjacentNodePlugins } from '@edybara-editor/core';

export interface EdybaraCodeBlockMergePluginConfigs {
  nodeType: NodeType;
}

export const edybaraCodeBlockMergePlugins = (configs: EdybaraCodeBlockMergePluginConfigs) => {
  return [
    ...edybaraMergeAdjacentNodePlugins({
      specs: [
        {
          nodeType: configs.nodeType,
          beforeMergeTransaction: (tr, joinPos) =>
            tr.insertText('\n', joinPos, joinPos + 1),
        },
      ],
    }),
  ];
};

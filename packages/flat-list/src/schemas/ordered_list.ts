import { NodeSpec } from '@edybara/pm/model';

export const EDYBARA_FLAT_ORDERED_LIST_DEFAULT_NODE_NAME = 'ordered_list';

export interface EdybaraFlatOrderedListNodeConfigs {
  nodeName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraFlatOrderedListNodeConfigs> = {
  nodeName: EDYBARA_FLAT_ORDERED_LIST_DEFAULT_NODE_NAME,
};

export const edybaraFlatOrderedListNodes = (
  configs?: EdybaraFlatOrderedListNodeConfigs,
): Record<string, NodeSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const nodeSpec: NodeSpec = {
    parseDOM: [
      {
        tag: 'ol',
        getAttrs() {
          return {};
        },
      },
    ],
    content: 'list_item*',
    group: 'block list',
    toDOM() {
      return [
        'ol',
        {
          class: 'edybara-ordered-list',
        },
        0,
      ];
    },
  };

  return {
    [mergedConfigs.nodeName]: nodeSpec,
  };
};

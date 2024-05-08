import { NodeSpec } from '@edybara/pm/model';

export const EDIM_BLOCKQUOTE_NODE_NAME = 'blockquote';

export interface EdybaraBlockquoteNodeConfigs {
  multiline?: boolean;
  nodeName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraBlockquoteNodeConfigs> = {
  multiline: true,
  nodeName: EDIM_BLOCKQUOTE_NODE_NAME,
};

export const edybaraBlockquoteNodes = (
  configs?: EdybaraBlockquoteNodeConfigs,
): Record<string, NodeSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const nodeSpec: NodeSpec = {
    content: 'paragraph',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM() {
      return [
        'blockquote',
        {
          class: 'pmp-blockquote',
        },
        0,
      ];
    },
  };

  if (mergedConfigs.multiline) {
    nodeSpec.content = 'paragraph+';
  }

  return {
    [mergedConfigs.nodeName]: nodeSpec,
  };
};

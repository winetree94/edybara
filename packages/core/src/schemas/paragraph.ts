import { NodeSpec } from '@edybara/pm/model';

export const EDIM_PARAGRAPH_NODE: Record<string, NodeSpec> = {
  paragraph: {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return ['p', 0];
    },
  },
};

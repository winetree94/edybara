import { NodeSpec } from '@edybara/pm/model';

export const EDYBARA_PARAGRAPH_NODE: Record<string, NodeSpec> = {
  paragraph: {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return ['p', 0];
    },
  },
};

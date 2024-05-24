import { NodeSpec } from '@edybara/pm/model';

export const edybaraDocNodes = (): Record<string, NodeSpec> => ({
  doc: {
    group: 'block-container',
    content: 'block+',
  },
});

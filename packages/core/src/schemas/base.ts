import { NodeSpec } from '@edybara/pm/model';

export const edybaraBaseNodes = (): Record<string, NodeSpec> => ({
  doc: {
    group: 'block-container',
    content: 'block+',
  },
  text: {
    group: 'inline',
  },
});

import { NodeSpec } from '@edybara/pm/model';

export const edybaraTextNodes = (): Record<string, NodeSpec> => ({
  text: {
    group: 'inline',
  },
});

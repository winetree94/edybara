import { NodeSpec } from '@edybara/pm/model';
import { BLOCK_CONTAINER_GROUP } from '../types';

export const edybaraDocNodes = (): Record<string, NodeSpec> => ({
  doc: {
    group: BLOCK_CONTAINER_GROUP,
    content: 'block+',
  },
});

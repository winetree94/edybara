import { NodeSpec } from '@edybara/pm/model';
import { TableNodeSpec } from '../schemas';

export const isTableNodeSpec = (
  nodeSpec: NodeSpec,
): nodeSpec is TableNodeSpec => {
  return nodeSpec['tableRole'] !== undefined;
};

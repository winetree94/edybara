import {
  BLOCK_CONTAINER_GROUP,
  BLOCK_CONTAINER_IGNORE_CHILDREN,
  NodePair,
} from '../types';
import { Node } from '@edybara/pm/model';

export const blockContainerChildren = (doc: Node, from: number, to: number) => {
  const nodes: NodePair[] = [];
  doc.nodesBetween(from, to, (node, pos, parent) => {
    const parentIsBlockContainer = parent?.type.spec.group?.includes(
      BLOCK_CONTAINER_GROUP,
    );
    const currentIsIgnoreBlockContainer = node.type.spec.group?.includes(
      BLOCK_CONTAINER_IGNORE_CHILDREN,
    );
    if (parentIsBlockContainer && !currentIsIgnoreBlockContainer) {
      nodes.push({ node, pos, parent });
      return false;
    }
    return true;
  });

  return nodes;
};

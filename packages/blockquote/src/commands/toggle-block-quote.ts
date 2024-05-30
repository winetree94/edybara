import { Command } from '@edybara/pm/state';
import { BLOCK_CONTAINER_GROUP, NodePair } from '@edybara/core';

export const toggleBlockquote = (): Command => {
  return (state) => {
    const selection = state.selection;
    const tr = state.tr;

    const range = selection.$from.blockRange(
      selection.$to,
      (node) => node.type.spec.group?.includes(BLOCK_CONTAINER_GROUP) || false,
    );

    if (!range) {
      return false;
    }

    const descendants: NodePair[] = [];
    tr.doc.nodesBetween(selection.from, selection.to, (node, pos, parent) => {
      if (parent === range.parent) {
        descendants.push({
          node,
          pos,
          parent,
        });
        return false;
      }
      return true;
    });

    return false;
  };
};

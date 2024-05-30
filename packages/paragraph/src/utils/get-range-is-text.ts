import { EditorState } from '@edybara/pm/state';
import { Node } from '@edybara/pm/model';
import { BLOCK_CONTAINER_GROUP } from '@edybara/core';

export const getRangeIsText = (state: EditorState) => {
  const { $from, $to } = state.selection;

  const range = $from.blockRange(
    $to,
    (node) => node.type.spec.group?.includes(BLOCK_CONTAINER_GROUP) || false,
  );

  if (!range) {
    return false;
  }

  const descendents: Node[] = [];
  state.doc.nodesBetween($from.pos, $to.pos, (node, pos, parent) => {
    if (parent === range.parent) {
      descendents.push(node);
    }
    return true;
  });

  return descendents.every((node) =>
    ['heading', 'paragraph'].includes(node.type.name),
  );
};

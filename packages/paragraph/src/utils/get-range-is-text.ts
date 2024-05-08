import { EditorState } from '@edybara/pm/state';
import { Node } from '@edybara/pm/model';

export const getRangeIsText = (state: EditorState) => {
  const { $from, $to } = state.selection;

  const range = $from.blockRange(
    $to,
    (node) => node.type.spec.group?.includes('block-container') || false,
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

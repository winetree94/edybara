import { NodeType } from '@edybara/pm/model';
import { EditorState } from '@edybara/pm/state';

export const isInCodeBlock = (state: EditorState, nodeType: NodeType) => {
  const $head = state.selection.$head;
  for (let d = $head.depth; d > 0; d--) {
    if ($head.node(d).type == nodeType) {
      return true;
    }
  }
  return false;
};

import { EditorState } from '@edybara/pm/state';
import { AlignableAttrs, TEXT_ALIGNMENT, TEXT_ALIGNMENTS } from '../types';

export const selectionAlignments = (
  state: EditorState,
): TEXT_ALIGNMENTS[] | void => {
  const { from, to } = state.selection;
  const aligns: TEXT_ALIGNMENTS[] = [];
  state.doc.nodesBetween(from, to, (node) => {
    if (node.type.spec.attrs?.['align']) {
      const attrs = node.attrs as AlignableAttrs;
      aligns.push(attrs.align || TEXT_ALIGNMENT.DEFAULT);
      return false;
    }
    return true;
  });
  return aligns.length === 0 ? undefined : aligns;
};

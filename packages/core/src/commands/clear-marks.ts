import { Command } from 'prosemirror-state';

/**
 * Remove all marks from the current selection
 * @returns Command
 */
export const clearMarks = (): Command => (state, dispatch) => {
  const { from, to } = state.selection;
  let tr = state.tr;
  tr = tr.removeMark(from, to);
  tr = tr.setStoredMarks([]);
  if (!tr.docChanged) {
    return false;
  }
  dispatch?.(tr);
  return true;
};

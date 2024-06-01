import { Command } from '@edybara/pm/state';

export const deleteIndent = (): Command => (state, dispatch) => {
  const { tr, selection } = state;
  if (!selection.empty) {
    return false;
  }
  const text = state.doc.textBetween(selection.from - 1, selection.from);
  if (text !== '\t') {
    return false;
  }
  tr.delete(selection.from - 1, selection.from);
  dispatch?.(tr);
  return tr.docChanged;
};

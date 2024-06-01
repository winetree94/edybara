import { Command, TextSelection } from '@edybara/pm/state';

export const insertIndent = (): Command => (state, dispatch) => {
  const { tr, selection } = state;
  if (
    !selection.empty ||
    !(selection instanceof TextSelection) ||
    !selection.$cursor
  ) {
    return false;
  }
  tr.insertText('\t', selection.from, selection.to);
  dispatch?.(tr);
  return tr.docChanged;
};

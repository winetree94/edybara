import { gapCursor } from 'prosemirror-gapcursor';

export const edybaraGapCursorPlugins = () => {
  return [gapCursor()];
};

import { Attrs, Mark, MarkType } from '@edybara/pm/model';
import { EditorState } from '@edybara/pm/state';
import { isInMarks } from './is-in-marks';

/**
 * Returns the presence of the specified MarkType within the current selection range.
 * It returns true only when attrs are also specified and all attrs are identical.
 *
 * @param state EditorState
 * @param type MarkType
 * @param attrs Attrs
 * @returns Mark
 */
export const markActive = (
  state: EditorState,
  type: MarkType,
  attrs?: Attrs | null,
): void | Mark => {
  const { from, $from, to, empty } = state.selection;
  if (empty) {
    const marks = state.storedMarks || $from.marks();
    return isInMarks(marks, type, attrs);
  } else {
    const marks: Mark[] = [];
    state.doc.nodesBetween(from, to, (node) => {
      if (node.isInline) {
        marks.push(...node.marks);
      }
    });
    return isInMarks(marks, type, attrs);
  }
};

export const selectionAllHasMark = (
  state: EditorState,
  type: MarkType,
  attrs?: Attrs | null,
): boolean => {
  const { from, $from, to, empty } = state.selection;
  if (empty) {
    const marks = state.storedMarks || $from.marks();
    return !!isInMarks(marks, type, attrs);
  } else {
    const marks: Mark[] = [];
    state.doc.nodesBetween(from, to, (node) => {
      if (node.isInline) {
        marks.push(...node.marks);
      }
    });
    return !!isInMarks(marks, type, attrs);
  }
};

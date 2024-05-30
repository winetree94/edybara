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
export const hasMark = (
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

/**
 * Returns the presence of the specified MarkType within the current selection range.
 * It returns true only when attrs are also specified and all attrs are identical.
 *
 * @param state EditorState
 * @param type MarkType
 * @param attrs Attrs
 * @returns Mark
 */
export const hasMarkAll = (state: EditorState, markType: MarkType): boolean => {
  const { empty, from, $from, to } = state.selection;

  if (empty) {
    const marks = state.storedMarks || $from.marks();
    return !!isInMarks(marks, markType);
  }

  let foundText = false;
  let hasMark = true;

  state.doc.nodesBetween(from, to, (node) => {
    if (!hasMark) {
      return false;
    }

    if (node.type.spec.code) {
      return false;
    }

    if (node.isText) {
      foundText = true;
    }

    if (node.isText && !markType.isInSet(node.marks)) {
      hasMark = false;
      return false;
    }

    return true;
  });

  if (!foundText) {
    return false;
  }

  return hasMark;
};

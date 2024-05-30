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
export const selectionTextHasMark = (
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
 * 선택 영역의 모든 텍스트에 지정된 MarkType 이 존재하는지 확인합니다.
 * 일치하는 모든 Mark 의 목록을 반환합니다.
 *
 * attrs 가 지정된 경우 모든 attrs 가 동일한 경우에만 결과를 반환합니다.
 * code 블록은 판단 대상에서 제외됩니다.
 *
 * @param state EditorState
 * @param type MarkType
 * @param attrs Attrs
 * @returns Mark
 */
export const selectionAllTextHasMark = (
  state: EditorState,
  markType: MarkType,
  attrs?: Attrs,
): void | Mark[] => {
  const { empty, from, $from, to } = state.selection;

  if (empty) {
    const marks = state.storedMarks || $from.marks();
    const result = isInMarks(marks, markType, attrs);
    return result ? [result] : undefined;
  }

  const foundMarks: Mark[] = [];
  const text = state.doc.textBetween(from, to);
  const prewhiteSpace = text[0] === ' ' ? 1 : 0;
  const postwhiteSpace = text[text.length - 1] === ' ' ? 1 : 0;

  let foundText = false;
  let hasMark = true;

  state.doc.nodesBetween(from + prewhiteSpace, to - postwhiteSpace, (node) => {
    if (!hasMark) {
      return false;
    }

    if (node.type.spec.code) {
      return false;
    }

    if (!node.isText) {
      return true;
    }

    foundText = true;

    const mark = isInMarks(node.marks, markType, attrs);

    if (!mark) {
      hasMark = false;
      return false;
    } else {
      foundMarks.push(mark);
    }

    return true;
  });

  if (!foundText) {
    return;
  }

  return hasMark ? foundMarks : undefined;
};

import { Attrs, MarkType } from '@edybara/pm/model';
import { Command, TextSelection } from '@edybara/pm/state';
import { isInMarks, markApplies } from '../utils';

/// Create a command function that toggles the given mark with the
/// given attributes. Will return `false` when the current selection
/// doesn't support that mark. This will remove the mark if any marks
/// of that type exist in the selection, or add it otherwise. If the
/// selection is empty, this applies to the [stored
/// marks](#state.EditorState.storedMarks) instead of a range of the
/// document.
export const setMarkWithAttrs = (
  markType: MarkType,
  attrs: Attrs | null = null,
): Command => {
  return (state, dispatch) => {
    const { empty, $cursor, ranges } = state.selection as TextSelection;
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType)) {
      return false;
    }
    if (dispatch) {
      if ($cursor) {
        const marks = state.storedMarks || $cursor.marks();
        if (isInMarks(marks, markType, attrs)) {
          dispatch(state.tr.removeStoredMark(markType));
        } else {
          dispatch(state.tr.addStoredMark(markType.create(attrs)));
        }
      } else {
        const add: boolean = true;
        const tr = state.tr;
        for (let i = 0; i < ranges.length; i++) {
          const { $from, $to } = ranges[i];
          if (!add) {
            tr.removeMark($from.pos, $to.pos, markType);
          } else {
            let from = $from.pos;
            let to = $to.pos;
            const start = $from.nodeAfter;
            const end = $to.nodeBefore;
            const spaceStart =
              start && start.isText ? /^\s*/.exec(start.text!)![0].length : 0;
            const spaceEnd =
              end && end.isText ? /\s*$/.exec(end.text!)![0].length : 0;
            if (from + spaceStart < to) {
              from += spaceStart;
              to -= spaceEnd;
            }
            tr.addMark(from, to, markType.create(attrs));
          }
        }
        dispatch(tr.scrollIntoView());
      }
    }
    return true;
  };
};

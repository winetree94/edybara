import { MarkType } from '@edybara/pm/model';
import { Command } from '@edybara/pm/state';

/**
 * Remove all marks from the current selection
 * @returns Command
 */
export const clearMarks =
  (markType?: MarkType): Command =>
  (state, dispatch) => {
    const { from, to } = state.selection;
    let tr = state.tr;
    tr = tr.removeMark(from, to, markType);
    tr = tr.setStoredMarks([]);
    if (!tr.docChanged) {
      return false;
    }
    dispatch?.(tr);
    return tr.docChanged;
  };

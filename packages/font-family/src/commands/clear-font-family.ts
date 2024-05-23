import { Command } from '@edybara/pm/state';
import { clearMarks } from '@edybara/core';
import { MarkType } from '@edybara/pm/model';

export const clearFontFamily = (markType: MarkType): Command => {
  const cmd = clearMarks(markType);
  return (state, dispatch) => {
    return cmd(state, dispatch);
  };
};

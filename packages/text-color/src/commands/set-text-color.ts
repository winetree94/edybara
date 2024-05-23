import { MarkType } from '@edybara/pm/model';
import { Command } from '@edybara/pm/state';
import { EdybaraTextColorAttrs } from 'schemas';
import { setMarkWithAttrs } from '@edybara/core';

export const setTextColor = (
  markType: MarkType,
  attr: EdybaraTextColorAttrs,
): Command => {
  return setMarkWithAttrs(markType, attr);
};

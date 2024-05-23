import { MarkType } from '@edybara/pm/model';
import { setMarkWithAttrs } from '@edybara/core';
import { EdybaraFontFamilyAttrs } from '../schemas';
import { Command } from '@edybara/pm/state';

export const setFontFamily = (
  markType: MarkType,
  attr: EdybaraFontFamilyAttrs,
): Command => {
  return setMarkWithAttrs(markType, attr);
};

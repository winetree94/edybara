import { MarkType } from '@edybara/pm/model';
import { toggleMarkWithAttrs } from '@edybara/core';
import { EdybaraFontFamilyAttrs } from '../schemas';
import { Command } from '@edybara/pm/state';

export const toggleFontFamily = (
  markType: MarkType,
  attr: EdybaraFontFamilyAttrs,
): Command => {
  return toggleMarkWithAttrs(markType, attr);
};

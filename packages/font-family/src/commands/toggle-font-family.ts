import { MarkType } from 'prosemirror-model';
import { toggleMarkWithAttrs } from '@edybara/core';
import { EdybaraFontFamilyAttrs } from '../schemas';
import { Command } from 'prosemirror-state';

export const toggleFontFamily = (
  markType: MarkType,
  attr: EdybaraFontFamilyAttrs,
): Command => {
  return toggleMarkWithAttrs(markType, attr);
};

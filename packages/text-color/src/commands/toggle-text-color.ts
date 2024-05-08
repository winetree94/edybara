import { MarkType } from '@edybara/pm/model';
import { Command } from '@edybara/pm/state';
import { toggleMark } from '@edybara/pm/commands';
import { toggleMarkWithAttrs } from '@edybara/core';
import { EdybaraTextColorAttrs } from 'schemas';

export const toggleTextColorMark = (
  markType: MarkType,
  attrs: EdybaraTextColorAttrs,
): Command => toggleMark(markType, attrs);

export const toggleTextColorWithAttrs = (
  markType: MarkType,
  attr: EdybaraTextColorAttrs,
): Command => {
  return toggleMarkWithAttrs(markType, attr);
};

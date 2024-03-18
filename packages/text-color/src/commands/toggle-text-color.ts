import { MarkType } from 'prosemirror-model';
import { Command } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
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

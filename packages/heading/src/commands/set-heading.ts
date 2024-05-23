import { transformRangeToBlock } from '@edybara/core';
import { NodeType } from '@edybara/pm/model';
import { Command } from '@edybara/pm/state';
import { EdybaraHeadingAttrs } from '../schemas';

export const setHeading = (
  nodeType: NodeType,
  attrs?: Partial<EdybaraHeadingAttrs>,
): Command => {
  const cmd = transformRangeToBlock(nodeType, attrs);
  return (state, dispatch) => cmd(state, dispatch);
};

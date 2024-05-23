import { transformRangeToBlock } from '@edybara/core';
import { NodeType } from '@edybara/pm/model';
import { Command } from '@edybara/pm/state';
import { EdybaraParagraphAttrs } from '../schemas';

export const setParagraph = (
  nodeType: NodeType,
  attrs?: Partial<EdybaraParagraphAttrs>,
): Command => {
  const cmd = transformRangeToBlock(nodeType, attrs);
  return (state, dispatch) => cmd(state, dispatch);
};

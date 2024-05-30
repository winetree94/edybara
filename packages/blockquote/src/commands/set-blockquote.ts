import { Command } from '@edybara/pm/state';
import { transformRangeToBlock } from '@edybara/core';
import { NodeType } from '@edybara/pm/model';

export const setBlockquote = (nodeType: NodeType): Command => {
  const cmd = transformRangeToBlock(nodeType);
  return (state, dispatch) => {
    return cmd(state, dispatch);
  };
};

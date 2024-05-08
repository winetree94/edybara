import { getBlockContainerChildren } from '@edybara/core';
import { EditorState } from '@edybara/pm/state';

export const getAlignType = (state: EditorState) => {
  const { selection } = state;
  const { $from, $to } = selection;

  // const children = getBlockContainerChildren(state.doc, $from.pos, $to.pos);

  // if (
  //   $from.parent === $to.parent &&
  //   $from.parent.type === state.schema.nodes['heading']
  // ) {
  //   const attrs = $from.parent.attrs;
  //   return `h${attrs.level}`;
  // }

  return 'p';
};

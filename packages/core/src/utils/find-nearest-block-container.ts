import { Selection } from '@edybara/pm/state';
import { findParentNode } from '@edybara/pm/utils';

const findBlockContainer = findParentNode((node) => {
  return (
    node.isBlock &&
    !node.inlineContent &&
    !!node.type.spec.content?.includes('block')
  );
});

export const findNearestBlockContainer = (selection: Selection) =>
  findBlockContainer(selection);

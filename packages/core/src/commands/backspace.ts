import { Command, TextSelection } from '@edybara/pm/state';
import { indent } from './indent';
import { findParentNode } from '@edybara/pm/utils';
import { LIST_GROUP, LIST_ITEM_GROUP } from '../types';

export const listItemBackspace = (): Command => (state, dispatch) => {
  const nodes = Object.values(state.schema.nodes);
  const listNodeTypes = nodes.filter((node) => {
    return node.spec.group?.split(' ').includes(LIST_GROUP);
  });
  const listItemNodeTypes = nodes.filter((node) => {
    return node.spec.group?.split(' ').includes(LIST_ITEM_GROUP);
  });

  const selection = state.selection;
  if (selection.from !== selection.to) {
    return false;
  }
  const previous$ = state.doc.resolve(selection.from - 1);
  if (listItemNodeTypes.includes(previous$.parent.type)) {
    indent({
      reduce: -1,
    })(state, dispatch);
    return true;
  }
  const currentBlock = findParentNode((node) => node.type.isBlock)(selection);
  if (
    currentBlock &&
    previous$.nodeBefore &&
    listNodeTypes.includes(previous$.nodeBefore.type)
  ) {
    const lastListItem$ = state.tr.doc.resolve(selection.from - 3);
    const lastListItemPos = lastListItem$.before(lastListItem$.depth);
    let tr = state.tr.delete(
      currentBlock.pos,
      currentBlock.pos + currentBlock.node.nodeSize,
    );
    const insertPosition = lastListItemPos + lastListItem$.parent.nodeSize - 2;
    tr = tr.insert(insertPosition, currentBlock.node.content);
    tr = tr.setSelection(TextSelection.create(tr.doc, insertPosition));
    dispatch?.(tr);
    return true;
  }
  return false;
};

import { Rect, TableMap } from '@edybara/pm/tables';
import { findParentNode, findParentNodeClosestToPos } from '@edybara/pm/utils';
import { Selection } from '@edybara/pm/state';
import { Node, ResolvedPos } from '@edybara/pm/model';
import { isTableNodeSpec } from './is-table-node-spec';

export const findTable = (selection: Selection) =>
  findParentNode(
    (node) =>
      isTableNodeSpec(node.type.spec) &&
      node.type.spec['tableRole'] === 'table',
  )(selection);

export const findTableClosestToPos = ($pos: ResolvedPos) => {
  const predicate = (node: Node) =>
    isTableNodeSpec(node.type.spec) && node.type.spec['tableRole'] === 'table';
  return findParentNodeClosestToPos($pos, predicate);
};

export const findCellClosestToPos = ($pos: ResolvedPos) => {
  const predicate = (node: Node) =>
    isTableNodeSpec(node.type.spec) &&
    /cell/i.test(node.type.spec['tableRole']);
  return findParentNodeClosestToPos($pos, predicate);
};

export const findCellRectClosestToPos = ($pos: ResolvedPos): Rect | void => {
  const cell = findCellClosestToPos($pos);
  if (cell) {
    const table = findTableClosestToPos($pos);
    if (table) {
      const map = TableMap.get(table.node);
      const cellPos = cell.pos - table.start;
      return map.rectBetween(cellPos, cellPos);
    }
  }
};

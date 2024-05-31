import { NodeType } from '@edybara/pm/model';
import { EditorState } from '@edybara/pm/state';
import { blockContainerChildren } from '../utils';

/**
 * @description
 * 선택 영역의 모든 block-container 의 자식 노드가 주어진 nodeType 인지 확인합니다.
 *
 * @param state - EditorState
 * @param nodeType - NodeType
 * @returns boolean
 */
export const selectionAllIsNode = (state: EditorState, nodeType: NodeType) => {
  const { from, to } = state.selection;
  const pairs = blockContainerChildren(state.doc, from, to);
  return pairs.every((pair) => pair.node.type === nodeType);
};

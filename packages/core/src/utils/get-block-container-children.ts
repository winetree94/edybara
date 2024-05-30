import {
  BLOCK_CONTAINER_GROUP,
  BLOCK_CONTAINER_IGNORE_CHILDREN,
  NodePair,
} from '../types';
import { Node } from '@edybara/pm/model';

/**
 * 문서에서 block-container 그룹의 자식에 속한 노드들을 찾아 반환합니다.
 *
 * @param doc - 검색할 문서
 * @param from - 문서에서 검색을 시작할 위치
 * @param to - 문서에서 검색을 종료할 위치
 * @returns - 검색된 노드 목록
 */
export const blockContainerChildren = (doc: Node, from: number, to: number) => {
  const nodes: NodePair[] = [];
  doc.nodesBetween(from, to, (node, pos, parent) => {
    const parentIsBlockContainer = parent?.type.spec.group?.includes(
      BLOCK_CONTAINER_GROUP,
    );
    const currentIsIgnoreBlockContainer = node.type.spec.group?.includes(
      BLOCK_CONTAINER_IGNORE_CHILDREN,
    );
    if (parentIsBlockContainer && !currentIsIgnoreBlockContainer) {
      nodes.push({ node, pos, parent });
      return false;
    }
    return true;
  });
  return nodes;
};

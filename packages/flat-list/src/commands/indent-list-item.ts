import { Node, NodeType } from '@edybara/pm/model';
import {
  Command,
  EditorState,
  TextSelection,
  Transaction,
} from '@edybara/pm/state';
import { liftOutOfFlatList } from '../transforms';

export interface IndentListItemCommandConfigs {
  listNodeTypes: NodeType[];
  listItemNodeType: NodeType;
  reduce: number;
}

export const indentListItem = (
  configs: IndentListItemCommandConfigs,
): Command => {
  return (
    state: EditorState,
    dispatch?: (tr: Transaction) => void,
  ): boolean => {
    let tr = state.tr;
    let selection = state.selection;
    const { $from, $to } = selection;

    // 다중 선택이 아닌 경우 리스트 아이템의 첫 번째 커서 위치에서만 동작
    if (
      selection.empty &&
      selection instanceof TextSelection &&
      selection.$cursor &&
      selection.$cursor.parentOffset !== 0
    ) {
      console.log('cancel');
      return false;
    }

    const indentableNodes: {
      node: Node;
      pos: number;
      parent: Node | null;
    }[] = [];

    state.tr.doc.nodesBetween($from.pos, $to.pos, (node, pos, parent) => {
      if (node.type.spec.attrs?.['indent']) {
        indentableNodes.push({
          node,
          pos: pos,
          parent: parent,
        });
        return false;
      }
      return true;
    });

    tr = indentableNodes
      .slice()
      .reverse()
      .reduce<Transaction>((tr, { node, pos }) => {
        const attrs = node.attrs as { indent: number };
        const originIndent = attrs.indent;
        const expectedIndent = Math.min(
          (originIndent || 0) + configs.reduce,
          6,
        );

        if (node.type !== configs.listItemNodeType) {
          const targetIndent = Math.max(expectedIndent, 0);
          if (targetIndent === originIndent) {
            return tr;
          }
          return tr.setNodeMarkup(tr.mapping.map(pos), node.type, {
            ...node.attrs,
            indent: targetIndent,
          });
        }

        if (expectedIndent <= 0) {
          const range = tr.doc
            .resolve(pos)
            .blockRange(tr.doc.resolve(pos + node.nodeSize), (node) => {
              return configs.listNodeTypes.includes(node.type);
            });
          return liftOutOfFlatList(tr, range!)!;
        }

        if (originIndent === expectedIndent) {
          return tr;
        }
        return tr.setNodeMarkup(pos, node.type, {
          ...attrs,
          indent: expectedIndent,
        });
      }, tr);

    // if (!tr.docChanged) {
    //   return false;
    // }

    selection = state.selection.map(tr.doc, tr.mapping);
    dispatch?.(tr);

    return true;
  };
};

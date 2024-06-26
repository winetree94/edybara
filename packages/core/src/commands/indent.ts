import { Node } from '@edybara/pm/model';
import { Command, EditorState, Transaction } from '@edybara/pm/state';
import { liftOutOfFlatList } from '../transforms';
import { LIST_GROUP, LIST_ITEM_GROUP } from '../types';

export interface IndentConfigs {
  reduce: number;
}

export const indent = (configs: IndentConfigs): Command => {
  return (
    state: EditorState,
    dispatch?: (tr: Transaction) => void,
  ): boolean => {
    let tr = state.tr;
    let selection = state.selection;
    const { $from, $to } = selection;

    const nodes = Object.values(state.schema.nodes);
    const listNodeTypes = nodes.filter((node) => {
      return node.spec.group?.split(' ').includes(LIST_GROUP);
    });
    const listItemNodeTypes = nodes.filter((node) => {
      return node.spec.group?.split(' ').includes(LIST_ITEM_GROUP);
    });

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

        if (!listItemNodeTypes.includes(node.type)) {
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
              return listNodeTypes.includes(node.type);
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

    if (!tr.docChanged) {
      return false;
    }

    selection = state.selection.map(tr.doc, tr.mapping);
    dispatch?.(tr);

    return true;
  };
};

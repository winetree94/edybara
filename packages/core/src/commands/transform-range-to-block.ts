import { Command } from '@edybara/pm/state';
import { Attrs, NodeType } from '@edybara/pm/model';
import { liftOut } from '../transforms';
import { blockContainerChildren } from '../utils';

/**
 * Convert all nodes within the current selection to a specific node.
 * This applies only to convertible nodes.
 *
 * @param nodeType
 * @param attrs
 * @returns Command
 */
export const transformRangeToBlock =
  (nodeType: NodeType, attrs?: Attrs): Command =>
  (state, dispatch) => {
    let tr = state.tr;
    let selection = state.selection;

    const liftOutResult = liftOut(tr, state, selection.from, selection.to);
    tr = liftOutResult.tr;
    selection = state.selection.map(tr.doc, tr.mapping);

    tr = blockContainerChildren(tr.doc, selection.from, selection.to)
      .slice()
      .reverse()
      .reduce((tr, { node, pos }) => {
        if (!nodeType.validContent(node.content)) {
          return tr;
        }
        tr.setBlockType(pos, pos + node.nodeSize, nodeType, {
          ...node.attrs,
          ...attrs,
        });
        return tr;
      }, tr);
    selection = state.selection.map(tr.doc, tr.mapping);

    dispatch?.(tr.setSelection(selection));
    return true;
  };

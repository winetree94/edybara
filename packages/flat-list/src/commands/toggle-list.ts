import { Fragment, NodeType } from '@edybara/pm/model';
import { Command } from '@edybara/pm/state';
import { getBlockContainerChildren, liftOut } from '@edybara/core';

// 하드코딩 없도록 고쳐야 함
const allowedContentTypes = [
  'paragraph',
  'heading',
  'code_block',
  'blockquote',
  'task_list',
  'ordered_list',
  'bullet_list',
];

export interface ToggleListCommandConfigs {
  listType: NodeType;
  listItemType: NodeType;
}

export const toggleList =
  (configs: ToggleListCommandConfigs): Command =>
  (state, dispatch) => {
    let tr = state.tr;
    let selection = state.selection;

    const nodes = getBlockContainerChildren(
      tr.doc,
      selection.from,
      selection.to,
    ).filter(({ node }) => allowedContentTypes.includes(node.type.name));

    if (nodes.every(({ node }) => node.type === configs.listType)) {
      tr = liftOut(tr, state, selection.from, selection.to).tr;
      selection = state.selection.map(tr.doc, tr.mapping);
      dispatch?.(tr.setSelection(selection));
      return true;
    }

    const liftOutResult = liftOut(tr, state, selection.from, selection.to);
    const indents = liftOutResult.indents.reverse();
    tr = liftOutResult.tr;
    selection = state.selection.map(tr.doc, tr.mapping);

    tr = getBlockContainerChildren(tr.doc, selection.from, selection.to)
      .slice()
      .reverse()
      .reduce((tr, { node, pos }) => {
        tr = tr.setBlockType(
          pos,
          pos + node.nodeSize,
          state.schema.nodes['paragraph'],
          {
            ...node.attrs,
          },
        );
        return tr;
      }, tr);

    tr = getBlockContainerChildren(tr.doc, selection.from, selection.to)
      .slice()
      .reverse()
      .reduce((tr, { node, pos }, index) => {
        const $from = tr.doc.resolve(pos);
        const $to = tr.doc.resolve(pos + node.nodeSize);
        const range = $from.blockRange($to)!;

        if (!configs.listItemType.validContent(Fragment.from(node))) {
          return tr;
        }

        tr = tr.wrap(range, [
          {
            type: configs.listType,
            attrs: null,
          },
          {
            type: configs.listItemType,
            attrs: {
              indent: indents[index],
              align: node.attrs['align'],
            },
          },
        ]);

        return tr;
      }, tr);

    selection = state.selection.map(tr.doc, tr.mapping);
    tr = tr.setSelection(selection);

    dispatch?.(tr);

    return tr.docChanged;
  };

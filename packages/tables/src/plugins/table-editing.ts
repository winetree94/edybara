import { columnResizing, tableEditing } from 'prosemirror-tables';
import { edybaraTableCellButtonPlugins } from './cell-button';
import { edybaraFocusedCellDecorationPlugins } from './focused-cell';
import { Plugin as PMPlugin } from 'prosemirror-state';
import { EdybaraTableNodeView } from '../node-views';
import { NodeType } from 'prosemirror-model';

export interface EdybaraTableEditingPluginConfigs {
  tableNodeType: NodeType;
  tableRowNodeType: NodeType;
  tableCellNodeType: NodeType;
}

export const edybaraTableEditingPlugins = (
  configs: EdybaraTableEditingPluginConfigs,
) => {
  const plugins: PMPlugin[] = [
    ...edybaraFocusedCellDecorationPlugins(),
    ...edybaraTableCellButtonPlugins(),
    new PMPlugin({
      props: {
        nodeViews: {
          table: (node, view, getPos) =>
            new EdybaraTableNodeView(node, view, getPos),
        },
      },
    }),
    columnResizing(),
    tableEditing(),
  ];
  return plugins;
};

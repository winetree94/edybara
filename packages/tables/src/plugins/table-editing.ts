import { columnResizing, tableEditing } from '@edybara/pm/tables';
import { edybaraTableCellButtonPlugins } from './cell-button';
import { edybaraFocusedCellDecorationPlugins } from './focused-cell';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { EdybaraTableNodeView } from '../node-views';
import { NodeType } from '@edybara/pm/model';

export interface EdybaraTableEditingPluginConfigs {
  tableNodeType: NodeType;
  tableRowNodeType: NodeType;
  tableCellNodeType: NodeType;
}

export const edybaraTableEditingPlugins = () => {
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

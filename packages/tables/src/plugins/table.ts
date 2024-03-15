import { NodeType } from 'prosemirror-model';
import { Plugin as PMPlugin } from 'prosemirror-state';

export interface EdybaraTablePluginConfigs {
  tableNodeType: NodeType;
  tableRowNodeType: NodeType;
  tableCellNodeType: NodeType;
}

export const edybaraTablePlugins = (configs: EdybaraTablePluginConfigs) => {
  return [new PMPlugin({})];
};

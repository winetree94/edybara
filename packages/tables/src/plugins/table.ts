import { NodeType } from '@edybara/pm/model';
import { Plugin as PMPlugin } from '@edybara/pm/state';

export interface EdybaraTablePluginConfigs {
  tableNodeType: NodeType;
  tableRowNodeType: NodeType;
  tableCellNodeType: NodeType;
}

export const edybaraTablePlugins = (configs: EdybaraTablePluginConfigs) => {
  return [new PMPlugin({})];
};

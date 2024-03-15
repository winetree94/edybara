import { NodeType } from 'prosemirror-model';
import { edybaraCodeBlockInputRulePlugins } from './input-rules';
import { edybaraCodeBlockKeymapPlugins } from './keymap';
import { edybaraCodeBlockMergePlugins } from './merge';
import { edybaraCodeBlockEjectPlugins } from './eject';

export interface EdybaraCodeBlockPluginConfigs {
  nodeType: NodeType;
  mergeAdjacentCodeBlock?: boolean;
}

const DEFAULT_CONFIGS: Required<Omit<EdybaraCodeBlockPluginConfigs, 'nodeType'>> =
  {
    mergeAdjacentCodeBlock: true,
  };

export const edybaraCodeBlockPlugins = (configs: EdybaraCodeBlockPluginConfigs) => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const plugins = [
    ...edybaraCodeBlockKeymapPlugins(mergedConfigs),
    ...edybaraCodeBlockInputRulePlugins(mergedConfigs),
    ...edybaraCodeBlockEjectPlugins(mergedConfigs),
  ];

  if (mergedConfigs.mergeAdjacentCodeBlock) {
    plugins.push(
      ...edybaraCodeBlockMergePlugins({
        nodeType: mergedConfigs.nodeType,
      }),
    );
  }

  return plugins;
};

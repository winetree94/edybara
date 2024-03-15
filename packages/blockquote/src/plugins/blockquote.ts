import { NodeType } from 'prosemirror-model';
import { Plugin as PMPlugin } from 'prosemirror-state';
import { edybaraBlockquoteInputRulePlugins } from './input-rules';
import { edybaraBlockquoteKeymapPlugins } from './keymaps';
import { edybaraBlockQuoteMergePlugins } from './merge';

export interface EdybaraBlockQuotePluginConfigs {
  nodeType: NodeType;
  mergeAdjacentBlockquote?: boolean;
}

const DEFAULT_CONFIGS: Required<Omit<EdybaraBlockQuotePluginConfigs, 'nodeType'>> =
  {
    mergeAdjacentBlockquote: false,
  };

export const edybaraBlockQuotePlugins = (
  configs: EdybaraBlockQuotePluginConfigs,
): PMPlugin[] => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const plugins: PMPlugin[] = [
    ...edybaraBlockquoteKeymapPlugins(mergedConfigs),
    ...edybaraBlockquoteInputRulePlugins(mergedConfigs),
  ];

  if (mergedConfigs.mergeAdjacentBlockquote) {
    plugins.push(
      ...edybaraBlockQuoteMergePlugins({
        nodeType: mergedConfigs.nodeType,
      }),
    );
  }

  return plugins;
};

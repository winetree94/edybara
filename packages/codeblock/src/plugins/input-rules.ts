import { NodeType } from 'prosemirror-model';
import { inputRules, textblockTypeInputRule } from 'prosemirror-inputrules';

export interface EdybaraCodeBlockInputRulePluginConfigs {
  nodeType: NodeType;
}

export const edybaraCodeBlockInputRulePlugins = (
  configs: EdybaraCodeBlockInputRulePluginConfigs,
) => {
  return [
    inputRules({
      rules: [textblockTypeInputRule(/^```$/, configs.nodeType)],
    }),
  ];
};

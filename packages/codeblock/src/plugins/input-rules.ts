import { NodeType } from '@edybara/pm/model';
import { inputRules, textblockTypeInputRule } from '@edybara/pm/inputrules';

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
